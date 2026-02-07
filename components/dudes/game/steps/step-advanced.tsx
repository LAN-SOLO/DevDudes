'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Check } from 'lucide-react'

export function StepAdvanced() {
  const { config, updateConfig, setCurrentStep, setIsComplete } = useGameWizard()
  const { t } = useTranslation()
  const gl = config.gameplayLoopStructured

  const updateGL = (updates: Partial<typeof gl>) => {
    updateConfig({ gameplayLoopStructured: { ...gl, ...updates } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.advanced.title')}</CardTitle>
        <CardDescription>{t('game.advanced.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.advanced.gameplayLoop')}</h4>
          <p className="text-xs text-muted-foreground">{t('game.advanced.gameplayLoopHint')}</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.advanced.microLoop')}</label>
              <Textarea
                value={gl.microLoop}
                onChange={(e) => updateGL({ microLoop: e.target.value })}
                placeholder="e.g. Draw card > Play card > Resolve effect > End turn"
                rows={2}
              />
              <p className="text-xs text-muted-foreground">{t('game.advanced.microLoopHint')}</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.advanced.sessionLoop')}</label>
              <Textarea
                value={gl.sessionLoop}
                onChange={(e) => updateGL({ sessionLoop: e.target.value })}
                placeholder="e.g. Queue match > Draft/select deck > Play match > Review results > Earn rewards"
                rows={2}
              />
              <p className="text-xs text-muted-foreground">{t('game.advanced.sessionLoopHint')}</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.advanced.progressionLoop')}</label>
              <Textarea
                value={gl.progressionLoop}
                onChange={(e) => updateGL({ progressionLoop: e.target.value })}
                placeholder="e.g. Win matches > Earn currency > Open packs > Build better decks > Climb ranks"
                rows={2}
              />
              <p className="text-xs text-muted-foreground">{t('game.advanced.progressionLoopHint')}</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.advanced.engagementLoop')}</label>
              <Textarea
                value={gl.engagementLoop}
                onChange={(e) => updateGL({ engagementLoop: e.target.value })}
                placeholder="e.g. Daily quests > Season pass > Limited events > New expansion > Meta shifts"
                rows={2}
              />
              <p className="text-xs text-muted-foreground">{t('game.advanced.engagementLoopHint')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.advanced.offlineAndPwa')}</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Switch
                checked={config.offlineMode}
                onCheckedChange={(v) => updateConfig({ offlineMode: v })}
              />
              <div>
                <label className="text-sm font-medium">{t('game.advanced.offlineMode')}</label>
                <p className="text-xs text-muted-foreground">{t('game.advanced.offlineModeHint')}</p>
              </div>
            </div>
            {config.offlineMode && (
              <div className="space-y-2 ml-10">
                <label className="text-xs font-medium">{t('game.advanced.offlineModeScope')}</label>
                <Input
                  value={config.offlineModeScope}
                  onChange={(e) => updateConfig({ offlineModeScope: e.target.value })}
                  placeholder="e.g. Single-player only, Practice mode, Deck building"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <Switch
                checked={config.pwaSupport}
                onCheckedChange={(v) => updateConfig({ pwaSupport: v })}
              />
              <div>
                <label className="text-sm font-medium">{t('game.advanced.pwaSupport')}</label>
                <p className="text-xs text-muted-foreground">{t('game.advanced.pwaSupportHint')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(23)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setIsComplete(true)}>
            <Check className="mr-2 h-4 w-4" />
            {t('game.advanced.completeConfiguration')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
