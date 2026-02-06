'use client'

import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'

export default function GameSummaryPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {t('game.summary.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('game.summary.description')}
        </p>
      </div>
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>{t('game.summary.placeholder')}</CardTitle>
          <CardDescription>{t('game.summary.placeholderDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Badge variant="secondary">{t('common.comingSoon')}</Badge>
        </CardContent>
      </Card>
    </div>
  )
}
