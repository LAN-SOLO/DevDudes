'use client'

import { useState, useEffect } from 'react'
import { Command, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Shortcut {
  keys: string[]
  description: string
  category: string
}

const shortcuts: Shortcut[] = [
  // Navigation
  { keys: ['⌘', 'K'], description: 'Open command palette', category: 'Navigation' },
  { keys: ['G', 'D'], description: 'Go to Dashboard', category: 'Navigation' },
  { keys: ['G', 'P'], description: 'Go to Projects', category: 'Navigation' },
  { keys: ['G', 'T'], description: 'Go to Templates', category: 'Navigation' },
  { keys: ['G', 'S'], description: 'Go to Settings', category: 'Navigation' },

  // Actions
  { keys: ['N'], description: 'New project', category: 'Actions' },
  { keys: ['⌘', 'S'], description: 'Save changes', category: 'Actions' },
  { keys: ['⌘', 'Enter'], description: 'Submit form', category: 'Actions' },

  // General
  { keys: ['?'], description: 'Show keyboard shortcuts', category: 'General' },
  { keys: ['Esc'], description: 'Close modal / Cancel', category: 'General' },
]

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open shortcuts modal with ?
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          setIsOpen(true)
        }
      }

      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  const categories = [...new Set(shortcuts.map((s) => s.category))]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50">
        <div className="bg-background border rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <Command className="h-4 w-4" />
              <span className="font-medium">Keyboard Shortcuts</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[60vh] overflow-auto space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="space-y-2">
                  {shortcuts
                    .filter((s) => s.category === category)
                    .map((shortcut, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-1"
                      >
                        <span className="text-sm">{shortcut.description}</span>
                        <div className="flex items-center gap-1">
                          {shortcut.keys.map((key, i) => (
                            <span key={i}>
                              <kbd className="px-2 py-1 text-xs rounded bg-muted border font-mono">
                                {key}
                              </kbd>
                              {i < shortcut.keys.length - 1 && (
                                <span className="mx-1 text-muted-foreground">+</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t bg-muted/50">
            <p className="text-xs text-muted-foreground text-center">
              Press <kbd className="px-1.5 py-0.5 text-xs rounded bg-background border">?</kbd> anywhere to show this dialog
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
