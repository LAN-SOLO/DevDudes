'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Plus, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StepCard } from '../step-card'
import { useWorkflowWizard } from '../workflow-context'
import { useTranslation } from '@/lib/i18n/language-provider'

export function StepBuilder() {
  const { t } = useTranslation()
  const { config, addStep, reorderSteps, setCurrentStep } = useWorkflowWizard()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      reorderSteps(active.id as string, over.id as string)
    }
  }

  const canContinue = config.steps.length > 0 && config.steps.every((step) => step.title.trim())

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('workflow.stepBuilder.title')}</CardTitle>
        <CardDescription>{t('workflow.stepBuilder.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {config.steps.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {t('workflow.stepBuilder.noSteps')}
            </p>
            <Button onClick={addStep}>
              <Plus className="mr-2 h-4 w-4" />
              {t('workflow.stepBuilder.addFirstStep')}
            </Button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={config.steps.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {config.steps.map((step, index) => (
                  <StepCard key={step.id} step={step} stepNumber={index + 1} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {config.steps.length > 0 && (
          <Button variant="outline" onClick={addStep} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            {t('workflow.stepBuilder.addStep')}
          </Button>
        )}

        <div className="flex justify-end pt-4">
          <Button onClick={() => setCurrentStep(2)} disabled={!canContinue}>
            {t('workflow.common.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
