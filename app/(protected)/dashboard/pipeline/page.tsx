import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  SlidersHorizontal,
  Wand2,
  Wrench,
  Code2,
  TestTube,
  Rocket,
  FileText,
  ArrowRight,
  Sparkles,
  Clock,
  Play,
} from 'lucide-react'

const dudes = [
  {
    id: 'preset',
    name: 'Preset Dude',
    description: 'Configure your app requirements step by step',
    longDescription: 'Define your app type, features, database requirements, and authentication needs through an intuitive wizard.',
    icon: SlidersHorizontal,
    status: 'available',
    href: '/dashboard/pipeline/preset',
    color: 'bg-blue-100 text-blue-600',
    time: '5-10 min',
  },
  {
    id: 'combo',
    name: 'Combo Dude',
    description: 'AI generates your app concept and architecture',
    longDescription: 'Our AI analyzes your requirements and generates a complete application architecture with database schema and API design.',
    icon: Wand2,
    status: 'available',
    href: '/dashboard/pipeline/combo',
    color: 'bg-purple-100 text-purple-600',
    time: '2-5 min',
  },
  {
    id: 'prepair',
    name: 'Prepair Dude',
    description: 'Set up development environment and dependencies',
    longDescription: 'Automatically configure your development environment, install dependencies, and set up project structure.',
    icon: Wrench,
    status: 'available',
    href: '/dashboard/pipeline/prepair',
    color: 'bg-orange-100 text-orange-600',
    time: '1-2 min',
  },
  {
    id: 'dev',
    name: 'Dev Dude',
    description: 'Interactive development with live preview',
    longDescription: 'Build your application with AI assistance, real-time preview, and an integrated code editor.',
    icon: Code2,
    status: 'available',
    href: '/dashboard/pipeline/dev',
    color: 'bg-green-100 text-green-600',
    time: '10-30 min',
  },
  {
    id: 'test',
    name: 'Test Dude',
    description: 'Automated testing and quality assurance',
    longDescription: 'Generate and run unit tests, integration tests, and perform security audits on your application.',
    icon: TestTube,
    status: 'available',
    href: '/dashboard/pipeline/test',
    color: 'bg-cyan-100 text-cyan-600',
    time: '2-5 min',
  },
  {
    id: 'deploy',
    name: 'Deploy Dude',
    description: 'One-click deployment to any platform',
    longDescription: 'Deploy to Vercel, Netlify, AWS, or your own infrastructure with automatic CI/CD configuration.',
    icon: Rocket,
    status: 'available',
    href: '/dashboard/pipeline/deploy',
    color: 'bg-red-100 text-red-600',
    time: '2-3 min',
  },
  {
    id: 'docu',
    name: 'Docu Dude',
    description: 'Auto-generated documentation and guides',
    longDescription: 'Generate API documentation, user guides, and developer documentation automatically.',
    icon: FileText,
    status: 'available',
    href: '/dashboard/pipeline/docu',
    color: 'bg-yellow-100 text-yellow-600',
    time: '1-2 min',
  },
]

export default function PipelinePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">The 7 Dudes Pipeline</h2>
          <p className="text-muted-foreground">
            Build production-ready applications with our AI-powered workflow
          </p>
        </div>
        <Link href="/dashboard/pipeline/preset">
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Start New Project
          </Button>
        </Link>
      </div>

      {/* Enhanced Pipeline Stepper */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-medium">Pipeline Overview</span>
            </div>
            <Badge variant="secondary" className="bg-background">
              7 Steps
            </Badge>
          </div>

          {/* Desktop Stepper */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted" />

              {/* Steps */}
              <div className="relative flex justify-between">
                {dudes.map((dude, index) => (
                  <Link
                    key={dude.id}
                    href={dude.href}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`relative z-10 p-3 rounded-full ${dude.color} border-4 border-background shadow-sm group-hover:scale-110 transition-transform`}>
                      <dude.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {dude.name.split(' ')[0]}
                    </span>
                    <span className="text-xs text-muted-foreground">Step {index + 1}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Stepper */}
          <div className="lg:hidden grid grid-cols-4 gap-2">
            {dudes.slice(0, 4).map((dude) => (
              <Link
                key={dude.id}
                href={dude.href}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-background/50 transition-colors"
              >
                <div className={`p-2 rounded-full ${dude.color}`}>
                  <dude.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">{dude.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
          <div className="lg:hidden grid grid-cols-3 gap-2 mt-2">
            {dudes.slice(4).map((dude) => (
              <Link
                key={dude.id}
                href={dude.href}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-background/50 transition-colors"
              >
                <div className={`p-2 rounded-full ${dude.color}`}>
                  <dude.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">{dude.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      {/* Dude Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dudes.map((dude, index) => (
          <Card key={dude.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-3 rounded-xl ${dude.color} group-hover:scale-110 transition-transform`}>
                  <dude.icon className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="text-xs">
                  Step {index + 1}
                </Badge>
              </div>
              <CardTitle className="text-lg">{dude.name}</CardTitle>
              <CardDescription className="text-sm">
                {dude.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {dude.longDescription}
              </p>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{dude.time}</span>
                </div>
                <Link href={dude.href}>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Open
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Start from Scratch</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Begin with Preset Dude to configure your app from the ground up
                </p>
                <Link href="/dashboard/pipeline/preset">
                  <Button>
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Use a Template</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose from pre-built templates to speed up development
                </p>
                <Link href="/dashboard/templates">
                  <Button variant="outline">
                    Browse Templates
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
