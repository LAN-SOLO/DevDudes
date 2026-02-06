'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import {
  CAMERA_OPTIONS_2D,
  CAMERA_OPTIONS_25D,
  CAMERA_OPTIONS_3D,
} from '@/lib/game-pipeline/constants'

export function StepCamera() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  // Filter camera options based on selected dimension
  const getCameraOptions = () => {
    switch (config.dimension) {
      case '2d':
        return CAMERA_OPTIONS_2D
      case '2.5d':
        return CAMERA_OPTIONS_25D
      case '3d':
        return CAMERA_OPTIONS_3D
      default:
        // Show all if no dimension selected
        return [...CAMERA_OPTIONS_2D, ...CAMERA_OPTIONS_3D]
    }
  }

  const cameraOptions = getCameraOptions()

  const handleSelect = (value: string) => {
    updateConfig({ cameraStyle: config.cameraStyle === value ? '' : value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.camera.title')}</CardTitle>
        <CardDescription>
          {config.dimension
            ? t('game.camera.descriptionFiltered', { dimension: config.dimension.toUpperCase() })
            : t('game.camera.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!config.dimension && (
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            {t('game.camera.noDimensionWarning')}
          </p>
        )}

        <OptionGrid
          options={cameraOptions}
          selected={config.cameraStyle}
          onSelect={handleSelect}
          mode="single"
        />

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(6)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(8)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
