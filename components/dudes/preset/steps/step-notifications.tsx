'use client'

import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SectionToggle } from '@/components/dudes/shared/section-toggle'
import { EMAIL_PROVIDER_OPTIONS, PUSH_PROVIDER_OPTIONS, SMS_PROVIDER_OPTIONS } from '@/lib/preset-pipeline/constants'
import type { NotificationChannel } from '@/lib/preset-pipeline/types'
import type { PresetOption } from '@/lib/preset-pipeline/types'

function ChannelRow({
  label,
  channel,
  providerOptions,
  onChange,
}: {
  label: string
  channel: NotificationChannel
  providerOptions?: PresetOption[]
  onChange: (updates: Partial<NotificationChannel>) => void
}) {
  return (
    <div className="space-y-2 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">{label}</Label>
        <Switch checked={channel.enabled} onCheckedChange={(enabled) => onChange({ enabled })} />
      </div>
      {channel.enabled && providerOptions && providerOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {providerOptions.map((opt) => (
            <button key={opt.value} onClick={() => onChange({ provider: opt.value })}
              className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${channel.provider === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function StepNotifications() {
  const { config, updateNotifications, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()

  const updateChannel = (key: 'inApp' | 'email' | 'push' | 'sms' | 'webhook', updates: Partial<NotificationChannel>) => {
    updateNotifications({ [key]: { ...config.notifications[key], ...updates } })
  }

  return (
    <div className="space-y-6">
      <SectionToggle
        enabled={config.notifications.enabled}
        onToggle={(enabled) => updateNotifications({ enabled })}
        title={t('preset.notifications.title')}
        description={t('preset.notifications.description')}
      >
        <div className="space-y-3">
          <ChannelRow label={t('preset.notifications.inApp')} channel={config.notifications.inApp}
            onChange={(u) => updateChannel('inApp', u)} />
          <ChannelRow label={t('preset.notifications.email')} channel={config.notifications.email}
            providerOptions={EMAIL_PROVIDER_OPTIONS} onChange={(u) => updateChannel('email', u)} />
          <ChannelRow label={t('preset.notifications.push')} channel={config.notifications.push}
            providerOptions={PUSH_PROVIDER_OPTIONS} onChange={(u) => updateChannel('push', u)} />
          <ChannelRow label={t('preset.notifications.sms')} channel={config.notifications.sms}
            providerOptions={SMS_PROVIDER_OPTIONS} onChange={(u) => updateChannel('sms', u)} />
          <ChannelRow label={t('preset.notifications.webhook')} channel={config.notifications.webhook}
            onChange={(u) => updateChannel('webhook', u)} />
        </div>
      </SectionToggle>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(10)}>
          <ArrowLeft className="mr-2 h-4 w-4" />{t('preset.common.back')}
        </Button>
        <Button onClick={() => setCurrentStep(12)}>
          {t('preset.common.continue')}<ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
