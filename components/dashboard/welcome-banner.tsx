'use client'

import { useMemo, useSyncExternalStore, useCallback, useRef } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  FileCode,
  Database,
  ArrowRight,
  X,
  Rocket,
  CheckCircle,
} from 'lucide-react'
import { useTranslation } from '@/lib/i18n/language-provider'

interface Step {
  id: string
  title: string
  description: string
  icon: typeof Sparkles
  href: string
  completed: boolean
}

// Custom hook to sync with localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Cache the last known value to ensure stable references
  const cachedValue = useRef<{ key: string; value: T } | null>(null)

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('storage', callback)
    return () => window.removeEventListener('storage', callback)
  }, [])

  const getSnapshot = useCallback(() => {
    try {
      const item = localStorage.getItem(key)
      const parsed = item ? JSON.parse(item) : initialValue

      // Return cached value if it's the same to maintain referential equality
      if (
        cachedValue.current?.key === key &&
        JSON.stringify(cachedValue.current.value) === JSON.stringify(parsed)
      ) {
        return cachedValue.current.value
      }

      cachedValue.current = { key, value: parsed }
      return parsed
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const getServerSnapshot = useCallback(() => initialValue, [initialValue])

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setValue = useCallback((newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue))
    cachedValue.current = { key, value: newValue }
    // Dispatch storage event to trigger re-render
    window.dispatchEvent(new Event('storage'))
  }, [key])

  return [value, setValue]
}

export function WelcomeBanner() {
  const { t } = useTranslation()
  const [isDismissed, setIsDismissed] = useLocalStorage('welcome-dismissed', false)
  const [completedStepIds, setCompletedStepIds] = useLocalStorage<string[]>('onboarding-steps', [])
  // Since we're using useSyncExternalStore with getServerSnapshot, hydration is handled

  const baseSteps = useMemo(() => [
    {
      id: 'create',
      title: t('dashboard.welcome.createFirstApp'),
      description: t('dashboard.welcome.createFirstAppDesc'),
      icon: Sparkles,
      href: '/dashboard/generator',
    },
    {
      id: 'template',
      title: t('dashboard.welcome.exploreTemplates'),
      description: t('dashboard.welcome.exploreTemplatesDesc'),
      icon: FileCode,
      href: '/dashboard/templates',
    },
    {
      id: 'connect',
      title: t('dashboard.welcome.connectDatabase'),
      description: t('dashboard.welcome.connectDatabaseDesc'),
      icon: Database,
      href: '/dashboard/connections',
    },
  ], [t])

  const steps: Step[] = useMemo(() =>
    baseSteps.map((step) => ({
      ...step,
      completed: completedStepIds.includes(step.id),
    })),
    [baseSteps, completedStepIds]
  )

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  const handleStepClick = (stepId: string) => {
    if (!completedStepIds.includes(stepId)) {
      setCompletedStepIds([...completedStepIds, stepId])
    }
  }

  const completedCount = steps.filter((s) => s.completed).length
  const allCompleted = completedCount === steps.length

  // Don't render if dismissed
  if (isDismissed) return null

  return (
    <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 mb-6">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{t('dashboard.welcome.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {allCompleted
                  ? t('dashboard.welcome.allSet')
                  : t('dashboard.welcome.completeSteps')}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">{t('dashboard.welcome.gettingStarted')}</span>
            <span className="font-medium">{completedCount} / {steps.length}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((step) => (
            <Link
              key={step.id}
              href={step.href}
              onClick={() => handleStepClick(step.id)}
              className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                step.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-background hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  step.completed ? 'bg-green-100' : 'bg-muted'
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <step.icon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium text-sm ${
                    step.completed ? 'text-green-700' : ''
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {step.description}
                </p>
              </div>
              {!step.completed && (
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              )}
            </Link>
          ))}
        </div>

        {allCompleted && (
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {t('dashboard.welcome.readyToBuild')}
            </p>
            <Link href="/dashboard/pipeline/preset">
              <Button size="sm">
                <Sparkles className="mr-2 h-4 w-4" />
                {t('common.startBuilding')}
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
