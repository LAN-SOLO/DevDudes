'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useToast } from '@/components/ui/toast'
import {
  Github,
  Slack,
  Trello,
  Figma,
  Chrome,
  Cloud,
  MessageSquare,
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  ExternalLink,
  Settings,
  Loader2,
  Zap,
  Lock,
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  icon: typeof Github
  category: 'development' | 'communication' | 'productivity' | 'analytics'
  connected: boolean
  premium?: boolean
  comingSoon?: boolean
}

const integrations: Integration[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Push generated code directly to your repositories',
    icon: Github,
    category: 'development',
    connected: false,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy apps with zero configuration',
    icon: Cloud,
    category: 'development',
    connected: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications in your Slack channels',
    icon: Slack,
    category: 'communication',
    connected: false,
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Receive updates in your Discord server',
    icon: MessageSquare,
    category: 'communication',
    connected: false,
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Import designs and generate components',
    icon: Figma,
    category: 'development',
    connected: false,
    premium: true,
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sync documentation to your Notion workspace',
    icon: FileText,
    category: 'productivity',
    connected: false,
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Create issues and track project progress',
    icon: Trello,
    category: 'productivity',
    connected: false,
    premium: true,
  },
  {
    id: 'analytics',
    name: 'Google Analytics',
    description: 'Track app usage and user behavior',
    icon: Chrome,
    category: 'analytics',
    connected: false,
    comingSoon: true,
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Send transactional emails from your apps',
    icon: Mail,
    category: 'communication',
    connected: false,
    comingSoon: true,
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Schedule deployments and reminders',
    icon: Calendar,
    category: 'productivity',
    connected: false,
    comingSoon: true,
  },
]

export default function IntegrationsPage() {
  const { t } = useTranslation()
  const { addToast } = useToast()

  const categories = [
    { id: 'all', label: t('integrations.categories.all') },
    { id: 'development', label: t('integrations.categories.development') },
    { id: 'communication', label: t('integrations.categories.communication') },
    { id: 'productivity', label: t('integrations.categories.productivity') },
    { id: 'analytics', label: t('integrations.categories.analytics') },
  ]
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(['vercel'])
  const [disconnectTarget, setDisconnectTarget] = useState<Integration | null>(null)

  const filteredIntegrations = integrations.filter(
    (integration) =>
      selectedCategory === 'all' || integration.category === selectedCategory
  )

  const handleConnect = async (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId)
    setConnectingId(integrationId)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setConnectedIntegrations([...connectedIntegrations, integrationId])
    setConnectingId(null)
    addToast({
      type: 'success',
      title: t('integrations.toasts.connectedTitle'),
      description: t('integrations.toasts.connectedDesc', { name: integration?.name || 'Integration' }),
    })
  }

  const handleDisconnect = async (integration: Integration) => {
    setConnectingId(integration.id)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setConnectedIntegrations(connectedIntegrations.filter((id) => id !== integration.id))
    setConnectingId(null)
    setDisconnectTarget(null)
    addToast({
      type: 'info',
      title: t('integrations.toasts.disconnectedTitle'),
      description: t('integrations.toasts.disconnectedDesc', { name: integration.name }),
    })
  }

  const connectedCount = connectedIntegrations.length
  const availableCount = integrations.filter((i) => !i.comingSoon).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('integrations.title')}</h2>
        <p className="text-muted-foreground">
          {t('integrations.subtitle')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{connectedCount}</p>
                <p className="text-sm text-muted-foreground">{t('common.connected')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{availableCount}</p>
                <p className="text-sm text-muted-foreground">{t('common.available')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {integrations.filter((i) => i.premium).length}
                </p>
                <p className="text-sm text-muted-foreground">{t('common.premiumOnly')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => {
          const isConnected = connectedIntegrations.includes(integration.id)
          const isConnecting = connectingId === integration.id

          return (
            <Card
              key={integration.id}
              className={`relative ${
                integration.comingSoon ? 'opacity-60' : ''
              } ${isConnected ? 'border-green-200 bg-green-50/50' : ''}`}
            >
              {integration.premium && !isConnected && (
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    {t('common.pro')}
                  </Badge>
                </div>
              )}
              {integration.comingSoon && (
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="text-xs">
                    {t('common.comingSoon')}
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isConnected ? 'bg-green-100' : 'bg-muted'
                    }`}
                  >
                    <integration.icon
                      className={`h-5 w-5 ${
                        isConnected ? 'text-green-600' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {integration.name}
                      {isConnected && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {integration.comingSoon ? (
                    <Button variant="outline" size="sm" disabled className="flex-1">
                      {t('common.comingSoon')}
                    </Button>
                  ) : isConnected ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setDisconnectTarget(integration)}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          t('common.disconnect')
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant={integration.premium ? 'outline' : 'default'}
                      size="sm"
                      className="flex-1"
                      onClick={() => handleConnect(integration.id)}
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('common.connecting')}
                        </>
                      ) : integration.premium ? (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          {t('integrations.upgradeToConnect')}
                        </>
                      ) : (
                        t('common.connect')
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Request Integration */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">{t('integrations.missingIntegration')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('integrations.missingIntegrationDesc')}
              </p>
            </div>
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              {t('integrations.requestIntegration')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disconnect Confirmation */}
      {disconnectTarget && (
        <ConfirmDialog
          open={true}
          onOpenChange={(open) => !open && setDisconnectTarget(null)}
          title={`Disconnect ${disconnectTarget.name}?`}
          description={`This will remove the ${disconnectTarget.name} integration. You can reconnect it at any time.`}
          confirmLabel="Disconnect"
          variant="destructive"
          loading={connectingId === disconnectTarget.id}
          onConfirm={() => handleDisconnect(disconnectTarget)}
        />
      )}
    </div>
  )
}
