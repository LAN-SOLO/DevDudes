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
  DATABASE_OPTIONS,
  ORM_OPTIONS,
  AUTH_PROVIDER_OPTIONS,
  AUTH_METHOD_OPTIONS,
  STORAGE_OPTIONS,
  API_STYLE_OPTIONS,
} from '@/lib/website-pipeline/constants'
import { getDatabaseRecommendations } from '@/lib/website-pipeline/recommendations'

export function StepBackend() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const recommendations = getDatabaseRecommendations(config)

  const handleToggleAuthMethod = (value: string) => {
    const current = config.authMethods
    if (current.includes(value)) {
      updateConfig({ authMethods: current.filter((v) => v !== value) })
    } else {
      updateConfig({ authMethods: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.backend.title')}</CardTitle>
        <CardDescription>{t('website.backend.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.backend.database')}</label>
          <Select
            value={config.database}
            onValueChange={(v) => updateConfig({ database: v })}
            options={DATABASE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
          <RecommendationChips
            recommendations={recommendations}
            selectedValues={[config.database]}
            onSelect={(v) => updateConfig({ database: v })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.backend.orm')}</label>
            <Select
              value={config.orm}
              onValueChange={(v) => updateConfig({ orm: v })}
              options={ORM_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.backend.storageProvider')}</label>
            <Select
              value={config.storageProvider}
              onValueChange={(v) => updateConfig({ storageProvider: v })}
              options={STORAGE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.backend.auth')}</label>
          <Select
            value={config.auth}
            onValueChange={(v) => updateConfig({ auth: v })}
            options={AUTH_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {config.auth && config.auth !== 'none' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.backend.authMethods')}</label>
            <OptionGrid
              options={AUTH_METHOD_OPTIONS}
              selected={config.authMethods}
              onSelect={handleToggleAuthMethod}
              mode="multi"
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.backend.apiStyle')}</label>
          <OptionGrid
            options={API_STYLE_OPTIONS}
            selected={config.apiStyle}
            onSelect={(v) => updateConfig({ apiStyle: v })}
            mode="single"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(8)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(10)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
