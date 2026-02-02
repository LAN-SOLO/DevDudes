'use client'

import { useTranslation } from '@/lib/i18n/language-provider'
import { useWizard } from '../wizard-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Check, Plus, X } from 'lucide-react'
import { useState } from 'react'

const defaultRoles = ['admin', 'user', 'viewer']

export function StepAuth() {
  const { config, updateConfig, setCurrentStep } = useWizard()
  const { t } = useTranslation()
  const [newRole, setNewRole] = useState('')

  const authMethods = [
    { id: 'email', label: t('preset.auth.methods.email'), description: t('preset.auth.methods.emailDesc') },
    { id: 'magic-link', label: t('preset.auth.methods.magicLink'), description: t('preset.auth.methods.magicLinkDesc') },
    { id: 'google', label: t('preset.auth.methods.google'), description: t('preset.auth.methods.googleDesc') },
    { id: 'github', label: t('preset.auth.methods.github'), description: t('preset.auth.methods.githubDesc') },
    { id: 'microsoft', label: t('preset.auth.methods.microsoft'), description: t('preset.auth.methods.microsoftDesc') },
    { id: 'saml', label: t('preset.auth.methods.saml'), description: t('preset.auth.methods.samlDesc') },
  ]

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
        <CardTitle>{t('preset.auth.title')}</CardTitle>
        <CardDescription>
          {t('preset.auth.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auth Methods */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('preset.auth.authMethods')}</p>
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
            <p className="text-sm font-medium">{t('preset.auth.userRoles')}</p>
            <Button variant="link" size="sm" onClick={addDefaultRoles}>
              {t('preset.auth.addDefaults')}
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
              placeholder={t('preset.auth.addCustomRole')}
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
            {t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(6)}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
