import type { WebsiteConfig, WebsiteAnalysisReport, WebsiteAnalysisWarning } from './types'
import { isEcommerce, isBusinessService } from './constants'

/**
 * Rule-based website analysis that evaluates the configuration
 * for complexity, compatibility issues, and provides suggestions.
 */
export function analyzeWebsiteConfig(config: WebsiteConfig): WebsiteAnalysisReport {
  const warnings: WebsiteAnalysisWarning[] = []
  const suggestions: string[] = []
  const compatibilityIssues: string[] = []
  let complexityPoints = 0

  // ── Complexity Scoring ────────────────────────────────────

  // Website type complexity
  if (config.websiteTypes.length > 2) complexityPoints += 2
  if (isEcommerce(config.websiteTypes)) complexityPoints += 3
  if (config.websiteTypes.includes('marketplace')) complexityPoints += 2
  if (config.websiteTypes.includes('saas-product')) complexityPoints += 2
  if (config.websiteTypes.includes('webapp')) complexityPoints += 1
  if (config.websiteTypes.includes('community')) complexityPoints += 1

  // Framework complexity
  if (config.framework === 'custom') complexityPoints += 3
  else if (config.framework === 'wordpress' || config.framework === 'shopify') complexityPoints += 1
  else if (config.framework) complexityPoints += 1

  // Database & backend
  if (config.database && config.database !== 'none') complexityPoints += 1
  if (config.auth && config.auth !== 'none') complexityPoints += 1
  if (config.authMethods.length > 3) complexityPoints += 1

  // Content management
  if (config.cmsProvider && config.cmsProvider !== 'none') complexityPoints += 1
  if (config.i18nEnabled) complexityPoints += 2
  if (config.searchEnabled && config.searchProvider !== 'built-in') complexityPoints += 1

  // Integrations
  const integrationCount = [
    config.emailProvider !== '' && config.emailProvider !== 'none',
    config.analytics.length > 0 && !config.analytics.includes('none'),
    config.monitoring !== '' && config.monitoring !== 'none',
    config.crm !== '' && config.crm !== 'none',
    config.chatWidget !== '' && config.chatWidget !== 'none',
  ].filter(Boolean).length
  complexityPoints += Math.min(integrationCount, 3)

  // E-commerce features
  if (isEcommerce(config.websiteTypes)) {
    if (config.variants) complexityPoints += 1
    if (config.subscriptionBilling) complexityPoints += 2
    if (config.internationalShipping) complexityPoints += 1
    if (config.currencies.length > 2) complexityPoints += 1
  }

  // Business service modules
  if (isBusinessService(config.websiteTypes)) {
    complexityPoints += config.businessModules.length
    if (config.directoryProvider && config.directoryProvider !== 'none') complexityPoints += 2
  }

  // Deployment complexity
  if (config.containerized) complexityPoints += 1
  if (config.environments.length > 2) complexityPoints += 1
  if (config.distributionChannels.length > 3) complexityPoints += 1

  // AI features
  if (config.aiFeatures.length > 0) complexityPoints += config.aiFeatures.length

  // ── Warnings ──────────────────────────────────────────────

  if (isEcommerce(config.websiteTypes) && !config.ssl) {
    warnings.push({
      severity: 'error',
      message: 'SSL is required for e-commerce websites to protect payment data.',
      field: 'ssl',
    })
  }

  if (isEcommerce(config.websiteTypes) && !config.paymentProcessor) {
    warnings.push({
      severity: 'warning',
      message: 'No payment processor selected for e-commerce website.',
      field: 'paymentProcessor',
    })
  }

  if (config.websiteTypes.includes('saas-product') && !config.subscriptionBilling) {
    warnings.push({
      severity: 'info',
      message: 'Consider enabling subscription billing for SaaS products.',
      field: 'subscriptionBilling',
    })
  }

  if (config.auth && config.auth !== 'none' && config.authMethods.length === 0) {
    warnings.push({
      severity: 'warning',
      message: 'Auth provider selected but no authentication methods configured.',
      field: 'authMethods',
    })
  }

  if (config.i18nEnabled && config.i18nLanguages.length === 0) {
    warnings.push({
      severity: 'warning',
      message: 'Internationalization enabled but no languages selected.',
      field: 'i18nLanguages',
    })
  }

  if (config.websiteTypes.length === 0) {
    warnings.push({
      severity: 'warning',
      message: 'No website type selected. Please select at least one type.',
      field: 'websiteTypes',
    })
  }

  if (!config.framework) {
    warnings.push({
      severity: 'warning',
      message: 'No framework selected. Choose a framework to generate accurate documents.',
      field: 'framework',
    })
  }

  if (isBusinessService(config.websiteTypes) && config.businessModules.length > 0 && (!config.auth || config.auth === 'none')) {
    warnings.push({
      severity: 'error',
      message: 'Business service modules require authentication. Please select an auth provider.',
      field: 'auth',
    })
  }

  if (config.businessModules.includes('sick-leave') && (!config.directoryProvider || config.directoryProvider === 'none')) {
    warnings.push({
      severity: 'warning',
      message: 'Sick leave module works best with a directory provider for team notifications.',
      field: 'directoryProvider',
    })
  }

  if (config.directoryProvider && config.directoryProvider !== 'none' && !config.ssl) {
    warnings.push({
      severity: 'error',
      message: 'Directory integration requires SSL to protect credentials in transit.',
      field: 'ssl',
    })
  }

  if (config.compliance.includes('pci-dss') && !isEcommerce(config.websiteTypes)) {
    warnings.push({
      severity: 'info',
      message: 'PCI-DSS compliance is typically only needed for e-commerce websites.',
      field: 'compliance',
    })
  }

  // ── Compatibility Issues ──────────────────────────────────

  if (config.framework === 'astro' && config.apiStyle === 'graphql') {
    compatibilityIssues.push('Astro has limited GraphQL support. Consider using REST or server-actions.')
  }

  if (config.framework === 'astro' && config.database === 'mongodb') {
    compatibilityIssues.push('MongoDB with Astro requires additional configuration. Consider SQLite or Turso for simpler setup.')
  }

  if (config.framework === 'wordpress' && config.orm === 'prisma') {
    compatibilityIssues.push('Prisma is not typically used with WordPress. WordPress uses its own database layer.')
  }

  if (config.framework === 'shopify' && config.database !== '' && config.database !== 'none') {
    compatibilityIssues.push('Shopify manages its own database. External database selection may not apply.')
  }

  if (config.hosting === 'cloudflare-pages' && config.framework === 'nextjs') {
    compatibilityIssues.push('Next.js on Cloudflare Pages requires the @cloudflare/next-on-pages adapter with some feature limitations.')
  }

  if (config.framework === 'gatsby' && config.apiStyle === 'server-actions') {
    compatibilityIssues.push('Gatsby does not support server actions. Consider REST or GraphQL.')
  }

  if (config.cmsProvider === 'wordpress-headless' && config.framework === 'wordpress') {
    compatibilityIssues.push('Headless WordPress CMS with WordPress framework is redundant. Choose one approach.')
  }

  // ── Suggestions ───────────────────────────────────────────

  if (!config.sitemap) {
    suggestions.push('Enable sitemap generation for better search engine indexing.')
  }

  if (!config.openGraph) {
    suggestions.push('Enable Open Graph meta tags for better social media sharing.')
  }

  if (config.caching === '' || config.caching === 'none') {
    suggestions.push('Consider enabling caching (ISR, SWR, or CDN) for better performance.')
  }

  if (config.cdn === '' || config.cdn === 'none') {
    suggestions.push('Add a CDN for faster global content delivery.')
  }

  if (config.monitoring === '' || config.monitoring === 'none') {
    suggestions.push('Add error monitoring (Sentry, Datadog) to catch production issues early.')
  }

  if (config.ci === '' || config.ci === 'none') {
    suggestions.push('Set up CI/CD for automated testing and deployment.')
  }

  if (isEcommerce(config.websiteTypes) && config.structuredData.length === 0) {
    suggestions.push('Add Product structured data for rich search results.')
  }

  if (config.websiteTypes.includes('blog') && !config.structuredData.includes('article')) {
    suggestions.push('Add Article structured data for blog posts.')
  }

  if (config.backups === '' || config.backups === 'none') {
    suggestions.push('Configure automated backups to prevent data loss.')
  }

  const LOCAL_CHANNELS = ['lan-server', 'local-docker', 'usb-portable', 'network-share', 'intranet']
  const hasLocalChannels = config.distributionChannels.some((c) => LOCAL_CHANNELS.includes(c))

  if (hasLocalChannels && !config.containerized) {
    suggestions.push('Consider enabling Docker for local distribution channels (LAN, USB, network share).')
  }

  if (config.distributionChannels.includes('usb-portable') && config.database && config.database !== 'none') {
    warnings.push({
      severity: 'warning',
      message: 'USB/portable distribution with a database backend requires an embedded or local database solution (e.g. SQLite).',
      field: 'distributionChannels',
    })
  }

  // ── Score Label & Effort ──────────────────────────────────

  const clampedScore = Math.min(Math.max(complexityPoints, 1), 10)

  let complexityLabel: string
  if (clampedScore <= 3) complexityLabel = 'Simple'
  else if (clampedScore <= 5) complexityLabel = 'Moderate'
  else if (clampedScore <= 7) complexityLabel = 'Complex'
  else complexityLabel = 'Enterprise'

  let estimatedEffort: string
  if (clampedScore <= 3) estimatedEffort = '1-2 weeks'
  else if (clampedScore <= 5) estimatedEffort = '2-4 weeks'
  else if (clampedScore <= 7) estimatedEffort = '1-2 months'
  else estimatedEffort = '2-4 months'

  // Count configured sections
  let configuredSections = 0
  let totalFeatures = 0

  if (config.websiteTypes.length > 0) { configuredSections++; totalFeatures += config.websiteTypes.length }
  if (config.framework) { configuredSections++; totalFeatures++ }
  if (config.database && config.database !== 'none') { configuredSections++; totalFeatures++ }
  if (config.auth && config.auth !== 'none') { configuredSections++; totalFeatures += config.authMethods.length }
  if (config.hosting) { configuredSections++; totalFeatures++ }
  if (config.layoutStyle) { configuredSections++; totalFeatures++ }
  if (config.theme) { configuredSections++; totalFeatures++ }
  if (config.contentTypes.length > 0) { configuredSections++; totalFeatures += config.contentTypes.length }
  if (isEcommerce(config.websiteTypes) && config.paymentProcessor) { configuredSections++; totalFeatures++ }
  totalFeatures += config.analytics.length + config.pageStructure.length + config.aiFeatures.length + config.distributionChannels.length

  return {
    complexityScore: clampedScore,
    complexityLabel,
    scopeEstimate: {
      configuredSections,
      totalFeatures,
      estimatedEffort,
      ecommerceEnabled: isEcommerce(config.websiteTypes),
    },
    warnings,
    suggestions,
    compatibilityIssues,
  }
}
