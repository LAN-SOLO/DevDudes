'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Activity,
  Search,
  Download,
  FolderOpen,
  Rocket,
  Settings,
  Database,
  FileCode,
  Key,
  Clock,
  Calendar,
} from 'lucide-react'

interface ActivityItem {
  id: string
  action: string
  description: string
  category: 'project' | 'deployment' | 'settings' | 'database' | 'auth' | 'api'
  timestamp: string
  metadata?: {
    projectId?: string
    projectName?: string
    resourceName?: string
  }
}

const activities: ActivityItem[] = [
  {
    id: '1',
    action: 'Project Created',
    description: 'Created new project "Customer Portal"',
    category: 'project',
    timestamp: '2024-01-28T10:30:00Z',
    metadata: { projectId: '1', projectName: 'Customer Portal' },
  },
  {
    id: '2',
    action: 'Configuration Saved',
    description: 'Saved preset configuration for "Customer Portal"',
    category: 'project',
    timestamp: '2024-01-28T10:35:00Z',
    metadata: { projectId: '1', projectName: 'Customer Portal' },
  },
  {
    id: '3',
    action: 'AI Concept Generated',
    description: 'Generated app architecture and design',
    category: 'project',
    timestamp: '2024-01-28T10:40:00Z',
    metadata: { projectId: '1', projectName: 'Customer Portal' },
  },
  {
    id: '4',
    action: 'Database Connected',
    description: 'Connected to "Production DB" (Supabase)',
    category: 'database',
    timestamp: '2024-01-28T09:00:00Z',
    metadata: { resourceName: 'Production DB' },
  },
  {
    id: '5',
    action: 'API Key Generated',
    description: 'Created new API key "Production API Key"',
    category: 'api',
    timestamp: '2024-01-27T15:00:00Z',
    metadata: { resourceName: 'Production API Key' },
  },
  {
    id: '6',
    action: 'Deployment Completed',
    description: 'Deployed "Customer Portal" to Vercel',
    category: 'deployment',
    timestamp: '2024-01-28T11:00:00Z',
    metadata: { projectId: '1', projectName: 'Customer Portal' },
  },
  {
    id: '7',
    action: 'Profile Updated',
    description: 'Updated profile information',
    category: 'settings',
    timestamp: '2024-01-26T14:30:00Z',
  },
  {
    id: '8',
    action: 'Password Changed',
    description: 'Password updated successfully',
    category: 'auth',
    timestamp: '2024-01-25T10:00:00Z',
  },
  {
    id: '9',
    action: 'Theme Changed',
    description: 'Changed theme to "Dark"',
    category: 'settings',
    timestamp: '2024-01-25T09:45:00Z',
  },
  {
    id: '10',
    action: 'Project Archived',
    description: 'Archived project "Old Demo App"',
    category: 'project',
    timestamp: '2024-01-24T16:00:00Z',
    metadata: { projectName: 'Old Demo App' },
  },
]

const categoryConfig = {
  project: { icon: FolderOpen, color: 'text-blue-500', bg: 'bg-blue-100' },
  deployment: { icon: Rocket, color: 'text-purple-500', bg: 'bg-purple-100' },
  settings: { icon: Settings, color: 'text-gray-500', bg: 'bg-gray-100' },
  database: { icon: Database, color: 'text-green-500', bg: 'bg-green-100' },
  auth: { icon: Key, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  api: { icon: FileCode, color: 'text-orange-500', bg: 'bg-orange-100' },
}

export default function ActivityPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || activity.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, ActivityItem[]>)

  const categories = [
    { id: 'project', label: t('activity.categories.projects') },
    { id: 'deployment', label: t('activity.categories.deployments') },
    { id: 'database', label: t('activity.categories.databases') },
    { id: 'settings', label: t('activity.categories.settings') },
    { id: 'auth', label: t('activity.categories.auth') },
    { id: 'api', label: t('activity.categories.api') },
  ]

  const stats = {
    total: activities.length,
    today: activities.filter(a => {
      const today = new Date()
      const activityDate = new Date(a.timestamp)
      return activityDate.toDateString() === today.toDateString()
    }).length,
    thisWeek: activities.filter(a => {
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return new Date(a.timestamp) > weekAgo
    }).length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('activity.title')}</h2>
          <p className="text-muted-foreground">
            {t('activity.subtitle')}
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">{t('activity.totalActivities')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.today}</p>
                <p className="text-sm text-muted-foreground">{t('activity.today')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.thisWeek}</p>
                <p className="text-sm text-muted-foreground">{t('activity.thisWeek')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('activity.searchActivities')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                {t('common.all')}
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('activity.activityTimeline')}</CardTitle>
          <CardDescription>
            {filteredActivities.length === 0
              ? t('activity.noActivitiesFound')
              : `${t('activity.showing')} ${filteredActivities.length} ${filteredActivities.length === 1 ? t('activity.activity') : t('activity.activities')}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Activity className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">{t('activity.noActivitiesFound')}</h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                {searchQuery || selectedCategory
                  ? t('activity.tryAdjustingFilters')
                  : 'Your activity history will appear here'}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedActivities).map(([date, items]) => (
                <div key={date}>
                  <h4 className="text-sm font-medium text-muted-foreground mb-4 sticky top-0 bg-background py-2">
                    {date}
                  </h4>
                  <div className="space-y-4">
                    {items.map((activity) => {
                      const config = categoryConfig[activity.category]
                      const Icon = config.icon

                      return (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className={`p-2 rounded-lg ${config.bg}`}>
                            <Icon className={`h-4 w-4 ${config.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-medium">{activity.action}</p>
                                <p className="text-sm text-muted-foreground">
                                  {activity.description}
                                </p>
                                {activity.metadata?.projectId && (
                                  <Link
                                    href={`/dashboard/projects/${activity.metadata.projectId}`}
                                    className="text-sm text-primary hover:underline mt-1 inline-block"
                                  >
                                    {t('activity.viewProject')}
                                  </Link>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {new Date(activity.timestamp).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{t('activity.retention')}</p>
              <p className="text-sm text-muted-foreground">
                {t('activity.retentionDesc')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
