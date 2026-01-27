'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: "How does the app generation work?",
    answer: "You describe your business requirements through our guided wizard, and our AI agents generate a complete, production-ready application. The code is yours to own, modify, and deploy anywhere."
  },
  {
    question: "What technologies does DevDudes use?",
    answer: "Generated apps use modern tech stacks including Next.js, React, TypeScript, Tailwind CSS, and your choice of database. Everything follows best practices and is fully typed."
  },
  {
    question: "Can I customize the generated code?",
    answer: "Absolutely. You get complete access to the source code. It's clean, well-documented, and designed to be extended. No lock-in, ever."
  },
  {
    question: "Is the generated code secure?",
    answer: "Security is built-in from the start. Generated apps include authentication, authorization, input validation, and follow OWASP security guidelines."
  },
  {
    question: "What support do you offer?",
    answer: "Free tier includes community support. Pro plans include priority support with guaranteed response times. Enterprise gets dedicated support engineers."
  },
  {
    question: "Can I deploy to my own infrastructure?",
    answer: "Yes. Export your app and deploy anywhere - Vercel, AWS, Google Cloud, or your own servers. We also offer one-click deployment to popular platforms."
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently asked questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about DevDudes
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg bg-background"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-4 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
