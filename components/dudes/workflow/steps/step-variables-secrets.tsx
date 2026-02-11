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
import {
  VARIABLE_SCOPE_OPTIONS,
  SECRETS_PROVIDER_OPTIONS,
} from '@/lib/workflow-pipeline/constants'
import { generateId } from '@/lib/validations/workflow'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'

export function StepVariablesSecrets() {
  const { config, updateVariables, updateSecrets, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const [newSecretKey, setNewSecretKey] = useState('')

  // Variables
  const addVariable = () => {
    updateVariables({
      variables: [
        ...config.variables.variables,
        { id: generateId(), key: '', value: '', scope: 'global' },
      ],
    })
  }

  const removeVariable = (id: string) => {
    updateVariables({
      variables: config.variables.variables.filter((v) => v.id !== id),
    })
  }

  const updateVariableField = (
    id: string,
    field: string,
    value: string
  ) => {
    updateVariables({
      variables: config.variables.variables.map((v) =>
        v.id === id ? { ...v, [field]: value } : v
      ),
    })
  }

  // Secret keys
  const addSecretKey = () => {
    const key = newSecretKey.trim()
    if (!key) return
    if (config.secrets.keys.includes(key)) return
    updateSecrets({ keys: [...config.secrets.keys, key] })
    setNewSecretKey('')
  }

  const removeSecretKey = (key: string) => {
    updateSecrets({ keys: config.secrets.keys.filter((k) => k !== key) })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.variablesSecrets.title')}</CardTitle>
        <CardDescription>
          {t('workflow.variablesSecrets.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Variables Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base">{t('workflow.variablesSecrets.variablesLabel')}</Label>
            <Button variant="outline" size="sm" onClick={addVariable}>
              <Plus className="mr-1 h-4 w-4" />
              {t('workflow.variablesSecrets.addVariable')}
            </Button>
          </div>

          {config.variables.variables.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {t('workflow.variablesSecrets.noVariables')}
            </p>
          )}

          {config.variables.variables.map((variable) => (
            <div
              key={variable.id}
              className="rounded-lg border p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {variable.key || t('workflow.variablesSecrets.unnamedVar')}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeVariable(variable.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label>{t('workflow.variablesSecrets.key')}</Label>
                  <Input
                    placeholder={t('workflow.variablesSecrets.keyPlaceholder')}
                    value={variable.key}
                    onChange={(e) =>
                      updateVariableField(variable.id, 'key', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>{t('workflow.variablesSecrets.value')}</Label>
                  <Input
                    placeholder={t('workflow.variablesSecrets.valuePlaceholder')}
                    value={variable.value}
                    onChange={(e) =>
                      updateVariableField(variable.id, 'value', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>{t('workflow.variablesSecrets.scope')}</Label>
                  <Select
                    value={variable.scope}
                    onValueChange={(val) =>
                      updateVariableField(variable.id, 'scope', val)
                    }
                    options={VARIABLE_SCOPE_OPTIONS.map((o) => ({
                      value: o.value,
                      label: o.label,
                    }))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secrets Section */}
        <div className="space-y-3">
          <Label className="text-base">{t('workflow.variablesSecrets.secretsLabel')}</Label>

          <div className="space-y-1">
            <Label>{t('workflow.variablesSecrets.secretsProvider')}</Label>
            <Select
              value={config.secrets.provider}
              onValueChange={(val) =>
                updateSecrets({ provider: val as typeof config.secrets.provider })
              }
              options={SECRETS_PROVIDER_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
              }))}
            />
          </div>

          {/* Secret Keys */}
          <div className="space-y-2">
            <Label>{t('workflow.variablesSecrets.secretKeys')}</Label>
            <div className="flex flex-wrap gap-2">
              {config.secrets.keys.map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {key}
                  <button
                    onClick={() => removeSecretKey(key)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder={t('workflow.variablesSecrets.secretKeyPlaceholder')}
                value={newSecretKey}
                onChange={(e) => setNewSecretKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSecretKey()}
              />
              <Button onClick={addSecretKey} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Rotation */}
          <div className="flex items-center gap-3">
            <Switch
              checked={config.secrets.rotationEnabled}
              onCheckedChange={(val) =>
                updateSecrets({ rotationEnabled: val })
              }
            />
            <Label>{t('workflow.variablesSecrets.rotationEnabled')}</Label>
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
