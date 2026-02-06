'use client'

import type { GameOption } from '@/lib/game-pipeline/types'
import { OptionCard } from './option-card'

interface OptionGridProps {
  options: GameOption[]
  selected: string | string[]
  onSelect: (value: string) => void
  mode: 'single' | 'multi'
  maxSelect?: number
  recommendations?: string[]
}

export function OptionGrid({
  options,
  selected,
  onSelect,
  mode,
  maxSelect,
  recommendations,
}: OptionGridProps) {
  const selectedArray = Array.isArray(selected) ? selected : selected ? [selected] : []
  const atMax = mode === 'multi' && maxSelect ? selectedArray.length >= maxSelect : false

  return (
    <div className="space-y-3">
      {mode === 'multi' && maxSelect && (
        <p className="text-sm text-muted-foreground">
          {selectedArray.length}/{maxSelect} selected
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const isSelected = selectedArray.includes(option.value)
          const isRecommended = recommendations?.includes(option.value) ?? false
          const isDisabled = !isSelected && atMax

          return (
            <OptionCard
              key={option.value}
              icon={option.icon}
              label={option.label}
              description={option.description}
              examples={option.examples}
              selected={isSelected}
              recommended={isRecommended}
              disabled={isDisabled}
              onClick={() => onSelect(option.value)}
            />
          )
        })}
      </div>
    </div>
  )
}
