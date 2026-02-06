'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import {
  WORLD_STRUCTURE_OPTIONS,
  LEVEL_GENERATION_OPTIONS,
  WORLD_SCOPE_OPTIONS,
} from '@/lib/game-pipeline/constants'

export function StepWorld() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const handleSelect = (field: 'worldStructure' | 'levelGeneration' | 'worldScope', value: string) => {
    updateConfig({ [field]: config[field] === value ? '' : value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.world.title')}</CardTitle>
        <CardDescription>{t('game.world.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.world.structureLabel')}</h3>
          <OptionGrid
            options={WORLD_STRUCTURE_OPTIONS}
            selected={config.worldStructure}
            onSelect={(v) => handleSelect('worldStructure', v)}
            mode="single"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.world.generationLabel')}</h3>
          <OptionGrid
            options={LEVEL_GENERATION_OPTIONS}
            selected={config.levelGeneration}
            onSelect={(v) => handleSelect('levelGeneration', v)}
            mode="single"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.world.scopeLabel')}</h3>
          <OptionGrid
            options={WORLD_SCOPE_OPTIONS}
            selected={config.worldScope}
            onSelect={(v) => handleSelect('worldScope', v)}
            mode="single"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(7)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(9)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
