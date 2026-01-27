'use client'

import { useWizard } from './wizard-context'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, name: 'Business' },
  { id: 2, name: 'App Type' },
  { id: 3, name: 'Features' },
  { id: 4, name: 'Data' },
  { id: 5, name: 'Auth' },
  { id: 6, name: 'UI' },
  { id: 7, name: 'Integrations' },
  { id: 8, name: 'Deploy' },
]

export function WizardNav() {
  const { currentStep, setCurrentStep } = useWizard()

  return (
    <nav className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                currentStep === step.id && "text-primary",
                currentStep > step.id && "text-primary",
                currentStep < step.id && "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  currentStep === step.id && "bg-primary text-primary-foreground",
                  currentStep > step.id && "bg-primary text-primary-foreground",
                  currentStep < step.id && "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.id
                )}
              </span>
              <span className="hidden sm:inline">{step.name}</span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-8 sm:w-12",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
