'use client'

import { useState } from 'react'
import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Sparkles, Plus, X } from 'lucide-react'
import { DEPLOY_TARGET_OPTIONS, REGION_OPTIONS, SCALING_OPTIONS } from '@/lib/preset-pipeline/constants'

export function StepDeploy() {
  const { config, updateDeploy, setCurrentStep, setIsComplete } = usePresetWizard()
  const { t } = useTranslation()
  const [newDomain, setNewDomain] = useState('')

  const deploy = config.deploy

  const addDomain = () => {
    if (!newDomain.trim()) return
    if (deploy.domains.includes(newDomain.trim())) return
    updateDeploy({ domains: [...deploy.domains, newDomain.trim()] })
    setNewDomain('')
  }

  const removeDomain = (domain: string) => {
    updateDeploy({ domains: deploy.domains.filter((d) => d !== domain) })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.deploy.title')}</CardTitle>
        <CardDescription>{t('preset.deploy.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deploy Target */}
        <div className="space-y-2">
          <Label>{t('preset.deploy.deploymentTarget')}</Label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {DEPLOY_TARGET_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateDeploy({ target: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${deploy.target === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
                {opt.description && <p className="text-xs text-muted-foreground">{opt.description}</p>}
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <Label>{t('preset.deploy.region')}</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {REGION_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateDeploy({ region: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${deploy.region === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
                {opt.description && <p className="text-xs text-muted-foreground">{opt.description}</p>}
              </button>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div className="space-y-2">
          <Label>{t('preset.deploy.domains')}</Label>
          {deploy.domains.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {deploy.domains.map((domain) => (
                <span key={domain} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
                  {domain}
                  <button onClick={() => removeDomain(domain)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input placeholder="example.com" value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addDomain()} />
            <Button onClick={addDomain}><Plus className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Scaling */}
        <div className="space-y-2">
          <Label>{t('preset.deploy.scaling')}</Label>
          <div className="flex gap-2">
            {SCALING_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateDeploy({ scaling: opt.value })}
                className={`rounded-lg border px-4 py-2 text-sm transition-colors ${deploy.scaling === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label>{t('preset.deploy.docker')}</Label>
            <Switch checked={deploy.docker} onCheckedChange={(v) => updateDeploy({ docker: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('preset.deploy.envVars')}</Label>
            <Switch checked={deploy.envVars} onCheckedChange={(v) => updateDeploy({ envVars: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('preset.deploy.i18nSupport')}</Label>
            <Switch checked={deploy.i18n} onCheckedChange={(v) => updateDeploy({ i18n: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('preset.deploy.accessibility')}</Label>
            <Switch checked={deploy.accessibility} onCheckedChange={(v) => updateDeploy({ accessibility: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label>{t('preset.deploy.seo')}</Label>
            <Switch checked={deploy.seo} onCheckedChange={(v) => updateDeploy({ seo: v })} />
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(15)}>
            <ArrowLeft className="mr-2 h-4 w-4" />{t('preset.common.back')}
          </Button>
          <Button onClick={() => setIsComplete(true)} className="gap-2">
            <Sparkles className="h-4 w-4" />
            {t('preset.deploy.completeConfig')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
