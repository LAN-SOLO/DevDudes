'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { BUSINESS_MODEL_OPTIONS, DISTRIBUTION_OPTIONS } from '@/lib/game-pipeline/constants'
import { getMonetizationRecommendations } from '@/lib/game-pipeline/recommendations'

export function StepMonetization() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const recs = getMonetizationRecommendations(config)

  const handleModel = (value: string) => {
    updateConfig({ businessModel: config.businessModel === value ? '' : value })
  }

  const handleDistribution = (value: string) => {
    const current = config.distribution
    if (current.includes(value)) {
      updateConfig({ distribution: current.filter((v) => v !== value) })
    } else {
      updateConfig({ distribution: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.monetization.title')}</CardTitle>
        <CardDescription>{t('game.monetization.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.monetization.modelLabel')}</h3>
          <OptionGrid
            options={BUSINESS_MODEL_OPTIONS}
            selected={config.businessModel}
            onSelect={handleModel}
            mode="single"
            recommendations={recs.model}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.monetization.distributionLabel')}</h3>
          <OptionGrid
            options={DISTRIBUTION_OPTIONS}
            selected={config.distribution}
            onSelect={handleDistribution}
            mode="multi"
            recommendations={recs.distribution}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(14)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(16)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
