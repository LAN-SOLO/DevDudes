'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wrench, ArrowLeft, ArrowRight, Terminal, FolderTree, Package, Check, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { getProjectConfig, updateProjectStatus } from '@/app/actions/pipeline'

interface SetupTask {
  id: string
  name: string
  description: string
  status: 'pending' | 'running' | 'complete' | 'error'
  icon: typeof FolderTree
}

export default function PrepairDudePage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')

  const [project, setProject] = useState<{ name: string; preset_config: Record<string, unknown> } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSetupRunning, setIsSetupRunning] = useState(false)
  const [tasks, setTasks] = useState<SetupTask[]>([
    { id: 'structure', name: 'Project Structure', description: 'Creating folder structure and base files', status: 'pending', icon: FolderTree },
    { id: 'dependencies', name: 'Dependencies', description: 'Installing required packages', status: 'pending', icon: Package },
    { id: 'environment', name: 'Environment', description: 'Configuring environment variables', status: 'pending', icon: Terminal },
    { id: 'database', name: 'Database', description: 'Setting up database schema', status: 'pending', icon: FolderTree },
    { id: 'auth', name: 'Authentication', description: 'Configuring auth providers', status: 'pending', icon: Package },
  ])

  useEffect(() => {
    async function loadProject() {
      if (!projectId) {
        setIsLoading(false)
        return
      }

      const result = await getProjectConfig(projectId)
      if (!result.error && result.data) {
        setProject({
          name: result.data.name,
          preset_config: result.data.preset_config as Record<string, unknown>
        })
      }
      setIsLoading(false)
    }
    loadProject()
  }, [projectId])

  const runSetup = async () => {
    setIsSetupRunning(true)

    // Simulate progressive setup
    for (let i = 0; i < tasks.length; i++) {
      setTasks(prev => prev.map((t, idx) =>
        idx === i ? { ...t, status: 'running' } : t
      ))

      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500))

      setTasks(prev => prev.map((t, idx) =>
        idx === i ? { ...t, status: 'complete' } : t
      ))
    }

    // Update project status
    if (projectId) {
      await updateProjectStatus(projectId, 'ready')
    }

    setIsSetupRunning(false)
  }

  const allComplete = tasks.every(t => t.status === 'complete')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pipeline">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Prepair Dude</h2>
          <p className="text-muted-foreground">
            Set up your development environment automatically
          </p>
        </div>
      </div>

      {!projectId ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-yellow-100">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <CardTitle>No Project Selected</CardTitle>
                <CardDescription>
                  Complete the Preset and Combo Dude steps first
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/pipeline/preset">
              <Button>
                Start with Preset Dude
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Setting up: {project?.name || 'Project'}</CardTitle>
              <CardDescription>
                Prepair Dude will configure your complete development environment
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
                  <FolderTree className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">Project Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Creates optimized folder structure based on your app requirements
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Installs and configures all required packages and libraries
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
                  <Terminal className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sets up environment variables and configuration files
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Setup Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Setup Tasks</CardTitle>
              <CardDescription>
                {allComplete
                  ? 'All setup tasks completed successfully!'
                  : isSetupRunning
                    ? 'Setting up your environment...'
                    : 'Click the button below to start environment setup'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    task.status === 'complete' ? 'bg-green-100' :
                    task.status === 'running' ? 'bg-primary/10' :
                    task.status === 'error' ? 'bg-red-100' :
                    'bg-muted'
                  }`}>
                    {task.status === 'complete' ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : task.status === 'running' ? (
                      <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    ) : task.status === 'error' ? (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <task.icon className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{task.name}</p>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.status === 'complete' ? 'bg-green-100 text-green-700' :
                    task.status === 'running' ? 'bg-primary/10 text-primary' :
                    task.status === 'error' ? 'bg-red-100 text-red-700' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {task.status === 'complete' ? 'Complete' :
                     task.status === 'running' ? 'Running' :
                     task.status === 'error' ? 'Error' :
                     'Pending'}
                  </span>
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                {allComplete ? (
                  <Link href={`/dashboard/pipeline/dev?project=${projectId}`}>
                    <Button>
                      Continue to Dev Dude
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button onClick={runSetup} disabled={isSetupRunning}>
                    {isSetupRunning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Setting up...
                      </>
                    ) : (
                      <>
                        <Wrench className="mr-2 h-4 w-4" />
                        Prepare Environment
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
