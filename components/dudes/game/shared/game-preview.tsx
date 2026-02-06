'use client'

import { useGameWizard } from '../game-context'
import { Badge } from '@/components/ui/badge'
import {
  THEME_OPTIONS,
  GENRE_OPTIONS,
  PLATFORM_OPTIONS,
  DIMENSION_OPTIONS,
  ART_STYLE_OPTIONS,
  CORE_MECHANICS_OPTIONS,
  ENGINE_OPTIONS,
  BUSINESS_MODEL_OPTIONS,
} from '@/lib/game-pipeline/constants'

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value
}

export function GamePreview() {
  const { config, currentStep } = useGameWizard()

  if (currentStep < 4) return null

  const sections: { label: string; items: string[] }[] = []

  if (config.themes.length > 0) {
    sections.push({
      label: 'Themes',
      items: config.themes.map((v) => findLabel(THEME_OPTIONS, v)),
    })
  }
  if (config.genres.length > 0) {
    sections.push({
      label: 'Genres',
      items: config.genres.map((v) => findLabel(GENRE_OPTIONS, v)),
    })
  }
  if (config.platforms.length > 0) {
    sections.push({
      label: 'Platforms',
      items: config.platforms.map((v) => findLabel(PLATFORM_OPTIONS, v)),
    })
  }
  if (config.dimension) {
    const items = [findLabel(DIMENSION_OPTIONS, config.dimension)]
    if (config.artStyle) items.push(findLabel(ART_STYLE_OPTIONS, config.artStyle))
    sections.push({ label: 'Visual', items })
  }
  if (config.coreMechanics.length > 0) {
    sections.push({
      label: 'Core Mechanics',
      items: config.coreMechanics.map((v) => findLabel(CORE_MECHANICS_OPTIONS, v)),
    })
  }
  if (config.engine) {
    sections.push({
      label: 'Engine',
      items: [findLabel(ENGINE_OPTIONS, config.engine)],
    })
  }
  if (config.businessModel) {
    sections.push({
      label: 'Business',
      items: [findLabel(BUSINESS_MODEL_OPTIONS, config.businessModel)],
    })
  }

  if (sections.length === 0) return null

  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Game Preview
      </p>
      {config.elevatorPitch && (
        <p className="text-sm italic text-muted-foreground">
          &ldquo;{config.elevatorPitch}&rdquo;
        </p>
      )}
      {sections.map((section) => (
        <div key={section.label}>
          <p className="text-xs text-muted-foreground mb-1">{section.label}</p>
          <div className="flex flex-wrap gap-1">
            {section.items.map((item) => (
              <Badge key={item} variant="secondary" className="text-[10px]">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
