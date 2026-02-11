'use client'

import { useState } from 'react'
import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Plus, X } from 'lucide-react'
import { INDUSTRY_OPTIONS } from '@/lib/preset-pipeline/constants'

export function StepMeta() {
  const { config, updateMeta, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()
  const [newMaintainer, setNewMaintainer] = useState('')

  const canContinue = config.meta.businessName.trim() !== '' && config.meta.industry !== ''

  const addMaintainer = () => {
    const value = newMaintainer.trim()
    if (!value) return
    if (config.meta.maintainers.includes(value)) return
    updateMeta({ maintainers: [...config.meta.maintainers, value] })
    setNewMaintainer('')
  }

  const removeMaintainer = (maintainer: string) => {
    updateMeta({ maintainers: config.meta.maintainers.filter((m) => m !== maintainer) })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.meta.title')}</CardTitle>
        <CardDescription>{t('preset.meta.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName">{t('preset.meta.businessName')}</Label>
          <Input
            id="businessName"
            placeholder={t('preset.meta.businessNamePlaceholder')}
            value={config.meta.businessName}
            onChange={(e) => updateMeta({ businessName: e.target.value })}
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label>{t('preset.meta.industry')}</Label>
          <div className="grid grid-cols-3 gap-2">
            {INDUSTRY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateMeta({ industry: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                  config.meta.industry === opt.value
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

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="metaDescription">{t('preset.meta.briefDescription')}</Label>
          <textarea
            id="metaDescription"
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={t('preset.meta.briefDescriptionPlaceholder')}
            value={config.meta.description}
            onChange={(e) => updateMeta({ description: e.target.value })}
          />
        </div>

        {/* Version */}
        <div className="space-y-2">
          <Label htmlFor="version">{t('preset.meta.version')}</Label>
          <Input
            id="version"
            placeholder="1.0.0"
            value={config.meta.version}
            onChange={(e) => updateMeta({ version: e.target.value })}
          />
        </div>

        {/* Repository */}
        <div className="space-y-2">
          <Label htmlFor="repository">{t('preset.meta.repository')}</Label>
          <Input
            id="repository"
            placeholder="https://github.com/..."
            value={config.meta.repository}
            onChange={(e) => updateMeta({ repository: e.target.value })}
          />
        </div>

        {/* Maintainers */}
        <div className="space-y-2">
          <Label>{t('preset.meta.maintainers')}</Label>
          <div className="flex flex-wrap gap-2">
            {config.meta.maintainers.map((maintainer) => (
              <span
                key={maintainer}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
              >
                {maintainer}
                <button
                  onClick={() => removeMaintainer(maintainer)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder={t('preset.meta.addMaintainer')}
              value={newMaintainer}
              onChange={(e) => setNewMaintainer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addMaintainer()}
            />
            <Button onClick={addMaintainer}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end">
          <Button onClick={() => setCurrentStep(2)} disabled={!canContinue}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
