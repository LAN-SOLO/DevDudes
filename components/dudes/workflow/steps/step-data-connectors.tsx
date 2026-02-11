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
  DATA_CONNECTOR_TYPE_OPTIONS,
  DATA_CONNECTOR_PROVIDER_OPTIONS,
} from '@/lib/workflow-pipeline/constants'
import { generateId } from '@/lib/validations/workflow'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'

export function StepDataConnectors() {
  const { config, updateDataConnectors, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()

  const addConnector = () => {
    updateDataConnectors({
      connectors: [
        ...config.dataConnectors.connectors,
        {
          id: generateId(),
          name: '',
          type: 'database',
          provider: '',
          connectionString: '',
          poolSize: 10,
          healthCheck: true,
        },
      ],
    })
  }

  const removeConnector = (id: string) => {
    updateDataConnectors({
      connectors: config.dataConnectors.connectors.filter((c) => c.id !== id),
    })
  }

  const updateConnectorField = (
    id: string,
    field: string,
    value: string | number | boolean
  ) => {
    updateDataConnectors({
      connectors: config.dataConnectors.connectors.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.dataConnectors.title')}</CardTitle>
        <CardDescription>
          {t('workflow.dataConnectors.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-base">{t('workflow.dataConnectors.connectorsLabel')}</Label>
          <Button variant="outline" size="sm" onClick={addConnector}>
            <Plus className="mr-1 h-4 w-4" />
            {t('workflow.dataConnectors.addConnector')}
          </Button>
        </div>

        {config.dataConnectors.connectors.length === 0 && (
          <p className="text-sm text-muted-foreground">
            {t('workflow.dataConnectors.noConnectors')}
          </p>
        )}

        {config.dataConnectors.connectors.map((connector) => (
          <div
            key={connector.id}
            className="rounded-lg border p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {connector.name || t('workflow.dataConnectors.unnamed')}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeConnector(connector.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label>{t('workflow.dataConnectors.name')}</Label>
                <Input
                  placeholder={t('workflow.dataConnectors.namePlaceholder')}
                  value={connector.name}
                  onChange={(e) =>
                    updateConnectorField(connector.id, 'name', e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <Label>{t('workflow.dataConnectors.type')}</Label>
                <Select
                  value={connector.type}
                  onValueChange={(val) =>
                    updateConnectorField(connector.id, 'type', val)
                  }
                  options={DATA_CONNECTOR_TYPE_OPTIONS.map((o) => ({
                    value: o.value,
                    label: o.label,
                  }))}
                />
              </div>

              <div className="space-y-1">
                <Label>{t('workflow.dataConnectors.provider')}</Label>
                <Select
                  value={connector.provider}
                  onValueChange={(val) =>
                    updateConnectorField(connector.id, 'provider', val)
                  }
                  options={DATA_CONNECTOR_PROVIDER_OPTIONS.map((o) => ({
                    value: o.value,
                    label: o.label,
                  }))}
                  placeholder={t('workflow.dataConnectors.providerPlaceholder')}
                />
              </div>

              <div className="space-y-1">
                <Label>{t('workflow.dataConnectors.poolSize')}</Label>
                <Input
                  type="number"
                  min={1}
                  value={connector.poolSize}
                  onChange={(e) =>
                    updateConnectorField(
                      connector.id,
                      'poolSize',
                      parseInt(e.target.value) || 1
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>{t('workflow.dataConnectors.connectionString')}</Label>
              <Input
                placeholder="postgresql://..."
                value={connector.connectionString}
                onChange={(e) =>
                  updateConnectorField(
                    connector.id,
                    'connectionString',
                    e.target.value
                  )
                }
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={connector.healthCheck}
                onCheckedChange={(val) =>
                  updateConnectorField(connector.id, 'healthCheck', val)
                }
              />
              <Label>{t('workflow.dataConnectors.healthCheck')}</Label>
            </div>
          </div>
        ))}

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
