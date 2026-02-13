'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import { RecommendationChips } from '@/components/dudes/shared/recommendation-chips'
import {
  BACKUP_OPTIONS,
  COMPLIANCE_OPTIONS,
  CDN_OPTIONS,
  CACHING_OPTIONS,
} from '@/lib/website-pipeline/constants'
import { getSecurityRecommendations } from '@/lib/website-pipeline/recommendations'

export function StepSecurity() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const recommendations = getSecurityRecommendations(config)

  const handleToggleCompliance = (value: string) => {
    const current = config.compliance
    if (current.includes(value)) {
      updateConfig({ compliance: current.filter((v) => v !== value) })
    } else {
      updateConfig({ compliance: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.security.title')}</CardTitle>
        <CardDescription>{t('website.security.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { key: 'ssl' as const, label: t('website.security.ssl') },
            { key: 'csp' as const, label: t('website.security.csp') },
            { key: 'rateLimiting' as const, label: t('website.security.rateLimiting') },
            { key: 'ddosProtection' as const, label: t('website.security.ddosProtection') },
            { key: 'waf' as const, label: t('website.security.waf') },
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

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.security.compliance')}</label>
          <OptionGrid
            options={COMPLIANCE_OPTIONS}
            selected={config.compliance}
            onSelect={handleToggleCompliance}
            mode="multi"
          />
          <RecommendationChips
            recommendations={recommendations}
            selectedValues={config.compliance}
            onSelect={handleToggleCompliance}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.security.backups')}</label>
            <Select
              value={config.backups}
              onValueChange={(v) => updateConfig({ backups: v })}
              options={BACKUP_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.security.cdn')}</label>
            <Select
              value={config.cdn}
              onValueChange={(v) => updateConfig({ cdn: v })}
              options={CDN_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.security.caching')}</label>
            <Select
              value={config.caching}
              onValueChange={(v) => updateConfig({ caching: v })}
              options={CACHING_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(14)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(16)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
