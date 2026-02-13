'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Download, Copy, Check, FileText, Code, Wand2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { buildInitPromptDoc, buildDevelopmentConceptDoc } from '@/lib/website-pipeline/prompts'
import type { WebsiteConfig, GeneratedWebsiteDocs } from '@/lib/website-pipeline/types'
import { defaultWebsiteConfig } from '@/lib/validations/website'
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

export default function WebsiteComboPage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')
  const [docs, setDocs] = useState<GeneratedWebsiteDocs | null>(null)
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
        if (presetConfig?.type !== 'website') {
          setError('This is not a website project')
          return
        }

        const { type: _type, ...config } = presetConfig as Record<string, unknown>
        void _type

        // Merge with defaults to ensure all fields exist
        const websiteConfig: WebsiteConfig = {
          ...defaultWebsiteConfig,
          ...config,
        } as WebsiteConfig

        const initPrompt = buildInitPromptDoc(websiteConfig)
        const developmentConcept = buildDevelopmentConceptDoc(websiteConfig)

        setDocs({ initPrompt, developmentConcept })
      } catch {
        setError('Failed to generate website documents')
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
          <h2 className="text-2xl font-bold tracking-tight">{t('website.combo.title')}</h2>
          <p className="text-muted-foreground">{t('website.combo.description')}</p>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Wand2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>{t('website.combo.noProject')}</CardTitle>
            <CardDescription>{t('website.combo.noProjectDesc')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('website.combo.title')}</h2>
        <p className="text-muted-foreground">{t('website.combo.description')}</p>
      </div>

      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-3 text-muted-foreground">{t('website.combo.generating')}</span>
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
                  <CardTitle className="text-lg">{t('website.combo.generatedDocs')}</CardTitle>
                  <CardDescription>{t('website.combo.generatedDocsDesc')}</CardDescription>
                </div>
                <Badge variant="success">{t('website.combo.ready')}</Badge>
              </div>
            </CardHeader>
            <CardContent>
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
                          ? 'border-rose-500 text-rose-500'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {activeTab === 'initPrompt' && (
                <DocumentViewer content={docs.initPrompt} filename="website-init-prompt.md" />
              )}
              {activeTab === 'developmentConcept' && (
                <DocumentViewer content={docs.developmentConcept} filename="website-development-concept.md" />
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={() => {
                const allContent = `# Init Prompt\n\n${docs.initPrompt}\n\n---\n\n# Development Concept\n\n${docs.developmentConcept}`
                const blob = new Blob([allContent], { type: 'text/markdown' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'website-documents-all.md'
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              {t('website.combo.downloadAll')}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
