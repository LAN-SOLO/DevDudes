import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wand2, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function ComboDudePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pipeline">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Combo Dude</h2>
          <p className="text-muted-foreground">
            AI-powered concept generation and architecture design
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Generate App Concept</CardTitle>
              <CardDescription>
                Based on your Preset configuration, AI will generate a complete app concept
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-6 text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No Configuration Loaded</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete the Preset Dude wizard first to generate an app concept.
            </p>
            <Link href="/dashboard/pipeline/preset">
              <Button>
                Go to Preset Dude
              </Button>
            </Link>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">What Combo Dude Does</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Analyzes your business requirements and features</li>
              <li>• Designs optimal database schema and relationships</li>
              <li>• Plans API endpoints and data flows</li>
              <li>• Creates UI component hierarchy</li>
              <li>• Generates implementation roadmap</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
