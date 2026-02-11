'use client'

import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { INTEGRATION_SERVICE_OPTIONS } from '@/lib/preset-pipeline/constants'

export function StepIntegrations() {
  const { config, updateIntegrations, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()

  const intg = config.integrations

  const toggleService = (opt: { value: string; label: string }) => {
    const existing = intg.services
    const found = existing.find((s) => s.id === opt.value)
    if (found) {
      updateIntegrations({ services: existing.filter((s) => s.id !== opt.value) })
    } else {
      updateIntegrations({
        services: [...existing, { id: opt.value, name: opt.label, type: 'other' }],
      })
    }
  }

  const isSelected = (value: string) => intg.services.some((s) => s.id === value)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.integrations.title')}</CardTitle>
        <CardDescription>{t('preset.integrations.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>{t('preset.integrations.services')}</Label>
          <p className="text-xs text-muted-foreground">{intg.services.length} {t('preset.common.selected')}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRATION_SERVICE_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => toggleService(opt)}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${isSelected(opt.value) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <div className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${isSelected(opt.value) ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  {isSelected(opt.value) && <Check className="h-3 w-3" />}
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
            <div>
              <Label>{t('preset.integrations.webhooks')}</Label>
              <p className="text-xs text-muted-foreground">{t('preset.integrations.webhooksDesc')}</p>
            </div>
            <Switch checked={intg.webhooks} onCheckedChange={(v) => updateIntegrations({ webhooks: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('preset.integrations.oauth2')}</Label>
              <p className="text-xs text-muted-foreground">{t('preset.integrations.oauth2Desc')}</p>
            </div>
            <Switch checked={intg.oauth2} onCheckedChange={(v) => updateIntegrations({ oauth2: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('preset.integrations.apiKeys')}</Label>
              <p className="text-xs text-muted-foreground">{t('preset.integrations.apiKeysDesc')}</p>
            </div>
            <Switch checked={intg.apiKeys} onCheckedChange={(v) => updateIntegrations({ apiKeys: v })} />
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(14)}>
            <ArrowLeft className="mr-2 h-4 w-4" />{t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(16)}>
            {t('preset.common.continue')}<ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
