'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Upload, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const IMPORT_MODES = [
  { value: 'full' as const, label: 'Full Import', description: 'Import everything including config and assets' },
  { value: 'config-only' as const, label: 'Config Only', description: 'Import configuration settings only' },
  { value: 'assets-only' as const, label: 'Assets Only', description: 'Import asset references only' },
]

export function StepImport() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const handleStartFresh = () => {
    updateConfig({ importedProjectId: null, importMode: '' })
    setCurrentStep(2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.import.title')}</CardTitle>
        <CardDescription>{t('game.import.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleStartFresh}
            className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
          >
            <div className="rounded-full bg-primary/10 p-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{t('game.import.startFresh')}</p>
              <p className="text-sm text-muted-foreground">
                {t('game.import.startFreshDesc')}
              </p>
            </div>
          </button>

          <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed p-8 text-center">
            <div className="rounded-full bg-muted p-4">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">{t('game.import.importProject')}</p>
              <p className="text-sm text-muted-foreground">
                {t('game.import.importProjectDesc')}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {IMPORT_MODES.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  disabled
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-xs transition-colors cursor-not-allowed opacity-50',
                    config.importMode === mode.value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border text-muted-foreground'
                  )}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <Badge variant="secondary" className="text-[10px]">{t('common.comingSoon')}</Badge>
          </div>
        </div>

        {config.importedProjectId === null && (
          <div className="flex justify-end">
            <Button onClick={() => setCurrentStep(2)}>
              {t('game.common.next')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
