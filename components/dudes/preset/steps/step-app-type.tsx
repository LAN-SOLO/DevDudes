'use client'

import { useWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Users,
  Package,
  FileText,
  UserCog,
  FolderKanban,
  LifeBuoy,
  ShoppingCart,
  BarChart3
} from 'lucide-react'

export function StepAppType() {
  const { config, updateConfig, setCurrentStep } = useWizard()
  const { t } = useTranslation()

  const appTypes = [
    { id: 'crm', label: t('preset.appType.types.crm'), description: t('preset.appType.types.crmDesc'), icon: Users },
    { id: 'inventory', label: t('preset.appType.types.inventory'), description: t('preset.appType.types.inventoryDesc'), icon: Package },
    { id: 'invoicing', label: t('preset.appType.types.invoicing'), description: t('preset.appType.types.invoicingDesc'), icon: FileText },
    { id: 'hrm', label: t('preset.appType.types.hrm'), description: t('preset.appType.types.hrmDesc'), icon: UserCog },
    { id: 'project', label: t('preset.appType.types.project'), description: t('preset.appType.types.projectDesc'), icon: FolderKanban },
    { id: 'helpdesk', label: t('preset.appType.types.helpdesk'), description: t('preset.appType.types.helpdeskDesc'), icon: LifeBuoy },
    { id: 'ecommerce', label: t('preset.appType.types.ecommerce'), description: t('preset.appType.types.ecommerceDesc'), icon: ShoppingCart },
    { id: 'analytics', label: t('preset.appType.types.analytics'), description: t('preset.appType.types.analyticsDesc'), icon: BarChart3 },
  ]

  const targetUsers = [
    { id: 'internal', label: t('preset.appType.targetUsers.internal'), description: t('preset.appType.targetUsers.internalDesc') },
    { id: 'customers', label: t('preset.appType.targetUsers.customers'), description: t('preset.appType.targetUsers.customersDesc') },
    { id: 'both', label: t('preset.appType.targetUsers.both'), description: t('preset.appType.targetUsers.bothDesc') },
  ]

  const canContinue = config.appType && config.targetUsers.length > 0

  const toggleTargetUser = (id: string) => {
    const current = config.targetUsers
    if (current.includes(id)) {
      updateConfig({ targetUsers: current.filter((t) => t !== id) })
    } else {
      updateConfig({ targetUsers: [...current, id] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.appType.title')}</CardTitle>
        <CardDescription>
          {t('preset.appType.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {appTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => updateConfig({ appType: type.id })}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                  config.appType === type.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <type.icon className="h-6 w-6" />
                <span className="font-medium text-sm">{type.label}</span>
                <span className="text-xs text-muted-foreground">{type.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t('preset.appType.whoWillUse')}</p>
          <div className="grid grid-cols-3 gap-3">
            {targetUsers.map((target) => (
              <button
                key={target.id}
                onClick={() => toggleTargetUser(target.id)}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  config.targetUsers.includes(target.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium text-sm">{target.label}</span>
                <p className="text-xs text-muted-foreground">{target.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(3)} disabled={!canContinue}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
