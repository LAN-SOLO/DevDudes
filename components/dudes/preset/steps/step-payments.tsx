'use client'

import { useState } from 'react'
import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'
import { SectionToggle } from '@/components/dudes/shared/section-toggle'
import { PAYMENT_PROVIDER_OPTIONS, PLAN_INTERVAL_OPTIONS } from '@/lib/preset-pipeline/constants'

export function StepPayments() {
  const { config, updatePayments, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()
  const [newPlanName, setNewPlanName] = useState('')

  const addPlan = () => {
    if (!newPlanName.trim()) return
    const plan = { id: crypto.randomUUID(), name: newPlanName.trim(), price: 0, interval: 'monthly' }
    updatePayments({ plans: [...config.payments.plans, plan] })
    setNewPlanName('')
  }

  const removePlan = (id: string) => {
    updatePayments({ plans: config.payments.plans.filter((p) => p.id !== id) })
  }

  const updatePlan = (id: string, updates: { price?: number; interval?: string }) => {
    updatePayments({
      plans: config.payments.plans.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })
  }

  return (
    <div className="space-y-6">
      <SectionToggle
        enabled={config.payments.enabled}
        onToggle={(enabled) => updatePayments({ enabled })}
        title={t('preset.payments.title')}
        description={t('preset.payments.description')}
      >
        <div className="space-y-2">
          <Label>{t('preset.payments.provider')}</Label>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_PROVIDER_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updatePayments({ provider: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${config.payments.provider === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
                {opt.description && <p className="text-xs text-muted-foreground">{opt.description}</p>}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-2">
          <Label>{t('preset.payments.plans')}</Label>
          {config.payments.plans.length > 0 && (
            <div className="space-y-2">
              {config.payments.plans.map((plan) => (
                <div key={plan.id} className="flex items-center gap-2 rounded-lg border p-3">
                  <span className="text-sm font-medium flex-1">{plan.name}</span>
                  <Input type="number" value={plan.price} onChange={(e) => updatePlan(plan.id, { price: Number(e.target.value) })} className="w-20" />
                  <div className="flex gap-1">
                    {PLAN_INTERVAL_OPTIONS.map((opt) => (
                      <button key={opt.value} onClick={() => updatePlan(plan.id, { interval: opt.value })}
                        className={`rounded border px-2 py-1 text-xs ${plan.interval === opt.value ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => removePlan(plan.id)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input placeholder={t('preset.payments.addPlan')} value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPlan()} />
            <Button onClick={addPlan}><Plus className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label>{t('preset.payments.subscriptions')}</Label>
            <Switch checked={config.payments.subscriptions} onCheckedChange={(v) => updatePayments({ subscriptions: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('preset.payments.metered')}</Label>
            <Switch checked={config.payments.metered} onCheckedChange={(v) => updatePayments({ metered: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('preset.payments.invoicing')}</Label>
            <Switch checked={config.payments.invoicing} onCheckedChange={(v) => updatePayments({ invoicing: v })} />
          </div>
        </div>
      </SectionToggle>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(11)}>
          <ArrowLeft className="mr-2 h-4 w-4" />{t('preset.common.back')}
        </Button>
        <Button onClick={() => setCurrentStep(13)}>
          {t('preset.common.continue')}<ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
