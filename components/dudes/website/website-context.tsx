'use client'

import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react'
import type { WebsiteConfig } from '@/lib/website-pipeline/types'
import { defaultWebsiteConfig, websiteConfigSchema } from '@/lib/validations/website'
import { defaultCIConfig } from '@/lib/shared-pipeline/ci'
import type { CIConfig } from '@/lib/shared-pipeline/ci'
import { isEcommerce, isBusinessService } from '@/lib/website-pipeline/constants'

// ── Import Sanitizer ───────────────────────────────────────────

function pick<T>(val: unknown, fallback: T): T {
  if (val === null || val === undefined) return fallback
  if (typeof fallback === 'boolean') return (typeof val === 'boolean' ? val : fallback) as T
  if (typeof fallback === 'number') return (typeof val === 'number' ? val : fallback) as T
  if (typeof fallback === 'string') return (typeof val === 'string' ? val : fallback) as T
  return fallback
}

function pickArray(val: unknown, fallback: string[]): string[] {
  if (Array.isArray(val)) return val.filter((v): v is string => typeof v === 'string')
  if (val && typeof val === 'object') return Object.values(val).filter((v): v is string => typeof v === 'string')
  return fallback
}

function sanitizeImportedConfig(raw: Record<string, unknown>): WebsiteConfig {
  const d = defaultWebsiteConfig
  const r = raw

  const config: WebsiteConfig = {
    importedProjectId: d.importedProjectId,
    importMode: d.importMode,
    websiteTypes: pickArray(r.websiteTypes, d.websiteTypes),
    industry: pick(r.industry, d.industry) as string,
    targetAudience: pick(r.targetAudience, d.targetAudience) as string,
    elevatorPitch: pick(r.elevatorPitch, d.elevatorPitch) as string,
    siteName: pick(r.siteName, d.siteName) as string,
    primaryColor: pick(r.primaryColor, d.primaryColor) as string,
    secondaryColor: pick(r.secondaryColor, d.secondaryColor) as string,
    fontHeading: pick(r.fontHeading, d.fontHeading) as string,
    fontBody: pick(r.fontBody, d.fontBody) as string,
    logoStyle: pick(r.logoStyle, d.logoStyle) as string,
    brandTone: pick(r.brandTone, d.brandTone) as string,
    customDomain: pick(r.customDomain, d.customDomain) as string,
    corporateIdentity: (r.corporateIdentity && typeof r.corporateIdentity === 'object' ? { ...defaultCIConfig, ...(r.corporateIdentity as Partial<CIConfig>) } : defaultCIConfig),
    layoutStyle: pick(r.layoutStyle, d.layoutStyle) as string,
    navigationStyle: pick(r.navigationStyle, d.navigationStyle) as string,
    headerStyle: pick(r.headerStyle, d.headerStyle) as string,
    footerStyle: pick(r.footerStyle, d.footerStyle) as string,
    pageStructure: pickArray(r.pageStructure, d.pageStructure),
    theme: pick(r.theme, d.theme) as string,
    designSystem: pick(r.designSystem, d.designSystem) as string,
    animationLevel: pick(r.animationLevel, d.animationLevel) as string,
    iconStyle: pick(r.iconStyle, d.iconStyle) as string,
    imageStrategy: pick(r.imageStrategy, d.imageStrategy) as string,
    borderRadius: pick(r.borderRadius, d.borderRadius) as string,
    contentTypes: pickArray(r.contentTypes, d.contentTypes),
    cmsProvider: pick(r.cmsProvider, d.cmsProvider) as string,
    blogEnabled: pick(r.blogEnabled, d.blogEnabled) as boolean,
    i18nEnabled: pick(r.i18nEnabled, d.i18nEnabled) as boolean,
    i18nLanguages: pickArray(r.i18nLanguages, d.i18nLanguages),
    searchEnabled: pick(r.searchEnabled, d.searchEnabled) as boolean,
    searchProvider: pick(r.searchProvider, d.searchProvider) as string,
    framework: pick(r.framework, d.framework) as string,
    language: pick(r.language, d.language) as string,
    styling: pick(r.styling, d.styling) as string,
    componentLibrary: pick(r.componentLibrary, d.componentLibrary) as string,
    packageManager: pick(r.packageManager, d.packageManager) as string,
    monorepo: pick(r.monorepo, d.monorepo) as boolean,
    database: pick(r.database, d.database) as string,
    orm: pick(r.orm, d.orm) as string,
    auth: pick(r.auth, d.auth) as string,
    authMethods: pickArray(r.authMethods, d.authMethods),
    storageProvider: pick(r.storageProvider, d.storageProvider) as string,
    apiStyle: pick(r.apiStyle, d.apiStyle) as string,
    emailProvider: pick(r.emailProvider, d.emailProvider) as string,
    analytics: pickArray(r.analytics, d.analytics),
    monitoring: pick(r.monitoring, d.monitoring) as string,
    crm: pick(r.crm, d.crm) as string,
    marketing: pickArray(r.marketing, d.marketing),
    chatWidget: pick(r.chatWidget, d.chatWidget) as string,
    productType: pick(r.productType, d.productType) as string,
    catalogSize: pick(r.catalogSize, d.catalogSize) as string,
    categories: pick(r.categories, d.categories) as boolean,
    variants: pick(r.variants, d.variants) as boolean,
    inventory: pick(r.inventory, d.inventory) as boolean,
    reviews: pick(r.reviews, d.reviews) as boolean,
    wishlist: pick(r.wishlist, d.wishlist) as boolean,
    compareProducts: pick(r.compareProducts, d.compareProducts) as boolean,
    paymentProcessor: pick(r.paymentProcessor, d.paymentProcessor) as string,
    checkoutStyle: pick(r.checkoutStyle, d.checkoutStyle) as string,
    currencies: pickArray(r.currencies, d.currencies),
    taxCalculation: pick(r.taxCalculation, d.taxCalculation) as string,
    invoicing: pick(r.invoicing, d.invoicing) as boolean,
    subscriptionBilling: pick(r.subscriptionBilling, d.subscriptionBilling) as boolean,
    coupons: pick(r.coupons, d.coupons) as boolean,
    giftCards: pick(r.giftCards, d.giftCards) as boolean,
    shippingProviders: pickArray(r.shippingProviders, d.shippingProviders),
    fulfillment: pick(r.fulfillment, d.fulfillment) as string,
    internationalShipping: pick(r.internationalShipping, d.internationalShipping) as boolean,
    shippingZones: pick(r.shippingZones, d.shippingZones) as boolean,
    trackingEnabled: pick(r.trackingEnabled, d.trackingEnabled) as boolean,
    returnsPolicy: pick(r.returnsPolicy, d.returnsPolicy) as boolean,
    seoStrategy: pick(r.seoStrategy, d.seoStrategy) as string,
    structuredData: pickArray(r.structuredData, d.structuredData),
    sitemap: pick(r.sitemap, d.sitemap) as boolean,
    robotsTxt: pick(r.robotsTxt, d.robotsTxt) as boolean,
    openGraph: pick(r.openGraph, d.openGraph) as boolean,
    twitterCards: pick(r.twitterCards, d.twitterCards) as boolean,
    canonicalUrls: pick(r.canonicalUrls, d.canonicalUrls) as boolean,
    performanceBudget: pick(r.performanceBudget, d.performanceBudget) as string,
    ssl: pick(r.ssl, d.ssl) as boolean,
    csp: pick(r.csp, d.csp) as boolean,
    rateLimiting: pick(r.rateLimiting, d.rateLimiting) as boolean,
    ddosProtection: pick(r.ddosProtection, d.ddosProtection) as boolean,
    waf: pick(r.waf, d.waf) as boolean,
    backups: pick(r.backups, d.backups) as string,
    compliance: pickArray(r.compliance, d.compliance),
    cdn: pick(r.cdn, d.cdn) as string,
    caching: pick(r.caching, d.caching) as string,
    hosting: pick(r.hosting, d.hosting) as string,
    ci: pick(r.ci, d.ci) as string,
    environments: pickArray(r.environments, d.environments),
    containerized: pick(r.containerized, d.containerized) as boolean,
    region: pick(r.region, d.region) as string,
    scaling: pick(r.scaling, d.scaling) as string,
    domainProvider: pick(r.domainProvider, d.domainProvider) as string,
    distributionChannels: pickArray(r.distributionChannels, d.distributionChannels),
    aiFeatures: pickArray(r.aiFeatures, d.aiFeatures),
    aiProvider: pick(r.aiProvider, d.aiProvider) as string,
    detailedDescription: pick(r.detailedDescription, d.detailedDescription) as string,
    targetPages: pick(r.targetPages, d.targetPages) as string,
    referenceWebsites: pick(r.referenceWebsites, d.referenceWebsites) as string,
    constraints: pick(r.constraints, d.constraints) as string,
    additionalNotes: pick(r.additionalNotes, d.additionalNotes) as string,
    businessModules: pickArray(r.businessModules, d.businessModules),
    adminFeatures: pickArray(r.adminFeatures, d.adminFeatures),
    formBuilderFeatures: pickArray(r.formBuilderFeatures, d.formBuilderFeatures),
    signatureLayouts: pickArray(r.signatureLayouts, d.signatureLayouts),
    signatureFeatures: pickArray(r.signatureFeatures, d.signatureFeatures),
    expenseFeatures: pickArray(r.expenseFeatures, d.expenseFeatures),
    budgetFeatures: pickArray(r.budgetFeatures, d.budgetFeatures),
    sickLeaveFeatures: pickArray(r.sickLeaveFeatures, d.sickLeaveFeatures),
    directoryProvider: pick(r.directoryProvider, d.directoryProvider) as string,
    directorySyncFields: pickArray(r.directorySyncFields, d.directorySyncFields),
    directoryAutoSync: pick(r.directoryAutoSync, d.directoryAutoSync) as boolean,
    communicationChannels: pickArray(r.communicationChannels, d.communicationChannels),
    defaultNotifyChannel: pick(r.defaultNotifyChannel, d.defaultNotifyChannel) as string,
  }

  const parsed = websiteConfigSchema.safeParse(config)
  return parsed.success ? parsed.data as WebsiteConfig : config
}

// All 19 step numbers
const ALL_STEPS = Array.from({ length: 19 }, (_, i) => i + 1)
// Conditional step groups
const COMMERCE_STEPS = [11, 12, 13]
const BUSINESS_STEPS = [18, 19]

function computeVisibleSteps(websiteTypes: string[]): number[] {
  return ALL_STEPS.filter((s) => {
    if (COMMERCE_STEPS.includes(s)) return isEcommerce(websiteTypes)
    if (BUSINESS_STEPS.includes(s)) return isBusinessService(websiteTypes)
    return true
  })
}

interface WebsiteWizardContextType {
  config: WebsiteConfig
  updateConfig: (updates: Partial<WebsiteConfig>) => void
  importConfig: (config: Partial<WebsiteConfig>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  visibleSteps: number[]
  nextStep: (current: number) => number | null
  prevStep: (current: number) => number | null
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
}

const WebsiteWizardContext = createContext<WebsiteWizardContextType | null>(null)

export function WebsiteWizardProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<WebsiteConfig>(defaultWebsiteConfig)
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)

  const visibleSteps = useMemo(() => computeVisibleSteps(config.websiteTypes), [config.websiteTypes])
  const totalSteps = visibleSteps.length

  const nextStep = useCallback((current: number): number | null => {
    const idx = visibleSteps.indexOf(current)
    if (idx === -1 || idx >= visibleSteps.length - 1) return null
    return visibleSteps[idx + 1]
  }, [visibleSteps])

  const prevStep = useCallback((current: number): number | null => {
    const idx = visibleSteps.indexOf(current)
    if (idx <= 0) return null
    return visibleSteps[idx - 1]
  }, [visibleSteps])

  const updateConfig = (updates: Partial<WebsiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  const importConfig = (imported: Partial<WebsiteConfig>) => {
    const sanitized = sanitizeImportedConfig(imported as Record<string, unknown>)
    setConfig(sanitized)
    setCurrentStep(1)
    setIsComplete(false)
  }

  return (
    <WebsiteWizardContext.Provider
      value={{
        config,
        updateConfig,
        importConfig,
        currentStep,
        setCurrentStep,
        totalSteps,
        visibleSteps,
        nextStep,
        prevStep,
        isComplete,
        setIsComplete,
      }}
    >
      {children}
    </WebsiteWizardContext.Provider>
  )
}

export function useWebsiteWizard() {
  const context = useContext(WebsiteWizardContext)
  if (!context) {
    throw new Error('useWebsiteWizard must be used within WebsiteWizardProvider')
  }
  return context
}
