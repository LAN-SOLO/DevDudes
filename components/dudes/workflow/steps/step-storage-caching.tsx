'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import {
  STORAGE_TYPE_OPTIONS,
  CACHE_PROVIDER_OPTIONS,
  CACHE_STRATEGY_OPTIONS,
  QUEUE_PROVIDER_OPTIONS,
} from '@/lib/workflow-pipeline/constants'
import { generateId } from '@/lib/validations/workflow'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'

export function StepStorageCaching() {
  const {
    config,
    updateStorage,
    updateCaching,
    updateQueues,
    nextStep,
    prevStep,
  } = useWorkflowWizard()
  const { t } = useTranslation()

  // Queue management
  const addQueue = () => {
    updateQueues({
      queues: [
        ...config.queues.queues,
        { id: generateId(), name: '', provider: 'bullmq', concurrency: 5 },
      ],
    })
  }

  const removeQueue = (id: string) => {
    updateQueues({
      queues: config.queues.queues.filter((q) => q.id !== id),
    })
  }

  const updateQueueField = (
    id: string,
    field: string,
    value: string | number
  ) => {
    updateQueues({
      queues: config.queues.queues.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.storageCaching.title')}</CardTitle>
        <CardDescription>
          {t('workflow.storageCaching.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Storage Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="storage-toggle" className="text-base">
                {t('workflow.storageCaching.storageLabel')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('workflow.storageCaching.storageDesc')}
              </p>
            </div>
            <Switch
              id="storage-toggle"
              checked={config.storage.enabled}
              onCheckedChange={(val) => updateStorage({ enabled: val })}
            />
          </div>

          {config.storage.enabled && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label>{t('workflow.storageCaching.storageType')}</Label>
                <Select
                  value={config.storage.type}
                  onValueChange={(val) =>
                    updateStorage({ type: val as typeof config.storage.type })
                  }
                  options={STORAGE_TYPE_OPTIONS.map((o) => ({
                    value: o.value,
                    label: o.label,
                  }))}
                />
              </div>
              <div className="space-y-1">
                <Label>{t('workflow.storageCaching.bucket')}</Label>
                <Input
                  placeholder={t('workflow.storageCaching.bucketPlaceholder')}
                  value={config.storage.bucket}
                  onChange={(e) => updateStorage({ bucket: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label>{t('workflow.storageCaching.maxFileSize')}</Label>
                <Input
                  type="number"
                  min={0}
                  value={config.storage.maxFileSize}
                  onChange={(e) =>
                    updateStorage({ maxFileSize: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Caching Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="caching-toggle" className="text-base">
                {t('workflow.storageCaching.cachingLabel')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('workflow.storageCaching.cachingDesc')}
              </p>
            </div>
            <Switch
              id="caching-toggle"
              checked={config.caching.enabled}
              onCheckedChange={(val) => updateCaching({ enabled: val })}
            />
          </div>

          {config.caching.enabled && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label>{t('workflow.storageCaching.cacheProvider')}</Label>
                <Select
                  value={config.caching.provider}
                  onValueChange={(val) =>
                    updateCaching({ provider: val as typeof config.caching.provider })
                  }
                  options={CACHE_PROVIDER_OPTIONS.map((o) => ({
                    value: o.value,
                    label: o.label,
                  }))}
                />
              </div>
              <div className="space-y-1">
                <Label>{t('workflow.storageCaching.ttl')}</Label>
                <Input
                  type="number"
                  min={0}
                  value={config.caching.ttl}
                  onChange={(e) =>
                    updateCaching({ ttl: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>{t('workflow.storageCaching.cacheStrategy')}</Label>
                <Select
                  value={config.caching.strategy}
                  onValueChange={(val) =>
                    updateCaching({ strategy: val as typeof config.caching.strategy })
                  }
                  options={CACHE_STRATEGY_OPTIONS.map((o) => ({
                    value: o.value,
                    label: o.label,
                  }))}
                />
              </div>
            </div>
          )}
        </div>

        {/* Queues Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="queues-toggle" className="text-base">
                {t('workflow.storageCaching.queuesLabel')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('workflow.storageCaching.queuesDesc')}
              </p>
            </div>
            <Switch
              id="queues-toggle"
              checked={config.queues.enabled}
              onCheckedChange={(val) => updateQueues({ enabled: val })}
            />
          </div>

          {config.queues.enabled && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>{t('workflow.storageCaching.queueList')}</Label>
                <Button variant="outline" size="sm" onClick={addQueue}>
                  <Plus className="mr-1 h-4 w-4" />
                  {t('workflow.storageCaching.addQueue')}
                </Button>
              </div>

              {config.queues.queues.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  {t('workflow.storageCaching.noQueues')}
                </p>
              )}

              {config.queues.queues.map((queue) => (
                <div
                  key={queue.id}
                  className="rounded-lg border p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {queue.name || t('workflow.storageCaching.unnamedQueue')}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQueue(queue.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1">
                      <Label>{t('workflow.storageCaching.queueName')}</Label>
                      <Input
                        placeholder={t('workflow.storageCaching.queueNamePlaceholder')}
                        value={queue.name}
                        onChange={(e) =>
                          updateQueueField(queue.id, 'name', e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>{t('workflow.storageCaching.queueProvider')}</Label>
                      <Select
                        value={queue.provider}
                        onValueChange={(val) =>
                          updateQueueField(queue.id, 'provider', val)
                        }
                        options={QUEUE_PROVIDER_OPTIONS.map((o) => ({
                          value: o.value,
                          label: o.label,
                        }))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>{t('workflow.storageCaching.concurrency')}</Label>
                      <Input
                        type="number"
                        min={1}
                        value={queue.concurrency}
                        onChange={(e) =>
                          updateQueueField(
                            queue.id,
                            'concurrency',
                            parseInt(e.target.value) || 1
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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
