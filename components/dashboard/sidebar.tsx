'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/language-provider'
import {
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface NavItem {
  href: string
  label: string
  icon: typeof LayoutDashboard
}

interface NavSection {
  label: string
  items: NavItem[]
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()

  const navSections: NavSection[] = [
    {
      label: t('sidebar.sections.overview'),
      items: [
        { href: '/dashboard', label: t('sidebar.nav.dashboard'), icon: LayoutDashboard },
        { href: '/dashboard/activity', label: t('sidebar.nav.activity'), icon: Activity },
        { href: '/dashboard/notifications', label: t('sidebar.nav.notifications'), icon: Bell },
      ],
    },
    {
      label: t('sidebar.sections.build'),
      items: [
        { href: '/dashboard/generator', label: t('sidebar.nav.quickGenerate'), icon: Sparkles },
        { href: '/dashboard/pipeline', label: t('sidebar.nav.pipeline'), icon: Workflow },
        { href: '/dashboard/projects', label: t('sidebar.nav.projects'), icon: FolderOpen },
        { href: '/dashboard/templates', label: t('sidebar.nav.templates'), icon: FileCode },
      ],
    },
    {
      label: t('sidebar.sections.infrastructure'),
      items: [
        { href: '/dashboard/connections', label: t('sidebar.nav.connections'), icon: Database },
        { href: '/dashboard/integrations', label: t('sidebar.nav.integrations'), icon: Plug },
        { href: '/dashboard/deploy', label: t('sidebar.nav.deploy'), icon: Globe },
      ],
    },
    {
      label: t('sidebar.sections.workspace'),
      items: [
        { href: '/dashboard/team', label: t('sidebar.nav.team'), icon: Users },
        { href: '/dashboard/analytics', label: t('sidebar.nav.analytics'), icon: BarChart3 },
        { href: '/dashboard/billing', label: t('sidebar.nav.billing'), icon: CreditCard },
      ],
    },
    {
      label: t('sidebar.sections.account'),
      items: [
        { href: '/dashboard/profile', label: t('sidebar.nav.profile'), icon: User },
        { href: '/dashboard/settings', label: t('sidebar.nav.settings'), icon: Settings },
        { href: '/dashboard/whats-new', label: t('sidebar.nav.whatsNew'), icon: Gift },
        { href: '/dashboard/help', label: t('sidebar.nav.help'), icon: HelpCircle },
      ],
    },
  ]

  return (
    <aside className={cn(
      "hidden lg:flex flex-col border-r bg-background transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href="/dashboard" className="font-bold text-xl">
            DevDudes
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="mb-3">
            {!collapsed && (
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-1">
                {section.label}
              </p>
            )}
            {collapsed && <div className="border-t my-2" />}
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
