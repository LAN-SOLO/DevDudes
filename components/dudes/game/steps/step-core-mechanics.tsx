'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { CORE_MECHANICS_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepCoreMechanics() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const handleToggle = (value: string) => {
    const current = config.coreMechanics
    if (current.includes(value)) {
      updateConfig({ coreMechanics: current.filter((v) => v !== value) })
    } else if (current.length < 3) {
      updateConfig({ coreMechanics: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.coreMechanics.title')}</CardTitle>
        <CardDescription>{t('game.coreMechanics.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <OptionGrid
          options={CORE_MECHANICS_OPTIONS}
          selected={config.coreMechanics}
          onSelect={handleToggle}
          mode="multi"
          maxSelect={3}
        />

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(9)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(11)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
