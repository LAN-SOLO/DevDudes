'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Rocket,
  AlertCircle,
  Info,
  Sparkles,
  Settings,
  Clock,
} from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'deployment'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  actionLabel?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Deployment Successful',
      message: 'Your app "Customer Portal" has been deployed to production successfully.',
      timestamp: '2 hours ago',
      read: false,
      actionUrl: '/dashboard/deploy',
      actionLabel: 'View Deployment',
    },
    {
      id: '2',
      type: 'info',
      title: 'Welcome to DevDudes!',
      message: 'Get started by creating your first app with our AI-powered generator.',
      timestamp: '1 day ago',
      read: false,
      actionUrl: '/dashboard/generator',
      actionLabel: 'Start Building',
    },
    {
      id: '3',
      type: 'warning',
      title: 'Database Connection Issue',
      message: 'Unable to sync with "Production DB". Please check your connection settings.',
      timestamp: '2 days ago',
      read: true,
      actionUrl: '/dashboard/connections',
      actionLabel: 'View Connections',
    },
    {
      id: '4',
      type: 'deployment',
      title: 'New Feature Available',
      message: 'Test Dude is now available in the pipeline. Run automated tests before deployment.',
      timestamp: '3 days ago',
      read: true,
    },
    {
      id: '5',
      type: 'info',
      title: 'Weekly Summary',
      message: 'You created 0 projects and deployed 0 apps this week. Keep building!',
      timestamp: '1 week ago',
      read: true,
    },
  ])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      case 'deployment':
        return <Rocket className="h-5 w-5 text-purple-500" />
    }
  }

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-100'
      case 'warning':
        return 'bg-yellow-100'
      case 'info':
        return 'bg-blue-100'
      case 'deployment':
        return 'bg-purple-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Stay updated on your projects and deployments
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total Notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.length - unreadCount}</p>
                <p className="text-sm text-muted-foreground">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </Button>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filter === 'unread' ? 'Unread Notifications' : 'All Notifications'}
          </CardTitle>
          <CardDescription>
            {filteredNotifications.length === 0
              ? 'No notifications to show'
              : `Showing ${filteredNotifications.length} notification${filteredNotifications.length === 1 ? '' : 's'}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">
                {filter === 'unread' ? 'All caught up!' : 'No notifications yet'}
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                {filter === 'unread'
                  ? 'You have read all your notifications.'
                  : 'Notifications about your projects and deployments will appear here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${
                    !notification.read ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg ${getBgColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        {notification.actionUrl && (
                          <a
                            href={notification.actionUrl}
                            className="text-sm text-primary hover:underline mt-2 inline-block"
                          >
                            {notification.actionLabel || 'View'}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-red-500"
                          onClick={() => deleteNotification(notification.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings Link */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Notification Preferences</p>
                <p className="text-sm text-muted-foreground">
                  Customize which notifications you receive
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <a href="/dashboard/settings">
                <Sparkles className="mr-2 h-4 w-4" />
                Manage Settings
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
