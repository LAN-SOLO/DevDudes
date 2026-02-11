'use client'

import { useState } from 'react'
import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Plus, X, Lock, Unlock } from 'lucide-react'

export function StepPages() {
  const { config, updatePages, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()
  const [newPageName, setNewPageName] = useState('')

  const addPage = () => {
    if (!newPageName.trim()) return
    const route = '/' + newPageName.trim().toLowerCase().replace(/\s+/g, '-')
    const page = {
      id: crypto.randomUUID(),
      name: newPageName.trim(),
      route,
      layout: 'default',
      authRequired: true,
    }
    updatePages({ pages: [...config.pages.pages, page] })
    setNewPageName('')
  }

  const removePage = (id: string) => {
    updatePages({ pages: config.pages.pages.filter((p) => p.id !== id) })
  }

  const togglePageAuth = (id: string) => {
    updatePages({
      pages: config.pages.pages.map((p) =>
        p.id === id ? { ...p, authRequired: !p.authRequired } : p
      ),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.pagesNav.title')}</CardTitle>
        <CardDescription>{t('preset.pagesNav.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pages List */}
        <div className="space-y-2">
          <Label>{t('preset.pagesNav.pages')}</Label>
          {config.pages.pages.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t('preset.pagesNav.noPages')}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {config.pages.pages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="font-medium text-sm">{page.name}</span>
                      <p className="text-xs text-muted-foreground">{page.route}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePageAuth(page.id)}
                      className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs transition-colors ${
                        page.authRequired
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                      title={
                        page.authRequired
                          ? t('preset.pagesNav.authRequired')
                          : t('preset.pagesNav.public')
                      }
                    >
                      {page.authRequired ? (
                        <Lock className="h-3 w-3" />
                      ) : (
                        <Unlock className="h-3 w-3" />
                      )}
                      {page.authRequired
                        ? t('preset.pagesNav.authRequired')
                        : t('preset.pagesNav.public')}
                    </button>
                    <button
                      onClick={() => removePage(page.id)}
                      className="hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Page */}
        <div className="flex gap-2">
          <Input
            placeholder={t('preset.pagesNav.addPagePlaceholder')}
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPage()}
          />
          <Button onClick={addPage}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{t('preset.pagesNav.breadcrumbs')}</p>
            <p className="text-xs text-muted-foreground">{t('preset.pagesNav.breadcrumbsDescription')}</p>
          </div>
          <Switch
            checked={config.pages.breadcrumbs}
            onCheckedChange={(checked) => updatePages({ breadcrumbs: checked })}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(7)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(9)}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
