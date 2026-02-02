'use client'

import { useWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function StepBusiness() {
  const { config, updateConfig, setCurrentStep } = useWizard()
  const { t } = useTranslation()

  const industries = [
    { id: 'Technology', label: t('preset.business.industries.technology') },
    { id: 'Healthcare', label: t('preset.business.industries.healthcare') },
    { id: 'Finance', label: t('preset.business.industries.finance') },
    { id: 'E-commerce', label: t('preset.business.industries.ecommerce') },
    { id: 'Education', label: t('preset.business.industries.education') },
    { id: 'Manufacturing', label: t('preset.business.industries.manufacturing') },
    { id: 'Real Estate', label: t('preset.business.industries.realEstate') },
    { id: 'Hospitality', label: t('preset.business.industries.hospitality') },
    { id: 'Other', label: t('preset.business.industries.other') },
  ]

  const canContinue = config.businessName && config.industry

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.business.title')}</CardTitle>
        <CardDescription>
          {t('preset.business.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">{t('preset.business.businessName')}</Label>
          <Input
            id="businessName"
            placeholder={t('preset.business.businessNamePlaceholder')}
            value={config.businessName}
            onChange={(e) => updateConfig({ businessName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>{t('preset.business.industry')}</Label>
          <div className="grid grid-cols-3 gap-2">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => updateConfig({ industry: industry.id })}
                className={`rounded-lg border p-3 text-sm transition-colors ${
                  config.industry === industry.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {industry.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">{t('preset.business.briefDescription')}</Label>
          <textarea
            id="description"
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={t('preset.business.briefDescriptionPlaceholder')}
            value={config.description}
            onChange={(e) => updateConfig({ description: e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setCurrentStep(2)} disabled={!canContinue}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
