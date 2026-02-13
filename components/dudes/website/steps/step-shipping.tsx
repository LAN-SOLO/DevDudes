'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  SHIPPING_PROVIDER_OPTIONS,
  FULFILLMENT_OPTIONS,
} from '@/lib/website-pipeline/constants'

export function StepShipping() {
  const { config, updateConfig, setCurrentStep, nextStep } = useWebsiteWizard()
  const { t } = useTranslation()

  const handleToggleShipping = (value: string) => {
    const current = config.shippingProviders
    if (current.includes(value)) {
      updateConfig({ shippingProviders: current.filter((v) => v !== value) })
    } else {
      updateConfig({ shippingProviders: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.shipping.title')}</CardTitle>
        <CardDescription>{t('website.shipping.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.shipping.shippingProviders')}</label>
          <OptionGrid
            options={SHIPPING_PROVIDER_OPTIONS}
            selected={config.shippingProviders}
            onSelect={handleToggleShipping}
            mode="multi"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.shipping.fulfillment')}</label>
          <Select
            value={config.fulfillment}
            onValueChange={(v) => updateConfig({ fulfillment: v })}
            options={FULFILLMENT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">{t('website.shipping.features')}</label>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { key: 'internationalShipping' as const, label: t('website.shipping.internationalShipping') },
              { key: 'shippingZones' as const, label: t('website.shipping.shippingZones') },
              { key: 'trackingEnabled' as const, label: t('website.shipping.trackingEnabled') },
              { key: 'returnsPolicy' as const, label: t('website.shipping.returnsPolicy') },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={key}
                  checked={config[key]}
                  onChange={(e) => updateConfig({ [key]: e.target.checked })}
                  className="rounded border"
                />
                <label htmlFor={key} className="text-sm">{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(12)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => { const next = nextStep(13); if (next) setCurrentStep(next) }}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
