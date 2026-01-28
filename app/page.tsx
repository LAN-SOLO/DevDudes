import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Pricing } from '@/components/landing/pricing'
import { FAQ } from '@/components/landing/faq'
import { CTA } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <main className="w-full max-w-7xl mx-auto">
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
