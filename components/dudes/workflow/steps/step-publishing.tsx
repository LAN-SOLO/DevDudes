'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Sparkles, Check, Plus, X } from 'lucide-react'
import {
  BUSINESS_MODEL_OPTIONS,
  DISTRIBUTION_CHANNEL_OPTIONS,
  APP_LICENSE_OPTIONS,
  RELEASE_STRATEGY_OPTIONS,
  VERSIONING_OPTIONS,
} from '@/lib/workflow-pipeline/constants'
import { generateId } from '@/lib/validations/workflow'
import { RecommendationChips } from '@/components/dudes/shared/recommendation-chips'

export function StepPublishing() {
  const { config, recommendations, updatePublishing, prevStep, setIsComplete } = useWorkflowWizard()
  const { t } = useTranslation()
  const pub = config.publishing

  const handleComplete = () => {
    setIsComplete(true)
  }

  const toggleBusinessModel = (model: string) => {
    updatePublishing({ businessModel: pub.businessModel === model ? '' : model })
  }

  const toggleChannel = (channel: string) => {
    if (pub.distributionChannels.includes(channel)) {
      updatePublishing({ distributionChannels: pub.distributionChannels.filter((c) => c !== channel) })
    } else {
      updatePublishing({ distributionChannels: [...pub.distributionChannels, channel] })
    }
  }

  const addStoreListing = () => {
    updatePublishing({
      storeListings: [...pub.storeListings, { id: generateId(), channel: '', appId: '', url: '' }],
    })
  }

  const removeStoreListing = (id: string) => {
    updatePublishing({ storeListings: pub.storeListings.filter((s) => s.id !== id) })
  }

  const updateStoreListing = (id: string, updates: Partial<{ channel: string; appId: string; url: string }>) => {
    updatePublishing({
      storeListings: pub.storeListings.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.publishing.title')}</CardTitle>
        <CardDescription>{t('workflow.publishing.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Publishing Recommendations */}
        {recommendations.publishing.length > 0 && (
          <RecommendationChips
            recommendations={recommendations.publishing}
            label={t('workflow.recommendations.publishing')}
          />
        )}

        {/* Business Model */}
        <div className="space-y-2">
          <Label>{t('workflow.publishing.businessModel')}</Label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BUSINESS_MODEL_OPTIONS.map((model) => (
              <button
                key={model.value}
                onClick={() => toggleBusinessModel(model.value)}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                  pub.businessModel === model.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium text-sm">{model.label}</span>
                <span className="text-xs text-muted-foreground text-center">{model.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Distribution Channels */}
        <div className="space-y-2">
          <Label>{t('workflow.publishing.distributionChannels')}</Label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {DISTRIBUTION_CHANNEL_OPTIONS.map((channel) => (
              <button
                key={channel.value}
                onClick={() => toggleChannel(channel.value)}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                  pub.distributionChannels.includes(channel.value)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                    pub.distributionChannels.includes(channel.value)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground'
                  }`}
                >
                  {pub.distributionChannels.includes(channel.value) && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <span className="font-medium text-sm">{channel.label}</span>
                  <p className="text-xs text-muted-foreground">{channel.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* License */}
        <div className="space-y-2">
          <Label>{t('workflow.publishing.license')}</Label>
          <Select
            value={pub.license}
            onValueChange={(v) => updatePublishing({ license: v })}
            options={APP_LICENSE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {pub.license === 'custom-eula' && (
          <div className="space-y-2">
            <Label>{t('workflow.publishing.customEula')}</Label>
            <Textarea
              placeholder={t('workflow.publishing.customEulaPlaceholder')}
              value={pub.customEula}
              onChange={(e) => updatePublishing({ customEula: e.target.value })}
              rows={4}
            />
          </div>
        )}

        {/* Release Strategy + Versioning */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t('workflow.publishing.releaseStrategy')}</Label>
            <Select
              value={pub.releaseStrategy}
              onValueChange={(v) => updatePublishing({ releaseStrategy: v })}
              options={RELEASE_STRATEGY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('workflow.publishing.versioning')}</Label>
            <Select
              value={pub.versioning}
              onValueChange={(v) => updatePublishing({ versioning: v })}
              options={VERSIONING_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        </div>

        {/* Custom Domain */}
        {pub.distributionChannels.includes('web-custom') && (
          <div className="space-y-2">
            <Label>{t('workflow.publishing.customDomain')}</Label>
            <Input
              placeholder="app.example.com"
              value={pub.customDomain}
              onChange={(e) => updatePublishing({ customDomain: e.target.value })}
            />
          </div>
        )}

        {/* Changelog */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="changelog-toggle" className="text-base">{t('workflow.publishing.changelog')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.publishing.changelogDesc')}</p>
          </div>
          <Switch
            id="changelog-toggle"
            checked={pub.changelogEnabled}
            onCheckedChange={(changelogEnabled) => updatePublishing({ changelogEnabled })}
          />
        </div>

        {/* Auto-Publish */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="auto-publish-toggle" className="text-base">{t('workflow.publishing.autoPublish')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.publishing.autoPublishDesc')}</p>
          </div>
          <Switch
            id="auto-publish-toggle"
            checked={pub.autoPublish}
            onCheckedChange={(autoPublish) => updatePublishing({ autoPublish })}
          />
        </div>

        {/* Store Listings */}
        {pub.distributionChannels.length > 0 && (
          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-medium">{t('workflow.publishing.storeListings')}</p>
            {pub.storeListings.map((listing) => (
              <div key={listing.id} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Select
                    value={listing.channel}
                    onValueChange={(v) => updateStoreListing(listing.id, { channel: v })}
                    options={pub.distributionChannels.map((ch) => {
                      const opt = DISTRIBUTION_CHANNEL_OPTIONS.find((o) => o.value === ch)
                      return { value: ch, label: opt?.label || ch }
                    })}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeStoreListing(listing.id)} className="text-muted-foreground hover:text-destructive ml-2">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('workflow.publishing.appId')}</Label>
                    <Input
                      placeholder="com.example.app"
                      value={listing.appId}
                      onChange={(e) => updateStoreListing(listing.id, { appId: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('workflow.publishing.storeUrl')}</Label>
                    <Input
                      placeholder="https://..."
                      value={listing.url}
                      onChange={(e) => updateStoreListing(listing.id, { url: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addStoreListing} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              {t('workflow.publishing.addStoreListing')}
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('workflow.common.back')}
          </Button>
          <Button onClick={handleComplete} className="gap-2">
            <Sparkles className="h-4 w-4" />
            {t('workflow.deploy.completeConfig')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
