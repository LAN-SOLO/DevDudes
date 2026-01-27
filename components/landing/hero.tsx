import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          The Company Shortcut Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Build production-ready business applications in minutes, not months.
          AI-powered, enterprise-secure, zero lock-in.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Start Free
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              See How It Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
