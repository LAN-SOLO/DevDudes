'use client'

import { useWizard } from '../wizard-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Check, Plus, X } from 'lucide-react'
import { useState } from 'react'

const authMethods = [
  { id: 'email', label: 'Email & Password', description: 'Traditional login' },
  { id: 'magic-link', label: 'Magic Link', description: 'Passwordless email' },
  { id: 'google', label: 'Google', description: 'OAuth provider' },
  { id: 'github', label: 'GitHub', description: 'OAuth provider' },
  { id: 'microsoft', label: 'Microsoft', description: 'Azure AD / Office 365' },
  { id: 'saml', label: 'SAML/SSO', description: 'Enterprise single sign-on' },
]

const defaultRoles = ['admin', 'user', 'viewer']

export function StepAuth() {
  const { config, updateConfig, setCurrentStep } = useWizard()
  const [newRole, setNewRole] = useState('')

  const toggleAuthMethod = (id: string) => {
    const current = config.authMethods
    if (current.includes(id)) {
      if (current.length > 1) { // Keep at least one method
        updateConfig({ authMethods: current.filter((m) => m !== id) })
      }
    } else {
      updateConfig({ authMethods: [...current, id] })
    }
  }

  const addRole = () => {
    if (!newRole.trim()) return
    if (config.roles.includes(newRole.toLowerCase().trim())) return
    updateConfig({ roles: [...config.roles, newRole.toLowerCase().trim()] })
    setNewRole('')
  }

  const removeRole = (role: string) => {
    if (config.roles.length > 1) {
      updateConfig({ roles: config.roles.filter((r) => r !== role) })
    }
  }

  const addDefaultRoles = () => {
    const newRoles = defaultRoles.filter(r => !config.roles.includes(r))
    updateConfig({ roles: [...config.roles, ...newRoles] })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication & Roles</CardTitle>
        <CardDescription>
          Configure how users will log in and their permission levels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auth Methods */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Authentication methods</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {authMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => toggleAuthMethod(method.id)}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                  config.authMethods.includes(method.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                    config.authMethods.includes(method.id)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground'
                  }`}
                >
                  {config.authMethods.includes(method.id) && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                <div>
                  <span className="font-medium text-sm">{method.label}</span>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">User roles</p>
            <Button variant="link" size="sm" onClick={addDefaultRoles}>
              Add defaults
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
              >
                {role}
                <button
                  onClick={() => removeRole(role)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add custom role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addRole()}
            />
            <Button onClick={addRole}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(4)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => setCurrentStep(6)}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
