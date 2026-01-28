import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FolderOpen, Plus, Workflow } from 'lucide-react'
import { getProjects } from '@/app/actions/projects'
import { ActiveProjectActions, ProjectActions } from '@/components/dashboard/project-actions'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  configuring: 'bg-blue-100 text-blue-700',
  generating: 'bg-yellow-100 text-yellow-700',
  ready: 'bg-green-100 text-green-700',
  deployed: 'bg-purple-100 text-purple-700',
  archived: 'bg-red-100 text-red-700',
}

const pipelineSteps = ['Preset', 'Combo', 'Prepair', 'Dev', 'Deploy', 'Docu']

function getPipelineProgress(status: string): number {
  switch (status) {
    case 'draft': return 0
    case 'configuring': return 1
    case 'generating': return 2
    case 'ready': return 4
    case 'deployed': return 5
    default: return 0
  }
}

function getNextPipelineStep(status: string, projectId: string): { label: string; href: string } | null {
  switch (status) {
    case 'draft':
      return { label: 'Start Pipeline', href: `/dashboard/pipeline/preset` }
    case 'configuring':
      return { label: 'Continue to Combo', href: `/dashboard/pipeline/combo?project=${projectId}` }
    case 'generating':
      return { label: 'Continue to Prepair', href: `/dashboard/pipeline/prepair?project=${projectId}` }
    case 'ready':
      return { label: 'Continue to Deploy', href: `/dashboard/pipeline/deploy?project=${projectId}` }
    case 'deployed':
      return { label: 'View Documentation', href: `/dashboard/pipeline/docu?project=${projectId}` }
    default:
      return null
  }
}

export default async function ProjectsPage() {
  const { data: projects, error } = await getProjects()

  // Separate active pipeline projects from completed ones
  const activeProjects = projects?.filter(p => !['deployed', 'archived'].includes(p.status)) || []
  const completedProjects = projects?.filter(p => ['deployed', 'archived'].includes(p.status)) || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your generated applications
          </p>
        </div>
        <Link href="/dashboard/pipeline/preset">
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
              Start the pipeline to create your first application.
            </p>
            <Link href="/dashboard/pipeline/preset">
              <Button>
                <Workflow className="mr-2 h-4 w-4" />
                Start Pipeline
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Active Pipeline Projects */}
      {activeProjects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Pipeline</h3>
          <div className="grid gap-4">
            {activeProjects.map((project) => {
              const progress = getPipelineProgress(project.status)
              const nextStep = getNextPipelineStep(project.status, project.id)

              return (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
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
                        <CardDescription className="line-clamp-1">
                          {project.description || 'No description'}
                        </CardDescription>
                      </div>
                      <ActiveProjectActions
                        projectId={project.id}
                        projectName={project.name}
                        nextStep={nextStep}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Pipeline Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Pipeline Progress</span>
                        <span>{progress} / {pipelineSteps.length} steps</span>
                      </div>
                      <div className="flex gap-1">
                        {pipelineSteps.map((step, index) => (
                          <div
                            key={step}
                            className={`flex-1 h-2 rounded-full ${
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
                      <div className="flex justify-between text-xs text-muted-foreground">
                        {pipelineSteps.map((step, index) => (
                          <span
                            key={step}
                            className={index <= progress ? 'text-foreground' : ''}
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Completed Projects</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedProjects.map((project) => (
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
                    <ProjectActions
                      projectId={project.id}
                      projectName={project.name}
                      status={project.status}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {project.description || 'No description'}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground mt-3">
                    Deployed {new Date(project.updated_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
