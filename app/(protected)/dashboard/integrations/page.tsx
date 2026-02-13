'use client'

import { useState, useMemo } from 'react'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useToast } from '@/components/ui/toast'
import { Input } from '@/components/ui/input'
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
  Video,
  HardDrive,
  Share2,
  Workflow,
  ShieldCheck,
  Smartphone,
  BarChart3,
  Users,
  Table,
  BookOpen,
  GitBranch,
  Compass,
  ClipboardList,
  LifeBuoy,
  Kanban,
  FlaskConical,
  Database,
  Timer,
  Search,
  X,
  LayoutGrid,
  Brain,
  Bot,
  Cpu,
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  icon: typeof Github
  category: 'development' | 'communication' | 'productivity' | 'analytics' | 'admin'
  vendor: 'general' | 'microsoft' | 'atlassian' | 'google' | 'ai' | 'untermstrich'
  connected: boolean
  premium?: boolean
  comingSoon?: boolean
}

const VENDOR_ORDER = ['general', 'microsoft', 'atlassian', 'google', 'ai', 'untermstrich'] as const
const vendorColors: Record<string, string> = {
  general: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  microsoft: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  atlassian: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
  google: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  ai: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  untermstrich: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
}

const integrations: Integration[] = [
  // ── General ───────────────────────────────────────────────
  { id: 'github', name: 'GitHub', description: 'Push generated code directly to your repositories', icon: Github, category: 'development', vendor: 'general', connected: false },
  { id: 'vercel', name: 'Vercel', description: 'Deploy apps with zero configuration', icon: Cloud, category: 'development', vendor: 'general', connected: false },
  { id: 'slack', name: 'Slack', description: 'Get notifications in your Slack channels', icon: Slack, category: 'communication', vendor: 'general', connected: false },
  { id: 'discord', name: 'Discord', description: 'Receive updates in your Discord server', icon: MessageSquare, category: 'communication', vendor: 'general', connected: false },
  { id: 'figma', name: 'Figma', description: 'Import designs and generate components', icon: Figma, category: 'development', vendor: 'general', connected: false, premium: true },
  { id: 'notion', name: 'Notion', description: 'Sync documentation to your Notion workspace', icon: FileText, category: 'productivity', vendor: 'general', connected: false },
  { id: 'linear', name: 'Linear', description: 'Create issues and track project progress', icon: Trello, category: 'productivity', vendor: 'general', connected: false, premium: true },
  { id: 'sendgrid', name: 'SendGrid', description: 'Send transactional emails from your apps', icon: Mail, category: 'communication', vendor: 'general', connected: false, comingSoon: true },
  { id: 'zistemo', name: 'zistemo', description: 'Time tracking, invoicing, expenses, and project management in one platform', icon: Timer, category: 'productivity', vendor: 'general', connected: false },
  // ── Microsoft 365 ─────────────────────────────────────────
  { id: 'ms-teams', name: 'Microsoft Teams', description: 'Chat, meetings, and collaboration with your team', icon: Video, category: 'communication', vendor: 'microsoft', connected: false },
  { id: 'outlook', name: 'Outlook', description: 'Email, calendar, and contacts from Microsoft 365', icon: Mail, category: 'communication', vendor: 'microsoft', connected: false },
  { id: 'onedrive', name: 'OneDrive', description: 'Store, sync, and share project files in the cloud', icon: HardDrive, category: 'productivity', vendor: 'microsoft', connected: false },
  { id: 'sharepoint', name: 'SharePoint', description: 'Document libraries, team sites, and intranet pages', icon: Share2, category: 'productivity', vendor: 'microsoft', connected: false },
  { id: 'excel-online', name: 'Excel Online', description: 'Import data models and generate schemas from spreadsheets', icon: Table, category: 'productivity', vendor: 'microsoft', connected: false },
  { id: 'power-automate', name: 'Power Automate', description: 'Automate workflows between your apps and services', icon: Workflow, category: 'productivity', vendor: 'microsoft', connected: false },
  { id: 'power-bi', name: 'Power BI', description: 'Embed dashboards and analytics in your projects', icon: BarChart3, category: 'analytics', vendor: 'microsoft', connected: false },
  { id: 'ms-planner', name: 'Microsoft Planner', description: 'Manage tasks and track project progress across teams', icon: BookOpen, category: 'productivity', vendor: 'microsoft', connected: false },
  { id: 'entra-id', name: 'Entra ID', description: 'Identity and access management with Azure Active Directory', icon: ShieldCheck, category: 'admin', vendor: 'microsoft', connected: false },
  { id: 'intune', name: 'Microsoft Intune', description: 'Device management, compliance policies, and app deployment', icon: Smartphone, category: 'admin', vendor: 'microsoft', connected: false },
  { id: 'ms-purview', name: 'Microsoft Purview', description: 'Data governance, compliance, and information protection', icon: ShieldCheck, category: 'admin', vendor: 'microsoft', connected: false, premium: true },
  { id: 'exchange-admin', name: 'Exchange Admin', description: 'Manage mailboxes, distribution groups, and mail flow rules', icon: Mail, category: 'admin', vendor: 'microsoft', connected: false, premium: true },
  { id: 'ms-defender', name: 'Microsoft Defender', description: 'Threat protection, security alerts, and vulnerability management', icon: ShieldCheck, category: 'admin', vendor: 'microsoft', connected: false, premium: true },
  { id: 'ms-admin-center', name: 'M365 Admin Center', description: 'User management, licenses, service health, and billing', icon: Users, category: 'admin', vendor: 'microsoft', connected: false },
  // ── Atlassian ─────────────────────────────────────────────
  { id: 'jira', name: 'Jira', description: 'Plan, track, and manage agile software development projects', icon: ClipboardList, category: 'productivity', vendor: 'atlassian', connected: false },
  { id: 'confluence', name: 'Confluence', description: 'Create, collaborate on, and organize team documentation', icon: BookOpen, category: 'productivity', vendor: 'atlassian', connected: false },
  { id: 'bitbucket', name: 'Bitbucket', description: 'Git repository hosting with CI/CD pipelines', icon: GitBranch, category: 'development', vendor: 'atlassian', connected: false },
  { id: 'trello-atlassian', name: 'Trello', description: 'Visual boards for organizing tasks and workflows', icon: Kanban, category: 'productivity', vendor: 'atlassian', connected: false },
  { id: 'atlassian-compass', name: 'Compass', description: 'Developer experience platform for tracking services and components', icon: Compass, category: 'development', vendor: 'atlassian', connected: false },
  { id: 'jira-service-mgmt', name: 'Jira Service Management', description: 'IT service desk with incident, problem, and change management', icon: LifeBuoy, category: 'productivity', vendor: 'atlassian', connected: false },
  { id: 'statuspage', name: 'Statuspage', description: 'Communicate real-time service status to users and stakeholders', icon: BarChart3, category: 'analytics', vendor: 'atlassian', connected: false },
  { id: 'opsgenie', name: 'Opsgenie', description: 'On-call scheduling, alerting, and incident response management', icon: Zap, category: 'admin', vendor: 'atlassian', connected: false },
  { id: 'bamboo', name: 'Bamboo', description: 'Continuous integration and deployment server for build automation', icon: FlaskConical, category: 'development', vendor: 'atlassian', connected: false, premium: true },
  { id: 'atlassian-guard', name: 'Atlassian Guard', description: 'Organization-wide security policies, SSO, and audit logs', icon: ShieldCheck, category: 'admin', vendor: 'atlassian', connected: false, premium: true },
  { id: 'atlassian-analytics', name: 'Atlassian Analytics', description: 'Cross-product data visualization and custom reporting', icon: BarChart3, category: 'analytics', vendor: 'atlassian', connected: false, premium: true },
  // ── Google ────────────────────────────────────────────────
  { id: 'google-analytics', name: 'Google Analytics', description: 'Track app usage and user behavior', icon: Chrome, category: 'analytics', vendor: 'google', connected: false, comingSoon: true },
  { id: 'google-calendar', name: 'Google Calendar', description: 'Schedule deployments and reminders', icon: Calendar, category: 'productivity', vendor: 'google', connected: false, comingSoon: true },
  // ── AI / ML ─────────────────────────────────────────────
  { id: 'openai', name: 'OpenAI', description: 'GPT-4, DALL-E, Whisper — text, image, and speech AI', icon: Brain, category: 'development', vendor: 'ai', connected: false },
  { id: 'anthropic', name: 'Anthropic', description: 'Claude models for advanced reasoning and code generation', icon: Brain, category: 'development', vendor: 'ai', connected: false },
  { id: 'google-gemini', name: 'Google Gemini', description: 'Multimodal AI for text, code, images, and video', icon: Brain, category: 'development', vendor: 'ai', connected: false },
  { id: 'mistral', name: 'Mistral AI', description: 'Open-weight models for fast, efficient inference', icon: Bot, category: 'development', vendor: 'ai', connected: false },
  { id: 'deepseek', name: 'DeepSeek', description: 'Cost-effective models for code and reasoning tasks', icon: Bot, category: 'development', vendor: 'ai', connected: false },
  { id: 'huggingface', name: 'Hugging Face', description: 'Model hub with thousands of open-source models', icon: Cpu, category: 'development', vendor: 'ai', connected: false },
  { id: 'cohere', name: 'Cohere', description: 'Enterprise embeddings, rerank, and RAG capabilities', icon: Brain, category: 'development', vendor: 'ai', connected: false, premium: true },
  { id: 'replicate', name: 'Replicate', description: 'Run open-source models via simple API calls', icon: Cpu, category: 'development', vendor: 'ai', connected: false },
  { id: 'ollama', name: 'Ollama', description: 'Run LLMs locally on your own hardware', icon: Bot, category: 'development', vendor: 'ai', connected: false },
  // ── untermStrich ────────────────────────────────────────
  { id: 'us-projects', name: 'untermStrich Projects', description: 'Project controlling, budgets, timelines, and resource management', icon: Compass, category: 'productivity', vendor: 'untermstrich', connected: false },
  { id: 'us-time', name: 'untermStrich Time', description: 'Intuitive time tracking and logging for project hours', icon: Timer, category: 'productivity', vendor: 'untermstrich', connected: false },
  { id: 'us-crm', name: 'untermStrich CRM', description: 'Customer relationship management and contact networking', icon: Users, category: 'productivity', vendor: 'untermstrich', connected: false },
  { id: 'us-docs', name: 'untermStrich Docs', description: 'Document archive with 30-year legally compliant storage and full-text search', icon: Database, category: 'productivity', vendor: 'untermstrich', connected: false },
  { id: 'us-finance', name: 'untermStrich Finance', description: 'Invoicing, change management, and automatic liquidity checks', icon: BarChart3, category: 'admin', vendor: 'untermstrich', connected: false },
  { id: 'us-dashboard', name: 'untermStrich Dashboard', description: 'Configurable dashboards with graphics and project analyses', icon: LayoutGrid, category: 'analytics', vendor: 'untermstrich', connected: false },
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
    { id: 'admin', label: t('integrations.categories.admin') },
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([])
  const [disconnectTarget, setDisconnectTarget] = useState<Integration | null>(null)

  // Vendor counts
  const vendorCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const i of integrations) {
      counts[i.vendor] = (counts[i.vendor] || 0) + 1
    }
    return counts
  }, [])

  const vendorLabels: Record<string, string> = {
    general: t('integrations.vendors.general'),
    microsoft: t('integrations.vendors.microsoft'),
    atlassian: t('integrations.vendors.atlassian'),
    google: t('integrations.vendors.google'),
    ai: t('integrations.vendors.ai'),
    untermstrich: t('integrations.vendors.untermstrich'),
  }

  // Category counts (within current vendor filter)
  const categoryCounts = useMemo(() => {
    let base = integrations
    if (selectedVendor) base = base.filter((i) => i.vendor === selectedVendor)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      base = base.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      )
    }
    const counts: Record<string, number> = { all: base.length }
    for (const i of base) {
      counts[i.category] = (counts[i.category] || 0) + 1
    }
    return counts
  }, [selectedVendor, searchQuery])

  // Filter integrations
  const filteredIntegrations = useMemo(() => {
    let result = integrations
    if (selectedVendor) {
      result = result.filter((i) => i.vendor === selectedVendor)
    }
    if (selectedCategory !== 'all') {
      result = result.filter((i) => i.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      )
    }
    return result
  }, [selectedCategory, selectedVendor, searchQuery])

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

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedVendor(null)
    setSearchQuery('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('integrations.title')}</h2>
          <p className="text-muted-foreground">
            {t('integrations.subtitle')}
          </p>
        </div>
        <p className="text-sm text-muted-foreground tabular-nums">
          {filteredIntegrations.length} / {integrations.length} {t('integrations.title').toLowerCase()}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
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
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
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
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
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

      {/* Search + Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('integrations.searchPlaceholder')}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Vendor pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedVendor(null)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedVendor === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <LayoutGrid className="h-3 w-3" />
            {t('integrations.vendors.all')}
            <span className="ml-0.5 tabular-nums">({integrations.length})</span>
          </button>
          {VENDOR_ORDER.filter((v) => vendorCounts[v]).map((vendor) => (
            <button
              key={vendor}
              onClick={() => setSelectedVendor(selectedVendor === vendor ? null : vendor)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedVendor === vendor
                  ? 'bg-primary text-primary-foreground'
                  : `${vendorColors[vendor]} hover:opacity-80`
              }`}
            >
              {vendorLabels[vendor]}
              <span className="tabular-nums">({vendorCounts[vendor]})</span>
            </button>
          ))}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => {
            const count = categoryCounts[category.id] || 0
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="tabular-nums"
              >
                {category.label}
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Integrations Grid */}
      {filteredIntegrations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <Search className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium">{t('integrations.noResults')}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('integrations.noResultsHint')}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
            {t('integrations.clearFilters')}
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((integration) => {
            const isConnected = connectedIntegrations.includes(integration.id)
            const isConnecting = connectingId === integration.id

            return (
              <Card
                key={integration.id}
                className={`relative ${
                  integration.comingSoon ? 'opacity-60' : ''
                } ${isConnected ? 'border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30' : ''}`}
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
                        isConnected ? 'bg-green-100 dark:bg-green-900' : 'bg-muted'
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
                  <span className={`inline-block mt-2 text-[10px] px-1.5 py-0.5 rounded-full w-fit ${vendorColors[integration.vendor]}`}>
                    {vendorLabels[integration.vendor]}
                  </span>
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
      )}

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
