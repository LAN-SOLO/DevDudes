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
  SEO_STRATEGY_OPTIONS,
  STRUCTURED_DATA_OPTIONS,
  PERFORMANCE_BUDGET_OPTIONS,
} from '@/lib/website-pipeline/constants'
import { getSeoRecommendations } from '@/lib/website-pipeline/recommendations'

export function StepSeo() {
  const { config, updateConfig, setCurrentStep, prevStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const recommendations = getSeoRecommendations(config)

  const handleToggleStructuredData = (value: string) => {
    const current = config.structuredData
    if (current.includes(value)) {
      updateConfig({ structuredData: current.filter((v) => v !== value) })
    } else {
      updateConfig({ structuredData: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.seo.title')}</CardTitle>
        <CardDescription>{t('website.seo.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.seo.seoStrategy')}</label>
          <OptionGrid
            options={SEO_STRATEGY_OPTIONS}
            selected={config.seoStrategy}
            onSelect={(v) => updateConfig({ seoStrategy: v })}
            mode="single"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.seo.structuredData')}</label>
          <OptionGrid
            options={STRUCTURED_DATA_OPTIONS}
            selected={config.structuredData}
            onSelect={handleToggleStructuredData}
            mode="multi"
          />
          <RecommendationChips
            recommendations={recommendations}
            selectedValues={config.structuredData}
            onSelect={handleToggleStructuredData}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { key: 'sitemap' as const, label: t('website.seo.sitemap') },
            { key: 'robotsTxt' as const, label: t('website.seo.robotsTxt') },
            { key: 'openGraph' as const, label: t('website.seo.openGraph') },
            { key: 'twitterCards' as const, label: t('website.seo.twitterCards') },
            { key: 'canonicalUrls' as const, label: t('website.seo.canonicalUrls') },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={key}
                checked={config[key]}
                onChange={(e) => updateConfig({ [key]: e.target.checked })}
                className="rounded border"
              />
              <label htmlFor={key} className="text-sm">{label}</label>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.seo.performanceBudget')}</label>
          <Select
            value={config.performanceBudget}
            onValueChange={(v) => updateConfig({ performanceBudget: v })}
            options={PERFORMANCE_BUDGET_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => { const prev = prevStep(14); if (prev) setCurrentStep(prev) }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(15)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
