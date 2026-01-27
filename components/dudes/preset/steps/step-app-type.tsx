'use client'

import { useWizard } from '../wizard-context'
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

const appTypes = [
  { id: 'crm', label: 'CRM', description: 'Manage customers and sales', icon: Users },
  { id: 'inventory', label: 'Inventory', description: 'Track products and stock', icon: Package },
  { id: 'invoicing', label: 'Invoicing', description: 'Billing and payments', icon: FileText },
  { id: 'hrm', label: 'HR Management', description: 'Employees and payroll', icon: UserCog },
  { id: 'project', label: 'Project Manager', description: 'Tasks and timelines', icon: FolderKanban },
  { id: 'helpdesk', label: 'Help Desk', description: 'Support tickets', icon: LifeBuoy },
  { id: 'ecommerce', label: 'E-commerce', description: 'Online store', icon: ShoppingCart },
  { id: 'analytics', label: 'Analytics', description: 'Reports and dashboards', icon: BarChart3 },
]

const targetUsers = [
  { id: 'internal', label: 'Internal Team', description: 'Employees only' },
  { id: 'customers', label: 'Customers', description: 'External users' },
  { id: 'both', label: 'Both', description: 'Internal and external' },
]

export function StepAppType() {
  const { config, updateConfig, setCurrentStep } = useWizard()

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
        <CardTitle>What type of app do you need?</CardTitle>
        <CardDescription>
          Select the category that best matches your requirements
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
          <p className="text-sm font-medium">Who will use this app?</p>
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
            Back
          </Button>
          <Button onClick={() => setCurrentStep(3)} disabled={!canContinue}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
