'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  PAYMENT_PROCESSOR_OPTIONS,
  CHECKOUT_STYLE_OPTIONS,
  TAX_CALCULATION_OPTIONS,
} from '@/lib/website-pipeline/constants'
import { getCommerceRecommendations } from '@/lib/website-pipeline/recommendations'

export function StepPayments() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const recommendations = getCommerceRecommendations(config)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.payments.title')}</CardTitle>
        <CardDescription>{t('website.payments.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.payments.paymentProcessor')}</label>
          <OptionGrid
            options={PAYMENT_PROCESSOR_OPTIONS}
            selected={config.paymentProcessor}
            onSelect={(v) => updateConfig({ paymentProcessor: v })}
            mode="single"
            recommendations={recommendations}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.payments.checkoutStyle')}</label>
            <Select
              value={config.checkoutStyle}
              onValueChange={(v) => updateConfig({ checkoutStyle: v })}
              options={CHECKOUT_STYLE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.payments.taxCalculation')}</label>
            <Select
              value={config.taxCalculation}
              onValueChange={(v) => updateConfig({ taxCalculation: v })}
              options={TAX_CALCULATION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">{t('website.payments.features')}</label>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { key: 'invoicing' as const, label: t('website.payments.invoicing') },
              { key: 'subscriptionBilling' as const, label: t('website.payments.subscriptionBilling') },
              { key: 'coupons' as const, label: t('website.payments.coupons') },
              { key: 'giftCards' as const, label: t('website.payments.giftCards') },
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
          <Button variant="outline" onClick={() => setCurrentStep(11)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(13)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
