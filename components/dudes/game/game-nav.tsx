'use client'

import { useMemo } from 'react'
import { useGameWizard } from './game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STEP_CATEGORIES, STEP_LABELS } from '@/lib/game-pipeline/constants'

export function GameNav() {
  const { currentStep, setCurrentStep, visibleSteps } = useGameWizard()
  const { t } = useTranslation()

  // Filter categories to only show visible steps
  const filteredCategories = useMemo(() => {
    return STEP_CATEGORIES
      .map((cat) => ({
        ...cat,
        steps: cat.steps.filter((s) => visibleSteps.includes(s)),
      }))
      .filter((cat) => cat.steps.length > 0)
  }, [visibleSteps])

  // Determine which category the current step belongs to
  const activeCategory = filteredCategories.find((cat) =>
    cat.steps.includes(currentStep)
  )

  return (
    <nav className="mb-8">
      <div className="flex flex-wrap gap-2">
        {filteredCategories.map((category) => {
          const isActive = category.id === activeCategory?.id
          const completedSteps = category.steps.filter((s) => s < currentStep).length
          const totalSteps = category.steps.length
          const allComplete = completedSteps === totalSteps

          return (
            <div key={category.id} className="flex flex-col gap-1">
              {/* Category label */}
              <span
                className={cn(
                  'text-[10px] font-medium uppercase tracking-wider px-1',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {t(`game.nav.${category.id}`)}
                {!isActive && (
                  <span className="ml-1 text-muted-foreground">
                    {completedSteps}/{totalSteps}
                  </span>
                )}
              </span>

              {/* Step circles */}
              <div className="flex items-center gap-1">
                {category.steps.map((stepNum, idx) => {
                  const isStepActive = currentStep === stepNum
                  const isStepComplete = currentStep > stepNum

                  return (
                    <div key={stepNum} className="flex items-center">
                      <button
                        onClick={() => setCurrentStep(stepNum)}
                        title={STEP_LABELS[stepNum]}
                        className={cn(
                          'flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium transition-colors',
                          isStepActive && 'bg-primary text-primary-foreground',
                          isStepComplete && 'bg-primary/80 text-primary-foreground',
                          !isStepActive && !isStepComplete && 'bg-muted text-muted-foreground hover:bg-muted/80'
                        )}
                      >
                        {isStepComplete ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          stepNum
                        )}
                      </button>
                      {idx < category.steps.length - 1 && (
                        <div
                          className={cn(
                            'h-0.5 w-2',
                            isStepComplete ? 'bg-primary/60' : 'bg-muted'
                          )}
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Active step label */}
              {isActive && (
                <span className="text-xs text-primary font-medium px-1 truncate max-w-[120px]">
                  {STEP_LABELS[currentStep]}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
