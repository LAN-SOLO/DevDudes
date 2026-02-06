'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

export function StepFeatures() {
  const { config, updateConfig, setCurrentStep } = useWorkflowWizard()
  const { t } = useTranslation()

  const features = [
    { id: 'dashboard', label: t('workflow.features.dashboard'), description: t('workflow.features.dashboardDesc') },
    { id: 'notifications', label: t('workflow.features.notifications'), description: t('workflow.features.notificationsDesc') },
    { id: 'search', label: t('workflow.features.search'), description: t('workflow.features.searchDesc') },
    { id: 'export', label: t('workflow.features.export'), description: t('workflow.features.exportDesc') },
    { id: 'audit', label: t('workflow.features.audit'), description: t('workflow.features.auditDesc') },
    { id: 'api', label: t('workflow.features.api'), description: t('workflow.features.apiDesc') },
    { id: 'webhooks', label: t('workflow.features.webhooks'), description: t('workflow.features.webhooksDesc') },
    { id: 'scheduling', label: t('workflow.features.scheduling'), description: t('workflow.features.schedulingDesc') },
  ]

  const toggleFeature = (id: string) => {
    const current = config.features
    if (current.includes(id)) {
      updateConfig({ features: current.filter((f) => f !== id) })
    } else {
      updateConfig({ features: [...current, id] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.features.title')}</CardTitle>
        <CardDescription>
          {t('workflow.features.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                config.features.includes(feature.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                  config.features.includes(feature.id)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground'
                }`}
              >
                {config.features.includes(feature.id) && (
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
            value={config.customFeatures}
            onChange={(e) => updateConfig({ customFeatures: e.target.value })}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(3)}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
