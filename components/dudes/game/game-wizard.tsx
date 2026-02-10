'use client'

import { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react'
import { GameWizardProvider, useGameWizard } from './game-context'
import { GameNav } from './game-nav'
import { GamePreview } from './shared/game-preview'
import { GameComplete } from './game-complete'
import { StepImport } from './steps/step-import'
import { StepTheme } from './steps/step-theme'
import { StepNarrative } from './steps/step-narrative'
import { StepGenre } from './steps/step-genre'
import { StepPlatform } from './steps/step-platform'
import { StepVisual } from './steps/step-visual'
import { StepCamera } from './steps/step-camera'
import { StepWorld } from './steps/step-world'
import { StepPlayer } from './steps/step-player'
import { StepCoreMechanics } from './steps/step-core-mechanics'
import { StepSecondaryMechanics } from './steps/step-secondary-mechanics'
import { StepProgression } from './steps/step-progression'
import { StepAudio } from './steps/step-audio'
import { StepEngine } from './steps/step-engine'
import { StepMonetization } from './steps/step-monetization'
import { StepAiFreetext } from './steps/step-ai-freetext'
import { StepCardSystem } from './steps/step-card-system'
import { StepMatchTurns } from './steps/step-match-turns'
import { StepCardVisual } from './steps/step-card-visual'
import { StepAudience } from './steps/step-audience'
import { StepSocial } from './steps/step-social'
import { StepAccessibility } from './steps/step-accessibility'
import { StepContentPlan } from './steps/step-content-plan'
import { StepAdvanced } from './steps/step-advanced'
import type { GamePresetConfig } from '@/lib/game-pipeline/types'

export interface GameWizardHandle {
  importConfig: (config: Partial<GamePresetConfig>) => void
}

const STEP_COMPONENTS: Record<number, React.FC> = {
  1: StepImport,
  2: StepTheme,
  3: StepNarrative,
  4: StepGenre,
  5: StepPlatform,
  6: StepVisual,
  7: StepCamera,
  8: StepWorld,
  9: StepPlayer,
  10: StepCoreMechanics,
  11: StepSecondaryMechanics,
  12: StepProgression,
  13: StepAudio,
  14: StepEngine,
  15: StepMonetization,
  16: StepAiFreetext,
  17: StepCardSystem,
  18: StepMatchTurns,
  19: StepCardVisual,
  20: StepAudience,
  21: StepSocial,
  22: StepAccessibility,
  23: StepContentPlan,
  24: StepAdvanced,
}

const WizardContentInner = forwardRef<GameWizardHandle>(function WizardContentInner(_, ref) {
  const { currentStep, isComplete, importConfig, setCurrentStep, nextStep, prevStep } = useGameWizard()
  const prevStepRef = useRef(currentStep)
  const containerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({ importConfig }), [importConfig])

  // Track step changes for slide animation via DOM (external system — appropriate for effects)
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

  // Keyboard navigation using visible steps
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
    return <GameComplete />
  }

  const StepComponent = STEP_COMPONENTS[currentStep]

  return (
    <div>
      <GameNav />
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
        {currentStep >= 4 && (
          <div className="hidden xl:block w-72 flex-shrink-0">
            <div className="sticky top-6">
              <GamePreview />
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export const GameWizard = forwardRef<GameWizardHandle>(function GameWizard(_, ref) {
  const innerRef = useRef<GameWizardHandle>(null)

  useImperativeHandle(ref, () => ({
    importConfig: (config: Partial<GamePresetConfig>) => {
      innerRef.current?.importConfig(config)
    },
  }), [])

  return (
    <GameWizardProvider>
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out;
        }
      `}</style>
      <WizardContentInner ref={innerRef} />
    </GameWizardProvider>
  )
})
