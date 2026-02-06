'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWorkflowWizard } from './workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Loader2, ArrowRight, Download, Edit, AlertCircle } from 'lucide-react'
import { saveWorkflowConfig } from '@/app/actions/pipeline'

export function WorkflowComplete() {
  const router = useRouter()
  const { config, setIsComplete, setCurrentStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSaveAndContinue = async () => {
    setIsSaving(true)
    setError(null)

    const result = await saveWorkflowConfig(null, config)

    if (result.error) {
      setError(result.error)
      setIsSaving(false)
      return
    }

    setIsSaving(false)
    router.push(`/dashboard/pipeline/combo?project=${result.projectId}`)
  }

  const handleExportConfig = () => {
    const json = JSON.stringify(config, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'workflow-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleEdit = () => {
    setIsComplete(false)
    setCurrentStep(1)
  }

  const enabledIntegrations = config.aiIntegrations.filter((i) => i.enabled)

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">{t('workflow.complete.title')}</CardTitle>
        <CardDescription>
          {t('workflow.complete.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Error Display */}
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">{t('workflow.complete.failedToSave')}</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {/* Config Summary */}
        <div className="rounded-lg bg-muted p-4 space-y-3">
          {/* Workflow Steps */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">{t('workflow.complete.workflowSteps')}</p>
            <div className="space-y-1">
              {config.steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                    {index + 1}
                  </span>
                  <span className="font-medium">{step.title || t('workflow.complete.untitledStep')}</span>
                  <span className="text-muted-foreground text-xs">
                    ({step.templates.length} {t('workflow.complete.templates')}, {step.links.length} {t('workflow.complete.links')}, {step.services.length} {t('workflow.complete.services')})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">{t('workflow.complete.selectedFeatures')}</p>
            <div className="flex flex-wrap gap-1">
              {config.features.length > 0 ? (
                config.features.map((f) => (
                  <span key={f} className="rounded bg-background px-2 py-0.5 text-xs">
                    {f}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">{t('workflow.complete.noFeatures')}</span>
              )}
            </div>
          </div>

          <div className="border-t pt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">{t('workflow.complete.authentication')}</p>
              <p className="text-sm">
                {config.authEnabled
                  ? `${config.authMethods.length} ${t('workflow.complete.methods')}`
                  : t('workflow.complete.disabled')}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('workflow.complete.aiIntegrations')}</p>
              <p className="text-sm">
                {enabledIntegrations.length > 0
                  ? enabledIntegrations.map((i) => i.provider).join(', ')
                  : t('workflow.complete.none')}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('workflow.complete.deployTarget')}</p>
              <p className="text-sm capitalize">{config.deployTarget || t('workflow.complete.notSet')}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSaveAndContinue}
            disabled={isSaving}
            className="flex-1"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('workflow.complete.saving')}
              </>
            ) : (
              <>
                {t('workflow.complete.continueToAI')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleExportConfig}>
            <Download className="mr-2 h-4 w-4" />
            {t('workflow.complete.exportConfig')}
          </Button>
          <Button variant="ghost" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            {t('workflow.complete.edit')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
