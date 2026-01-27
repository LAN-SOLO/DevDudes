'use client'

import { useWizard } from '../wizard-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const featuresByType: Record<string, Array<{ id: string; label: string; description: string }>> = {
  crm: [
    { id: 'contacts', label: 'Contact Management', description: 'Store and manage customer contacts' },
    { id: 'deals', label: 'Deal Pipeline', description: 'Track sales opportunities' },
    { id: 'activities', label: 'Activity Tracking', description: 'Log calls, emails, meetings' },
    { id: 'reports', label: 'Sales Reports', description: 'Analytics and forecasting' },
    { id: 'email', label: 'Email Integration', description: 'Send emails from the app' },
    { id: 'tasks', label: 'Task Management', description: 'Assign and track tasks' },
  ],
  inventory: [
    { id: 'products', label: 'Product Catalog', description: 'Manage product information' },
    { id: 'stock', label: 'Stock Tracking', description: 'Real-time inventory levels' },
    { id: 'orders', label: 'Order Management', description: 'Process purchase orders' },
    { id: 'suppliers', label: 'Supplier Management', description: 'Manage vendor relationships' },
    { id: 'locations', label: 'Multi-location', description: 'Track across warehouses' },
    { id: 'alerts', label: 'Low Stock Alerts', description: 'Automatic notifications' },
  ],
  invoicing: [
    { id: 'invoices', label: 'Invoice Creation', description: 'Generate professional invoices' },
    { id: 'payments', label: 'Payment Tracking', description: 'Track payment status' },
    { id: 'recurring', label: 'Recurring Invoices', description: 'Automate billing cycles' },
    { id: 'expenses', label: 'Expense Tracking', description: 'Record business expenses' },
    { id: 'reports', label: 'Financial Reports', description: 'Revenue and profit analysis' },
    { id: 'clients', label: 'Client Portal', description: 'Customer self-service' },
  ],
  default: [
    { id: 'dashboard', label: 'Dashboard', description: 'Overview and analytics' },
    { id: 'search', label: 'Global Search', description: 'Find anything quickly' },
    { id: 'notifications', label: 'Notifications', description: 'In-app alerts' },
    { id: 'export', label: 'Data Export', description: 'CSV and PDF exports' },
    { id: 'audit', label: 'Audit Log', description: 'Track all changes' },
    { id: 'api', label: 'API Access', description: 'REST API for integrations' },
  ],
}

export function StepFeatures() {
  const { config, updateConfig, setCurrentStep } = useWizard()

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
        <CardTitle>Select features</CardTitle>
        <CardDescription>
          Choose the features you want in your application
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
          <p className="text-sm font-medium">Custom features (optional)</p>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Describe any additional features you need..."
            value={config.customFeatures}
            onChange={(e) => updateConfig({ customFeatures: e.target.value })}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => setCurrentStep(4)}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
