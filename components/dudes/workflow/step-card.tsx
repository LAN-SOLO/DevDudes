'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { GripVertical, Trash2, ChevronDown, Plus, X, FileText, Link2, Server } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useWorkflowWizard } from './workflow-context'
import type { WorkflowStep, WorkflowTemplate, WorkflowLink, WorkflowService } from '@/lib/validations/workflow'
import { useTranslation } from '@/lib/i18n/language-provider'

interface StepCardProps {
  step: WorkflowStep
  stepNumber: number
}

const linkTypeOptions = [
  { value: 'reference', label: 'Reference' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'api', label: 'API' },
  { value: 'external', label: 'External' },
  { value: 'internal', label: 'Internal' },
]

const serviceTypeOptions = [
  { value: 'rest', label: 'REST' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'webhook', label: 'Webhook' },
  { value: 'database', label: 'Database' },
  { value: 'queue', label: 'Queue' },
  { value: 'storage', label: 'Storage' },
]

const authTypeOptions = [
  { value: 'none', label: 'None' },
  { value: 'api-key', label: 'API Key' },
  { value: 'oauth', label: 'OAuth' },
  { value: 'bearer', label: 'Bearer' },
  { value: 'basic', label: 'Basic' },
]

export function StepCard({ step, stepNumber }: StepCardProps) {
  const { t } = useTranslation()
  const { updateStep, removeStep, addTemplate, removeTemplate, addLink, removeLink, addService, removeService } = useWorkflowWizard()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  }

  // New item forms state
  const [newLink, setNewLink] = useState({ label: '', url: '', type: 'reference' as WorkflowLink['type'] })
  const [newService, setNewService] = useState({ name: '', type: 'rest' as WorkflowService['type'], endpoint: '', authType: 'none' as WorkflowService['authType'] })

  const handleAddTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const template: Omit<WorkflowTemplate, 'id'> = {
        name: file.name,
        type: getFileType(file.name),
        size: file.size,
      }
      addTemplate(step.id, template)
    })

    e.target.value = ''
  }

  const handleAddLink = () => {
    if (!newLink.label.trim() || !newLink.url.trim()) return
    addLink(step.id, {
      label: newLink.label.trim(),
      url: newLink.url.trim(),
      type: newLink.type,
    })
    setNewLink({ label: '', url: '', type: 'reference' })
  }

  const handleAddService = () => {
    if (!newService.name.trim()) return
    addService(step.id, {
      name: newService.name.trim(),
      type: newService.type,
      endpoint: newService.endpoint.trim() || undefined,
      authType: newService.authType,
    })
    setNewService({ name: '', type: 'rest', endpoint: '', authType: 'none' })
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'transition-shadow',
        isDragging && 'shadow-lg opacity-90 z-50'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
          {stepNumber}
        </span>

        <Input
          value={step.title}
          onChange={(e) => updateStep(step.id, { title: e.target.value })}
          placeholder={t('workflow.stepBuilder.stepTitlePlaceholder')}
          className="flex-1 font-medium"
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateStep(step.id, { isExpanded: !step.isExpanded })}
        >
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              step.isExpanded && 'rotate-180'
            )}
          />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeStep(step.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Collapsible Content */}
      {step.isExpanded && (
        <CardContent className="p-4 space-y-4">
          {/* Description */}
          <div className="space-y-2">
            <Label>{t('workflow.stepBuilder.description')}</Label>
            <Textarea
              value={step.description}
              onChange={(e) => updateStep(step.id, { description: e.target.value })}
              placeholder={t('workflow.stepBuilder.descriptionPlaceholder')}
              rows={2}
            />
          </div>

          {/* Tabs for Templates, Links, Services */}
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="templates" className="gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">{t('workflow.stepBuilder.templates')}</span>
                <span className="text-xs text-muted-foreground">({step.templates.length})</span>
              </TabsTrigger>
              <TabsTrigger value="links" className="gap-2">
                <Link2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t('workflow.stepBuilder.links')}</span>
                <span className="text-xs text-muted-foreground">({step.links.length})</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="gap-2">
                <Server className="h-4 w-4" />
                <span className="hidden sm:inline">{t('workflow.stepBuilder.services')}</span>
                <span className="text-xs text-muted-foreground">({step.services.length})</span>
              </TabsTrigger>
            </TabsList>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-3">
              {step.templates.length > 0 && (
                <div className="space-y-2">
                  {step.templates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between rounded-lg border p-2"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{template.name}</span>
                        {template.size && (
                          <span className="text-xs text-muted-foreground">
                            ({formatBytes(template.size)})
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeTemplate(step.id, template.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center rounded-lg border border-dashed p-4">
                <label className="flex cursor-pointer flex-col items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Plus className="h-5 w-5" />
                  <span>{t('workflow.stepBuilder.addTemplate')}</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleAddTemplate}
                  />
                </label>
              </div>
            </TabsContent>

            {/* Links Tab */}
            <TabsContent value="links" className="space-y-3">
              {step.links.length > 0 && (
                <div className="space-y-2">
                  {step.links.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between rounded-lg border p-2"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Link2 className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <span className="text-sm font-medium">{link.label}</span>
                        <span className="text-xs text-muted-foreground truncate">
                          {link.url}
                        </span>
                        <span className="text-xs rounded bg-muted px-1.5 py-0.5">
                          {link.type}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeLink(step.id, link.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid gap-2 sm:grid-cols-4">
                <Input
                  placeholder={t('workflow.stepBuilder.linkLabel')}
                  value={newLink.label}
                  onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                  className="sm:col-span-1"
                />
                <Input
                  placeholder={t('workflow.stepBuilder.linkUrl')}
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="sm:col-span-2"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                />
                <div className="flex gap-2">
                  <Select
                    value={newLink.type}
                    onValueChange={(value) => setNewLink({ ...newLink, type: value as WorkflowLink['type'] })}
                    options={linkTypeOptions}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleAddLink}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-3">
              {step.services.length > 0 && (
                <div className="space-y-2">
                  {step.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between rounded-lg border p-2"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Server className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <span className="text-sm font-medium">{service.name}</span>
                        <span className="text-xs rounded bg-muted px-1.5 py-0.5">
                          {service.type}
                        </span>
                        <span className="text-xs rounded bg-muted px-1.5 py-0.5">
                          {service.authType}
                        </span>
                        {service.endpoint && (
                          <span className="text-xs text-muted-foreground truncate">
                            {service.endpoint}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeService(step.id, service.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid gap-2 sm:grid-cols-5">
                <Input
                  placeholder={t('workflow.stepBuilder.serviceName')}
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
                <Select
                  value={newService.type}
                  onValueChange={(value) => setNewService({ ...newService, type: value as WorkflowService['type'] })}
                  options={serviceTypeOptions}
                />
                <Input
                  placeholder={t('workflow.stepBuilder.serviceEndpoint')}
                  value={newService.endpoint}
                  onChange={(e) => setNewService({ ...newService, endpoint: e.target.value })}
                  className="sm:col-span-2"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddService()}
                />
                <div className="flex gap-2">
                  <Select
                    value={newService.authType}
                    onValueChange={(value) => setNewService({ ...newService, authType: value as WorkflowService['authType'] })}
                    options={authTypeOptions}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleAddService}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  )
}

// Helper functions
function getFileType(filename: string): WorkflowTemplate['type'] {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  if (['doc', 'docx', 'pdf', 'txt', 'md'].includes(ext)) return 'document'
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'spreadsheet'
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return 'image'
  if (['js', 'ts', 'jsx', 'tsx', 'py', 'go', 'rs', 'json', 'yaml', 'yml'].includes(ext)) return 'code'
  return 'other'
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}
