'use client'

import { useWebsiteWizard } from '../website-context'
import { Badge } from '@/components/ui/badge'
import {
  WEBSITE_TYPE_OPTIONS,
  FRAMEWORK_OPTIONS,
  DATABASE_OPTIONS,
  HOSTING_OPTIONS,
  LAYOUT_STYLE_OPTIONS,
  PAYMENT_PROCESSOR_OPTIONS,
  isEcommerce,
} from '@/lib/website-pipeline/constants'

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value
}

export function WebsitePreview() {
  const { config, currentStep } = useWebsiteWizard()

  if (currentStep < 3) return null

  const sections: { label: string; items: string[] }[] = []

  if (config.websiteTypes.length > 0) {
    sections.push({
      label: 'Website Types',
      items: config.websiteTypes.map((v) => findLabel(WEBSITE_TYPE_OPTIONS, v)),
    })
  }
  if (config.siteName) {
    sections.push({ label: 'Site Name', items: [config.siteName] })
  }
  if (config.framework) {
    sections.push({
      label: 'Framework',
      items: [findLabel(FRAMEWORK_OPTIONS, config.framework)],
    })
  }
  if (config.layoutStyle) {
    sections.push({
      label: 'Layout',
      items: [findLabel(LAYOUT_STYLE_OPTIONS, config.layoutStyle)],
    })
  }
  if (config.database && config.database !== 'none') {
    sections.push({
      label: 'Database',
      items: [findLabel(DATABASE_OPTIONS, config.database)],
    })
  }
  if (config.hosting) {
    sections.push({
      label: 'Hosting',
      items: [findLabel(HOSTING_OPTIONS, config.hosting)],
    })
  }
  if (isEcommerce(config.websiteTypes) && config.paymentProcessor) {
    sections.push({
      label: 'Payments',
      items: [findLabel(PAYMENT_PROCESSOR_OPTIONS, config.paymentProcessor)],
    })
  }
  if (config.pageStructure.length > 0) {
    sections.push({
      label: 'Pages',
      items: [`${config.pageStructure.length} pages`],
    })
  }
  if (config.aiFeatures.length > 0) {
    sections.push({
      label: 'AI Features',
      items: [`${config.aiFeatures.length} features`],
    })
  }

  if (sections.length === 0) return null

  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Website Preview
      </p>
      {config.elevatorPitch && (
        <p className="text-sm italic text-muted-foreground">
          &ldquo;{config.elevatorPitch}&rdquo;
        </p>
      )}
      {sections.map((section) => (
        <div key={section.label}>
          <p className="text-xs text-muted-foreground mb-1">{section.label}</p>
          <div className="flex flex-wrap gap-1">
            {section.items.map((item) => (
              <Badge key={item} variant="secondary" className="text-[10px]">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
