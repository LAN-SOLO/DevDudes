'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast'
import { useTranslation } from '@/lib/i18n/language-provider'
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
  Video,
  FileText,
  Code,
} from 'lucide-react'

interface FAQ {
  id: string
  questionKey: string
  answerKey: string
  categoryKey: string
}

const faqs: FAQ[] = [
  {
    id: '1',
    questionKey: 'help.faqs.createApp.question',
    answerKey: 'help.faqs.createApp.answer',
    categoryKey: 'help.categories.gettingStarted',
  },
  {
    id: '2',
    questionKey: 'help.faqs.databases.question',
    answerKey: 'help.faqs.databases.answer',
    categoryKey: 'help.categories.databases',
  },
  {
    id: '3',
    questionKey: 'help.faqs.deploy.question',
    answerKey: 'help.faqs.deploy.answer',
    categoryKey: 'help.categories.deployment',
  },
  {
    id: '4',
    questionKey: 'help.faqs.editCode.question',
    answerKey: 'help.faqs.editCode.answer',
    categoryKey: 'help.categories.development',
  },
  {
    id: '5',
    questionKey: 'help.faqs.pipeline.question',
    answerKey: 'help.faqs.pipeline.answer',
    categoryKey: 'help.categories.gettingStarted',
  },
  {
    id: '6',
    questionKey: 'help.faqs.upgrade.question',
    answerKey: 'help.faqs.upgrade.answer',
    categoryKey: 'help.categories.billing',
  },
  {
    id: '7',
    questionKey: 'help.faqs.customDomain.question',
    answerKey: 'help.faqs.customDomain.answer',
    categoryKey: 'help.categories.deployment',
  },
  {
    id: '8',
    questionKey: 'help.faqs.security.question',
    answerKey: 'help.faqs.security.answer',
    categoryKey: 'help.categories.security',
  },
]

interface ResourceDef {
  titleKey: string
  descriptionKey: string
  icon: typeof BookOpen
  href: string
}

const resources: ResourceDef[] = [
  {
    titleKey: 'help.documentation',
    descriptionKey: 'help.documentationDesc',
    icon: BookOpen,
    href: '#',
  },
  {
    titleKey: 'help.videoTutorials',
    descriptionKey: 'help.videoTutorialsDesc',
    icon: Video,
    href: '#',
  },
  {
    titleKey: 'help.codeExamples',
    descriptionKey: 'help.codeExamplesDesc',
    icon: Code,
    href: '#',
  },
  {
    titleKey: 'help.changelog',
    descriptionKey: 'help.changelogDesc',
    icon: FileText,
    href: '/dashboard/whats-new',
  },
]

export default function HelpPage() {
  const { addToast } = useToast()
  const { t } = useTranslation()
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [supportForm, setSupportForm] = useState({
    subject: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)

  const filteredFaqs = faqs.filter(
    faq =>
      t(faq.questionKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(faq.answerKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(faq.categoryKey).toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = [...new Set(faqs.map(faq => faq.categoryKey))]

  const handleSendMessage = async () => {
    if (!supportForm.subject || !supportForm.message) return

    setIsSending(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSending(false)
    setSupportForm({ subject: '', message: '' })

    addToast({
      type: 'success',
      title: t('help.toasts.messageSentTitle'),
      description: t('help.toasts.messageSentDesc'),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('help.title')}</h2>
        <p className="text-muted-foreground">
          {t('help.subtitle')}
        </p>
      </div>

      {/* Quick Resources */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => (
          <Card key={resource.titleKey} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <a href={resource.href} className="flex flex-col items-center text-center">
                <div className="p-3 rounded-lg bg-primary/10 mb-3">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">{t(resource.titleKey)}</h3>
                <p className="text-xs text-muted-foreground">{t(resource.descriptionKey)}</p>
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
                {t('help.faq')}
              </CardTitle>
              <CardDescription>{t('help.faqDesc')}</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('help.searchFaqs')}
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
                    categoryKey: cat,
                    items: faqs.filter(f => f.categoryKey === cat)
                  }))).map((item) => {
                    if ('categoryKey' in item && 'items' in item) {
                      return (
                        <div key={item.categoryKey}>
                          <h4 className="font-medium text-sm text-muted-foreground mb-3">
                            {t(item.categoryKey)}
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
                                    {t(faq.questionKey)}
                                  </span>
                                  {expandedFaq === faq.id ? (
                                    <ChevronUp className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                  )}
                                </button>
                                {expandedFaq === faq.id && (
                                  <div className="px-4 pb-4 text-sm text-muted-foreground">
                                    {t(faq.answerKey)}
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
                              {t(faq.questionKey)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {t(faq.categoryKey)}
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
                            {t(faq.answerKey)}
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
                {t('help.contactSupport')}
              </CardTitle>
              <CardDescription>{t('help.contactSupportDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">{t('help.subject')}</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={supportForm.subject}
                  onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('help.message')}</Label>
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
                    {t('help.sendMessage')}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {t('help.otherWays')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="mailto:support@devdudes.app"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('help.emailUs')}</p>
                  <p className="text-xs text-muted-foreground">support@devdudes.app</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{t('help.communityDiscord')}</p>
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
                  <p className="text-sm font-medium">{t('help.githubIssues')}</p>
                  <p className="text-xs text-muted-foreground">Report bugs or request features</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="font-medium mb-1">{t('help.fasterSupport')}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('help.fasterSupportDesc')}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/dashboard/billing">{t('help.viewPlans')}</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
