import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sparkles,
  Shield,
  Download,
  Rocket,
  Globe,
  Users,
  Database,
  Code,
  Zap,
} from 'lucide-react'

const features = [
  {
    title: 'AI-Powered Generation',
    description: 'Describe your business needs in plain English and watch as your application takes shape automatically.',
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Enterprise Security',
    description: 'Built-in authentication, role-based access control, and audit logging from day one.',
    icon: Shield,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Zero Lock-In',
    description: 'Export your entire codebase anytime. Your code, your infrastructure, your choice.',
    icon: Download,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Production Ready',
    description: 'Generated applications follow best practices with testing, CI/CD, and monitoring included.',
    icon: Rocket,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    title: 'Instant Deployment',
    description: 'One-click deployment to your preferred cloud provider or on-premises infrastructure.',
    icon: Globe,
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    title: 'Team Collaboration',
    description: 'Work together with your team in real-time to refine and customize your application.',
    icon: Users,
    color: 'bg-pink-100 text-pink-600',
  },
]

const highlights = [
  { icon: Database, label: 'Multiple DB Support', value: 'PostgreSQL, MySQL, MongoDB' },
  { icon: Code, label: 'Clean Code', value: 'TypeScript, React, Next.js' },
  { icon: Zap, label: 'Fast Generation', value: 'Under 5 minutes' },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to ship faster
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From idea to production in record time with features designed for modern development teams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Highlights Bar */}
        <div className="rounded-2xl bg-background border p-8">
          <div className="grid sm:grid-cols-3 gap-8">
            {highlights.map((highlight) => (
              <div key={highlight.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <highlight.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold mb-1">{highlight.label}</p>
                <p className="text-sm text-muted-foreground">{highlight.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
