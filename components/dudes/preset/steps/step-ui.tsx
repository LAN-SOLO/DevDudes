'use client'

import { useWizard } from '../wizard-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Sun, Moon, Monitor, Sidebar, PanelTop, Minus } from 'lucide-react'

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
] as const

const layouts = [
  { id: 'sidebar', label: 'Sidebar', icon: Sidebar, description: 'Navigation on the left' },
  { id: 'topnav', label: 'Top Navigation', icon: PanelTop, description: 'Navigation at top' },
  { id: 'minimal', label: 'Minimal', icon: Minus, description: 'Clean, simple layout' },
] as const

const colors = [
  { id: '#0066FF', label: 'Blue' },
  { id: '#10B981', label: 'Green' },
  { id: '#8B5CF6', label: 'Purple' },
  { id: '#F59E0B', label: 'Amber' },
  { id: '#EF4444', label: 'Red' },
  { id: '#EC4899', label: 'Pink' },
  { id: '#06B6D4', label: 'Cyan' },
  { id: '#6366F1', label: 'Indigo' },
]

export function StepUI() {
  const { config, updateConfig, setCurrentStep } = useWizard()

  return (
    <Card>
      <CardHeader>
        <CardTitle>UI Preferences</CardTitle>
        <CardDescription>
          Customize the look and feel of your application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Default theme</p>
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
          <p className="text-sm font-medium">Primary color</p>
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
          <p className="text-sm font-medium">Layout style</p>
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
                <span className="text-xs text-muted-foreground">{layout.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(5)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => setCurrentStep(7)}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
