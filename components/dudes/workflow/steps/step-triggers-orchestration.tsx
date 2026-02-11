'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import {
  TRIGGER_TYPE_OPTIONS,
  ORCHESTRATION_MODE_OPTIONS,
  RETRY_POLICY_OPTIONS,
} from '@/lib/workflow-pipeline/constants'
import { generateId } from '@/lib/validations/workflow'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'

export function StepTriggersOrchestration() {
  const { config, updateTriggers, updateOrchestration, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()

  const addTrigger = () => {
    updateTriggers({
      triggers: [
        ...config.triggers.triggers,
        { id: generateId(), type: 'manual', config: '', enabled: true },
      ],
    })
  }

  const removeTrigger = (id: string) => {
    updateTriggers({
      triggers: config.triggers.triggers.filter((tr) => tr.id !== id),
    })
  }

  const updateTriggerField = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    updateTriggers({
      triggers: config.triggers.triggers.map((tr) =>
        tr.id === id ? { ...tr, [field]: value } : tr
      ),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.triggers.title')}</CardTitle>
        <CardDescription>
          {t('workflow.triggers.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Triggers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{t('workflow.triggers.triggersLabel')}</Label>
            <Button variant="outline" size="sm" onClick={addTrigger}>
              <Plus className="mr-1 h-4 w-4" />
              {t('workflow.triggers.addTrigger')}
            </Button>
          </div>

          {config.triggers.triggers.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {t('workflow.triggers.noTriggers')}
            </p>
          )}

          {config.triggers.triggers.map((trigger) => (
            <div
              key={trigger.id}
              className="rounded-lg border p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={trigger.enabled}
                    onCheckedChange={(val) =>
                      updateTriggerField(trigger.id, 'enabled', val)
                    }
                  />
                  <span className="text-sm font-medium">
                    {trigger.enabled
                      ? t('workflow.triggers.enabled')
                      : t('workflow.triggers.disabled')}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTrigger(trigger.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>{t('workflow.triggers.type')}</Label>
                  <Select
                    value={trigger.type}
                    onValueChange={(val) =>
                      updateTriggerField(trigger.id, 'type', val)
                    }
                    options={TRIGGER_TYPE_OPTIONS.map((o) => ({
                      value: o.value,
                      label: o.label,
                    }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label>{t('workflow.triggers.config')}</Label>
                  <Input
                    placeholder={t('workflow.triggers.configPlaceholder')}
                    value={trigger.config}
                    onChange={(e) =>
                      updateTriggerField(trigger.id, 'config', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orchestration */}
        <div className="space-y-3">
          <Label className="text-base">{t('workflow.orchestration.title')}</Label>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>{t('workflow.orchestration.mode')}</Label>
              <Select
                value={config.orchestration.mode}
                onValueChange={(val) => updateOrchestration({ mode: val as typeof config.orchestration.mode })}
                options={ORCHESTRATION_MODE_OPTIONS.map((o) => ({
                  value: o.value,
                  label: o.label,
                }))}
              />
            </div>

            <div className="space-y-1">
              <Label>{t('workflow.orchestration.maxConcurrency')}</Label>
              <Input
                type="number"
                min={1}
                value={config.orchestration.maxConcurrency}
                onChange={(e) =>
                  updateOrchestration({ maxConcurrency: parseInt(e.target.value) || 1 })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="circuit-breaker">
                {t('workflow.orchestration.circuitBreaker')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('workflow.orchestration.circuitBreakerDesc')}
              </p>
            </div>
            <Switch
              id="circuit-breaker"
              checked={config.orchestration.circuitBreaker}
              onCheckedChange={(val) =>
                updateOrchestration({ circuitBreaker: val })
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>{t('workflow.orchestration.retryPolicy')}</Label>
              <Select
                value={config.orchestration.retryPolicy}
                onValueChange={(val) =>
                  updateOrchestration({ retryPolicy: val as typeof config.orchestration.retryPolicy })
                }
                options={RETRY_POLICY_OPTIONS.map((o) => ({
                  value: o.value,
                  label: o.label,
                }))}
              />
            </div>

            {config.orchestration.retryPolicy !== 'none' && (
              <div className="space-y-1">
                <Label>{t('workflow.orchestration.retryMax')}</Label>
                <Input
                  type="number"
                  min={0}
                  value={config.orchestration.retryMax}
                  onChange={(e) =>
                    updateOrchestration({ retryMax: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            )}
          </div>
        </div>

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
