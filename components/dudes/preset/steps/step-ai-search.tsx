'use client'

import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { SectionToggle } from '@/components/dudes/shared/section-toggle'
import {
  AI_PROVIDER_OPTIONS, AI_FEATURE_OPTIONS,
  SEARCH_PROVIDER_OPTIONS, SEARCH_INDEXING_OPTIONS,
} from '@/lib/preset-pipeline/constants'

export function StepAiSearch() {
  const { config, updateAiSearch, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()

  const ai = config.aiSearch.ai
  const search = config.aiSearch.search

  const updateAi = (updates: Partial<typeof ai>) => {
    updateAiSearch({ ai: { ...ai, ...updates } })
  }

  const updateSearch = (updates: Partial<typeof search>) => {
    updateAiSearch({ search: { ...search, ...updates } })
  }

  const toggleAiFeature = (value: string) => {
    const current = ai.features
    if (current.includes(value)) {
      updateAi({ features: current.filter((f) => f !== value) })
    } else {
      updateAi({ features: [...current, value] })
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Section */}
      <SectionToggle
        enabled={ai.enabled}
        onToggle={(enabled) => updateAi({ enabled })}
        title={t('preset.aiSearch.aiTitle')}
        description={t('preset.aiSearch.aiDescription')}
      >
        <div className="space-y-2">
          <Label>{t('preset.aiSearch.aiProvider')}</Label>
          <div className="grid grid-cols-3 gap-2">
            {AI_PROVIDER_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateAi({ provider: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${ai.provider === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
                {opt.description && <p className="text-xs text-muted-foreground">{opt.description}</p>}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t('preset.aiSearch.aiFeatures')}</Label>
          <div className="grid grid-cols-2 gap-2">
            {AI_FEATURE_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => toggleAiFeature(opt.value)}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${ai.features.includes(opt.value) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <div className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border ${ai.features.includes(opt.value) ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  {ai.features.includes(opt.value) && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <span className="font-medium text-sm">{opt.label}</span>
                  {opt.description && <p className="text-xs text-muted-foreground">{opt.description}</p>}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label>{t('preset.aiSearch.rag')}</Label>
            <Switch checked={ai.rag} onCheckedChange={(rag) => updateAi({ rag })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('preset.aiSearch.guardrails')}</Label>
            <Switch checked={ai.guardrails} onCheckedChange={(guardrails) => updateAi({ guardrails })} />
          </div>
        </div>
      </SectionToggle>

      {/* Search Section */}
      <SectionToggle
        enabled={search.enabled}
        onToggle={(enabled) => updateSearch({ enabled })}
        title={t('preset.aiSearch.searchTitle')}
        description={t('preset.aiSearch.searchDescription')}
      >
        <div className="space-y-2">
          <Label>{t('preset.aiSearch.searchProvider')}</Label>
          <div className="grid grid-cols-3 gap-2">
            {SEARCH_PROVIDER_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateSearch({ provider: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${search.provider === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
                {opt.description && <p className="text-xs text-muted-foreground">{opt.description}</p>}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t('preset.aiSearch.indexing')}</Label>
          <div className="flex gap-2">
            {SEARCH_INDEXING_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateSearch({ indexing: opt.value })}
                className={`rounded-lg border px-4 py-2 text-sm transition-colors ${search.indexing === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>{t('preset.aiSearch.fuzzy')}</Label>
          <Switch checked={search.fuzzy} onCheckedChange={(fuzzy) => updateSearch({ fuzzy })} />
        </div>
      </SectionToggle>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(10)}>
          <ArrowLeft className="mr-2 h-4 w-4" />{t('preset.common.back')}
        </Button>
        <Button onClick={() => setCurrentStep(12)}>
          {t('preset.common.continue')}<ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
