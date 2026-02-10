'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/language-provider'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useTranslation()

  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t('error.somethingWentWrong')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('error.errorDescription')}
            </p>

            {error.digest && (
              <div className="mb-6 p-3 rounded-lg bg-muted text-left">
                <p className="text-xs text-muted-foreground mb-1">{t('error.errorReference')}</p>
                <code className="text-sm font-mono">{error.digest}</code>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {t('error.tryAgain')}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  {t('sidebar.nav.dashboard')}
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Link
                href="/dashboard/help"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bug className="h-4 w-4" />
                {t('error.reportIssue')}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
