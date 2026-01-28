import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  ArrowRight,
  Workflow,
  FileCode,
  Database,
  Zap,
  Check,
} from 'lucide-react'

const features = [
  {
    title: '8-Step Configuration',
    description: 'Define your app requirements with our guided wizard',
    icon: Workflow,
  },
  {
    title: 'AI Architecture',
    description: 'Automatically design optimal app structure',
    icon: Sparkles,
  },
  {
    title: 'Code Generation',
    description: 'Generate production-ready Next.js code',
    icon: FileCode,
  },
  {
    title: 'Database Setup',
    description: 'Auto-configure Supabase with RLS policies',
    icon: Database,
  },
]

const startOptions = [
  {
    id: 'scratch',
    title: 'Start from Scratch',
    description: 'Configure every aspect of your app with our 8-step wizard',
    href: '/dashboard/pipeline/preset',
    icon: Workflow,
    primary: true,
  },
  {
    id: 'template',
    title: 'Use a Template',
    description: 'Start with a pre-built template and customize it',
    href: '/dashboard/templates',
    icon: FileCode,
    primary: false,
  },
  {
    id: 'database',
    title: 'From Existing Database',
    description: 'Connect your database and generate an app from your schema',
    href: '/dashboard/connections',
    icon: Database,
    primary: false,
  },
]

export default function GeneratorPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Zap className="h-4 w-4" />
          AI-Powered App Generation
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Create Production-Ready Apps
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform your ideas into fully functional business applications in minutes.
          Our AI handles the architecture, code generation, and deployment.
        </p>
      </div>

      {/* Start Options */}
      <div className="grid gap-4 md:grid-cols-3">
        {startOptions.map((option) => (
          <Card
            key={option.id}
            className={`flex flex-col hover:shadow-md transition-shadow ${
              option.primary ? 'border-primary shadow-sm' : ''
            }`}
          >
            <CardHeader>
              <div className={`p-3 w-fit rounded-lg ${
                option.primary ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <option.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-end">
              <Link href={option.href} className="w-full">
                <Button
                  className="w-full"
                  variant={option.primary ? 'default' : 'outline'}
                >
                  {option.primary ? 'Get Started' : 'Choose'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <Card>
        <CardHeader>
          <CardTitle>What You Get</CardTitle>
          <CardDescription>
            Every app includes enterprise-grade features out of the box
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <div className="p-2 h-fit rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Modern Tech Stack</CardTitle>
          <CardDescription>
            Built with the latest technologies for performance and scalability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Next.js 15', desc: 'React framework with App Router' },
              { name: 'React 19', desc: 'Latest React with Server Components' },
              { name: 'TypeScript', desc: 'Type-safe code generation' },
              { name: 'Tailwind CSS', desc: 'Utility-first styling' },
              { name: 'Supabase', desc: 'Auth, database, and storage' },
              { name: 'shadcn/ui', desc: 'Beautiful component library' },
            ].map((tech) => (
              <div key={tech.name} className="flex items-center gap-3 rounded-lg border p-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Ready to build your app?</h3>
              <p className="text-sm text-muted-foreground">
                Start with the pipeline wizard for full customization
              </p>
            </div>
            <Link href="/dashboard/pipeline/preset">
              <Button size="lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Building
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
