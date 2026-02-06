'use client'

import { useState } from 'react'
import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Check, Plus, X } from 'lucide-react'

const defaultRoles = ['admin', 'user', 'viewer']

export function StepAuthConfig() {
  const { config, updateConfig, setCurrentStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const [newRole, setNewRole] = useState('')

  const authMethods = [
    { id: 'email', label: t('workflow.auth.methods.email'), description: t('workflow.auth.methods.emailDesc') },
    { id: 'magic-link', label: t('workflow.auth.methods.magicLink'), description: t('workflow.auth.methods.magicLinkDesc') },
    { id: 'google', label: t('workflow.auth.methods.google'), description: t('workflow.auth.methods.googleDesc') },
    { id: 'github', label: t('workflow.auth.methods.github'), description: t('workflow.auth.methods.githubDesc') },
    { id: 'microsoft', label: t('workflow.auth.methods.microsoft'), description: t('workflow.auth.methods.microsoftDesc') },
    { id: 'saml', label: t('workflow.auth.methods.saml'), description: t('workflow.auth.methods.samlDesc') },
  ]

  const toggleAuthMethod = (id: string) => {
    const current = config.authMethods
    if (current.includes(id)) {
      updateConfig({ authMethods: current.filter((m) => m !== id) })
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
    updateConfig({ roles: config.roles.filter((r) => r !== role) })
  }

  const addDefaultRoles = () => {
    const newRoles = defaultRoles.filter(r => !config.roles.includes(r))
    updateConfig({ roles: [...config.roles, ...newRoles] })
  }

  const handleAuthToggle = (enabled: boolean) => {
    updateConfig({
      authEnabled: enabled,
      authMethods: enabled ? ['email'] : [],
      roles: enabled ? ['admin', 'user'] : [],
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.auth.title')}</CardTitle>
        <CardDescription>
          {t('workflow.auth.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auth Toggle */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="auth-toggle" className="text-base">{t('workflow.auth.enableAuth')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.auth.enableAuthDesc')}</p>
          </div>
          <Switch
            id="auth-toggle"
            checked={config.authEnabled}
            onCheckedChange={handleAuthToggle}
          />
        </div>

        {config.authEnabled && (
          <>
            {/* Auth Methods */}
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('workflow.auth.authMethods')}</p>
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
                <p className="text-sm font-medium">{t('workflow.auth.userRoles')}</p>
                <Button variant="link" size="sm" onClick={addDefaultRoles}>
                  {t('workflow.auth.addDefaults')}
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
                  placeholder={t('workflow.auth.addCustomRole')}
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addRole()}
                />
                <Button onClick={addRole}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(4)}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
