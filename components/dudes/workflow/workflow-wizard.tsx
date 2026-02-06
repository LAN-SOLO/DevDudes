'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { WorkflowWizardProvider, useWorkflowWizard } from './workflow-context'
import { WorkflowNav } from './workflow-nav'
import { StepBuilder } from './steps/step-builder'
import { StepFeatures } from './steps/step-features'
import { StepAuthConfig } from './steps/step-auth-config'
import { StepUIPreferences } from './steps/step-ui-preferences'
import { StepAIIntegrations } from './steps/step-ai-integrations'
import { StepDeployment } from './steps/step-deployment'
import { WorkflowComplete } from './workflow-complete'
import type { WorkflowConfig } from '@/lib/validations/workflow'

export interface WorkflowWizardHandle {
  importConfig: (config: Partial<WorkflowConfig>) => void
}

const WizardContentInner = forwardRef<WorkflowWizardHandle>(function WizardContentInner(_, ref) {
  const { currentStep, isComplete, importConfig } = useWorkflowWizard()

  useImperativeHandle(ref, () => ({ importConfig }), [importConfig])

  if (isComplete) {
    return <WorkflowComplete />
  }

  return (
    <div>
      <WorkflowNav />
      {currentStep === 1 && <StepBuilder />}
      {currentStep === 2 && <StepFeatures />}
      {currentStep === 3 && <StepAuthConfig />}
      {currentStep === 4 && <StepUIPreferences />}
      {currentStep === 5 && <StepAIIntegrations />}
      {currentStep === 6 && <StepDeployment />}
    </div>
  )
})

export const WorkflowWizard = forwardRef<WorkflowWizardHandle>(function WorkflowWizard(_, ref) {
  const innerRef = useRef<WorkflowWizardHandle>(null)

  useImperativeHandle(ref, () => ({
    importConfig: (config: Partial<WorkflowConfig>) => {
      innerRef.current?.importConfig(config)
    },
  }), [])

  return (
    <WorkflowWizardProvider>
      <WizardContentInner ref={innerRef} />
    </WorkflowWizardProvider>
  )
})
