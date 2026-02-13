'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { Select } from '@/components/ui/select'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  AI_FEATURE_OPTIONS,
  AI_PROVIDER_OPTIONS,
} from '@/lib/website-pipeline/constants'

export function StepAiNotes() {
  const { config, updateConfig, setCurrentStep, setIsComplete, nextStep } = useWebsiteWizard()
  const { t } = useTranslation()

  const handleToggleAiFeature = (value: string) => {
    const current = config.aiFeatures
    if (current.includes(value)) {
      updateConfig({ aiFeatures: current.filter((v) => v !== value) })
    } else {
      updateConfig({ aiFeatures: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.aiNotes.title')}</CardTitle>
        <CardDescription>{t('website.aiNotes.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.aiNotes.aiFeatures')}</label>
          <OptionGrid
            options={AI_FEATURE_OPTIONS}
            selected={config.aiFeatures}
            onSelect={handleToggleAiFeature}
            mode="multi"
          />
        </div>

        {config.aiFeatures.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.aiNotes.aiProvider')}</label>
            <Select
              value={config.aiProvider}
              onValueChange={(v) => updateConfig({ aiProvider: v })}
              options={AI_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.aiNotes.detailedDescription')}</label>
          <Textarea
            value={config.detailedDescription}
            onChange={(e) => updateConfig({ detailedDescription: e.target.value })}
            placeholder={t('website.aiNotes.detailedDescriptionPlaceholder')}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.aiNotes.targetPages')}</label>
          <Textarea
            value={config.targetPages}
            onChange={(e) => updateConfig({ targetPages: e.target.value })}
            placeholder={t('website.aiNotes.targetPagesPlaceholder')}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.aiNotes.referenceWebsites')}</label>
          <Textarea
            value={config.referenceWebsites}
            onChange={(e) => updateConfig({ referenceWebsites: e.target.value })}
            placeholder={t('website.aiNotes.referenceWebsitesPlaceholder')}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.aiNotes.constraints')}</label>
          <Textarea
            value={config.constraints}
            onChange={(e) => updateConfig({ constraints: e.target.value })}
            placeholder={t('website.aiNotes.constraintsPlaceholder')}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.aiNotes.additionalNotes')}</label>
          <Textarea
            value={config.additionalNotes}
            onChange={(e) => updateConfig({ additionalNotes: e.target.value })}
            placeholder={t('website.aiNotes.additionalNotesPlaceholder')}
            rows={3}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(16)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          {nextStep(17) ? (
            <Button onClick={() => setCurrentStep(nextStep(17)!)}>
              {t('website.common.next')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => setIsComplete(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              {t('website.aiNotes.complete')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
