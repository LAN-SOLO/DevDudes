'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  PRODUCT_TYPE_OPTIONS,
  CATALOG_SIZE_OPTIONS,
} from '@/lib/website-pipeline/constants'

export function StepProducts() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.products.title')}</CardTitle>
        <CardDescription>{t('website.products.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.products.productType')}</label>
          <OptionGrid
            options={PRODUCT_TYPE_OPTIONS}
            selected={config.productType}
            onSelect={(v) => updateConfig({ productType: v })}
            mode="single"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.products.catalogSize')}</label>
          <Select
            value={config.catalogSize}
            onValueChange={(v) => updateConfig({ catalogSize: v })}
            options={CATALOG_SIZE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">{t('website.products.features')}</label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { key: 'categories' as const, label: t('website.products.categories') },
              { key: 'variants' as const, label: t('website.products.variants') },
              { key: 'inventory' as const, label: t('website.products.inventory') },
              { key: 'reviews' as const, label: t('website.products.reviews') },
              { key: 'wishlist' as const, label: t('website.products.wishlist') },
              { key: 'compareProducts' as const, label: t('website.products.compareProducts') },
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
          <Button variant="outline" onClick={() => setCurrentStep(10)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(12)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
