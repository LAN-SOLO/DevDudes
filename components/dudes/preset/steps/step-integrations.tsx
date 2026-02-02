'use client'

import { useWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

export function StepIntegrations() {
  const { config, updateConfig, setCurrentStep } = useWizard()
  const { t } = useTranslation()

  const integrations = [
    { id: 'stripe', label: t('preset.integrations.items.stripe'), description: t('preset.integrations.items.stripeDesc'), category: t('preset.integrations.categories.payments') },
    { id: 'paypal', label: t('preset.integrations.items.paypal'), description: t('preset.integrations.items.paypalDesc'), category: t('preset.integrations.categories.payments') },
    { id: 'sendgrid', label: t('preset.integrations.items.sendgrid'), description: t('preset.integrations.items.sendgridDesc'), category: t('preset.integrations.categories.communication') },
    { id: 'twilio', label: t('preset.integrations.items.twilio'), description: t('preset.integrations.items.twilioDesc'), category: t('preset.integrations.categories.communication') },
    { id: 'slack', label: t('preset.integrations.items.slack'), description: t('preset.integrations.items.slackDesc'), category: t('preset.integrations.categories.communication') },
    { id: 's3', label: t('preset.integrations.items.s3'), description: t('preset.integrations.items.s3Desc'), category: t('preset.integrations.categories.storage') },
    { id: 'cloudinary', label: t('preset.integrations.items.cloudinary'), description: t('preset.integrations.items.cloudinaryDesc'), category: t('preset.integrations.categories.storage') },
    { id: 'analytics', label: t('preset.integrations.items.analytics'), description: t('preset.integrations.items.analyticsDesc'), category: t('preset.integrations.categories.analytics') },
    { id: 'posthog', label: t('preset.integrations.items.posthog'), description: t('preset.integrations.items.posthogDesc'), category: t('preset.integrations.categories.analytics') },
    { id: 'sentry', label: t('preset.integrations.items.sentry'), description: t('preset.integrations.items.sentryDesc'), category: t('preset.integrations.categories.monitoring') },
    { id: 'openai', label: t('preset.integrations.items.openai'), description: t('preset.integrations.items.openaiDesc'), category: t('preset.integrations.categories.ai') },
    { id: 'zapier', label: t('preset.integrations.items.zapier'), description: t('preset.integrations.items.zapierDesc'), category: t('preset.integrations.categories.automation') },
  ]

  const categories = [...new Set(integrations.map(i => i.category))]

  const toggleIntegration = (id: string) => {
    const current = config.integrations
    if (current.includes(id)) {
      updateConfig({ integrations: current.filter((i) => i !== id) })
    } else {
      updateConfig({ integrations: [...current, id] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.integrations.title')}</CardTitle>
        <CardDescription>
          {t('preset.integrations.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{category}</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {integrations
                .filter((i) => i.category === category)
                .map((integration) => (
                  <button
                    key={integration.id}
                    onClick={() => toggleIntegration(integration.id)}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                      config.integrations.includes(integration.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                        config.integrations.includes(integration.id)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {config.integrations.includes(integration.id) && (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-sm">{integration.label}</span>
                      <p className="text-xs text-muted-foreground">{integration.description}</p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}

        <p className="text-sm text-muted-foreground">
          {config.integrations.length} {t('preset.common.selected')}
        </p>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(6)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(8)}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
