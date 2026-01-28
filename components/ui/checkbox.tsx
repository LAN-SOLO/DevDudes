'use client'

import * as React from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, indeterminate, checked, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate ?? false
      }
    }, [indeterminate])

    const checkbox = (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={inputRef}
          checked={checked}
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            'h-4 w-4 shrink-0 rounded-sm border border-primary shadow',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
            'peer-checked:bg-primary peer-checked:text-primary-foreground',
            'peer-data-[indeterminate=true]:bg-primary peer-data-[indeterminate=true]:text-primary-foreground',
            className
          )}
          data-indeterminate={indeterminate}
        >
          {(checked || indeterminate) && (
            <span className="flex items-center justify-center text-current">
              {indeterminate ? (
                <Minus className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
    )

    if (!label && !description) {
      return checkbox
    }

    return (
      <label className="flex items-start gap-3 cursor-pointer">
        {checkbox}
        <div className="grid gap-1.5 leading-none">
          {label && (
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </span>
          )}
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </div>
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
