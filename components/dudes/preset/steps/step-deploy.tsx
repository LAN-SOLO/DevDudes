'use client'

import { useWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, Globe, Cloud, Server } from 'lucide-react'

export function StepDeploy() {
  const { config, updateConfig, setCurrentStep, setIsComplete } = useWizard()
  const { t } = useTranslation()

  const deployTargets = [
    { id: 'vercel', label: t('preset.deploy.targets.vercel'), description: t('preset.deploy.targets.vercelDesc'), icon: Globe },
    { id: 'aws', label: t('preset.deploy.targets.aws'), description: t('preset.deploy.targets.awsDesc'), icon: Cloud },
    { id: 'gcp', label: t('preset.deploy.targets.gcp'), description: t('preset.deploy.targets.gcpDesc'), icon: Cloud },
    { id: 'docker', label: t('preset.deploy.targets.docker'), description: t('preset.deploy.targets.dockerDesc'), icon: Server },
    { id: 'self-host', label: t('preset.deploy.targets.selfHost'), description: t('preset.deploy.targets.selfHostDesc'), icon: Server },
  ]

  const regions = [
    { id: 'auto', label: t('preset.deploy.regions.auto'), description: t('preset.deploy.regions.autoDesc') },
    { id: 'us-east', label: t('preset.deploy.regions.usEast'), description: t('preset.deploy.regions.usEastDesc') },
    { id: 'us-west', label: t('preset.deploy.regions.usWest'), description: t('preset.deploy.regions.usWestDesc') },
    { id: 'eu-west', label: t('preset.deploy.regions.euWest'), description: t('preset.deploy.regions.euWestDesc') },
    { id: 'ap-south', label: t('preset.deploy.regions.apSouth'), description: t('preset.deploy.regions.apSouthDesc') },
  ]

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.deploy.title')}</CardTitle>
        <CardDescription>
          {t('preset.deploy.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deploy Target */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('preset.deploy.deploymentTarget')}</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deployTargets.map((target) => (
              <button
                key={target.id}
                onClick={() => updateConfig({ deployTarget: target.id })}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                  config.deployTarget === target.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <target.icon className="h-6 w-6" />
                <span className="font-medium text-sm">{target.label}</span>
                <span className="text-xs text-muted-foreground">{target.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('preset.deploy.region')}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => updateConfig({ region: region.id })}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  config.region === region.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium text-sm">{region.label}</span>
                <p className="text-xs text-muted-foreground">{region.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-lg bg-muted p-4 space-y-2">
          <p className="font-medium">{t('preset.deploy.configSummary')}</p>
          <div className="text-sm space-y-1">
            <p><span className="text-muted-foreground">{t('preset.deploy.summary.business')}:</span> {config.businessName || t('preset.deploy.notSet')}</p>
            <p><span className="text-muted-foreground">{t('preset.deploy.summary.appType')}:</span> {config.appType || t('preset.deploy.notSet')}</p>
            <p><span className="text-muted-foreground">{t('preset.deploy.summary.features')}:</span> {config.features.length} {t('preset.common.selected')}</p>
            <p><span className="text-muted-foreground">{t('preset.deploy.summary.entities')}:</span> {config.entities.length} {t('preset.deploy.summary.defined')}</p>
            <p><span className="text-muted-foreground">{t('preset.deploy.summary.auth')}:</span> {config.authMethods.join(', ')}</p>
            <p><span className="text-muted-foreground">{t('preset.deploy.summary.integrations')}:</span> {config.integrations.length} {t('preset.common.selected')}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(7)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('preset.common.back')}
          </Button>
          <Button onClick={handleComplete} className="gap-2">
            <Sparkles className="h-4 w-4" />
            {t('preset.deploy.completeConfig')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
