// ── Preset Pipeline v2 Types ─────────────────────────────────────

export interface PresetOption {
  value: string
  label: string
  icon?: string
  description?: string
}

export interface StepCategory {
  id: string
  label: string
  steps: number[]
}

// ── Step 1: Meta & Business ──────────────────────────────────────
export interface MetaConfig {
  businessName: string
  industry: string
  description: string
  logo: string
  favicon: string
  version: string
  repository: string
  maintainers: string[]
}

// ── Step 2: App Shell ────────────────────────────────────────────
export interface AppShellConfig {
  appType: string
  framework: string
  language: string
  runtime: string
  ssr: boolean
  pwa: boolean
  targetUsers: string[]
  locales: string[]
}

// ── Step 3: Auth & Security ──────────────────────────────────────
export interface AuthProvider {
  type: string
  enabled: boolean
}

export interface AuthSecurityConfig {
  enabled: boolean
  providers: AuthProvider[]
  mfa: boolean
  sessionStrategy: string
  roles: string[]
  rbac: boolean
  securityHeaders: boolean
  encryption: boolean
  bruteForceProtection: boolean
}

// ── Step 4: Database ─────────────────────────────────────────────
export interface EntityField {
  name: string
  type: string
  required: boolean
}

export interface Entity {
  name: string
  fields: EntityField[]
}

export interface DatabaseConfig {
  enabled: boolean
  provider: string
  orm: string
  entities: Entity[]
  audit: boolean
  softDelete: boolean
  multiTenancy: boolean
}

// ── Step 5: API Layer ────────────────────────────────────────────
export interface ApiConfig {
  enabled: boolean
  style: string
  versioning: boolean
  graphql: boolean
  rateLimit: boolean
  rateLimitMax: number
  cors: boolean
  pagination: string
}

// ── Step 6: Features & Modules ───────────────────────────────────
export interface Module {
  id: string
  name: string
  description: string
}

export interface FeaturesConfig {
  coreFeatures: string[]
  customFeatures: string
  modules: Module[]
}

// ── Step 7: UI & Theme ───────────────────────────────────────────
export interface UiThemeConfig {
  theme: 'light' | 'dark' | 'system'
  primaryColor: string
  fontFamily: string
  darkMode: boolean
  componentLibrary: string
  responsive: boolean
  layout: string
  sidebarCollapsible: boolean
  headerFixed: boolean
  footerEnabled: boolean
}

// ── Step 8: Pages & Navigation ───────────────────────────────────
export interface PageDefinition {
  id: string
  name: string
  route: string
  layout: string
  authRequired: boolean
}

export interface PagesConfig {
  pages: PageDefinition[]
  breadcrumbs: boolean
}

// ── Step 9: Storage & Media ──────────────────────────────────────
export interface StorageConfig {
  enabled: boolean
  provider: string
  cdn: boolean
  imageOptimization: boolean
  maxFileSize: number
  allowedTypes: string[]
}

// ── Step 10: Notifications ───────────────────────────────────────
export interface NotificationChannel {
  enabled: boolean
  provider: string
}

export interface NotificationsConfig {
  enabled: boolean
  inApp: NotificationChannel
  email: NotificationChannel
  push: NotificationChannel
  sms: NotificationChannel
  webhook: NotificationChannel
}

// ── Step 11: AI & Search ─────────────────────────────────────────
export interface AiConfig {
  enabled: boolean
  provider: string
  features: string[]
  rag: boolean
  guardrails: boolean
}

export interface SearchConfig {
  enabled: boolean
  provider: string
  indexing: string
  fuzzy: boolean
}

export interface AiSearchConfig {
  ai: AiConfig
  search: SearchConfig
}

// ── Step 12: Payments ────────────────────────────────────────────
export interface PaymentPlan {
  id: string
  name: string
  price: number
  interval: string
}

export interface PaymentsConfig {
  enabled: boolean
  provider: string
  plans: PaymentPlan[]
  subscriptions: boolean
  metered: boolean
  invoicing: boolean
}

// ── Step 13: Real-time & Background ──────────────────────────────
export interface CronJob {
  id: string
  name: string
  schedule: string
  description: string
}

export interface RealtimeBackgroundConfig {
  realtimeEnabled: boolean
  presence: boolean
  collaboration: boolean
  cronJobs: CronJob[]
  queueProvider: string
  cacheProvider: string
  loggingProvider: string
}

// ── Step 14: Testing & CI/CD ─────────────────────────────────────
export interface TestingCiCdConfig {
  unitFramework: string
  e2eFramework: string
  coverageTarget: number
  ciProvider: string
  stages: string[]
  environments: string[]
}

// ── Step 15: Integrations ────────────────────────────────────────
export interface IntegrationService {
  id: string
  name: string
  type: string
}

export interface IntegrationsConfig {
  services: IntegrationService[]
  webhooks: boolean
  oauth2: boolean
  apiKeys: boolean
  plugins: string[]
  workflows: string[]
}

// ── Step 16: Deploy ──────────────────────────────────────────────
export interface DeployConfig {
  target: string
  region: string
  domains: string[]
  envVars: boolean
  scaling: string
  docker: boolean
  i18n: boolean
  accessibility: boolean
  seo: boolean
}

// ── Main Aggregate Config ────────────────────────────────────────
export interface PresetConfigV2 {
  meta: MetaConfig
  app: AppShellConfig
  auth: AuthSecurityConfig
  database: DatabaseConfig
  api: ApiConfig
  features: FeaturesConfig
  ui: UiThemeConfig
  pages: PagesConfig
  storage: StorageConfig
  notifications: NotificationsConfig
  aiSearch: AiSearchConfig
  payments: PaymentsConfig
  realtimeBackground: RealtimeBackgroundConfig
  testingCiCd: TestingCiCdConfig
  integrations: IntegrationsConfig
  deploy: DeployConfig
}
