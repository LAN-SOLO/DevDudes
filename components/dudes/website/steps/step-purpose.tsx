'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import { Select } from '@/components/ui/select'
import {
  WEBSITE_TYPE_OPTIONS,
  INDUSTRY_OPTIONS,
  TARGET_AUDIENCE_OPTIONS,
} from '@/lib/website-pipeline/constants'

export function StepPurpose() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()

  const handleToggleType = (value: string) => {
    const current = config.websiteTypes
    if (current.includes(value)) {
      updateConfig({ websiteTypes: current.filter((v) => v !== value) })
    } else {
      updateConfig({ websiteTypes: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.purpose.title')}</CardTitle>
        <CardDescription>{t('website.purpose.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.purpose.websiteType')}</label>
          <OptionGrid
            options={WEBSITE_TYPE_OPTIONS}
            selected={config.websiteTypes}
            onSelect={handleToggleType}
            mode="multi"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.purpose.industry')}</label>
            <Select
              value={config.industry}
              onValueChange={(v) => updateConfig({ industry: v })}
              options={INDUSTRY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.purpose.targetAudience')}</label>
            <Select
              value={config.targetAudience}
              onValueChange={(v) => updateConfig({ targetAudience: v })}
              options={TARGET_AUDIENCE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.purpose.siteName')}</label>
          <Input
            value={config.siteName}
            onChange={(e) => updateConfig({ siteName: e.target.value })}
            placeholder={t('website.purpose.siteNamePlaceholder')}
            maxLength={200}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.purpose.elevatorPitch')}</label>
          <Textarea
            value={config.elevatorPitch}
            onChange={(e) => updateConfig({ elevatorPitch: e.target.value })}
            placeholder={t('website.purpose.elevatorPitchPlaceholder')}
            maxLength={1000}
            rows={3}
          />
          <p className="text-xs text-muted-foreground text-right">
            {config.elevatorPitch.length}/1000
          </p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(3)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
