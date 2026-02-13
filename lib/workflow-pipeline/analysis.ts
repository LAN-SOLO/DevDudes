import type { WorkflowConfigV2 } from './types'

export interface WorkflowAnalysisWarning {
  type: 'error' | 'warning' | 'info'
  message: string
  step?: string
}

export interface WorkflowAnalysisReport {
  complexityScore: number
  complexityLabel: string
  warnings: WorkflowAnalysisWarning[]
  suggestions: string[]
  compatibilityIssues: string[]
  scopeEstimate: {
    configuredSections: number
    totalSteps: number
    aiProviderCount: number
    hasAuth: boolean
    hasMonitoring: boolean
    estimatedEffort: 'small' | 'medium' | 'large' | 'enterprise'
  }
}

/**
 * Analyze a WorkflowConfigV2 for complexity, warnings, and suggestions.
 */
export function analyzeWorkflowConfig(config: WorkflowConfigV2): WorkflowAnalysisReport {
  const warnings: WorkflowAnalysisWarning[] = []
  const suggestions: string[] = []
  const compatibilityIssues: string[] = []
  let complexityPoints = 0

  // ── Complexity Scoring ────────────────────────────────────

  // Step count
  complexityPoints += Math.min(config.steps.length, 5)
  if (config.steps.length > 10) {
    complexityPoints += 2
    warnings.push({ type: 'info', message: `Workflow has ${config.steps.length} steps — consider splitting into sub-workflows.` })
  }

  // Step types
  const hasParallel = config.steps.some((s) => s.type === 'parallel')
  const hasConditions = config.steps.some((s) => s.type === 'condition')
  const hasLoops = config.steps.some((s) => s.type === 'loop')
  if (hasParallel) complexityPoints += 1
  if (hasConditions) complexityPoints += 1
  if (hasLoops) complexityPoints += 1

  // Triggers
  complexityPoints += Math.min(config.triggers.triggers.length, 2)

  // Orchestration
  if (config.orchestration.mode === 'dag' || config.orchestration.mode === 'saga') complexityPoints += 2
  else if (config.orchestration.mode === 'state-machine' || config.orchestration.mode === 'event-driven') complexityPoints += 2
  else if (config.orchestration.mode === 'parallel') complexityPoints += 1

  // Data connectors
  complexityPoints += Math.min(config.dataConnectors.connectors.length, 3)

  // AI providers
  const enabledAi = config.aiIntegrations.providers.filter((p) => p.enabled).length
  complexityPoints += Math.min(enabledAi, 3)
  if (config.aiIntegrations.rag) complexityPoints += 1

  // Auth
  if (config.auth.enabled) {
    complexityPoints += 1
    if (config.auth.rbac) complexityPoints += 1
    if (config.auth.mfa) complexityPoints += 1
  }

  // Deployment
  if (config.deployment.multiRegion) complexityPoints += 2
  if (config.deployment.scaling === 'auto') complexityPoints += 1

  // Queues
  if (config.queues.enabled) complexityPoints += Math.min(config.queues.queues.length, 2)

  // Middleware count
  complexityPoints += Math.min(config.middleware.items.length, 2)

  // Notifications
  if (config.notifications.enabled) complexityPoints += 1

  // Publishing
  if (config.publishing.businessModel) complexityPoints += 1
  if (config.publishing.distributionChannels.length > 2) complexityPoints += 1
  if (config.publishing.storeListings.length > 0) complexityPoints += 1

  // Cap at 10
  const complexityScore = Math.min(Math.max(Math.round(complexityPoints * 10 / 38), 1), 10)

  // ── Complexity Label ──────────────────────────────────────

  let complexityLabel: string
  if (complexityScore <= 2) complexityLabel = 'Simple'
  else if (complexityScore <= 4) complexityLabel = 'Moderate'
  else if (complexityScore <= 7) complexityLabel = 'Complex'
  else complexityLabel = 'Enterprise'

  // ── Warnings ──────────────────────────────────────────────

  // Auth enabled but no encryption
  if (config.auth.enabled && config.security.encryption === 'none') {
    warnings.push({ type: 'warning', message: 'Authentication is enabled but encryption is set to none. Sensitive credentials could be exposed.', step: 'Security' })
  }

  // AI providers but no rate limiting
  if (enabledAi > 0 && !config.security.rateLimit) {
    warnings.push({ type: 'warning', message: 'AI providers configured without rate limiting. API costs could spike unexpectedly.', step: 'Security' })
  }

  // Deployment but no testing
  if (config.deployment.target && config.testing.unitFramework === 'none' && config.testing.e2eFramework === 'none') {
    warnings.push({ type: 'warning', message: 'Deployment configured without any testing framework. Regressions may reach production.', step: 'Testing' })
  }

  // External connectors but no health checks
  const unhealthyConnectors = config.dataConnectors.connectors.filter((c) => !c.healthCheck)
  if (unhealthyConnectors.length > 0) {
    warnings.push({ type: 'warning', message: `${unhealthyConnectors.length} data connector(s) without health checks enabled.`, step: 'Data Connectors' })
  }

  // Auth without session TTL
  if (config.auth.enabled && config.auth.sessionTtl <= 0) {
    warnings.push({ type: 'info', message: 'Session TTL is not set. Sessions may persist indefinitely.', step: 'Authentication' })
  }

  // Webhooks without input validation
  if (config.steps.some((s) => s.type === 'webhook') && !config.security.inputValidation) {
    warnings.push({ type: 'warning', message: 'Webhook steps detected without input validation. Payloads should be validated.', step: 'Security' })
  }

  // No monitoring for complex workflows
  if (complexityScore >= 5 && !config.monitoring.enabled) {
    warnings.push({ type: 'warning', message: 'Complex workflow without monitoring. Issues may go undetected in production.', step: 'Monitoring' })
  }

  // Auto-publish without CI/CD
  if (config.publishing.autoPublish && config.deployment.ciProvider === 'none') {
    warnings.push({ type: 'warning', message: 'Auto-publish is enabled without CI/CD. Untested code could reach users.', step: 'Publishing' })
  }

  // SaaS without encryption
  if (config.publishing.businessModel === 'saas-subscription' && config.security.encryption === 'none') {
    warnings.push({ type: 'warning', message: 'SaaS model without encryption. Customer data could be exposed.', step: 'Publishing' })
  }

  // Mobile stores without E2E testing
  if ((config.publishing.distributionChannels.includes('app-store-ios') || config.publishing.distributionChannels.includes('google-play')) && config.testing.e2eFramework === 'none') {
    warnings.push({ type: 'info', message: 'Mobile store distribution without E2E testing. Store reviews may reject buggy builds.', step: 'Publishing' })
  }

  // ── Suggestions ───────────────────────────────────────────

  if (config.deployment.target && !config.deployment.rollback) {
    suggestions.push('Add rollback strategy for production deployments.')
  }

  if (config.deployment.target && config.deployment.ciProvider === 'none') {
    suggestions.push('Configure CI/CD pipeline for automated build and deploy.')
  }

  if (complexityScore >= 4 && !config.monitoring.enabled) {
    suggestions.push('Enable monitoring and alerting for production observability.')
  }

  if (config.auth.enabled && !config.auth.mfa) {
    suggestions.push('Consider MFA for enhanced authentication security.')
  }

  if (config.secrets.provider === 'env' && config.dataConnectors.connectors.length > 1) {
    suggestions.push('Upgrade from .env to a secrets manager (Vault, AWS Secrets) for better security.')
  }

  if (config.steps.length > 0 && !config.documentation.enabled) {
    suggestions.push('Enable auto-generated documentation to keep team aligned.')
  }

  if (enabledAi > 1 && !config.aiIntegrations.fallbackEnabled) {
    suggestions.push('Enable AI provider fallback for high availability.')
  }

  if (config.deployment.target && config.deployment.environments.length === 0) {
    suggestions.push('Add staging/preview environments for pre-production testing.')
  }

  if (config.publishing.distributionChannels.length > 0 && !config.publishing.changelogEnabled) {
    suggestions.push('Enable changelog to keep users informed about releases.')
  }

  if (config.publishing.businessModel === 'open-source' && !config.publishing.license) {
    suggestions.push('Add a license for open-source distribution (MIT or Apache 2.0 recommended).')
  }

  // ── Compatibility Issues ──────────────────────────────────

  // Serverless + WebSockets
  if (config.deployment.scaling === 'serverless' && config.orchestration.mode === 'event-driven') {
    compatibilityIssues.push('Serverless deployments have limited WebSocket support. Consider long-polling or SSE for event-driven patterns.')
  }

  // Multi-region + SQLite-like
  if (config.deployment.multiRegion && config.dataConnectors.connectors.some((c) => c.provider.toLowerCase().includes('sqlite'))) {
    compatibilityIssues.push('Multi-region deployment with SQLite is not recommended. Use a distributed database (PostgreSQL, PlanetScale).')
  }

  // Queue providers in serverless
  if (config.deployment.scaling === 'serverless' && config.queues.enabled && config.queues.queues.some((q) => q.provider === 'bullmq')) {
    compatibilityIssues.push('BullMQ requires persistent Redis connections, which may not work with serverless. Consider Inngest or SQS.')
  }

  // Local AI in serverless
  if (config.deployment.scaling === 'serverless' && config.aiIntegrations.providers.some((p) => p.enabled && p.mode === 'local')) {
    compatibilityIssues.push('Local AI models cannot run in serverless environments. Use API-based providers or dedicated GPU hosting.')
  }

  // ── Scope Estimate ────────────────────────────────────────

  let configuredSections = 0
  if (config.steps.length > 0) configuredSections++
  if (config.triggers.triggers.length > 0) configuredSections++
  if (config.dataConnectors.connectors.length > 0) configuredSections++
  if (config.variables.variables.length > 0) configuredSections++
  if (config.storage.enabled) configuredSections++
  if (config.caching.enabled) configuredSections++
  if (config.queues.enabled) configuredSections++
  if (enabledAi > 0) configuredSections++
  if (config.features.featureIds.length > 0) configuredSections++
  if (config.middleware.items.length > 0) configuredSections++
  if (config.plugins.plugins.length > 0) configuredSections++
  if (config.auth.enabled) configuredSections++
  if (config.security.encryption !== 'none' || config.security.cors || config.security.rateLimit) configuredSections++
  if (config.notifications.enabled) configuredSections++
  if (config.monitoring.enabled) configuredSections++
  if (config.testing.unitFramework !== 'none') configuredSections++
  if (config.deployment.target) configuredSections++
  if (config.documentation.enabled) configuredSections++
  if (config.publishing.businessModel || config.publishing.distributionChannels.length > 0) configuredSections++

  let estimatedEffort: 'small' | 'medium' | 'large' | 'enterprise'
  if (complexityScore <= 2) estimatedEffort = 'small'
  else if (complexityScore <= 4) estimatedEffort = 'medium'
  else if (complexityScore <= 7) estimatedEffort = 'large'
  else estimatedEffort = 'enterprise'

  return {
    complexityScore,
    complexityLabel,
    warnings,
    suggestions,
    compatibilityIssues,
    scopeEstimate: {
      configuredSections,
      totalSteps: config.steps.length,
      aiProviderCount: enabledAi,
      hasAuth: config.auth.enabled,
      hasMonitoring: config.monitoring.enabled,
      estimatedEffort,
    },
  }
}
