'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { SECONDARY_MECHANICS_OPTIONS } from '@/lib/game-pipeline/constants'
import { getSecondaryMechanicsRecommendations } from '@/lib/game-pipeline/recommendations'

export function StepSecondaryMechanics() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const recommendations = getSecondaryMechanicsRecommendations(config)

  const handleToggle = (value: string) => {
    const current = config.secondaryMechanics
    if (current.includes(value)) {
      updateConfig({ secondaryMechanics: current.filter((v) => v !== value) })
    } else {
      updateConfig({ secondaryMechanics: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.secondaryMechanics.title')}</CardTitle>
        <CardDescription>{t('game.secondaryMechanics.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OptionGrid
          options={SECONDARY_MECHANICS_OPTIONS}
          selected={config.secondaryMechanics}
          onSelect={handleToggle}
          mode="multi"
          recommendations={recommendations}
        />

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(10)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(12)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
