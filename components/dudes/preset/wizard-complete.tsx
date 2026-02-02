'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from './wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Loader2, ArrowRight, Download, Edit, AlertCircle } from 'lucide-react'
import { savePresetConfig } from '@/app/actions/pipeline'

export function WizardComplete() {
  const router = useRouter()
  const { config, setIsComplete, setCurrentStep } = useWizard()
  const { t } = useTranslation()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSaveAndContinue = async () => {
    setIsSaving(true)
    setError(null)

    const result = await savePresetConfig(null, config)

    if (result.error) {
      setError(result.error)
      setIsSaving(false)
      return
    }

    setIsSaving(false)
    // Navigate to combo dude for AI generation with the project ID
    router.push(`/dashboard/pipeline/combo?project=${result.projectId}`)
  }

  const handleExportConfig = () => {
    const json = JSON.stringify(config, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${config.businessName || 'devdudes'}-config.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleEdit = () => {
    setIsComplete(false)
    setCurrentStep(1)
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">{t('preset.complete.title')}</CardTitle>
        <CardDescription>
          {t('preset.complete.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Error Display */}
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">{t('preset.complete.failedToSave')}</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {/* Config Summary */}
        <div className="rounded-lg bg-muted p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">{t('preset.complete.businessName')}</p>
              <p className="font-medium">{config.businessName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('preset.complete.industry')}</p>
              <p className="font-medium">{config.industry}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('preset.complete.appType')}</p>
              <p className="font-medium capitalize">{config.appType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('preset.complete.targetUsers')}</p>
              <p className="font-medium">{config.targetUsers.join(', ')}</p>
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">{t('preset.complete.selectedFeatures')}</p>
            <div className="flex flex-wrap gap-1">
              {config.features.map((f) => (
                <span key={f} className="rounded bg-background px-2 py-0.5 text-xs">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">{t('preset.complete.dataEntities')}</p>
            <div className="flex flex-wrap gap-1">
              {config.entities.map((e) => (
                <span key={e.name} className="rounded bg-background px-2 py-0.5 text-xs">
                  {e.name} ({e.fields.length} {t('preset.data.fields')})
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">{t('preset.complete.authMethods')}</p>
              <p className="text-sm">{config.authMethods.length} {t('preset.common.selected')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('preset.complete.integrations')}</p>
              <p className="text-sm">{config.integrations.length} {t('preset.common.selected')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('preset.complete.deployTarget')}</p>
              <p className="text-sm capitalize">{config.deployTarget}</p>
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
                {t('preset.complete.saving')}
              </>
            ) : (
              <>
                {t('preset.complete.continueToAI')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleExportConfig}>
            <Download className="mr-2 h-4 w-4" />
            {t('preset.complete.exportConfig')}
          </Button>
          <Button variant="ghost" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            {t('preset.complete.edit')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
