import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, ArrowLeft, Download, BookOpen, Code, FileJson } from 'lucide-react'
import Link from 'next/link'

const docTypes = [
  {
    id: 'readme',
    name: 'README.md',
    description: 'Project overview and setup instructions',
    icon: BookOpen,
  },
  {
    id: 'api',
    name: 'API Documentation',
    description: 'Endpoint reference with examples',
    icon: Code,
  },
  {
    id: 'schema',
    name: 'Database Schema',
    description: 'Table definitions and relationships',
    icon: FileJson,
  },
  {
    id: 'guide',
    name: 'User Guide',
    description: 'End-user documentation',
    icon: FileText,
  },
]

export default function DocuDudePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pipeline">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Docu Dude</h2>
          <p className="text-muted-foreground">
            Auto-generated documentation for your application
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {docTypes.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <doc.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{doc.name}</CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Preview
              </Button>
              <Button variant="outline" size="sm" disabled>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export All Documentation</CardTitle>
          <CardDescription>
            Download a complete documentation package
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button disabled>
            <Download className="h-4 w-4 mr-2" />
            Export as ZIP
          </Button>
          <Button variant="outline" disabled>
            Export as PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
