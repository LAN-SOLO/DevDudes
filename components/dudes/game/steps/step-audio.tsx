'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import {
  MUSIC_STYLE_OPTIONS,
  SOUND_EFFECT_OPTIONS,
  VOICE_ACTING_OPTIONS,
} from '@/lib/game-pipeline/constants'
import { getAudioRecommendations } from '@/lib/game-pipeline/recommendations'

export function StepAudio() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const recs = getAudioRecommendations(config)

  const handleMusic = (value: string) => {
    updateConfig({ musicStyle: config.musicStyle === value ? '' : value })
  }

  const handleSfx = (value: string) => {
    const current = config.soundEffects
    if (current.includes(value)) {
      updateConfig({ soundEffects: current.filter((v) => v !== value) })
    } else {
      updateConfig({ soundEffects: [...current, value] })
    }
  }

  const handleVoice = (value: string) => {
    updateConfig({ voiceActing: config.voiceActing === value ? '' : value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.audio.title')}</CardTitle>
        <CardDescription>{t('game.audio.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.audio.musicLabel')}</h3>
          <OptionGrid
            options={MUSIC_STYLE_OPTIONS}
            selected={config.musicStyle}
            onSelect={handleMusic}
            mode="single"
            recommendations={recs.music}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.audio.sfxLabel')}</h3>
          <OptionGrid
            options={SOUND_EFFECT_OPTIONS}
            selected={config.soundEffects}
            onSelect={handleSfx}
            mode="multi"
            recommendations={recs.sfx}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.audio.voiceLabel')}</h3>
          <OptionGrid
            options={VOICE_ACTING_OPTIONS}
            selected={config.voiceActing}
            onSelect={handleVoice}
            mode="single"
            recommendations={recs.voice}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(12)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(14)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
