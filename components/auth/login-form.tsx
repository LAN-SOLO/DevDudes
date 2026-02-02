'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { login } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { useTranslation } from '@/lib/i18n/language-provider'

export function LoginForm() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t('auth.login.title')}</CardTitle>
        <CardDescription>{t('auth.login.subtitle')}</CardDescription>
      </CardHeader>
      <form action={login}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <OAuthButtons />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('auth.login.orContinueWith')}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.login.email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.login.password')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            {t('auth.login.signIn')}
          </Button>
          <div className="text-sm text-center space-y-2">
            <Link href="/reset-password" className="text-muted-foreground hover:underline">
              {t('auth.login.forgotPassword')}
            </Link>
            <p className="text-muted-foreground">
              {t('auth.login.noAccount')}{' '}
              <Link href="/signup" className="text-primary hover:underline">
                {t('auth.login.signUp')}
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
