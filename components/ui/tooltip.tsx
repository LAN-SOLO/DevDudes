'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  delayDuration?: number
  className?: string
}

const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
}

const arrowClasses = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-foreground border-x-transparent border-b-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-foreground border-y-transparent border-l-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-foreground border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-foreground border-y-transparent border-r-transparent',
}

export function Tooltip({
  children,
  content,
  side = 'top',
  delayDuration = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delayDuration)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 px-3 py-1.5 text-xs font-medium text-primary-foreground bg-foreground rounded-md shadow-md whitespace-nowrap animate-in fade-in-0 zoom-in-95',
            positionClasses[side],
            className
          )}
        >
          {content}
          <div
            className={cn(
              'absolute w-0 h-0 border-4',
              arrowClasses[side]
            )}
          />
        </div>
      )}
    </div>
  )
}

// Simple tooltip wrapper for common use cases
interface TooltipTriggerProps {
  children: React.ReactNode
  tooltip: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function TooltipTrigger({ children, tooltip, side = 'top' }: TooltipTriggerProps) {
  return (
    <Tooltip content={tooltip} side={side}>
      {children}
    </Tooltip>
  )
}
