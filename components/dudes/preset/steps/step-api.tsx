'use client'

import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { API_STYLE_OPTIONS, PAGINATION_OPTIONS } from '@/lib/preset-pipeline/constants'

export function StepApi() {
  const { config, updateApi, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('preset.apiLayer.title')}</CardTitle>
            <CardDescription>{t('preset.apiLayer.description')}</CardDescription>
          </div>
          <Switch
            checked={config.api.enabled}
            onCheckedChange={(checked) => updateApi({ enabled: checked })}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!config.api.enabled ? (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('preset.apiLayer.disabled')}
            </p>
          </div>
        ) : (
          <>
            {/* API Style */}
            <div className="space-y-2">
              <Label>{t('preset.apiLayer.style')}</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {API_STYLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateApi({ style: opt.value })}
                    className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                      config.api.style === opt.value
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

            {/* Versioning */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t('preset.apiLayer.versioning')}</p>
                <p className="text-xs text-muted-foreground">{t('preset.apiLayer.versioningDescription')}</p>
              </div>
              <Switch
                checked={config.api.versioning}
                onCheckedChange={(checked) => updateApi({ versioning: checked })}
              />
            </div>

            {/* GraphQL (only show if style is not already graphql) */}
            {config.api.style !== 'graphql' && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t('preset.apiLayer.graphql')}</p>
                  <p className="text-xs text-muted-foreground">{t('preset.apiLayer.graphqlDescription')}</p>
                </div>
                <Switch
                  checked={config.api.graphql}
                  onCheckedChange={(checked) => updateApi({ graphql: checked })}
                />
              </div>
            )}

            {/* Rate Limiting */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t('preset.apiLayer.rateLimit')}</p>
                <p className="text-xs text-muted-foreground">{t('preset.apiLayer.rateLimitDescription')}</p>
              </div>
              <Switch
                checked={config.api.rateLimit}
                onCheckedChange={(checked) => updateApi({ rateLimit: checked })}
              />
            </div>

            {/* Rate Limit Max (only show if rateLimit is true) */}
            {config.api.rateLimit && (
              <div className="space-y-2">
                <Label htmlFor="rateLimitMax">{t('preset.apiLayer.rateLimitMax')}</Label>
                <Input
                  id="rateLimitMax"
                  type="number"
                  min={1}
                  value={config.api.rateLimitMax}
                  onChange={(e) => updateApi({ rateLimitMax: parseInt(e.target.value) || 60 })}
                  placeholder="60"
                />
              </div>
            )}

            {/* CORS */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t('preset.apiLayer.cors')}</p>
                <p className="text-xs text-muted-foreground">{t('preset.apiLayer.corsDescription')}</p>
              </div>
              <Switch
                checked={config.api.cors}
                onCheckedChange={(checked) => updateApi({ cors: checked })}
              />
            </div>

            {/* Pagination */}
            <div className="space-y-2">
              <Label>{t('preset.apiLayer.pagination')}</Label>
              <div className="grid grid-cols-3 gap-2">
                {PAGINATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateApi({ pagination: opt.value })}
                    className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                      config.api.pagination === opt.value
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
          </>
        )}

        {/* Navigation */}
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
