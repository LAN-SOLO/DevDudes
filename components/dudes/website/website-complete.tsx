'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWebsiteWizard } from './website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Loader2, ArrowRight, Download, Edit, AlertCircle } from 'lucide-react'
import { saveWebsiteConfig } from '@/app/actions/website-pipeline'
import {
  WEBSITE_TYPE_OPTIONS,
  FRAMEWORK_OPTIONS,
  DATABASE_OPTIONS,
  HOSTING_OPTIONS,
  PAYMENT_PROCESSOR_OPTIONS,
  isEcommerce,
} from '@/lib/website-pipeline/constants'

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value
}

export function WebsiteComplete() {
  const router = useRouter()
  const { config, setIsComplete, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSaveAndContinue = async () => {
    setIsSaving(true)
    setError(null)

    const result = await saveWebsiteConfig(null, config)

    if (result.error) {
      setError(result.error)
      setIsSaving(false)
      return
    }

    setIsSaving(false)
    router.push(`/dashboard/pipeline/website-combo?project=${result.projectId}`)
  }

  const handleExportConfig = () => {
    const json = JSON.stringify(config, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'website-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleEdit = () => {
    setIsComplete(false)
    setCurrentStep(1)
  }

  const hasEcommerce = isEcommerce(config.websiteTypes)

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">{t('website.complete.title')}</CardTitle>
        <CardDescription>{t('website.complete.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">{t('website.complete.failedToSave')}</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="rounded-lg bg-muted p-4 space-y-3">
          {config.siteName && (
            <p className="text-sm font-medium">{config.siteName}</p>
          )}
          {config.elevatorPitch && (
            <p className="text-sm italic text-muted-foreground">&ldquo;{config.elevatorPitch}&rdquo;</p>
          )}

          <SummaryRow label={t('website.complete.websiteTypes')} values={config.websiteTypes.map((v) => findLabel(WEBSITE_TYPE_OPTIONS, v))} />

          <div className="border-t pt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">{t('website.complete.framework')}</p>
              <p className="text-sm">{config.framework ? findLabel(FRAMEWORK_OPTIONS, config.framework) : '\u2014'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('website.complete.database')}</p>
              <p className="text-sm">{config.database ? findLabel(DATABASE_OPTIONS, config.database) : '\u2014'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('website.complete.hosting')}</p>
              <p className="text-sm">{config.hosting ? findLabel(HOSTING_OPTIONS, config.hosting) : '\u2014'}</p>
            </div>
          </div>

          {hasEcommerce && config.paymentProcessor && (
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-1">{t('website.complete.payments')}</p>
              <p className="text-sm">{findLabel(PAYMENT_PROCESSOR_OPTIONS, config.paymentProcessor)}</p>
            </div>
          )}

          {config.pageStructure.length > 0 && (
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-1">{t('website.complete.pages')}</p>
              <p className="text-sm">{config.pageStructure.length} pages configured</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSaveAndContinue}
            disabled={isSaving}
            className="flex-1"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('website.complete.saving')}
              </>
            ) : (
              <>
                {t('website.complete.continueToDocuments')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleExportConfig}>
            <Download className="mr-2 h-4 w-4" />
            {t('website.complete.exportConfig')}
          </Button>
          <Button variant="ghost" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            {t('website.complete.edit')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SummaryRow({ label, values }: { label: string; values: string[] }) {
  if (values.length === 0) return null
  return (
    <div className="border-t pt-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex flex-wrap gap-1">
        {values.map((v) => (
          <Badge key={v} variant="secondary" className="text-xs">{v}</Badge>
        ))}
      </div>
    </div>
  )
}
