'use client'

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react'

type Locale = 'en' | 'de'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

// External store for locale (same pattern as ThemeProvider)
let currentLocale: Locale = 'en'
const listeners = new Set<() => void>()

function getLocaleSnapshot(): Locale {
  return currentLocale
}

function getLocaleServerSnapshot(): Locale {
  return 'en'
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function setLocaleValue(locale: Locale) {
  currentLocale = locale
  listeners.forEach((l) => l())
}

// Translation lookup cache
let translations: Record<string, Record<string, unknown>> = {}
let translationsLoaded = false

function loadTranslations() {
  if (translationsLoaded) return
  /* eslint-disable @typescript-eslint/no-require-imports */
  translations = {
    en: require('./locales/en.json'),
    de: require('./locales/de.json'),
  }
  /* eslint-enable @typescript-eslint/no-require-imports */
  translationsLoaded = true
}

function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path
    }
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return path
    }
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : path
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getLocaleSnapshot, getLocaleServerSnapshot)

  useEffect(() => {
    loadTranslations()
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored && (stored === 'en' || stored === 'de')) {
      setLocaleValue(stored)
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale
    setLocaleValue(newLocale)
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      loadTranslations()
      let value = getNestedValue(translations[locale], key)
      if (value === key && locale !== 'en') {
        const fallback = getNestedValue(translations.en, key)
        if (fallback !== key) value = fallback
      }
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          const escaped = String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] || c)
          value = value.replace(`{${k}}`, escaped)
        }
      }
      return value
    },
    [locale]
  )

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
