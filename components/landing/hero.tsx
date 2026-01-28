import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Shield, Zap, Play } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            <span>Introducing the 7 Dudes Pipeline</span>
            <ArrowRight className="h-4 w-4" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            The Company
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Shortcut Generator
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Build production-ready business applications in minutes, not months.
            AI-powered, enterprise-secure, zero lock-in.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                Start Building Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Hero Image / App Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative mx-auto max-w-5xl">
            {/* Browser mockup */}
            <div className="rounded-xl border bg-background shadow-2xl overflow-hidden">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-background text-xs text-muted-foreground">
                    app.devdudes.com/dashboard
                  </div>
                </div>
              </div>
              {/* Screenshot placeholder */}
              <div className="aspect-[16/9] bg-gradient-to-br from-muted via-muted/50 to-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-lg font-semibold mb-2">Your App Dashboard</p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Manage projects, monitor deployments, and generate new applications with AI assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
