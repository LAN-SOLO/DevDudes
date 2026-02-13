'use client'

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
  Workflow,
  ListChecks,
  Shield,
  Palette,
  Brain,
  Gamepad2,
  Layers,
  Globe,
  Cpu,
  Settings2,
  BarChart3,
  Database,
  Zap,
  ShoppingCart,
} from 'lucide-react'
import { useTranslation } from '@/lib/i18n/language-provider'

export default function PipelinePage() {
  const { t } = useTranslation()

  // Workflow Pipeline internal steps (displayed in desktop stepper)
  const workflowSteps = [
    { id: 'define', name: t('workflow.nav.categories.define'), icon: ListChecks, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'data', name: t('workflow.nav.categories.data'), icon: Database, color: 'bg-green-100 text-green-600' },
    { id: 'intelligence', name: t('workflow.nav.categories.intelligence'), icon: Brain, color: 'bg-purple-100 text-purple-600' },
    { id: 'secure', name: t('workflow.nav.categories.secure'), icon: Shield, color: 'bg-amber-100 text-amber-600' },
    { id: 'ship', name: t('workflow.nav.categories.ship'), icon: Rocket, color: 'bg-cyan-100 text-cyan-600' },
  ]

  // App Pipeline category groups with individual steps
  const appCategories = [
    {
      id: 'configure',
      name: t('pipeline.appCat.configure'),
      icon: Settings2,
      color: 'bg-blue-100 text-blue-600',
      dotColor: 'bg-blue-500',
      steps: [
        { num: 1, label: 'Preset' },
        { num: 2, label: 'Combo' },
      ],
    },
    {
      id: 'build',
      name: t('pipeline.appCat.build'),
      icon: Code2,
      color: 'bg-green-100 text-green-600',
      dotColor: 'bg-green-500',
      steps: [
        { num: 3, label: 'Prepair' },
        { num: 4, label: 'Dev' },
      ],
    },
    {
      id: 'ship',
      name: t('pipeline.appCat.ship'),
      icon: Rocket,
      color: 'bg-red-100 text-red-600',
      dotColor: 'bg-red-500',
      steps: [
        { num: 5, label: 'Test' },
        { num: 6, label: 'Deploy' },
        { num: 7, label: 'Docu' },
      ],
    },
  ]

  // Preset Wizard 16-step categories
  const presetCategories = [
    {
      id: 'configure',
      name: t('preset.nav.categories.configure'),
      icon: Settings2,
      color: 'bg-blue-100 text-blue-600',
      dotColor: 'bg-blue-500',
      steps: [
        { num: 1, label: 'Meta & Business' },
        { num: 2, label: 'App Shell' },
        { num: 3, label: 'Auth & Security' },
      ],
    },
    {
      id: 'data',
      name: t('preset.nav.categories.data'),
      icon: Database,
      color: 'bg-green-100 text-green-600',
      dotColor: 'bg-green-500',
      steps: [
        { num: 4, label: 'Database' },
        { num: 5, label: 'API Layer' },
        { num: 6, label: 'Features' },
      ],
    },
    {
      id: 'design',
      name: t('preset.nav.categories.design'),
      icon: Palette,
      color: 'bg-violet-100 text-violet-600',
      dotColor: 'bg-violet-500',
      steps: [
        { num: 7, label: 'UI & Theme' },
        { num: 8, label: 'Pages' },
        { num: 9, label: 'Storage' },
      ],
    },
    {
      id: 'services',
      name: t('preset.nav.categories.services'),
      icon: Zap,
      color: 'bg-amber-100 text-amber-600',
      dotColor: 'bg-amber-500',
      steps: [
        { num: 10, label: 'Notifications' },
        { num: 11, label: 'AI & Search' },
        { num: 12, label: 'Payments' },
        { num: 13, label: 'Real-time' },
      ],
    },
    {
      id: 'ship',
      name: t('preset.nav.categories.ship'),
      icon: Rocket,
      color: 'bg-red-100 text-red-600',
      dotColor: 'bg-red-500',
      steps: [
        { num: 14, label: 'Testing & CI/CD' },
        { num: 15, label: 'Integrations' },
        { num: 16, label: 'Deploy' },
      ],
    },
  ]

  // Workflow Pipeline category groups with individual steps (v2: 5 categories, 16 steps)
  const workflowCategories = [
    {
      id: 'define',
      name: t('pipeline.workflowCat.define'),
      icon: ListChecks,
      color: 'bg-indigo-100 text-indigo-600',
      dotColor: 'bg-indigo-500',
      steps: [
        { num: 1, label: 'Meta & Info' },
        { num: 2, label: 'Steps Builder' },
        { num: 3, label: 'Triggers' },
      ],
    },
    {
      id: 'data',
      name: t('pipeline.workflowCat.data'),
      icon: Database,
      color: 'bg-green-100 text-green-600',
      dotColor: 'bg-green-500',
      steps: [
        { num: 4, label: 'Connectors' },
        { num: 5, label: 'Variables' },
        { num: 6, label: 'Storage' },
      ],
    },
    {
      id: 'intelligence',
      name: t('pipeline.workflowCat.intelligence'),
      icon: Brain,
      color: 'bg-purple-100 text-purple-600',
      dotColor: 'bg-purple-500',
      steps: [
        { num: 7, label: 'AI' },
        { num: 8, label: 'Features' },
        { num: 9, label: 'Middleware' },
      ],
    },
    {
      id: 'secure',
      name: t('pipeline.workflowCat.secure'),
      icon: Shield,
      color: 'bg-amber-100 text-amber-600',
      dotColor: 'bg-amber-500',
      steps: [
        { num: 10, label: 'Auth' },
        { num: 11, label: 'Security' },
        { num: 12, label: 'Notifications' },
      ],
    },
    {
      id: 'ship',
      name: t('pipeline.workflowCat.ship'),
      icon: Rocket,
      color: 'bg-cyan-100 text-cyan-600',
      dotColor: 'bg-cyan-500',
      steps: [
        { num: 13, label: 'Monitoring' },
        { num: 14, label: 'Testing' },
        { num: 15, label: 'Deploy' },
        { num: 16, label: 'UI & Docs' },
      ],
    },
  ]

  // Game Pipeline category groups with individual steps
  const gameCategories = [
    {
      id: 'setup',
      name: t('game.nav.setup'),
      icon: Settings2,
      color: 'bg-emerald-100 text-emerald-600',
      dotColor: 'bg-emerald-500',
      steps: [
        { num: 1, label: 'Import' },
        { num: 2, label: 'Theme' },
        { num: 3, label: 'Narrative' },
      ],
    },
    {
      id: 'design',
      name: t('game.nav.design'),
      icon: Palette,
      color: 'bg-violet-100 text-violet-600',
      dotColor: 'bg-violet-500',
      steps: [
        { num: 4, label: 'Genre' },
        { num: 5, label: 'Platform' },
        { num: 6, label: 'Visual' },
        { num: 7, label: 'Camera' },
      ],
    },
    {
      id: 'world',
      name: t('game.nav.world'),
      icon: Globe,
      color: 'bg-amber-100 text-amber-600',
      dotColor: 'bg-amber-500',
      steps: [
        { num: 8, label: 'World' },
        { num: 9, label: 'Player' },
        { num: 10, label: 'Core Mechanics' },
      ],
    },
    {
      id: 'systems',
      name: t('game.nav.systems'),
      icon: Layers,
      color: 'bg-rose-100 text-rose-600',
      dotColor: 'bg-rose-500',
      steps: [
        { num: 11, label: 'Secondary' },
        { num: 12, label: 'Progression' },
        { num: 13, label: 'Audio' },
      ],
    },
    {
      id: 'tech',
      name: t('game.nav.tech'),
      icon: Cpu,
      color: 'bg-sky-100 text-sky-600',
      dotColor: 'bg-sky-500',
      steps: [
        { num: 14, label: 'Engine' },
        { num: 15, label: 'Monetization' },
        { num: 16, label: 'AI & Notes' },
      ],
    },
  ]

  // Game pipeline downstream steps (after the 16-step wizard)
  const gamePipelineSteps = [
    {
      id: 'game-preset',
      name: t('pipeline.dudes.gamePreset.name'),
      icon: Gamepad2,
      color: 'bg-emerald-100 text-emerald-600',
      href: '/dashboard/pipeline/game-preset',
    },
    {
      id: 'game-analyze',
      name: t('game.analyze.title'),
      icon: BarChart3,
      color: 'bg-teal-100 text-teal-600',
      href: '/dashboard/pipeline/game-analyze',
    },
    {
      id: 'game-combo',
      name: t('game.combo.title'),
      icon: Wand2,
      color: 'bg-cyan-100 text-cyan-600',
      href: '/dashboard/pipeline/game-combo',
    },
    {
      id: 'game-summary',
      name: t('game.summary.title'),
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      href: '/dashboard/pipeline/game-summary',
    },
  ]

  // Website Pipeline category groups with individual steps
  const websiteCategories = [
    {
      id: 'identity',
      name: t('pipeline.websiteCat.identity'),
      icon: Globe,
      color: 'bg-rose-100 text-rose-600',
      dotColor: 'bg-rose-500',
      steps: [
        { num: 1, label: 'Import' },
        { num: 2, label: 'Purpose' },
        { num: 3, label: 'Branding' },
      ],
    },
    {
      id: 'design',
      name: t('pipeline.websiteCat.design'),
      icon: Palette,
      color: 'bg-pink-100 text-pink-600',
      dotColor: 'bg-pink-500',
      steps: [
        { num: 4, label: 'Layout' },
        { num: 5, label: 'Visual' },
        { num: 6, label: 'Content' },
      ],
    },
    {
      id: 'tech',
      name: t('pipeline.websiteCat.tech'),
      icon: Code2,
      color: 'bg-fuchsia-100 text-fuchsia-600',
      dotColor: 'bg-fuchsia-500',
      steps: [
        { num: 7, label: 'Framework' },
        { num: 8, label: 'Backend' },
        { num: 9, label: 'Integrations' },
      ],
    },
    {
      id: 'commerce',
      name: t('pipeline.websiteCat.commerce'),
      icon: ShoppingCart,
      color: 'bg-orange-100 text-orange-600',
      dotColor: 'bg-orange-500',
      steps: [
        { num: 10, label: 'Products' },
        { num: 11, label: 'Payments' },
        { num: 12, label: 'Shipping' },
      ],
    },
    {
      id: 'launch',
      name: t('pipeline.websiteCat.launch'),
      icon: Rocket,
      color: 'bg-red-100 text-red-600',
      dotColor: 'bg-red-500',
      steps: [
        { num: 13, label: 'SEO' },
        { num: 14, label: 'Security' },
        { num: 15, label: 'Hosting' },
        { num: 16, label: 'AI & Notes' },
      ],
    },
  ]

  // Website pipeline downstream steps
  const websitePipelineSteps = [
    {
      id: 'website-preset',
      name: t('pipeline.dudes.website.name'),
      icon: Globe,
      color: 'bg-rose-100 text-rose-600',
      href: '/dashboard/pipeline/website',
    },
    {
      id: 'website-combo',
      name: t('website.combo.title'),
      icon: Wand2,
      color: 'bg-pink-100 text-pink-600',
      href: '/dashboard/pipeline/website-combo',
    },
  ]

  const dudes = [
    {
      id: 'preset',
      name: t('pipeline.dudes.preset.name'),
      description: t('pipeline.dudes.preset.description'),
      longDescription: t('pipeline.dudes.preset.longDescription'),
      icon: SlidersHorizontal,
      status: 'available',
      href: '/dashboard/pipeline/preset',
      color: 'bg-blue-100 text-blue-600',
      time: '5-10 min',
    },
    {
      id: 'combo',
      name: t('pipeline.dudes.combo.name'),
      description: t('pipeline.dudes.combo.description'),
      longDescription: t('pipeline.dudes.combo.longDescription'),
      icon: Wand2,
      status: 'available',
      href: '/dashboard/pipeline/combo',
      color: 'bg-purple-100 text-purple-600',
      time: '2-5 min',
    },
    {
      id: 'prepair',
      name: t('pipeline.dudes.prepair.name'),
      description: t('pipeline.dudes.prepair.description'),
      longDescription: t('pipeline.dudes.prepair.longDescription'),
      icon: Wrench,
      status: 'available',
      href: '/dashboard/pipeline/prepair',
      color: 'bg-orange-100 text-orange-600',
      time: '1-2 min',
    },
    {
      id: 'dev',
      name: t('pipeline.dudes.dev.name'),
      description: t('pipeline.dudes.dev.description'),
      longDescription: t('pipeline.dudes.dev.longDescription'),
      icon: Code2,
      status: 'available',
      href: '/dashboard/pipeline/dev',
      color: 'bg-green-100 text-green-600',
      time: '10-30 min',
    },
    {
      id: 'test',
      name: t('pipeline.dudes.test.name'),
      description: t('pipeline.dudes.test.description'),
      longDescription: t('pipeline.dudes.test.longDescription'),
      icon: TestTube,
      status: 'available',
      href: '/dashboard/pipeline/test',
      color: 'bg-cyan-100 text-cyan-600',
      time: '2-5 min',
    },
    {
      id: 'deploy',
      name: t('pipeline.dudes.deploy.name'),
      description: t('pipeline.dudes.deploy.description'),
      longDescription: t('pipeline.dudes.deploy.longDescription'),
      icon: Rocket,
      status: 'available',
      href: '/dashboard/pipeline/deploy',
      color: 'bg-red-100 text-red-600',
      time: '2-3 min',
    },
    {
      id: 'docu',
      name: t('pipeline.dudes.docu.name'),
      description: t('pipeline.dudes.docu.description'),
      longDescription: t('pipeline.dudes.docu.longDescription'),
      icon: FileText,
      status: 'available',
      href: '/dashboard/pipeline/docu',
      color: 'bg-yellow-100 text-yellow-600',
      time: '1-2 min',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('pipeline.title')}</h2>
          <p className="text-muted-foreground">
            {t('pipeline.subtitle')}
          </p>
        </div>
        <Link href="/dashboard/pipeline/preset">
          <Button>
            <Play className="mr-2 h-4 w-4" />
            {t('pipeline.startNewProject')}
          </Button>
        </Link>
      </div>

      {/* App Pipeline Stepper */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-medium">{t('pipeline.overview')}</span>
            </div>
            <Badge variant="secondary" className="bg-background">
              {t('pipeline.steps')}
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
                    <span className="text-xs text-muted-foreground">{`${t('common.step')} ${index + 1}`}</span>
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

          {/* 16-Step Preset Wizard Overview */}
          <div className="border-t border-primary/10 pt-4 mt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">
              {t('pipeline.appPresetSteps')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {presetCategories.map((cat) => (
                <div key={cat.id} className="rounded-lg border bg-background/50 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md ${cat.color}`}>
                      <cat.icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-semibold">{cat.name}</span>
                  </div>
                  <div className="space-y-1">
                    {cat.steps.map((step) => (
                      <Link
                        key={step.num}
                        href="/dashboard/pipeline/preset"
                        className="flex items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-muted transition-colors group"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor} flex-shrink-0`} />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {step.num}. {step.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Application Pipeline Button */}
          <div className="mt-4 pt-4 border-t border-primary/10 flex justify-center">
            <Link href="/dashboard/pipeline/preset">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:text-primary">
                <Sparkles className="mr-2 h-4 w-4" />
                {t('pipeline.startAppPipeline')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Workflow Pipeline Stepper */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500/5 via-indigo-500/10 to-indigo-500/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-indigo-500" />
              <span className="font-medium">{t('pipeline.workflowOverview')}</span>
            </div>
            <Badge variant="secondary" className="bg-background">
              {t('pipeline.workflowSteps')}
            </Badge>
          </div>

          {/* Desktop Stepper */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted" />

              {/* Steps */}
              <div className="relative flex justify-between">
                {workflowSteps.map((step, index) => (
                  <Link
                    key={step.id}
                    href="/dashboard/pipeline/workflow"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`relative z-10 p-3 rounded-full ${step.color} border-4 border-background shadow-sm group-hover:scale-110 transition-transform`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-indigo-500 transition-colors">
                      {step.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{`${t('common.step')} ${index + 1}`}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Stepper */}
          <div className="lg:hidden grid grid-cols-5 gap-2">
            {workflowSteps.map((step) => (
              <Link
                key={step.id}
                href="/dashboard/pipeline/workflow"
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-background/50 transition-colors"
              >
                <div className={`p-2 rounded-full ${step.color}`}>
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">{step.name}</span>
              </Link>
            ))}
          </div>

          {/* 16-Step Detail by Category */}
          <div className="border-t border-indigo-500/10 pt-4 mt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">
              {t('pipeline.workflowPresetSteps')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {workflowCategories.map((cat) => (
                <div key={cat.id} className="rounded-lg border bg-background/50 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md ${cat.color}`}>
                      <cat.icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-semibold">{cat.name}</span>
                  </div>
                  <div className="space-y-1">
                    {cat.steps.map((step) => (
                      <Link
                        key={step.num}
                        href="/dashboard/pipeline/workflow"
                        className="flex items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-muted transition-colors group"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor} flex-shrink-0`} />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {step.num}. {step.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Workflow Button */}
          <div className="mt-4 pt-4 border-t border-indigo-500/10 flex justify-center">
            <Link href="/dashboard/pipeline/workflow">
              <Button variant="outline" className="border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-500">
                <Workflow className="mr-2 h-4 w-4" />
                {t('pipeline.startWorkflow')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Game Pipeline Stepper */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">{t('pipeline.gameOverview')}</span>
            </div>
            <Badge variant="secondary" className="bg-background">
              {t('pipeline.gameSteps')}
            </Badge>
          </div>

          {/* Pipeline Flow: Game Preset → Analyze → Combo → Summary */}
          <div className="hidden lg:block mb-6">
            <div className="relative">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted" />
              <div className="relative flex justify-between">
                {gamePipelineSteps.map((step, index) => (
                  <Link
                    key={step.id}
                    href={step.href}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`relative z-10 p-3 rounded-full ${step.color} border-4 border-background shadow-sm group-hover:scale-110 transition-transform`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-emerald-500 transition-colors">
                      {step.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{`${t('common.step')} ${index + 1}`}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Pipeline Flow */}
          <div className="lg:hidden grid grid-cols-4 gap-2 mb-4">
            {gamePipelineSteps.map((step) => (
              <Link
                key={step.id}
                href={step.href}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-background/50 transition-colors"
              >
                <div className={`p-2 rounded-full ${step.color}`}>
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">{step.name}</span>
              </Link>
            ))}
          </div>

          {/* 16-Step Detail by Category */}
          <div className="border-t border-emerald-500/10 pt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">
              {t('pipeline.gamePresetSteps')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {gameCategories.map((cat) => (
                <div key={cat.id} className="rounded-lg border bg-background/50 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md ${cat.color}`}>
                      <cat.icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-semibold">{cat.name}</span>
                  </div>
                  <div className="space-y-1">
                    {cat.steps.map((step) => (
                      <Link
                        key={step.num}
                        href="/dashboard/pipeline/game-preset"
                        className="flex items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-muted transition-colors group"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor} flex-shrink-0`} />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {step.num}. {step.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Game Pipeline Button */}
          <div className="mt-4 pt-4 border-t border-emerald-500/10 flex justify-center">
            <Link href="/dashboard/pipeline/game-preset">
              <Button variant="outline" className="border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500">
                <Gamepad2 className="mr-2 h-4 w-4" />
                {t('pipeline.startGamePipeline')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Website Pipeline Stepper */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-rose-500/5 via-rose-500/10 to-rose-500/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-rose-500" />
              <span className="font-medium">{t('pipeline.websiteOverview')}</span>
            </div>
            <Badge variant="secondary" className="bg-background">
              {t('pipeline.websiteSteps')}
            </Badge>
          </div>

          {/* Pipeline Flow: Website Preset → Website Combo */}
          <div className="hidden lg:block mb-6">
            <div className="relative">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted" />
              <div className="relative flex justify-around">
                {websitePipelineSteps.map((step, index) => (
                  <Link
                    key={step.id}
                    href={step.href}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`relative z-10 p-3 rounded-full ${step.color} border-4 border-background shadow-sm group-hover:scale-110 transition-transform`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-rose-500 transition-colors">
                      {step.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{`${t('common.step')} ${index + 1}`}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Pipeline Flow */}
          <div className="lg:hidden grid grid-cols-2 gap-2 mb-4">
            {websitePipelineSteps.map((step) => (
              <Link
                key={step.id}
                href={step.href}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-background/50 transition-colors"
              >
                <div className={`p-2 rounded-full ${step.color}`}>
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">{step.name}</span>
              </Link>
            ))}
          </div>

          {/* 16-Step Detail by Category */}
          <div className="border-t border-rose-500/10 pt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">
              {t('pipeline.websitePresetSteps')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {websiteCategories.map((cat) => (
                <div key={cat.id} className="rounded-lg border bg-background/50 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md ${cat.color}`}>
                      <cat.icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-semibold">{cat.name}</span>
                  </div>
                  <div className="space-y-1">
                    {cat.steps.map((step) => (
                      <Link
                        key={step.num}
                        href="/dashboard/pipeline/website"
                        className="flex items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-muted transition-colors group"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor} flex-shrink-0`} />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {step.num}. {step.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Website Pipeline Button */}
          <div className="mt-4 pt-4 border-t border-rose-500/10 flex justify-center">
            <Link href="/dashboard/pipeline/website">
              <Button variant="outline" className="border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-500">
                <Globe className="mr-2 h-4 w-4" />
                {t('pipeline.startWebsitePipeline')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
                  {`${t('common.step')} ${index + 1}`}
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
                    {t('common.open')}
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
                <h3 className="font-semibold mb-1">{t('pipeline.startFromScratch')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('pipeline.startFromScratchDesc')}
                </p>
                <Link href="/dashboard/pipeline/preset">
                  <Button>
                    {t('common.startBuilding')}
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
                <h3 className="font-semibold mb-1">{t('pipeline.useTemplate')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('pipeline.useTemplateDesc')}
                </p>
                <Link href="/dashboard/templates">
                  <Button variant="outline">
                    {t('pipeline.browseTemplates')}
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
