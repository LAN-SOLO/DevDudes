'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
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
  Search,
  Plus,
  ArrowRight,
  Command,
  Plug,
  Gift,
  Users,
  BarChart3,
  Moon,
  Sun,
  LogOut,
} from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: typeof LayoutDashboard
  href?: string
  action?: () => void
  category: 'navigation' | 'actions' | 'recent'
}

const navigationCommands: CommandItem[] = [
  { id: 'dashboard', title: 'Dashboard', description: 'Go to dashboard', icon: LayoutDashboard, href: '/dashboard', category: 'navigation' },
  { id: 'generator', title: 'Quick Generate', description: 'Start generating an app', icon: Sparkles, href: '/dashboard/generator', category: 'navigation' },
  { id: 'pipeline', title: 'Pipeline', description: 'View the 7 Dudes pipeline', icon: Workflow, href: '/dashboard/pipeline', category: 'navigation' },
  { id: 'projects', title: 'Projects', description: 'View all projects', icon: FolderOpen, href: '/dashboard/projects', category: 'navigation' },
  { id: 'templates', title: 'Templates', description: 'Browse templates', icon: FileCode, href: '/dashboard/templates', category: 'navigation' },
  { id: 'connections', title: 'Connections', description: 'Manage database connections', icon: Database, href: '/dashboard/connections', category: 'navigation' },
  { id: 'integrations', title: 'Integrations', description: 'Connect third-party tools', icon: Plug, href: '/dashboard/integrations', category: 'navigation' },
  { id: 'deploy', title: 'Deploy', description: 'View deployments', icon: Globe, href: '/dashboard/deploy', category: 'navigation' },
  { id: 'team', title: 'Team', description: 'Manage team members', icon: Users, href: '/dashboard/team', category: 'navigation' },
  { id: 'activity', title: 'Activity Log', description: 'View activity history', icon: Activity, href: '/dashboard/activity', category: 'navigation' },
  { id: 'analytics', title: 'Analytics', description: 'View app analytics', icon: BarChart3, href: '/dashboard/analytics', category: 'navigation' },
  { id: 'notifications', title: 'Notifications', description: 'View notifications', icon: Bell, href: '/dashboard/notifications', category: 'navigation' },
  { id: 'whats-new', title: "What's New", description: 'See latest updates', icon: Gift, href: '/dashboard/whats-new', category: 'navigation' },
  { id: 'billing', title: 'Billing', description: 'Manage subscription', icon: CreditCard, href: '/dashboard/billing', category: 'navigation' },
  { id: 'profile', title: 'Profile', description: 'Edit your profile', icon: User, href: '/dashboard/profile', category: 'navigation' },
  { id: 'settings', title: 'Settings', description: 'App settings', icon: Settings, href: '/dashboard/settings', category: 'navigation' },
  { id: 'help', title: 'Help Center', description: 'Get help and support', icon: HelpCircle, href: '/dashboard/help', category: 'navigation' },
]

const actionCommands: CommandItem[] = [
  { id: 'new-project', title: 'New Project', description: 'Create a new project', icon: Plus, href: '/dashboard/pipeline/preset', category: 'actions' },
  { id: 'new-connection', title: 'Add Connection', description: 'Connect a new database', icon: Database, href: '/dashboard/connections', category: 'actions' },
  { id: 'view-docs', title: 'Documentation', description: 'View documentation', icon: FileCode, href: '/dashboard/help', category: 'actions' },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const settingsCommands: CommandItem[] = [
    {
      id: 'toggle-theme',
      title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      description: 'Toggle between light and dark theme',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      category: 'actions',
    },
    {
      id: 'logout',
      title: 'Sign Out',
      description: 'Sign out of your account',
      icon: LogOut,
      href: '/login',
      category: 'actions',
    },
  ]

  const allCommands = [...actionCommands, ...settingsCommands, ...navigationCommands]

  const filteredCommands = allCommands.filter(
    (command) =>
      command.title.toLowerCase().includes(search.toLowerCase()) ||
      command.description?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = useCallback((command: CommandItem) => {
    if (command.href) {
      router.push(command.href)
    } else if (command.action) {
      command.action()
    }
    setIsOpen(false)
    setSearch('')
    setSelectedIndex(0)
  }, [router])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette with cmd+k or ctrl+k
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }

      // Close with escape
      if (e.key === 'Escape') {
        setIsOpen(false)
        setSearch('')
        setSelectedIndex(0)
      }

      // Navigate with arrow keys
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          )
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          )
        }
        if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
          e.preventDefault()
          handleSelect(filteredCommands[selectedIndex])
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex, handleSelect])

  // Reset selected index when search changes
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setSelectedIndex(0)
  }, [])

  if (!isOpen) {
    return null
  }

  const groupedCommands = {
    actions: filteredCommands.filter((c) => c.category === 'actions'),
    navigation: filteredCommands.filter((c) => c.category === 'navigation'),
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => {
          setIsOpen(false)
          setSearch('')
          setSelectedIndex(0)
        }}
      />

      {/* Command Palette */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50">
        <div className="bg-background border rounded-lg shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center border-b px-4">
            <Search className="h-4 w-4 text-muted-foreground mr-3" />
            <input
              type="text"
              placeholder="Search commands..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex-1 py-4 bg-transparent outline-none text-sm"
              autoFocus
            />
            <kbd className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              <span>esc</span>
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[300px] overflow-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No commands found
              </div>
            ) : (
              <>
                {groupedCommands.actions.length > 0 && (
                  <div className="mb-2">
                    <div className="px-2 py-1 text-xs text-muted-foreground font-medium">
                      Actions
                    </div>
                    {groupedCommands.actions.map((command) => {
                      const globalIndex = filteredCommands.indexOf(command)
                      return (
                        <button
                          key={command.id}
                          onClick={() => handleSelect(command)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                            globalIndex === selectedIndex
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <command.icon className="h-4 w-4 flex-shrink-0" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">{command.title}</div>
                            {command.description && (
                              <div className={`text-xs ${
                                globalIndex === selectedIndex
                                  ? 'text-primary-foreground/70'
                                  : 'text-muted-foreground'
                              }`}>
                                {command.description}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="h-3 w-3 opacity-50" />
                        </button>
                      )
                    })}
                  </div>
                )}

                {groupedCommands.navigation.length > 0 && (
                  <div>
                    <div className="px-2 py-1 text-xs text-muted-foreground font-medium">
                      Navigation
                    </div>
                    {groupedCommands.navigation.map((command) => {
                      const globalIndex = filteredCommands.indexOf(command)
                      return (
                        <button
                          key={command.id}
                          onClick={() => handleSelect(command)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                            globalIndex === selectedIndex
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <command.icon className="h-4 w-4 flex-shrink-0" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">{command.title}</div>
                            {command.description && (
                              <div className={`text-xs ${
                                globalIndex === selectedIndex
                                  ? 'text-primary-foreground/70'
                                  : 'text-muted-foreground'
                              }`}>
                                {command.description}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="h-3 w-3 opacity-50" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="bg-muted px-1.5 py-0.5 rounded">↑</kbd>
                <kbd className="bg-muted px-1.5 py-0.5 rounded">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="bg-muted px-1.5 py-0.5 rounded">↵</kbd>
                select
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Command className="h-3 w-3" />
              <span>K to toggle</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Keyboard shortcut hint component for the header
export function CommandPaletteHint() {
  return (
    <button
      onClick={() => {
        // Dispatch keyboard event to open command palette
        document.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'k',
            metaKey: true,
            bubbles: true,
          })
        )
      }}
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-md border transition-colors"
    >
      <Search className="h-4 w-4" />
      <span>Search...</span>
      <kbd className="flex items-center gap-0.5 text-xs bg-background px-1.5 py-0.5 rounded border">
        <Command className="h-3 w-3" />
        <span>K</span>
      </kbd>
    </button>
  )
}
