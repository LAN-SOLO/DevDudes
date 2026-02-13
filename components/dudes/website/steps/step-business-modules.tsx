'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  BUSINESS_MODULE_OPTIONS,
  ADMIN_FEATURE_OPTIONS,
  FORM_BUILDER_FEATURE_OPTIONS,
  SIGNATURE_LAYOUT_OPTIONS,
  SIGNATURE_FEATURE_OPTIONS,
  EXPENSE_FEATURE_OPTIONS,
  SICK_LEAVE_FEATURE_OPTIONS,
} from '@/lib/website-pipeline/constants'

export function StepBusinessModules() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()

  const toggleModule = (value: string) => {
    const current = config.businessModules
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateConfig({ businessModules: updated })
  }

  const toggleArray = (field: keyof typeof config, value: string) => {
    const current = config[field] as string[]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateConfig({ [field]: updated })
  }

  const has = (mod: string) => config.businessModules.includes(mod)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.businessModules.title')}</CardTitle>
        <CardDescription>{t('website.businessModules.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Module Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.businessModules.modules')}</label>
          <OptionGrid
            options={BUSINESS_MODULE_OPTIONS}
            selected={config.businessModules}
            onSelect={toggleModule}
            mode="multi"
          />
        </div>

        {/* Admin Area Features */}
        {has('admin-area') && (
          <div className="space-y-2 rounded-lg border p-4">
            <label className="text-sm font-medium">{t('website.businessModules.adminFeatures')}</label>
            <OptionGrid
              options={ADMIN_FEATURE_OPTIONS}
              selected={config.adminFeatures}
              onSelect={(v) => toggleArray('adminFeatures', v)}
              mode="multi"
            />
          </div>
        )}

        {/* Form Builder Features */}
        {has('form-builder') && (
          <div className="space-y-2 rounded-lg border p-4">
            <label className="text-sm font-medium">{t('website.businessModules.formBuilder')}</label>
            <OptionGrid
              options={FORM_BUILDER_FEATURE_OPTIONS}
              selected={config.formBuilderFeatures}
              onSelect={(v) => toggleArray('formBuilderFeatures', v)}
              mode="multi"
            />
          </div>
        )}

        {/* Signature Builder */}
        {has('signature-builder') && (
          <div className="space-y-2 rounded-lg border p-4">
            <label className="text-sm font-medium">{t('website.businessModules.signatureBuilder')}</label>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">{t('website.businessModules.signatureLayout')}</label>
                <OptionGrid
                  options={SIGNATURE_LAYOUT_OPTIONS}
                  selected={config.signatureLayouts}
                  onSelect={(v) => toggleArray('signatureLayouts', v)}
                  mode="multi"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">{t('website.businessModules.signatureFeatures')}</label>
                <OptionGrid
                  options={SIGNATURE_FEATURE_OPTIONS}
                  selected={config.signatureFeatures}
                  onSelect={(v) => toggleArray('signatureFeatures', v)}
                  mode="multi"
                />
              </div>
            </div>
          </div>
        )}

        {/* Travel Expenses Features */}
        {has('travel-expenses') && (
          <div className="space-y-2 rounded-lg border p-4">
            <label className="text-sm font-medium">{t('website.businessModules.travelExpenses')}</label>
            <OptionGrid
              options={EXPENSE_FEATURE_OPTIONS}
              selected={config.expenseFeatures}
              onSelect={(v) => toggleArray('expenseFeatures', v)}
              mode="multi"
            />
          </div>
        )}

        {/* Employee Budget (reuses expense features pattern) */}
        {has('employee-budget') && (
          <div className="space-y-2 rounded-lg border p-4">
            <label className="text-sm font-medium">{t('website.businessModules.employeeBudget')}</label>
            <OptionGrid
              options={EXPENSE_FEATURE_OPTIONS}
              selected={config.budgetFeatures}
              onSelect={(v) => toggleArray('budgetFeatures', v)}
              mode="multi"
            />
          </div>
        )}

        {/* Sick Leave Features */}
        {has('sick-leave') && (
          <div className="space-y-2 rounded-lg border p-4">
            <label className="text-sm font-medium">{t('website.businessModules.sickLeave')}</label>
            <OptionGrid
              options={SICK_LEAVE_FEATURE_OPTIONS}
              selected={config.sickLeaveFeatures}
              onSelect={(v) => toggleArray('sickLeaveFeatures', v)}
              mode="multi"
            />
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(17)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(19)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
