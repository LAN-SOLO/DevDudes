'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { TUTORIAL_STYLE_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepAudience() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()
  const ta = config.targetAudience
  const ux = config.uxPrinciples

  const updateTA = (updates: Partial<typeof ta>) => {
    updateConfig({ targetAudience: { ...ta, ...updates } })
  }
  const updateUX = (updates: Partial<typeof ux>) => {
    updateConfig({ uxPrinciples: { ...ux, ...updates } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.audience.title')}</CardTitle>
        <CardDescription>{t('game.audience.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.audience.targetAudience')}</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.audience.ageRange')}</label>
              <Input
                value={ta.ageRange}
                onChange={(e) => updateTA({ ageRange: e.target.value })}
                placeholder="e.g. 13+, 18+, All ages"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.audience.demographic')}</label>
              <Input
                value={ta.demographic}
                onChange={(e) => updateTA({ demographic: e.target.value })}
                placeholder="e.g. Casual gamers, Hardcore TCG players"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.audience.sessionLength')}</label>
              <Input
                value={ta.sessionLength}
                onChange={(e) => updateTA({ sessionLength: e.target.value })}
                placeholder="e.g. 5-10 minutes, 30-60 minutes"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.audience.experienceLevel')}</label>
              <Input
                value={ta.experienceLevel}
                onChange={(e) => updateTA({ experienceLevel: e.target.value })}
                placeholder="e.g. Beginner-friendly, Expert-level"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.audience.tutorialStyle')}</h4>
          <p className="text-xs text-muted-foreground">{t('game.audience.tutorialStyleHint')}</p>
          <OptionGrid
            options={TUTORIAL_STYLE_OPTIONS}
            selected={config.tutorialStyle ? [config.tutorialStyle] : []}
            onSelect={(v) => updateConfig({ tutorialStyle: v })}
            mode="single"
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.audience.onboarding')}</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Switch
                checked={config.onboarding.skipAllowed}
                onCheckedChange={(v) => updateConfig({ onboarding: { ...config.onboarding, skipAllowed: v } })}
              />
              <label className="text-sm">{t('game.audience.skipAllowed')}</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={config.onboarding.progressiveDisclosure}
                onCheckedChange={(v) => updateConfig({ onboarding: { ...config.onboarding, progressiveDisclosure: v } })}
              />
              <label className="text-sm">{t('game.audience.progressiveDisclosure')}</label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.audience.uxPrinciples')}</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.audience.maxClicksToAction')}</label>
              <Input
                type="number"
                min={1}
                max={20}
                value={ux.maxClicksToAction}
                onChange={(e) => updateUX({ maxClicksToAction: parseInt(e.target.value) || 3 })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.audience.maxLoadTime')}</label>
              <Input
                type="number"
                min={0}
                max={30}
                value={ux.maxLoadTime}
                onChange={(e) => updateUX({ maxLoadTime: parseFloat(e.target.value) || 3 })}
              />
              <p className="text-xs text-muted-foreground">{t('game.audience.maxLoadTimeHint')}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Switch
                checked={ux.offlineFallback}
                onCheckedChange={(v) => updateUX({ offlineFallback: v })}
              />
              <label className="text-sm">{t('game.audience.offlineFallback')}</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={ux.undoSupport}
                onCheckedChange={(v) => updateUX({ undoSupport: v })}
              />
              <label className="text-sm">{t('game.audience.undoSupport')}</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={ux.autoSuggest}
                onCheckedChange={(v) => updateUX({ autoSuggest: v })}
              />
              <label className="text-sm">{t('game.audience.autoSuggest')}</label>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(19)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(21)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
