'use client'

import { LogoutButton } from '@/components/auth/logout-button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { CreditCard, HelpCircle } from 'lucide-react'
import { CommandPaletteHint } from '@/components/dashboard/command-palette'
import { MobileNav } from '@/components/dashboard/mobile-nav'
import { ThemeToggle } from '@/components/dashboard/theme-toggle'
import { LanguageSwitcher } from '@/components/dashboard/language-switcher'
import { NotificationsDropdown } from '@/components/dashboard/notifications-dropdown'
import { useTranslation } from '@/lib/i18n/language-provider'

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const { t } = useTranslation()
  const initials = user.email?.slice(0, 2).toUpperCase() || 'U'

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <MobileNav />
        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold">{t('header.welcomeBack')}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Search / Command Palette */}
        <CommandPaletteHint />
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Help Button */}
        <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/help" title={t('header.helpCenter')}>
            <HelpCircle className="h-5 w-5" />
          </Link>
        </Button>

        {/* Notifications Dropdown */}
        <NotificationsDropdown />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t('header.myAccount')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">{t('sidebar.nav.profile')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">{t('sidebar.nav.settings')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/billing" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                {t('sidebar.nav.billing')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
