import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Rocket,
  Bug,
  Wrench,
  Star,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ChangelogEntry {
  version: string
  date: string
  title: string
  description: string
  changes: {
    type: 'feature' | 'improvement' | 'fix' | 'breaking'
    text: string
  }[]
  highlights?: string[]
}

const changelog: ChangelogEntry[] = [
  {
    version: '1.7.0',
    date: 'January 28, 2026',
    title: 'Navigation & Polish',
    description: 'Grouped sidebar navigation, deployment confirmations, and consistent dialogs across remaining pages.',
    highlights: ['Sidebar Groups', 'Deploy Confirmations', 'Templates Dialog'],
    changes: [
      { type: 'improvement', text: 'Sidebar navigation organized into logical sections (Overview, Build, Infrastructure, Workspace, Account)' },
      { type: 'feature', text: 'Delete confirmation required before removing deployments' },
      { type: 'feature', text: 'Toast notifications for deploy, redeploy, and provider connect actions' },
      { type: 'improvement', text: 'Templates page uses standard Dialog component for template preview' },
      { type: 'feature', text: 'Toast notifications for analytics refresh and export' },
      { type: 'feature', text: 'Toast feedback for template creation errors' },
    ],
  },
  {
    version: '1.6.0',
    date: 'January 28, 2026',
    title: 'Team & Connections UX',
    description: 'Improved team management and database connections with consistent dialog patterns.',
    highlights: ['Team Management', 'Connections', 'Confirmations'],
    changes: [
      { type: 'improvement', text: 'Team page uses standard Dialog components for invites and upgrades' },
      { type: 'improvement', text: 'Connections page uses standard Dialog for adding databases' },
      { type: 'feature', text: 'Delete confirmation required before removing team members' },
      { type: 'feature', text: 'Delete confirmation required before removing database connections' },
      { type: 'feature', text: 'Toast notifications for all team and connection actions' },
      { type: 'fix', text: 'Improved dark mode support for warning messages' },
    ],
  },
  {
    version: '1.5.0',
    date: 'January 28, 2026',
    title: 'Keyboard Shortcuts & UX Polish',
    description: 'Navigate faster with keyboard shortcuts and enjoy consistent dialog patterns across the app.',
    highlights: ['Keyboard Navigation', 'Loading States', 'Consistent Dialogs'],
    changes: [
      { type: 'feature', text: 'Global keyboard shortcuts: G+D (Dashboard), G+P (Projects), G+S (Settings)' },
      { type: 'feature', text: 'Press N to create new project from anywhere' },
      { type: 'feature', text: 'Press ? to view all keyboard shortcuts' },
      { type: 'feature', text: 'Cmd+Shift+T to toggle dark/light theme' },
      { type: 'feature', text: 'Loading skeletons for projects, notifications, and activity pages' },
      { type: 'improvement', text: 'Profile and settings pages use standard dialog components' },
      { type: 'improvement', text: 'API key deletion requires confirmation' },
    ],
  },
  {
    version: '1.4.0',
    date: 'January 28, 2026',
    title: 'Project Management & Confirmations',
    description: 'Enhanced project management with delete/archive confirmations and toast notifications.',
    highlights: ['Delete Confirmation', 'Archive Projects', 'Toast Notifications'],
    changes: [
      { type: 'feature', text: 'Delete projects with confirmation dialog' },
      { type: 'feature', text: 'Archive projects to move them out of active list' },
      { type: 'feature', text: 'Toast notifications for success and error feedback' },
      { type: 'improvement', text: 'Project dropdown menus with icons and better UX' },
      { type: 'improvement', text: 'Confirmation dialogs prevent accidental deletions' },
    ],
  },
  {
    version: '1.3.0',
    date: 'January 28, 2026',
    title: 'Theme Toggle & REST API',
    description: 'Quick theme switching and full REST API for project management.',
    highlights: ['Dark Mode Toggle', 'REST API', 'Component Library'],
    changes: [
      { type: 'feature', text: 'Added theme toggle button in header for quick dark/light mode switching' },
      { type: 'feature', text: 'New REST API endpoints for projects (GET, POST, PATCH, DELETE)' },
      { type: 'feature', text: 'SearchInput and FileUpload components added' },
      { type: 'feature', text: 'Component index for convenient imports' },
      { type: 'improvement', text: 'Enhanced command palette with theme toggle and sign out' },
      { type: 'fix', text: 'Fixed useSyncExternalStore infinite loop in localStorage hooks' },
    ],
  },
  {
    version: '1.2.0',
    date: 'January 27, 2026',
    title: 'Command Palette & Activity Log',
    description: 'Quickly navigate anywhere with Cmd+K and track all your actions.',
    highlights: ['Command Palette', 'Activity Log', 'Mobile Navigation'],
    changes: [
      { type: 'feature', text: 'Added command palette (Cmd+K) for quick navigation' },
      { type: 'feature', text: 'New Activity Log page with searchable timeline' },
      { type: 'feature', text: 'Mobile navigation with slide-out menu' },
      { type: 'improvement', text: 'Enhanced project detail page with pipeline progress' },
      { type: 'improvement', text: 'Added activity timeline to project pages' },
      { type: 'fix', text: 'Fixed navigation active state highlighting' },
    ],
  },
  {
    version: '1.1.0',
    date: 'January 26, 2026',
    title: 'Notifications & Billing',
    description: 'Stay informed with notifications and manage your subscription.',
    highlights: ['Notifications System', 'Billing Page', 'Help Center'],
    changes: [
      { type: 'feature', text: 'Added notifications page with read/unread filtering' },
      { type: 'feature', text: 'New billing page with subscription plans' },
      { type: 'feature', text: 'Help center with searchable FAQ' },
      { type: 'improvement', text: 'Enhanced deploy page with provider management' },
      { type: 'improvement', text: 'Added notification badge to header' },
    ],
  },
  {
    version: '1.0.0',
    date: 'January 25, 2026',
    title: 'Initial Release',
    description: 'The first public release of DevDudes with the complete 7 Dudes pipeline.',
    highlights: ['7 Dudes Pipeline', 'AI Generation', 'Templates'],
    changes: [
      { type: 'feature', text: 'Complete 7-step Dudes pipeline (Preset, Combo, Prepair, Dev, Test, Deploy, Docu)' },
      { type: 'feature', text: 'AI-powered app architecture generation' },
      { type: 'feature', text: '6 pre-built templates for common business apps' },
      { type: 'feature', text: 'Database connection management' },
      { type: 'feature', text: 'Project management with status tracking' },
      { type: 'feature', text: 'User authentication with email and OAuth' },
    ],
  },
]

const typeConfig = {
  feature: { label: 'New', color: 'bg-green-100 text-green-700', icon: Sparkles },
  improvement: { label: 'Improved', color: 'bg-blue-100 text-blue-700', icon: Wrench },
  fix: { label: 'Fixed', color: 'bg-yellow-100 text-yellow-700', icon: Bug },
  breaking: { label: 'Breaking', color: 'bg-red-100 text-red-700', icon: Rocket },
}

export default function WhatsNewPage() {
  const latestVersion = changelog[0]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">What&apos;s New</h2>
        <p className="text-muted-foreground">
          Latest updates and improvements to DevDudes
        </p>
      </div>

      {/* Latest Release Highlight */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/20">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{latestVersion.title}</h3>
                  <Badge variant="secondary">v{latestVersion.version}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{latestVersion.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {latestVersion.highlights?.map((highlight) => (
                <Badge key={highlight} variant="outline" className="bg-background">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version History */}
      <div className="space-y-6">
        {changelog.map((entry, index) => (
          <Card key={entry.version}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <CardTitle className="text-lg">{entry.title}</CardTitle>
                    <Badge variant="outline">v{entry.version}</Badge>
                    {index === 0 && (
                      <Badge className="bg-primary">Latest</Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {entry.date}
                  </CardDescription>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                {entry.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {entry.changes.map((change, i) => {
                  const config = typeConfig[change.type]
                  const Icon = config.icon
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
                        <Icon className="h-3 w-3" />
                        {config.label}
                      </span>
                      <span className="text-sm">{change.text}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscribe for Updates */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Get notified about new features and updates
              </p>
            </div>
            <Link href="/dashboard/settings">
              <Button variant="outline">
                Manage Notifications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
