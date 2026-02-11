'use client'

import { useState } from 'react'
import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'
import {
  LOG_LEVEL_OPTIONS,
  LOGGING_PROVIDER_OPTIONS,
  MONITORING_PROVIDER_OPTIONS,
} from '@/lib/workflow-pipeline/constants'

export function StepLoggingMonitoring() {
  const { config, updateLogging, updateMonitoring, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const [newAlertChannel, setNewAlertChannel] = useState('')

  const logging = config.logging
  const monitoring = config.monitoring

  // ── Alert Channels (chip builder) ──────────────────────────────
  const addAlertChannel = () => {
    if (!newAlertChannel.trim()) return
    if (monitoring.alertChannels.includes(newAlertChannel.trim())) return
    updateMonitoring({ alertChannels: [...monitoring.alertChannels, newAlertChannel.trim()] })
    setNewAlertChannel('')
  }

  const removeAlertChannel = (channel: string) => {
    updateMonitoring({ alertChannels: monitoring.alertChannels.filter((c) => c !== channel) })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.loggingMonitoring.title')}</CardTitle>
        <CardDescription>{t('workflow.loggingMonitoring.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Logging Section */}
        <div className="space-y-4">
          <p className="text-sm font-medium">{t('workflow.loggingMonitoring.logging')}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t('workflow.loggingMonitoring.logLevel')}</Label>
              <Select
                value={logging.level}
                onValueChange={(val) => updateLogging({ level: val as typeof logging.level })}
                options={LOG_LEVEL_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('workflow.loggingMonitoring.logProvider')}</Label>
              <Select
                value={logging.provider}
                onValueChange={(val) => updateLogging({ provider: val as typeof logging.provider })}
                options={LOGGING_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="structured-toggle" className="text-base">{t('workflow.loggingMonitoring.structured')}</Label>
              <p className="text-sm text-muted-foreground">{t('workflow.loggingMonitoring.structuredDesc')}</p>
            </div>
            <Switch
              id="structured-toggle"
              checked={logging.structured}
              onCheckedChange={(checked) => updateLogging({ structured: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('workflow.loggingMonitoring.retentionDays')}</Label>
            <Input
              type="number"
              value={logging.retentionDays}
              onChange={(e) => updateLogging({ retentionDays: parseInt(e.target.value) || 1 })}
              placeholder="30"
            />
          </div>
        </div>

        {/* Monitoring Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="monitoring-toggle" className="text-base">{t('workflow.loggingMonitoring.enableMonitoring')}</Label>
              <p className="text-sm text-muted-foreground">{t('workflow.loggingMonitoring.enableMonitoringDesc')}</p>
            </div>
            <Switch
              id="monitoring-toggle"
              checked={monitoring.enabled}
              onCheckedChange={(checked) => updateMonitoring({ enabled: checked })}
            />
          </div>

          {monitoring.enabled && (
            <>
              <div className="space-y-2">
                <Label>{t('workflow.loggingMonitoring.monitoringProvider')}</Label>
                <Select
                  value={monitoring.provider}
                  onValueChange={(val) => updateMonitoring({ provider: val as typeof monitoring.provider })}
                  options={MONITORING_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="metrics-toggle">{t('workflow.loggingMonitoring.metrics')}</Label>
                    <p className="text-xs text-muted-foreground">{t('workflow.loggingMonitoring.metricsDesc')}</p>
                  </div>
                  <Switch
                    id="metrics-toggle"
                    checked={monitoring.metrics}
                    onCheckedChange={(checked) => updateMonitoring({ metrics: checked })}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="tracing-toggle">{t('workflow.loggingMonitoring.tracing')}</Label>
                    <p className="text-xs text-muted-foreground">{t('workflow.loggingMonitoring.tracingDesc')}</p>
                  </div>
                  <Switch
                    id="tracing-toggle"
                    checked={monitoring.tracing}
                    onCheckedChange={(checked) => updateMonitoring({ tracing: checked })}
                  />
                </div>
              </div>

              {/* Health Checks */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="health-toggle">{t('workflow.loggingMonitoring.healthChecks')}</Label>
                  <p className="text-xs text-muted-foreground">{t('workflow.loggingMonitoring.healthChecksDesc')}</p>
                </div>
                <Switch
                  id="health-toggle"
                  checked={monitoring.healthChecks}
                  onCheckedChange={(checked) => updateMonitoring({ healthChecks: checked })}
                />
              </div>

              {monitoring.healthChecks && (
                <div className="space-y-2">
                  <Label>{t('workflow.loggingMonitoring.healthCheckInterval')}</Label>
                  <Input
                    type="number"
                    value={monitoring.healthCheckInterval}
                    onChange={(e) => updateMonitoring({ healthCheckInterval: parseInt(e.target.value) || 1 })}
                    placeholder="30"
                  />
                </div>
              )}

              {/* Alerting */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="alerting-toggle">{t('workflow.loggingMonitoring.alerting')}</Label>
                  <p className="text-xs text-muted-foreground">{t('workflow.loggingMonitoring.alertingDesc')}</p>
                </div>
                <Switch
                  id="alerting-toggle"
                  checked={monitoring.alerting}
                  onCheckedChange={(checked) => updateMonitoring({ alerting: checked })}
                />
              </div>

              {monitoring.alerting && (
                <div className="space-y-2">
                  <Label>{t('workflow.loggingMonitoring.alertChannels')}</Label>
                  <div className="flex flex-wrap gap-2">
                    {monitoring.alertChannels.map((channel) => (
                      <span
                        key={channel}
                        className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                      >
                        {channel}
                        <button onClick={() => removeAlertChannel(channel)} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder={t('workflow.loggingMonitoring.alertChannelPlaceholder')}
                      value={newAlertChannel}
                      onChange={(e) => setNewAlertChannel(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addAlertChannel()}
                    />
                    <Button onClick={addAlertChannel}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={nextStep}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
