'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Upload } from 'lucide-react'

export function StepImport() {
  const { setCurrentStep } = useWebsiteWizard()
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.import.title')}</CardTitle>
        <CardDescription>{t('website.import.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border-2 border-dashed p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-2">
            {t('website.import.dropzone')}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('website.import.optional')}
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setCurrentStep(2)}>
            {t('website.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
