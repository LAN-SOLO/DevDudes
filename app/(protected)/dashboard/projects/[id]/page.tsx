import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject } from '@/app/actions/projects'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Settings, Rocket, FileCode } from 'lucide-react'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  configuring: 'bg-blue-100 text-blue-700',
  generating: 'bg-yellow-100 text-yellow-700',
  ready: 'bg-green-100 text-green-700',
  deployed: 'bg-purple-100 text-purple-700',
  archived: 'bg-red-100 text-red-700',
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: project, error } = await getProject(id)

  if (error || !project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">{project.name}</h2>
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                statusColors[project.status] || statusColors.draft
              }`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-muted-foreground">
            {project.description || 'No description'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Button>
            <Rocket className="mr-2 h-4 w-4" />
            Deploy
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Configuration and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">App Type</p>
                <p className="text-sm">{project.app_type || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="text-sm capitalize">{project.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p className="text-sm">
                  {new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p className="text-sm">
                  {new Date(project.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {project.preset_config && Object.keys(project.preset_config).length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Configuration</p>
                <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">
                  {JSON.stringify(project.preset_config, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileCode className="mr-2 h-4 w-4" />
                View Code
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Edit Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                Delete Project
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Deployments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No deployments yet. Deploy your app to see it here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
