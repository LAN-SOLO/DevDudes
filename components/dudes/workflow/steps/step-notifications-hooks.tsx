'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react'
import { generateId } from '@/lib/validations/workflow'
import { NOTIFICATION_CHANNEL_OPTIONS, HOOK_EVENT_OPTIONS } from '@/lib/workflow-pipeline/constants'

export function StepNotificationsHooks() {
  const { config, updateNotifications, updateHooks, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()

  const notifications = config.notifications
  const hooks = config.hooks

  // ── Notification Channels ──────────────────────────────────────
  const addChannel = () => {
    updateNotifications({
      channels: [
        ...notifications.channels,
        { id: generateId(), type: 'email', provider: '', enabled: true, config: '' },
      ],
    })
  }

  const updateChannel = (id: string, updates: Record<string, unknown>) => {
    updateNotifications({
      channels: notifications.channels.map((ch) =>
        ch.id === id ? { ...ch, ...updates } : ch
      ),
    })
  }

  const removeChannel = (id: string) => {
    updateNotifications({
      channels: notifications.channels.filter((ch) => ch.id !== id),
    })
  }

  // ── Hooks ──────────────────────────────────────────────────────
  const addHook = () => {
    updateHooks({
      hooks: [
        ...hooks.hooks,
        { id: generateId(), event: 'on-complete', handler: '', enabled: true },
      ],
    })
  }

  const updateHook = (id: string, updates: Record<string, unknown>) => {
    updateHooks({
      hooks: hooks.hooks.map((h) =>
        h.id === id ? { ...h, ...updates } : h
      ),
    })
  }

  const removeHook = (id: string) => {
    updateHooks({
      hooks: hooks.hooks.filter((h) => h.id !== id),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.notificationsHooks.title')}</CardTitle>
        <CardDescription>{t('workflow.notificationsHooks.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Notifications Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="notif-toggle" className="text-base">{t('workflow.notificationsHooks.enableNotifications')}</Label>
              <p className="text-sm text-muted-foreground">{t('workflow.notificationsHooks.enableNotificationsDesc')}</p>
            </div>
            <Switch
              id="notif-toggle"
              checked={notifications.enabled}
              onCheckedChange={(checked) => updateNotifications({ enabled: checked })}
            />
          </div>

          {notifications.enabled && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{t('workflow.notificationsHooks.channels')}</p>
                <Button variant="outline" size="sm" onClick={addChannel}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('workflow.notificationsHooks.addChannel')}
                </Button>
              </div>
              {notifications.channels.map((channel) => (
                <div key={channel.id} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={channel.enabled}
                        onCheckedChange={(checked) => updateChannel(channel.id, { enabled: checked })}
                      />
                      <Label className="text-sm">
                        {NOTIFICATION_CHANNEL_OPTIONS.find((o) => o.value === channel.type)?.label || channel.type}
                      </Label>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeChannel(channel.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs">{t('workflow.notificationsHooks.channelType')}</Label>
                      <Select
                        value={channel.type}
                        onValueChange={(val) => updateChannel(channel.id, { type: val })}
                        options={NOTIFICATION_CHANNEL_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">{t('workflow.notificationsHooks.provider')}</Label>
                      <Input
                        value={channel.provider}
                        onChange={(e) => updateChannel(channel.id, { provider: e.target.value })}
                        placeholder={t('workflow.notificationsHooks.providerPlaceholder')}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {notifications.channels.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">{t('workflow.notificationsHooks.noChannels')}</p>
              )}
            </div>
          )}
        </div>

        {/* Hooks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{t('workflow.notificationsHooks.hooks')}</p>
            <Button variant="outline" size="sm" onClick={addHook}>
              <Plus className="mr-2 h-4 w-4" />
              {t('workflow.notificationsHooks.addHook')}
            </Button>
          </div>
          {hooks.hooks.map((hook) => (
            <div key={hook.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={hook.enabled}
                    onCheckedChange={(checked) => updateHook(hook.id, { enabled: checked })}
                  />
                  <Label className="text-sm">
                    {HOOK_EVENT_OPTIONS.find((o) => o.value === hook.event)?.label || hook.event}
                  </Label>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeHook(hook.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.notificationsHooks.event')}</Label>
                  <Select
                    value={hook.event}
                    onValueChange={(val) => updateHook(hook.id, { event: val })}
                    options={HOOK_EVENT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('workflow.notificationsHooks.handler')}</Label>
                  <Input
                    value={hook.handler}
                    onChange={(e) => updateHook(hook.id, { handler: e.target.value })}
                    placeholder={t('workflow.notificationsHooks.handlerPlaceholder')}
                  />
                </div>
              </div>
            </div>
          ))}
          {hooks.hooks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">{t('workflow.notificationsHooks.noHooks')}</p>
          )}
        </div>

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
