'use client'

import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { SectionToggle } from '@/components/dudes/shared/section-toggle'
import { STORAGE_PROVIDER_OPTIONS, FILE_TYPE_OPTIONS } from '@/lib/preset-pipeline/constants'

export function StepStorage() {
  const { config, updateStorage, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()

  const toggleFileType = (value: string) => {
    const current = config.storage.allowedTypes
    if (current.includes(value)) {
      updateStorage({ allowedTypes: current.filter((v) => v !== value) })
    } else {
      updateStorage({ allowedTypes: [...current, value] })
    }
  }

  return (
    <div className="space-y-6">
      <SectionToggle
        enabled={config.storage.enabled}
        onToggle={(enabled) => updateStorage({ enabled })}
        title={t('preset.storage.title')}
        description={t('preset.storage.description')}
      >
        <div className="space-y-2">
          <Label>{t('preset.storage.provider')}</Label>
          <div className="grid grid-cols-3 gap-2">
            {STORAGE_PROVIDER_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateStorage({ provider: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${config.storage.provider === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
                {opt.description && <p className="text-xs text-muted-foreground">{opt.description}</p>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label>{t('preset.storage.cdn')}</Label>
            <Switch checked={config.storage.cdn} onCheckedChange={(cdn) => updateStorage({ cdn })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('preset.storage.imageOptimization')}</Label>
            <Switch checked={config.storage.imageOptimization} onCheckedChange={(v) => updateStorage({ imageOptimization: v })} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t('preset.storage.maxFileSize')}</Label>
          <div className="flex items-center gap-2">
            <Input type="number" value={config.storage.maxFileSize} onChange={(e) => updateStorage({ maxFileSize: Number(e.target.value) || 10 })} className="w-24" />
            <span className="text-sm text-muted-foreground">MB</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t('preset.storage.allowedTypes')}</Label>
          <div className="flex flex-wrap gap-2">
            {FILE_TYPE_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => toggleFileType(opt.value)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${config.storage.allowedTypes.includes(opt.value) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <div className={`flex h-4 w-4 items-center justify-center rounded border ${config.storage.allowedTypes.includes(opt.value) ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  {config.storage.allowedTypes.includes(opt.value) && <Check className="h-3 w-3" />}
                </div>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </SectionToggle>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(8)}>
          <ArrowLeft className="mr-2 h-4 w-4" />{t('preset.common.back')}
        </Button>
        <Button onClick={() => setCurrentStep(10)}>
          {t('preset.common.continue')}<ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
