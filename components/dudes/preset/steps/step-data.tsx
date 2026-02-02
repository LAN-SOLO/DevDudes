'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n/language-provider'
import { useWizard } from '../wizard-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react'

const suggestedEntities: Record<string, Array<{ name: string; fields: Array<{ name: string; type: string; required: boolean }> }>> = {
  crm: [
    { name: 'Contact', fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text', required: false },
      { name: 'company', type: 'text', required: false },
    ]},
    { name: 'Deal', fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'value', type: 'number', required: true },
      { name: 'stage', type: 'select', required: true },
      { name: 'closeDate', type: 'date', required: false },
    ]},
  ],
  inventory: [
    { name: 'Product', fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'sku', type: 'text', required: true },
      { name: 'price', type: 'number', required: true },
      { name: 'quantity', type: 'number', required: true },
    ]},
    { name: 'Supplier', fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text', required: false },
    ]},
  ],
  default: [
    { name: 'Item', fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'status', type: 'select', required: true },
    ]},
  ],
}

export function StepData() {
  const { config, updateConfig, setCurrentStep } = useWizard()
  const { t } = useTranslation()
  const [newEntityName, setNewEntityName] = useState('')

  const suggestions = suggestedEntities[config.appType] || suggestedEntities.default

  const addEntity = (name: string) => {
    if (!name.trim()) return
    const exists = config.entities.find(e => e.name.toLowerCase() === name.toLowerCase())
    if (exists) return

    updateConfig({
      entities: [...config.entities, { name: name.trim(), fields: [] }]
    })
    setNewEntityName('')
  }

  const removeEntity = (index: number) => {
    updateConfig({
      entities: config.entities.filter((_, i) => i !== index)
    })
  }

  const addSuggested = (entity: typeof suggestions[0]) => {
    const exists = config.entities.find(e => e.name.toLowerCase() === entity.name.toLowerCase())
    if (!exists) {
      updateConfig({
        entities: [...config.entities, entity]
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.data.title')}</CardTitle>
        <CardDescription>
          {t('preset.data.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Suggested Entities */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('preset.data.suggestedFor', { appType: config.appType || 'your app' })}</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((entity) => {
              const isAdded = config.entities.some(e => e.name === entity.name)
              return (
                <Button
                  key={entity.name}
                  variant={isAdded ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => addSuggested(entity)}
                  disabled={isAdded}
                >
                  {isAdded ? '✓ ' : '+ '}
                  {entity.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Current Entities */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('preset.data.yourEntities')}</p>
          {config.entities.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t('preset.data.noEntities')}
            </p>
          ) : (
            <div className="space-y-2">
              {config.entities.map((entity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <span className="font-medium">{entity.name}</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {entity.fields.length} {t('preset.data.fields')}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEntity(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Custom Entity */}
        <div className="flex gap-2">
          <Input
            placeholder={t('preset.data.addCustomEntity')}
            value={newEntityName}
            onChange={(e) => setNewEntityName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addEntity(newEntityName)}
          />
          <Button onClick={() => addEntity(newEntityName)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(3)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(5)}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
