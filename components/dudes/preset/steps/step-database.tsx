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
import { DB_PROVIDER_OPTIONS, ORM_OPTIONS } from '@/lib/preset-pipeline/constants'
import type { Entity } from '@/lib/preset-pipeline/types'

const suggestedEntities: Record<string, Entity[]> = {
  crm: [
    {
      name: 'Contact',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: false },
        { name: 'company', type: 'text', required: false },
      ],
    },
    {
      name: 'Deal',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'value', type: 'number', required: true },
        { name: 'stage', type: 'select', required: true },
        { name: 'closeDate', type: 'date', required: false },
      ],
    },
  ],
  inventory: [
    {
      name: 'Product',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'sku', type: 'text', required: true },
        { name: 'price', type: 'number', required: true },
        { name: 'quantity', type: 'number', required: true },
      ],
    },
    {
      name: 'Supplier',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: false },
      ],
    },
  ],
  default: [
    {
      name: 'Item',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text', required: false },
        { name: 'status', type: 'select', required: true },
      ],
    },
  ],
}

export function StepDatabase() {
  const { config, updateDatabase, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()
  const [newEntityName, setNewEntityName] = useState('')

  const suggestions = suggestedEntities[config.app.appType] || suggestedEntities.default

  const addEntity = (name: string) => {
    if (!name.trim()) return
    const exists = config.database.entities.find(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    )
    if (exists) return
    updateDatabase({ entities: [...config.database.entities, { name: name.trim(), fields: [] }] })
    setNewEntityName('')
  }

  const removeEntity = (index: number) => {
    updateDatabase({ entities: config.database.entities.filter((_, i) => i !== index) })
  }

  const addSuggested = (entity: Entity) => {
    const exists = config.database.entities.find(
      (e) => e.name.toLowerCase() === entity.name.toLowerCase()
    )
    if (!exists) {
      updateDatabase({ entities: [...config.database.entities, entity] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('preset.database.title')}</CardTitle>
            <CardDescription>{t('preset.database.description')}</CardDescription>
          </div>
          <Switch
            checked={config.database.enabled}
            onCheckedChange={(checked) => updateDatabase({ enabled: checked })}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!config.database.enabled ? (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('preset.database.disabled')}
            </p>
          </div>
        ) : (
          <>
            {/* Database Provider */}
            <div className="space-y-2">
              <Label>{t('preset.database.provider')}</Label>
              <div className="grid grid-cols-3 gap-2">
                {DB_PROVIDER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateDatabase({ provider: opt.value })}
                    className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                      config.database.provider === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium">{opt.label}</span>
                    {opt.description && (
                      <p className="text-xs text-muted-foreground">{opt.description}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ORM */}
            <div className="space-y-2">
              <Label>{t('preset.database.orm')}</Label>
              <div className="grid grid-cols-3 gap-2">
                {ORM_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateDatabase({ orm: opt.value })}
                    className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                      config.database.orm === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium">{opt.label}</span>
                    {opt.description && (
                      <p className="text-xs text-muted-foreground">{opt.description}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Entities */}
            <div className="space-y-2">
              <Label>
                {t('preset.database.suggestedEntities', {
                  appType: config.app.appType || 'your app',
                })}
              </Label>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((entity) => {
                  const isAdded = config.database.entities.some(
                    (e) => e.name.toLowerCase() === entity.name.toLowerCase()
                  )
                  return (
                    <Button
                      key={entity.name}
                      variant={isAdded ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => addSuggested(entity)}
                      disabled={isAdded}
                    >
                      {isAdded ? '+ ' : '+ '}
                      {entity.name}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Current Entities */}
            <div className="space-y-2">
              <Label>{t('preset.database.yourEntities')}</Label>
              {config.database.entities.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t('preset.database.noEntities')}
                </p>
              ) : (
                <div className="space-y-2">
                  {config.database.entities.map((entity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <span className="font-medium">{entity.name}</span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {entity.fields.length} {t('preset.database.fields')}
                        </span>
                      </div>
                      <button
                        onClick={() => removeEntity(index)}
                        className="hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Custom Entity */}
            <div className="flex gap-2">
              <Input
                placeholder={t('preset.database.addCustomEntity')}
                value={newEntityName}
                onChange={(e) => setNewEntityName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addEntity(newEntityName)}
              />
              <Button onClick={() => addEntity(newEntityName)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Database Toggles */}
            <div className="space-y-4">
              <Label>{t('preset.database.options')}</Label>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t('preset.database.audit')}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('preset.database.auditDescription')}
                  </p>
                </div>
                <Switch
                  checked={config.database.audit}
                  onCheckedChange={(checked) => updateDatabase({ audit: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t('preset.database.softDelete')}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('preset.database.softDeleteDescription')}
                  </p>
                </div>
                <Switch
                  checked={config.database.softDelete}
                  onCheckedChange={(checked) => updateDatabase({ softDelete: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t('preset.database.multiTenancy')}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('preset.database.multiTenancyDescription')}
                  </p>
                </div>
                <Switch
                  checked={config.database.multiTenancy}
                  onCheckedChange={(checked) => updateDatabase({ multiTenancy: checked })}
                />
              </div>
            </div>
          </>
        )}

        {/* Navigation */}
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
