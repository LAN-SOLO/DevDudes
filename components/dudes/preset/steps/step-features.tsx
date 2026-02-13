'use client'

import { useState } from 'react'
import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Check, Plus, X } from 'lucide-react'
import { CORE_FEATURE_OPTIONS } from '@/lib/preset-pipeline/constants'

export function StepFeatures() {
  const { config, updateFeatures, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()
  const [newModuleName, setNewModuleName] = useState('')

  const toggleFeature = (value: string) => {
    const current = config.features.coreFeatures
    if (current.includes(value)) {
      updateFeatures({ coreFeatures: current.filter((f) => f !== value) })
    } else {
      updateFeatures({ coreFeatures: [...current, value] })
    }
  }

  const addModule = () => {
    if (!newModuleName.trim()) return
    const mod = { id: crypto.randomUUID(), name: newModuleName.trim(), description: '' }
    updateFeatures({ modules: [...config.features.modules, mod] })
    setNewModuleName('')
  }

  const removeModule = (id: string) => {
    updateFeatures({ modules: config.features.modules.filter((m) => m.id !== id) })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.featuresModules.title')}</CardTitle>
        <CardDescription>{t('preset.featuresModules.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Core Features */}
        <div className="space-y-2">
          <Label>{t('preset.featuresModules.coreFeatures')}</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            {CORE_FEATURE_OPTIONS.map((feature) => (
              <button
                key={feature.value}
                onClick={() => toggleFeature(feature.value)}
                className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                  config.features.coreFeatures.includes(feature.value)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                    config.features.coreFeatures.includes(feature.value)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground'
                  }`}
                >
                  {config.features.coreFeatures.includes(feature.value) && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                <div>
                  <span className="font-medium text-sm">{feature.label}</span>
                  {feature.description && (
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Features */}
        <div className="space-y-2">
          <Label>{t('preset.featuresModules.customFeatures')}</Label>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={t('preset.featuresModules.customFeaturesPlaceholder')}
            value={config.features.customFeatures}
            onChange={(e) => updateFeatures({ customFeatures: e.target.value })}
          />
        </div>

        {/* Modules */}
        <div className="space-y-2">
          <Label>{t('preset.featuresModules.modules')}</Label>
          {config.features.modules.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t('preset.featuresModules.noModules')}
            </p>
          ) : (
            <div className="space-y-2">
              {config.features.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className="font-medium text-sm">{mod.name}</span>
                  <button
                    onClick={() => removeModule(mod.id)}
                    className="hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder={t('preset.featuresModules.addModulePlaceholder')}
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addModule()}
            />
            <Button onClick={addModule}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(6)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(8)}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
