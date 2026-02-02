'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DeleteConfirmDialog } from '@/components/ui/confirm-dialog'
import { useToast } from '@/components/ui/toast'
import { useTranslation } from '@/lib/i18n/language-provider'
import {
  Globe,
  Cloud,
  Server,
  ExternalLink,
  RefreshCw,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  ArrowRight,
  Zap,
} from 'lucide-react'

interface Deployment {
  id: string
  projectName: string
  projectId: string
  provider: string
  status: 'live' | 'building' | 'failed' | 'stopped'
  url?: string
  deployedAt: string
  commits: number
}

interface Provider {
  id: string
  name: string
  description: string
  icon: typeof Globe
  connected: boolean
}

export default function DeployPage() {
  const { addToast } = useToast()
  const { t } = useTranslation()

  const providers: Provider[] = [
    {
      id: 'vercel',
      name: 'Vercel',
      description: t('deploy.providerTypes.vercel'),
      icon: Globe,
      connected: false,
    },
    {
      id: 'netlify',
      name: 'Netlify',
      description: t('deploy.providerTypes.netlify'),
      icon: Zap,
      connected: false,
    },
    {
      id: 'aws',
      name: 'AWS',
      description: t('deploy.providerTypes.aws'),
      icon: Cloud,
      connected: false,
    },
    {
      id: 'selfhost',
      name: 'Self-Hosted',
      description: t('deploy.providerTypes.selfhost'),
      icon: Server,
      connected: false,
    },
  ]

  const [deploymentToDelete, setDeploymentToDelete] = useState<Deployment | null>(null)
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: '1',
      projectName: 'Customer Portal',
      projectId: 'proj_1',
      provider: 'vercel',
      status: 'live',
      url: 'https://customer-portal.vercel.app',
      deployedAt: '2 hours ago',
      commits: 12,
    },
  ])
  const [connectedProviders, setConnectedProviders] = useState<string[]>(['vercel'])

  const handleConnect = async (providerId: string) => {
    const provider = providers.find(p => p.id === providerId)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setConnectedProviders([...connectedProviders, providerId])
    addToast({
      type: 'success',
      title: t('deploy.toasts.providerConnectedTitle'),
      description: t('deploy.toasts.providerConnectedDesc', { name: provider?.name || 'Provider' }),
    })
  }

  const handleRedeploy = async (deploymentId: string) => {
    const deployment = deployments.find(d => d.id === deploymentId)
    setDeployments(deployments.map(d =>
      d.id === deploymentId ? { ...d, status: 'building' as const } : d
    ))

    addToast({
      type: 'info',
      title: t('deploy.toasts.redeployingTitle'),
      description: t('deploy.toasts.redeployingDesc', { name: deployment?.projectName || 'App' }),
    })

    await new Promise(resolve => setTimeout(resolve, 3000))

    setDeployments(deployments.map(d =>
      d.id === deploymentId ? { ...d, status: 'live' as const, deployedAt: 'Just now' } : d
    ))

    addToast({
      type: 'success',
      title: t('deploy.toasts.deployedTitle'),
      description: t('deploy.toasts.deployedDesc', { name: deployment?.projectName || 'App' }),
    })
  }

  const handleDelete = (deployment: Deployment) => {
    setDeployments(deployments.filter(d => d.id !== deployment.id))
    setDeploymentToDelete(null)
    addToast({
      type: 'success',
      title: t('deploy.toasts.deploymentRemovedTitle'),
      description: t('deploy.toasts.deploymentRemovedDesc', { name: deployment.projectName }),
    })
  }

  const getStatusIcon = (status: Deployment['status']) => {
    switch (status) {
      case 'live':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'building':
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'stopped':
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusLabel = (status: Deployment['status']) => {
    switch (status) {
      case 'live':
        return t('common.live')
      case 'building':
        return t('common.building')
      case 'failed':
        return t('common.failed')
      case 'stopped':
        return t('common.stopped')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('deploy.title')}</h2>
        <p className="text-muted-foreground">
          {t('deploy.subtitle')}
        </p>
      </div>

      {/* Active Deployments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('deploy.activeDeployments')}</CardTitle>
              <CardDescription>{t('deploy.activeDeploymentsDesc')}</CardDescription>
            </div>
            <Link href="/dashboard/projects">
              <Button variant="outline" size="sm">
                {t('deploy.deployNewApp')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {deployments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Globe className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">{t('deploy.noDeployments')}</h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
                {t('deploy.noDeploymentsDesc')}
              </p>
              <Link href="/dashboard/projects">
                <Button>{t('common.viewProjects')}</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {deployments.map((deployment) => {
                const provider = providers.find(p => p.id === deployment.provider)
                return (
                  <div
                    key={deployment.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {provider && <provider.icon className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{deployment.projectName}</p>
                          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                            deployment.status === 'live'
                              ? 'bg-green-100 text-green-700'
                              : deployment.status === 'building'
                                ? 'bg-yellow-100 text-yellow-700'
                                : deployment.status === 'failed'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-muted text-muted-foreground'
                          }`}>
                            {getStatusIcon(deployment.status)}
                            {getStatusLabel(deployment.status)}
                          </span>
                        </div>
                        {deployment.url && (
                          <a
                            href={deployment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            {deployment.url.replace('https://', '')}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {provider?.name} • {deployment.commits} commits • Deployed {deployment.deployedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRedeploy(deployment.id)}
                        disabled={deployment.status === 'building'}
                      >
                        <RefreshCw className={`h-4 w-4 mr-1 ${deployment.status === 'building' ? 'animate-spin' : ''}`} />
                        {t('common.redeploy')}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => setDeploymentToDelete(deployment)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deployment Providers */}
      <Card>
        <CardHeader>
          <CardTitle>{t('deploy.providers')}</CardTitle>
          <CardDescription>{t('deploy.providersDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((provider) => {
              const isConnected = connectedProviders.includes(provider.id)
              return (
                <div
                  key={provider.id}
                  className={`flex flex-col items-center rounded-lg border p-6 text-center transition-colors ${
                    isConnected ? 'border-green-200 bg-green-50' : 'hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <provider.icon className={`h-8 w-8 mb-3 ${isConnected ? 'text-green-600' : 'text-muted-foreground'}`} />
                  <span className="font-medium">{provider.name}</span>
                  <span className="text-xs text-muted-foreground mt-1 mb-3">
                    {provider.description}
                  </span>
                  {isConnected ? (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      {t('common.connected')}
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnect(provider.id)}
                    >
                      {t('common.connect')}
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Deployment Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              {t('deploy.totalDeployments')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{deployments.length}</p>
            <p className="text-xs text-muted-foreground">{t('deploy.acrossAllProviders')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {t('deploy.liveApps')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {deployments.filter(d => d.status === 'live').length}
            </p>
            <p className="text-xs text-muted-foreground">{t('deploy.currentlyRunning')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              {t('deploy.connectedProviders')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{connectedProviders.length}</p>
            <p className="text-xs text-muted-foreground">Out of {providers.length} available</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">{t('deploy.deploymentTips')}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              {t('deploy.tip1')}
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              {t('deploy.tip2')}
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              {t('deploy.tip3')}
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      {deploymentToDelete && (
        <DeleteConfirmDialog
          open={true}
          onOpenChange={(open) => !open && setDeploymentToDelete(null)}
          itemName={`deployment "${deploymentToDelete.projectName}"`}
          onConfirm={() => handleDelete(deploymentToDelete)}
        />
      )}
    </div>
  )
}
