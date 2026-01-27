import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Globe, Cloud, Server, Check } from 'lucide-react'
import Link from 'next/link'

const providers = [
  { id: 'vercel', name: 'Vercel', description: 'Recommended for Next.js', icon: Globe },
  { id: 'aws', name: 'AWS', description: 'Amazon Web Services', icon: Cloud },
  { id: 'gcp', name: 'Google Cloud', description: 'Google Cloud Platform', icon: Cloud },
  { id: 'docker', name: 'Docker', description: 'Export as container', icon: Server },
]

export default function DeployDudePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pipeline">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Deploy Dude</h2>
          <p className="text-muted-foreground">
            One-click deployment to your favorite platform
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {providers.map((provider) => (
          <Card key={provider.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <provider.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{provider.name}</CardTitle>
                  <CardDescription>{provider.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Deploy to {provider.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deployment Checklist</CardTitle>
          <CardDescription>
            Complete these steps before deploying
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              { label: 'Complete app configuration', done: false },
              { label: 'Generate app concept', done: false },
              { label: 'Set up environment', done: false },
              { label: 'Review generated code', done: false },
              { label: 'Run tests', done: false },
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  item.done ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}>
                  {item.done && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                <span className={item.done ? 'line-through text-muted-foreground' : ''}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
