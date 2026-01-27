import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Cloud, Server, ArrowRight } from 'lucide-react'

const providers = [
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy with zero configuration',
    icon: Globe,
  },
  {
    id: 'aws',
    name: 'AWS',
    description: 'Amazon Web Services',
    icon: Cloud,
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    description: 'Google Cloud Platform',
    icon: Cloud,
  },
  {
    id: 'selfhost',
    name: 'Self-Hosted',
    description: 'Deploy to your own server',
    icon: Server,
  },
]

export default function DeployPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Deploy</h2>
        <p className="text-muted-foreground">
          Push your applications to production
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Choose Deployment Target</CardTitle>
          <CardDescription>Select where to deploy your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((provider) => (
              <button
                key={provider.id}
                className="flex flex-col items-center rounded-lg border p-6 text-center transition-colors hover:border-primary hover:bg-primary/5"
              >
                <provider.icon className="h-8 w-8 mb-3 text-muted-foreground" />
                <span className="font-medium">{provider.name}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {provider.description}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>Your deployment history</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Globe className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-1">No deployments yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Generate an app first, then deploy it to production.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
