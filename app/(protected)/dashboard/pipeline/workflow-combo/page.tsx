'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Download, Copy, Check, FileText, Code, Wand2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { buildInitPromptDoc, buildDevelopmentConceptDoc } from '@/lib/workflow-pipeline/prompts'
import type { WorkflowConfigV2, GeneratedWorkflowDocs } from '@/lib/workflow-pipeline/types'
import { defaultWorkflowConfigV2 } from '@/lib/validations/workflow'
import { cn } from '@/lib/utils'

type DocTab = 'initPrompt' | 'developmentConcept'

const TABS: { id: DocTab; label: string; icon: React.ElementType }[] = [
  { id: 'initPrompt', label: 'Init Prompt', icon: Code },
  { id: 'developmentConcept', label: 'Development Concept', icon: FileText },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="mr-1 h-3 w-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="mr-1 h-3 w-3" />
          Copy
        </>
      )}
    </Button>
  )
}

function DocumentViewer({ content, filename }: { content: string; filename: string }) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end gap-2">
        <CopyButton text={content} />
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="mr-1 h-3 w-3" />
          Download
        </Button>
      </div>
      <div className="rounded-lg border bg-muted/30 p-6 max-h-[600px] overflow-y-auto">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{content}</pre>
      </div>
    </div>
  )
}

export default function WorkflowComboPage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')
  const [docs, setDocs] = useState<GeneratedWorkflowDocs | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<DocTab>('initPrompt')

  useEffect(() => {
    if (!projectId) return

    async function loadAndGenerate() {
      setLoading(true)
      setError(null)

      try {
        const supabase = createClient()
        const { data, error: dbError } = await supabase
          .from('projects')
          .select('preset_config')
          .eq('id', projectId)
          .single()

        if (dbError || !data) {
          setError('Failed to load project configuration')
          return
        }

        const presetConfig = data.preset_config as Record<string, unknown>
        if (presetConfig?.type !== 'workflow') {
          setError('This is not a workflow project')
          return
        }

        const { type: _type, version: _version, ...config } = presetConfig as Record<string, unknown>
        void _type
        void _version

        // Merge with defaults to ensure all fields exist
        const workflowConfig: WorkflowConfigV2 = {
          ...defaultWorkflowConfigV2,
          ...config,
          meta: { ...defaultWorkflowConfigV2.meta, ...(config.meta as Record<string, unknown> ?? {}) },
          triggers: { ...defaultWorkflowConfigV2.triggers, ...(config.triggers as Record<string, unknown> ?? {}) },
          orchestration: { ...defaultWorkflowConfigV2.orchestration, ...(config.orchestration as Record<string, unknown> ?? {}) },
          dataConnectors: { ...defaultWorkflowConfigV2.dataConnectors, ...(config.dataConnectors as Record<string, unknown> ?? {}) },
          variables: { ...defaultWorkflowConfigV2.variables, ...(config.variables as Record<string, unknown> ?? {}) },
          secrets: { ...defaultWorkflowConfigV2.secrets, ...(config.secrets as Record<string, unknown> ?? {}) },
          storage: { ...defaultWorkflowConfigV2.storage, ...(config.storage as Record<string, unknown> ?? {}) },
          caching: { ...defaultWorkflowConfigV2.caching, ...(config.caching as Record<string, unknown> ?? {}) },
          queues: { ...defaultWorkflowConfigV2.queues, ...(config.queues as Record<string, unknown> ?? {}) },
          aiIntegrations: { ...defaultWorkflowConfigV2.aiIntegrations, ...(config.aiIntegrations as Record<string, unknown> ?? {}) },
          features: { ...defaultWorkflowConfigV2.features, ...(config.features as Record<string, unknown> ?? {}) },
          middleware: { ...defaultWorkflowConfigV2.middleware, ...(config.middleware as Record<string, unknown> ?? {}) },
          plugins: { ...defaultWorkflowConfigV2.plugins, ...(config.plugins as Record<string, unknown> ?? {}) },
          extensions: { ...defaultWorkflowConfigV2.extensions, ...(config.extensions as Record<string, unknown> ?? {}) },
          auth: { ...defaultWorkflowConfigV2.auth, ...(config.auth as Record<string, unknown> ?? {}) },
          security: { ...defaultWorkflowConfigV2.security, ...(config.security as Record<string, unknown> ?? {}) },
          notifications: { ...defaultWorkflowConfigV2.notifications, ...(config.notifications as Record<string, unknown> ?? {}) },
          hooks: { ...defaultWorkflowConfigV2.hooks, ...(config.hooks as Record<string, unknown> ?? {}) },
          logging: { ...defaultWorkflowConfigV2.logging, ...(config.logging as Record<string, unknown> ?? {}) },
          monitoring: { ...defaultWorkflowConfigV2.monitoring, ...(config.monitoring as Record<string, unknown> ?? {}) },
          testing: { ...defaultWorkflowConfigV2.testing, ...(config.testing as Record<string, unknown> ?? {}) },
          deployment: { ...defaultWorkflowConfigV2.deployment, ...(config.deployment as Record<string, unknown> ?? {}) },
          ui: { ...defaultWorkflowConfigV2.ui, ...(config.ui as Record<string, unknown> ?? {}) },
          documentation: { ...defaultWorkflowConfigV2.documentation, ...(config.documentation as Record<string, unknown> ?? {}) },
          publishing: { ...defaultWorkflowConfigV2.publishing, ...(config.publishing as Record<string, unknown> ?? {}) },
        } as WorkflowConfigV2

        const initPrompt = buildInitPromptDoc(workflowConfig)
        const developmentConcept = buildDevelopmentConceptDoc(workflowConfig)

        setDocs({ initPrompt, developmentConcept })
      } catch {
        setError('Failed to generate workflow documents')
      } finally {
        setLoading(false)
      }
    }

    loadAndGenerate()
  }, [projectId])

  if (!projectId) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('workflow.combo.title')}</h2>
          <p className="text-muted-foreground">{t('workflow.combo.description')}</p>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Wand2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>{t('workflow.combo.noProject')}</CardTitle>
            <CardDescription>{t('workflow.combo.noProjectDesc')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('workflow.combo.title')}</h2>
        <p className="text-muted-foreground">{t('workflow.combo.description')}</p>
      </div>

      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-3 text-muted-foreground">{t('workflow.combo.generating')}</span>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="py-8">
            <div className="flex items-center gap-3 text-destructive">
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {docs && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{t('workflow.combo.generatedDocs')}</CardTitle>
                  <CardDescription>{t('workflow.combo.generatedDocsDesc')}</CardDescription>
                </div>
                <Badge variant="success">{t('workflow.combo.ready')}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Tab navigation */}
              <div className="flex gap-1 border-b mb-6">
                {TABS.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px',
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {/* Tab content */}
              {activeTab === 'initPrompt' && (
                <DocumentViewer content={docs.initPrompt} filename="init-prompt.md" />
              )}
              {activeTab === 'developmentConcept' && (
                <DocumentViewer content={docs.developmentConcept} filename="development-concept.md" />
              )}
            </CardContent>
          </Card>

          {/* Download all */}
          <div className="flex justify-end">
            <Button
              onClick={() => {
                const allContent = `# Init Prompt\n\n${docs.initPrompt}\n\n---\n\n# Development Concept\n\n${docs.developmentConcept}`
                const blob = new Blob([allContent], { type: 'text/markdown' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'workflow-documents-all.md'
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              {t('workflow.combo.downloadAll')}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
