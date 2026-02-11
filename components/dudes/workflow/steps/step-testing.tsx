'use client'

import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  TEST_FRAMEWORK_OPTIONS,
  E2E_FRAMEWORK_OPTIONS,
  LOAD_TEST_OPTIONS,
} from '@/lib/workflow-pipeline/constants'

export function StepTesting() {
  const { config, updateTesting, nextStep, prevStep } = useWorkflowWizard()
  const { t } = useTranslation()

  const testing = config.testing

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.testing.title')}</CardTitle>
        <CardDescription>{t('workflow.testing.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Unit Testing Framework */}
        <div className="space-y-2">
          <Label>{t('workflow.testing.unitFramework')}</Label>
          <Select
            value={testing.unitFramework}
            onValueChange={(val) => updateTesting({ unitFramework: val as typeof testing.unitFramework })}
            options={TEST_FRAMEWORK_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* Integration Testing Framework */}
        <div className="space-y-2">
          <Label>{t('workflow.testing.integrationFramework')}</Label>
          <Select
            value={testing.integrationFramework}
            onValueChange={(val) => updateTesting({ integrationFramework: val as typeof testing.integrationFramework })}
            options={TEST_FRAMEWORK_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* E2E Framework */}
        <div className="space-y-2">
          <Label>{t('workflow.testing.e2eFramework')}</Label>
          <Select
            value={testing.e2eFramework}
            onValueChange={(val) => updateTesting({ e2eFramework: val as typeof testing.e2eFramework })}
            options={E2E_FRAMEWORK_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* Load Testing */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="load-test-toggle" className="text-base">{t('workflow.testing.loadTesting')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.testing.loadTestingDesc')}</p>
          </div>
          <Switch
            id="load-test-toggle"
            checked={testing.loadTesting}
            onCheckedChange={(checked) => updateTesting({ loadTesting: checked })}
          />
        </div>

        {testing.loadTesting && (
          <div className="space-y-2">
            <Label>{t('workflow.testing.loadTestTool')}</Label>
            <Select
              value={testing.loadTestTool}
              onValueChange={(val) => updateTesting({ loadTestTool: val })}
              options={LOAD_TEST_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>
        )}

        {/* Coverage Target */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>{t('workflow.testing.coverageTarget')}</Label>
            <span className="text-sm font-medium text-muted-foreground">{testing.coverageTarget}%</span>
          </div>
          <Input
            type="range"
            min={0}
            max={100}
            value={testing.coverageTarget}
            onChange={(e) => updateTesting({ coverageTarget: parseInt(e.target.value) || 0 })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Dry Run */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="dry-run-toggle" className="text-base">{t('workflow.testing.dryRun')}</Label>
            <p className="text-sm text-muted-foreground">{t('workflow.testing.dryRunDesc')}</p>
          </div>
          <Switch
            id="dry-run-toggle"
            checked={testing.dryRun}
            onCheckedChange={(checked) => updateTesting({ dryRun: checked })}
          />
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
