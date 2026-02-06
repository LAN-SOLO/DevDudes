'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Check } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { IN_GAME_AI_OPTIONS, DEV_AI_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepAiFreetext() {
  const { config, updateAiFreetext, setCurrentStep, setIsComplete } = useGameWizard()
  const { t } = useTranslation()

  const handleInGameAi = (value: string) => {
    const current = config.aiFreetext.inGameAi
    if (current.includes(value)) {
      updateAiFreetext({ inGameAi: current.filter((v) => v !== value) })
    } else {
      updateAiFreetext({ inGameAi: [...current, value] })
    }
  }

  const handleDevAi = (value: string) => {
    const current = config.aiFreetext.devAi
    if (current.includes(value)) {
      updateAiFreetext({ devAi: current.filter((v) => v !== value) })
    } else {
      updateAiFreetext({ devAi: [...current, value] })
    }
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.aiFreetext.title')}</CardTitle>
        <CardDescription>{t('game.aiFreetext.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.aiFreetext.inGameAiLabel')}</h3>
          <OptionGrid
            options={IN_GAME_AI_OPTIONS}
            selected={config.aiFreetext.inGameAi}
            onSelect={handleInGameAi}
            mode="multi"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.aiFreetext.devAiLabel')}</h3>
          <OptionGrid
            options={DEV_AI_OPTIONS}
            selected={config.aiFreetext.devAi}
            onSelect={handleDevAi}
            mode="multi"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('game.aiFreetext.detailedDescLabel')}</label>
          <Textarea
            value={config.aiFreetext.detailedDescription}
            onChange={(e) => updateAiFreetext({ detailedDescription: e.target.value })}
            placeholder={t('game.aiFreetext.detailedDescPlaceholder')}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('game.aiFreetext.gameplayLoopLabel')}</label>
          <Textarea
            value={config.aiFreetext.gameplayLoop}
            onChange={(e) => updateAiFreetext({ gameplayLoop: e.target.value })}
            placeholder={t('game.aiFreetext.gameplayLoopPlaceholder')}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('game.aiFreetext.referenceGamesLabel')}</label>
          <Textarea
            value={config.aiFreetext.referenceGames}
            onChange={(e) => updateAiFreetext({ referenceGames: e.target.value })}
            placeholder={t('game.aiFreetext.referenceGamesPlaceholder')}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('game.aiFreetext.constraintsLabel')}</label>
          <Textarea
            value={config.aiFreetext.constraints}
            onChange={(e) => updateAiFreetext({ constraints: e.target.value })}
            placeholder={t('game.aiFreetext.constraintsPlaceholder')}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('game.aiFreetext.notesLabel')}</label>
          <Textarea
            value={config.aiFreetext.additionalNotes}
            onChange={(e) => updateAiFreetext({ additionalNotes: e.target.value })}
            placeholder={t('game.aiFreetext.notesPlaceholder')}
            rows={3}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(15)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={handleComplete}>
            <Check className="mr-2 h-4 w-4" />
            {t('game.aiFreetext.complete')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
