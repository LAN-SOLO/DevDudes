'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { icons, type LucideIcon } from 'lucide-react'

interface OptionCardProps {
  icon: string
  label: string
  description: string
  examples?: string[]
  selected: boolean
  recommended?: boolean
  disabled?: boolean
  onClick: () => void
}

export function OptionCard({
  icon,
  label,
  description,
  examples,
  selected,
  recommended,
  disabled,
  onClick,
}: OptionCardProps) {
  const IconComponent: LucideIcon | undefined = icons[icon as keyof typeof icons]

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all hover:scale-[1.02]',
        selected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border hover:border-primary/50',
        disabled && 'cursor-not-allowed opacity-50',
        recommended && !selected && 'border-green-500/50'
      )}
    >
      {recommended && (
        <Badge variant="success" className="absolute -top-2 right-2 text-[10px]">
          AI Recommended
        </Badge>
      )}
      <div className="flex items-center gap-2">
        {IconComponent ? (
          <IconComponent className="h-5 w-5 text-muted-foreground" />
        ) : (
          <span className="text-xl">{icon}</span>
        )}
        <span className="font-medium text-sm">{label}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      {examples && examples.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {examples.map((ex) => (
            <span
              key={ex}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {ex}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}
