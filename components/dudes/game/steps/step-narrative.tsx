'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import {
  NARRATIVE_FOCUS_OPTIONS,
  STORY_STRUCTURE_OPTIONS,
  VICTORY_CONDITION_OPTIONS,
} from '@/lib/game-pipeline/constants'

export function StepNarrative() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const handleSelect = (field: 'narrativeFocus' | 'storyStructure' | 'victoryCondition', value: string) => {
    updateConfig({ [field]: config[field] === value ? '' : value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.narrative.title')}</CardTitle>
        <CardDescription>{t('game.narrative.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.narrative.focusLabel')}</h3>
          <OptionGrid
            options={NARRATIVE_FOCUS_OPTIONS}
            selected={config.narrativeFocus}
            onSelect={(v) => handleSelect('narrativeFocus', v)}
            mode="single"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.narrative.structureLabel')}</h3>
          <OptionGrid
            options={STORY_STRUCTURE_OPTIONS}
            selected={config.storyStructure}
            onSelect={(v) => handleSelect('storyStructure', v)}
            mode="single"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.narrative.victoryLabel')}</h3>
          <OptionGrid
            options={VICTORY_CONDITION_OPTIONS}
            selected={config.victoryCondition}
            onSelect={(v) => handleSelect('victoryCondition', v)}
            mode="single"
          />
        </div>

        {config.narrativeFocus && config.narrativeFocus !== 'none' && (
          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium">{t('game.narrative.loreTitle')}</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.narrative.worldDescription')}</label>
              <Textarea
                value={config.lore.worldDescription}
                onChange={(e) => updateConfig({ lore: { ...config.lore, worldDescription: e.target.value } })}
                placeholder={t('game.narrative.worldDescriptionPlaceholder')}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.narrative.factions')}</label>
              <Input
                value={config.lore.factions.join(', ')}
                onChange={(e) => updateConfig({ lore: { ...config.lore, factions: e.target.value.split(',').map(s => s.trim()).filter(Boolean) } })}
                placeholder={t('game.narrative.factionsPlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.narrative.flavorTextTone')}</label>
              <Select
                value={config.lore.flavorTextTone}
                onValueChange={(v) => updateConfig({ lore: { ...config.lore, flavorTextTone: v } })}
                options={[
                  { value: 'serious', label: 'Serious' },
                  { value: 'whimsical', label: 'Whimsical' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'humorous', label: 'Humorous' },
                  { value: 'neutral', label: 'Neutral' },
                ]}
                placeholder={t('game.narrative.flavorTextTonePlaceholder')}
              />
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(4)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
