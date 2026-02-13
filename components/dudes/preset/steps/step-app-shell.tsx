'use client'

import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  APP_TYPE_OPTIONS,
  FRAMEWORK_OPTIONS,
  LANGUAGE_OPTIONS,
  RUNTIME_OPTIONS,
  TARGET_USER_OPTIONS,
  LOCALE_OPTIONS,
} from '@/lib/preset-pipeline/constants'

export function StepAppShell() {
  const { config, updateApp, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()

  const toggleInArray = (field: 'targetUsers' | 'locales', value: string) => {
    const current = config.app[field]
    if (current.includes(value)) {
      updateApp({ [field]: current.filter((v) => v !== value) })
    } else {
      updateApp({ [field]: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.appShell.title')}</CardTitle>
        <CardDescription>{t('preset.appShell.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* App Type */}
        <div className="space-y-2">
          <Label>{t('preset.appShell.appType')}</Label>
          <div className="grid grid-cols-3 gap-2">
            {APP_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateApp({ appType: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                  config.app.appType === opt.value
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

        {/* Framework */}
        <div className="space-y-2">
          <Label>{t('preset.appShell.framework')}</Label>
          <div className="grid grid-cols-3 gap-2">
            {FRAMEWORK_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateApp({ framework: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                  config.app.framework === opt.value
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

        {/* Language */}
        <div className="space-y-2">
          <Label>{t('preset.appShell.language')}</Label>
          <div className="flex gap-2">
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateApp({ language: opt.value })}
                className={`flex-1 rounded-lg border p-3 text-center text-sm transition-colors ${
                  config.app.language === opt.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Runtime */}
        <div className="space-y-2">
          <Label>{t('preset.appShell.runtime')}</Label>
          <div className="flex gap-2">
            {RUNTIME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateApp({ runtime: opt.value })}
                className={`flex-1 rounded-lg border p-3 text-center text-sm transition-colors ${
                  config.app.runtime === opt.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SSR & PWA Toggles */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('preset.appShell.ssr')}</Label>
              <p className="text-xs text-muted-foreground">{t('preset.appShell.ssrDescription')}</p>
            </div>
            <Switch
              checked={config.app.ssr}
              onCheckedChange={(checked) => updateApp({ ssr: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('preset.appShell.pwa')}</Label>
              <p className="text-xs text-muted-foreground">{t('preset.appShell.pwaDescription')}</p>
            </div>
            <Switch
              checked={config.app.pwa}
              onCheckedChange={(checked) => updateApp({ pwa: checked })}
            />
          </div>
        </div>

        {/* Target Users */}
        <div className="space-y-2">
          <Label>{t('preset.appShell.targetUsers')}</Label>
          <div className="flex flex-wrap gap-2">
            {TARGET_USER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleInArray('targetUsers', opt.value)}
                className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                  config.app.targetUsers.includes(opt.value)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Locales */}
        <div className="space-y-2">
          <Label>{t('preset.appShell.locales')}</Label>
          <div className="flex flex-wrap gap-2">
            {LOCALE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleInArray('locales', opt.value)}
                className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                  config.app.locales.includes(opt.value)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">{opt.label}</span>
                {opt.description && (
                  <span className="ml-1 text-xs text-muted-foreground">({opt.description})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(4)}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
