'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import {
  ENGINE_OPTIONS,
  TARGET_FPS_OPTIONS,
  ADDITIONAL_TECH_OPTIONS,
} from '@/lib/game-pipeline/constants'
import { getEngineRecommendations } from '@/lib/game-pipeline/recommendations'

export function StepEngine() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const recs = getEngineRecommendations(config)

  const handleEngine = (value: string) => {
    updateConfig({ engine: config.engine === value ? '' : value })
  }

  const handleFps = (value: string) => {
    updateConfig({ targetFps: config.targetFps === value ? '' : value })
  }

  const handleTech = (value: string) => {
    const current = config.additionalTech
    if (current.includes(value)) {
      updateConfig({ additionalTech: current.filter((v) => v !== value) })
    } else {
      updateConfig({ additionalTech: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.engine.title')}</CardTitle>
        <CardDescription>{t('game.engine.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.engine.engineLabel')}</h3>
          <OptionGrid
            options={ENGINE_OPTIONS}
            selected={config.engine}
            onSelect={handleEngine}
            mode="single"
            recommendations={recs.engine}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.engine.fpsLabel')}</h3>
          <OptionGrid
            options={TARGET_FPS_OPTIONS}
            selected={config.targetFps}
            onSelect={handleFps}
            mode="single"
            recommendations={recs.fps}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.engine.techLabel')}</h3>
          <OptionGrid
            options={ADDITIONAL_TECH_OPTIONS}
            selected={config.additionalTech}
            onSelect={handleTech}
            mode="multi"
            recommendations={recs.tech}
          />
        </div>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronDown className="h-4 w-4" />
              {t('game.engine.advancedTitle')}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6 pt-4">
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <h4 className="text-sm font-medium">{t('game.engine.constraintsTitle')}</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {(['minRAM', 'minGPU', 'minCPU', 'storageSize', 'networkBandwidth', 'maxLoadTime', 'targetResolution'] as const).map((field) => (
                  <div key={field} className="space-y-1">
                    <label className="text-xs font-medium">{t(`game.engine.constraints.${field}`)}</label>
                    <Input
                      value={config.technicalConstraints[field]}
                      onChange={(e) => updateConfig({ technicalConstraints: { ...config.technicalConstraints, [field]: e.target.value } })}
                      placeholder={t(`game.engine.constraints.${field}Placeholder`)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <h4 className="text-sm font-medium">{t('game.engine.budgetsTitle')}</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {(['drawCalls', 'triangleCount', 'textureMemory', 'audioChannels'] as const).map((field) => (
                  <div key={field} className="space-y-1">
                    <label className="text-xs font-medium">{t(`game.engine.budgets.${field}`)}</label>
                    <Input
                      value={config.performanceBudgets[field]}
                      onChange={(e) => updateConfig({ performanceBudgets: { ...config.performanceBudgets, [field]: e.target.value } })}
                      placeholder={t(`game.engine.budgets.${field}Placeholder`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(13)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(15)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
