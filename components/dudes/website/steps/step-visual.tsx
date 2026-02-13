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
  DESIGN_SYSTEM_OPTIONS,
  ANIMATION_LEVEL_OPTIONS,
  ICON_STYLE_OPTIONS,
  IMAGE_STRATEGY_OPTIONS,
  BORDER_RADIUS_OPTIONS,
} from '@/lib/website-pipeline/constants'
import { getDesignRecommendations } from '@/lib/website-pipeline/recommendations'

export function StepVisual() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const recommendations = getDesignRecommendations(config)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.visual.title')}</CardTitle>
        <CardDescription>{t('website.visual.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.visual.theme')}</label>
          <div className="flex gap-2">
            {['light', 'dark', 'system'].map((th) => (
              <Button
                key={th}
                variant={config.theme === th ? 'default' : 'outline'}
                onClick={() => updateConfig({ theme: th })}
                className="flex-1"
              >
                {th.charAt(0).toUpperCase() + th.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.visual.designSystem')}</label>
          <OptionGrid
            options={DESIGN_SYSTEM_OPTIONS}
            selected={config.designSystem}
            onSelect={(v) => updateConfig({ designSystem: v })}
            mode="single"
          />
          <RecommendationChips
            recommendations={recommendations}
            selectedValues={[config.designSystem]}
            onSelect={(v) => updateConfig({ designSystem: v })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.visual.animationLevel')}</label>
            <Select
              value={config.animationLevel}
              onValueChange={(v) => updateConfig({ animationLevel: v })}
              options={ANIMATION_LEVEL_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.visual.iconStyle')}</label>
            <Select
              value={config.iconStyle}
              onValueChange={(v) => updateConfig({ iconStyle: v })}
              options={ICON_STYLE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.visual.imageStrategy')}</label>
            <Select
              value={config.imageStrategy}
              onValueChange={(v) => updateConfig({ imageStrategy: v })}
              options={IMAGE_STRATEGY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.visual.borderRadius')}</label>
            <Select
              value={config.borderRadius}
              onValueChange={(v) => updateConfig({ borderRadius: v })}
              options={BORDER_RADIUS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(5)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(7)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
