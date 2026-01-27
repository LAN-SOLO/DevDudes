import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Database, Plus } from 'lucide-react'

const databases = [
  { id: 'postgres', name: 'PostgreSQL', description: 'Open-source relational database' },
  { id: 'mysql', name: 'MySQL', description: 'Popular relational database' },
  { id: 'supabase', name: 'Supabase', description: 'Open-source Firebase alternative' },
  { id: 'mongodb', name: 'MongoDB', description: 'NoSQL document database' },
]

export default function ConnectionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Database Connections</h2>
        <p className="text-muted-foreground">
          Connect your existing databases to generate apps
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Connection</CardTitle>
          <CardDescription>Choose a database type to connect</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {databases.map((db) => (
              <button
                key={db.id}
                className="flex flex-col items-start rounded-lg border p-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
              >
                <Database className="h-6 w-6 mb-2 text-muted-foreground" />
                <span className="font-medium">{db.name}</span>
                <span className="text-xs text-muted-foreground">{db.description}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Connections</CardTitle>
          <CardDescription>Your connected databases</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Database className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-1">No connections yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Connect a database to start generating apps from your existing data.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
