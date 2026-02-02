'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Globe, Cloud, Server, Check, Loader2, AlertCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/language-provider'
import { getProjectConfig, updateProjectStatus } from '@/app/actions/pipeline'

const providers = [
  { id: 'vercel', name: 'Vercel', description: 'Recommended for Next.js', icon: Globe, color: 'bg-black text-white' },
  { id: 'aws', name: 'AWS', description: 'Amazon Web Services', icon: Cloud, color: 'bg-orange-500 text-white' },
  { id: 'gcp', name: 'Google Cloud', description: 'Google Cloud Platform', icon: Cloud, color: 'bg-blue-500 text-white' },
  { id: 'docker', name: 'Docker', description: 'Export as container', icon: Server, color: 'bg-blue-600 text-white' },
]

export default function DeployDudePage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')

  const [project, setProject] = useState<{ name: string; status: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentStep, setDeploymentStep] = useState(0)
  const [isDeployed, setIsDeployed] = useState(false)

  const deploymentSteps = [
    'Preparing build...',
    'Installing dependencies...',
    'Building application...',
    'Optimizing assets...',
    'Deploying to cloud...',
    'Configuring DNS...',
    'Finalizing deployment...',
  ]

  const checklist = [
    { label: 'Complete app configuration', done: !!project },
    { label: 'Generate app concept', done: !!project?.status && ['generating', 'ready', 'deployed'].includes(project.status) },
    { label: 'Set up environment', done: !!project?.status && ['ready', 'deployed'].includes(project.status) },
    { label: 'Review generated code', done: !!project?.status && ['ready', 'deployed'].includes(project.status) },
    { label: 'Run tests', done: false },
  ]

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
          status: result.data.status
        })
        if (result.data.status === 'deployed') {
          setIsDeployed(true)
        }
      }
      setIsLoading(false)
    }
    loadProject()
  }, [projectId])

  const handleDeploy = async (providerId: string) => {
    setSelectedProvider(providerId)
    setIsDeploying(true)
    setDeploymentStep(0)

    for (let i = 0; i < deploymentSteps.length; i++) {
      setDeploymentStep(i)
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600))
    }

    if (projectId) {
      await updateProjectStatus(projectId, 'deployed')
    }

    setIsDeploying(false)
    setIsDeployed(true)
  }

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
          <h2 className="text-2xl font-bold tracking-tight">{t('pipeline.dudes.deploy.name')}</h2>
          <p className="text-muted-foreground">
            {t('pipeline.dudes.deploy.description')}
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
                  Complete the pipeline steps first
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
      ) : isDeploying ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Deploying to {providers.find(p => p.id === selectedProvider)?.name}
            </CardTitle>
            <CardDescription>
              Your application is being deployed. This may take a few moments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deploymentSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  index < deploymentStep ? 'bg-primary border-primary' :
                  index === deploymentStep ? 'border-primary' : 'border-muted'
                }`}>
                  {index < deploymentStep ? (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  ) : index === deploymentStep ? (
                    <Loader2 className="h-3 w-3 animate-spin text-primary" />
                  ) : null}
                </div>
                <span className={index <= deploymentStep ? 'text-foreground' : 'text-muted-foreground'}>
                  {step}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : isDeployed ? (
        <>
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-green-100">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-green-800">Deployment Successful!</CardTitle>
                  <CardDescription className="text-green-700">
                    {project?.name} has been deployed successfully
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-white p-4 border border-green-200">
                <p className="text-sm text-muted-foreground mb-2">Your app is live at:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                    https://{project?.name?.toLowerCase().replace(/\s/g, '-')}.vercel.app
                  </code>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href={`/dashboard/pipeline/docu?project=${projectId}`}>
                  <Button>
                    Continue to Docu Dude
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/projects">
                  <Button variant="outline">
                    View All Projects
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Provider Selection */}
          <div className="grid gap-4 md:grid-cols-2">
            {providers.map((provider) => (
              <Card key={provider.id} className="cursor-pointer hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${provider.color}`}>
                      <provider.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{provider.name}</CardTitle>
                      <CardDescription>{provider.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDeploy(provider.id)}
                  >
                    Deploy to {provider.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Deployment Checklist</CardTitle>
              <CardDescription>
                Complete these steps before deploying
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {checklist.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      item.done ? 'bg-primary border-primary' : 'border-muted-foreground'
                    }`}>
                      {item.done && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span className={item.done ? 'line-through text-muted-foreground' : ''}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
