'use client'

import { usePresetWizard } from '../wizard-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import {
  UNIT_FRAMEWORK_OPTIONS, E2E_FRAMEWORK_OPTIONS,
  CI_PROVIDER_OPTIONS, CI_STAGE_OPTIONS, ENVIRONMENT_OPTIONS,
} from '@/lib/preset-pipeline/constants'

export function StepTestingCiCd() {
  const { config, updateTestingCiCd, setCurrentStep } = usePresetWizard()
  const { t } = useTranslation()

  const tc = config.testingCiCd

  const toggleStage = (value: string) => {
    const current = tc.stages
    if (current.includes(value)) {
      updateTestingCiCd({ stages: current.filter((s) => s !== value) })
    } else {
      updateTestingCiCd({ stages: [...current, value] })
    }
  }

  const toggleEnv = (value: string) => {
    const current = tc.environments
    if (current.includes(value)) {
      updateTestingCiCd({ environments: current.filter((e) => e !== value) })
    } else {
      updateTestingCiCd({ environments: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('preset.testingCiCd.title')}</CardTitle>
        <CardDescription>{t('preset.testingCiCd.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Unit Framework */}
        <div className="space-y-2">
          <Label>{t('preset.testingCiCd.unitFramework')}</Label>
          <div className="flex gap-2">
            {UNIT_FRAMEWORK_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateTestingCiCd({ unitFramework: opt.value })}
                className={`rounded-lg border px-4 py-2 text-sm transition-colors ${tc.unitFramework === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* E2E Framework */}
        <div className="space-y-2">
          <Label>{t('preset.testingCiCd.e2eFramework')}</Label>
          <div className="flex gap-2">
            {E2E_FRAMEWORK_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateTestingCiCd({ e2eFramework: opt.value })}
                className={`rounded-lg border px-4 py-2 text-sm transition-colors ${tc.e2eFramework === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Coverage Target */}
        <div className="space-y-2">
          <Label>{t('preset.testingCiCd.coverageTarget')}: {tc.coverageTarget}%</Label>
          <input type="range" min={0} max={100} value={tc.coverageTarget}
            onChange={(e) => updateTestingCiCd({ coverageTarget: Number(e.target.value) })}
            className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>

        {/* CI Provider */}
        <div className="space-y-2">
          <Label>{t('preset.testingCiCd.ciProvider')}</Label>
          <div className="grid grid-cols-2 gap-2">
            {CI_PROVIDER_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => updateTestingCiCd({ ciProvider: opt.value })}
                className={`rounded-lg border p-3 text-left text-sm transition-colors ${tc.ciProvider === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <span className="font-medium">{opt.label}</span>
                {opt.description && <p className="text-xs text-muted-foreground">{opt.description}</p>}
              </button>
            ))}
          </div>
        </div>

        {/* CI Stages */}
        <div className="space-y-2">
          <Label>{t('preset.testingCiCd.stages')}</Label>
          <div className="flex flex-wrap gap-2">
            {CI_STAGE_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => toggleStage(opt.value)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${tc.stages.includes(opt.value) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <div className={`flex h-4 w-4 items-center justify-center rounded border ${tc.stages.includes(opt.value) ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  {tc.stages.includes(opt.value) && <Check className="h-3 w-3" />}
                </div>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Environments */}
        <div className="space-y-2">
          <Label>{t('preset.testingCiCd.environments')}</Label>
          <div className="flex gap-2">
            {ENVIRONMENT_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => toggleEnv(opt.value)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${tc.environments.includes(opt.value) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <div className={`flex h-4 w-4 items-center justify-center rounded border ${tc.environments.includes(opt.value) ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  {tc.environments.includes(opt.value) && <Check className="h-3 w-3" />}
                </div>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(14)}>
            <ArrowLeft className="mr-2 h-4 w-4" />{t('preset.common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(16)}>
            {t('preset.common.continue')}<ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
