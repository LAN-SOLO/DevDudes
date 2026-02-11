'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { ArrowLeft, Sparkles, Check } from 'lucide-react'
import {
  THEME_OPTIONS,
  LAYOUT_OPTIONS,
  COLOR_OPTIONS,
  COMPONENT_LIBRARY_OPTIONS,
  FONT_OPTIONS,
  DOC_FORMAT_OPTIONS,
  LOCALE_OPTIONS,
} from '@/lib/workflow-pipeline/constants'

export function StepUIDocumentation() {
  const { config, updateUi, updateDocumentation, prevStep, setIsComplete } = useWorkflowWizard()
  const { t } = useTranslation()
  const ui = config.ui
  const docs = config.documentation

  const handleComplete = () => {
    setIsComplete(true)
  }

  const toggleLocale = (locale: string) => {
    if (ui.i18nLocales.includes(locale)) {
      updateUi({ i18nLocales: ui.i18nLocales.filter((l) => l !== locale) })
    } else {
      updateUi({ i18nLocales: [...ui.i18nLocales, locale] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.uiDoc.title')}</CardTitle>
        <CardDescription>{t('workflow.uiDoc.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme */}
        <div className="space-y-2">
          <Label>{t('workflow.uiDoc.theme')}</Label>
          <div className="flex gap-2">
            {THEME_OPTIONS.map((theme) => (
              <button
                key={theme.value}
                onClick={() => updateUi({ theme: theme.value as typeof ui.theme })}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
                  ui.theme === theme.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="text-sm">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Color */}
        <div className="space-y-2">
          <Label>{t('workflow.uiDoc.primaryColor')}</Label>
          <div className="flex flex-wrap gap-2">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.value}
                onClick={() => updateUi({ primaryColor: color.value })}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors ${
                  ui.primaryColor === color.value
                    ? 'border-primary ring-2 ring-primary ring-offset-2'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-sm">{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="space-y-2">
          <Label>{t('workflow.uiDoc.layout')}</Label>
          <Select
            value={ui.layout}
            onValueChange={(v) => updateUi({ layout: v as typeof ui.layout })}
            options={LAYOUT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* Component Library */}
        <div className="space-y-2">
          <Label>{t('workflow.uiDoc.componentLibrary')}</Label>
          <Select
            value={ui.componentLibrary}
            onValueChange={(v) => updateUi({ componentLibrary: v })}
            options={COMPONENT_LIBRARY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* Font */}
        <div className="space-y-2">
          <Label>{t('workflow.uiDoc.font')}</Label>
          <Select
            value={ui.fontFamily}
            onValueChange={(v) => updateUi({ fontFamily: v })}
            options={FONT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* Branding */}
        <div className="space-y-2">
          <Label>{t('workflow.uiDoc.branding')}</Label>
          <Input
            placeholder={t('workflow.uiDoc.brandingPlaceholder')}
            value={ui.branding}
            onChange={(e) => updateUi({ branding: e.target.value })}
          />
        </div>

        {/* Responsive */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="responsive-toggle" className="text-base">{t('workflow.uiDoc.responsive')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.uiDoc.responsiveDesc')}</p>
          </div>
          <Switch
            id="responsive-toggle"
            checked={ui.responsive}
            onCheckedChange={(responsive) => updateUi({ responsive })}
          />
        </div>

        {/* Accessibility */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="a11y-toggle" className="text-base">{t('workflow.uiDoc.accessibility')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.uiDoc.accessibilityDesc')}</p>
          </div>
          <Switch
            id="a11y-toggle"
            checked={ui.accessibility}
            onCheckedChange={(accessibility) => updateUi({ accessibility })}
          />
        </div>

        {/* i18n */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="i18n-toggle" className="text-base">{t('workflow.uiDoc.i18n')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.uiDoc.i18nDesc')}</p>
          </div>
          <Switch
            id="i18n-toggle"
            checked={ui.i18n}
            onCheckedChange={(i18n) => updateUi({ i18n })}
          />
        </div>

        {ui.i18n && (
          <div className="space-y-2">
            <Label>{t('workflow.uiDoc.locales')}</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {LOCALE_OPTIONS.map((locale) => (
                <button
                  key={locale.value}
                  onClick={() => toggleLocale(locale.value)}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                    ui.i18nLocales.includes(locale.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                      ui.i18nLocales.includes(locale.value)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {ui.i18nLocales.includes(locale.value) && <Check className="h-3 w-3" />}
                  </div>
                  <div>
                    <span className="font-medium text-sm">{locale.label}</span>
                    <p className="text-xs text-muted-foreground">{locale.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Documentation Section */}
        <div className="space-y-4 border-t pt-4">
          <p className="text-base font-medium">{t('workflow.uiDoc.documentation')}</p>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="docs-toggle" className="text-base">{t('workflow.uiDoc.enableDocs')}</Label>
              <p className="text-sm text-muted-foreground">{t('workflow.uiDoc.enableDocsDesc')}</p>
            </div>
            <Switch
              id="docs-toggle"
              checked={docs.enabled}
              onCheckedChange={(enabled) => updateDocumentation({ enabled })}
            />
          </div>

          {docs.enabled && (
            <>
              <div className="space-y-2">
                <Label>{t('workflow.uiDoc.docFormat')}</Label>
                <Select
                  value={docs.format}
                  onValueChange={(v) => updateDocumentation({ format: v as typeof docs.format })}
                  options={DOC_FORMAT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('workflow.uiDoc.outputDir')}</Label>
                <Input
                  placeholder="docs/"
                  value={docs.outputDir}
                  onChange={(e) => updateDocumentation({ outputDir: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-docs-toggle" className="text-base">{t('workflow.uiDoc.autoGenerate')}</Label>
                  <p className="text-sm text-muted-foreground">{t('workflow.uiDoc.autoGenerateDesc')}</p>
                </div>
                <Switch
                  id="auto-docs-toggle"
                  checked={docs.autoGenerate}
                  onCheckedChange={(autoGenerate) => updateDocumentation({ autoGenerate })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="examples-toggle" className="text-base">{t('workflow.uiDoc.includeExamples')}</Label>
                  <p className="text-sm text-muted-foreground">{t('workflow.uiDoc.includeExamplesDesc')}</p>
                </div>
                <Switch
                  id="examples-toggle"
                  checked={docs.includeExamples}
                  onCheckedChange={(includeExamples) => updateDocumentation({ includeExamples })}
                />
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={handleComplete} className="gap-2">
            <Sparkles className="h-4 w-4" />
            {t('workflow.deploy.completeConfig')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
