'use client'

import { useRef } from 'react'
import { WebsiteWizard, WebsiteWizardHandle } from '@/components/dudes/website/website-wizard'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Button } from '@/components/ui/button'
import { Upload, Download } from 'lucide-react'

export default function WebsitePage() {
  const { t } = useTranslation()
  const wizardRef = useRef<WebsiteWizardHandle>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    wizardRef.current?.exportConfig()
  }

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const config = JSON.parse(event.target?.result as string)
        wizardRef.current?.importConfig(config)
      } catch {
        // Invalid JSON - ignore
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('pipeline.dudes.website.name')}</h2>
          <p className="text-muted-foreground">{t('pipeline.dudes.website.description')}</p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            {t('website.common.exportConfig')}
          </Button>
          <Button variant="outline" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" />
            {t('website.common.importConfig')}
          </Button>
        </div>
      </div>
      <WebsiteWizard ref={wizardRef} />
    </div>
  )
}
