import type { CIConfig } from '@/lib/shared-pipeline/ci'

// Website option used across all step selection cards
export interface WebsiteOption {
  value: string
  label: string
  icon: string
  description: string
}

// Step category grouping for the nav
export interface WebsiteStepCategory {
  id: string
  label: string
  steps: number[]
}

// ── Full Website Config ──────────────────────────────────────────

export interface WebsiteConfig {
  // Step 1: Import
  importedProjectId: string | null
  importMode: string

  // Step 2: Website Type & Purpose
  websiteTypes: string[]
  industry: string
  targetAudience: string
  elevatorPitch: string
  siteName: string

  // Step 3: Branding & Domain
  primaryColor: string
  secondaryColor: string
  fontHeading: string
  fontBody: string
  logoStyle: string
  brandTone: string
  customDomain: string

  // Step 4: Corporate Identity
  corporateIdentity: CIConfig

  // Step 5: Layout & Navigation
  layoutStyle: string
  navigationStyle: string
  headerStyle: string
  footerStyle: string
  pageStructure: string[]

  // Step 5: Visual Design & Theme
  theme: string
  designSystem: string
  animationLevel: string
  iconStyle: string
  imageStrategy: string
  borderRadius: string

  // Step 6: Content Strategy
  contentTypes: string[]
  cmsProvider: string
  blogEnabled: boolean
  i18nEnabled: boolean
  i18nLanguages: string[]
  searchEnabled: boolean
  searchProvider: string

  // Step 7: Framework & Stack
  framework: string
  language: string
  styling: string
  componentLibrary: string
  packageManager: string
  monorepo: boolean

  // Step 8: Database & Backend
  database: string
  orm: string
  auth: string
  authMethods: string[]
  storageProvider: string
  apiStyle: string

  // Step 9: Integrations & APIs
  emailProvider: string
  analytics: string[]
  monitoring: string
  crm: string
  marketing: string[]
  chatWidget: string

  // Step 10: Products & Catalog (conditional: ecommerce)
  productType: string
  catalogSize: string
  categories: boolean
  variants: boolean
  inventory: boolean
  reviews: boolean
  wishlist: boolean
  compareProducts: boolean

  // Step 11: Payments & Checkout (conditional: ecommerce)
  paymentProcessor: string
  checkoutStyle: string
  currencies: string[]
  taxCalculation: string
  invoicing: boolean
  subscriptionBilling: boolean
  coupons: boolean
  giftCards: boolean

  // Step 12: Shipping & Fulfillment (conditional: ecommerce physical)
  shippingProviders: string[]
  fulfillment: string
  internationalShipping: boolean
  shippingZones: boolean
  trackingEnabled: boolean
  returnsPolicy: boolean

  // Step 13: SEO & Analytics
  seoStrategy: string
  structuredData: string[]
  sitemap: boolean
  robotsTxt: boolean
  openGraph: boolean
  twitterCards: boolean
  canonicalUrls: boolean
  performanceBudget: string

  // Step 14: Performance & Security
  ssl: boolean
  csp: boolean
  rateLimiting: boolean
  ddosProtection: boolean
  waf: boolean
  backups: string
  compliance: string[]
  cdn: string
  caching: string

  // Step 15: Hosting & Deployment
  hosting: string
  ci: string
  environments: string[]
  containerized: boolean
  region: string
  scaling: string
  domainProvider: string
  distributionChannels: string[]

  // Step 16: AI & Notes
  aiFeatures: string[]
  aiProvider: string
  detailedDescription: string
  targetPages: string
  referenceWebsites: string
  constraints: string
  additionalNotes: string

  // Step 17: Business Modules (conditional: business-service)
  businessModules: string[]
  adminFeatures: string[]
  formBuilderFeatures: string[]
  signatureLayouts: string[]
  signatureFeatures: string[]
  expenseFeatures: string[]
  budgetFeatures: string[]
  sickLeaveFeatures: string[]

  // Step 18: Directory & Messaging (conditional: business-service)
  directoryProvider: string
  directorySyncFields: string[]
  directoryAutoSync: boolean
  communicationChannels: string[]
  defaultNotifyChannel: string
}

// ── Analysis ─────────────────────────────────────────────────

export interface WebsiteAnalysisWarning {
  severity: 'error' | 'warning' | 'info'
  message: string
  field?: string
}

export interface WebsiteAnalysisReport {
  complexityScore: number
  complexityLabel: string
  scopeEstimate: {
    configuredSections: number
    totalFeatures: number
    estimatedEffort: string
    ecommerceEnabled: boolean
  }
  warnings: WebsiteAnalysisWarning[]
  suggestions: string[]
  compatibilityIssues: string[]
}

// ── Generated Documents ─────────────────────────────────────

export interface GeneratedWebsiteDocs {
  initPrompt: string
  developmentConcept: string
}
