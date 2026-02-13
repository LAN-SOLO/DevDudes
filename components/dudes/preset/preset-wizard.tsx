'use client'

import { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react'
import { PresetWizardProvider, usePresetWizard } from './wizard-context'
import { WizardNav } from './wizard-nav'
import { WizardComplete } from './wizard-complete'
import { StepMeta } from './steps/step-meta'
import { StepCI } from './steps/step-ci'
import { StepAppShell } from './steps/step-app-shell'
import { StepAuthSecurity } from './steps/step-auth-security'
import { StepDatabase } from './steps/step-database'
import { StepApi } from './steps/step-api'
import { StepFeatures } from './steps/step-features'
import { StepUiTheme } from './steps/step-ui-theme'
import { StepPages } from './steps/step-pages'
import { StepStorage } from './steps/step-storage'
import { StepNotifications } from './steps/step-notifications'
import { StepAiSearch } from './steps/step-ai-search'
import { StepPayments } from './steps/step-payments'
import { StepRealtimeBackground } from './steps/step-realtime-background'
import { StepTestingCiCd } from './steps/step-testing-cicd'
import { StepIntegrations } from './steps/step-integrations'
import { StepDeploy } from './steps/step-deploy'
import type { PresetConfigV2 } from '@/lib/preset-pipeline/types'

export interface PresetWizardHandle {
  importConfig: (config: Record<string, unknown>) => void
  exportConfig: () => void
}

const STEP_COMPONENTS: Record<number, React.FC> = {
  1: StepMeta,
  2: StepCI,
  3: StepAppShell,
  4: StepAuthSecurity,
  5: StepDatabase,
  6: StepApi,
  7: StepFeatures,
  8: StepUiTheme,
  9: StepPages,
  10: StepStorage,
  11: StepNotifications,
  12: StepAiSearch,
  13: StepPayments,
  14: StepRealtimeBackground,
  15: StepTestingCiCd,
  16: StepIntegrations,
  17: StepDeploy,
}

const WizardContentInner = forwardRef<PresetWizardHandle>(function WizardContentInner(_, ref) {
  const { currentStep, isComplete, importConfig, config, nextStep, prevStep, setCurrentStep } = usePresetWizard()
  const prevStepRef = useRef(currentStep)
  const containerRef = useRef<HTMLDivElement>(null)

  const exportConfig = useCallback(() => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${config.meta.businessName || 'preset'}-config.json`
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
    return <WizardComplete />
  }

  const StepComponent = STEP_COMPONENTS[currentStep]

  return (
    <div>
      <WizardNav />
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

export const PresetWizard = forwardRef<PresetWizardHandle>(function PresetWizard(_, ref) {
  const innerRef = useRef<PresetWizardHandle>(null)

  useImperativeHandle(ref, () => ({
    importConfig: (config: Record<string, unknown>) => {
      innerRef.current?.importConfig(config)
    },
    exportConfig: () => {
      innerRef.current?.exportConfig()
    },
  }), [])

  return (
    <PresetWizardProvider>
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
    </PresetWizardProvider>
  )
})
