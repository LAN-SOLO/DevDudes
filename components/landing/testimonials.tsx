import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const testimonials = [
  {
    quote: "DevDudes cut our development time by 80%. What used to take months now takes days.",
    author: "Sarah Chen",
    role: "CTO, TechStartup Inc",
    initials: "SC",
  },
  {
    quote: "The generated code is production-ready. We deployed our CRM the same week we started.",
    author: "Marcus Johnson",
    role: "Founder, SalesFlow",
    initials: "MJ",
  },
  {
    quote: "Finally, a tool that understands enterprise requirements. Security and compliance built-in.",
    author: "Elena Rodriguez",
    role: "VP Engineering, FinCorp",
    initials: "ER",
  },
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Loved by developers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what teams are saying about building with DevDudes
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="bg-muted/30">
              <CardContent className="pt-6">
                <blockquote className="text-sm mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
