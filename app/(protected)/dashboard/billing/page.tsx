'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { useTranslation } from '@/lib/i18n/language-provider'
import {
  Check,
  Zap,
  Building2,
  Rocket,
  CreditCard,
  Download,
  Calendar,
  AlertCircle,
  Loader2,
} from 'lucide-react'

interface Plan {
  id: string
  nameKey: string
  price: number
  periodKey: string
  descriptionKey: string
  featureKeys: string[]
  popular?: boolean
  icon: typeof Zap
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
}

const plans: Plan[] = [
  {
    id: 'free',
    nameKey: 'billing.plans.free.name',
    price: 0,
    periodKey: 'billing.plans.free.period',
    descriptionKey: 'billing.plans.free.description',
    icon: Zap,
    featureKeys: [
      'billing.planFeatures.threeProjects',
      'billing.planFeatures.basicTemplates',
      'billing.planFeatures.communitySupport',
      'billing.planFeatures.oneDatabase',
      'billing.planFeatures.manualDeployment',
    ],
  },
  {
    id: 'pro',
    nameKey: 'billing.plans.pro.name',
    price: 29,
    periodKey: 'billing.plans.pro.period',
    descriptionKey: 'billing.plans.pro.description',
    icon: Rocket,
    popular: true,
    featureKeys: [
      'billing.planFeatures.unlimitedProjects',
      'billing.planFeatures.allTemplates',
      'billing.planFeatures.prioritySupport',
      'billing.planFeatures.fiveDatabases',
      'billing.planFeatures.autoDeployment',
      'billing.planFeatures.customDomains',
      'billing.planFeatures.teamCollab',
      'billing.planFeatures.apiAccess',
    ],
  },
  {
    id: 'enterprise',
    nameKey: 'billing.plans.enterprise.name',
    price: 99,
    periodKey: 'billing.plans.enterprise.period',
    descriptionKey: 'billing.plans.enterprise.description',
    icon: Building2,
    featureKeys: [
      'billing.planFeatures.everythingInPro',
      'billing.planFeatures.unlimitedTeam',
      'billing.planFeatures.unlimitedConnections',
      'billing.planFeatures.customIntegrations',
      'billing.planFeatures.dedicatedSupport',
      'billing.planFeatures.slaGuarantee',
      'billing.planFeatures.onPremise',
      'billing.planFeatures.ssoSaml',
    ],
  },
]

const invoices: Invoice[] = [
  { id: 'INV-001', date: '2024-01-15', amount: 0, status: 'paid' },
]

export default function BillingPage() {
  const { addToast } = useToast()
  const { t } = useTranslation()
  const [currentPlan] = useState('free')
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  const handleUpgrade = async (planId: string) => {
    if (planId === currentPlan) return

    setIsProcessing(planId)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(null)

    const plan = plans.find(p => p.id === planId)
    addToast({
      type: 'info',
      title: t('billing.toasts.comingSoonTitle'),
      description: t('billing.toasts.comingSoonDesc', { plan: plan ? t(plan.nameKey) : planId }),
    })
  }

  const handleDownloadInvoice = (invoice: Invoice) => {
    addToast({
      type: 'info',
      title: t('billing.toasts.downloadingTitle'),
      description: t('billing.toasts.downloadingDesc', { id: invoice.id }),
    })
  }

  const currentPlanData = plans.find(p => p.id === currentPlan)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('billing.title')}</h2>
        <p className="text-muted-foreground">
          {t('billing.subtitle')}
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>{t('billing.currentPlan')}</CardTitle>
          <CardDescription>{t('billing.currentPlanDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                {currentPlanData && <currentPlanData.icon className="h-6 w-6 text-primary" />}
              </div>
              <div>
                <p className="font-semibold text-lg">{currentPlanData ? t(currentPlanData.nameKey) : ''} Plan</p>
                <p className="text-sm text-muted-foreground">
                  {currentPlanData?.price === 0
                    ? t('billing.freeForever')
                    : `$${currentPlanData?.price}/${currentPlanData ? t(currentPlanData.periodKey) : ''}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">Active</p>
              <p className="text-xs text-muted-foreground">
                {currentPlan === 'free' ? t('billing.noBillingCycle') : 'Renews Jan 15, 2025'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{t('billing.usageThisMonth')}</CardTitle>
          <CardDescription>{t('billing.usageDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Projects</p>
                <p className="text-sm text-muted-foreground">0 / 3</p>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Connections</p>
                <p className="text-sm text-muted-foreground">1 / 1</p>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">API Calls</p>
                <p className="text-sm text-muted-foreground">0 / 1,000</p>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
          {currentPlan === 'free' && (
            <div className="mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-900 p-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-700 dark:text-yellow-400">
                {t('billing.usageWarning')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('billing.availablePlans')}</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${
                plan.popular ? 'border-primary shadow-md' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {t('billing.mostPopular')}
                  </span>
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <plan.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{t(plan.nameKey)}</CardTitle>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">
                    {plan.price === 0 ? t('billing.plans.free.name') : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/{t(plan.periodKey)}</span>
                  )}
                </div>
                <CardDescription>{t(plan.descriptionKey)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.featureKeys.map((featureKey) => (
                    <li key={featureKey} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.id === currentPlan ? 'outline' : plan.popular ? 'default' : 'outline'}
                  disabled={plan.id === currentPlan || isProcessing !== null}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {isProcessing === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : plan.id === currentPlan
                      ? t('billing.currentPlanBtn')
                      : plan.price === 0
                        ? 'Downgrade'
                        : t('common.upgrade')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('billing.paymentMethod')}</CardTitle>
              <CardDescription>{t('billing.paymentMethodDesc')}</CardDescription>
            </div>
            <Button variant="outline" onClick={() => addToast({ type: 'info', title: t('billing.toasts.comingSoonTitle'), description: t('billing.toasts.paymentMethodComingSoon') })}>
              <CreditCard className="mr-2 h-4 w-4" />
              {t('billing.addCard')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {t('billing.noPaymentMethod')}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Add a card to upgrade your plan
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('billing.billingHistory')}</CardTitle>
              <CardDescription>{t('billing.billingHistoryDesc')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No invoices yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">
                        {invoice.amount === 0 ? 'Free' : `$${invoice.amount}`}
                      </p>
                      <p className={`text-xs ${
                        invoice.status === 'paid'
                          ? 'text-green-600'
                          : invoice.status === 'pending'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                      }`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice(invoice)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
