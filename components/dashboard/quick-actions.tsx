import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, FileCode, Database, Globe } from 'lucide-react'

const actions = [
  {
    title: 'Generate New App',
    description: 'Create a business application from scratch',
    icon: Sparkles,
    href: '/dashboard/generator',
    variant: 'default' as const,
  },
  {
    title: 'Import Template',
    description: 'Start from a pre-built template',
    icon: FileCode,
    href: '/dashboard/templates',
    variant: 'outline' as const,
  },
  {
    title: 'Connect Database',
    description: 'Link your existing database',
    icon: Database,
    href: '/dashboard/connections',
    variant: 'outline' as const,
  },
  {
    title: 'Deploy App',
    description: 'Push to production',
    icon: Globe,
    href: '/dashboard/deploy',
    variant: 'outline' as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started with common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
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
