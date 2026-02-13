'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CIUpload } from '@/components/dudes/shared/ci-upload'

export function StepCI() {
  const { config, updateCI, prevStep, nextStep } = useWorkflowWizard()
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('ci.title')}</CardTitle>
        <CardDescription>{t('ci.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CIUpload config={config.ci} onUpdate={updateCI} />

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={nextStep}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
