'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onValueChange?: (value: number) => void
  className?: string
  showValue?: boolean
  label?: string
}

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  className,
  showValue = false,
  label,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const percentage = ((value - min) / (max - min)) * 100

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && <label className="text-sm font-medium">{label}</label>}
          {showValue && (
            <span className="text-sm text-muted-foreground">{value}</span>
          )}
        </div>
      )}
      <div className="relative">
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="w-full h-2 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={cn(
            'relative w-full h-2 appearance-none bg-transparent cursor-pointer',
            'disabled:cursor-not-allowed disabled:opacity-50',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:w-5',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-primary',
            '[&::-webkit-slider-thumb]:border-2',
            '[&::-webkit-slider-thumb]:border-background',
            '[&::-webkit-slider-thumb]:shadow-md',
            '[&::-webkit-slider-thumb]:transition-transform',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-moz-range-thumb]:h-5',
            '[&::-moz-range-thumb]:w-5',
            '[&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:bg-primary',
            '[&::-moz-range-thumb]:border-2',
            '[&::-moz-range-thumb]:border-background',
            '[&::-moz-range-thumb]:shadow-md'
          )}
        />
      </div>
    </div>
  )
}

interface RangeSliderProps {
  value?: [number, number]
  defaultValue?: [number, number]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onValueChange?: (value: [number, number]) => void
  className?: string
  showValues?: boolean
  label?: string
}

export function RangeSlider({
  value: controlledValue,
  defaultValue = [25, 75],
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  className,
  showValues = false,
  label,
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const minPercentage = ((value[0] - min) / (max - min)) * 100
  const maxPercentage = ((value[1] - min) / (max - min)) * 100

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(event.target.value), value[1] - step)
    const newValue: [number, number] = [newMin, value[1]]
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(event.target.value), value[0] + step)
    const newValue: [number, number] = [value[0], newMax]
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showValues) && (
        <div className="flex items-center justify-between mb-2">
          {label && <label className="text-sm font-medium">{label}</label>}
          {showValues && (
            <span className="text-sm text-muted-foreground">
              {value[0]} - {value[1]}
            </span>
          )}
        </div>
      )}
      <div className="relative h-5">
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="w-full h-2 rounded-full bg-muted">
            <div
              className="h-full bg-primary rounded-full"
              style={{
                marginLeft: `${minPercentage}%`,
                width: `${maxPercentage - minPercentage}%`,
              }}
            />
          </div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          disabled={disabled}
          onChange={handleMinChange}
          className="absolute w-full h-5 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-md"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          disabled={disabled}
          onChange={handleMaxChange}
          className="absolute w-full h-5 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-md"
        />
      </div>
    </div>
  )
}
