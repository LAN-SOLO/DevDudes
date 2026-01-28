'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DeleteConfirmDialog } from '@/components/ui/confirm-dialog'
import { useToast } from '@/components/ui/toast'
import { Database, Plus, Check, Loader2, AlertCircle, ExternalLink, Trash2, RefreshCw } from 'lucide-react'

interface Connection {
  id: string
  name: string
  type: string
  host: string
  status: 'connected' | 'disconnected' | 'error'
  lastSync?: string
  tables?: number
}

interface DatabaseType {
  id: string
  name: string
  description: string
  icon: string
  defaultPort: number
}

const databaseTypes: DatabaseType[] = [
  { id: 'postgres', name: 'PostgreSQL', description: 'Open-source relational database', icon: '🐘', defaultPort: 5432 },
  { id: 'mysql', name: 'MySQL', description: 'Popular relational database', icon: '🐬', defaultPort: 3306 },
  { id: 'supabase', name: 'Supabase', description: 'Open-source Firebase alternative', icon: '⚡', defaultPort: 5432 },
  { id: 'mongodb', name: 'MongoDB', description: 'NoSQL document database', icon: '🍃', defaultPort: 27017 },
]

export default function ConnectionsPage() {
  const { addToast } = useToast()
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: '1',
      name: 'Production DB',
      type: 'supabase',
      host: 'db.supabase.co',
      status: 'connected',
      lastSync: '2 minutes ago',
      tables: 12,
    },
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedType, setSelectedType] = useState<DatabaseType | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionToDelete, setConnectionToDelete] = useState<Connection | null>(null)
  const [connectionForm, setConnectionForm] = useState({
    name: '',
    host: '',
    port: '',
    database: '',
    username: '',
    password: '',
  })

  const handleConnect = async () => {
    if (!selectedType || !connectionForm.name || !connectionForm.host) return

    setIsConnecting(true)

    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 2000))

    const newConnection: Connection = {
      id: Date.now().toString(),
      name: connectionForm.name,
      type: selectedType.id,
      host: connectionForm.host,
      status: 'connected',
      lastSync: 'Just now',
      tables: Math.floor(Math.random() * 20) + 5,
    }

    setConnections([...connections, newConnection])
    setIsConnecting(false)
    setShowAddModal(false)
    setSelectedType(null)
    setConnectionForm({
      name: '',
      host: '',
      port: '',
      database: '',
      username: '',
      password: '',
    })

    addToast({
      type: 'success',
      title: 'Connection established',
      description: `Successfully connected to ${newConnection.name}`,
    })
  }

  const handleDelete = (connection: Connection) => {
    setConnections(connections.filter(c => c.id !== connection.id))
    setConnectionToDelete(null)
    addToast({
      type: 'success',
      title: 'Connection removed',
      description: `"${connection.name}" has been disconnected`,
    })
  }

  const handleRefresh = async (id: string) => {
    const connection = connections.find(c => c.id === id)
    setConnections(connections.map(c =>
      c.id === id ? { ...c, status: 'disconnected' as const } : c
    ))

    await new Promise(resolve => setTimeout(resolve, 1500))

    setConnections(connections.map(c =>
      c.id === id ? { ...c, status: 'connected' as const, lastSync: 'Just now' } : c
    ))

    addToast({
      type: 'success',
      title: 'Connection refreshed',
      description: connection ? `"${connection.name}" is now synced` : 'Connection synced',
    })
  }

  const getTypeInfo = (typeId: string) => databaseTypes.find(t => t.id === typeId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Database Connections</h2>
          <p className="text-muted-foreground">
            Connect your existing databases to generate apps
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Connection
        </Button>
      </div>

      {/* Active Connections */}
      {connections.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {connections.map((connection) => {
            const typeInfo = getTypeInfo(connection.type)
            return (
              <Card key={connection.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{typeInfo?.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{connection.name}</CardTitle>
                        <CardDescription>{typeInfo?.name} • {connection.host}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        connection.status === 'connected'
                          ? 'bg-green-100 text-green-700'
                          : connection.status === 'error'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          connection.status === 'connected'
                            ? 'bg-green-500'
                            : connection.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-yellow-500'
                        }`} />
                        {connection.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{connection.tables} tables</span>
                    <span>Synced {connection.lastSync}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleRefresh(connection.id)}
                    >
                      <RefreshCw className="mr-1 h-4 w-4" />
                      Refresh
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Browse
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setConnectionToDelete(connection)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">No connections yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
              Connect a database to start generating apps from your existing data.
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Connection
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Connection Dialog */}
      <Dialog open={showAddModal} onOpenChange={(open) => {
        setShowAddModal(open)
        if (!open) setSelectedType(null)
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedType ? `Connect to ${selectedType.name}` : 'Add Database Connection'}
            </DialogTitle>
            <DialogDescription>
              {selectedType
                ? 'Enter your connection details'
                : 'Choose a database type to connect'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {!selectedType ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {databaseTypes.map((db) => (
                  <button
                    key={db.id}
                    onClick={() => {
                      setSelectedType(db)
                      setConnectionForm(prev => ({ ...prev, port: db.defaultPort.toString() }))
                    }}
                    className="flex items-start gap-3 rounded-lg border p-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <span className="text-2xl">{db.icon}</span>
                    <div>
                      <span className="font-medium">{db.name}</span>
                      <p className="text-xs text-muted-foreground">{db.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Connection Name</Label>
                  <Input
                    id="name"
                    placeholder="My Database"
                    value={connectionForm.name}
                    onChange={(e) => setConnectionForm({ ...connectionForm, name: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="host">Host</Label>
                    <Input
                      id="host"
                      placeholder="localhost"
                      value={connectionForm.host}
                      onChange={(e) => setConnectionForm({ ...connectionForm, host: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="port">Port</Label>
                    <Input
                      id="port"
                      placeholder={selectedType.defaultPort.toString()}
                      value={connectionForm.port}
                      onChange={(e) => setConnectionForm({ ...connectionForm, port: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="database">Database Name</Label>
                  <Input
                    id="database"
                    placeholder="myapp_db"
                    value={connectionForm.database}
                    onChange={(e) => setConnectionForm({ ...connectionForm, database: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="postgres"
                      value={connectionForm.username}
                      onChange={(e) => setConnectionForm({ ...connectionForm, username: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={connectionForm.password}
                      onChange={(e) => setConnectionForm({ ...connectionForm, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 flex items-start gap-2 dark:bg-yellow-950/50 dark:border-yellow-900">
                  <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    Your credentials are encrypted and securely stored. We only read your database schema, never your data.
                  </p>
                </div>
              </div>
            )}
          </div>
          {selectedType && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedType(null)}>
                Back
              </Button>
              <Button
                onClick={handleConnect}
                disabled={!connectionForm.name || !connectionForm.host || isConnecting}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Connect
                  </>
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Connection Confirmation */}
      {connectionToDelete && (
        <DeleteConfirmDialog
          open={true}
          onOpenChange={(open) => !open && setConnectionToDelete(null)}
          itemName={`connection "${connectionToDelete.name}"`}
          onConfirm={() => handleDelete(connectionToDelete)}
        />
      )}
    </div>
  )
}
