'use client'

import { useState } from 'react'
import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'
import { QUEUE_PROVIDER_OPTIONS, CACHE_PROVIDER_OPTIONS, LOGGING_PROVIDER_OPTIONS } from '@/lib/preset-pipeline/constants'

export function StepRealtimeBackground() {
  const { config, updateRealtimeBackground, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()
  const [newJobName, setNewJobName] = useState('')

  const rb = config.realtimeBackground

  const addCronJob = () => {
    if (!newJobName.trim()) return
    const job = { id: crypto.randomUUID(), name: newJobName.trim(), schedule: '0 * * * *', description: '' }
    updateRealtimeBackground({ cronJobs: [...rb.cronJobs, job] })
    setNewJobName('')
  }

  const removeCronJob = (id: string) => {
    updateRealtimeBackground({ cronJobs: rb.cronJobs.filter((j) => j.id !== id) })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.realtimeBackground.title')}</CardTitle>
        <CardDescription>{t('preset.realtimeBackground.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Realtime toggles */}
        <div className="space-y-4">
          <p className="text-sm font-medium">{t('preset.realtimeBackground.realtime')}</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label>{t('preset.realtimeBackground.realtimeEnabled')}</Label>
              <Switch checked={rb.realtimeEnabled} onCheckedChange={(v) => updateRealtimeBackground({ realtimeEnabled: v })} />
            </div>
            {rb.realtimeEnabled && (
              <>
                <div className="flex items-center justify-between">
                  <Label>{t('preset.realtimeBackground.presence')}</Label>
                  <Switch checked={rb.presence} onCheckedChange={(v) => updateRealtimeBackground({ presence: v })} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>{t('preset.realtimeBackground.collaboration')}</Label>
                  <Switch checked={rb.collaboration} onCheckedChange={(v) => updateRealtimeBackground({ collaboration: v })} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Cron Jobs */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('preset.realtimeBackground.cronJobs')}</p>
          {rb.cronJobs.length > 0 && (
            <div className="space-y-2">
              {rb.cronJobs.map((job) => (
                <div key={job.id} className="flex items-center gap-2 rounded-lg border p-3">
                  <span className="text-sm font-medium flex-1">{job.name}</span>
                  <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{job.schedule}</code>
                  <button onClick={() => removeCronJob(job.id)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input placeholder={t('preset.realtimeBackground.addCronJob')} value={newJobName}
              onChange={(e) => setNewJobName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCronJob()} />
            <Button onClick={addCronJob}><Plus className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Queue Provider */}
        <div className="space-y-2">
          <Label>{t('preset.realtimeBackground.queueProvider')}</Label>
          <div className="grid grid-cols-3 gap-2">
            {QUEUE_PROVIDER_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateRealtimeBackground({ queueProvider: opt.value })}
                className={`rounded-lg border p-2 text-left text-sm transition-colors ${rb.queueProvider === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cache Provider */}
        <div className="space-y-2">
          <Label>{t('preset.realtimeBackground.cacheProvider')}</Label>
          <div className="grid grid-cols-2 gap-2">
            {CACHE_PROVIDER_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateRealtimeBackground({ cacheProvider: opt.value })}
                className={`rounded-lg border p-2 text-left text-sm transition-colors ${rb.cacheProvider === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Logging Provider */}
        <div className="space-y-2">
          <Label>{t('preset.realtimeBackground.loggingProvider')}</Label>
          <div className="grid grid-cols-3 gap-2">
            {LOGGING_PROVIDER_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateRealtimeBackground({ loggingProvider: opt.value })}
                className={`rounded-lg border p-2 text-left text-sm transition-colors ${rb.loggingProvider === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(13)}>
            <ArrowLeft className="mr-2 h-4 w-4" />{t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(15)}>
            {t('preset.common.continue')}<ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
