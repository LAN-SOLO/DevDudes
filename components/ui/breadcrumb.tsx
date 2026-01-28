import * as React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: React.ReactNode
  showHome?: boolean
  homeHref?: string
}

export function Breadcrumb({
  items,
  className,
  separator,
  showHome = true,
  homeHref = '/dashboard',
}: BreadcrumbProps) {
  const separatorElement = separator || <ChevronRight className="h-4 w-4 text-muted-foreground" />

  const allItems = showHome
    ? [{ label: 'Home', href: homeHref, icon: Home }, ...items]
    : items

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const Icon = item.icon

          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && separatorElement}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1.5 text-sm',
                    isLast ? 'font-medium text-foreground' : 'text-muted-foreground'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Hook to generate breadcrumbs from pathname
export function useBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)

  return segments.slice(1).map((segment, index) => {
    const href = '/' + segments.slice(0, index + 2).join('/')
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())

    return { label, href }
  })
}
