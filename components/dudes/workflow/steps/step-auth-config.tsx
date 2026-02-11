'use client'

import { useState } from 'react'
import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight, Check, Plus, X } from 'lucide-react'
import {
  AUTH_METHOD_OPTIONS,
  SESSION_STRATEGY_OPTIONS,
} from '@/lib/workflow-pipeline/constants'
import { generateId } from '@/lib/validations/workflow'
import type { WorkflowConfigV2 } from '@/lib/workflow-pipeline/types'

type AuthPolicy = WorkflowConfigV2['auth']['policies'][number]

const DEFAULT_ROLES = ['admin', 'user', 'viewer']

export function StepAuthConfig() {
  const { config, updateAuth, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const [newRole, setNewRole] = useState('')
  const auth = config.auth

  const handleAuthToggle = (enabled: boolean) => {
    updateAuth({
      enabled,
      methods: enabled ? [{ type: 'email', enabled: true, config: '' }] : [],
      roles: enabled ? ['admin', 'user'] : [],
    })
  }

  const toggleAuthMethod = (type: string) => {
    const exists = auth.methods.find((m) => m.type === type)
    if (exists) {
      updateAuth({ methods: auth.methods.filter((m) => m.type !== type) })
    } else {
      updateAuth({ methods: [...auth.methods, { type, enabled: true, config: '' }] })
    }
  }

  const addRole = () => {
    if (!newRole.trim()) return
    if (auth.roles.includes(newRole.toLowerCase().trim())) return
    updateAuth({ roles: [...auth.roles, newRole.toLowerCase().trim()] })
    setNewRole('')
  }

  const removeRole = (role: string) => {
    updateAuth({ roles: auth.roles.filter((r) => r !== role) })
  }

  const addDefaultRoles = () => {
    const newRoles = DEFAULT_ROLES.filter((r) => !auth.roles.includes(r))
    updateAuth({ roles: [...auth.roles, ...newRoles] })
  }

  const addPolicy = () => {
    updateAuth({
      policies: [...auth.policies, {
        id: generateId(),
        name: '',
        resource: '',
        action: 'read',
        roles: [],
      }],
    })
  }

  const removePolicy = (id: string) => {
    updateAuth({ policies: auth.policies.filter((p) => p.id !== id) })
  }

  const updatePolicy = (id: string, updates: Partial<AuthPolicy>) => {
    updateAuth({
      policies: auth.policies.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })
  }

  const togglePolicyRole = (policyId: string, role: string) => {
    const policy = auth.policies.find((p) => p.id === policyId)
    if (!policy) return
    const roles = policy.roles.includes(role)
      ? policy.roles.filter((r) => r !== role)
      : [...policy.roles, role]
    updatePolicy(policyId, { roles })
  }

  const enabledMethods = auth.methods.map((m) => m.type)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.auth.title')}</CardTitle>
        <CardDescription>{t('workflow.auth.description')}</CardDescription>
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
            checked={auth.enabled}
            onCheckedChange={handleAuthToggle}
          />
        </div>

        {auth.enabled && (
          <>
            {/* Auth Methods */}
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('workflow.auth.authMethods')}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {AUTH_METHOD_OPTIONS.map((method) => (
                  <button
                    key={method.value}
                    onClick={() => toggleAuthMethod(method.value)}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                      enabledMethods.includes(method.value)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                        enabledMethods.includes(method.value)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {enabledMethods.includes(method.value) && (
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

            {/* Session Strategy */}
            <div className="space-y-2">
              <Label>{t('workflow.auth.sessionStrategy')}</Label>
              <Select
                value={auth.sessionStrategy}
                onValueChange={(v) => updateAuth({ sessionStrategy: v as typeof auth.sessionStrategy })}
                options={SESSION_STRATEGY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              />
            </div>

            {/* Session TTL */}
            <div className="space-y-2">
              <Label>{t('workflow.auth.sessionTtl')}</Label>
              <Input
                type="number"
                value={auth.sessionTtl}
                onChange={(e) => updateAuth({ sessionTtl: parseInt(e.target.value) || 0 })}
                placeholder="3600"
              />
              <p className="text-xs text-muted-foreground">{t('workflow.auth.sessionTtlDesc')}</p>
            </div>

            {/* MFA */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="mfa-toggle" className="text-base">{t('workflow.auth.mfa')}</Label>
                <p className="text-sm text-muted-foreground">{t('workflow.auth.mfaDesc')}</p>
              </div>
              <Switch
                id="mfa-toggle"
                checked={auth.mfa}
                onCheckedChange={(mfa) => updateAuth({ mfa })}
              />
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
                {auth.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {role}
                    <button onClick={() => removeRole(role)} className="ml-1 hover:text-destructive">
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

            {/* RBAC */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="rbac-toggle" className="text-base">{t('workflow.auth.rbac')}</Label>
                <p className="text-sm text-muted-foreground">{t('workflow.auth.rbacDesc')}</p>
              </div>
              <Switch
                id="rbac-toggle"
                checked={auth.rbac}
                onCheckedChange={(rbac) => updateAuth({ rbac })}
              />
            </div>

            {/* Policies */}
            {auth.rbac && (
              <div className="space-y-3">
                <p className="text-sm font-medium">{t('workflow.auth.policies')}</p>
                {auth.policies.map((policy) => (
                  <div key={policy.id} className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Input
                        className="max-w-[200px]"
                        placeholder={t('workflow.auth.policyName')}
                        value={policy.name}
                        onChange={(e) => updatePolicy(policy.id, { name: e.target.value })}
                      />
                      <Button variant="ghost" size="icon" onClick={() => removePolicy(policy.id)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>{t('workflow.auth.policyResource')}</Label>
                        <Input
                          placeholder={t('workflow.auth.policyResourcePlaceholder')}
                          value={policy.resource}
                          onChange={(e) => updatePolicy(policy.id, { resource: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('workflow.auth.policyAction')}</Label>
                        <Select
                          value={policy.action}
                          onValueChange={(v) => updatePolicy(policy.id, { action: v })}
                          options={[
                            { value: 'read', label: 'Read' },
                            { value: 'write', label: 'Write' },
                            { value: 'delete', label: 'Delete' },
                            { value: 'admin', label: 'Admin' },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>{t('workflow.auth.policyRoles')}</Label>
                      <div className="flex flex-wrap gap-2">
                        {auth.roles.map((role) => (
                          <button
                            key={role}
                            onClick={() => togglePolicyRole(policy.id, role)}
                            className={`rounded-full px-3 py-1 text-xs transition-colors ${
                              policy.roles.includes(role)
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addPolicy} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('workflow.auth.addPolicy')}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={nextStep}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
