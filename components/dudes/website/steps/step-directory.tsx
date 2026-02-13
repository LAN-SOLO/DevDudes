'use client'

import { useWebsiteWizard } from '../website-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import { OptionGrid } from '@/components/dudes/game/shared/option-grid'
import {
  DIRECTORY_PROVIDER_OPTIONS,
  DIRECTORY_SYNC_FIELD_OPTIONS,
  COMMUNICATION_CHANNEL_OPTIONS,
} from '@/lib/website-pipeline/constants'

export function StepDirectory() {
  const { config, updateConfig, setCurrentStep, setIsComplete } = useWebsiteWizard()
  const { t } = useTranslation()

  const toggleArray = (field: keyof typeof config, value: string) => {
    const current = config[field] as string[]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateConfig({ [field]: updated })
  }

  const activeChannels = config.communicationChannels.filter((c) => c !== 'none')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('website.directory.title')}</CardTitle>
        <CardDescription>{t('website.directory.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Directory Provider */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.directory.provider')}</label>
          <OptionGrid
            options={DIRECTORY_PROVIDER_OPTIONS}
            selected={config.directoryProvider}
            onSelect={(v) => updateConfig({ directoryProvider: v })}
            mode="single"
          />
        </div>

        {/* Sync Fields */}
        {config.directoryProvider && config.directoryProvider !== 'none' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.directory.syncFields')}</label>
            <OptionGrid
              options={DIRECTORY_SYNC_FIELD_OPTIONS}
              selected={config.directorySyncFields}
              onSelect={(v) => toggleArray('directorySyncFields', v)}
              mode="multi"
            />
          </div>
        )}

        {/* Auto Sync Toggle */}
        {config.directoryProvider && config.directoryProvider !== 'none' && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="directoryAutoSync"
              checked={config.directoryAutoSync}
              onChange={(e) => updateConfig({ directoryAutoSync: e.target.checked })}
              className="rounded border"
            />
            <label htmlFor="directoryAutoSync" className="text-sm">
              {t('website.directory.autoSync')}
            </label>
          </div>
        )}

        {/* Communication Channels */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('website.directory.communicationChannels')}</label>
          <OptionGrid
            options={COMMUNICATION_CHANNEL_OPTIONS}
            selected={config.communicationChannels}
            onSelect={(v) => toggleArray('communicationChannels', v)}
            mode="multi"
          />
        </div>

        {/* Default Notify Channel */}
        {activeChannels.length > 1 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('website.directory.defaultChannel')}</label>
            <Select
              value={config.defaultNotifyChannel}
              onValueChange={(v) => updateConfig({ defaultNotifyChannel: v })}
              options={activeChannels.map((c) => {
                const opt = COMMUNICATION_CHANNEL_OPTIONS.find((o) => o.value === c)
                return { value: c, label: opt?.label ?? c }
              })}
            />
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(18)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setIsComplete(true)}>
            {t('website.aiNotes.complete')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
