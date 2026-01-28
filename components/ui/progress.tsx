'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

const variantClasses = {
  default: 'bg-primary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, showLabel = false, size = 'md', variant = 'default', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        {showLabel && (
          <div className="flex justify-between mb-1 text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          className={cn(
            'w-full overflow-hidden rounded-full bg-muted',
            sizeClasses[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-in-out',
              variantClasses[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

interface CircularProgressProps {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  showLabel?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
  className?: string
}

const circularVariantClasses = {
  default: 'text-primary',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
}

function CircularProgress({
  value = 0,
  max = 100,
  size = 40,
  strokeWidth = 4,
  showLabel = false,
  variant = 'default',
  className,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('transition-all duration-300 ease-in-out', circularVariantClasses[variant])}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-xs font-medium">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}

export { Progress, CircularProgress }
