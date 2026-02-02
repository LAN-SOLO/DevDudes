'use client'

import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from '@/lib/i18n/language-provider'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          title={mounted ? (locale === 'en' ? 'English' : 'Deutsch') : undefined}
        >
          {mounted ? <Globe className="h-5 w-5" /> : <span className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLocale('en')}
          className={locale === 'en' ? 'bg-muted' : ''}
        >
          {t('language.english')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale('de')}
          className={locale === 'de' ? 'bg-muted' : ''}
        >
          {t('language.german')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
