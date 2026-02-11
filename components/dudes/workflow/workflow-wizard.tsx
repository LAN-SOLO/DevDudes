'use client'

import { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react'
import { WorkflowWizardProvider, useWorkflowWizard } from './workflow-context'
import { WorkflowNav } from './workflow-nav'
import { WorkflowComplete } from './workflow-complete'
import { StepMeta } from './steps/step-meta'
import { StepBuilder } from './steps/step-builder'
import { StepTriggersOrchestration } from './steps/step-triggers-orchestration'
import { StepDataConnectors } from './steps/step-data-connectors'
import { StepVariablesSecrets } from './steps/step-variables-secrets'
import { StepStorageCaching } from './steps/step-storage-caching'
import { StepAIIntegrations } from './steps/step-ai-integrations'
import { StepFeatures } from './steps/step-features'
import { StepMiddlewarePlugins } from './steps/step-middleware-plugins'
import { StepAuthConfig } from './steps/step-auth-config'
import { StepSecurity } from './steps/step-security'
import { StepNotificationsHooks } from './steps/step-notifications-hooks'
import { StepLoggingMonitoring } from './steps/step-logging-monitoring'
import { StepTesting } from './steps/step-testing'
import { StepDeployment } from './steps/step-deployment'
import { StepUIDocumentation } from './steps/step-ui-preferences'

export interface WorkflowWizardHandle {
  importConfig: (config: Record<string, unknown>) => void
  exportConfig: () => void
}

const STEP_COMPONENTS: Record<number, React.FC> = {
  1: StepMeta,
  2: StepBuilder,
  3: StepTriggersOrchestration,
  4: StepDataConnectors,
  5: StepVariablesSecrets,
  6: StepStorageCaching,
  7: StepAIIntegrations,
  8: StepFeatures,
  9: StepMiddlewarePlugins,
  10: StepAuthConfig,
  11: StepSecurity,
  12: StepNotificationsHooks,
  13: StepLoggingMonitoring,
  14: StepTesting,
  15: StepDeployment,
  16: StepUIDocumentation,
}

const WizardContentInner = forwardRef<WorkflowWizardHandle>(function WizardContentInner(_, ref) {
  const { currentStep, isComplete, importConfig, config, nextStep, prevStep } = useWorkflowWizard()
  const prevStepRef = useRef(currentStep)
  const containerRef = useRef<HTMLDivElement>(null)

  const exportConfig = useCallback(() => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${config.meta.name || 'workflow'}-config.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [config])

  useImperativeHandle(ref, () => ({ importConfig, exportConfig }), [importConfig, exportConfig])

  // Slide animation on step change
  useEffect(() => {
    const el = containerRef.current
    if (!el || prevStepRef.current === currentStep) return

    const direction = currentStep > prevStepRef.current ? 'right' : 'left'
    const cls = `animate-slide-in-${direction}`
    el.classList.add(cls)
    const timer = setTimeout(() => el.classList.remove(cls), 300)
    prevStepRef.current = currentStep
    return () => {
      clearTimeout(timer)
      el.classList.remove('animate-slide-in-right', 'animate-slide-in-left')
    }
  }, [currentStep])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

    if (e.key === 'ArrowRight' && !isComplete) {
      e.preventDefault()
      nextStep()
    } else if (e.key === 'ArrowLeft' && !isComplete) {
      e.preventDefault()
      prevStep()
    }
  }, [isComplete, nextStep, prevStep])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (isComplete) {
    return <WorkflowComplete />
  }

  const StepComponent = STEP_COMPONENTS[currentStep]

  return (
    <div>
      <WorkflowNav />
      <div
        ref={containerRef}
        className="transition-all duration-300 ease-in-out"
      >
        {StepComponent && <StepComponent />}
      </div>
      <p className="mt-3 text-[10px] text-muted-foreground text-center">
        Use arrow keys to navigate between steps
      </p>
    </div>
  )
})

export const WorkflowWizard = forwardRef<WorkflowWizardHandle>(function WorkflowWizard(_, ref) {
  const innerRef = useRef<WorkflowWizardHandle>(null)

  useImperativeHandle(ref, () => ({
    importConfig: (config: Record<string, unknown>) => {
      innerRef.current?.importConfig(config)
    },
    exportConfig: () => {
      innerRef.current?.exportConfig()
    },
  }), [])

  return (
    <WorkflowWizardProvider>
      <style jsx global>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slideInRight 0.3s ease-out; }
        .animate-slide-in-left { animation: slideInLeft 0.3s ease-out; }
      `}</style>
      <WizardContentInner ref={innerRef} />
    </WorkflowWizardProvider>
  )
})
