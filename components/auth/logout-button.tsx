'use client'

import { logout } from '@/app/actions/auth'
import { useTranslation } from '@/lib/i18n/language-provider'

export function LogoutButton() {
  const { t } = useTranslation()
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        {t('header.signOut')}
      </button>
    </form>
  )
}
