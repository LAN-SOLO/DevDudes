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
  DEPLOY_TARGET_OPTIONS,
  REGION_OPTIONS,
  SCALING_MODE_OPTIONS,
  CI_PROVIDER_OPTIONS,
  CI_STAGE_OPTIONS,
  ROLLBACK_STRATEGY_OPTIONS,
} from '@/lib/workflow-pipeline/constants'
import { generateId } from '@/lib/validations/workflow'
import type { WorkflowConfigV2 } from '@/lib/workflow-pipeline/types'
import { RecommendationChips } from '@/components/dudes/shared/recommendation-chips'

type Environment = WorkflowConfigV2['deployment']['environments'][number]

export function StepDeployment() {
  const { config, recommendations, updateDeployment, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()
  const deploy = config.deployment

  const toggleRegion = (region: string) => {
    if (deploy.regions.includes(region)) {
      updateDeployment({ regions: deploy.regions.filter((r) => r !== region) })
    } else {
      updateDeployment({ regions: [...deploy.regions, region] })
    }
  }

  const toggleCiStage = (stage: string) => {
    if (deploy.ciStages.includes(stage)) {
      updateDeployment({ ciStages: deploy.ciStages.filter((s) => s !== stage) })
    } else {
      updateDeployment({ ciStages: [...deploy.ciStages, stage] })
    }
  }

  const addEnvironment = () => {
    updateDeployment({
      environments: [...deploy.environments, {
        id: generateId(),
        name: '',
        url: '',
        variables: [],
      }],
    })
  }

  const removeEnvironment = (id: string) => {
    updateDeployment({ environments: deploy.environments.filter((e) => e.id !== id) })
  }

  const updateEnvironment = (id: string, updates: Partial<Environment>) => {
    updateDeployment({
      environments: deploy.environments.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.deploy.title')}</CardTitle>
        <CardDescription>{t('workflow.deploy.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deployment Recommendations */}
        {recommendations.deployment.length > 0 && (
          <RecommendationChips
            recommendations={recommendations.deployment}
            label={t('workflow.recommendations.deployment')}
          />
        )}

        {/* Deploy Target */}
        <div className="space-y-2">
          <Label>{t('workflow.deploy.deploymentTarget')}</Label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DEPLOY_TARGET_OPTIONS.map((target) => (
              <button
                key={target.value}
                onClick={() => updateDeployment({ target: target.value as typeof deploy.target })}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                  deploy.target === target.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium text-sm">{target.label}</span>
                <span className="text-xs text-muted-foreground text-center">{target.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <Label>{t('workflow.deploy.region')}</Label>
          <Select
            value={deploy.region}
            onValueChange={(v) => updateDeployment({ region: v })}
            options={REGION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* Multi-Region */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="multi-region-toggle" className="text-base">{t('workflow.deploy.multiRegion')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.deploy.multiRegionDesc')}</p>
          </div>
          <Switch
            id="multi-region-toggle"
            checked={deploy.multiRegion}
            onCheckedChange={(multiRegion) => updateDeployment({ multiRegion })}
          />
        </div>

        {deploy.multiRegion && (
          <div className="space-y-2">
            <Label>{t('workflow.deploy.regions')}</Label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {REGION_OPTIONS.filter((r) => r.value !== 'auto').map((region) => (
                <button
                  key={region.value}
                  onClick={() => toggleRegion(region.value)}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                    deploy.regions.includes(region.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                      deploy.regions.includes(region.value)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {deploy.regions.includes(region.value) && <Check className="h-3 w-3" />}
                  </div>
                  <div>
                    <span className="font-medium text-sm">{region.label}</span>
                    <p className="text-xs text-muted-foreground">{region.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scaling */}
        <div className="space-y-2">
          <Label>{t('workflow.deploy.scaling')}</Label>
          <Select
            value={deploy.scaling}
            onValueChange={(v) => updateDeployment({ scaling: v as typeof deploy.scaling })}
            options={SCALING_MODE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {deploy.scaling === 'fixed' && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t('workflow.deploy.minInstances')}</Label>
              <Input
                type="number"
                value={deploy.minInstances}
                onChange={(e) => updateDeployment({ minInstances: parseInt(e.target.value) || 1 })}
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('workflow.deploy.maxInstances')}</Label>
              <Input
                type="number"
                value={deploy.maxInstances}
                onChange={(e) => updateDeployment({ maxInstances: parseInt(e.target.value) || 1 })}
                min={1}
              />
            </div>
          </div>
        )}

        {deploy.scaling === 'auto' && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t('workflow.deploy.minInstances')}</Label>
              <Input
                type="number"
                value={deploy.minInstances}
                onChange={(e) => updateDeployment({ minInstances: parseInt(e.target.value) || 0 })}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('workflow.deploy.maxInstances')}</Label>
              <Input
                type="number"
                value={deploy.maxInstances}
                onChange={(e) => updateDeployment({ maxInstances: parseInt(e.target.value) || 1 })}
                min={1}
              />
            </div>
          </div>
        )}

        {/* CI/CD */}
        <div className="space-y-3 border-t pt-4">
          <p className="text-sm font-medium">{t('workflow.deploy.cicd')}</p>
          <div className="space-y-2">
            <Label>{t('workflow.deploy.ciProvider')}</Label>
            <Select
              value={deploy.ciProvider}
              onValueChange={(v) => updateDeployment({ ciProvider: v as typeof deploy.ciProvider })}
              options={CI_PROVIDER_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>

          {deploy.ciProvider !== 'none' && (
            <div className="space-y-2">
              <Label>{t('workflow.deploy.ciStages')}</Label>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {CI_STAGE_OPTIONS.map((stage) => (
                  <button
                    key={stage.value}
                    onClick={() => toggleCiStage(stage.value)}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                      deploy.ciStages.includes(stage.value)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded border ${
                        deploy.ciStages.includes(stage.value)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {deploy.ciStages.includes(stage.value) && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <span className="font-medium text-sm">{stage.label}</span>
                      <p className="text-xs text-muted-foreground">{stage.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rollback */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="rollback-toggle" className="text-base">{t('workflow.deploy.rollback')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.deploy.rollbackDesc')}</p>
          </div>
          <Switch
            id="rollback-toggle"
            checked={deploy.rollback}
            onCheckedChange={(rollback) => updateDeployment({ rollback })}
          />
        </div>

        {deploy.rollback && (
          <div className="space-y-2">
            <Label>{t('workflow.deploy.rollbackStrategy')}</Label>
            <Select
              value={deploy.rollbackStrategy}
              onValueChange={(v) => updateDeployment({ rollbackStrategy: v as typeof deploy.rollbackStrategy })}
              options={ROLLBACK_STRATEGY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        )}

        {/* Environments */}
        <div className="space-y-3 border-t pt-4">
          <p className="text-sm font-medium">{t('workflow.deploy.environments')}</p>
          {deploy.environments.map((env) => (
            <div key={env.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Input
                  className="max-w-[200px]"
                  placeholder={t('workflow.deploy.envName')}
                  value={env.name}
                  onChange={(e) => updateEnvironment(env.id, { name: e.target.value })}
                />
                <Button variant="ghost" size="icon" onClick={() => removeEnvironment(env.id)} className="text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>{t('workflow.deploy.envUrl')}</Label>
                <Input
                  placeholder="https://staging.example.com"
                  value={env.url}
                  onChange={(e) => updateEnvironment(env.id, { url: e.target.value })}
                />
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addEnvironment} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            {t('workflow.deploy.addEnvironment')}
          </Button>
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
