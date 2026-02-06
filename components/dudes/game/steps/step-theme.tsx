'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { THEME_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepTheme() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const handleToggleTheme = (value: string) => {
    const current = config.themes
    if (current.includes(value)) {
      updateConfig({ themes: current.filter((v) => v !== value) })
    } else if (current.length < 3) {
      updateConfig({ themes: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.theme.title')}</CardTitle>
        <CardDescription>{t('game.theme.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OptionGrid
          options={THEME_OPTIONS}
          selected={config.themes}
          onSelect={handleToggleTheme}
          mode="multi"
          maxSelect={3}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('game.theme.customTheme')}</label>
          <Input
            value={config.customTheme}
            onChange={(e) => updateConfig({ customTheme: e.target.value })}
            placeholder={t('game.theme.customThemePlaceholder')}
            maxLength={100}
          />
          <p className="text-xs text-muted-foreground">
            {t('game.theme.customThemeHint')}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('game.theme.elevatorPitch')}</label>
          <Textarea
            value={config.elevatorPitch}
            onChange={(e) => updateConfig({ elevatorPitch: e.target.value })}
            placeholder={t('game.theme.elevatorPitchPlaceholder')}
            maxLength={500}
            rows={3}
          />
          <p className="text-xs text-muted-foreground text-right">
            {config.elevatorPitch.length}/500
          </p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(3)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
