import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to build faster?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of developers shipping production apps in record time.
              Start free, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
