'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  BRAND_TONE_OPTIONS,
  LOGO_STYLE_OPTIONS,
  FONT_HEADING_OPTIONS,
  FONT_BODY_OPTIONS,
} from '@/lib/website-pipeline/constants'

export function StepBranding() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.branding.title')}</CardTitle>
        <CardDescription>{t('website.branding.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.branding.brandTone')}</label>
          <OptionGrid
            options={BRAND_TONE_OPTIONS}
            selected={config.brandTone}
            onSelect={(v) => updateConfig({ brandTone: v })}
            mode="single"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.branding.logoStyle')}</label>
          <OptionGrid
            options={LOGO_STYLE_OPTIONS}
            selected={config.logoStyle}
            onSelect={(v) => updateConfig({ logoStyle: v })}
            mode="single"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.branding.primaryColor')}</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                className="h-10 w-14 rounded border cursor-pointer"
              />
              <Input
                value={config.primaryColor}
                onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.branding.secondaryColor')}</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.secondaryColor}
                onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                className="h-10 w-14 rounded border cursor-pointer"
              />
              <Input
                value={config.secondaryColor}
                onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.branding.fontHeading')}</label>
            <Select
              value={config.fontHeading}
              onValueChange={(v) => updateConfig({ fontHeading: v })}
              options={FONT_HEADING_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.branding.fontBody')}</label>
            <Select
              value={config.fontBody}
              onValueChange={(v) => updateConfig({ fontBody: v })}
              options={FONT_BODY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.branding.customDomain')}</label>
          <Input
            value={config.customDomain}
            onChange={(e) => updateConfig({ customDomain: e.target.value })}
            placeholder="example.com"
            maxLength={200}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(4)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
