'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Check } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { IN_GAME_AI_OPTIONS, DEV_AI_OPTIONS, isCardGame } from '@/lib/game-pipeline/constants'

export function StepAiFreetext() {
  const { config, updateConfig, updateAiFreetext, setCurrentStep, setIsComplete } = useGameWizard()
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

        {(isCardGame(config.genres) || config.victoryCondition === 'competitive') && (
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium">{t('game.aiFreetext.aiOpponentTitle')}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.aiFreetext.aiOpponentDifficulty')}</label>
                <Input
                  value={config.aiOpponent.difficultyTiers}
                  onChange={(e) => updateConfig({ aiOpponent: { ...config.aiOpponent, difficultyTiers: e.target.value } })}
                  placeholder="e.g. Easy, Medium, Hard, Expert"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.aiFreetext.aiOpponentPersonality')}</label>
                <Textarea
                  value={config.aiOpponent.personality}
                  onChange={(e) => updateConfig({ aiOpponent: { ...config.aiOpponent, personality: e.target.value } })}
                  placeholder={t('game.aiFreetext.aiOpponentPersonalityPlaceholder')}
                  rows={2}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={config.aiOpponent.cheatingEnabled}
                onCheckedChange={(v) => updateConfig({ aiOpponent: { ...config.aiOpponent, cheatingEnabled: v } })}
              />
              <label className="text-xs font-medium">{t('game.aiFreetext.aiOpponentCheating')}</label>
            </div>
          </div>
        )}

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
