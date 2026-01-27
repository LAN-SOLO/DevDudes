'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileCode, ArrowRight, Sparkles, Eye, X, Check, Loader2 } from 'lucide-react'
import { savePresetConfig } from '@/app/actions/pipeline'
import type { PresetConfig } from '@/app/actions/pipeline'

interface Template {
  id: string
  name: string
  description: string
  features: string[]
  category: string
  presetConfig: Partial<PresetConfig>
}

const templates: Template[] = [
  {
    id: 'crm',
    name: 'CRM Starter',
    description: 'Customer management with contacts, deals, and pipeline tracking',
    features: ['Contacts', 'Deals', 'Pipeline', 'Reports'],
    category: 'Sales',
    presetConfig: {
      appType: 'crm',
      industry: 'Sales & Marketing',
      features: ['authentication', 'dashboard', 'search', 'notifications', 'export'],
      targetUsers: ['sales-rep', 'manager', 'admin'],
      entities: [
        { name: 'Contact', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'phone', type: 'text', required: false },
          { name: 'company', type: 'text', required: false },
        ]},
        { name: 'Deal', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'value', type: 'number', required: true },
          { name: 'stage', type: 'select', required: true },
          { name: 'closeDate', type: 'date', required: false },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'manager', 'user'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#3b82f6',
      integrations: ['email', 'calendar'],
      deployTarget: 'vercel',
      region: 'us-east',
    },
  },
  {
    id: 'inventory',
    name: 'Inventory Manager',
    description: 'Track products, stock levels, and warehouse locations',
    features: ['Products', 'Stock', 'Locations', 'Orders'],
    category: 'Operations',
    presetConfig: {
      appType: 'inventory',
      industry: 'Retail & E-commerce',
      features: ['authentication', 'dashboard', 'search', 'export', 'reports'],
      targetUsers: ['warehouse-staff', 'manager', 'admin'],
      entities: [
        { name: 'Product', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'sku', type: 'text', required: true },
          { name: 'price', type: 'number', required: true },
          { name: 'quantity', type: 'number', required: true },
        ]},
        { name: 'Location', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'address', type: 'text', required: false },
          { name: 'capacity', type: 'number', required: true },
        ]},
      ],
      authMethods: ['email'],
      roles: ['admin', 'manager', 'staff'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#10b981',
      integrations: ['barcode'],
      deployTarget: 'vercel',
      region: 'us-east',
    },
  },
  {
    id: 'invoice',
    name: 'Invoice System',
    description: 'Create and manage invoices, track payments',
    features: ['Invoices', 'Clients', 'Payments', 'Reports'],
    category: 'Finance',
    presetConfig: {
      appType: 'invoicing',
      industry: 'Finance & Accounting',
      features: ['authentication', 'dashboard', 'payments', 'export', 'reports'],
      targetUsers: ['accountant', 'manager', 'admin'],
      entities: [
        { name: 'Client', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'address', type: 'text', required: false },
        ]},
        { name: 'Invoice', fields: [
          { name: 'number', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'dueDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'accountant'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#8b5cf6',
      integrations: ['stripe', 'email'],
      deployTarget: 'vercel',
      region: 'us-east',
    },
  },
  {
    id: 'project',
    name: 'Project Tracker',
    description: 'Manage projects, tasks, and team assignments',
    features: ['Projects', 'Tasks', 'Timeline', 'Team'],
    category: 'Productivity',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Technology',
      features: ['authentication', 'dashboard', 'notifications', 'search', 'comments'],
      targetUsers: ['team-member', 'manager', 'admin'],
      entities: [
        { name: 'Project', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'startDate', type: 'date', required: true },
          { name: 'endDate', type: 'date', required: false },
        ]},
        { name: 'Task', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'status', type: 'select', required: true },
          { name: 'priority', type: 'select', required: true },
          { name: 'dueDate', type: 'date', required: false },
        ]},
      ],
      authMethods: ['email', 'google', 'github'],
      roles: ['admin', 'manager', 'member'],
      layout: 'sidebar',
      theme: 'system',
      primaryColor: '#f59e0b',
      integrations: ['slack', 'calendar'],
      deployTarget: 'vercel',
      region: 'us-east',
    },
  },
  {
    id: 'hr',
    name: 'HR Portal',
    description: 'Employee management, time off, and payroll',
    features: ['Employees', 'Time Off', 'Payroll', 'Documents'],
    category: 'Human Resources',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Human Resources',
      features: ['authentication', 'dashboard', 'file-uploads', 'notifications', 'reports'],
      targetUsers: ['employee', 'hr-manager', 'admin'],
      entities: [
        { name: 'Employee', fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'department', type: 'text', required: true },
          { name: 'startDate', type: 'date', required: true },
        ]},
        { name: 'TimeOff', fields: [
          { name: 'type', type: 'select', required: true },
          { name: 'startDate', type: 'date', required: true },
          { name: 'endDate', type: 'date', required: true },
          { name: 'status', type: 'select', required: true },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'hr', 'employee'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#ec4899',
      integrations: ['calendar', 'email'],
      deployTarget: 'vercel',
      region: 'us-east',
    },
  },
  {
    id: 'helpdesk',
    name: 'Help Desk',
    description: 'Support ticket system with knowledge base',
    features: ['Tickets', 'Knowledge Base', 'SLA', 'Reports'],
    category: 'Support',
    presetConfig: {
      appType: 'dashboard',
      industry: 'Customer Support',
      features: ['authentication', 'dashboard', 'search', 'notifications', 'comments'],
      targetUsers: ['customer', 'support-agent', 'admin'],
      entities: [
        { name: 'Ticket', fields: [
          { name: 'subject', type: 'text', required: true },
          { name: 'description', type: 'text', required: true },
          { name: 'priority', type: 'select', required: true },
          { name: 'status', type: 'select', required: true },
        ]},
        { name: 'Article', fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'content', type: 'text', required: true },
          { name: 'category', type: 'text', required: true },
        ]},
      ],
      authMethods: ['email', 'google'],
      roles: ['admin', 'agent', 'customer'],
      layout: 'sidebar',
      theme: 'light',
      primaryColor: '#06b6d4',
      integrations: ['email', 'slack'],
      deployTarget: 'vercel',
      region: 'us-east',
    },
  },
]

const categoryColors: Record<string, string> = {
  'Sales': 'bg-blue-100 text-blue-700',
  'Operations': 'bg-green-100 text-green-700',
  'Finance': 'bg-purple-100 text-purple-700',
  'Productivity': 'bg-yellow-100 text-yellow-700',
  'Human Resources': 'bg-pink-100 text-pink-700',
  'Support': 'bg-cyan-100 text-cyan-700',
}

export default function TemplatesPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [projectName, setProjectName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleUseTemplate = async () => {
    if (!selectedTemplate || !projectName) return

    setIsCreating(true)

    const config: PresetConfig = {
      businessName: projectName,
      description: selectedTemplate.description,
      ...selectedTemplate.presetConfig,
      customFeatures: '',
    } as PresetConfig

    const result = await savePresetConfig(null, config)

    if (result.error) {
      setIsCreating(false)
      return
    }

    // Navigate to Combo Dude with the new project
    router.push(`/dashboard/pipeline/combo?project=${result.projectId}`)
  }

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
          <Card key={template.id} className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <FileCode className="h-5 w-5 text-primary" />
                <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[template.category]}`}>
                  {template.category}
                </span>
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
              <div className="text-xs text-muted-foreground space-y-1">
                <p>{template.presetConfig.entities?.length || 0} data models</p>
                <p>{template.presetConfig.features?.length || 0} features included</p>
              </div>
            </CardContent>
            <div className="p-6 pt-0 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setSelectedTemplate(template)}
              >
                <Eye className="mr-1 h-4 w-4" />
                Preview
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => {
                  setSelectedTemplate(template)
                  setProjectName(template.name)
                }}
              >
                <Sparkles className="mr-1 h-4 w-4" />
                Use
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Template Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedTemplate.name}</CardTitle>
                  <CardDescription>{selectedTemplate.description}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedTemplate(null)
                    setProjectName('')
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Features */}
              <div>
                <p className="text-sm font-medium mb-2">Included Features</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.presetConfig.features?.map((f) => (
                    <span key={f} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data Models */}
              <div>
                <p className="text-sm font-medium mb-2">Data Models</p>
                <div className="space-y-2">
                  {selectedTemplate.presetConfig.entities?.map((entity) => (
                    <div key={entity.name} className="rounded border p-3">
                      <p className="font-medium text-sm">{entity.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {entity.fields.map(f => f.name).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Name Input */}
              <div className="border-t pt-4">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter your project name"
                  className="mt-2"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedTemplate(null)
                    setProjectName('')
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUseTemplate}
                  disabled={!projectName || isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Start with Template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
