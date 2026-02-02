'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, FileCode, Database, Globe } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/language-provider'

export function QuickActions() {
  const { t } = useTranslation()

  const actions = [
    {
      title: t('dashboard.quickActions.generateApp'),
      description: t('dashboard.quickActions.generateAppDesc'),
      icon: Sparkles,
      href: '/dashboard/generator',
      variant: 'default' as const,
    },
    {
      title: t('dashboard.quickActions.importTemplate'),
      description: t('dashboard.quickActions.importTemplateDesc'),
      icon: FileCode,
      href: '/dashboard/templates',
      variant: 'outline' as const,
    },
    {
      title: t('dashboard.quickActions.connectDb'),
      description: t('dashboard.quickActions.connectDbDesc'),
      icon: Database,
      href: '/dashboard/connections',
      variant: 'outline' as const,
    },
    {
      title: t('dashboard.quickActions.deployApp'),
      description: t('dashboard.quickActions.deployAppDesc'),
      icon: Globe,
      href: '/dashboard/deploy',
      variant: 'outline' as const,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.quickActions.title')}</CardTitle>
        <CardDescription>{t('dashboard.quickActions.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Button
                variant={action.variant}
                className="h-auto w-full justify-start gap-3 p-4"
              >
                <action.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground font-normal">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
