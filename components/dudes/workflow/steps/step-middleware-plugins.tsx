'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react'
import { generateId } from '@/lib/validations/workflow'
import { MIDDLEWARE_TYPE_OPTIONS, EXTENSION_TYPE_OPTIONS } from '@/lib/workflow-pipeline/constants'

export function StepMiddlewarePlugins() {
  const { config, updateMiddleware, updatePlugins, updateExtensions, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()

  // ── Middleware ──────────────────────────────────────────────────
  const addMiddleware = () => {
    updateMiddleware({
      items: [
        ...config.middleware.items,
        { id: generateId(), name: '', type: 'auth', order: 0, enabled: true, config: '' },
      ],
    })
  }

  const updateMiddlewareItem = (id: string, updates: Record<string, unknown>) => {
    updateMiddleware({
      items: config.middleware.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })
  }

  const removeMiddlewareItem = (id: string) => {
    updateMiddleware({
      items: config.middleware.items.filter((item) => item.id !== id),
    })
  }

  // ── Plugins ────────────────────────────────────────────────────
  const addPlugin = () => {
    updatePlugins({
      plugins: [
        ...config.plugins.plugins,
        { id: generateId(), name: '', version: 'latest', enabled: true, config: '' },
      ],
    })
  }

  const updatePlugin = (id: string, updates: Record<string, unknown>) => {
    updatePlugins({
      plugins: config.plugins.plugins.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })
  }

  const removePlugin = (id: string) => {
    updatePlugins({
      plugins: config.plugins.plugins.filter((p) => p.id !== id),
    })
  }

  // ── Extensions ─────────────────────────────────────────────────
  const addExtension = () => {
    updateExtensions({
      extensions: [
        ...config.extensions.extensions,
        { id: generateId(), name: '', type: 'transform', code: '' },
      ],
    })
  }

  const updateExtension = (id: string, updates: Record<string, unknown>) => {
    updateExtensions({
      extensions: config.extensions.extensions.map((ext) =>
        ext.id === id ? { ...ext, ...updates } : ext
      ),
    })
  }

  const removeExtension = (id: string) => {
    updateExtensions({
      extensions: config.extensions.extensions.filter((ext) => ext.id !== id),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.middlewarePlugins.title')}</CardTitle>
        <CardDescription>{t('workflow.middlewarePlugins.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Middleware Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{t('workflow.middlewarePlugins.middleware')}</p>
            <Button variant="outline" size="sm" onClick={addMiddleware}>
              <Plus className="mr-2 h-4 w-4" />
              {t('workflow.middlewarePlugins.addMiddleware')}
            </Button>
          </div>
          {config.middleware.items.map((item) => (
            <div key={item.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={item.enabled}
                    onCheckedChange={(checked) => updateMiddlewareItem(item.id, { enabled: checked })}
                  />
                  <Label className="text-sm">{item.name || t('workflow.middlewarePlugins.unnamed')}</Label>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeMiddlewareItem(item.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.middlewarePlugins.name')}</Label>
                  <Input
                    value={item.name}
                    onChange={(e) => updateMiddlewareItem(item.id, { name: e.target.value })}
                    placeholder={t('workflow.middlewarePlugins.namePlaceholder')}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.middlewarePlugins.type')}</Label>
                  <Select
                    value={item.type}
                    onValueChange={(val) => updateMiddlewareItem(item.id, { type: val })}
                    options={MIDDLEWARE_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.middlewarePlugins.order')}</Label>
                  <Input
                    type="number"
                    value={item.order}
                    onChange={(e) => updateMiddlewareItem(item.id, { order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.middlewarePlugins.config')}</Label>
                  <Input
                    value={item.config}
                    onChange={(e) => updateMiddlewareItem(item.id, { config: e.target.value })}
                    placeholder={t('workflow.middlewarePlugins.configPlaceholder')}
                  />
                </div>
              </div>
            </div>
          ))}
          {config.middleware.items.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">{t('workflow.middlewarePlugins.noMiddleware')}</p>
          )}
        </div>

        {/* Plugins Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{t('workflow.middlewarePlugins.plugins')}</p>
            <Button variant="outline" size="sm" onClick={addPlugin}>
              <Plus className="mr-2 h-4 w-4" />
              {t('workflow.middlewarePlugins.addPlugin')}
            </Button>
          </div>
          {config.plugins.plugins.map((plugin) => (
            <div key={plugin.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={plugin.enabled}
                    onCheckedChange={(checked) => updatePlugin(plugin.id, { enabled: checked })}
                  />
                  <Label className="text-sm">{plugin.name || t('workflow.middlewarePlugins.unnamed')}</Label>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removePlugin(plugin.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.middlewarePlugins.name')}</Label>
                  <Input
                    value={plugin.name}
                    onChange={(e) => updatePlugin(plugin.id, { name: e.target.value })}
                    placeholder={t('workflow.middlewarePlugins.pluginNamePlaceholder')}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.middlewarePlugins.version')}</Label>
                  <Input
                    value={plugin.version}
                    onChange={(e) => updatePlugin(plugin.id, { version: e.target.value })}
                    placeholder="latest"
                  />
                </div>
              </div>
            </div>
          ))}
          {config.plugins.plugins.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">{t('workflow.middlewarePlugins.noPlugins')}</p>
          )}
        </div>

        {/* Extensions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{t('workflow.middlewarePlugins.extensions')}</p>
            <Button variant="outline" size="sm" onClick={addExtension}>
              <Plus className="mr-2 h-4 w-4" />
              {t('workflow.middlewarePlugins.addExtension')}
            </Button>
          </div>
          {config.extensions.extensions.map((ext) => (
            <div key={ext.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">{ext.name || t('workflow.middlewarePlugins.unnamed')}</Label>
                <Button variant="ghost" size="sm" onClick={() => removeExtension(ext.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.middlewarePlugins.name')}</Label>
                  <Input
                    value={ext.name}
                    onChange={(e) => updateExtension(ext.id, { name: e.target.value })}
                    placeholder={t('workflow.middlewarePlugins.extensionNamePlaceholder')}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.middlewarePlugins.type')}</Label>
                  <Select
                    value={ext.type}
                    onValueChange={(val) => updateExtension(ext.id, { type: val })}
                    options={EXTENSION_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('workflow.middlewarePlugins.code')}</Label>
                <Textarea
                  value={ext.code}
                  onChange={(e) => updateExtension(ext.id, { code: e.target.value })}
                  placeholder={t('workflow.middlewarePlugins.codePlaceholder')}
                  rows={3}
                />
              </div>
            </div>
          ))}
          {config.extensions.extensions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">{t('workflow.middlewarePlugins.noExtensions')}</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={nextStep}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
