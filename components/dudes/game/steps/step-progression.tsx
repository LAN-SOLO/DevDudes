'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import {
  PROGRESSION_SYSTEM_OPTIONS,
  DIFFICULTY_OPTIONS,
  REWARD_TYPE_OPTIONS,
} from '@/lib/game-pipeline/constants'
import { getProgressionRecommendations } from '@/lib/game-pipeline/recommendations'

export function StepProgression() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const recs = getProgressionRecommendations(config)

  const toggleArray = (field: 'progressionSystems' | 'rewardTypes', value: string) => {
    const current = config[field]
    if (current.includes(value)) {
      updateConfig({ [field]: current.filter((v) => v !== value) })
    } else {
      updateConfig({ [field]: [...current, value] })
    }
  }

  const handleDifficulty = (value: string) => {
    updateConfig({ difficulty: config.difficulty === value ? '' : value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.progression.title')}</CardTitle>
        <CardDescription>{t('game.progression.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.progression.systemsLabel')}</h3>
          <OptionGrid
            options={PROGRESSION_SYSTEM_OPTIONS}
            selected={config.progressionSystems}
            onSelect={(v) => toggleArray('progressionSystems', v)}
            mode="multi"
            recommendations={recs.systems}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.progression.difficultyLabel')}</h3>
          <OptionGrid
            options={DIFFICULTY_OPTIONS}
            selected={config.difficulty}
            onSelect={handleDifficulty}
            mode="single"
            recommendations={recs.difficulty}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.progression.rewardsLabel')}</h3>
          <OptionGrid
            options={REWARD_TYPE_OPTIONS}
            selected={config.rewardTypes}
            onSelect={(v) => toggleArray('rewardTypes', v)}
            mode="multi"
            recommendations={recs.rewards}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(11)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(13)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
