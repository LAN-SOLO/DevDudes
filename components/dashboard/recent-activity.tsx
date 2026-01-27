import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getProjects } from '@/app/actions/projects'
import { FolderOpen, Sparkles, Rocket, Clock } from 'lucide-react'
import Link from 'next/link'

const statusIcons: Record<string, typeof FolderOpen> = {
  draft: FolderOpen,
  configuring: Sparkles,
  generating: Sparkles,
  ready: Sparkles,
  deployed: Rocket,
  archived: Clock,
}

export async function RecentActivity() {
  const { data: projects, error } = await getProjects()

  // Get 5 most recent projects
  const recentProjects = projects?.slice(0, 5) || []

  if (error || recentProjects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">No activity yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {error?.includes('does not exist')
                ? 'Run schema.sql in Supabase to set up tables.'
                : 'Your recent actions will appear here once you start creating apps.'}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => {
            const Icon = statusIcons[project.status] || FolderOpen
            const timeAgo = getTimeAgo(new Date(project.updated_at))

            return (
              <div key={project.id} className="flex items-start gap-3">
                <div className="rounded-full bg-muted p-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="hover:underline"
                    >
                      {project.name}
                    </Link>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {project.status === 'draft' ? 'Created' : `Status: ${project.status}`}
                    {' · '}
                    {timeAgo}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        {projects && projects.length > 5 && (
          <Link
            href="/dashboard/projects"
            className="block mt-4 text-sm text-center text-primary hover:underline"
          >
            View all projects
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}
