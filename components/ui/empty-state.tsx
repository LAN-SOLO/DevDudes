import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LucideIcon, Inbox, Search, FileX, FolderOpen, Users, Bell } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  className?: string
  children?: React.ReactNode
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  secondaryAction,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">
          {description}
        </p>
      )}
      {children}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          {action && (
            action.href ? (
              <Button asChild>
                <a href={action.href}>{action.label}</a>
              </Button>
            ) : (
              <Button onClick={action.onClick}>{action.label}</Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Button variant="outline" asChild>
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  )
}

// Pre-built empty states for common scenarios
export function NoResults({ searchQuery }: { searchQuery?: string }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={
        searchQuery
          ? `No results found for "${searchQuery}". Try adjusting your search.`
          : 'Try adjusting your search or filters to find what you are looking for.'
      }
    />
  )
}

export function NoProjects() {
  return (
    <EmptyState
      icon={FolderOpen}
      title="No projects yet"
      description="Get started by creating your first project with our AI-powered generator."
      action={{
        label: 'Create Project',
        href: '/dashboard/pipeline/preset',
      }}
      secondaryAction={{
        label: 'Browse Templates',
        href: '/dashboard/templates',
      }}
    />
  )
}

export function NoFiles() {
  return (
    <EmptyState
      icon={FileX}
      title="No files found"
      description="This directory is empty or the files you're looking for don't exist."
    />
  )
}

export function NoTeamMembers() {
  return (
    <EmptyState
      icon={Users}
      title="No team members"
      description="Invite team members to collaborate on your projects."
      action={{
        label: 'Invite Members',
        href: '/dashboard/team',
      }}
    />
  )
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={Bell}
      title="All caught up!"
      description="You have no new notifications. We'll let you know when something important happens."
    />
  )
}
