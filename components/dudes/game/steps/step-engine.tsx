'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import {
  ENGINE_OPTIONS,
  TARGET_FPS_OPTIONS,
  ADDITIONAL_TECH_OPTIONS,
} from '@/lib/game-pipeline/constants'
import { getEngineRecommendations } from '@/lib/game-pipeline/recommendations'

export function StepEngine() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const recs = getEngineRecommendations(config)

  const handleEngine = (value: string) => {
    updateConfig({ engine: config.engine === value ? '' : value })
  }

  const handleFps = (value: string) => {
    updateConfig({ targetFps: config.targetFps === value ? '' : value })
  }

  const handleTech = (value: string) => {
    const current = config.additionalTech
    if (current.includes(value)) {
      updateConfig({ additionalTech: current.filter((v) => v !== value) })
    } else {
      updateConfig({ additionalTech: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.engine.title')}</CardTitle>
        <CardDescription>{t('game.engine.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.engine.engineLabel')}</h3>
          <OptionGrid
            options={ENGINE_OPTIONS}
            selected={config.engine}
            onSelect={handleEngine}
            mode="single"
            recommendations={recs.engine}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.engine.fpsLabel')}</h3>
          <OptionGrid
            options={TARGET_FPS_OPTIONS}
            selected={config.targetFps}
            onSelect={handleFps}
            mode="single"
            recommendations={recs.fps}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.engine.techLabel')}</h3>
          <OptionGrid
            options={ADDITIONAL_TECH_OPTIONS}
            selected={config.additionalTech}
            onSelect={handleTech}
            mode="multi"
            recommendations={recs.tech}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(13)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(15)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
