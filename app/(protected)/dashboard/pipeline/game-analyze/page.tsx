'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, AlertTriangle, AlertCircle, Info, CheckCircle2, Loader2, ArrowRight, Lightbulb } from 'lucide-react'
import { analyzeGameConfig } from '@/lib/game-pipeline/analysis'
import type { GamePresetConfig, GameAnalysisReport } from '@/lib/game-pipeline/types'
import { defaultGamePresetConfig } from '@/lib/validations/game'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

function SeverityIcon({ severity }: { severity: string }) {
  switch (severity) {
    case 'error': return <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
    case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
    default: return <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
  }
}

function ComplexityMeter({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={cn(
              'h-6 w-2 rounded-sm',
              i < score
                ? score <= 3
                  ? 'bg-green-500'
                  : score <= 6
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                : 'bg-muted'
            )}
          />
        ))}
      </div>
      <span className="text-sm font-medium">{score}/10</span>
    </div>
  )
}

export default function GameAnalyzePage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')
  const [report, setReport] = useState<GameAnalysisReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!projectId) return

    async function loadAndAnalyze() {
      setLoading(true)
      setError(null)

      try {
        const supabase = createClient()
        const { data, error: dbError } = await supabase
          .from('projects')
          .select('preset_config')
          .eq('id', projectId)
          .single()

        if (dbError || !data) {
          setError('Failed to load project configuration')
          return
        }

        const presetConfig = data.preset_config as Record<string, unknown>
        if (presetConfig?.type !== 'game') {
          setError('This is not a game project')
          return
        }

        const { type: _, ...config } = presetConfig
        const mergedConfig: GamePresetConfig = {
          ...defaultGamePresetConfig,
          ...config,
          aiFreetext: {
            ...defaultGamePresetConfig.aiFreetext,
            ...(config.aiFreetext as Record<string, unknown> ?? {}),
          },
          multiplayer: {
            ...defaultGamePresetConfig.multiplayer,
            ...(config.multiplayer as Record<string, unknown> ?? {}),
          },
        }
        const analysisResult = analyzeGameConfig(mergedConfig)
        setReport(analysisResult)
      } catch {
        setError('Failed to analyze game configuration')
      } finally {
        setLoading(false)
      }
    }

    loadAndAnalyze()
  }, [projectId])

  if (!projectId) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('game.analyze.title')}</h2>
          <p className="text-muted-foreground">{t('game.analyze.description')}</p>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>{t('game.analyze.noProject')}</CardTitle>
            <CardDescription>{t('game.analyze.noProjectDesc')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('game.analyze.title')}</h2>
        <p className="text-muted-foreground">{t('game.analyze.description')}</p>
      </div>

      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-3 text-muted-foreground">{t('game.analyze.analyzing')}</span>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="py-8">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {report && (
        <>
          {/* Overview */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t('game.analyze.complexity')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplexityMeter score={report.complexityScore} />
                <p className="text-sm font-medium mt-1">{report.complexityLabel}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t('game.analyze.feasibility')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={
                    report.techFeasibility === 'high'
                      ? 'success'
                      : report.techFeasibility === 'medium'
                        ? 'warning'
                        : 'destructive'
                  }
                  className="text-sm"
                >
                  {report.techFeasibility === 'high' ? 'High' : report.techFeasibility === 'medium' ? 'Medium' : 'Low'}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t('game.analyze.scope')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">{report.scopeEstimate}</p>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('game.analyze.summaryTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{report.summary}</p>
            </CardContent>
          </Card>

          {/* Warnings */}
          {report.warnings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {t('game.analyze.warnings')} ({report.warnings.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {report.warnings.map((warning, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-start gap-3 rounded-lg border p-3',
                      warning.severity === 'error' && 'border-destructive/30 bg-destructive/5',
                      warning.severity === 'warning' && 'border-yellow-500/30 bg-yellow-500/5',
                      warning.severity === 'info' && 'border-blue-500/30 bg-blue-500/5',
                    )}
                  >
                    <SeverityIcon severity={warning.severity} />
                    <div>
                      <p className="text-sm">{warning.message}</p>
                      {warning.field && (
                        <Badge variant="outline" className="mt-1 text-[10px]">{warning.field}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Compatibility Issues */}
          {report.compatibilityIssues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  {t('game.analyze.compatibilityIssues')} ({report.compatibilityIssues.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {report.compatibilityIssues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-0.5">&#x2022;</span>
                    <p>{issue}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          {report.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  {t('game.analyze.suggestions')} ({report.suggestions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {report.suggestions.map((suggestion, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <p>{suggestion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Continue */}
          <div className="flex justify-end">
            <Button asChild>
              <a href={`/dashboard/pipeline/game-combo?project=${projectId}`}>
                {t('game.analyze.continueToGeneration')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
