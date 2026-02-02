'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft, FolderOpen } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/language-provider'

export default function DashboardNotFound() {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <h1 className="text-7xl font-bold text-primary/20 mb-2">404</h1>
            <h2 className="text-2xl font-bold mb-2">{t('notFound.title')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('notFound.description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild>
                <Link href="/dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  {t('sidebar.nav.dashboard')}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/projects">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  {t('sidebar.nav.projects')}
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                {t('notFound.lookingForSomething')}
              </p>
              <div className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 bg-muted/50 max-w-xs mx-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-background border text-xs mx-1">⌘K</kbd> to search
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
