'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { ACCESSIBILITY_FEATURE_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepAccessibility() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()
  const ac = config.accessibilityConfig
  const loc = config.localization

  const updateAC = (updates: Partial<typeof ac>) => {
    updateConfig({ accessibilityConfig: { ...ac, ...updates } })
  }
  const updateLoc = (updates: Partial<typeof loc>) => {
    updateConfig({ localization: { ...loc, ...updates } })
  }

  const handleToggleFeature = (value: string) => {
    const current = config.accessibilityFeatures
    if (current.includes(value)) {
      updateConfig({ accessibilityFeatures: current.filter((v) => v !== value) })
    } else {
      updateConfig({ accessibilityFeatures: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.accessibility.title')}</CardTitle>
        <CardDescription>{t('game.accessibility.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.accessibility.features')}</h4>
          <p className="text-xs text-muted-foreground">{t('game.accessibility.featuresHint')}</p>
          <OptionGrid
            options={ACCESSIBILITY_FEATURE_OPTIONS}
            selected={config.accessibilityFeatures}
            onSelect={handleToggleFeature}
            mode="multi"
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.accessibility.config')}</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Switch
                checked={ac.colorblindMode}
                onCheckedChange={(v) => updateAC({ colorblindMode: v })}
              />
              <label className="text-sm">{t('game.accessibility.colorblindMode')}</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={ac.screenReaderSupport}
                onCheckedChange={(v) => updateAC({ screenReaderSupport: v })}
              />
              <label className="text-sm">{t('game.accessibility.screenReaderSupport')}</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={ac.remappableControls}
                onCheckedChange={(v) => updateAC({ remappableControls: v })}
              />
              <label className="text-sm">{t('game.accessibility.remappableControls')}</label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={ac.highContrastMode}
                onCheckedChange={(v) => updateAC({ highContrastMode: v })}
              />
              <label className="text-sm">{t('game.accessibility.highContrastMode')}</label>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.accessibility.subtitleSize')}</label>
              <Input
                value={ac.subtitleSize}
                onChange={(e) => updateAC({ subtitleSize: e.target.value })}
                placeholder="e.g. small, medium, large"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.accessibility.localization')}</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.accessibility.defaultLanguage')}</label>
              <Input
                value={loc.defaultLanguage}
                onChange={(e) => updateLoc({ defaultLanguage: e.target.value })}
                placeholder="e.g. en"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.accessibility.launchLanguages')}</label>
              <Input
                value={loc.launchLanguages.join(', ')}
                onChange={(e) => updateLoc({ launchLanguages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="e.g. en, de, fr, es, ja"
              />
              <p className="text-xs text-muted-foreground">{t('game.accessibility.launchLanguagesHint')}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Switch
                checked={loc.rtlSupport}
                onCheckedChange={(v) => updateLoc({ rtlSupport: v })}
              />
              <label className="text-sm">{t('game.accessibility.rtlSupport')}</label>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.accessibility.textExpansionBuffer')}</label>
              <Input
                type="number"
                min={0}
                max={100}
                value={loc.textExpansionBuffer}
                onChange={(e) => updateLoc({ textExpansionBuffer: parseInt(e.target.value) || 30 })}
              />
              <p className="text-xs text-muted-foreground">{t('game.accessibility.textExpansionBufferHint')}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(21)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(23)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
