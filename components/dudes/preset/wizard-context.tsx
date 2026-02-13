'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { CIConfig } from '@/lib/shared-pipeline/ci'
import type {
  PresetConfigV2,
  MetaConfig,
  AppShellConfig,
  AuthSecurityConfig,
  DatabaseConfig,
  ApiConfig,
  FeaturesConfig,
  UiThemeConfig,
  PagesConfig,
  StorageConfig,
  NotificationsConfig,
  AiSearchConfig,
  PaymentsConfig,
  RealtimeBackgroundConfig,
  TestingCiCdConfig,
  IntegrationsConfig,
  DeployConfig,
} from '@/lib/preset-pipeline/types'
import { defaultPresetConfigV2, presetConfigV2Schema, isV1Config, migrateV1toV2 } from '@/lib/validations/preset'

// ── Import Sanitizer ─────────────────────────────────────────────

function sanitizeImportedConfig(raw: Record<string, unknown>): PresetConfigV2 {
  // Auto-detect v1 and migrate
  if (isV1Config(raw)) {
    return migrateV1toV2(raw as Record<string, string>)
  }

  // Try parsing as v2
  const parsed = presetConfigV2Schema.safeParse(raw)
  if (parsed.success) return parsed.data as PresetConfigV2

  // Fallback: merge with defaults
  return { ...defaultPresetConfigV2, ...raw } as PresetConfigV2
}

// ── Context Type ─────────────────────────────────────────────────

interface PresetWizardContextType {
  config: PresetConfigV2
  updateConfig: (updates: Partial<PresetConfigV2>) => void
  updateMeta: (updates: Partial<MetaConfig>) => void
  updateCI: (updates: Partial<CIConfig>) => void
  updateApp: (updates: Partial<AppShellConfig>) => void
  updateAuth: (updates: Partial<AuthSecurityConfig>) => void
  updateDatabase: (updates: Partial<DatabaseConfig>) => void
  updateApi: (updates: Partial<ApiConfig>) => void
  updateFeatures: (updates: Partial<FeaturesConfig>) => void
  updateUi: (updates: Partial<UiThemeConfig>) => void
  updatePages: (updates: Partial<PagesConfig>) => void
  updateStorage: (updates: Partial<StorageConfig>) => void
  updateNotifications: (updates: Partial<NotificationsConfig>) => void
  updateAiSearch: (updates: Partial<AiSearchConfig>) => void
  updatePayments: (updates: Partial<PaymentsConfig>) => void
  updateRealtimeBackground: (updates: Partial<RealtimeBackgroundConfig>) => void
  updateTestingCiCd: (updates: Partial<TestingCiCdConfig>) => void
  updateIntegrations: (updates: Partial<IntegrationsConfig>) => void
  updateDeploy: (updates: Partial<DeployConfig>) => void
  importConfig: (config: Record<string, unknown>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
}

const PresetWizardContext = createContext<PresetWizardContextType | null>(null)

// ── Provider ─────────────────────────────────────────────────────

export function PresetWizardProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PresetConfigV2>(defaultPresetConfigV2)
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const totalSteps = 17

  const updateConfig = useCallback((updates: Partial<PresetConfigV2>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }, [])

  const updateMeta = useCallback((updates: Partial<MetaConfig>) => {
    setConfig((prev) => ({ ...prev, meta: { ...prev.meta, ...updates } }))
  }, [])

  const updateCI = useCallback((updates: Partial<CIConfig>) => {
    setConfig((prev) => ({ ...prev, ci: { ...prev.ci, ...updates } }))
  }, [])

  const updateApp = useCallback((updates: Partial<AppShellConfig>) => {
    setConfig((prev) => ({ ...prev, app: { ...prev.app, ...updates } }))
  }, [])

  const updateAuth = useCallback((updates: Partial<AuthSecurityConfig>) => {
    setConfig((prev) => ({ ...prev, auth: { ...prev.auth, ...updates } }))
  }, [])

  const updateDatabase = useCallback((updates: Partial<DatabaseConfig>) => {
    setConfig((prev) => ({ ...prev, database: { ...prev.database, ...updates } }))
  }, [])

  const updateApi = useCallback((updates: Partial<ApiConfig>) => {
    setConfig((prev) => ({ ...prev, api: { ...prev.api, ...updates } }))
  }, [])

  const updateFeatures = useCallback((updates: Partial<FeaturesConfig>) => {
    setConfig((prev) => ({ ...prev, features: { ...prev.features, ...updates } }))
  }, [])

  const updateUi = useCallback((updates: Partial<UiThemeConfig>) => {
    setConfig((prev) => ({ ...prev, ui: { ...prev.ui, ...updates } }))
  }, [])

  const updatePages = useCallback((updates: Partial<PagesConfig>) => {
    setConfig((prev) => ({ ...prev, pages: { ...prev.pages, ...updates } }))
  }, [])

  const updateStorage = useCallback((updates: Partial<StorageConfig>) => {
    setConfig((prev) => ({ ...prev, storage: { ...prev.storage, ...updates } }))
  }, [])

  const updateNotifications = useCallback((updates: Partial<NotificationsConfig>) => {
    setConfig((prev) => ({ ...prev, notifications: { ...prev.notifications, ...updates } }))
  }, [])

  const updateAiSearch = useCallback((updates: Partial<AiSearchConfig>) => {
    setConfig((prev) => ({ ...prev, aiSearch: { ...prev.aiSearch, ...updates } }))
  }, [])

  const updatePayments = useCallback((updates: Partial<PaymentsConfig>) => {
    setConfig((prev) => ({ ...prev, payments: { ...prev.payments, ...updates } }))
  }, [])

  const updateRealtimeBackground = useCallback((updates: Partial<RealtimeBackgroundConfig>) => {
    setConfig((prev) => ({ ...prev, realtimeBackground: { ...prev.realtimeBackground, ...updates } }))
  }, [])

  const updateTestingCiCd = useCallback((updates: Partial<TestingCiCdConfig>) => {
    setConfig((prev) => ({ ...prev, testingCiCd: { ...prev.testingCiCd, ...updates } }))
  }, [])

  const updateIntegrations = useCallback((updates: Partial<IntegrationsConfig>) => {
    setConfig((prev) => ({ ...prev, integrations: { ...prev.integrations, ...updates } }))
  }, [])

  const updateDeploy = useCallback((updates: Partial<DeployConfig>) => {
    setConfig((prev) => ({ ...prev, deploy: { ...prev.deploy, ...updates } }))
  }, [])

  const importConfig = useCallback((imported: Record<string, unknown>) => {
    const sanitized = sanitizeImportedConfig(imported)
    setConfig(sanitized)
    setCurrentStep(1)
    setIsComplete(false)
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }, [currentStep])

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }, [currentStep])

  return (
    <PresetWizardContext.Provider
      value={{
        config,
        updateConfig,
        updateMeta,
        updateCI,
        updateApp,
        updateAuth,
        updateDatabase,
        updateApi,
        updateFeatures,
        updateUi,
        updatePages,
        updateStorage,
        updateNotifications,
        updateAiSearch,
        updatePayments,
        updateRealtimeBackground,
        updateTestingCiCd,
        updateIntegrations,
        updateDeploy,
        importConfig,
        currentStep,
        setCurrentStep,
        totalSteps,
        nextStep,
        prevStep,
        isComplete,
        setIsComplete,
      }}
    >
      {children}
    </PresetWizardContext.Provider>
  )
}

// ── Hook ─────────────────────────────────────────────────────────

export function usePresetWizard() {
  const context = useContext(PresetWizardContext)
  if (!context) {
    throw new Error('usePresetWizard must be used within PresetWizardProvider')
  }
  return context
}

// Keep backward-compatible alias
export const useWizard = usePresetWizard
