'use client'

import { useWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

export function StepFeatures() {
  const { config, updateConfig, setCurrentStep } = useWizard()
  const { t } = useTranslation()

  const featuresByType: Record<string, Array<{ id: string; label: string; description: string }>> = {
    crm: [
      { id: 'contacts', label: t('preset.features.crm.contacts'), description: t('preset.features.crm.contactsDesc') },
      { id: 'deals', label: t('preset.features.crm.deals'), description: t('preset.features.crm.dealsDesc') },
      { id: 'activities', label: t('preset.features.crm.activities'), description: t('preset.features.crm.activitiesDesc') },
      { id: 'reports', label: t('preset.features.crm.reports'), description: t('preset.features.crm.reportsDesc') },
      { id: 'email', label: t('preset.features.crm.email'), description: t('preset.features.crm.emailDesc') },
      { id: 'tasks', label: t('preset.features.crm.tasks'), description: t('preset.features.crm.tasksDesc') },
    ],
    inventory: [
      { id: 'products', label: t('preset.features.inventory.products'), description: t('preset.features.inventory.productsDesc') },
      { id: 'stock', label: t('preset.features.inventory.stock'), description: t('preset.features.inventory.stockDesc') },
      { id: 'orders', label: t('preset.features.inventory.orders'), description: t('preset.features.inventory.ordersDesc') },
      { id: 'suppliers', label: t('preset.features.inventory.suppliers'), description: t('preset.features.inventory.suppliersDesc') },
      { id: 'locations', label: t('preset.features.inventory.locations'), description: t('preset.features.inventory.locationsDesc') },
      { id: 'alerts', label: t('preset.features.inventory.alerts'), description: t('preset.features.inventory.alertsDesc') },
    ],
    invoicing: [
      { id: 'invoices', label: t('preset.features.invoicing.invoices'), description: t('preset.features.invoicing.invoicesDesc') },
      { id: 'payments', label: t('preset.features.invoicing.payments'), description: t('preset.features.invoicing.paymentsDesc') },
      { id: 'recurring', label: t('preset.features.invoicing.recurring'), description: t('preset.features.invoicing.recurringDesc') },
      { id: 'expenses', label: t('preset.features.invoicing.expenses'), description: t('preset.features.invoicing.expensesDesc') },
      { id: 'reports', label: t('preset.features.invoicing.reports'), description: t('preset.features.invoicing.reportsDesc') },
      { id: 'clients', label: t('preset.features.invoicing.clients'), description: t('preset.features.invoicing.clientsDesc') },
    ],
    default: [
      { id: 'dashboard', label: t('preset.features.default.dashboard'), description: t('preset.features.default.dashboardDesc') },
      { id: 'search', label: t('preset.features.default.search'), description: t('preset.features.default.searchDesc') },
      { id: 'notifications', label: t('preset.features.default.notifications'), description: t('preset.features.default.notificationsDesc') },
      { id: 'export', label: t('preset.features.default.export'), description: t('preset.features.default.exportDesc') },
      { id: 'audit', label: t('preset.features.default.audit'), description: t('preset.features.default.auditDesc') },
      { id: 'api', label: t('preset.features.default.api'), description: t('preset.features.default.apiDesc') },
    ],
  }

  const features = featuresByType[config.appType] || featuresByType.default

  const toggleFeature = (id: string) => {
    const current = config.features
    if (current.includes(id)) {
      updateConfig({ features: current.filter((f) => f !== id) })
    } else {
      updateConfig({ features: [...current, id] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.features.title')}</CardTitle>
        <CardDescription>
          {t('preset.features.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                config.features.includes(feature.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                  config.features.includes(feature.id)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground'
                }`}
              >
                {config.features.includes(feature.id) && (
                  <Check className="h-3 w-3" />
                )}
              </div>
              <div>
                <span className="font-medium text-sm">{feature.label}</span>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t('preset.features.customFeatures')}</p>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={t('preset.features.customFeaturesPlaceholder')}
            value={config.customFeatures}
            onChange={(e) => updateConfig({ customFeatures: e.target.value })}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(4)}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
