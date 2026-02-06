'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import {
  PLAYER_MODE_OPTIONS,
  NETWORK_MODEL_OPTIONS,
  SYNC_TYPE_OPTIONS,
} from '@/lib/game-pipeline/constants'

export function StepPlayer() {
  const { config, updateConfig, updateMultiplayer, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const handleSelectMode = (value: string) => {
    updateConfig({ playerMode: config.playerMode === value ? '' : value })
  }

  const showMultiplayerOptions =
    config.playerMode === 'online-multiplayer' ||
    config.playerMode === 'co-op' ||
    config.playerMode === 'mmo'

  const networkOptions = NETWORK_MODEL_OPTIONS.map((o) => ({
    value: o.value,
    label: o.label,
  }))

  const syncOptions = SYNC_TYPE_OPTIONS.map((o) => ({
    value: o.value,
    label: o.label,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.player.title')}</CardTitle>
        <CardDescription>{t('game.player.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OptionGrid
          options={PLAYER_MODE_OPTIONS}
          selected={config.playerMode}
          onSelect={handleSelectMode}
          mode="single"
        />

        {showMultiplayerOptions && (
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium">{t('game.player.multiplayerConfig')}</h3>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.player.maxPlayers')}</label>
                <Input
                  type="number"
                  min={2}
                  max={1000}
                  value={config.multiplayer.maxPlayers}
                  onChange={(e) =>
                    updateMultiplayer({ maxPlayers: parseInt(e.target.value) || 4 })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.player.networkModel')}</label>
                <Select
                  value={config.multiplayer.networkModel}
                  onValueChange={(v) => updateMultiplayer({ networkModel: v })}
                  options={networkOptions}
                  placeholder={t('game.player.selectNetwork')}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.player.syncType')}</label>
                <Select
                  value={config.multiplayer.syncType}
                  onValueChange={(v) => updateMultiplayer({ syncType: v })}
                  options={syncOptions}
                  placeholder={t('game.player.selectSync')}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(8)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(10)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
