import { z } from 'zod'
import { ciConfigSchema } from '@/lib/shared-pipeline/ci'

// ── Shared Sub-schemas (preserved from v1) ─────────────────────

export const workflowTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['document', 'spreadsheet', 'image', 'code', 'other']),
  size: z.number().optional(),
  url: z.string().url().optional(),
})

export const workflowLinkSchema = z.object({
  id: z.string(),
  label: z.string().min(1),
  url: z.string().url(),
  type: z.enum(['reference', 'documentation', 'api', 'external', 'internal']),
})

export const workflowServiceSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['rest', 'graphql', 'webhook', 'database', 'queue', 'storage']),
  endpoint: z.string().optional(),
  authType: z.enum(['none', 'api-key', 'oauth', 'bearer', 'basic']),
})

// ── Helper ──────────────────────────────────────────────────────

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

// ── Step 2: Enhanced Step Schema (v2) ──────────────────────────

export const workflowStepV2Schema = z.object({
  id: z.string(),
  order: z.number().int().min(0),
  title: z.string().min(1, 'Step title is required'),
  description: z.string().default(''),
  templates: z.array(workflowTemplateSchema).default([]),
  links: z.array(workflowLinkSchema).default([]),
  services: z.array(workflowServiceSchema).default([]),
  isExpanded: z.boolean().default(true),
  // v2 enhancements
  type: z.enum(['action', 'condition', 'loop', 'parallel', 'delay', 'webhook', 'manual']).default('action'),
  condition: z.string().default(''),
  retries: z.number().int().min(0).default(0),
  inputMapping: z.string().default(''),
  outputMapping: z.string().default(''),
  errorHandling: z.enum(['stop', 'skip', 'retry', 'fallback']).default('stop'),
  fallbackStepId: z.string().default(''),
  dependencies: z.array(z.string()).default([]),
  timeout: z.number().int().min(0).default(30000),
})

// ── Step 1: Meta ───────────────────────────────────────────────

const metaSchema = z.object({
  name: z.string().default(''),
  version: z.string().default('1.0.0'),
  description: z.string().default(''),
  author: z.string().default(''),
  tags: z.array(z.string()).default([]),
  license: z.string().default('MIT'),
})

// ── Step 3: Triggers & Orchestration ───────────────────────────

const triggerSchema = z.object({
  id: z.string(),
  type: z.enum(['manual', 'cron', 'webhook', 'event', 'api', 'file-watch', 'queue', 'schedule']),
  config: z.string().default(''),
  enabled: z.boolean().default(true),
})

const triggersSchema = z.object({
  triggers: z.array(triggerSchema).default([]),
})

const orchestrationSchema = z.object({
  mode: z.enum(['sequential', 'parallel', 'dag', 'saga', 'state-machine', 'event-driven']).default('sequential'),
  circuitBreaker: z.boolean().default(false),
  circuitBreakerThreshold: z.number().int().min(1).default(5),
  maxConcurrency: z.number().int().min(1).default(10),
  retryPolicy: z.enum(['none', 'fixed', 'exponential']).default('none'),
  retryMax: z.number().int().min(0).default(3),
})

// ── Step 4: Data Connectors ────────────────────────────────────

const dataConnectorSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['database', 'api', 'file', 'stream', 'queue', 'cache']),
  provider: z.string().default(''),
  connectionString: z.string().default(''),
  poolSize: z.number().int().min(1).default(10),
  healthCheck: z.boolean().default(true),
})

const dataConnectorsSchema = z.object({
  connectors: z.array(dataConnectorSchema).default([]),
})

// ── Step 5: Variables & Secrets ────────────────────────────────

const variableSchema = z.object({
  id: z.string(),
  key: z.string().min(1),
  value: z.string().default(''),
  scope: z.enum(['global', 'environment', 'runtime', 'computed']).default('global'),
})

const variablesSchema = z.object({
  variables: z.array(variableSchema).default([]),
})

const secretsSchema = z.object({
  provider: z.enum(['env', 'vault', 'aws-secrets', 'gcp-secrets', 'azure-keyvault', 'doppler']).default('env'),
  keys: z.array(z.string()).default([]),
  rotationEnabled: z.boolean().default(false),
})

// ── Step 6: Storage & Caching ──────────────────────────────────

const storageSchema = z.object({
  enabled: z.boolean().default(false),
  type: z.enum(['local', 's3', 'gcs', 'azure-blob', 'minio']).default('local'),
  bucket: z.string().default(''),
  maxFileSize: z.number().int().default(10485760),
  allowedTypes: z.array(z.string()).default([]),
})

const cachingSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.enum(['redis', 'memcached', 'upstash', 'in-memory', 'none']).default('none'),
  ttl: z.number().int().min(0).default(3600),
  strategy: z.enum(['lru', 'lfu', 'fifo', 'ttl']).default('lru'),
})

const queueConfigSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  provider: z.enum(['bullmq', 'sqs', 'rabbitmq', 'kafka', 'inngest']),
  concurrency: z.number().int().min(1).default(5),
})

const queuesSchema = z.object({
  enabled: z.boolean().default(false),
  queues: z.array(queueConfigSchema).default([]),
})

// ── Step 7: AI Integrations ────────────────────────────────────

const aiProviderSchema = z.object({
  id: z.string(),
  provider: z.enum(['openai', 'anthropic', 'google', 'mistral', 'deepseek', 'local', 'n8n']),
  enabled: z.boolean().default(false),
  model: z.string().default(''),
  mode: z.enum(['local', 'service', 'both']).default('service'),
  endpoint: z.string().default(''),
})

const aiIntegrationsSchema = z.object({
  providers: z.array(aiProviderSchema).default([]),
  rag: z.boolean().default(false),
  ragProvider: z.string().default(''),
  guardrails: z.boolean().default(false),
  guardrailsConfig: z.string().default(''),
  fallbackEnabled: z.boolean().default(false),
  fallbackProvider: z.string().default(''),
  costTracking: z.boolean().default(false),
})

// ── Step 8: Features & Modules ─────────────────────────────────

const moduleSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  category: z.string().default('core'),
  enabled: z.boolean().default(true),
  config: z.string().default(''),
})

const featuresSchema = z.object({
  featureIds: z.array(z.string()).default([]),
  customFeatures: z.string().default(''),
  modules: z.array(moduleSchema).default([]),
})

// ── Step 9: Middleware & Plugins ────────────────────────────────

const middlewareItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['auth', 'logging', 'rate-limit', 'cors', 'compression', 'transform', 'validation', 'custom']),
  order: z.number().int().min(0).default(0),
  enabled: z.boolean().default(true),
  config: z.string().default(''),
})

const middlewareSchema = z.object({
  items: z.array(middlewareItemSchema).default([]),
})

const pluginSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  version: z.string().default('latest'),
  enabled: z.boolean().default(true),
  config: z.string().default(''),
})

const pluginsSchema = z.object({
  plugins: z.array(pluginSchema).default([]),
})

const extensionSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['transform', 'validator', 'adapter', 'formatter', 'hook']),
  code: z.string().default(''),
})

const extensionsSchema = z.object({
  extensions: z.array(extensionSchema).default([]),
})

// ── Step 10: Authentication ────────────────────────────────────

const authMethodSchema = z.object({
  type: z.string(),
  enabled: z.boolean().default(true),
  config: z.string().default(''),
})

const authPolicySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  resource: z.string().default('*'),
  action: z.string().default('read'),
  roles: z.array(z.string()).default([]),
})

const authSchema = z.object({
  enabled: z.boolean().default(false),
  methods: z.array(authMethodSchema).default([]),
  roles: z.array(z.string()).default([]),
  rbac: z.boolean().default(false),
  policies: z.array(authPolicySchema).default([]),
  sessionStrategy: z.enum(['jwt', 'session', 'hybrid']).default('jwt'),
  sessionTtl: z.number().int().min(0).default(86400),
  mfa: z.boolean().default(false),
})

// ── Step 11: Security & Compliance ─────────────────────────────

const securitySchema = z.object({
  encryption: z.enum(['aes-256', 'rsa', 'none']).default('none'),
  cors: z.boolean().default(true),
  corsOrigins: z.array(z.string()).default(['*']),
  csp: z.boolean().default(false),
  cspDirectives: z.string().default(''),
  rateLimit: z.boolean().default(false),
  rateLimitMax: z.number().int().min(0).default(100),
  rateLimitWindow: z.number().int().min(0).default(60),
  inputValidation: z.boolean().default(true),
  compliance: z.array(z.string()).default([]),
})

// ── Step 12: Notifications & Hooks ─────────────────────────────

const notificationChannelSchema = z.object({
  id: z.string(),
  type: z.enum(['email', 'sms', 'push', 'webhook', 'slack', 'teams', 'in-app']),
  provider: z.string().default(''),
  enabled: z.boolean().default(true),
  config: z.string().default(''),
})

const notificationsSchema = z.object({
  enabled: z.boolean().default(false),
  channels: z.array(notificationChannelSchema).default([]),
})

const hookSchema = z.object({
  id: z.string(),
  event: z.enum(['before-step', 'after-step', 'on-error', 'on-complete', 'on-start', 'on-cancel']),
  handler: z.string().default(''),
  enabled: z.boolean().default(true),
})

const hooksSchema = z.object({
  hooks: z.array(hookSchema).default([]),
})

// ── Step 13: Logging & Monitoring ──────────────────────────────

const loggingSchema = z.object({
  level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  structured: z.boolean().default(true),
  provider: z.enum(['console', 'file', 'sentry', 'datadog', 'logtail', 'axiom']).default('console'),
  retentionDays: z.number().int().min(1).default(30),
})

const monitoringSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.enum(['datadog', 'prometheus', 'grafana', 'newrelic', 'custom']).default('datadog'),
  metrics: z.boolean().default(false),
  tracing: z.boolean().default(false),
  tracingProvider: z.string().default(''),
  healthChecks: z.boolean().default(true),
  healthCheckInterval: z.number().int().min(1).default(30),
  alerting: z.boolean().default(false),
  alertChannels: z.array(z.string()).default([]),
})

// ── Step 14: Testing ──────────────────────────────────────────

const testingSchema = z.object({
  unitFramework: z.enum(['vitest', 'jest', 'node-test', 'none']).default('vitest'),
  integrationFramework: z.enum(['vitest', 'jest', 'supertest', 'none']).default('vitest'),
  e2eFramework: z.enum(['playwright', 'cypress', 'none']).default('none'),
  loadTesting: z.boolean().default(false),
  loadTestTool: z.string().default(''),
  coverageTarget: z.number().int().min(0).max(100).default(80),
  dryRun: z.boolean().default(false),
})

// ── Step 15: Deployment & CI/CD ────────────────────────────────

const environmentSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  url: z.string().default(''),
  variables: z.array(z.string()).default([]),
})

const deploymentSchema = z.object({
  target: z.enum(['vercel', 'aws', 'gcp', 'docker', 'self-host', 'netlify', 'railway', '']).default(''),
  region: z.string().default(''),
  multiRegion: z.boolean().default(false),
  regions: z.array(z.string()).default([]),
  scaling: z.enum(['auto', 'fixed', 'serverless']).default('auto'),
  minInstances: z.number().int().min(0).default(1),
  maxInstances: z.number().int().min(1).default(10),
  ciProvider: z.enum(['github-actions', 'gitlab-ci', 'circleci', 'vercel', 'none']).default('none'),
  ciStages: z.array(z.string()).default([]),
  rollback: z.boolean().default(false),
  rollbackStrategy: z.enum(['automatic', 'manual']).default('automatic'),
  environments: z.array(environmentSchema).default([]),
})

// ── Step 16: UI & Documentation ────────────────────────────────

const uiSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  primaryColor: z.string().default('#0ea5e9'),
  layout: z.enum(['sidebar', 'topnav', 'minimal', 'dashboard']).default('sidebar'),
  fontFamily: z.string().default('inter'),
  branding: z.string().default(''),
  componentLibrary: z.string().default('shadcn'),
  responsive: z.boolean().default(true),
  i18n: z.boolean().default(false),
  i18nLocales: z.array(z.string()).default(['en']),
  accessibility: z.boolean().default(true),
})

const documentationSchema = z.object({
  enabled: z.boolean().default(false),
  format: z.enum(['markdown', 'openapi', 'jsdoc', 'typedoc', 'storybook']).default('markdown'),
  autoGenerate: z.boolean().default(false),
  outputDir: z.string().default('./docs'),
  includeExamples: z.boolean().default(true),
})

// ── Step 17: Publishing & Distribution ──────────────────────────

const storeListingSchema = z.object({
  id: z.string(),
  channel: z.string().default(''),
  appId: z.string().default(''),
  url: z.string().default(''),
})

const publishingSchema = z.object({
  businessModel: z.string().default(''),
  distributionChannels: z.array(z.string()).default([]),
  license: z.string().default(''),
  customEula: z.string().default(''),
  releaseStrategy: z.string().default('stable'),
  versioning: z.string().default('semver'),
  customDomain: z.string().default(''),
  storeListings: z.array(storeListingSchema).default([]),
  changelogEnabled: z.boolean().default(false),
  autoPublish: z.boolean().default(false),
})

// ── Full v2 Schema ─────────────────────────────────────────────

export const workflowConfigV2Schema = z.object({
  meta: metaSchema.default(metaSchema.parse({})),
  steps: z.array(workflowStepV2Schema).default([]),
  triggers: triggersSchema.default(triggersSchema.parse({})),
  orchestration: orchestrationSchema.default(orchestrationSchema.parse({})),
  dataConnectors: dataConnectorsSchema.default(dataConnectorsSchema.parse({})),
  variables: variablesSchema.default(variablesSchema.parse({})),
  secrets: secretsSchema.default(secretsSchema.parse({})),
  storage: storageSchema.default(storageSchema.parse({})),
  caching: cachingSchema.default(cachingSchema.parse({})),
  queues: queuesSchema.default(queuesSchema.parse({})),
  aiIntegrations: aiIntegrationsSchema.default(aiIntegrationsSchema.parse({})),
  features: featuresSchema.default(featuresSchema.parse({})),
  middleware: middlewareSchema.default(middlewareSchema.parse({})),
  plugins: pluginsSchema.default(pluginsSchema.parse({})),
  extensions: extensionsSchema.default(extensionsSchema.parse({})),
  auth: authSchema.default(authSchema.parse({})),
  security: securitySchema.default(securitySchema.parse({})),
  notifications: notificationsSchema.default(notificationsSchema.parse({})),
  hooks: hooksSchema.default(hooksSchema.parse({})),
  logging: loggingSchema.default(loggingSchema.parse({})),
  monitoring: monitoringSchema.default(monitoringSchema.parse({})),
  testing: testingSchema.default(testingSchema.parse({})),
  deployment: deploymentSchema.default(deploymentSchema.parse({})),
  ui: uiSchema.default(uiSchema.parse({})),
  documentation: documentationSchema.default(documentationSchema.parse({})),
  ci: ciConfigSchema.default(ciConfigSchema.parse({})),
  publishing: publishingSchema.default(publishingSchema.parse({})),
})

// ── Type Exports ──────────────────────────────────────────────

export type WorkflowTemplate = z.infer<typeof workflowTemplateSchema>
export type WorkflowLink = z.infer<typeof workflowLinkSchema>
export type WorkflowService = z.infer<typeof workflowServiceSchema>
export type WorkflowStepV2 = z.infer<typeof workflowStepV2Schema>
export type WorkflowConfigV2 = z.infer<typeof workflowConfigV2Schema>

// ── Default Config ─────────────────────────────────────────────

export const defaultWorkflowConfigV2: WorkflowConfigV2 = workflowConfigV2Schema.parse({})

// ── Create Empty Step (v2) ────────────────────────────────────

export function createEmptyStep(order: number): WorkflowStepV2 {
  return {
    id: generateId(),
    order,
    title: '',
    description: '',
    templates: [],
    links: [],
    services: [],
    isExpanded: true,
    type: 'action',
    condition: '',
    retries: 0,
    inputMapping: '',
    outputMapping: '',
    errorHandling: 'stop',
    fallbackStepId: '',
    dependencies: [],
    timeout: 30000,
  }
}

// ── V1 Detection & Migration ──────────────────────────────────

// V1 config shape had top-level: steps, features (array of strings), authEnabled, theme, etc.
export function isV1WorkflowConfig(config: Record<string, unknown>): boolean {
  return (
    'authEnabled' in config ||
    'deployTarget' in config ||
    ('features' in config && Array.isArray(config.features) && typeof config.features[0] === 'string') ||
    ('theme' in config && typeof config.theme === 'string' && !('meta' in config))
  )
}

interface V1WorkflowConfig {
  steps?: Array<{
    id: string
    order: number
    title: string
    description: string
    templates: unknown[]
    links: unknown[]
    services: unknown[]
    isExpanded: boolean
  }>
  features?: string[]
  customFeatures?: string
  authEnabled?: boolean
  authMethods?: string[]
  roles?: string[]
  theme?: string
  primaryColor?: string
  layout?: string
  aiIntegrations?: Array<{
    provider: string
    enabled: boolean
    mode: string
    config: { endpoint?: string; model?: string }
  }>
  deployTarget?: string
  region?: string
}

export function migrateWorkflowV1toV2(raw: Record<string, unknown>): WorkflowConfigV2 {
  const v1 = raw as unknown as V1WorkflowConfig

  const base = defaultWorkflowConfigV2

  // Migrate steps with v2 enhancements
  const steps: WorkflowStepV2[] = (v1.steps || []).map((s, i) => ({
    ...createEmptyStep(i),
    id: s.id,
    order: s.order ?? i,
    title: s.title || '',
    description: s.description || '',
    templates: (s.templates || []) as WorkflowTemplate[],
    links: (s.links || []) as WorkflowLink[],
    services: (s.services || []) as WorkflowService[],
    isExpanded: s.isExpanded ?? true,
  }))

  // Migrate features
  const features = {
    ...base.features,
    featureIds: v1.features || [],
    customFeatures: v1.customFeatures || '',
  }

  // Migrate auth
  const auth = {
    ...base.auth,
    enabled: v1.authEnabled || false,
    methods: (v1.authMethods || []).map((type) => ({ type, enabled: true, config: '' })),
    roles: v1.roles || [],
  }

  // Migrate UI
  const ui = {
    ...base.ui,
    theme: (v1.theme as 'light' | 'dark' | 'system') || 'system',
    primaryColor: v1.primaryColor || '#0ea5e9',
    layout: (v1.layout as 'sidebar' | 'topnav' | 'minimal' | 'dashboard') || 'sidebar',
  }

  // Migrate AI integrations
  const aiProviders = (v1.aiIntegrations || []).map((ai) => ({
    id: generateId(),
    provider: ai.provider as WorkflowStepV2['type'] extends string ? string : never,
    enabled: ai.enabled,
    model: ai.config?.model || '',
    mode: (ai.mode as 'local' | 'service' | 'both') || 'service',
    endpoint: ai.config?.endpoint || '',
  }))

  const aiIntegrations = {
    ...base.aiIntegrations,
    providers: aiProviders as WorkflowConfigV2['aiIntegrations']['providers'],
  }

  // Migrate deployment
  const deployment: WorkflowConfigV2['deployment'] = {
    ...base.deployment,
    target: (v1.deployTarget || '') as WorkflowConfigV2['deployment']['target'],
    region: v1.region || '',
  }

  return {
    ...base,
    steps,
    features,
    auth,
    ui,
    aiIntegrations,
    deployment,
  }
}
