'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Sun, Moon, Monitor, Sidebar, PanelTop, Minus } from 'lucide-react'

export function StepUIPreferences() {
  const { config, updateConfig, setCurrentStep } = useWorkflowWizard()
  const { t } = useTranslation()

  const themes = [
    { id: 'light', label: t('workflow.ui.themes.light'), icon: Sun },
    { id: 'dark', label: t('workflow.ui.themes.dark'), icon: Moon },
    { id: 'system', label: t('workflow.ui.themes.system'), icon: Monitor },
  ] as const

  const layouts = [
    { id: 'sidebar', label: t('workflow.ui.layouts.sidebar'), icon: Sidebar, description: t('workflow.ui.layouts.sidebarDesc') },
    { id: 'topnav', label: t('workflow.ui.layouts.topnav'), icon: PanelTop, description: t('workflow.ui.layouts.topnavDesc') },
    { id: 'minimal', label: t('workflow.ui.layouts.minimal'), icon: Minus, description: t('workflow.ui.layouts.minimalDesc') },
  ] as const

  const colors = [
    { id: '#0ea5e9', label: t('workflow.ui.colors.sky') },
    { id: '#10B981', label: t('workflow.ui.colors.green') },
    { id: '#8B5CF6', label: t('workflow.ui.colors.purple') },
    { id: '#F59E0B', label: t('workflow.ui.colors.amber') },
    { id: '#EF4444', label: t('workflow.ui.colors.red') },
    { id: '#EC4899', label: t('workflow.ui.colors.pink') },
    { id: '#06B6D4', label: t('workflow.ui.colors.cyan') },
    { id: '#6366F1', label: t('workflow.ui.colors.indigo') },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.ui.title')}</CardTitle>
        <CardDescription>
          {t('workflow.ui.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('workflow.ui.defaultTheme')}</p>
          <div className="flex gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateConfig({ theme: theme.id })}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
                  config.theme === theme.id
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
          <p className="text-sm font-medium">{t('workflow.ui.primaryColor')}</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => updateConfig({ primaryColor: color.id })}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors ${
                  config.primaryColor === color.id
                    ? 'border-primary ring-2 ring-primary ring-offset-2'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color.id }}
                />
                <span className="text-sm">{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('workflow.ui.layoutStyle')}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => updateConfig({ layout: layout.id })}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                  config.layout === layout.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <layout.icon className="h-6 w-6" />
                <span className="font-medium text-sm">{layout.label}</span>
                <span className="text-xs text-muted-foreground text-center">{layout.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(3)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(5)}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
