import { z } from 'zod'
import { ciConfigSchema } from '@/lib/shared-pipeline/ci'
import type { PresetConfigV2 } from '@/lib/preset-pipeline/types'

// ── Sub-schemas ──────────────────────────────────────────────────

const metaConfigSchema = z.object({
  businessName: z.string().default(''),
  industry: z.string().default(''),
  description: z.string().default(''),
  logo: z.string().default(''),
  favicon: z.string().default(''),
  version: z.string().default('1.0.0'),
  repository: z.string().default(''),
  maintainers: z.array(z.string()).default([]),
})

const appShellConfigSchema = z.object({
  appType: z.string().default(''),
  framework: z.string().default('nextjs'),
  language: z.string().default('typescript'),
  runtime: z.string().default('node'),
  ssr: z.boolean().default(true),
  pwa: z.boolean().default(false),
  targetUsers: z.array(z.string()).default([]),
  locales: z.array(z.string()).default(['en']),
})

const authProviderSchema = z.object({
  type: z.string(),
  enabled: z.boolean().default(true),
})

const authSecurityConfigSchema = z.object({
  enabled: z.boolean().default(true),
  providers: z.array(authProviderSchema).default([{ type: 'email', enabled: true }]),
  mfa: z.boolean().default(false),
  sessionStrategy: z.string().default('jwt'),
  roles: z.array(z.string()).default(['admin', 'user']),
  rbac: z.boolean().default(false),
  securityHeaders: z.boolean().default(true),
  encryption: z.boolean().default(true),
  bruteForceProtection: z.boolean().default(true),
})

const entityFieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean().default(true),
})

const entitySchema = z.object({
  name: z.string(),
  fields: z.array(entityFieldSchema).default([]),
})

const databaseConfigSchema = z.object({
  enabled: z.boolean().default(true),
  provider: z.string().default('postgresql'),
  orm: z.string().default('prisma'),
  entities: z.array(entitySchema).default([]),
  audit: z.boolean().default(false),
  softDelete: z.boolean().default(false),
  multiTenancy: z.boolean().default(false),
})

const apiConfigSchema = z.object({
  enabled: z.boolean().default(true),
  style: z.string().default('rest'),
  versioning: z.boolean().default(true),
  graphql: z.boolean().default(false),
  rateLimit: z.boolean().default(true),
  rateLimitMax: z.number().default(100),
  cors: z.boolean().default(true),
  pagination: z.string().default('offset'),
})

const moduleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(''),
})

const featuresConfigSchema = z.object({
  coreFeatures: z.array(z.string()).default([]),
  customFeatures: z.string().default(''),
  modules: z.array(moduleSchema).default([]),
})

const uiThemeConfigSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  primaryColor: z.string().default('#0066FF'),
  fontFamily: z.string().default('inter'),
  darkMode: z.boolean().default(true),
  componentLibrary: z.string().default('shadcn'),
  responsive: z.boolean().default(true),
  layout: z.string().default('sidebar'),
  sidebarCollapsible: z.boolean().default(true),
  headerFixed: z.boolean().default(true),
  footerEnabled: z.boolean().default(false),
})

const pageDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  route: z.string(),
  layout: z.string().default('default'),
  authRequired: z.boolean().default(true),
})

const pagesConfigSchema = z.object({
  pages: z.array(pageDefinitionSchema).default([]),
  breadcrumbs: z.boolean().default(true),
})

const storageConfigSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.string().default('s3'),
  cdn: z.boolean().default(false),
  imageOptimization: z.boolean().default(true),
  maxFileSize: z.number().default(10),
  allowedTypes: z.array(z.string()).default(['images', 'documents']),
})

const notificationChannelSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.string().default(''),
})

const notificationsConfigSchema = z.object({
  enabled: z.boolean().default(false),
  inApp: notificationChannelSchema.default({ enabled: true, provider: 'built-in' }),
  email: notificationChannelSchema.default({ enabled: false, provider: '' }),
  push: notificationChannelSchema.default({ enabled: false, provider: '' }),
  sms: notificationChannelSchema.default({ enabled: false, provider: '' }),
  webhook: notificationChannelSchema.default({ enabled: false, provider: '' }),
})

const aiConfigSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.string().default('openai'),
  features: z.array(z.string()).default([]),
  rag: z.boolean().default(false),
  guardrails: z.boolean().default(false),
})

const searchConfigSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.string().default('built-in'),
  indexing: z.string().default('realtime'),
  fuzzy: z.boolean().default(true),
})

const aiSearchConfigSchema = z.object({
  ai: aiConfigSchema.default(aiConfigSchema.parse({})),
  search: searchConfigSchema.default(searchConfigSchema.parse({})),
})

const paymentPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().default(0),
  interval: z.string().default('monthly'),
})

const paymentsConfigSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.string().default('stripe'),
  plans: z.array(paymentPlanSchema).default([]),
  subscriptions: z.boolean().default(false),
  metered: z.boolean().default(false),
  invoicing: z.boolean().default(false),
})

const cronJobSchema = z.object({
  id: z.string(),
  name: z.string(),
  schedule: z.string().default(''),
  description: z.string().default(''),
})

const realtimeBackgroundConfigSchema = z.object({
  realtimeEnabled: z.boolean().default(false),
  presence: z.boolean().default(false),
  collaboration: z.boolean().default(false),
  cronJobs: z.array(cronJobSchema).default([]),
  queueProvider: z.string().default('none'),
  cacheProvider: z.string().default('none'),
  loggingProvider: z.string().default('console'),
})

const testingCiCdConfigSchema = z.object({
  unitFramework: z.string().default('vitest'),
  e2eFramework: z.string().default('playwright'),
  coverageTarget: z.number().default(80),
  ciProvider: z.string().default('github-actions'),
  stages: z.array(z.string()).default(['lint', 'typecheck', 'unit-test', 'build']),
  environments: z.array(z.string()).default(['development', 'production']),
})

const integrationServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
})

const integrationsConfigSchema = z.object({
  services: z.array(integrationServiceSchema).default([]),
  webhooks: z.boolean().default(false),
  oauth2: z.boolean().default(false),
  apiKeys: z.boolean().default(false),
  plugins: z.array(z.string()).default([]),
  workflows: z.array(z.string()).default([]),
})

const deployConfigSchema = z.object({
  target: z.string().default('vercel'),
  region: z.string().default('auto'),
  domains: z.array(z.string()).default([]),
  envVars: z.boolean().default(true),
  scaling: z.string().default('auto'),
  docker: z.boolean().default(false),
  i18n: z.boolean().default(false),
  accessibility: z.boolean().default(true),
  seo: z.boolean().default(true),
  distributionChannels: z.array(z.string()).default([]),
})

// ── Main Schema ──────────────────────────────────────────────────

export const presetConfigV2Schema = z.object({
  meta: metaConfigSchema.default(metaConfigSchema.parse({})),
  ci: ciConfigSchema.default(ciConfigSchema.parse({})),
  app: appShellConfigSchema.default(appShellConfigSchema.parse({})),
  auth: authSecurityConfigSchema.default(authSecurityConfigSchema.parse({})),
  database: databaseConfigSchema.default(databaseConfigSchema.parse({})),
  api: apiConfigSchema.default(apiConfigSchema.parse({})),
  features: featuresConfigSchema.default(featuresConfigSchema.parse({})),
  ui: uiThemeConfigSchema.default(uiThemeConfigSchema.parse({})),
  pages: pagesConfigSchema.default(pagesConfigSchema.parse({})),
  storage: storageConfigSchema.default(storageConfigSchema.parse({})),
  notifications: notificationsConfigSchema.default(notificationsConfigSchema.parse({})),
  aiSearch: aiSearchConfigSchema.default(aiSearchConfigSchema.parse({})),
  payments: paymentsConfigSchema.default(paymentsConfigSchema.parse({})),
  realtimeBackground: realtimeBackgroundConfigSchema.default(realtimeBackgroundConfigSchema.parse({})),
  testingCiCd: testingCiCdConfigSchema.default(testingCiCdConfigSchema.parse({})),
  integrations: integrationsConfigSchema.default(integrationsConfigSchema.parse({})),
  deploy: deployConfigSchema.default(deployConfigSchema.parse({})),
})

// ── Default Config ───────────────────────────────────────────────

export const defaultPresetConfigV2: PresetConfigV2 = presetConfigV2Schema.parse({})

// ── V1 Detection & Migration ─────────────────────────────────────

interface V1Config {
  businessName?: string
  industry?: string
  description?: string
  appType?: string
  targetUsers?: string[]
  features?: string[]
  customFeatures?: string
  entities?: Array<{ name: string; fields: Array<{ name: string; type: string; required: boolean }> }>
  authMethods?: string[]
  roles?: string[]
  theme?: string
  primaryColor?: string
  layout?: string
  integrations?: string[]
  deployTarget?: string
  region?: string
}

export function isV1Config(config: Record<string, unknown>): boolean {
  // V1 has flat top-level fields; V2 has nested block objects
  return (
    typeof config.businessName === 'string' ||
    typeof config.appType === 'string' ||
    (Array.isArray(config.authMethods) && !config.meta)
  )
}

export function migrateV1toV2(v1: V1Config): PresetConfigV2 {
  return presetConfigV2Schema.parse({
    meta: {
      businessName: v1.businessName || '',
      industry: v1.industry || '',
      description: v1.description || '',
    },
    app: {
      appType: v1.appType || '',
      framework: 'nextjs',
      targetUsers: v1.targetUsers || [],
    },
    auth: {
      enabled: true,
      providers: (v1.authMethods || ['email']).map((m) => ({ type: m, enabled: true })),
      roles: v1.roles || ['admin', 'user'],
    },
    database: {
      enabled: true,
      provider: 'postgresql',
      entities: v1.entities || [],
    },
    features: {
      coreFeatures: v1.features || [],
      customFeatures: v1.customFeatures || '',
    },
    ui: {
      theme: (v1.theme as 'light' | 'dark' | 'system') || 'system',
      primaryColor: v1.primaryColor || '#0066FF',
      layout: v1.layout || 'sidebar',
    },
    integrations: {
      services: (v1.integrations || []).map((name) => ({
        id: name,
        name,
        type: 'other',
      })),
    },
    deploy: {
      target: v1.deployTarget || 'vercel',
      region: v1.region || 'auto',
    },
  }) as PresetConfigV2
}
