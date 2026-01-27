import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileCode, ArrowRight } from 'lucide-react'

const templates = [
  {
    id: 'crm',
    name: 'CRM Starter',
    description: 'Customer management with contacts, deals, and pipeline tracking',
    features: ['Contacts', 'Deals', 'Pipeline', 'Reports'],
  },
  {
    id: 'inventory',
    name: 'Inventory Manager',
    description: 'Track products, stock levels, and warehouse locations',
    features: ['Products', 'Stock', 'Locations', 'Orders'],
  },
  {
    id: 'invoice',
    name: 'Invoice System',
    description: 'Create and manage invoices, track payments',
    features: ['Invoices', 'Clients', 'Payments', 'Reports'],
  },
  {
    id: 'project',
    name: 'Project Tracker',
    description: 'Manage projects, tasks, and team assignments',
    features: ['Projects', 'Tasks', 'Timeline', 'Team'],
  },
  {
    id: 'hr',
    name: 'HR Portal',
    description: 'Employee management, time off, and payroll',
    features: ['Employees', 'Time Off', 'Payroll', 'Documents'],
  },
  {
    id: 'helpdesk',
    name: 'Help Desk',
    description: 'Support ticket system with knowledge base',
    features: ['Tickets', 'Knowledge Base', 'SLA', 'Reports'],
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Templates</h2>
        <p className="text-muted-foreground">
          Start with a pre-built template and customize to your needs
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FileCode className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {template.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-muted px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full" variant="outline">
                Use Template
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
