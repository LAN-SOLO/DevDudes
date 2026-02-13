'use client'

import { useState } from 'react'
import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LICENSE_OPTIONS } from '@/lib/workflow-pipeline/constants'
import { WORKFLOW_TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/workflow-pipeline/templates'
import type { WorkflowTemplateDefinition } from '@/lib/workflow-pipeline/templates'
import { ArrowRight, Plus, X, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StepMeta() {
  const { config, updateConfig, updateMeta, nextStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const [newTag, setNewTag] = useState('')
  const [showTemplates, setShowTemplates] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('employee-services')
  const [appliedTemplate, setAppliedTemplate] = useState<string | null>(null)

  const addTag = () => {
    const tag = newTag.trim().toLowerCase()
    if (!tag) return
    if (config.meta.tags.includes(tag)) return
    updateMeta({ tags: [...config.meta.tags, tag] })
    setNewTag('')
  }

  const removeTag = (tag: string) => {
    updateMeta({ tags: config.meta.tags.filter((t) => t !== tag) })
  }

  const applyTemplate = (template: WorkflowTemplateDefinition) => {
    updateConfig(template.config as Partial<typeof config>)
    setAppliedTemplate(template.id)
  }

  const filteredTemplates = WORKFLOW_TEMPLATES.filter((tpl) => tpl.category === activeCategory)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.meta.title')}</CardTitle>
        <CardDescription>
          {t('workflow.meta.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Library */}
        <div className="rounded-lg border">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex w-full items-center justify-between p-4 text-left"
          >
            <div>
              <p className="text-sm font-medium">{t('workflow.templates.title')}</p>
              <p className="text-xs text-muted-foreground">{t('workflow.templates.description')}</p>
            </div>
            {showTemplates ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showTemplates && (
            <div className="border-t p-4 space-y-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {TEMPLATE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                      activeCategory === cat.value
                        ? 'bg-rose-500 text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {t(`workflow.templates.categories.${cat.value === 'employee-services' ? 'employeeServices' : cat.value === 'it-admin' ? 'itAdmin' : 'businessOps'}`)}
                  </button>
                ))}
              </div>

              {/* Template Cards */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((tpl) => {
                  const isApplied = appliedTemplate === tpl.id
                  return (
                    <div
                      key={tpl.id}
                      className={cn(
                        'rounded-lg border p-3 transition-colors',
                        isApplied ? 'border-rose-500 bg-rose-500/5' : 'hover:border-muted-foreground/30'
                      )}
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{tpl.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{tpl.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {tpl.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="rounded bg-muted px-1.5 py-0.5 text-[10px]">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={isApplied ? 'default' : 'outline'}
                        onClick={() => applyTemplate(tpl)}
                        className="mt-2 w-full text-xs"
                        disabled={isApplied}
                      >
                        {isApplied ? (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            {t('workflow.templates.templateApplied')}
                          </>
                        ) : (
                          t('workflow.templates.applyTemplate')
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="meta-name">{t('workflow.meta.name')}</Label>
          <Input
            id="meta-name"
            placeholder={t('workflow.meta.namePlaceholder')}
            value={config.meta.name}
            onChange={(e) => updateMeta({ name: e.target.value })}
          />
        </div>

        {/* Version */}
        <div className="space-y-2">
          <Label htmlFor="meta-version">{t('workflow.meta.version')}</Label>
          <Input
            id="meta-version"
            placeholder="1.0.0"
            value={config.meta.version}
            onChange={(e) => updateMeta({ version: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="meta-description">{t('workflow.meta.descriptionLabel')}</Label>
          <Textarea
            id="meta-description"
            placeholder={t('workflow.meta.descriptionPlaceholder')}
            value={config.meta.description}
            onChange={(e) => updateMeta({ description: e.target.value })}
            className="min-h-[80px]"
          />
        </div>

        {/* Author */}
        <div className="space-y-2">
          <Label htmlFor="meta-author">{t('workflow.meta.author')}</Label>
          <Input
            id="meta-author"
            placeholder={t('workflow.meta.authorPlaceholder')}
            value={config.meta.author}
            onChange={(e) => updateMeta({ author: e.target.value })}
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>{t('workflow.meta.tags')}</Label>
          <div className="flex flex-wrap gap-2">
            {config.meta.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder={t('workflow.meta.tagPlaceholder')}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
            />
            <Button onClick={addTag} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* License */}
        <div className="space-y-2">
          <Label>{t('workflow.meta.license')}</Label>
          <Select
            value={config.meta.license}
            onValueChange={(val) => updateMeta({ license: val })}
            options={LICENSE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            placeholder={t('workflow.meta.licensePlaceholder')}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={nextStep}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
