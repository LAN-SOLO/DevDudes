import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "DevDudes cut our development time by 80%. What used to take months now takes days.",
    author: "Sarah Chen",
    role: "CTO, TechStartup Inc",
    initials: "SC",
    rating: 5,
    highlight: true,
  },
  {
    quote: "The generated code is production-ready. We deployed our CRM the same week we started.",
    author: "Marcus Johnson",
    role: "Founder, SalesFlow",
    initials: "MJ",
    rating: 5,
  },
  {
    quote: "Finally, a tool that understands enterprise requirements. Security and compliance built-in.",
    author: "Elena Rodriguez",
    role: "VP Engineering, FinCorp",
    initials: "ER",
    rating: 5,
  },
]

const stats = [
  { value: '10,000+', label: 'Developers' },
  { value: '50,000+', label: 'Apps Built' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'Rating' },
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20 pb-16 border-b">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by developers worldwide</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See what teams are saying about building with DevDudes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className={`relative ${testimonial.highlight ? 'border-primary shadow-lg' : 'bg-muted/30'}`}
            >
              <CardContent className="pt-6">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
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
