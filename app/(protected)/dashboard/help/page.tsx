'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  HelpCircle,
  BookOpen,
  MessageSquare,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Search,
  Send,
  Loader2,
  Check,
  Video,
  FileText,
  Code,
} from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I create my first app?',
    answer: 'Navigate to the Generator page and select "Start from Scratch" to use our 8-step wizard, or choose a template to get started quickly. The wizard will guide you through defining your app requirements, and our AI will generate the code.',
    category: 'Getting Started',
  },
  {
    id: '2',
    question: 'What databases are supported?',
    answer: 'DevDudes supports PostgreSQL, MySQL, Supabase, and MongoDB. You can connect to existing databases or let us set up a new Supabase instance for you automatically.',
    category: 'Databases',
  },
  {
    id: '3',
    question: 'How do I deploy my app?',
    answer: 'After completing the development phase, go to the Deploy step in the pipeline. You can deploy to Vercel, Netlify, or your own infrastructure. We handle the build process and configuration automatically.',
    category: 'Deployment',
  },
  {
    id: '4',
    question: 'Can I edit the generated code?',
    answer: 'Absolutely! The Dev Dude provides a full code editor where you can view and modify any generated files. You can also download the complete source code and work on it in your preferred IDE.',
    category: 'Development',
  },
  {
    id: '5',
    question: 'What is the Dudes pipeline?',
    answer: 'The Dudes pipeline is our 7-step workflow for app generation: Preset (configure), Combo (AI design), Prepair (environment setup), Dev (code generation), Test (quality assurance), Deploy (go live), and Docu (documentation).',
    category: 'Getting Started',
  },
  {
    id: '6',
    question: 'How do I upgrade my plan?',
    answer: 'Visit the Billing page in your dashboard to view available plans and upgrade. Pro and Enterprise plans offer unlimited projects, more database connections, and priority support.',
    category: 'Billing',
  },
  {
    id: '7',
    question: 'Can I use my own domain?',
    answer: 'Yes, Pro and Enterprise plans include custom domain support. After deploying, go to your project settings to configure your domain. We handle SSL certificates automatically.',
    category: 'Deployment',
  },
  {
    id: '8',
    question: 'Is my data secure?',
    answer: 'Yes, we take security seriously. All database credentials are encrypted at rest, connections use SSL/TLS, and we never access your actual data - only the schema for code generation.',
    category: 'Security',
  },
]

const resources = [
  {
    title: 'Documentation',
    description: 'Comprehensive guides and API reference',
    icon: BookOpen,
    href: '#',
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video walkthroughs',
    icon: Video,
    href: '#',
  },
  {
    title: 'Code Examples',
    description: 'Sample projects and snippets',
    icon: Code,
    href: '#',
  },
  {
    title: 'Changelog',
    description: 'Latest updates and new features',
    icon: FileText,
    href: '#',
  },
]

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [supportForm, setSupportForm] = useState({
    subject: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [messageSent, setMessageSent] = useState(false)

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = [...new Set(faqs.map(faq => faq.category))]

  const handleSendMessage = async () => {
    if (!supportForm.subject || !supportForm.message) return

    setIsSending(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSending(false)
    setMessageSent(true)
    setSupportForm({ subject: '', message: '' })

    setTimeout(() => setMessageSent(false), 5000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Help Center</h2>
        <p className="text-muted-foreground">
          Find answers and get support
        </p>
      </div>

      {/* Quick Resources */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => (
          <Card key={resource.title} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <a href={resource.href} className="flex flex-col items-center text-center">
                <div className="p-3 rounded-lg bg-primary/10 mb-3">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">{resource.title}</h3>
                <p className="text-xs text-muted-foreground">{resource.description}</p>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent>
              {searchQuery && filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No FAQs found matching &quot;{searchQuery}&quot;
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {(searchQuery ? filteredFaqs : categories.map(cat => ({
                    category: cat,
                    items: faqs.filter(f => f.category === cat)
                  }))).map((item) => {
                    if ('category' in item && 'items' in item) {
                      return (
                        <div key={item.category}>
                          <h4 className="font-medium text-sm text-muted-foreground mb-3">
                            {item.category}
                          </h4>
                          <div className="space-y-2">
                            {item.items.map((faq) => (
                              <div
                                key={faq.id}
                                className="rounded-lg border overflow-hidden"
                              >
                                <button
                                  onClick={() => setExpandedFaq(
                                    expandedFaq === faq.id ? null : faq.id
                                  )}
                                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                                >
                                  <span className="font-medium text-sm pr-4">
                                    {faq.question}
                                  </span>
                                  {expandedFaq === faq.id ? (
                                    <ChevronUp className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                  )}
                                </button>
                                {expandedFaq === faq.id && (
                                  <div className="px-4 pb-4 text-sm text-muted-foreground">
                                    {faq.answer}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    // Search results
                    const faq = item as FAQ
                    return (
                      <div
                        key={faq.id}
                        className="rounded-lg border overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaq(
                            expandedFaq === faq.id ? null : faq.id
                          )}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <span className="font-medium text-sm pr-4 block">
                              {faq.question}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {faq.category}
                            </span>
                          </div>
                          {expandedFaq === faq.id ? (
                            <ChevronUp className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          )}
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="px-4 pb-4 text-sm text-muted-foreground">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>Get help from our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {messageSent && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-3 flex items-center gap-2 text-green-700">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Message sent! We&apos;ll respond soon.</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={supportForm.subject}
                  onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  value={supportForm.message}
                  onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleSendMessage}
                disabled={!supportForm.subject || !supportForm.message || isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Other Ways to Reach Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="mailto:support@devdudes.app"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email Us</p>
                  <p className="text-xs text-muted-foreground">support@devdudes.app</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Community Discord</p>
                  <p className="text-xs text-muted-foreground">Join our community</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <Code className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">GitHub Issues</p>
                  <p className="text-xs text-muted-foreground">Report bugs or request features</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="font-medium mb-1">Need faster support?</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Pro and Enterprise plans include priority support with faster response times.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/dashboard/billing">View Plans</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
