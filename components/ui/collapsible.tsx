'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

interface CollapsibleTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

interface CollapsibleContentProps {
  children: React.ReactNode
  className?: string
}

const CollapsibleContext = React.createContext<{
  open: boolean
  toggle: () => void
} | null>(null)

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error('Collapsible components must be used within a Collapsible')
  }
  return context
}

function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const toggle = React.useCallback(() => {
    if (!isControlled) {
      setInternalOpen((prev) => !prev)
    }
    onOpenChange?.(!open)
  }, [isControlled, open, onOpenChange])

  return (
    <CollapsibleContext.Provider value={{ open, toggle }}>
      <div className={className} data-state={open ? 'open' : 'closed'}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
}

function CollapsibleTrigger({ children, className, asChild }: CollapsibleTriggerProps) {
  const { open, toggle } = useCollapsibleContext()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: toggle,
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn('flex w-full items-center justify-between', className)}
      aria-expanded={open}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 text-muted-foreground transition-transform duration-200',
          open && 'rotate-180'
        )}
      />
    </button>
  )
}

function CollapsibleContent({ children, className }: CollapsibleContentProps) {
  const { open } = useCollapsibleContext()
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | undefined>(open ? undefined : 0)

  React.useEffect(() => {
    if (!contentRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(open ? entry.contentRect.height : 0)
      }
    })

    resizeObserver.observe(contentRef.current)
    return () => resizeObserver.disconnect()
  }, [open])

  return (
    <div
      className={cn('overflow-hidden transition-all duration-200', className)}
      style={{ height: height !== undefined ? `${height}px` : 'auto' }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  )
}

// Accordion component built on Collapsible
interface AccordionItem {
  id: string
  trigger: React.ReactNode
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  className?: string
}

function Accordion({ items, type = 'single', defaultValue, className }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (!defaultValue) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const handleOpenChange = (id: string, open: boolean) => {
    if (type === 'single') {
      setOpenItems(open ? [id] : [])
    } else {
      setOpenItems((prev) =>
        open ? [...prev, id] : prev.filter((item) => item !== id)
      )
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <Collapsible
          key={item.id}
          open={openItems.includes(item.id)}
          onOpenChange={(open) => handleOpenChange(item.id, open)}
          className="rounded-lg border"
        >
          <CollapsibleTrigger className="px-4 py-3 font-medium hover:bg-muted/50 rounded-t-lg">
            {item.trigger}
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-3 text-sm text-muted-foreground">
            {item.content}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Accordion,
}
