'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sparkles, ArrowRight, Check } from 'lucide-react'

const appTypes = [
  { id: 'crm', label: 'CRM', description: 'Customer relationship management' },
  { id: 'inventory', label: 'Inventory', description: 'Stock and warehouse management' },
  { id: 'invoicing', label: 'Invoicing', description: 'Billing and payments' },
  { id: 'hrm', label: 'HR Management', description: 'Employee and payroll' },
  { id: 'project', label: 'Project Manager', description: 'Tasks and timelines' },
  { id: 'custom', label: 'Custom', description: 'Describe your own app' },
]

export default function GeneratorPage() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [appName, setAppName] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">App Generator</h2>
        <p className="text-muted-foreground">
          Create a production-ready business application in minutes
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                step >= s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`h-1 w-12 ${
                  step > s ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Choose App Type */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose App Type</CardTitle>
            <CardDescription>
              Select the type of application you want to build
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {appTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex flex-col items-start rounded-lg border p-4 text-left transition-colors ${
                    selectedType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="font-medium">{type.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {type.description}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedType}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: App Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>App Details</CardTitle>
            <CardDescription>
              Provide basic information about your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appName">App Name</Label>
              <Input
                id="appName"
                placeholder="My Business App"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe what your app should do, what features it needs, and any specific requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!appName}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Generate */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Ready to Generate</CardTitle>
            <CardDescription>
              Review your choices and generate your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">App Type</span>
                <span className="font-medium">
                  {appTypes.find((t) => t.id === selectedType)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">App Name</span>
                <span className="font-medium">{appName}</span>
              </div>
              {description && (
                <div className="pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Description</span>
                  <p className="text-sm mt-1">{description}</p>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                Generate App
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
