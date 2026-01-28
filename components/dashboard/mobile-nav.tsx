'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/generator', label: 'Quick Generate', icon: Sparkles },
  { href: '/dashboard/pipeline', label: 'Pipeline', icon: Workflow },
  { href: '/dashboard/projects', label: 'Projects', icon: FolderOpen },
  { href: '/dashboard/templates', label: 'Templates', icon: FileCode },
  { href: '/dashboard/connections', label: 'Connections', icon: Database },
  { href: '/dashboard/integrations', label: 'Integrations', icon: Plug },
  { href: '/dashboard/deploy', label: 'Deploy', icon: Globe },
  { href: '/dashboard/team', label: 'Team', icon: Users },
  { href: '/dashboard/activity', label: 'Activity', icon: Activity },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/whats-new', label: "What's New", icon: Gift },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/help', label: 'Help', icon: HelpCircle },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
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
