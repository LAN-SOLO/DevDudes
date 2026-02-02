'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/language-provider'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  Settings,
  User,
  FileCode,
  Database,
  Globe,
  Workflow,
  CreditCard,
  HelpCircle,
  Bell,
  Activity,
  Plug,
  Gift,
  Users,
  BarChart3,
  Menu,
} from 'lucide-react'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation()

  const navItems = [
    { href: '/dashboard', label: t('sidebar.nav.dashboard'), icon: LayoutDashboard },
    { href: '/dashboard/generator', label: t('sidebar.nav.quickGenerate'), icon: Sparkles },
    { href: '/dashboard/pipeline', label: t('sidebar.nav.pipeline'), icon: Workflow },
    { href: '/dashboard/projects', label: t('sidebar.nav.projects'), icon: FolderOpen },
    { href: '/dashboard/templates', label: t('sidebar.nav.templates'), icon: FileCode },
    { href: '/dashboard/connections', label: t('sidebar.nav.connections'), icon: Database },
    { href: '/dashboard/integrations', label: t('sidebar.nav.integrations'), icon: Plug },
    { href: '/dashboard/deploy', label: t('sidebar.nav.deploy'), icon: Globe },
    { href: '/dashboard/team', label: t('sidebar.nav.team'), icon: Users },
    { href: '/dashboard/activity', label: t('sidebar.nav.activity'), icon: Activity },
    { href: '/dashboard/analytics', label: t('sidebar.nav.analytics'), icon: BarChart3 },
    { href: '/dashboard/notifications', label: t('sidebar.nav.notifications'), icon: Bell },
    { href: '/dashboard/whats-new', label: t('sidebar.nav.whatsNew'), icon: Gift },
    { href: '/dashboard/billing', label: t('sidebar.nav.billing'), icon: CreditCard },
    { href: '/dashboard/profile', label: t('sidebar.nav.profile'), icon: User },
    { href: '/dashboard/settings', label: t('sidebar.nav.settings'), icon: Settings },
    { href: '/dashboard/help', label: t('sidebar.nav.help'), icon: HelpCircle },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('header.toggleMenu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-left">
            <Link href="/dashboard" className="font-bold text-xl" onClick={() => setOpen(false)}>
              DevDudes
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
