'use client'

import * as React from 'react'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RadioGroupContextValue {
  value?: string
  onValueChange?: (value: string) => void
  name: string
  disabled?: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext)
  if (!context) {
    throw new Error('RadioGroup components must be used within a RadioGroup')
  }
  return context
}

interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  className?: string
  children: React.ReactNode
}

function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  name,
  disabled,
  orientation = 'vertical',
  className,
  children,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  const generatedName = React.useId()

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        name: name || generatedName,
        disabled,
      }}
    >
      <div
        role="radiogroup"
        className={cn(
          'grid gap-2',
          orientation === 'horizontal' && 'grid-flow-col auto-cols-max',
          className
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

interface RadioGroupItemProps {
  value: string
  label?: string
  description?: string
  disabled?: boolean
  className?: string
}

function RadioGroupItem({
  value,
  label,
  description,
  disabled: itemDisabled,
  className,
}: RadioGroupItemProps) {
  const context = useRadioGroupContext()
  const isChecked = context.value === value
  const isDisabled = context.disabled || itemDisabled

  const radio = (
    <div className="relative inline-flex items-center">
      <input
        type="radio"
        name={context.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => context.onValueChange?.(value)}
        className="peer sr-only"
      />
      <div
        className={cn(
          'h-4 w-4 rounded-full border border-primary shadow',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          isChecked && 'border-primary',
          className
        )}
      >
        {isChecked && (
          <span className="flex items-center justify-center">
            <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
          </span>
        )}
      </div>
    </div>
  )

  if (!label && !description) {
    return radio
  }

  return (
    <label className={cn('flex items-start gap-3 cursor-pointer', isDisabled && 'cursor-not-allowed opacity-50')}>
      {radio}
      <div className="grid gap-1.5 leading-none">
        {label && (
          <span className="text-sm font-medium leading-none">
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

// Card-style radio group
interface RadioCardProps {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
  className?: string
}

function RadioCard({
  value,
  label,
  description,
  icon,
  disabled: itemDisabled,
  className,
}: RadioCardProps) {
  const context = useRadioGroupContext()
  const isChecked = context.value === value
  const isDisabled = context.disabled || itemDisabled

  return (
    <label
      className={cn(
        'flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-colors',
        isChecked ? 'border-primary bg-primary/5' : 'hover:bg-muted/50',
        isDisabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input
        type="radio"
        name={context.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => context.onValueChange?.(value)}
        className="sr-only"
      />
      {icon && (
        <div className={cn('p-2 rounded-lg', isChecked ? 'bg-primary/10' : 'bg-muted')}>
          {icon}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium">{label}</span>
          <div
            className={cn(
              'h-4 w-4 rounded-full border',
              isChecked ? 'border-primary' : 'border-muted-foreground/30'
            )}
          >
            {isChecked && (
              <span className="flex items-center justify-center h-full">
                <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
              </span>
            )}
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </label>
  )
}

export { RadioGroup, RadioGroupItem, RadioCard }
