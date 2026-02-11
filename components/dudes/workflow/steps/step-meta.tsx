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
import { ArrowRight, Plus, X } from 'lucide-react'

export function StepMeta() {
  const { config, updateMeta, nextStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const [newTag, setNewTag] = useState('')

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.meta.title')}</CardTitle>
        <CardDescription>
          {t('workflow.meta.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
