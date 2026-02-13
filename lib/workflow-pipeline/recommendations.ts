import type { WorkflowConfigV2 } from './types'

/**
 * Rule-based AI recommendations for Workflow Dude v2.
 * Each function returns string[] of recommended values based on current config.
 */

export function getAiProviderRecommendations(config: WorkflowConfigV2): string[] {
  const recs: string[] = []
  const { steps, features, aiIntegrations } = config
  const enabledProviders = aiIntegrations.providers.filter((p) => p.enabled).map((p) => p.provider)

  const stepDescriptions = steps.map((s) => `${s.title} ${s.description}`.toLowerCase()).join(' ')
  const featureIds = features.featureIds

  // RAG use cases → need embedding model
  if (aiIntegrations.rag && !enabledProviders.includes('openai')) {
    recs.push('Add OpenAI for text embeddings (text-embedding-3-small)')
  }
  if (aiIntegrations.rag && !enabledProviders.includes('anthropic')) {
    recs.push('Add Anthropic Claude for RAG query synthesis')
  }

  // NLP-heavy workflows
  if (stepDescriptions.includes('classify') || stepDescriptions.includes('extract') || stepDescriptions.includes('summariz')) {
    if (!enabledProviders.includes('anthropic')) recs.push('Add Anthropic Claude for text classification and extraction')
    if (!enabledProviders.includes('openai')) recs.push('Add OpenAI GPT for structured output generation')
  }

  // Image generation
  if (stepDescriptions.includes('image') || stepDescriptions.includes('visual') || stepDescriptions.includes('design')) {
    if (!enabledProviders.includes('openai')) recs.push('Add OpenAI for DALL-E image generation')
  }

  // Code generation
  if (stepDescriptions.includes('code') || stepDescriptions.includes('generat') || featureIds.includes('code-generation')) {
    if (!enabledProviders.includes('anthropic')) recs.push('Add Anthropic Claude for code generation')
    if (!enabledProviders.includes('deepseek')) recs.push('Add DeepSeek for cost-effective code generation')
  }

  // Local/privacy requirements
  if (config.security.compliance.length > 0 || config.security.encryption !== 'none') {
    if (!enabledProviders.includes('local')) recs.push('Add local model (Ollama) for sensitive data processing')
  }

  // Orchestration via n8n
  if (steps.length > 5 && !enabledProviders.includes('n8n')) {
    recs.push('Add n8n for complex workflow orchestration')
  }

  // Cost optimization
  if (enabledProviders.length >= 2 && !aiIntegrations.costTracking) {
    recs.push('Enable cost tracking to monitor multi-provider spending')
  }

  // Fallback
  if (enabledProviders.length >= 1 && !aiIntegrations.fallbackEnabled) {
    recs.push('Enable provider fallback for reliability')
  }

  return [...new Set(recs)]
}

export function getFeatureRecommendations(config: WorkflowConfigV2): string[] {
  const recs: string[] = []
  const { features, auth, aiIntegrations, deployment, steps, notifications } = config
  const featureIds = features.featureIds
  const enabledProviders = aiIntegrations.providers.filter((p) => p.enabled)

  // Auth enabled → audit logs
  if (auth.enabled && !featureIds.includes('audit-log')) {
    recs.push('audit-log')
  }

  // Auth with RBAC → user management
  if (auth.rbac && !featureIds.includes('user-management')) {
    recs.push('user-management')
  }

  // AI providers → rate limiting
  if (enabledProviders.length > 0 && !featureIds.includes('rate-limiting')) {
    recs.push('rate-limiting')
  }

  // Webhooks in steps → retry queues
  if (steps.some((s) => s.type === 'webhook') && !featureIds.includes('retry-queue')) {
    recs.push('retry-queue')
  }

  // Deployment configured → health checks
  if (deployment.target && !featureIds.includes('health-checks')) {
    recs.push('health-checks')
  }

  // Notifications enabled → dashboard
  if (notifications.enabled && !featureIds.includes('dashboard')) {
    recs.push('dashboard')
  }

  // Multiple steps → workflow analytics
  if (steps.length > 3 && !featureIds.includes('analytics')) {
    recs.push('analytics')
  }

  // Data connectors → data validation
  if (config.dataConnectors.connectors.length > 0 && !featureIds.includes('data-validation')) {
    recs.push('data-validation')
  }

  // Caching enabled → cache management
  if (config.caching.enabled && !featureIds.includes('cache-management')) {
    recs.push('cache-management')
  }

  return [...new Set(recs)]
}

export function getSecurityRecommendations(config: WorkflowConfigV2): string[] {
  const recs: string[] = []
  const { auth, deployment, security, dataConnectors, aiIntegrations } = config

  // Auth enabled but no encryption
  if (auth.enabled && security.encryption === 'none') {
    recs.push('Enable AES-256 encryption for authentication data')
  }

  // External APIs → CORS
  if (dataConnectors.connectors.some((c) => c.type === 'api') && !security.cors) {
    recs.push('Enable CORS for external API integrations')
  }

  // AI providers → rate limiting
  if (aiIntegrations.providers.some((p) => p.enabled) && !security.rateLimit) {
    recs.push('Enable rate limiting to protect AI endpoints')
  }

  // Production deployment → input validation
  if (deployment.target && !security.inputValidation) {
    recs.push('Enable input validation for production safety')
  }

  // Auth with MFA → CSP
  if (auth.mfa && !security.csp) {
    recs.push('Enable Content Security Policy for MFA flows')
  }

  // Compliance suggestions based on features
  if (auth.enabled && !security.compliance.includes('soc2')) {
    recs.push('Consider SOC 2 compliance for authentication systems')
  }
  if (dataConnectors.connectors.length > 0 && !security.compliance.includes('gdpr')) {
    recs.push('Consider GDPR compliance for data processing')
  }

  // Multi-region → encryption
  if (deployment.multiRegion && security.encryption === 'none') {
    recs.push('Enable encryption for cross-region data transfer')
  }

  // Webhook steps → HMAC verification
  if (config.steps.some((s) => s.type === 'webhook') && !security.inputValidation) {
    recs.push('Enable input validation for webhook payload verification')
  }

  return [...new Set(recs)]
}

export function getDeploymentRecommendations(config: WorkflowConfigV2): string[] {
  const recs: string[] = []
  const { steps, features, aiIntegrations, testing, deployment, queues, caching } = config
  const enabledProviders = aiIntegrations.providers.filter((p) => p.enabled)

  // Simple workflow → Vercel/Netlify
  if (steps.length <= 3 && enabledProviders.length === 0 && !deployment.target) {
    recs.push('Vercel or Netlify for simple workflow deployments')
  }

  // AI-heavy → dedicated infrastructure
  if (enabledProviders.length >= 2 && !deployment.target) {
    recs.push('AWS or GCP for AI-heavy workloads with GPU access')
  }
  if (enabledProviders.some((p) => p.mode === 'local')) {
    recs.push('Self-hosted or Docker for local AI model serving')
  }

  // Queue-heavy → Kubernetes
  if (queues.enabled && queues.queues.length > 1 && !deployment.target) {
    recs.push('Docker or Kubernetes for queue-based architectures')
  }

  // High caching → Redis-ready hosting
  if (caching.enabled && caching.provider === 'redis' && !deployment.target) {
    recs.push('AWS or Railway for managed Redis hosting')
  }

  // No testing but deploying
  if (deployment.target && testing.unitFramework === 'none' && testing.e2eFramework === 'none') {
    recs.push('Add testing before deployment to prevent regressions')
  }

  // No CI/CD
  if (deployment.target && deployment.ciProvider === 'none') {
    recs.push('Add CI/CD pipeline for automated deployments')
  }

  // No rollback strategy
  if (deployment.target && !deployment.rollback) {
    recs.push('Enable rollback strategy for production safety')
  }

  // No environments
  if (deployment.target && deployment.environments.length === 0) {
    recs.push('Add staging environment for pre-production testing')
  }

  return [...new Set(recs)]
}

export function getIntegrationRecommendations(config: WorkflowConfigV2): string[] {
  const recs: string[] = []
  const { notifications, auth, steps, monitoring } = config

  // Notifications enabled → suggest channels
  if (notifications.enabled) {
    const channels = notifications.channels.map((c) => c.type)
    if (!channels.includes('slack')) recs.push('Add Slack for team notifications')
    if (!channels.includes('email')) recs.push('Add email for critical alerts')
  }

  // Auth enabled → OAuth providers
  if (auth.enabled) {
    const methods = auth.methods.map((m) => m.type)
    if (!methods.includes('oauth')) recs.push('Add OAuth for social login support')
  }

  // Monitoring → suggest providers
  if (monitoring.enabled) {
    if (!monitoring.tracing) recs.push('Enable distributed tracing for debugging')
    if (!monitoring.alerting) recs.push('Enable alerting for incident response')
  } else if (steps.length > 3) {
    recs.push('Enable monitoring for workflow observability')
  }

  // Error handling in steps → Sentry
  if (steps.some((s) => s.errorHandling !== 'stop')) {
    if (config.logging.provider === 'console') {
      recs.push('Add Sentry or Datadog for error tracking')
    }
  }

  // Webhook steps → API gateway
  if (steps.filter((s) => s.type === 'webhook').length > 2) {
    recs.push('Consider an API gateway for webhook management')
  }

  // Business service integrations
  const stepText = steps.map((s) => `${s.title} ${s.description}`.toLowerCase()).join(' ')
  const hasExpenseTerms = stepText.includes('expense') || stepText.includes('receipt') || stepText.includes('budget')
  const hasLeaveTerms = stepText.includes('sick') || stepText.includes('leave') || stepText.includes('absence')
  const hasLdapAuth = auth.methods.some((m) => m.type === 'ldap-bind' || m.type === 'saml')

  if (hasExpenseTerms) {
    const hasAiProvider = config.aiIntegrations.providers.some((p) => p.enabled)
    if (!hasAiProvider) recs.push('Add AI provider for receipt OCR and data extraction')
  }
  if (hasLeaveTerms) {
    const channels = notifications.channels.map((c) => c.type)
    if (!channels.includes('teams') && !channels.includes('slack')) {
      recs.push('Add Teams or Slack for absence notifications')
    }
  }
  if (hasLdapAuth && !config.dataConnectors.connectors.some((c) => c.provider === 'ldap')) {
    recs.push('Add LDAP data connector for directory sync')
  }

  // Project management / time tracking / invoicing → untermStrich
  const hasProjectTerms = stepText.includes('project') || stepText.includes('controlling') || stepText.includes('budget')
  const hasTimeTerms = stepText.includes('time track') || stepText.includes('timesheet') || stepText.includes('hours')
  const hasInvoiceTerms = stepText.includes('invoice') || stepText.includes('billing') || stepText.includes('invoic')
  const hasUntermStrich = config.dataConnectors.connectors.some((c) => c.provider === 'untermstrich')
  if ((hasProjectTerms || hasTimeTerms || hasInvoiceTerms) && !hasUntermStrich) {
    recs.push('Add untermStrich for project controlling, time tracking, and invoicing')
  }

  return [...new Set(recs)]
}

export function getPublishingRecommendations(config: WorkflowConfigV2): string[] {
  const recs: string[] = []
  const { publishing, auth, deployment, testing, security } = config

  // No business model → suggest based on auth/RBAC config
  if (!publishing.businessModel) {
    if (auth.enabled && auth.rbac) {
      recs.push('Consider SaaS Subscription or Per-Seat model for multi-user apps')
    } else if (auth.enabled) {
      recs.push('Consider Freemium or SaaS model for authenticated apps')
    }
  }

  // SaaS/per-seat without auth
  if ((publishing.businessModel === 'saas-subscription' || publishing.businessModel === 'per-seat') && !auth.enabled) {
    recs.push('Enable authentication for subscription-based models')
  }

  // No channels but has deployment
  if (publishing.distributionChannels.length === 0 && deployment.target) {
    if (deployment.target === 'vercel' || deployment.target === 'netlify') {
      recs.push('Add Web (Custom Domain) as distribution channel')
    } else if (deployment.target === 'docker') {
      recs.push('Add Docker Hub as distribution channel')
    }
  }

  // PWA without responsive UI
  if (publishing.distributionChannels.includes('pwa') && !config.ui.responsive) {
    recs.push('Enable responsive design for PWA distribution')
  }

  // Mobile stores → note native wrapper needed
  if (publishing.distributionChannels.includes('app-store-ios') || publishing.distributionChannels.includes('google-play')) {
    recs.push('Mobile store distribution requires a native wrapper (Capacitor, React Native)')
  }

  // npm without semver
  if (publishing.distributionChannels.includes('npm') && publishing.versioning !== 'semver') {
    recs.push('npm packages should use Semantic Versioning (SemVer)')
  }

  // Open source without license
  if (publishing.businessModel === 'open-source' && !publishing.license) {
    recs.push('Add an open-source license (MIT or Apache 2.0 recommended)')
  }

  // No changelog with channels
  if (publishing.distributionChannels.length > 0 && !publishing.changelogEnabled) {
    recs.push('Enable changelog to keep users informed about updates')
  }

  // Auto-publish without CI/CD or testing
  if (publishing.autoPublish && deployment.ciProvider === 'none') {
    recs.push('Configure CI/CD before enabling auto-publish')
  }
  if (publishing.autoPublish && testing.unitFramework === 'none' && testing.e2eFramework === 'none') {
    recs.push('Add testing before enabling auto-publish to prevent regressions')
  }

  // Enterprise without compliance
  if (publishing.businessModel === 'enterprise' && security.compliance.length === 0) {
    recs.push('Consider SOC 2 or ISO 27001 compliance for enterprise customers')
  }

  return [...new Set(recs)]
}

export function getStackRecommendations(config: WorkflowConfigV2): string[] {
  const recs: string[] = []
  const { dataConnectors, caching, queues, steps, storage } = config

  // High data volume → Redis
  if (dataConnectors.connectors.length > 2 && !caching.enabled) {
    recs.push('Enable Redis caching for high data throughput')
  }

  // Queue needs
  if (steps.some((s) => s.type === 'parallel') && !queues.enabled) {
    recs.push('Add message queue (BullMQ) for parallel step processing')
  }

  // Real-time requirements
  if (steps.some((s) => s.type === 'webhook') && config.orchestration.mode === 'event-driven') {
    recs.push('Consider WebSocket connections for real-time event streaming')
  }

  // File storage
  if (steps.some((s) => s.templates.length > 0) && !storage.enabled) {
    recs.push('Enable file storage for template and asset management')
  }

  // Database connectors but no health checks
  if (dataConnectors.connectors.some((c) => c.type === 'database') && !dataConnectors.connectors.every((c) => c.healthCheck)) {
    recs.push('Enable health checks on database connectors')
  }

  // Secrets management
  if (config.secrets.provider === 'env' && dataConnectors.connectors.length > 1) {
    recs.push('Consider Vault or cloud secrets manager for secure credential storage')
  }

  // Circuit breaker for external APIs
  if (dataConnectors.connectors.some((c) => c.type === 'api') && !config.orchestration.circuitBreaker) {
    recs.push('Enable circuit breaker for external API resilience')
  }

  return [...new Set(recs)]
}
