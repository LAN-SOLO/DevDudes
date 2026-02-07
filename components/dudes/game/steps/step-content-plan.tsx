'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function StepContentPlan() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()
  const cp = config.contentPlan
  const an = config.analytics

  const updateCP = (updates: Partial<typeof cp>) => {
    updateConfig({ contentPlan: { ...cp, ...updates } })
  }
  const updateAN = (updates: Partial<typeof an>) => {
    updateConfig({ analytics: { ...an, ...updates } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.contentPlan.title')}</CardTitle>
        <CardDescription>{t('game.contentPlan.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-3">
            <h4 className="text-sm font-medium">{t('game.contentPlan.mvp')}</h4>
            <p className="text-xs text-muted-foreground">{t('game.contentPlan.mvpHint')}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.contentPlan.features')}</label>
                <Input
                  value={cp.mvpFeatures.join(', ')}
                  onChange={(e) => updateCP({ mvpFeatures: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="e.g. Core gameplay, Basic UI, 10 cards"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.contentPlan.timeline')}</label>
                <Input
                  value={cp.mvpTimeline}
                  onChange={(e) => updateCP({ mvpTimeline: e.target.value })}
                  placeholder="e.g. 2 months"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-3">
            <h4 className="text-sm font-medium">{t('game.contentPlan.softLaunch')}</h4>
            <p className="text-xs text-muted-foreground">{t('game.contentPlan.softLaunchHint')}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.contentPlan.features')}</label>
                <Input
                  value={cp.softLaunchFeatures.join(', ')}
                  onChange={(e) => updateCP({ softLaunchFeatures: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="e.g. Matchmaking, Ranked mode, 50 cards"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.contentPlan.timeline')}</label>
                <Input
                  value={cp.softLaunchTimeline}
                  onChange={(e) => updateCP({ softLaunchTimeline: e.target.value })}
                  placeholder="e.g. 4 months"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-3">
            <h4 className="text-sm font-medium">{t('game.contentPlan.fullLaunch')}</h4>
            <p className="text-xs text-muted-foreground">{t('game.contentPlan.fullLaunchHint')}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.contentPlan.features')}</label>
                <Input
                  value={cp.fullLaunchFeatures.join(', ')}
                  onChange={(e) => updateCP({ fullLaunchFeatures: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="e.g. All features, 200+ cards, Tournaments"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.contentPlan.timeline')}</label>
                <Input
                  value={cp.fullLaunchTimeline}
                  onChange={(e) => updateCP({ fullLaunchTimeline: e.target.value })}
                  placeholder="e.g. 8 months"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-3">
            <h4 className="text-sm font-medium">{t('game.contentPlan.postLaunch')}</h4>
            <p className="text-xs text-muted-foreground">{t('game.contentPlan.postLaunchHint')}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.contentPlan.features')}</label>
                <Input
                  value={cp.postLaunchFeatures.join(', ')}
                  onChange={(e) => updateCP({ postLaunchFeatures: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="e.g. Expansions, Seasonal events, New modes"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.contentPlan.timeline')}</label>
                <Input
                  value={cp.postLaunchTimeline}
                  onChange={(e) => updateCP({ postLaunchTimeline: e.target.value })}
                  placeholder="e.g. Ongoing quarterly"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.contentPlan.analytics')}</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.contentPlan.trackingPlatform')}</label>
              <Input
                value={an.trackingPlatform}
                onChange={(e) => updateAN({ trackingPlatform: e.target.value })}
                placeholder="e.g. Mixpanel, Amplitude, Firebase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.contentPlan.keyMetrics')}</label>
              <Input
                value={an.keyMetrics.join(', ')}
                onChange={(e) => updateAN({ keyMetrics: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="e.g. DAU, Retention D1/D7/D30, ARPU"
              />
              <p className="text-xs text-muted-foreground">{t('game.contentPlan.keyMetricsHint')}</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.contentPlan.privacyCompliance')}</label>
              <Input
                value={an.privacyCompliance}
                onChange={(e) => updateAN({ privacyCompliance: e.target.value })}
                placeholder="e.g. GDPR, COPPA, CCPA"
              />
            </div>
            <div className="flex items-center gap-3 pt-5">
              <Switch
                checked={an.abTesting}
                onCheckedChange={(v) => updateAN({ abTesting: v })}
              />
              <label className="text-sm font-medium">{t('game.contentPlan.abTesting')}</label>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(22)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(24)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
