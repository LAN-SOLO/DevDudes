'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { WizardProvider, useWizard, PresetConfig } from './wizard-context'
import { WizardNav } from './wizard-nav'
import { StepBusiness } from './steps/step-business'
import { StepAppType } from './steps/step-app-type'
import { StepFeatures } from './steps/step-features'
import { StepData } from './steps/step-data'
import { StepAuth } from './steps/step-auth'
import { StepUI } from './steps/step-ui'
import { StepIntegrations } from './steps/step-integrations'
import { StepDeploy } from './steps/step-deploy'
import { WizardComplete } from './wizard-complete'

export interface PresetWizardHandle {
  importConfig: (config: Partial<PresetConfig>) => void
}

const WizardContentInner = forwardRef<PresetWizardHandle>(function WizardContentInner(_, ref) {
  const { currentStep, isComplete, importConfig } = useWizard()

  useImperativeHandle(ref, () => ({ importConfig }), [importConfig])

  if (isComplete) {
    return <WizardComplete />
  }

  return (
    <div>
      <WizardNav />
      {currentStep === 1 && <StepBusiness />}
      {currentStep === 2 && <StepAppType />}
      {currentStep === 3 && <StepFeatures />}
      {currentStep === 4 && <StepData />}
      {currentStep === 5 && <StepAuth />}
      {currentStep === 6 && <StepUI />}
      {currentStep === 7 && <StepIntegrations />}
      {currentStep === 8 && <StepDeploy />}
    </div>
  )
})

export const PresetWizard = forwardRef<PresetWizardHandle>(function PresetWizard(_, ref) {
  const innerRef = useRef<PresetWizardHandle>(null)

  useImperativeHandle(ref, () => ({
    importConfig: (config: Partial<PresetConfig>) => {
      innerRef.current?.importConfig(config)
    },
  }), [])

  return (
    <WizardProvider>
      <WizardContentInner ref={innerRef} />
    </WizardProvider>
  )
})
