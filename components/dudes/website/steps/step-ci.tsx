'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CIUpload } from '@/components/dudes/shared/ci-upload'
import type { CIConfig } from '@/lib/shared-pipeline/ci'

export function StepCI() {
  const { config, updateConfig, setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()

  const handleUpdate = (updates: Partial<CIConfig>) => {
    updateConfig({ corporateIdentity: { ...config.corporateIdentity, ...updates } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('ci.title')}</CardTitle>
        <CardDescription>{t('ci.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CIUpload config={config.corporateIdentity} onUpdate={handleUpdate} />

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(3)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('website.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(5)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
