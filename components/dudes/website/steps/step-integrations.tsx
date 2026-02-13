'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import { RecommendationChips } from '@/components/dudes/shared/recommendation-chips'
import {
  EMAIL_PROVIDER_OPTIONS,
  ANALYTICS_OPTIONS,
  MONITORING_OPTIONS,
  CRM_OPTIONS,
  MARKETING_OPTIONS,
  CHAT_WIDGET_OPTIONS,
} from '@/lib/website-pipeline/constants'
import { getIntegrationRecommendations } from '@/lib/website-pipeline/recommendations'

export function StepIntegrations() {
  const { config, updateConfig, setCurrentStep, nextStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const recommendations = getIntegrationRecommendations(config)

  const handleToggleAnalytics = (value: string) => {
    const current = config.analytics
    if (current.includes(value)) {
      updateConfig({ analytics: current.filter((v) => v !== value) })
    } else {
      updateConfig({ analytics: [...current, value] })
    }
  }

  const handleToggleMarketing = (value: string) => {
    const current = config.marketing
    if (current.includes(value)) {
      updateConfig({ marketing: current.filter((v) => v !== value) })
    } else {
      updateConfig({ marketing: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.integrations.title')}</CardTitle>
        <CardDescription>{t('website.integrations.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RecommendationChips
          recommendations={recommendations}
          selectedValues={config.analytics}
          onSelect={handleToggleAnalytics}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.integrations.emailProvider')}</label>
            <Select
              value={config.emailProvider}
              onValueChange={(v) => updateConfig({ emailProvider: v })}
              options={EMAIL_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.integrations.monitoring')}</label>
            <Select
              value={config.monitoring}
              onValueChange={(v) => updateConfig({ monitoring: v })}
              options={MONITORING_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.integrations.analytics')}</label>
          <OptionGrid
            options={ANALYTICS_OPTIONS}
            selected={config.analytics}
            onSelect={handleToggleAnalytics}
            mode="multi"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.integrations.crm')}</label>
            <Select
              value={config.crm}
              onValueChange={(v) => updateConfig({ crm: v })}
              options={CRM_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.integrations.chatWidget')}</label>
            <Select
              value={config.chatWidget}
              onValueChange={(v) => updateConfig({ chatWidget: v })}
              options={CHAT_WIDGET_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.integrations.marketing')}</label>
          <OptionGrid
            options={MARKETING_OPTIONS}
            selected={config.marketing}
            onSelect={handleToggleMarketing}
            mode="multi"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(9)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => { const next = nextStep(10); if (next) setCurrentStep(next) }}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
