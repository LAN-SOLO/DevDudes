'use client'

import { useTranslation } from '@/lib/i18n/language-provider'
import { Sparkles, Check } from 'lucide-react'

interface RecommendationChipsProps {
  recommendations: string[]
  selectedValues?: string[]
  onSelect?: (value: string) => void
  label?: string
}

export function RecommendationChips({
  recommendations,
  selectedValues = [],
  onSelect,
  label,
}: RecommendationChipsProps) {
  const { t } = useTranslation()

  if (recommendations.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Sparkles className="h-3 w-3 text-amber-500" />
        <span>{label || t('workflow.recommendations.title')}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {recommendations.map((rec) => {
          const isSelected = selectedValues.includes(rec)
          return (
            <button
              key={rec}
              onClick={() => onSelect?.(rec)}
              disabled={isSelected || !onSelect}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                isSelected
                  ? 'bg-primary/10 text-primary/60 cursor-default'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-400 dark:hover:bg-amber-950'
              }`}
            >
              {isSelected ? (
                <Check className="h-3 w-3" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              <span className="max-w-[200px] truncate">{rec}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
