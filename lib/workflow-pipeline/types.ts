// ── Workflow Pipeline v2 Types ─────────────────────────────────────

export interface WorkflowOption {
  value: string
  label: string
  icon?: string
  description?: string
}

export interface WorkflowStepCategory {
  id: string
  label: string
  steps: number[]
}

// ── Shared Sub-types ────────────────────────────────────────────────

export interface WorkflowTemplate {
  id: string
  name: string
  type: 'document' | 'spreadsheet' | 'image' | 'code' | 'other'
  size?: number
  url?: string
}

export interface WorkflowLink {
  id: string
  label: string
  url: string
  type: 'reference' | 'documentation' | 'api' | 'external' | 'internal'
}

export interface WorkflowService {
  id: string
  name: string
  type: 'rest' | 'graphql' | 'webhook' | 'database' | 'queue' | 'storage'
  endpoint?: string
  authType: 'none' | 'api-key' | 'oauth' | 'bearer' | 'basic'
}

// ── Step 1: Meta & Info ─────────────────────────────────────────────
export interface WorkflowMetaConfig {
  name: string
  version: string
  description: string
  author: string
  tags: string[]
  license: string
}

// ── Step 2: Steps Builder (v2 enhanced) ────────────────────────────
export interface WorkflowStepV2 {
  id: string
  order: number
  title: string
  description: string
  templates: WorkflowTemplate[]
  links: WorkflowLink[]
  services: WorkflowService[]
  isExpanded: boolean
  // v2 enhancements
  type: 'action' | 'condition' | 'loop' | 'parallel' | 'delay' | 'webhook' | 'manual'
  condition: string
  retries: number
  inputMapping: string
  outputMapping: string
  errorHandling: 'stop' | 'skip' | 'retry' | 'fallback'
  fallbackStepId: string
  dependencies: string[]
  timeout: number
}

// ── Step 3: Triggers & Orchestration ───────────────────────────────
export interface WorkflowTrigger {
  id: string
  type: 'manual' | 'cron' | 'webhook' | 'event' | 'api' | 'file-watch' | 'queue' | 'schedule'
  config: string
  enabled: boolean
}

export interface WorkflowTriggersConfig {
  triggers: WorkflowTrigger[]
}

export interface WorkflowOrchestrationConfig {
  mode: 'sequential' | 'parallel' | 'dag' | 'saga' | 'state-machine' | 'event-driven'
  circuitBreaker: boolean
  circuitBreakerThreshold: number
  maxConcurrency: number
  retryPolicy: 'none' | 'fixed' | 'exponential'
  retryMax: number
}

// ── Step 4: Data Connectors ────────────────────────────────────────
export interface WorkflowDataConnector {
  id: string
  name: string
  type: 'database' | 'api' | 'file' | 'stream' | 'queue' | 'cache'
  provider: string
  connectionString: string
  poolSize: number
  healthCheck: boolean
}

export interface WorkflowDataConnectorsConfig {
  connectors: WorkflowDataConnector[]
}

// ── Step 5: Variables & Secrets ────────────────────────────────────
export interface WorkflowVariable {
  id: string
  key: string
  value: string
  scope: 'global' | 'environment' | 'runtime' | 'computed'
}

export interface WorkflowVariablesConfig {
  variables: WorkflowVariable[]
}

export interface WorkflowSecretsConfig {
  provider: 'env' | 'vault' | 'aws-secrets' | 'gcp-secrets' | 'azure-keyvault' | 'doppler'
  keys: string[]
  rotationEnabled: boolean
}

// ── Step 6: Storage & Caching ──────────────────────────────────────
export interface WorkflowStorageConfig {
  enabled: boolean
  type: 'local' | 's3' | 'gcs' | 'azure-blob' | 'minio'
  bucket: string
  maxFileSize: number
  allowedTypes: string[]
}

export interface WorkflowCachingConfig {
  enabled: boolean
  provider: 'redis' | 'memcached' | 'upstash' | 'in-memory' | 'none'
  ttl: number
  strategy: 'lru' | 'lfu' | 'fifo' | 'ttl'
}

export interface WorkflowQueueConfig {
  id: string
  name: string
  provider: 'bullmq' | 'sqs' | 'rabbitmq' | 'kafka' | 'inngest'
  concurrency: number
}

export interface WorkflowQueuesConfig {
  enabled: boolean
  queues: WorkflowQueueConfig[]
}

// ── Step 7: AI Integrations ────────────────────────────────────────
export interface WorkflowAiProvider {
  id: string
  provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'deepseek' | 'local' | 'n8n'
  enabled: boolean
  model: string
  mode: 'local' | 'service' | 'both'
  endpoint: string
}

export interface WorkflowAiIntegrationsConfig {
  providers: WorkflowAiProvider[]
  rag: boolean
  ragProvider: string
  guardrails: boolean
  guardrailsConfig: string
  fallbackEnabled: boolean
  fallbackProvider: string
  costTracking: boolean
}

// ── Step 8: Features & Modules ────────────────────────────────────
export interface WorkflowModule {
  id: string
  name: string
  category: string
  enabled: boolean
  config: string
}

export interface WorkflowFeaturesConfig {
  featureIds: string[]
  customFeatures: string
  modules: WorkflowModule[]
}

// ── Step 9: Middleware & Plugins ───────────────────────────────────
export interface WorkflowMiddlewareItem {
  id: string
  name: string
  type: 'auth' | 'logging' | 'rate-limit' | 'cors' | 'compression' | 'transform' | 'validation' | 'custom'
  order: number
  enabled: boolean
  config: string
}

export interface WorkflowPlugin {
  id: string
  name: string
  version: string
  enabled: boolean
  config: string
}

export interface WorkflowExtension {
  id: string
  name: string
  type: 'transform' | 'validator' | 'adapter' | 'formatter' | 'hook'
  code: string
}

export interface WorkflowMiddlewareConfig {
  items: WorkflowMiddlewareItem[]
}

export interface WorkflowPluginsConfig {
  plugins: WorkflowPlugin[]
}

export interface WorkflowExtensionsConfig {
  extensions: WorkflowExtension[]
}

// ── Step 10: Authentication ────────────────────────────────────────
export interface WorkflowAuthMethod {
  type: string
  enabled: boolean
  config: string
}

export interface WorkflowAuthPolicy {
  id: string
  name: string
  resource: string
  action: string
  roles: string[]
}

export interface WorkflowAuthConfig {
  enabled: boolean
  methods: WorkflowAuthMethod[]
  roles: string[]
  rbac: boolean
  policies: WorkflowAuthPolicy[]
  sessionStrategy: 'jwt' | 'session' | 'hybrid'
  sessionTtl: number
  mfa: boolean
}

// ── Step 11: Security & Compliance ─────────────────────────────────
export interface WorkflowSecurityConfig {
  encryption: 'aes-256' | 'rsa' | 'none'
  cors: boolean
  corsOrigins: string[]
  csp: boolean
  cspDirectives: string
  rateLimit: boolean
  rateLimitMax: number
  rateLimitWindow: number
  inputValidation: boolean
  compliance: string[]
}

// ── Step 12: Notifications & Hooks ─────────────────────────────────
export interface WorkflowNotificationChannel {
  id: string
  type: 'email' | 'sms' | 'push' | 'webhook' | 'slack' | 'teams' | 'in-app'
  provider: string
  enabled: boolean
  config: string
}

export interface WorkflowHook {
  id: string
  event: 'before-step' | 'after-step' | 'on-error' | 'on-complete' | 'on-start' | 'on-cancel'
  handler: string
  enabled: boolean
}

export interface WorkflowNotificationsConfig {
  enabled: boolean
  channels: WorkflowNotificationChannel[]
}

export interface WorkflowHooksConfig {
  hooks: WorkflowHook[]
}

// ── Step 13: Logging & Monitoring ──────────────────────────────────
export interface WorkflowLoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal'
  structured: boolean
  provider: 'console' | 'file' | 'sentry' | 'datadog' | 'logtail' | 'axiom'
  retentionDays: number
}

export interface WorkflowMonitoringConfig {
  enabled: boolean
  provider: 'datadog' | 'prometheus' | 'grafana' | 'newrelic' | 'custom'
  metrics: boolean
  tracing: boolean
  tracingProvider: string
  healthChecks: boolean
  healthCheckInterval: number
  alerting: boolean
  alertChannels: string[]
}

// ── Step 14: Testing ────────────────────────────────────────────────
export interface WorkflowTestingConfig {
  unitFramework: 'vitest' | 'jest' | 'node-test' | 'none'
  integrationFramework: 'vitest' | 'jest' | 'supertest' | 'none'
  e2eFramework: 'playwright' | 'cypress' | 'none'
  loadTesting: boolean
  loadTestTool: string
  coverageTarget: number
  dryRun: boolean
}

// ── Step 15: Deployment & CI/CD ────────────────────────────────────
export interface WorkflowEnvironment {
  id: string
  name: string
  url: string
  variables: string[]
}

export interface WorkflowDeploymentConfig {
  target: 'vercel' | 'aws' | 'gcp' | 'docker' | 'self-host' | 'netlify' | 'railway' | ''
  region: string
  multiRegion: boolean
  regions: string[]
  scaling: 'auto' | 'fixed' | 'serverless'
  minInstances: number
  maxInstances: number
  ciProvider: 'github-actions' | 'gitlab-ci' | 'circleci' | 'vercel' | 'none'
  ciStages: string[]
  rollback: boolean
  rollbackStrategy: 'automatic' | 'manual'
  environments: WorkflowEnvironment[]
}

// ── Step 16: UI & Documentation ────────────────────────────────────
export interface WorkflowUiConfig {
  theme: 'light' | 'dark' | 'system'
  primaryColor: string
  layout: 'sidebar' | 'topnav' | 'minimal' | 'dashboard'
  fontFamily: string
  branding: string
  componentLibrary: string
  responsive: boolean
  i18n: boolean
  i18nLocales: string[]
  accessibility: boolean
}

export interface WorkflowDocumentationConfig {
  enabled: boolean
  format: 'markdown' | 'openapi' | 'jsdoc' | 'typedoc' | 'storybook'
  autoGenerate: boolean
  outputDir: string
  includeExamples: boolean
}

// ── Main Aggregate Config ──────────────────────────────────────────
export interface WorkflowConfigV2 {
  meta: WorkflowMetaConfig
  steps: WorkflowStepV2[]
  triggers: WorkflowTriggersConfig
  orchestration: WorkflowOrchestrationConfig
  dataConnectors: WorkflowDataConnectorsConfig
  variables: WorkflowVariablesConfig
  secrets: WorkflowSecretsConfig
  storage: WorkflowStorageConfig
  caching: WorkflowCachingConfig
  queues: WorkflowQueuesConfig
  aiIntegrations: WorkflowAiIntegrationsConfig
  features: WorkflowFeaturesConfig
  middleware: WorkflowMiddlewareConfig
  plugins: WorkflowPluginsConfig
  extensions: WorkflowExtensionsConfig
  auth: WorkflowAuthConfig
  security: WorkflowSecurityConfig
  notifications: WorkflowNotificationsConfig
  hooks: WorkflowHooksConfig
  logging: WorkflowLoggingConfig
  monitoring: WorkflowMonitoringConfig
  testing: WorkflowTestingConfig
  deployment: WorkflowDeploymentConfig
  ui: WorkflowUiConfig
  documentation: WorkflowDocumentationConfig
}
