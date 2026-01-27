import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wrench, ArrowLeft, Terminal, FolderTree, Package } from 'lucide-react'
import Link from 'next/link'

export default function PrepairDudePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pipeline">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Prepair Dude</h2>
          <p className="text-muted-foreground">
            Set up your development environment automatically
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
              <FolderTree className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">Project Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Creates optimized folder structure based on your app requirements
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">Dependencies</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Installs and configures all required packages and libraries
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">Environment</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Sets up environment variables and configuration files
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Environment Setup</CardTitle>
          <CardDescription>
            Prepair Dude will automatically configure your development environment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-6 text-center">
            <Wrench className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">Ready to Prepare</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete the Combo Dude step first to generate the environment setup.
            </p>
            <Button disabled>
              Prepare Environment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
