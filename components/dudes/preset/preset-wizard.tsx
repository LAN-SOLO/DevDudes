'use client'

import { WizardProvider, useWizard } from './wizard-context'
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

function WizardContent() {
  const { currentStep, isComplete } = useWizard()

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
}

export function PresetWizard() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  )
}
