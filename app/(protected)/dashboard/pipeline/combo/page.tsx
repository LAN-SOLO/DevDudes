'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wand2, ArrowLeft, ArrowRight, Sparkles, Loader2, Check, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/language-provider'
import { getProjectConfig, saveGeneratedConcept, type GeneratedConcept } from '@/app/actions/pipeline'
import type { PresetConfig } from '@/app/actions/pipeline'

interface ProjectData {
  id: string
  name: string
  status: string
  preset_config: PresetConfig | null
  generated_concept: GeneratedConcept | null
}

export default function ComboDudePage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')

  const [project, setProject] = useState<ProjectData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [concept, setConcept] = useState<GeneratedConcept | null>(null)
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    architecture: true,
    pages: false,
    api: false,
    data: false,
    steps: false,
  })

  const generationSteps = [
    'Analyzing business requirements...',
    'Designing application architecture...',
    'Planning page structure...',
    'Generating API endpoints...',
    'Creating data models...',
    'Finalizing implementation roadmap...',
  ]

  useEffect(() => {
    async function loadProject() {
      if (!projectId) {
        setIsLoading(false)
        return
      }

      const result = await getProjectConfig(projectId)
      if (!result.error && result.data) {
        setProject(result.data as unknown as ProjectData)
        if (result.data.generated_concept) {
          setConcept(result.data.generated_concept as unknown as GeneratedConcept)
        }
      }
      setIsLoading(false)
    }
    loadProject()
  }, [projectId])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const generateConcept = async () => {
    if (!project?.preset_config) return

    setIsGenerating(true)
    setGenerationStep(0)
    setGenerationError(null)

    // Progress steps while waiting for API
    const stepInterval = setInterval(() => {
      setGenerationStep(prev => {
        if (prev < generationSteps.length - 1) return prev + 1
        return prev
      })
    }, 2000)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project.preset_config),
      })

      clearInterval(stepInterval)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Generation failed')
      }

      const generatedConcept: GeneratedConcept = await response.json()

      setConcept(generatedConcept)
      setIsGenerating(false)

      // Save to database
      if (projectId) {
        await saveGeneratedConcept(projectId, generatedConcept)
      }
    } catch (error) {
      clearInterval(stepInterval)
      setIsGenerating(false)
      setGenerationError(error instanceof Error ? error.message : 'AI generation failed')
    }
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
          <h2 className="text-2xl font-bold tracking-tight">{t('pipeline.dudes.combo.name')}</h2>
          <p className="text-muted-foreground">
            {t('pipeline.dudes.combo.description')}
          </p>
        </div>
      </div>

      {!project?.preset_config ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>No Configuration Found</CardTitle>
                <CardDescription>
                  Complete the Preset Dude wizard first to generate an app concept
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/pipeline/preset">
              <Button>
                Go to Preset Dude
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : isGenerating ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              Generating App Concept
            </CardTitle>
            <CardDescription>
              AI is analyzing your configuration and designing the perfect architecture
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generationSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  index < generationStep ? 'bg-primary border-primary' :
                  index === generationStep ? 'border-primary' : 'border-muted'
                }`}>
                  {index < generationStep ? (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  ) : index === generationStep ? (
                    <Loader2 className="h-3 w-3 animate-spin text-primary" />
                  ) : null}
                </div>
                <span className={index <= generationStep ? 'text-foreground' : 'text-muted-foreground'}>
                  {step}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : concept ? (
        <>
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>App Concept Generated</CardTitle>
                    <CardDescription>
                      Review the AI-generated architecture for {project.name}
                    </CardDescription>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  concept.estimatedComplexity === 'simple' ? 'bg-green-100 text-green-700' :
                  concept.estimatedComplexity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {concept.estimatedComplexity} complexity
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{concept.summary}</p>
            </CardContent>
          </Card>

          {/* Architecture Section */}
          <Card>
            <CardHeader className="cursor-pointer" onClick={() => toggleSection('architecture')}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Architecture Overview</CardTitle>
                {expandedSections.architecture ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CardHeader>
            {expandedSections.architecture && (
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="font-medium mb-2">Frontend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {concept.architecture.frontend.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Backend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {concept.architecture.backend.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Database</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {concept.architecture.database.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Pages Section */}
          <Card>
            <CardHeader className="cursor-pointer" onClick={() => toggleSection('pages')}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Pages ({concept.pages.length})</CardTitle>
                {expandedSections.pages ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CardHeader>
            {expandedSections.pages && (
              <CardContent>
                <div className="space-y-3">
                  {concept.pages.map((page, i) => (
                    <div key={i} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{page.name}</span>
                        <code className="text-xs bg-muted px-2 py-0.5 rounded">{page.route}</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{page.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {page.components.map((comp, j) => (
                          <span key={j} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* API Endpoints Section */}
          <Card>
            <CardHeader className="cursor-pointer" onClick={() => toggleSection('api')}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">API Endpoints ({concept.apiEndpoints.length})</CardTitle>
                {expandedSections.api ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CardHeader>
            {expandedSections.api && (
              <CardContent>
                <div className="space-y-2">
                  {concept.apiEndpoints.map((endpoint, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border p-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm">{endpoint.path}</code>
                      <span className="text-sm text-muted-foreground ml-auto">{endpoint.description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Data Models Section */}
          <Card>
            <CardHeader className="cursor-pointer" onClick={() => toggleSection('data')}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Data Models ({concept.dataModels.length})</CardTitle>
                {expandedSections.data ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CardHeader>
            {expandedSections.data && (
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {concept.dataModels.map((model, i) => (
                    <div key={i} className="rounded-lg border p-3">
                      <h4 className="font-medium mb-2">{model.name}</h4>
                      <div className="space-y-1">
                        {model.fields.map((field, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm">
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{field.name}</code>
                            <span className="text-muted-foreground">{field.type}</span>
                            {field.required && <span className="text-xs text-red-500">*</span>}
                            {field.relation && (
                              <span className="text-xs text-blue-500">→ {field.relation}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Implementation Steps Section */}
          <Card>
            <CardHeader className="cursor-pointer" onClick={() => toggleSection('steps')}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Implementation Steps ({concept.implementationSteps.length})</CardTitle>
                {expandedSections.steps ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CardHeader>
            {expandedSections.steps && (
              <CardContent>
                <ol className="space-y-2">
                  {concept.implementationSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            )}
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Link href={`/dashboard/pipeline/prepair?project=${projectId}`}>
                  <Button>
                    Continue to Prepair Dude
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={generateConcept}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Generate App Concept</CardTitle>
                <CardDescription>
                  AI will analyze your Preset configuration and generate a complete app concept
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium mb-2">Configuration Summary</h4>
              <div className="grid gap-2 text-sm">
                <div><span className="text-muted-foreground">Business:</span> {project.preset_config.businessName ?? project.name}</div>
                <div><span className="text-muted-foreground">Type:</span> {project.preset_config.appType ?? (project.preset_config as Record<string, unknown>).type as string ?? '—'}</div>
                <div><span className="text-muted-foreground">Features:</span> {project.preset_config.features?.length ?? 0} selected</div>
                <div><span className="text-muted-foreground">Entities:</span> {project.preset_config.entities?.length ?? 0} defined</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">What Combo Dude Will Generate</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complete application architecture</li>
                <li>• Page structure and navigation</li>
                <li>• API endpoints and data flow</li>
                <li>• Database schema optimization</li>
                <li>• Implementation roadmap</li>
              </ul>
            </div>

            {generationError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {generationError}
              </div>
            )}

            <Button onClick={generateConcept} size="lg" className="w-full">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate App Concept
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
