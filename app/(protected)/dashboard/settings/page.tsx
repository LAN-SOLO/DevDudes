'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
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
import { Sun, Moon, Monitor, Check, Loader2, Eye, EyeOff, Copy, Key, Trash2 } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { useTranslation } from '@/lib/i18n/language-provider'

type Theme = 'light' | 'dark' | 'system'

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed?: string
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { addToast } = useToast()
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    deployments: true,
    weeklyDigest: true,
  })
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  })
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'dd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      createdAt: '2024-01-15',
      lastUsed: '2 hours ago',
    },
  ])
  const [isGeneratingKey, setIsGeneratingKey] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [keyToDelete, setKeyToDelete] = useState<ApiKey | null>(null)

  const handlePasswordUpdate = async () => {
    if (passwordForm.new !== passwordForm.confirm) return

    setIsUpdatingPassword(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsUpdatingPassword(false)
    setPasswordForm({ current: '', new: '', confirm: '' })

    addToast({
      type: 'success',
      title: t('settings.toasts.passwordUpdatedTitle'),
      description: t('settings.toasts.passwordUpdatedDesc'),
    })
  }

  const generateApiKey = async () => {
    if (!newKeyName) return

    setIsGeneratingKey(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `dd_live_${Math.random().toString(36).substring(2, 34)}`,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setApiKeys([...apiKeys, newKey])
    setIsGeneratingKey(false)
    setShowNewKeyModal(false)
    setNewKeyName('')

    addToast({
      type: 'success',
      title: t('settings.toasts.apiKeyCreatedTitle'),
      description: t('settings.toasts.apiKeyCreatedDesc', { name: newKey.name }),
    })
  }

  const deleteApiKey = (key: ApiKey) => {
    setApiKeys(apiKeys.filter(k => k.id !== key.id))
    setKeyToDelete(null)
    addToast({
      type: 'success',
      title: t('settings.toasts.apiKeyDeletedTitle'),
      description: t('settings.toasts.apiKeyDeletedDesc', { name: key.name }),
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    addToast({
      type: 'info',
      title: t('settings.toasts.copiedTitle'),
      description: t('settings.toasts.copiedDesc'),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('settings.title')}</h2>
        <p className="text-muted-foreground">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.appearance')}</CardTitle>
          <CardDescription>{t('settings.appearanceDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: 'light', label: t('settings.light'), icon: Sun },
              { value: 'dark', label: t('settings.dark'), icon: Moon },
              { value: 'system', label: t('settings.system'), icon: Monitor },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value as Theme)}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                  theme === value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Icon className={`h-6 w-6 ${theme === value ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-sm font-medium ${theme === value ? 'text-primary' : ''}`}>
                  {label}
                </span>
                {theme === value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.notifications')}</CardTitle>
          <CardDescription>{t('settings.notificationsDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.emailNotifications')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.emailNotificationsDesc')}
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.deploymentAlerts')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.deploymentAlertsDesc')}
              </p>
            </div>
            <Switch
              checked={notifications.deployments}
              onCheckedChange={(checked) => setNotifications({ ...notifications, deployments: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.weeklyDigest')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.weeklyDigestDesc')}
              </p>
            </div>
            <Switch
              checked={notifications.weeklyDigest}
              onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.marketingEmails')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.marketingEmailsDesc')}
              </p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.password')}</CardTitle>
          <CardDescription>{t('settings.passwordDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">{t('settings.currentPassword')}</Label>
            <div className="relative">
              <Input
                id="current"
                type={showPassword.current ? 'text' : 'password'}
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">{t('settings.newPassword')}</Label>
            <div className="relative">
              <Input
                id="new"
                type={showPassword.new ? 'text' : 'password'}
                value={passwordForm.new}
                onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">{t('settings.confirmPassword')}</Label>
            <div className="relative">
              <Input
                id="confirm"
                type={showPassword.confirm ? 'text' : 'password'}
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordForm.new && passwordForm.confirm && passwordForm.new !== passwordForm.confirm && (
              <p className="text-xs text-red-500">{t('settings.passwordsDoNotMatch')}</p>
            )}
          </div>
          <Button
            onClick={handlePasswordUpdate}
            disabled={
              !passwordForm.current ||
              !passwordForm.new ||
              passwordForm.new !== passwordForm.confirm ||
              isUpdatingPassword
            }
          >
            {isUpdatingPassword ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              t('settings.updatePassword')
            )}
          </Button>
        </CardContent>
      </Card>

      {/* API Access */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('settings.apiAccess')}</CardTitle>
              <CardDescription>{t('settings.apiAccessDesc')}</CardDescription>
            </div>
            <Button onClick={() => setShowNewKeyModal(true)}>
              <Key className="mr-2 h-4 w-4" />
              {t('settings.generateKey')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="text-center py-6">
              <Key className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {t('settings.noApiKeys')}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{key.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono">
                        {key.key.slice(0, 12)}...{key.key.slice(-4)}
                      </code>
                      <button
                        onClick={() => copyToClipboard(key.key)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created {key.createdAt} {key.lastUsed && `• Last used ${key.lastUsed}`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => setKeyToDelete(key)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generate Key Dialog */}
      <Dialog open={showNewKeyModal} onOpenChange={setShowNewKeyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('settings.generateKey')}</DialogTitle>
            <DialogDescription>{t('settings.apiAccessDesc')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="keyName">Key Name</Label>
              <Input
                id="keyName"
                placeholder="e.g., Production, Development"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowNewKeyModal(false)
                setNewKeyName('')
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={generateApiKey}
              disabled={!newKeyName || isGeneratingKey}
            >
              {isGeneratingKey ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                t('settings.generateKey')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete API Key Confirmation */}
      {keyToDelete && (
        <DeleteConfirmDialog
          open={true}
          onOpenChange={(open) => !open && setKeyToDelete(null)}
          itemName={`API key "${keyToDelete.name}"`}
          onConfirm={() => deleteApiKey(keyToDelete)}
        />
      )}
    </div>
  )
}
