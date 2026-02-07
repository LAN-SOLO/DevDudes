'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { SOCIAL_FEATURE_OPTIONS, RETENTION_MECHANIC_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepSocial() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()
  const sc = config.socialConfig

  const updateSC = (updates: Partial<typeof sc>) => {
    updateConfig({ socialConfig: { ...sc, ...updates } })
  }

  const handleToggleSocial = (value: string) => {
    const current = config.socialFeatures
    if (current.includes(value)) {
      updateConfig({ socialFeatures: current.filter((v) => v !== value) })
    } else {
      updateConfig({ socialFeatures: [...current, value] })
    }
  }

  const handleToggleRetention = (value: string) => {
    const current = config.retentionMechanics
    if (current.includes(value)) {
      updateConfig({ retentionMechanics: current.filter((v) => v !== value) })
    } else {
      updateConfig({ retentionMechanics: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.social.title')}</CardTitle>
        <CardDescription>{t('game.social.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.social.socialFeatures')}</h4>
          <p className="text-xs text-muted-foreground">{t('game.social.socialFeaturesHint')}</p>
          <OptionGrid
            options={SOCIAL_FEATURE_OPTIONS}
            selected={config.socialFeatures}
            onSelect={handleToggleSocial}
            mode="multi"
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.social.retentionMechanics')}</h4>
          <p className="text-xs text-muted-foreground">{t('game.social.retentionMechanicsHint')}</p>
          <OptionGrid
            options={RETENTION_MECHANIC_OPTIONS}
            selected={config.retentionMechanics}
            onSelect={handleToggleRetention}
            mode="multi"
          />
        </div>

        <Collapsible className="rounded-lg border">
          <CollapsibleTrigger className="px-4 py-3 text-sm font-medium hover:bg-muted/50 rounded-t-lg">
            {t('game.social.socialConfig')}
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4">
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <Switch
                  checked={sc.emotes}
                  onCheckedChange={(v) => updateSC({ emotes: v })}
                />
                <div>
                  <label className="text-sm font-medium">{t('game.social.emotes')}</label>
                  <p className="text-xs text-muted-foreground">{t('game.social.emotesHint')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={sc.tournaments}
                  onCheckedChange={(v) => updateSC({ tournaments: v })}
                />
                <div>
                  <label className="text-sm font-medium">{t('game.social.tournaments')}</label>
                  <p className="text-xs text-muted-foreground">{t('game.social.tournamentsHint')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={sc.replaySharing}
                  onCheckedChange={(v) => updateSC({ replaySharing: v })}
                />
                <div>
                  <label className="text-sm font-medium">{t('game.social.replaySharing')}</label>
                  <p className="text-xs text-muted-foreground">{t('game.social.replaySharingHint')}</p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(20)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(22)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
