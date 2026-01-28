import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        success:
          'border-transparent bg-green-500/15 text-green-700 dark:text-green-400',
        warning:
          'border-transparent bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
        info:
          'border-transparent bg-blue-500/15 text-blue-700 dark:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  onRemove?: () => void
}

function Badge({ className, variant, onRemove, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 -mr-1 h-3.5 w-3.5 rounded-full hover:bg-foreground/20 inline-flex items-center justify-center"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </div>
  )
}

// Dot badge for status indicators
interface DotBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'online' | 'offline' | 'busy' | 'away'
  pulse?: boolean
}

function DotBadge({ status = 'online', pulse = false, className, children, ...props }: DotBadgeProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  }

  return (
    <span className={cn('inline-flex items-center gap-1.5 text-sm', className)} {...props}>
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              statusColors[status]
            )}
          />
        )}
        <span className={cn('relative inline-flex rounded-full h-2 w-2', statusColors[status])} />
      </span>
      {children}
    </span>
  )
}

// Count badge for notifications
interface CountBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number
  max?: number
  showZero?: boolean
}

function CountBadge({ count, max = 99, showZero = false, className, ...props }: CountBadgeProps) {
  if (count === 0 && !showZero) return null

  const displayCount = count > max ? `${max}+` : count.toString()

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full',
        'bg-destructive text-destructive-foreground text-xs font-medium',
        className
      )}
      {...props}
    >
      {displayCount}
    </span>
  )
}

export { Badge, DotBadge, CountBadge, badgeVariants }
