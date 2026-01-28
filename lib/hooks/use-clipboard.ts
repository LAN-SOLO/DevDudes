'use client'

import { useState, useCallback } from 'react'

interface UseClipboardOptions {
  timeout?: number
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = 2000, onSuccess, onError } = options
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setError(null)
        onSuccess?.()

        setTimeout(() => {
          setCopied(false)
        }, timeout)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to copy')
        setError(error)
        setCopied(false)
        onError?.(error)
      }
    },
    [timeout, onSuccess, onError]
  )

  const reset = useCallback(() => {
    setCopied(false)
    setError(null)
  }, [])

  return { copy, copied, error, reset }
}
