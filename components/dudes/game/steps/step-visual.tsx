'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { DIMENSION_OPTIONS, ART_STYLE_OPTIONS, ANIMATION_INTENSITY_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepVisual() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const handleSingleSelect = (field: 'dimension' | 'artStyle', value: string) => {
    // Clear camera style when dimension changes since camera options depend on it
    if (field === 'dimension' && value !== config.dimension) {
      updateConfig({ [field]: value, cameraStyle: '' })
    } else {
      updateConfig({ [field]: config[field] === value ? '' : value })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.visual.title')}</CardTitle>
        <CardDescription>{t('game.visual.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.visual.dimensionLabel')}</h3>
          <OptionGrid
            options={DIMENSION_OPTIONS}
            selected={config.dimension}
            onSelect={(v) => handleSingleSelect('dimension', v)}
            mode="single"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.visual.artStyleLabel')}</h3>
          <OptionGrid
            options={ART_STYLE_OPTIONS}
            selected={config.artStyle}
            onSelect={(v) => handleSingleSelect('artStyle', v)}
            mode="single"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.visual.animationLabel')}</h3>
          <OptionGrid
            options={ANIMATION_INTENSITY_OPTIONS}
            selected={config.animationIntensity}
            onSelect={(v) => updateConfig({ animationIntensity: config.animationIntensity === v ? '' : v })}
            mode="single"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(5)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(7)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
