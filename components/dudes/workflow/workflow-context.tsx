'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import {
  WorkflowConfig,
  WorkflowStep,
  defaultWorkflowConfig,
  createEmptyStep,
  generateId,
} from '@/lib/validations/workflow'
import type { WorkflowTemplate, WorkflowLink, WorkflowService } from '@/lib/validations/workflow'

interface WorkflowWizardContextType {
  config: WorkflowConfig
  updateConfig: (updates: Partial<WorkflowConfig>) => void
  importConfig: (config: Partial<WorkflowConfig>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  isComplete: boolean
  setIsComplete: (complete: boolean) => void

  // Step management helpers
  addStep: () => void
  removeStep: (stepId: string) => void
  updateStep: (stepId: string, updates: Partial<WorkflowStep>) => void
  reorderSteps: (activeId: string, overId: string) => void

  // Template management
  addTemplate: (stepId: string, template: Omit<WorkflowTemplate, 'id'>) => void
  removeTemplate: (stepId: string, templateId: string) => void

  // Link management
  addLink: (stepId: string, link: Omit<WorkflowLink, 'id'>) => void
  removeLink: (stepId: string, linkId: string) => void

  // Service management
  addService: (stepId: string, service: Omit<WorkflowService, 'id'>) => void
  removeService: (stepId: string, serviceId: string) => void
}

const WorkflowWizardContext = createContext<WorkflowWizardContextType | null>(null)

export function WorkflowWizardProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<WorkflowConfig>(defaultWorkflowConfig)
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const totalSteps = 6

  const updateConfig = (updates: Partial<WorkflowConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  const importConfig = (imported: Partial<WorkflowConfig>) => {
    setConfig({ ...defaultWorkflowConfig, ...imported })
    setCurrentStep(6)
    setIsComplete(false)
  }

  // Step management
  const addStep = () => {
    const newStep = createEmptyStep(config.steps.length)
    setConfig((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }))
  }

  const removeStep = (stepId: string) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps
        .filter((s) => s.id !== stepId)
        .map((s, index) => ({ ...s, order: index })),
    }))
  }

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId ? { ...s, ...updates } : s
      ),
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

      return {
        ...prev,
        steps: newSteps.map((s, index) => ({ ...s, order: index })),
      }
    })
  }

  // Template management
  const addTemplate = (stepId: string, template: Omit<WorkflowTemplate, 'id'>) => {
    const newTemplate: WorkflowTemplate = { ...template, id: generateId() }
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId
          ? { ...s, templates: [...s.templates, newTemplate] }
          : s
      ),
    }))
  }

  const removeTemplate = (stepId: string, templateId: string) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId
          ? { ...s, templates: s.templates.filter((t) => t.id !== templateId) }
          : s
      ),
    }))
  }

  // Link management
  const addLink = (stepId: string, link: Omit<WorkflowLink, 'id'>) => {
    const newLink: WorkflowLink = { ...link, id: generateId() }
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId
          ? { ...s, links: [...s.links, newLink] }
          : s
      ),
    }))
  }

  const removeLink = (stepId: string, linkId: string) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId
          ? { ...s, links: s.links.filter((l) => l.id !== linkId) }
          : s
      ),
    }))
  }

  // Service management
  const addService = (stepId: string, service: Omit<WorkflowService, 'id'>) => {
    const newService: WorkflowService = { ...service, id: generateId() }
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId
          ? { ...s, services: [...s.services, newService] }
          : s
      ),
    }))
  }

  const removeService = (stepId: string, serviceId: string) => {
    setConfig((prev) => ({
      ...prev,
      steps: prev.steps.map((s) =>
        s.id === stepId
          ? { ...s, services: s.services.filter((svc) => svc.id !== serviceId) }
          : s
      ),
    }))
  }

  return (
    <WorkflowWizardContext.Provider
      value={{
        config,
        updateConfig,
        importConfig,
        currentStep,
        setCurrentStep,
        totalSteps,
        isComplete,
        setIsComplete,
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
