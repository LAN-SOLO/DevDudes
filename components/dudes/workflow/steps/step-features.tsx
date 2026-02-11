'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { FEATURE_OPTIONS } from '@/lib/workflow-pipeline/constants'

export function StepFeatures() {
  const { config, updateFeatures, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()

  const toggleFeature = (id: string) => {
    const current = config.features.featureIds
    if (current.includes(id)) {
      updateFeatures({ featureIds: current.filter((f) => f !== id) })
    } else {
      updateFeatures({ featureIds: [...current, id] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.features.title')}</CardTitle>
        <CardDescription>{t('workflow.features.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_OPTIONS.map((feature) => (
            <button
              key={feature.value}
              onClick={() => toggleFeature(feature.value)}
              className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                config.features.featureIds.includes(feature.value)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                  config.features.featureIds.includes(feature.value)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground'
                }`}
              >
                {config.features.featureIds.includes(feature.value) && (
                  <Check className="h-3 w-3" />
                )}
              </div>
              <div>
                <span className="font-medium text-sm">{feature.label}</span>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t('workflow.features.customFeatures')}</p>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={t('workflow.features.customFeaturesPlaceholder')}
            value={config.features.customFeatures}
            onChange={(e) => updateFeatures({ customFeatures: e.target.value })}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            {t('workflow.common.back')}
          </Button>
          <Button onClick={nextStep}>
            {t('workflow.common.continue')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
