'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { MATCH_DURATION_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepMatchTurns() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()
  const ms = config.matchStructure
  const updateMS = (updates: Partial<typeof ms>) => {
    updateConfig({ matchStructure: { ...ms, ...updates } })
  }

  const matchDurationSelectOptions = MATCH_DURATION_OPTIONS.map((o) => ({
    value: o.value,
    label: o.label,
  }))

  const timeUnitOptions = [
    { value: 'seconds', label: 'Seconds' },
    { value: 'minutes', label: 'Minutes' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.matchTurns.title')}</CardTitle>
        <CardDescription>{t('game.matchTurns.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('game.matchTurns.matchDuration')}</label>
            <Select
              value={ms.matchDuration}
              onValueChange={(v) => updateMS({ matchDuration: v })}
              options={matchDurationSelectOptions}
              placeholder={t('game.matchTurns.matchDurationPlaceholder')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('game.matchTurns.turnStructure')}</label>
            <Input
              value={ms.turnStructure}
              onChange={(e) => updateMS({ turnStructure: e.target.value })}
              placeholder="e.g. Alternating turns, Simultaneous, Phase-based"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('game.matchTurns.roundsPerMatch')}</label>
            <Input
              type="number"
              min={1}
              max={99}
              value={ms.roundsPerMatch}
              onChange={(e) => updateMS({ roundsPerMatch: parseInt(e.target.value) || 1 })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('game.matchTurns.timePerTurn')}</label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                max={600}
                value={ms.timePerTurn}
                onChange={(e) => updateMS({ timePerTurn: parseInt(e.target.value) || 60 })}
                className="flex-1"
              />
              <Select
                value={ms.timePerTurnUnit}
                onValueChange={(v) => updateMS({ timePerTurnUnit: v })}
                options={timeUnitOptions}
                className="w-32"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={ms.ropeTimer}
            onCheckedChange={(v) => updateMS({ ropeTimer: v })}
          />
          <div>
            <label className="text-sm font-medium">{t('game.matchTurns.ropeTimer')}</label>
            <p className="text-xs text-muted-foreground">{t('game.matchTurns.ropeTimerHint')}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(17)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(19)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
