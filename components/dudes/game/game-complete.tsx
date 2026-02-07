'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGameWizard } from './game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Loader2, ArrowRight, Download, Edit, AlertCircle } from 'lucide-react'
import { saveGamePresetConfig } from '@/app/actions/game-pipeline'
import {
  THEME_OPTIONS,
  GENRE_OPTIONS,
  PLATFORM_OPTIONS,
  DIMENSION_OPTIONS,
  ART_STYLE_OPTIONS,
  CORE_MECHANICS_OPTIONS,
  ENGINE_OPTIONS,
  BUSINESS_MODEL_OPTIONS,
  isCardGame,
} from '@/lib/game-pipeline/constants'

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value
}

export function GameComplete() {
  const router = useRouter()
  const { config, setIsComplete, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSaveAndContinue = async () => {
    setIsSaving(true)
    setError(null)

    const result = await saveGamePresetConfig(null, config)

    if (result.error) {
      setError(result.error)
      setIsSaving(false)
      return
    }

    setIsSaving(false)
    router.push(`/dashboard/pipeline/game-analyze?project=${result.projectId}`)
  }

  const handleExportConfig = () => {
    const json = JSON.stringify(config, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'game-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleEdit = () => {
    setIsComplete(false)
    setCurrentStep(1)
  }

  const hasCardGame = isCardGame(config.genres)

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">{t('game.complete.title')}</CardTitle>
        <CardDescription>{t('game.complete.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">{t('game.complete.failedToSave')}</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="rounded-lg bg-muted p-4 space-y-3">
          {config.elevatorPitch && (
            <p className="text-sm italic">&ldquo;{config.elevatorPitch}&rdquo;</p>
          )}
          {config.tagline && (
            <p className="text-xs text-muted-foreground">{config.tagline}</p>
          )}

          <SummaryRow label={t('game.complete.themes')} values={config.themes.map((v) => findLabel(THEME_OPTIONS, v))} />
          <SummaryRow label={t('game.complete.genres')} values={config.genres.map((v) => findLabel(GENRE_OPTIONS, v))} />
          <SummaryRow label={t('game.complete.platforms')} values={config.platforms.map((v) => findLabel(PLATFORM_OPTIONS, v))} />

          <div className="border-t pt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">{t('game.complete.visual')}</p>
              <p className="text-sm">
                {config.dimension ? findLabel(DIMENSION_OPTIONS, config.dimension) : '—'}
                {config.artStyle ? ` / ${findLabel(ART_STYLE_OPTIONS, config.artStyle)}` : ''}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('game.complete.engine')}</p>
              <p className="text-sm">{config.engine ? findLabel(ENGINE_OPTIONS, config.engine) : '—'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('game.complete.business')}</p>
              <p className="text-sm">{config.businessModel ? findLabel(BUSINESS_MODEL_OPTIONS, config.businessModel) : '—'}</p>
            </div>
          </div>

          <SummaryRow label={t('game.complete.coreMechanics')} values={config.coreMechanics.map((v) => findLabel(CORE_MECHANICS_OPTIONS, v))} />

          {/* V2 summary additions */}
          {hasCardGame && (
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-1">{t('game.complete.cardSystem')}</p>
              <p className="text-sm">
                {config.cardSystem.totalCards} cards, {config.cardSystem.cardTypes.length} types, {config.cardSystem.rarityDistribution.length} rarities
              </p>
            </div>
          )}

          {config.socialFeatures.length > 0 && (
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-1">{t('game.complete.socialFeatures')}</p>
              <p className="text-sm">{config.socialFeatures.length} features configured</p>
            </div>
          )}

          {config.accessibilityFeatures.length > 0 && (
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-1">{t('game.complete.accessibilityFeatures')}</p>
              <p className="text-sm">{config.accessibilityFeatures.length} features enabled</p>
            </div>
          )}

          {config.contentPlan.mvpTimeline && (
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-1">{t('game.complete.contentPlan')}</p>
              <p className="text-sm">MVP: {config.contentPlan.mvpTimeline}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSaveAndContinue}
            disabled={isSaving}
            className="flex-1"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('game.complete.saving')}
              </>
            ) : (
              <>
                {t('game.complete.continueToAI')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleExportConfig}>
            <Download className="mr-2 h-4 w-4" />
            {t('game.complete.exportConfig')}
          </Button>
          <Button variant="ghost" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            {t('game.complete.edit')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SummaryRow({ label, values }: { label: string; values: string[] }) {
  if (values.length === 0) return null
  return (
    <div className="border-t pt-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex flex-wrap gap-1">
        {values.map((v) => (
          <Badge key={v} variant="secondary" className="text-xs">{v}</Badge>
        ))}
      </div>
    </div>
  )
}
