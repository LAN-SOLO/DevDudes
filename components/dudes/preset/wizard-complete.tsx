'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from './wizard-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Loader2, ArrowRight, Download, Edit } from 'lucide-react'

export function WizardComplete() {
  const router = useRouter()
  const { config, setIsComplete, setCurrentStep } = useWizard()
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveAndContinue = async () => {
    setIsSaving(true)
    // TODO: Save config to project and navigate to Combo Dude
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    // Navigate to combo dude for AI generation
    router.push('/dashboard/pipeline/combo')
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
        <CardTitle className="text-2xl">Configuration Complete!</CardTitle>
        <CardDescription>
          Your app configuration is ready. Continue to AI generation or export the config.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Config Summary */}
        <div className="rounded-lg bg-muted p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Business Name</p>
              <p className="font-medium">{config.businessName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Industry</p>
              <p className="font-medium">{config.industry}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">App Type</p>
              <p className="font-medium capitalize">{config.appType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Target Users</p>
              <p className="font-medium">{config.targetUsers.join(', ')}</p>
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">Selected Features</p>
            <div className="flex flex-wrap gap-1">
              {config.features.map((f) => (
                <span key={f} className="rounded bg-background px-2 py-0.5 text-xs">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">Data Entities</p>
            <div className="flex flex-wrap gap-1">
              {config.entities.map((e) => (
                <span key={e.name} className="rounded bg-background px-2 py-0.5 text-xs">
                  {e.name} ({e.fields.length} fields)
                </span>
              ))}
            </div>
          </div>

          <div className="border-t pt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Auth Methods</p>
              <p className="text-sm">{config.authMethods.length} selected</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Integrations</p>
              <p className="text-sm">{config.integrations.length} selected</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Deploy Target</p>
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
                Saving...
              </>
            ) : (
              <>
                Continue to AI Generation
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleExportConfig}>
            <Download className="mr-2 h-4 w-4" />
            Export Config
          </Button>
          <Button variant="ghost" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
