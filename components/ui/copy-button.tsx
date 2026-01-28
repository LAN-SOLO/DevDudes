'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useClipboard } from '@/lib/hooks/use-clipboard'

interface CopyButtonProps {
  value: string
  className?: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showText?: boolean
}

export function CopyButton({
  value,
  className,
  variant = 'ghost',
  size = 'icon',
  showText = false,
}: CopyButtonProps) {
  const { copy, copied } = useClipboard()

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => copy(value)}
      className={cn('transition-all', className)}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          {showText && <span className="ml-2">Copied!</span>}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {showText && <span className="ml-2">Copy</span>}
        </>
      )}
    </Button>
  )
}

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const lines = code.split('\n')

  return (
    <div className={cn('relative group rounded-lg bg-muted', className)}>
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton value={code} variant="outline" size="sm" />
      </div>
      {language && (
        <div className="px-4 py-2 border-b text-xs text-muted-foreground">
          {language}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono">
          {showLineNumbers
            ? lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="select-none text-muted-foreground w-8 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            : code}
        </code>
      </pre>
    </div>
  )
}
