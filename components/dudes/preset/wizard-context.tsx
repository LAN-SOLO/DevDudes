'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface PresetConfig {
  // Step 1: Business Info
  businessName: string
  industry: string
  description: string

  // Step 2: App Type
  appType: string
  targetUsers: string[]

  // Step 3: Features
  features: string[]
  customFeatures: string

  // Step 4: Data Model
  entities: Array<{
    name: string
    fields: Array<{ name: string; type: string; required: boolean }>
  }>

  // Step 5: Authentication
  authMethods: string[]
  roles: string[]

  // Step 6: UI Preferences
  theme: 'light' | 'dark' | 'system'
  primaryColor: string
  layout: 'sidebar' | 'topnav' | 'minimal'

  // Step 7: Integrations
  integrations: string[]

  // Step 8: Deployment
  deployTarget: string
  region: string
}

const defaultConfig: PresetConfig = {
  businessName: '',
  industry: '',
  description: '',
  appType: '',
  targetUsers: [],
  features: [],
  customFeatures: '',
  entities: [],
  authMethods: ['email'],
  roles: ['admin', 'user'],
  theme: 'system',
  primaryColor: '#0066FF',
  layout: 'sidebar',
  integrations: [],
  deployTarget: 'vercel',
  region: 'auto',
}

interface WizardContextType {
  config: PresetConfig
  updateConfig: (updates: Partial<PresetConfig>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
}

const WizardContext = createContext<WizardContextType | null>(null)

export function WizardProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PresetConfig>(defaultConfig)
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const totalSteps = 8

  const updateConfig = (updates: Partial<PresetConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  return (
    <WizardContext.Provider
      value={{
        config,
        updateConfig,
        currentStep,
        setCurrentStep,
        totalSteps,
        isComplete,
        setIsComplete,
      }}
    >
      {children}
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider')
  }
  return context
}
