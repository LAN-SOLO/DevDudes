'use client'

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react'
import type { WorkflowConfigV2, WorkflowStepV2 } from '@/lib/workflow-pipeline/types'
import type { WorkflowTemplate, WorkflowLink, WorkflowService } from '@/lib/validations/workflow'
import {
  defaultWorkflowConfigV2,
  createEmptyStep,
  generateId,
  isV1WorkflowConfig,
  migrateWorkflowV1toV2,
  workflowConfigV2Schema,
} from '@/lib/validations/workflow'
import {
  getAiProviderRecommendations,
  getFeatureRecommendations,
  getSecurityRecommendations,
  getDeploymentRecommendations,
  getIntegrationRecommendations,
  getStackRecommendations,
  getPublishingRecommendations,
} from '@/lib/workflow-pipeline/recommendations'

interface WorkflowRecommendations {
  aiProviders: string[]
  features: string[]
  security: string[]
  deployment: string[]
  integrations: string[]
  stack: string[]
  publishing: string[]
}

interface WorkflowWizardContextType {
  config: WorkflowConfigV2
  recommendations: WorkflowRecommendations
  updateConfig: (updates: Partial<WorkflowConfigV2>) => void
  importConfig: (config: Record<string, unknown>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  totalSteps: number
  isComplete: boolean
  setIsComplete: (complete: boolean) => void

  // Section updaters
  updateMeta: (updates: Partial<WorkflowConfigV2['meta']>) => void
  updateTriggers: (updates: Partial<WorkflowConfigV2['triggers']>) => void
  updateOrchestration: (updates: Partial<WorkflowConfigV2['orchestration']>) => void
  updateDataConnectors: (updates: Partial<WorkflowConfigV2['dataConnectors']>) => void
  updateVariables: (updates: Partial<WorkflowConfigV2['variables']>) => void
  updateSecrets: (updates: Partial<WorkflowConfigV2['secrets']>) => void
  updateStorage: (updates: Partial<WorkflowConfigV2['storage']>) => void
  updateCaching: (updates: Partial<WorkflowConfigV2['caching']>) => void
  updateQueues: (updates: Partial<WorkflowConfigV2['queues']>) => void
  updateAiIntegrations: (updates: Partial<WorkflowConfigV2['aiIntegrations']>) => void
  updateFeatures: (updates: Partial<WorkflowConfigV2['features']>) => void
  updateMiddleware: (updates: Partial<WorkflowConfigV2['middleware']>) => void
  updatePlugins: (updates: Partial<WorkflowConfigV2['plugins']>) => void
  updateExtensions: (updates: Partial<WorkflowConfigV2['extensions']>) => void
  updateAuth: (updates: Partial<WorkflowConfigV2['auth']>) => void
  updateSecurity: (updates: Partial<WorkflowConfigV2['security']>) => void
  updateNotifications: (updates: Partial<WorkflowConfigV2['notifications']>) => void
  updateHooks: (updates: Partial<WorkflowConfigV2['hooks']>) => void
  updateLogging: (updates: Partial<WorkflowConfigV2['logging']>) => void
  updateMonitoring: (updates: Partial<WorkflowConfigV2['monitoring']>) => void
  updateTesting: (updates: Partial<WorkflowConfigV2['testing']>) => void
  updateDeployment: (updates: Partial<WorkflowConfigV2['deployment']>) => void
  updateUi: (updates: Partial<WorkflowConfigV2['ui']>) => void
  updateDocumentation: (updates: Partial<WorkflowConfigV2['documentation']>) => void
  updateCI: (updates: Partial<WorkflowConfigV2['ci']>) => void
  updatePublishing: (updates: Partial<WorkflowConfigV2['publishing']>) => void

  // Step CRUD
  addStep: () => void
  removeStep: (stepId: string) => void
  updateStep: (stepId: string, updates: Partial<WorkflowStepV2>) => void
  reorderSteps: (activeId: string, overId: string) => void

  // Sub-item CRUD
  addTemplate: (stepId: string, template: Omit<WorkflowTemplate, 'id'>) => void
  removeTemplate: (stepId: string, templateId: string) => void
  addLink: (stepId: string, link: Omit<WorkflowLink, 'id'>) => void
  removeLink: (stepId: string, linkId: string) => void
  addService: (stepId: string, service: Omit<WorkflowService, 'id'>) => void
  removeService: (stepId: string, serviceId: string) => void
}

const WorkflowWizardContext = createContext<WorkflowWizardContextType | null>(null)

export function WorkflowWizardProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<WorkflowConfigV2>(defaultWorkflowConfigV2)
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const totalSteps = 18

  const recommendations = useMemo<WorkflowRecommendations>(() => ({
    aiProviders: getAiProviderRecommendations(config),
    features: getFeatureRecommendations(config),
    security: getSecurityRecommendations(config),
    deployment: getDeploymentRecommendations(config),
    integrations: getIntegrationRecommendations(config),
    stack: getStackRecommendations(config),
    publishing: getPublishingRecommendations(config),
  }), [config])

  const updateConfig = (updates: Partial<WorkflowConfigV2>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  const importConfig = useCallback((imported: Record<string, unknown>) => {
    let sanitized: WorkflowConfigV2
    if (isV1WorkflowConfig(imported)) {
      sanitized = migrateWorkflowV1toV2(imported)
    } else {
      const result = workflowConfigV2Schema.safeParse(imported)
      sanitized = result.success ? result.data : defaultWorkflowConfigV2
    }
    setConfig(sanitized)
    setCurrentStep(18)
    setIsComplete(false)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }, [])

  // Section updaters
  const makeUpdater = <K extends keyof WorkflowConfigV2>(key: K) =>
    (updates: Partial<WorkflowConfigV2[K]>) => {
      setConfig((prev) => ({ ...prev, [key]: { ...prev[key], ...updates } }))
    }

  const updateMeta = makeUpdater('meta')
  const updateTriggers = makeUpdater('triggers')
  const updateOrchestration = makeUpdater('orchestration')
  const updateDataConnectors = makeUpdater('dataConnectors')
  const updateVariables = makeUpdater('variables')
  const updateSecrets = makeUpdater('secrets')
  const updateStorage = makeUpdater('storage')
  const updateCaching = makeUpdater('caching')
  const updateQueues = makeUpdater('queues')
  const updateAiIntegrations = makeUpdater('aiIntegrations')
  const updateFeatures = makeUpdater('features')
  const updateMiddleware = makeUpdater('middleware')
  const updatePlugins = makeUpdater('plugins')
  const updateExtensions = makeUpdater('extensions')
  const updateAuth = makeUpdater('auth')
  const updateSecurity = makeUpdater('security')
  const updateNotifications = makeUpdater('notifications')
  const updateHooks = makeUpdater('hooks')
  const updateLogging = makeUpdater('logging')
  const updateMonitoring = makeUpdater('monitoring')
  const updateTesting = makeUpdater('testing')
  const updateDeployment = makeUpdater('deployment')
  const updateUi = makeUpdater('ui')
  const updateDocumentation = makeUpdater('documentation')
  const updateCI = makeUpdater('ci')
  const updatePublishing = makeUpdater('publishing')

  // Step management
  const addStep = () => {
    const newStep = createEmptyStep(config.steps.length)
    setConfig((prev) => ({ ...prev, steps: [...prev.steps, newStep] }))
  }

  const removeStep = (stepId: string) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps
        .filter((s) => s.id !== stepId)
        .map((s, index) => ({ ...s, order: index })),
    }))
  }

  const updateStep = (stepId: string, updates: Partial<WorkflowStepV2>) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.id === stepId ? { ...s, ...updates } : s)),
    }))
  }

  const reorderSteps = (activeId: string, overId: string) => {
    setConfig((prev) => {
      const oldIndex = prev.steps.findIndex((s) => s.id === activeId)
      const newIndex = prev.steps.findIndex((s) => s.id === overId)
      if (oldIndex === -1 || newIndex === -1) return prev

      const newSteps = [...prev.steps]
      const [removed] = newSteps.splice(oldIndex, 1)
      newSteps.splice(newIndex, 0, removed)
      return { ...prev, steps: newSteps.map((s, index) => ({ ...s, order: index })) }
    })
  }

  // Template management
  const addTemplate = (stepId: string, template: Omit<WorkflowTemplate, 'id'>) => {
    const newTemplate: WorkflowTemplate = { ...template, id: generateId() }
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId ? { ...s, templates: [...s.templates, newTemplate] } : s
      ),
    }))
  }

  const removeTemplate = (stepId: string, templateId: string) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId ? { ...s, templates: s.templates.filter((t) => t.id !== templateId) } : s
      ),
    }))
  }

  // Link management
  const addLink = (stepId: string, link: Omit<WorkflowLink, 'id'>) => {
    const newLink: WorkflowLink = { ...link, id: generateId() }
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId ? { ...s, links: [...s.links, newLink] } : s
      ),
    }))
  }

  const removeLink = (stepId: string, linkId: string) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId ? { ...s, links: s.links.filter((l) => l.id !== linkId) } : s
      ),
    }))
  }

  // Service management
  const addService = (stepId: string, service: Omit<WorkflowService, 'id'>) => {
    const newService: WorkflowService = { ...service, id: generateId() }
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId ? { ...s, services: [...s.services, newService] } : s
      ),
    }))
  }

  const removeService = (stepId: string, serviceId: string) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId ? { ...s, services: s.services.filter((svc) => svc.id !== serviceId) } : s
      ),
    }))
  }

  return (
    <WorkflowWizardContext.Provider
      value={{
        config,
        recommendations,
        updateConfig,
        importConfig,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        totalSteps,
        isComplete,
        setIsComplete,
        updateMeta,
        updateTriggers,
        updateOrchestration,
        updateDataConnectors,
        updateVariables,
        updateSecrets,
        updateStorage,
        updateCaching,
        updateQueues,
        updateAiIntegrations,
        updateFeatures,
        updateMiddleware,
        updatePlugins,
        updateExtensions,
        updateAuth,
        updateSecurity,
        updateNotifications,
        updateHooks,
        updateLogging,
        updateMonitoring,
        updateTesting,
        updateDeployment,
        updateUi,
        updateDocumentation,
        updateCI,
        updatePublishing,
        addStep,
        removeStep,
        updateStep,
        reorderSteps,
        addTemplate,
        removeTemplate,
        addLink,
        removeLink,
        addService,
        removeService,
      }}
    >
      {children}
    </WorkflowWizardContext.Provider>
  )
}

export function useWorkflowWizard() {
  const context = useContext(WorkflowWizardContext)
  if (!context) {
    throw new Error('useWorkflowWizard must be used within WorkflowWizardProvider')
  }
  return context
}
