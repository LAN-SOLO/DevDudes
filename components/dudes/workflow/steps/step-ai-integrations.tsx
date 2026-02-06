'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight, Workflow, Brain, Sparkles, Cpu, Zap } from 'lucide-react'
import type { AIIntegration } from '@/lib/validations/workflow'

const providerIcons: Record<AIIntegration['provider'], typeof Brain> = {
  n8n: Workflow,
  openai: Sparkles,
  claude: Brain,
  mistral: Cpu,
  deepseek: Zap,
}

const providerLabels: Record<AIIntegration['provider'], string> = {
  n8n: 'n8n',
  openai: 'OpenAI',
  claude: 'Claude',
  mistral: 'Mistral',
  deepseek: 'DeepSeek',
}

const modeOptions = [
  { value: 'service', label: 'Cloud Service' },
  { value: 'local', label: 'Local Deployment' },
  { value: 'both', label: 'Both' },
]

export function StepAIIntegrations() {
  const { config, updateConfig, setCurrentStep } = useWorkflowWizard()
  const { t } = useTranslation()

  const updateIntegration = (
    provider: AIIntegration['provider'],
    updates: Partial<AIIntegration>
  ) => {
    const updated = config.aiIntegrations.map((integration) =>
      integration.provider === provider
        ? { ...integration, ...updates }
        : integration
    )
    updateConfig({ aiIntegrations: updated })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.ai.title')}</CardTitle>
        <CardDescription>
          {t('workflow.ai.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {config.aiIntegrations.map((integration) => {
          const Icon = providerIcons[integration.provider]
          return (
            <div
              key={integration.provider}
              className={`rounded-lg border p-4 transition-colors ${
                integration.enabled ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{providerLabels[integration.provider]}</span>
                </div>
                <Switch
                  checked={integration.enabled}
                  onCheckedChange={(enabled) =>
                    updateIntegration(integration.provider, { enabled })
                  }
                />
              </div>

              {integration.enabled && (
                <div className="space-y-3 pt-3 border-t">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>{t('workflow.ai.mode')}</Label>
                      <Select
                        value={integration.mode}
                        onValueChange={(value) =>
                          updateIntegration(integration.provider, {
                            mode: value as AIIntegration['mode'],
                          })
                        }
                        options={modeOptions}
                      />
                    </div>

                    {(integration.mode === 'local' || integration.mode === 'both') && (
                      <div className="space-y-2">
                        <Label>{t('workflow.ai.endpoint')}</Label>
                        <Input
                          placeholder={t('workflow.ai.endpointPlaceholder')}
                          value={integration.config.endpoint || ''}
                          onChange={(e) =>
                            updateIntegration(integration.provider, {
                              config: { ...integration.config, endpoint: e.target.value },
                            })
                          }
                        />
                      </div>
                    )}
                  </div>

                  {integration.provider !== 'n8n' && (
                    <div className="space-y-2">
                      <Label>{t('workflow.ai.model')}</Label>
                      <Input
                        placeholder={t('workflow.ai.modelPlaceholder')}
                        value={integration.config.model || ''}
                        onChange={(e) =>
                          updateIntegration(integration.provider, {
                            config: { ...integration.config, model: e.target.value },
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setCurrentStep(4)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(6)}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
