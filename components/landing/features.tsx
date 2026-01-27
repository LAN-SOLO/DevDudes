import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: 'AI-Powered Generation',
    description: 'Describe your business needs in plain English and watch as your application takes shape automatically.',
  },
  {
    title: 'Enterprise Security',
    description: 'Built-in authentication, role-based access control, and audit logging from day one.',
  },
  {
    title: 'Zero Lock-In',
    description: 'Export your entire codebase anytime. Your code, your infrastructure, your choice.',
  },
  {
    title: 'Production Ready',
    description: 'Generated applications follow best practices with testing, CI/CD, and monitoring included.',
  },
  {
    title: 'Instant Deployment',
    description: 'One-click deployment to your preferred cloud provider or on-premises infrastructure.',
  },
  {
    title: 'Collaborative Editing',
    description: 'Work together with your team in real-time to refine and customize your application.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything you need to ship faster</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From idea to production in record time with features designed for modern development teams.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
