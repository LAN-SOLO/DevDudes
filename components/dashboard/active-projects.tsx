import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Workflow, FolderOpen } from 'lucide-react'
import { getProjects } from '@/app/actions/projects'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  configuring: 'bg-blue-100 text-blue-700',
  generating: 'bg-yellow-100 text-yellow-700',
  ready: 'bg-green-100 text-green-700',
  deployed: 'bg-purple-100 text-purple-700',
}

const pipelineSteps = ['Preset', 'Combo', 'Prepair', 'Dev', 'Test', 'Deploy', 'Docu']

function getPipelineProgress(status: string): number {
  switch (status) {
    case 'draft': return 0
    case 'configuring': return 1
    case 'generating': return 2
    case 'ready': return 4
    case 'deployed': return 6
    default: return 0
  }
}

function getNextPipelineStep(status: string, projectId: string): { label: string; href: string } | null {
  switch (status) {
    case 'configuring':
      return { label: 'Continue', href: `/dashboard/pipeline/combo?project=${projectId}` }
    case 'generating':
      return { label: 'Continue', href: `/dashboard/pipeline/prepair?project=${projectId}` }
    case 'ready':
      return { label: 'Deploy', href: `/dashboard/pipeline/deploy?project=${projectId}` }
    default:
      return null
  }
}

export async function ActiveProjects() {
  const { data: projects, error } = await getProjects()

  // Get active projects (not deployed or archived)
  const activeProjects = projects?.filter(p =>
    !['deployed', 'archived'].includes(p.status)
  ).slice(0, 3) || []

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            Active Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {error.includes('does not exist')
              ? 'Set up your database to see active projects.'
              : 'Unable to load projects.'}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (activeProjects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            Active Pipeline
          </CardTitle>
          <CardDescription>
            No active projects in the pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <FolderOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Start the pipeline to create your first app
            </p>
            <Link href="/dashboard/pipeline/preset">
              <Button size="sm">
                Start Pipeline
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              Active Pipeline
            </CardTitle>
            <CardDescription>
              {activeProjects.length} project{activeProjects.length !== 1 ? 's' : ''} in progress
            </CardDescription>
          </div>
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeProjects.map((project) => {
          const progress = getPipelineProgress(project.status)
          const nextStep = getNextPipelineStep(project.status, project.id)

          return (
            <div key={project.id} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="font-medium hover:underline"
                  >
                    {project.name}
                  </Link>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                {nextStep && (
                  <Link href={nextStep.href}>
                    <Button size="sm" variant="outline">
                      {nextStep.label}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex gap-0.5">
                {pipelineSteps.map((step, index) => (
                  <div
                    key={step}
                    className={`flex-1 h-1.5 rounded-full ${
                      index < progress
                        ? 'bg-primary'
                        : index === progress
                          ? 'bg-primary/50'
                          : 'bg-muted'
                    }`}
                    title={step}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
