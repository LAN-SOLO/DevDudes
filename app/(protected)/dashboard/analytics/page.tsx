'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import { useTranslation } from '@/lib/i18n/language-provider'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Zap,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
} from 'lucide-react'

interface MetricCard {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: typeof BarChart3
  color: string
}

interface ProjectMetric {
  id: string
  name: string
  views: number
  users: number
  avgTime: string
  trend: 'up' | 'down' | 'stable'
}

const projectMetrics: ProjectMetric[] = [
  { id: '1', name: 'Customer Portal', views: 5420, users: 1245, avgTime: '5m 12s', trend: 'up' },
  { id: '2', name: 'Inventory System', views: 3210, users: 890, avgTime: '3m 45s', trend: 'up' },
  { id: '3', name: 'Analytics Dashboard', views: 2180, users: 654, avgTime: '6m 30s', trend: 'stable' },
  { id: '4', name: 'E-commerce API', views: 1890, users: 432, avgTime: '2m 15s', trend: 'down' },
]

const chartData = [
  { day: 'Mon', views: 1200, users: 320 },
  { day: 'Tue', views: 1800, users: 450 },
  { day: 'Wed', views: 2100, users: 520 },
  { day: 'Thu', views: 1900, users: 480 },
  { day: 'Fri', views: 2400, users: 610 },
  { day: 'Sat', views: 1600, users: 390 },
  { day: 'Sun', views: 1400, users: 340 },
]

const topLocations = [
  { country: 'United States', flag: '🇺🇸', visitors: 1245, percentage: 36 },
  { country: 'United Kingdom', flag: '🇬🇧', visitors: 678, percentage: 20 },
  { country: 'Germany', flag: '🇩🇪', visitors: 432, percentage: 13 },
  { country: 'France', flag: '🇫🇷', visitors: 321, percentage: 9 },
  { country: 'Canada', flag: '🇨🇦', visitors: 289, percentage: 8 },
]

export default function AnalyticsPage() {
  const { addToast } = useToast()
  const { t } = useTranslation()
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const metrics: MetricCard[] = [
    {
      title: t('analytics.totalPageviews'),
      value: '12,847',
      change: 12.5,
      changeLabel: t('analytics.vsLastMonth'),
      icon: Eye,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: t('analytics.uniqueVisitors'),
      value: '3,429',
      change: 8.2,
      changeLabel: t('analytics.vsLastMonth'),
      icon: Users,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: t('analytics.avgSessionDuration'),
      value: '4m 32s',
      change: -2.1,
      changeLabel: t('analytics.vsLastMonth'),
      icon: Clock,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: t('analytics.apiCalls'),
      value: '45,231',
      change: 23.7,
      changeLabel: t('analytics.vsLastMonth'),
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    addToast({
      type: 'success',
      title: t('analytics.toasts.dataRefreshedTitle'),
      description: t('analytics.toasts.dataRefreshedDesc'),
    })
  }

  const handleExport = () => {
    addToast({
      type: 'info',
      title: t('analytics.toasts.exportingTitle'),
      description: t('analytics.toasts.exportingDesc'),
    })
  }

  const maxViews = Math.max(...chartData.map(d => d.views))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('analytics.title')}</h2>
          <p className="text-muted-foreground">
            {t('analytics.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border bg-muted p-1">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-background shadow-sm font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range === '7d' ? t('analytics.days7') : range === '30d' ? t('analytics.days30') : t('analytics.days90')}
              </button>
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            {t('common.export')}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <metric.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Traffic Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('analytics.trafficOverview')}</CardTitle>
                <CardDescription>{t('analytics.trafficDesc')}</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{t('common.views')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">{t('common.users')}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {chartData.map((data) => (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 items-end h-48">
                    <div
                      className="flex-1 bg-primary rounded-t transition-all hover:opacity-80"
                      style={{ height: `${(data.views / maxViews) * 100}%` }}
                      title={`${data.views} views`}
                    />
                    <div
                      className="flex-1 bg-green-500 rounded-t transition-all hover:opacity-80"
                      style={{ height: `${(data.users / maxViews) * 100}%` }}
                      title={`${data.users} users`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('analytics.topLocations')}
            </CardTitle>
            <CardDescription>{t('analytics.topLocationsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLocations.map((location) => (
                <div key={location.country} className="flex items-center gap-3">
                  <span className="text-xl">{location.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">{location.country}</span>
                      <span className="text-sm text-muted-foreground">{location.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Performance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('analytics.projectPerformance')}</CardTitle>
              <CardDescription>{t('analytics.projectPerformanceDesc')}</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              {t('common.viewAll')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 pr-4 font-medium">{t('analytics.project')}</th>
                  <th className="text-right py-3 px-4 font-medium">{t('analytics.pageviews')}</th>
                  <th className="text-right py-3 px-4 font-medium">{t('common.users')}</th>
                  <th className="text-right py-3 px-4 font-medium">{t('analytics.avgTime')}</th>
                  <th className="text-right py-3 pl-4 font-medium">{t('analytics.trend')}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {projectMetrics.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/50">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BarChart3 className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{project.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-mono">
                      {project.views.toLocaleString()}
                    </td>
                    <td className="text-right py-4 px-4 font-mono">
                      {project.users.toLocaleString()}
                    </td>
                    <td className="text-right py-4 px-4 text-muted-foreground">
                      {project.avgTime}
                    </td>
                    <td className="text-right py-4 pl-4">
                      {project.trend === 'up' ? (
                        <Badge className="bg-green-100 text-green-700">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          {t('common.up')}
                        </Badge>
                      ) : project.trend === 'down' ? (
                        <Badge className="bg-red-100 text-red-700">
                          <TrendingDown className="mr-1 h-3 w-3" />
                          {t('common.down')}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">{t('common.stable')}</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              {t('analytics.realTimeVisitors')}
            </CardTitle>
            <CardDescription>{t('analytics.realTimeDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-5xl font-bold">24</p>
                <p className="text-sm text-muted-foreground mt-2">{t('analytics.activeUsersNow')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-lg font-semibold">12</p>
                <p className="text-xs text-muted-foreground">Customer Portal</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">8</p>
                <p className="text-xs text-muted-foreground">Inventory System</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">4</p>
                <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.topPages')}</CardTitle>
            <CardDescription>{t('analytics.topPagesDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { path: '/dashboard', views: 2340, app: 'Customer Portal' },
                { path: '/products', views: 1890, app: 'Inventory System' },
                { path: '/analytics', views: 1456, app: 'Analytics Dashboard' },
                { path: '/orders', views: 1234, app: 'Customer Portal' },
                { path: '/settings', views: 987, app: 'Customer Portal' },
              ].map((page, i) => (
                <div key={page.path} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-6">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium font-mono truncate">{page.path}</p>
                    <p className="text-xs text-muted-foreground">{page.app}</p>
                  </div>
                  <span className="text-sm font-mono">{page.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Prompt */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t('analytics.wantMoreInsights')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('analytics.upgradeForAnalytics')}
                </p>
              </div>
            </div>
            <Button asChild>
              <a href="/dashboard/billing">{t('analytics.upgradeToPro')}</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
