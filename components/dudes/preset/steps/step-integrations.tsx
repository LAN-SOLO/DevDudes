'use client'

import { useWizard } from '../wizard-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const integrations = [
  { id: 'stripe', label: 'Stripe', description: 'Payment processing', category: 'Payments' },
  { id: 'paypal', label: 'PayPal', description: 'Online payments', category: 'Payments' },
  { id: 'sendgrid', label: 'SendGrid', description: 'Email delivery', category: 'Communication' },
  { id: 'twilio', label: 'Twilio', description: 'SMS and voice', category: 'Communication' },
  { id: 'slack', label: 'Slack', description: 'Team notifications', category: 'Communication' },
  { id: 's3', label: 'AWS S3', description: 'File storage', category: 'Storage' },
  { id: 'cloudinary', label: 'Cloudinary', description: 'Image management', category: 'Storage' },
  { id: 'analytics', label: 'Google Analytics', description: 'Usage tracking', category: 'Analytics' },
  { id: 'posthog', label: 'PostHog', description: 'Product analytics', category: 'Analytics' },
  { id: 'sentry', label: 'Sentry', description: 'Error tracking', category: 'Monitoring' },
  { id: 'openai', label: 'OpenAI', description: 'AI capabilities', category: 'AI' },
  { id: 'zapier', label: 'Zapier', description: 'Workflow automation', category: 'Automation' },
]

const categories = [...new Set(integrations.map(i => i.category))]

export function StepIntegrations() {
  const { config, updateConfig, setCurrentStep } = useWizard()

  const toggleIntegration = (id: string) => {
    const current = config.integrations
    if (current.includes(id)) {
      updateConfig({ integrations: current.filter((i) => i !== id) })
    } else {
      updateConfig({ integrations: [...current, id] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Select third-party services to integrate with your app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{category}</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {integrations
                .filter((i) => i.category === category)
                .map((integration) => (
                  <button
                    key={integration.id}
                    onClick={() => toggleIntegration(integration.id)}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                      config.integrations.includes(integration.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                        config.integrations.includes(integration.id)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {config.integrations.includes(integration.id) && (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-sm">{integration.label}</span>
                      <p className="text-xs text-muted-foreground">{integration.description}</p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}

        <p className="text-sm text-muted-foreground">
          {config.integrations.length} integration{config.integrations.length !== 1 && 's'} selected
        </p>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(6)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => setCurrentStep(8)}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
