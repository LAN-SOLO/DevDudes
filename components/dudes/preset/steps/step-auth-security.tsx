'use client'

import { useState } from 'react'
import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Check, Plus, X } from 'lucide-react'
import { AUTH_PROVIDER_OPTIONS, SESSION_STRATEGY_OPTIONS } from '@/lib/preset-pipeline/constants'

const defaultRoles = ['admin', 'user', 'viewer']

export function StepAuthSecurity() {
  const { config, updateAuth, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()
  const [newRole, setNewRole] = useState('')

  const toggleProvider = (type: string) => {
    const existing = config.auth.providers
    const found = existing.find((p) => p.type === type)
    if (found) {
      if (existing.filter((p) => p.enabled).length > 1 || !found.enabled) {
        updateAuth({
          providers: existing.map((p) =>
            p.type === type ? { ...p, enabled: !p.enabled } : p
          ),
        })
      }
    } else {
      updateAuth({ providers: [...existing, { type, enabled: true }] })
    }
  }

  const addRole = () => {
    const value = newRole.toLowerCase().trim()
    if (!value) return
    if (config.auth.roles.includes(value)) return
    updateAuth({ roles: [...config.auth.roles, value] })
    setNewRole('')
  }

  const removeRole = (role: string) => {
    if (config.auth.roles.length > 1) {
      updateAuth({ roles: config.auth.roles.filter((r) => r !== role) })
    }
  }

  const addDefaultRoles = () => {
    const newRoles = defaultRoles.filter((r) => !config.auth.roles.includes(r))
    updateAuth({ roles: [...config.auth.roles, ...newRoles] })
  }

  const isProviderEnabled = (type: string) => {
    const found = config.auth.providers.find((p) => p.type === type)
    return found ? found.enabled : false
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.authSecurity.title')}</CardTitle>
        <CardDescription>{t('preset.authSecurity.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auth Providers */}
        <div className="space-y-2">
          <Label>{t('preset.authSecurity.providers')}</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {AUTH_PROVIDER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleProvider(opt.value)}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                  isProviderEnabled(opt.value)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                    isProviderEnabled(opt.value)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground'
                  }`}
                >
                  {isProviderEnabled(opt.value) && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <span className="text-sm font-medium">{opt.label}</span>
                  {opt.description && (
                    <p className="text-xs text-muted-foreground">{opt.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* MFA */}
        <div className="flex items-center justify-between">
          <div>
            <Label>{t('preset.authSecurity.mfa')}</Label>
            <p className="text-xs text-muted-foreground">{t('preset.authSecurity.mfaDescription')}</p>
          </div>
          <Switch
            checked={config.auth.mfa}
            onCheckedChange={(checked) => updateAuth({ mfa: checked })}
          />
        </div>

        {/* Session Strategy */}
        <div className="space-y-2">
          <Label>{t('preset.authSecurity.sessionStrategy')}</Label>
          <div className="flex gap-2">
            {SESSION_STRATEGY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateAuth({ sessionStrategy: opt.value })}
                className={`flex-1 rounded-lg border p-3 text-center text-sm transition-colors ${
                  config.auth.sessionStrategy === opt.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">{opt.label}</span>
                {opt.description && (
                  <p className="text-xs text-muted-foreground">{opt.description}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>{t('preset.authSecurity.roles')}</Label>
            <Button variant="link" size="sm" onClick={addDefaultRoles}>
              {t('preset.authSecurity.addDefaults')}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.auth.roles.map((role) => (
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
              placeholder={t('preset.authSecurity.addCustomRole')}
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addRole()}
            />
            <Button onClick={addRole}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Security Toggles */}
        <div className="space-y-4">
          <Label>{t('preset.authSecurity.securityOptions')}</Label>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t('preset.authSecurity.rbac')}</p>
              <p className="text-xs text-muted-foreground">{t('preset.authSecurity.rbacDescription')}</p>
            </div>
            <Switch
              checked={config.auth.rbac}
              onCheckedChange={(checked) => updateAuth({ rbac: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t('preset.authSecurity.securityHeaders')}</p>
              <p className="text-xs text-muted-foreground">{t('preset.authSecurity.securityHeadersDescription')}</p>
            </div>
            <Switch
              checked={config.auth.securityHeaders}
              onCheckedChange={(checked) => updateAuth({ securityHeaders: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t('preset.authSecurity.encryption')}</p>
              <p className="text-xs text-muted-foreground">{t('preset.authSecurity.encryptionDescription')}</p>
            </div>
            <Switch
              checked={config.auth.encryption}
              onCheckedChange={(checked) => updateAuth({ encryption: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t('preset.authSecurity.bruteForceProtection')}</p>
              <p className="text-xs text-muted-foreground">{t('preset.authSecurity.bruteForceProtectionDescription')}</p>
            </div>
            <Switch
              checked={config.auth.bruteForceProtection}
              onCheckedChange={(checked) => updateAuth({ bruteForceProtection: checked })}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(4)}>
            {t('preset.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
