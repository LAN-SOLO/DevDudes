import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  SlidersHorizontal,
  Wand2,
  Wrench,
  Code2,
  TestTube,
  Rocket,
  FileText,
  ArrowRight,
} from 'lucide-react'

const dudes = [
  {
    id: 'preset',
    name: 'Preset Dude',
    description: 'Configure your app requirements step by step',
    icon: SlidersHorizontal,
    status: 'available',
    href: '/dashboard/pipeline/preset',
  },
  {
    id: 'combo',
    name: 'Combo Dude',
    description: 'AI generates your app concept and architecture',
    icon: Wand2,
    status: 'available',
    href: '/dashboard/pipeline/combo',
  },
  {
    id: 'prepair',
    name: 'Prepair Dude',
    description: 'Set up development environment and dependencies',
    icon: Wrench,
    status: 'available',
    href: '/dashboard/pipeline/prepair',
  },
  {
    id: 'dev',
    name: 'Dev Dude',
    description: 'Interactive development with live preview',
    icon: Code2,
    status: 'available',
    href: '/dashboard/pipeline/dev',
  },
  {
    id: 'test',
    name: 'Test Dude',
    description: 'Automated testing and quality assurance',
    icon: TestTube,
    status: 'coming',
    href: '/dashboard/pipeline/test',
  },
  {
    id: 'deploy',
    name: 'Deploy Dude',
    description: 'One-click deployment to any platform',
    icon: Rocket,
    status: 'available',
    href: '/dashboard/pipeline/deploy',
  },
  {
    id: 'docu',
    name: 'Docu Dude',
    description: 'Auto-generated documentation and guides',
    icon: FileText,
    status: 'available',
    href: '/dashboard/pipeline/docu',
  },
]

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">App Generation Pipeline</h2>
        <p className="text-muted-foreground">
          Build production-ready applications with our 7-step pipeline
        </p>
      </div>

      {/* Pipeline Visualization */}
      <div className="hidden lg:flex items-center justify-center gap-2 p-4 rounded-lg bg-muted/50">
        {dudes.map((dude, index) => (
          <div key={dude.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`p-2 rounded-full ${
                dude.status === 'available' ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <dude.icon className={`h-5 w-5 ${
                  dude.status === 'available' ? 'text-primary' : 'text-muted-foreground'
                }`} />
              </div>
              <span className="text-xs text-muted-foreground">{dude.name.split(' ')[0]}</span>
            </div>
            {index < dudes.length - 1 && (
              <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Dude Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dudes.map((dude, index) => (
          <Card key={dude.id} className={dude.status === 'coming' ? 'opacity-60' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    dude.status === 'available' ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <dude.icon className={`h-5 w-5 ${
                      dude.status === 'available' ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {dude.name}
                      {dude.status === 'coming' && (
                        <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          Coming Soon
                        </span>
                      )}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">Step {index + 1}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{dude.description}</CardDescription>
              {dude.status === 'available' ? (
                <Link href={dude.href}>
                  <Button variant="outline" size="sm" className="w-full">
                    Open
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Coming Soon
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Begin your app generation journey with Preset Dude
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/pipeline/preset">
            <Button>
              Start with Preset Dude
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
