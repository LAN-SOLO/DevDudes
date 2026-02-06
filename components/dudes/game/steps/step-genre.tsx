'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { GENRE_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepGenre() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const handleToggle = (value: string) => {
    const current = config.genres
    if (current.includes(value)) {
      updateConfig({ genres: current.filter((v) => v !== value) })
    } else {
      updateConfig({ genres: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.genre.title')}</CardTitle>
        <CardDescription>{t('game.genre.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OptionGrid
          options={GENRE_OPTIONS}
          selected={config.genres}
          onSelect={handleToggle}
          mode="multi"
        />

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(3)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(5)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
