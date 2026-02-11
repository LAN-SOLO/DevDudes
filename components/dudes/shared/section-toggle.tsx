'use client'

import { ReactNode } from 'react'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface SectionToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
  title: string
  description?: string
  children: ReactNode
}

export function SectionToggle({ enabled, onToggle, title, description, children }: SectionToggleProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>
      </CardHeader>
      {enabled && (
        <CardContent className="space-y-4 pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  )
}
