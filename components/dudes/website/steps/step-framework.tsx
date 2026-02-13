'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  FRAMEWORK_OPTIONS,
  STYLING_OPTIONS,
  COMPONENT_LIBRARY_OPTIONS,
  PACKAGE_MANAGER_OPTIONS,
} from '@/lib/website-pipeline/constants'
import { getFrameworkRecommendations } from '@/lib/website-pipeline/recommendations'

export function StepFramework() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const recommendations = getFrameworkRecommendations(config)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.framework.title')}</CardTitle>
        <CardDescription>{t('website.framework.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.framework.framework')}</label>
          <OptionGrid
            options={FRAMEWORK_OPTIONS}
            selected={config.framework}
            onSelect={(v) => updateConfig({ framework: v })}
            mode="single"
            recommendations={recommendations}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.framework.language')}</label>
          <div className="flex gap-2">
            {['typescript', 'javascript'].map((lang) => (
              <Button
                key={lang}
                variant={config.language === lang ? 'default' : 'outline'}
                onClick={() => updateConfig({ language: lang })}
                className="flex-1"
              >
                {lang === 'typescript' ? 'TypeScript' : 'JavaScript'}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.framework.styling')}</label>
            <Select
              value={config.styling}
              onValueChange={(v) => updateConfig({ styling: v })}
              options={STYLING_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.framework.packageManager')}</label>
            <Select
              value={config.packageManager}
              onValueChange={(v) => updateConfig({ packageManager: v })}
              options={PACKAGE_MANAGER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.framework.componentLibrary')}</label>
          <OptionGrid
            options={COMPONENT_LIBRARY_OPTIONS}
            selected={config.componentLibrary}
            onSelect={(v) => updateConfig({ componentLibrary: v })}
            mode="single"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="monorepo"
            checked={config.monorepo}
            onChange={(e) => updateConfig({ monorepo: e.target.checked })}
            className="rounded border"
          />
          <label htmlFor="monorepo" className="text-sm">{t('website.framework.monorepo')}</label>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(7)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(9)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
