'use client'

import * as React from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebouncedCallback } from '@/lib/hooks/use-debounce'

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSearch?: (value: string) => void
  debounceMs?: number
  loading?: boolean
  showClear?: boolean
  className?: string
}

export function SearchInput({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  onSearch,
  debounceMs = 300,
  loading = false,
  showClear = true,
  className,
  placeholder = 'Search...',
  ...props
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const debouncedSearch = useDebouncedCallback((searchValue: string) => {
    onSearch?.(searchValue)
  }, debounceMs)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    debouncedSearch(newValue)
  }

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('')
    }
    onValueChange?.('')
    onSearch?.('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value)
    }
    if (e.key === 'Escape') {
      handleClear()
    }
  }

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="pl-9 pr-9"
        {...props}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        {showClear && value && !loading && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleClear}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  )
}

// Command-style search with keyboard shortcut hint
interface CommandSearchProps extends SearchInputProps {
  shortcut?: string
}

export function CommandSearch({
  shortcut = '⌘K',
  className,
  ...props
}: CommandSearchProps) {
  return (
    <div className={cn('relative', className)}>
      <SearchInput {...props} className="pr-16" />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
        {shortcut}
      </kbd>
    </div>
  )
}
