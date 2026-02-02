'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, ArrowLeft, Download, BookOpen, Code, FileJson, Loader2, AlertCircle, ArrowRight, Check, Eye } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/language-provider'
import { getProjectConfig } from '@/app/actions/pipeline'
import type { GeneratedConcept } from '@/app/actions/pipeline'

interface DocType {
  id: string
  name: string
  description: string
  icon: typeof BookOpen
  content?: string
  generated: boolean
}

export default function DocuDudePage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')

  const [project, setProject] = useState<{ name: string; generated_concept: GeneratedConcept | null } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [docs, setDocs] = useState<DocType[]>([
    { id: 'readme', name: 'README.md', description: 'Project overview and setup instructions', icon: BookOpen, generated: false },
    { id: 'api', name: 'API Documentation', description: 'Endpoint reference with examples', icon: Code, generated: false },
    { id: 'schema', name: 'Database Schema', description: 'Table definitions and relationships', icon: FileJson, generated: false },
    { id: 'guide', name: 'User Guide', description: 'End-user documentation', icon: FileText, generated: false },
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
          generated_concept: result.data.generated_concept as unknown as GeneratedConcept
        })
      }
      setIsLoading(false)
    }
    loadProject()
  }, [projectId])

  const generateDocs = async () => {
    setIsGenerating(true)

    // Generate docs one by one
    for (let i = 0; i < docs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400))
      setDocs(prev => prev.map((doc, idx) =>
        idx === i ? { ...doc, generated: true, content: generateDocContent(doc.id) } : doc
      ))
    }

    setIsGenerating(false)
  }

  const generateDocContent = (docId: string): string => {
    const concept = project?.generated_concept
    const name = project?.name || 'App'

    switch (docId) {
      case 'readme':
        return `# ${name}

## Overview
${concept?.summary || 'A modern web application built with Next.js and Supabase.'}

## Tech Stack
${concept?.architecture?.frontend?.map(t => `- ${t}`).join('\n') || '- Next.js 15\n- React 19\n- Tailwind CSS'}

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation
\`\`\`bash
npm install
\`\`\`

### Environment Variables
Create a \`.env.local\` file:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
\`\`\`

### Development
\`\`\`bash
npm run dev
\`\`\`

## Features
${concept?.pages?.slice(0, 5).map(p => `- ${p.name}: ${p.description}`).join('\n') || '- Dashboard\n- Authentication\n- User Management'}

## License
MIT`

      case 'api':
        return `# API Documentation

## Authentication
All API endpoints require authentication via Supabase Auth.

## Endpoints

${concept?.apiEndpoints?.map(ep => `### ${ep.method} ${ep.path}
${ep.description}

**Request:**
\`\`\`json
{
  // Request body
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {}
}
\`\`\`
`).join('\n') || '### GET /api/health\nHealth check endpoint'}

## Error Codes
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error`

      case 'schema':
        return `# Database Schema

## Tables

${concept?.dataModels?.map(model => `### ${model.name}

| Column | Type | Required | Description |
|--------|------|----------|-------------|
${model.fields.map(f => `| ${f.name} | ${f.type} | ${f.required ? 'Yes' : 'No'} | ${f.relation ? `FK to ${f.relation}` : ''} |`).join('\n')}
`).join('\n') || `### users
| Column | Type | Required |
|--------|------|----------|
| id | uuid | Yes |
| email | text | Yes |`}

## Relationships
${concept?.dataModels?.map(m => `- ${m.name} belongs to profiles (user_id)`).join('\n') || '- All tables have user_id foreign key'}

## Row Level Security
All tables have RLS enabled with user-based policies.`

      case 'guide':
        return `# User Guide

## Getting Started

Welcome to ${name}! This guide will help you get started.

## Pages

${concept?.pages?.map(p => `### ${p.name}
${p.description}

**Available actions:**
${p.components.map(c => `- ${c}`).join('\n')}
`).join('\n') || '### Dashboard\nView your main overview and statistics.'}

## FAQ

**Q: How do I reset my password?**
A: Click "Forgot Password" on the login page.

**Q: How do I contact support?**
A: Email support@${name.toLowerCase().replace(/\s/g, '')}.com

## Keyboard Shortcuts
- \`Cmd/Ctrl + K\`: Quick search
- \`Cmd/Ctrl + /\`: Toggle sidebar
- \`Esc\`: Close modals`

      default:
        return '# Documentation'
    }
  }

  const handleDownload = (doc: DocType) => {
    if (!doc.content) return

    const blob = new Blob([doc.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = doc.name.endsWith('.md') ? doc.name : `${doc.name.toLowerCase().replace(/\s/g, '-')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadAll = () => {
    const allDocs = docs.filter(d => d.generated && d.content)
    const content = allDocs.map(d => `# ${d.name}\n\n${d.content}`).join('\n\n---\n\n')

    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project?.name?.toLowerCase().replace(/\s/g, '-') || 'project'}-docs.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const allGenerated = docs.every(d => d.generated)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pipeline">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('pipeline.dudes.docu.name')}</h2>
          <p className="text-muted-foreground">
            {t('pipeline.dudes.docu.description')}
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
      ) : (
        <>
          {/* Generate Button */}
          {!allGenerated && (
            <Card>
              <CardHeader>
                <CardTitle>Generate Documentation</CardTitle>
                <CardDescription>
                  Create comprehensive documentation for {project?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={generateDocs} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate All Documentation
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Doc Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {docs.map((doc) => (
              <Card key={doc.id} className={selectedDoc === doc.id ? 'ring-2 ring-primary' : ''}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${doc.generated ? 'bg-green-100' : 'bg-muted'}`}>
                      {doc.generated ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <doc.icon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{doc.name}</CardTitle>
                      <CardDescription>{doc.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!doc.generated}
                    onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!doc.generated}
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Preview Panel */}
          {selectedDoc && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Preview: {docs.find(d => d.id === selectedDoc)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted p-4 font-mono text-sm max-h-[400px] overflow-auto whitespace-pre-wrap">
                  {docs.find(d => d.id === selectedDoc)?.content}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Export All */}
          {allGenerated && (
            <Card>
              <CardHeader>
                <CardTitle>Export All Documentation</CardTitle>
                <CardDescription>
                  Download a complete documentation package
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button onClick={handleDownloadAll}>
                  <Download className="h-4 w-4 mr-2" />
                  Export All as Markdown
                </Button>
                <Link href="/dashboard/projects">
                  <Button variant="outline">
                    View All Projects
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Pipeline Complete */}
          {allGenerated && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-green-800">Pipeline Complete!</CardTitle>
                    <CardDescription className="text-green-700">
                      Congratulations! Your app has been fully configured, generated, and documented.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Link href="/dashboard/projects">
                    <Button>
                      Go to Projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/pipeline">
                    <Button variant="outline">
                      Start New Project
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
