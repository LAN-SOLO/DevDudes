'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { Plus, X } from 'lucide-react'
import { generateId } from '@/lib/validations/workflow'
import {
  AI_PROVIDER_OPTIONS,
  AI_MODE_OPTIONS,
  RAG_PROVIDER_OPTIONS,
} from '@/lib/workflow-pipeline/constants'
import type { WorkflowConfigV2 } from '@/lib/workflow-pipeline/types'

type AiProvider = WorkflowConfigV2['aiIntegrations']['providers'][number]

export function StepAIIntegrations() {
  const { config, updateAiIntegrations, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const ai = config.aiIntegrations

  const addProvider = () => {
    updateAiIntegrations({
      providers: [...ai.providers, {
        id: generateId(),
        provider: 'openai',
        enabled: true,
        model: '',
        mode: 'service',
        endpoint: '',
      }],
    })
  }

  const removeProvider = (id: string) => {
    updateAiIntegrations({ providers: ai.providers.filter((p) => p.id !== id) })
  }

  const updateProvider = (id: string, updates: Partial<AiProvider>) => {
    updateAiIntegrations({
      providers: ai.providers.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.ai.title')}</CardTitle>
        <CardDescription>{t('workflow.ai.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Providers */}
        <div className="space-y-3">
          {ai.providers.map((provider) => (
            <div
              key={provider.id}
              className={`rounded-lg border p-4 transition-colors ${provider.enabled ? 'border-primary bg-primary/5' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Select
                    value={provider.provider}
                    onValueChange={(v) => updateProvider(provider.id, { provider: v as AiProvider['provider'] })}
                    options={AI_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={provider.enabled}
                    onCheckedChange={(enabled) => updateProvider(provider.id, { enabled })}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeProvider(provider.id)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {provider.enabled && (
                <div className="space-y-3 pt-3 border-t">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>{t('workflow.ai.mode')}</Label>
                      <Select
                        value={provider.mode}
                        onValueChange={(v) => updateProvider(provider.id, { mode: v as AiProvider['mode'] })}
                        options={AI_MODE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                      />
                    </div>
                    {provider.provider !== 'n8n' && (
                      <div className="space-y-2">
                        <Label>{t('workflow.ai.model')}</Label>
                        <Input
                          placeholder={t('workflow.ai.modelPlaceholder')}
                          value={provider.model}
                          onChange={(e) => updateProvider(provider.id, { model: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                  {(provider.mode === 'local' || provider.mode === 'both') && (
                    <div className="space-y-2">
                      <Label>{t('workflow.ai.endpoint')}</Label>
                      <Input
                        placeholder={t('workflow.ai.endpointPlaceholder')}
                        value={provider.endpoint}
                        onChange={(e) => updateProvider(provider.id, { endpoint: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <Button variant="outline" onClick={addProvider} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            {t('workflow.ai.addProvider')}
          </Button>
        </div>

        {/* RAG */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t('workflow.ai.rag')}</p>
              <p className="text-xs text-muted-foreground">{t('workflow.ai.ragDesc')}</p>
            </div>
            <Switch checked={ai.rag} onCheckedChange={(rag) => updateAiIntegrations({ rag })} />
          </div>
          {ai.rag && (
            <Select
              value={ai.ragProvider}
              onValueChange={(ragProvider) => updateAiIntegrations({ ragProvider })}
              options={RAG_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          )}
        </div>

        {/* Guardrails */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm font-medium">{t('workflow.ai.guardrails')}</p>
            <p className="text-xs text-muted-foreground">{t('workflow.ai.guardrailsDesc')}</p>
          </div>
          <Switch checked={ai.guardrails} onCheckedChange={(guardrails) => updateAiIntegrations({ guardrails })} />
        </div>

        {/* Cost Tracking */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm font-medium">{t('workflow.ai.costTracking')}</p>
            <p className="text-xs text-muted-foreground">{t('workflow.ai.costTrackingDesc')}</p>
          </div>
          <Switch checked={ai.costTracking} onCheckedChange={(costTracking) => updateAiIntegrations({ costTracking })} />
        </div>

        {/* Fallback */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm font-medium">{t('workflow.ai.fallback')}</p>
            <p className="text-xs text-muted-foreground">{t('workflow.ai.fallbackDesc')}</p>
          </div>
          <Switch checked={ai.fallbackEnabled} onCheckedChange={(fallbackEnabled) => updateAiIntegrations({ fallbackEnabled })} />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevStep}>
            {t('workflow.common.back')}
          </Button>
          <Button onClick={nextStep}>
            {t('workflow.common.continue')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
