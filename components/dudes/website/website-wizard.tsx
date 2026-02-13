'use client'

import { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react'
import { WebsiteWizardProvider, useWebsiteWizard } from './website-context'
import { WebsiteNav } from './website-nav'
import { WebsitePreview } from './shared/website-preview'
import { WebsiteComplete } from './website-complete'
import { StepImport } from './steps/step-import'
import { StepPurpose } from './steps/step-purpose'
import { StepBranding } from './steps/step-branding'
import { StepCI } from './steps/step-ci'
import { StepLayout } from './steps/step-layout'
import { StepVisual } from './steps/step-visual'
import { StepContent } from './steps/step-content'
import { StepFramework } from './steps/step-framework'
import { StepBackend } from './steps/step-backend'
import { StepIntegrations } from './steps/step-integrations'
import { StepProducts } from './steps/step-products'
import { StepPayments } from './steps/step-payments'
import { StepShipping } from './steps/step-shipping'
import { StepSeo } from './steps/step-seo'
import { StepSecurity } from './steps/step-security'
import { StepHosting } from './steps/step-hosting'
import { StepAiNotes } from './steps/step-ai-notes'
import { StepBusinessModules } from './steps/step-business-modules'
import { StepDirectory } from './steps/step-directory'
import type { WebsiteConfig } from '@/lib/website-pipeline/types'

export interface WebsiteWizardHandle {
  importConfig: (config: Partial<WebsiteConfig>) => void
  exportConfig: () => void
}

const STEP_COMPONENTS: Record<number, React.FC> = {
  1: StepImport,
  2: StepPurpose,
  3: StepBranding,
  4: StepCI,
  5: StepLayout,
  6: StepVisual,
  7: StepContent,
  8: StepFramework,
  9: StepBackend,
  10: StepIntegrations,
  11: StepProducts,
  12: StepPayments,
  13: StepShipping,
  14: StepSeo,
  15: StepSecurity,
  16: StepHosting,
  17: StepAiNotes,
  18: StepBusinessModules,
  19: StepDirectory,
}

const WizardContentInner = forwardRef<WebsiteWizardHandle>(function WizardContentInner(_, ref) {
  const { config, currentStep, isComplete, importConfig, setCurrentStep, nextStep, prevStep } = useWebsiteWizard()
  const prevStepRef = useRef(currentStep)
  const containerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    importConfig,
    exportConfig: () => {
      const json = JSON.stringify(config, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'website-config.json'
      a.click()
      URL.revokeObjectURL(url)
    },
  }), [importConfig, config])

  // Track step changes for slide animation
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
      const next = nextStep(currentStep)
      if (next) {
        e.preventDefault()
        setCurrentStep(next)
      }
    } else if (e.key === 'ArrowLeft' && !isComplete) {
      const prev = prevStep(currentStep)
      if (prev) {
        e.preventDefault()
        setCurrentStep(prev)
      }
    }
  }, [currentStep, isComplete, setCurrentStep, nextStep, prevStep])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (isComplete) {
    return <WebsiteComplete />
  }

  const StepComponent = STEP_COMPONENTS[currentStep]

  return (
    <div>
      <WebsiteNav />
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
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
        {currentStep >= 3 && (
          <div className="hidden xl:block w-72 flex-shrink-0">
            <div className="sticky top-6">
              <WebsitePreview />
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export const WebsiteWizard = forwardRef<WebsiteWizardHandle>(function WebsiteWizard(_, ref) {
  const innerRef = useRef<WebsiteWizardHandle>(null)

  useImperativeHandle(ref, () => ({
    importConfig: (config: Partial<WebsiteConfig>) => {
      innerRef.current?.importConfig(config)
    },
    exportConfig: () => {
      innerRef.current?.exportConfig()
    },
  }), [])

  return (
    <WebsiteWizardProvider>
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
    </WebsiteWizardProvider>
  )
})
