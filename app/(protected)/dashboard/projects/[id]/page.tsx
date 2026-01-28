import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject } from '@/app/actions/projects'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Settings,
  FileCode,
  Trash2,
  ExternalLink,
  CheckCircle,
  Clock,
  Database,
  Globe,
  Play,
  Download,
  Copy,
  MoreVertical,
} from 'lucide-react'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  configuring: 'bg-blue-100 text-blue-700',
  generating: 'bg-yellow-100 text-yellow-700',
  ready: 'bg-green-100 text-green-700',
  deployed: 'bg-purple-100 text-purple-700',
  archived: 'bg-red-100 text-red-700',
}

const pipelineSteps = [
  { id: 'preset', name: 'Preset', status: 'configuring' },
  { id: 'combo', name: 'Combo', status: 'generating' },
  { id: 'prepair', name: 'Prepair', status: 'generating' },
  { id: 'dev', name: 'Dev', status: 'generating' },
  { id: 'test', name: 'Test', status: 'ready' },
  { id: 'deploy', name: 'Deploy', status: 'deployed' },
  { id: 'docu', name: 'Docu', status: 'deployed' },
]

function getPipelineProgress(status: string): number {
  const statusMap: Record<string, number> = {
    draft: 0,
    configuring: 1,
    generating: 3,
    ready: 5,
    deployed: 7,
  }
  return statusMap[status] || 0
}

function getNextStep(status: string): { step: string; href: string } | null {
  const stepMap: Record<string, { step: string; href: string }> = {
    draft: { step: 'preset', href: '/dashboard/pipeline/preset' },
    configuring: { step: 'combo', href: '/dashboard/pipeline/combo' },
    generating: { step: 'dev', href: '/dashboard/pipeline/dev' },
    ready: { step: 'deploy', href: '/dashboard/pipeline/deploy' },
  }
  return stepMap[status] || null
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

  const progress = getPipelineProgress(project.status)
  const nextStep = getNextStep(project.status)
  const presetConfig = (project.preset_config ?? {}) as Record<string, unknown>
  const generatedConcept = (project.generated_concept ?? {}) as Record<string, unknown>

  // Mock activity data - in a real app this would come from a database
  const activities = [
    { id: '1', action: 'Project created', timestamp: project.created_at, type: 'create' },
    ...(project.status !== 'draft' ? [{ id: '2', action: 'Configuration saved', timestamp: project.updated_at, type: 'config' }] : []),
    ...(progress >= 3 ? [{ id: '3', action: 'AI concept generated', timestamp: project.updated_at, type: 'generate' }] : []),
    ...(progress >= 5 ? [{ id: '4', action: 'Code generation completed', timestamp: project.updated_at, type: 'code' }] : []),
    ...(project.status === 'deployed' ? [{ id: '5', action: 'Deployed to production', timestamp: project.updated_at, type: 'deploy' }] : []),
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
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
              className={`px-2 py-0.5 text-xs rounded-full capitalize ${
                statusColors[project.status] || statusColors.draft
              }`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-muted-foreground">
            {project.description || 'No description provided'}
          </p>
        </div>
        <div className="flex gap-2">
          {nextStep && (
            <Link href={`${nextStep.href}?project=${project.id}`}>
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Continue Pipeline
              </Button>
            </Link>
          )}
          {project.status === 'deployed' && (
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Pipeline Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pipeline Progress</CardTitle>
          <CardDescription>Track your app through the 7 Dudes workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {pipelineSteps.map((step, index) => {
              const isCompleted = index < progress
              const isCurrent = index === progress
              const isUpcoming = index > progress

              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    {index > 0 && (
                      <div
                        className={`h-1 flex-1 ${
                          isCompleted ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? 'bg-primary text-primary-foreground'
                          : isCurrent
                            ? 'bg-primary/20 text-primary border-2 border-primary'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    {index < pipelineSteps.length - 1 && (
                      <div
                        className={`h-1 flex-1 ${
                          isCompleted ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      isCurrent ? 'text-primary font-medium' : isUpcoming ? 'text-muted-foreground' : ''
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Configuration and metadata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">App Type</p>
                  <p className="text-sm">{project.app_type || 'Not specified'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="text-sm capitalize">{project.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-sm">
                    {new Date(project.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="space-y-1">
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
            </CardContent>
          </Card>

          {/* Configuration Preview */}
          {presetConfig && Object.keys(presetConfig).length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Configuration</CardTitle>
                    <CardDescription>Preset Dude settings</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Boolean(presetConfig.appName) && (
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">App Name</p>
                      <p className="text-sm font-medium">{String(presetConfig.appName)}</p>
                    </div>
                  )}
                  {Boolean(presetConfig.industry) && (
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Industry</p>
                      <p className="text-sm font-medium">{String(presetConfig.industry)}</p>
                    </div>
                  )}
                  {Boolean(presetConfig.authMethods) && (
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Auth Methods</p>
                      <p className="text-sm font-medium">
                        {Array.isArray(presetConfig.authMethods)
                          ? (presetConfig.authMethods as string[]).join(', ')
                          : String(presetConfig.authMethods)}
                      </p>
                    </div>
                  )}
                  {Boolean(presetConfig.features) && (
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Features</p>
                      <p className="text-sm font-medium">
                        {Array.isArray(presetConfig.features)
                          ? `${(presetConfig.features as unknown[]).length} selected`
                          : String(presetConfig.features)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Concept Preview */}
          {Object.keys(generatedConcept).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Concept</CardTitle>
                <CardDescription>AI-designed architecture from Combo Dude</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Boolean(generatedConcept.architecture) && (
                    <div>
                      <p className="text-sm font-medium mb-2">Architecture</p>
                      <p className="text-sm text-muted-foreground">
                        {typeof generatedConcept.architecture === 'string'
                          ? generatedConcept.architecture
                          : JSON.stringify(generatedConcept.architecture)}
                      </p>
                    </div>
                  )}
                  {Array.isArray(generatedConcept.pages) && (generatedConcept.pages as unknown[]).length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Pages ({(generatedConcept.pages as unknown[]).length})</p>
                      <div className="flex flex-wrap gap-2">
                        {(generatedConcept.pages as unknown[]).slice(0, 8).map((page, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-md bg-muted"
                          >
                            {typeof page === 'string' ? page : (page as { name?: string }).name || `Page ${i + 1}`}
                          </span>
                        ))}
                        {(generatedConcept.pages as unknown[]).length > 8 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                            +{(generatedConcept.pages as unknown[]).length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {nextStep && (
                <Link href={`${nextStep.href}?project=${project.id}`} className="block">
                  <Button variant="default" className="w-full justify-start">
                    <Play className="mr-2 h-4 w-4" />
                    Continue to {nextStep.step.charAt(0).toUpperCase() + nextStep.step.slice(1)}
                  </Button>
                </Link>
              )}
              <Link href={`/dashboard/pipeline/dev?project=${project.id}`} className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FileCode className="mr-2 h-4 w-4" />
                  View Code
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Export Project
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Edit Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </Button>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity</CardTitle>
              <CardDescription>Recent actions on this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full ${
                        index === 0 ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`} />
                      {index < activities.length - 1 && (
                        <div className="w-px h-full bg-border mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Database:</span>
                <span>Supabase</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Deployment:</span>
                <span>{project.status === 'deployed' ? 'Vercel' : 'Not deployed'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Age:</span>
                <span>{getTimeAgo(new Date(project.created_at))}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`
  return `${Math.floor(seconds / 2592000)} months ago`
}
