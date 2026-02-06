'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { PLATFORM_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepPlatform() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const handleToggle = (value: string) => {
    const current = config.platforms
    if (current.includes(value)) {
      const updated = current.filter((v) => v !== value)
      updateConfig({
        platforms: updated,
        primaryPlatform: config.primaryPlatform === value ? (updated[0] ?? '') : config.primaryPlatform,
      })
    } else {
      const updated = [...current, value]
      updateConfig({
        platforms: updated,
        primaryPlatform: config.primaryPlatform || value,
      })
    }
  }

  const primaryOptions = config.platforms.map((p) => {
    const opt = PLATFORM_OPTIONS.find((o) => o.value === p)
    return { value: p, label: opt?.label ?? p }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.platform.title')}</CardTitle>
        <CardDescription>{t('game.platform.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OptionGrid
          options={PLATFORM_OPTIONS}
          selected={config.platforms}
          onSelect={handleToggle}
          mode="multi"
        />

        {config.platforms.length > 1 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('game.platform.primaryLabel')}</label>
            <Select
              value={config.primaryPlatform}
              onValueChange={(v) => updateConfig({ primaryPlatform: v })}
              options={primaryOptions}
              placeholder={t('game.platform.primaryPlaceholder')}
            />
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(4)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(6)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
