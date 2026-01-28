'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, Check, Sparkles, AlertCircle, CreditCard, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'billing' | 'team'
  title: string
  message: string
  time: string
  read: boolean
}

// Mock notifications - in a real app these would come from the database
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Deployment Complete',
    message: 'Your app "E-commerce Store" is now live',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'New Feature Available',
    message: 'Try our new AI-powered code review',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'team',
    title: 'Team Invitation',
    message: 'John invited you to join "Acme Corp"',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'billing',
    title: 'Payment Successful',
    message: 'Your Pro subscription is now active',
    time: '1 day ago',
    read: true,
  },
]

const typeConfig = {
  info: { icon: Sparkles, color: 'text-blue-500 bg-blue-100' },
  success: { icon: Check, color: 'text-green-500 bg-green-100' },
  warning: { icon: AlertCircle, color: 'text-yellow-500 bg-yellow-100' },
  billing: { icon: CreditCard, color: 'text-purple-500 bg-purple-100' },
  team: { icon: Users, color: 'text-orange-500 bg-orange-100' },
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            notifications.slice(0, 5).map((notification) => {
              const config = typeConfig[notification.type]
              const Icon = config.icon
              return (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    'w-full flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left',
                    !notification.read && 'bg-primary/5'
                  )}
                >
                  <div className={cn('p-2 rounded-full', config.color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </button>
              )
            })
          )}
        </div>

        <div className="border-t p-2">
          <Link
            href="/dashboard/notifications"
            onClick={() => setOpen(false)}
            className="block w-full text-center text-sm text-primary hover:underline py-2"
          >
            View all notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
