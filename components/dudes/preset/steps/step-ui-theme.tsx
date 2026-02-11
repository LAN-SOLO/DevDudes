'use client'

import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Sun, Moon, Monitor } from 'lucide-react'
import {
  COLOR_OPTIONS,
  FONT_OPTIONS,
  COMPONENT_LIBRARY_OPTIONS,
  LAYOUT_OPTIONS,
} from '@/lib/preset-pipeline/constants'

export function StepUiTheme() {
  const { config, updateUi, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()

  const themes = [
    { id: 'light' as const, label: t('preset.ui.themes.light'), icon: Sun },
    { id: 'dark' as const, label: t('preset.ui.themes.dark'), icon: Moon },
    { id: 'system' as const, label: t('preset.ui.themes.system'), icon: Monitor },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.uiTheme.title')}</CardTitle>
        <CardDescription>{t('preset.uiTheme.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme */}
        <div className="space-y-2">
          <Label>{t('preset.uiTheme.defaultTheme')}</Label>
          <div className="flex gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateUi({ theme: theme.id })}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
                  config.ui.theme === theme.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <theme.icon className="h-4 w-4" />
                <span className="text-sm">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Color */}
        <div className="space-y-2">
          <Label>{t('preset.uiTheme.primaryColor')}</Label>
          <div className="flex flex-wrap gap-2">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.value}
                onClick={() => updateUi({ primaryColor: color.value })}
                className={`flex items-center gap-2 rounded-lg border p-2 transition-colors ${
                  config.ui.primaryColor === color.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div
                  className="h-5 w-5 rounded-full border"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-xs">{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="space-y-2">
          <Label>{t('preset.uiTheme.fontFamily')}</Label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {FONT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateUi({ fontFamily: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                  config.ui.fontFamily === opt.value
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

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{t('preset.uiTheme.darkMode')}</p>
            <p className="text-xs text-muted-foreground">{t('preset.uiTheme.darkModeDescription')}</p>
          </div>
          <Switch
            checked={config.ui.darkMode}
            onCheckedChange={(checked) => updateUi({ darkMode: checked })}
          />
        </div>

        {/* Component Library */}
        <div className="space-y-2">
          <Label>{t('preset.uiTheme.componentLibrary')}</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {COMPONENT_LIBRARY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateUi({ componentLibrary: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                  config.ui.componentLibrary === opt.value
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

        {/* Responsive */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{t('preset.uiTheme.responsive')}</p>
            <p className="text-xs text-muted-foreground">{t('preset.uiTheme.responsiveDescription')}</p>
          </div>
          <Switch
            checked={config.ui.responsive}
            onCheckedChange={(checked) => updateUi({ responsive: checked })}
          />
        </div>

        {/* Layout */}
        <div className="space-y-2">
          <Label>{t('preset.uiTheme.layout')}</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LAYOUT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateUi({ layout: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                  config.ui.layout === opt.value
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

        {/* Sidebar Collapsible (only for sidebar/dashboard layouts) */}
        {(config.ui.layout === 'sidebar' || config.ui.layout === 'dashboard') && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t('preset.uiTheme.sidebarCollapsible')}</p>
              <p className="text-xs text-muted-foreground">{t('preset.uiTheme.sidebarCollapsibleDescription')}</p>
            </div>
            <Switch
              checked={config.ui.sidebarCollapsible}
              onCheckedChange={(checked) => updateUi({ sidebarCollapsible: checked })}
            />
          </div>
        )}

        {/* Header Fixed */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{t('preset.uiTheme.headerFixed')}</p>
            <p className="text-xs text-muted-foreground">{t('preset.uiTheme.headerFixedDescription')}</p>
          </div>
          <Switch
            checked={config.ui.headerFixed}
            onCheckedChange={(checked) => updateUi({ headerFixed: checked })}
          />
        </div>

        {/* Footer Enabled */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{t('preset.uiTheme.footerEnabled')}</p>
            <p className="text-xs text-muted-foreground">{t('preset.uiTheme.footerEnabledDescription')}</p>
          </div>
          <Switch
            checked={config.ui.footerEnabled}
            onCheckedChange={(checked) => updateUi({ footerEnabled: checked })}
          />
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
