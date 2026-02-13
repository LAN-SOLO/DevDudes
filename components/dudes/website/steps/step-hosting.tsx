'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  HOSTING_OPTIONS,
  CI_OPTIONS,
  ENVIRONMENT_OPTIONS,
  REGION_OPTIONS,
  SCALING_OPTIONS,
  DISTRIBUTION_CHANNEL_OPTIONS,
} from '@/lib/website-pipeline/constants'
import { getHostingRecommendations } from '@/lib/website-pipeline/recommendations'

export function StepHosting() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const recommendations = getHostingRecommendations(config)

  const handleToggleEnvironment = (value: string) => {
    const current = config.environments
    if (current.includes(value)) {
      updateConfig({ environments: current.filter((v) => v !== value) })
    } else {
      updateConfig({ environments: [...current, value] })
    }
  }

  const handleToggleDistribution = (value: string) => {
    const current = config.distributionChannels
    if (current.includes(value)) {
      updateConfig({ distributionChannels: current.filter((v) => v !== value) })
    } else {
      updateConfig({ distributionChannels: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.hosting.title')}</CardTitle>
        <CardDescription>{t('website.hosting.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.hosting.hosting')}</label>
          <OptionGrid
            options={HOSTING_OPTIONS}
            selected={config.hosting}
            onSelect={(v) => updateConfig({ hosting: v })}
            mode="single"
            recommendations={recommendations}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.hosting.ci')}</label>
            <Select
              value={config.ci}
              onValueChange={(v) => updateConfig({ ci: v })}
              options={CI_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.hosting.region')}</label>
            <Select
              value={config.region}
              onValueChange={(v) => updateConfig({ region: v })}
              options={REGION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.hosting.environments')}</label>
          <OptionGrid
            options={ENVIRONMENT_OPTIONS}
            selected={config.environments}
            onSelect={handleToggleEnvironment}
            mode="multi"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.hosting.scaling')}</label>
            <Select
              value={config.scaling}
              onValueChange={(v) => updateConfig({ scaling: v })}
              options={SCALING_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="containerized"
              checked={config.containerized}
              onChange={(e) => updateConfig({ containerized: e.target.checked })}
              className="rounded border"
            />
            <label htmlFor="containerized" className="text-sm">{t('website.hosting.containerized')}</label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.hosting.distributionChannels')}</label>
          <OptionGrid
            options={DISTRIBUTION_CHANNEL_OPTIONS}
            selected={config.distributionChannels}
            onSelect={handleToggleDistribution}
            mode="multi"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(15)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(17)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
