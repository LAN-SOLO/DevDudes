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
  CONTENT_TYPE_OPTIONS,
  CMS_PROVIDER_OPTIONS,
  SEARCH_PROVIDER_OPTIONS,
} from '@/lib/website-pipeline/constants'
import { getContentRecommendations } from '@/lib/website-pipeline/recommendations'

export function StepContent() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const recommendations = getContentRecommendations(config)

  const handleToggleContent = (value: string) => {
    const current = config.contentTypes
    if (current.includes(value)) {
      updateConfig({ contentTypes: current.filter((v) => v !== value) })
    } else {
      updateConfig({ contentTypes: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.content.title')}</CardTitle>
        <CardDescription>{t('website.content.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.content.contentTypes')}</label>
          <OptionGrid
            options={CONTENT_TYPE_OPTIONS}
            selected={config.contentTypes}
            onSelect={handleToggleContent}
            mode="multi"
          />
          <RecommendationChips
            recommendations={recommendations}
            selectedValues={config.contentTypes}
            onSelect={handleToggleContent}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.content.cmsProvider')}</label>
          <Select
            value={config.cmsProvider}
            onValueChange={(v) => updateConfig({ cmsProvider: v })}
            options={CMS_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="blogEnabled"
              checked={config.blogEnabled}
              onChange={(e) => updateConfig({ blogEnabled: e.target.checked })}
              className="rounded border"
            />
            <label htmlFor="blogEnabled" className="text-sm">{t('website.content.blog')}</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="i18nEnabled"
              checked={config.i18nEnabled}
              onChange={(e) => updateConfig({ i18nEnabled: e.target.checked })}
              className="rounded border"
            />
            <label htmlFor="i18nEnabled" className="text-sm">{t('website.content.i18n')}</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="searchEnabled"
              checked={config.searchEnabled}
              onChange={(e) => updateConfig({ searchEnabled: e.target.checked })}
              className="rounded border"
            />
            <label htmlFor="searchEnabled" className="text-sm">{t('website.content.search')}</label>
          </div>
        </div>

        {config.searchEnabled && (
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.content.searchProvider')}</label>
            <Select
              value={config.searchProvider}
              onValueChange={(v) => updateConfig({ searchProvider: v })}
              options={SEARCH_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(6)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(8)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
