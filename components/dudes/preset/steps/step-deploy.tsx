'use client'

import { useWizard } from '../wizard-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, Globe, Cloud, Server } from 'lucide-react'

const deployTargets = [
  { id: 'vercel', label: 'Vercel', description: 'Recommended for Next.js', icon: Globe },
  { id: 'aws', label: 'AWS', description: 'Amazon Web Services', icon: Cloud },
  { id: 'gcp', label: 'Google Cloud', description: 'Google Cloud Platform', icon: Cloud },
  { id: 'docker', label: 'Docker', description: 'Container export', icon: Server },
  { id: 'self-host', label: 'Self-hosted', description: 'Your own server', icon: Server },
]

const regions = [
  { id: 'auto', label: 'Auto (Recommended)', description: 'Closest to your users' },
  { id: 'us-east', label: 'US East', description: 'North Virginia' },
  { id: 'us-west', label: 'US West', description: 'San Francisco' },
  { id: 'eu-west', label: 'Europe', description: 'Frankfurt' },
  { id: 'ap-south', label: 'Asia Pacific', description: 'Singapore' },
]

export function StepDeploy() {
  const { config, updateConfig, setCurrentStep, setIsComplete } = useWizard()

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment</CardTitle>
        <CardDescription>
          Choose where to deploy your application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deploy Target */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Deployment target</p>
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
          <p className="text-sm font-medium">Region</p>
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
          <p className="font-medium">Configuration Summary</p>
          <div className="text-sm space-y-1">
            <p><span className="text-muted-foreground">Business:</span> {config.businessName || 'Not set'}</p>
            <p><span className="text-muted-foreground">App Type:</span> {config.appType || 'Not set'}</p>
            <p><span className="text-muted-foreground">Features:</span> {config.features.length} selected</p>
            <p><span className="text-muted-foreground">Entities:</span> {config.entities.length} defined</p>
            <p><span className="text-muted-foreground">Auth:</span> {config.authMethods.join(', ')}</p>
            <p><span className="text-muted-foreground">Integrations:</span> {config.integrations.length} selected</p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(7)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleComplete} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Complete Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
