import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FolderOpen, Plus, MoreVertical } from 'lucide-react'
import { getProjects } from '@/app/actions/projects'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  configuring: 'bg-blue-100 text-blue-700',
  generating: 'bg-yellow-100 text-yellow-700',
  ready: 'bg-green-100 text-green-700',
  deployed: 'bg-purple-100 text-purple-700',
  archived: 'bg-red-100 text-red-700',
}

export default async function ProjectsPage() {
  const { data: projects, error } = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your generated applications
          </p>
        </div>
        <Link href="/dashboard/generator">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {error && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {error === 'relation "public.projects" does not exist' ? (
              <div>
                <p className="mb-2">Database tables not set up yet.</p>
                <p className="text-sm">Run the schema.sql in Supabase SQL Editor.</p>
              </div>
            ) : (
              <p>Error loading projects: {error}</p>
            )}
          </CardContent>
        </Card>
      )}

      {!error && (!projects || projects.length === 0) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">No projects yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
              Generate your first application to see it here.
            </p>
            <Link href="/dashboard/generator">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First App
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {projects && projects.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="hover:underline"
                      >
                        {project.name}
                      </Link>
                    </CardTitle>
                    <span
                      className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                        statusColors[project.status] || statusColors.draft
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/projects/${project.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/projects/${project.id}/edit`}>
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  {project.description || 'No description'}
                </CardDescription>
                <p className="text-xs text-muted-foreground mt-3">
                  Created {new Date(project.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
