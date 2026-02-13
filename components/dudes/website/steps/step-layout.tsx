'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  LAYOUT_STYLE_OPTIONS,
  NAV_STYLE_OPTIONS,
  HEADER_STYLE_OPTIONS,
  FOOTER_STYLE_OPTIONS,
  PAGE_STRUCTURE_OPTIONS,
} from '@/lib/website-pipeline/constants'

export function StepLayout() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()

  const handleTogglePage = (value: string) => {
    const current = config.pageStructure
    if (current.includes(value)) {
      updateConfig({ pageStructure: current.filter((v) => v !== value) })
    } else {
      updateConfig({ pageStructure: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.layout.title')}</CardTitle>
        <CardDescription>{t('website.layout.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.layout.layoutStyle')}</label>
          <OptionGrid
            options={LAYOUT_STYLE_OPTIONS}
            selected={config.layoutStyle}
            onSelect={(v) => updateConfig({ layoutStyle: v })}
            mode="single"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.layout.navigationStyle')}</label>
            <Select
              value={config.navigationStyle}
              onValueChange={(v) => updateConfig({ navigationStyle: v })}
              options={NAV_STYLE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.layout.headerStyle')}</label>
            <Select
              value={config.headerStyle}
              onValueChange={(v) => updateConfig({ headerStyle: v })}
              options={HEADER_STYLE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.layout.footerStyle')}</label>
          <Select
            value={config.footerStyle}
            onValueChange={(v) => updateConfig({ footerStyle: v })}
            options={FOOTER_STYLE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.layout.pageStructure')}</label>
          <OptionGrid
            options={PAGE_STRUCTURE_OPTIONS}
            selected={config.pageStructure}
            onSelect={handleTogglePage}
            mode="multi"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(4)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(6)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
