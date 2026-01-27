import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FolderOpen, Plus } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your generated applications
          </p>
        </div>
        <Link href="/dashboard/generator">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-muted p-4 mb-4">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-1">No projects yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
            Generate your first application to see it here.
          </p>
          <Link href="/dashboard/generator">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First App
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
