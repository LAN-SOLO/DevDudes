import type { WebsiteConfig } from './types'

/**
 * Rule-based recommendations for the website pipeline.
 * Returns arrays of recommended option values based on prior selections.
 */

export function getBusinessModuleRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { websiteTypes, industry, businessModules } = config

  if (!websiteTypes.includes('business-service')) return recs

  // Suggest modules based on industry
  if (industry === 'internal-services' || industry === 'technology') {
    if (!businessModules.includes('admin-area')) recs.push('admin-area')
    if (!businessModules.includes('form-builder')) recs.push('form-builder')
  }

  // Suggest LDAP when admin-area is selected
  if (businessModules.includes('admin-area') && !config.directoryProvider) {
    recs.push('ldap-selfhosted')
  }

  // Suggest Teams/Slack when sick-leave is selected
  if (businessModules.includes('sick-leave')) {
    if (!config.communicationChannels.includes('teams')) recs.push('teams')
    if (!config.communicationChannels.includes('slack')) recs.push('slack')
  }

  // Suggest travel-expenses and employee-budget for finance industry
  if (industry === 'finance') {
    if (!businessModules.includes('travel-expenses')) recs.push('travel-expenses')
    if (!businessModules.includes('employee-budget')) recs.push('employee-budget')
  }

  return [...new Set(recs)].slice(0, 4)
}

export function getFrameworkRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { websiteTypes } = config

  if (websiteTypes.includes('blog') || websiteTypes.includes('documentation')) {
    recs.push('astro', 'nextjs')
  }
  if (websiteTypes.includes('ecommerce') || websiteTypes.includes('marketplace')) {
    recs.push('nextjs', 'shopify')
  }
  if (websiteTypes.includes('webapp') || websiteTypes.includes('saas-product')) {
    recs.push('nextjs', 'remix')
  }
  if (websiteTypes.includes('landing-page')) {
    recs.push('astro', 'nextjs')
  }
  if (websiteTypes.includes('portfolio')) {
    recs.push('astro', 'nextjs')
  }
  if (websiteTypes.includes('community')) {
    recs.push('nextjs', 'remix')
  }
  if (websiteTypes.includes('corporate')) {
    recs.push('nextjs', 'nuxt')
  }
  if (websiteTypes.includes('business-service')) {
    recs.push('nextjs', 'remix')
  }

  return [...new Set(recs)].slice(0, 3)
}

export function getDatabaseRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { framework, websiteTypes } = config

  if (framework === 'nextjs' || framework === 'remix') {
    recs.push('supabase', 'postgresql')
  }
  if (framework === 'nuxt') {
    recs.push('postgresql', 'mongodb')
  }
  if (framework === 'astro') {
    recs.push('sqlite', 'turso')
  }
  if (websiteTypes.includes('ecommerce') || websiteTypes.includes('marketplace')) {
    recs.push('postgresql', 'supabase')
  }
  if (websiteTypes.includes('blog') || websiteTypes.includes('landing-page')) {
    recs.push('none', 'sqlite')
  }
  if (websiteTypes.includes('webapp') || websiteTypes.includes('saas-product')) {
    recs.push('postgresql', 'supabase')
  }

  return [...new Set(recs)].slice(0, 3)
}

export function getDesignRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { framework } = config

  if (framework === 'nextjs') {
    recs.push('tailwind-first', 'shadcn')
  }
  if (framework === 'nuxt') {
    recs.push('tailwind-first')
  }
  if (framework === 'astro') {
    recs.push('tailwind-first')
  }
  if (framework === 'remix') {
    recs.push('tailwind-first')
  }

  return [...new Set(recs)].slice(0, 3)
}

export function getContentRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { websiteTypes, framework } = config

  if (websiteTypes.includes('blog')) {
    recs.push('blog', 'cms')
  }
  if (websiteTypes.includes('documentation')) {
    recs.push('documentation', 'static')
  }
  if (websiteTypes.includes('community')) {
    recs.push('user-generated', 'cms')
  }
  if (websiteTypes.includes('corporate')) {
    recs.push('static', 'cms')
  }
  if (framework === 'astro') {
    recs.push('static')
  }
  if (framework === 'wordpress') {
    recs.push('cms')
  }

  return [...new Set(recs)].slice(0, 3)
}

export function getCommerceRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { websiteTypes, framework } = config

  if (websiteTypes.includes('ecommerce')) {
    recs.push('stripe')
    if (framework === 'shopify') {
      recs.push('shopify-payments')
    }
  }
  if (websiteTypes.includes('saas-product')) {
    recs.push('stripe', 'lemonsqueezy')
  }
  if (websiteTypes.includes('marketplace')) {
    recs.push('stripe')
  }

  return [...new Set(recs)].slice(0, 3)
}

export function getSeoRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { websiteTypes, contentTypes } = config

  if (websiteTypes.includes('blog') || contentTypes.includes('blog')) {
    recs.push('article', 'breadcrumb')
  }
  if (websiteTypes.includes('ecommerce') || websiteTypes.includes('marketplace')) {
    recs.push('product', 'breadcrumb', 'faq')
  }
  if (websiteTypes.includes('corporate') || websiteTypes.includes('landing-page')) {
    recs.push('organization', 'faq')
  }
  if (websiteTypes.includes('documentation')) {
    recs.push('breadcrumb', 'article')
  }

  return [...new Set(recs)].slice(0, 4)
}

export function getHostingRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { framework } = config

  if (framework === 'nextjs') {
    recs.push('vercel', 'netlify', 'aws')
  }
  if (framework === 'nuxt') {
    recs.push('netlify', 'vercel')
  }
  if (framework === 'astro') {
    recs.push('vercel', 'netlify', 'cloudflare-pages')
  }
  if (framework === 'remix') {
    recs.push('vercel', 'fly-io')
  }
  if (framework === 'sveltekit') {
    recs.push('vercel', 'netlify')
  }
  if (framework === 'gatsby') {
    recs.push('netlify', 'vercel')
  }
  if (framework === 'wordpress') {
    recs.push('self-hosted', 'aws')
  }
  if (framework === 'shopify') {
    recs.push('vercel')
  }

  return [...new Set(recs)].slice(0, 3)
}

export function getSecurityRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { websiteTypes, compliance } = config

  if (websiteTypes.includes('ecommerce') || websiteTypes.includes('marketplace')) {
    recs.push('pci-dss', 'gdpr')
  }
  if (websiteTypes.includes('saas-product')) {
    recs.push('soc2', 'gdpr')
  }
  if (websiteTypes.includes('corporate')) {
    recs.push('gdpr')
  }
  if (compliance.length === 0) {
    recs.push('gdpr')
  }

  return [...new Set(recs)].slice(0, 3)
}

export function getIntegrationRecommendations(config: WebsiteConfig): string[] {
  const recs: string[] = []
  const { websiteTypes } = config

  if (websiteTypes.includes('ecommerce') || websiteTypes.includes('marketplace')) {
    recs.push('google-analytics', 'posthog')
  }
  if (websiteTypes.includes('saas-product') || websiteTypes.includes('webapp')) {
    recs.push('posthog', 'sentry')
  }
  if (websiteTypes.includes('blog') || websiteTypes.includes('landing-page')) {
    recs.push('plausible', 'umami')
  }
  if (websiteTypes.includes('corporate')) {
    recs.push('google-analytics', 'hubspot')
  }
  if (websiteTypes.includes('community')) {
    recs.push('posthog')
  }

  return [...new Set(recs)].slice(0, 3)
}
