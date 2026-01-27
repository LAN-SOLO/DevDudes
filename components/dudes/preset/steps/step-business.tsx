'use client'

import { useWizard } from '../wizard-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Education',
  'Manufacturing',
  'Real Estate',
  'Hospitality',
  'Other',
]

export function StepBusiness() {
  const { config, updateConfig, setCurrentStep } = useWizard()

  const canContinue = config.businessName && config.industry

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tell us about your business</CardTitle>
        <CardDescription>
          This helps us customize the generated application for your needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            placeholder="Acme Corporation"
            value={config.businessName}
            onChange={(e) => updateConfig({ businessName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Industry</Label>
          <div className="grid grid-cols-3 gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => updateConfig({ industry })}
                className={`rounded-lg border p-3 text-sm transition-colors ${
                  config.industry === industry
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Brief Description</Label>
          <textarea
            id="description"
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Describe what your business does and what you need the app for..."
            value={config.description}
            onChange={(e) => updateConfig({ description: e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setCurrentStep(2)} disabled={!canContinue}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
