'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, Globe, Cloud, Server } from 'lucide-react'

export function StepDeployment() {
  const { config, updateConfig, setCurrentStep, setIsComplete } = useWorkflowWizard()
  const { t } = useTranslation()

  const deployTargets = [
    { id: 'vercel', label: t('workflow.deploy.targets.vercel'), description: t('workflow.deploy.targets.vercelDesc'), icon: Globe },
    { id: 'aws', label: t('workflow.deploy.targets.aws'), description: t('workflow.deploy.targets.awsDesc'), icon: Cloud },
    { id: 'gcp', label: t('workflow.deploy.targets.gcp'), description: t('workflow.deploy.targets.gcpDesc'), icon: Cloud },
    { id: 'docker', label: t('workflow.deploy.targets.docker'), description: t('workflow.deploy.targets.dockerDesc'), icon: Server },
    { id: 'self-host', label: t('workflow.deploy.targets.selfHost'), description: t('workflow.deploy.targets.selfHostDesc'), icon: Server },
  ]

  const regions = [
    { id: 'auto', label: t('workflow.deploy.regions.auto'), description: t('workflow.deploy.regions.autoDesc') },
    { id: 'us-east', label: t('workflow.deploy.regions.usEast'), description: t('workflow.deploy.regions.usEastDesc') },
    { id: 'us-west', label: t('workflow.deploy.regions.usWest'), description: t('workflow.deploy.regions.usWestDesc') },
    { id: 'eu-west', label: t('workflow.deploy.regions.euWest'), description: t('workflow.deploy.regions.euWestDesc') },
    { id: 'ap-south', label: t('workflow.deploy.regions.apSouth'), description: t('workflow.deploy.regions.apSouthDesc') },
  ]

  const handleComplete = () => {
    setIsComplete(true)
  }

  const enabledIntegrations = config.aiIntegrations.filter((i) => i.enabled)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.deploy.title')}</CardTitle>
        <CardDescription>
          {t('workflow.deploy.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deploy Target */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('workflow.deploy.deploymentTarget')}</p>
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
                <span className="text-xs text-muted-foreground text-center">{target.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('workflow.deploy.region')}</p>
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
          <p className="font-medium">{t('workflow.deploy.configSummary')}</p>
          <div className="text-sm space-y-1">
            <p>
              <span className="text-muted-foreground">{t('workflow.deploy.summary.steps')}:</span>{' '}
              {config.steps.length} {t('workflow.deploy.summary.defined')}
            </p>
            <p>
              <span className="text-muted-foreground">{t('workflow.deploy.summary.features')}:</span>{' '}
              {config.features.length} {t('workflow.common.selected')}
            </p>
            <p>
              <span className="text-muted-foreground">{t('workflow.deploy.summary.auth')}:</span>{' '}
              {config.authEnabled ? config.authMethods.join(', ') || t('workflow.deploy.notSet') : t('workflow.deploy.disabled')}
            </p>
            <p>
              <span className="text-muted-foreground">{t('workflow.deploy.summary.aiIntegrations')}:</span>{' '}
              {enabledIntegrations.length > 0
                ? enabledIntegrations.map((i) => i.provider).join(', ')
                : t('workflow.deploy.none')}
            </p>
            <p>
              <span className="text-muted-foreground">{t('workflow.deploy.summary.layout')}:</span>{' '}
              {config.layout}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(5)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={handleComplete} className="gap-2">
            <Sparkles className="h-4 w-4" />
            {t('workflow.deploy.completeConfig')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
