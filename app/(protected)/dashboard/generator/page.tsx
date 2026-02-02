'use client'

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
import { useTranslation } from '@/lib/i18n/language-provider'

export default function GeneratorPage() {
  const { t } = useTranslation()

  const features = [
    {
      title: t('generator.features.configuration.title'),
      description: t('generator.features.configuration.description'),
      icon: Workflow,
    },
    {
      title: t('generator.features.architecture.title'),
      description: t('generator.features.architecture.description'),
      icon: Sparkles,
    },
    {
      title: t('generator.features.codeGeneration.title'),
      description: t('generator.features.codeGeneration.description'),
      icon: FileCode,
    },
    {
      title: t('generator.features.database.title'),
      description: t('generator.features.database.description'),
      icon: Database,
    },
  ]

  const startOptions = [
    {
      id: 'scratch',
      title: t('generator.startFromScratch'),
      description: t('generator.startFromScratchDesc'),
      href: '/dashboard/pipeline/preset',
      icon: Workflow,
      primary: true,
    },
    {
      id: 'template',
      title: t('generator.useTemplate'),
      description: t('generator.useTemplateDesc'),
      href: '/dashboard/templates',
      icon: FileCode,
      primary: false,
    },
    {
      id: 'database',
      title: t('generator.fromDatabase'),
      description: t('generator.fromDatabaseDesc'),
      href: '/dashboard/connections',
      icon: Database,
      primary: false,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Zap className="h-4 w-4" />
          {t('generator.badge')}
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          {t('generator.title')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('generator.subtitle')}
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
          <CardTitle>{t('generator.whatYouGet')}</CardTitle>
          <CardDescription>
            {t('generator.whatYouGetDesc')}
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
          <CardTitle>{t('generator.techStack')}</CardTitle>
          <CardDescription>
            {t('generator.techStackDesc')}
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
              <h3 className="text-lg font-semibold">{t('generator.readyToBuild')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('generator.startWithPipeline')}
              </p>
            </div>
            <Link href="/dashboard/pipeline/preset">
              <Button size="lg">
                <Sparkles className="mr-2 h-5 w-5" />
                {t('common.startBuilding')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
