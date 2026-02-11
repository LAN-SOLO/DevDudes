'use client'

import { useState } from 'react'
import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight, Check, Plus, X } from 'lucide-react'
import { ENCRYPTION_OPTIONS, COMPLIANCE_OPTIONS } from '@/lib/workflow-pipeline/constants'

export function StepSecurity() {
  const { config, updateSecurity, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const [newOrigin, setNewOrigin] = useState('')

  const security = config.security

  const addCorsOrigin = () => {
    if (!newOrigin.trim()) return
    if (security.corsOrigins.includes(newOrigin.trim())) return
    updateSecurity({ corsOrigins: [...security.corsOrigins, newOrigin.trim()] })
    setNewOrigin('')
  }

  const removeCorsOrigin = (origin: string) => {
    updateSecurity({ corsOrigins: security.corsOrigins.filter((o) => o !== origin) })
  }

  const toggleCompliance = (value: string) => {
    if (security.compliance.includes(value)) {
      updateSecurity({ compliance: security.compliance.filter((c) => c !== value) })
    } else {
      updateSecurity({ compliance: [...security.compliance, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.security.title')}</CardTitle>
        <CardDescription>{t('workflow.security.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Encryption */}
        <div className="space-y-2">
          <Label>{t('workflow.security.encryption')}</Label>
          <Select
            value={security.encryption}
            onValueChange={(val) => updateSecurity({ encryption: val as typeof security.encryption })}
            options={ENCRYPTION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* CORS */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="cors-toggle" className="text-base">{t('workflow.security.cors')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.security.corsDesc')}</p>
          </div>
          <Switch
            id="cors-toggle"
            checked={security.cors}
            onCheckedChange={(checked) => updateSecurity({ cors: checked })}
          />
        </div>

        {security.cors && (
          <div className="space-y-2">
            <Label>{t('workflow.security.corsOrigins')}</Label>
            <div className="flex flex-wrap gap-2">
              {security.corsOrigins.map((origin) => (
                <span
                  key={origin}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {origin}
                  <button onClick={() => removeCorsOrigin(origin)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder={t('workflow.security.corsOriginPlaceholder')}
                value={newOrigin}
                onChange={(e) => setNewOrigin(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCorsOrigin()}
              />
              <Button onClick={addCorsOrigin}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* CSP */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="csp-toggle" className="text-base">{t('workflow.security.csp')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.security.cspDesc')}</p>
          </div>
          <Switch
            id="csp-toggle"
            checked={security.csp}
            onCheckedChange={(checked) => updateSecurity({ csp: checked })}
          />
        </div>

        {security.csp && (
          <div className="space-y-2">
            <Label>{t('workflow.security.cspDirectives')}</Label>
            <Input
              value={security.cspDirectives}
              onChange={(e) => updateSecurity({ cspDirectives: e.target.value })}
              placeholder={t('workflow.security.cspDirectivesPlaceholder')}
            />
          </div>
        )}

        {/* Rate Limiting */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="rate-limit-toggle" className="text-base">{t('workflow.security.rateLimit')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.security.rateLimitDesc')}</p>
          </div>
          <Switch
            id="rate-limit-toggle"
            checked={security.rateLimit}
            onCheckedChange={(checked) => updateSecurity({ rateLimit: checked })}
          />
        </div>

        {security.rateLimit && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t('workflow.security.rateLimitMax')}</Label>
              <Input
                type="number"
                value={security.rateLimitMax}
                onChange={(e) => updateSecurity({ rateLimitMax: parseInt(e.target.value) || 0 })}
                placeholder="100"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('workflow.security.rateLimitWindow')}</Label>
              <Input
                type="number"
                value={security.rateLimitWindow}
                onChange={(e) => updateSecurity({ rateLimitWindow: parseInt(e.target.value) || 0 })}
                placeholder="60"
              />
            </div>
          </div>
        )}

        {/* Input Validation */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="validation-toggle" className="text-base">{t('workflow.security.inputValidation')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.security.inputValidationDesc')}</p>
          </div>
          <Switch
            id="validation-toggle"
            checked={security.inputValidation}
            onCheckedChange={(checked) => updateSecurity({ inputValidation: checked })}
          />
        </div>

        {/* Compliance */}
        <div className="space-y-2">
          <Label>{t('workflow.security.compliance')}</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            {COMPLIANCE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleCompliance(option.value)}
                className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                  security.compliance.includes(option.value)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                    security.compliance.includes(option.value)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground'
                  }`}
                >
                  {security.compliance.includes(option.value) && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                <div>
                  <span className="font-medium text-sm">{option.label}</span>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={nextStep}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
