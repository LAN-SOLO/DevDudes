'use client'

import { createContext, useContext, useCallback, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Custom store for theme state
let themeListeners: Array<() => void> = []
let currentTheme: Theme = 'system'
let isInitialized = false

function getThemeSnapshot(): Theme {
  return currentTheme
}

function getThemeServerSnapshot(): Theme {
  return 'system'
}

function subscribeToTheme(callback: () => void) {
  themeListeners.push(callback)

  // Initialize on first subscription (client-side only)
  if (!isInitialized && typeof window !== 'undefined') {
    isInitialized = true
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) {
      currentTheme = stored
    }
  }

  return () => {
    themeListeners = themeListeners.filter(l => l !== callback)
  }
}

function setThemeValue(newTheme: Theme) {
  currentTheme = newTheme
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', newTheme)
  }
  themeListeners.forEach(listener => listener())
}

// Apply theme to DOM
function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return

  const root = document.documentElement
  const resolved = theme === 'system' ? getSystemTheme() : theme
  root.classList.remove('light', 'dark')
  root.classList.add(resolved)
  return resolved
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  )

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeValue(newTheme)
    applyTheme(newTheme)
  }, [])

  // Calculate resolved theme
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  // Apply theme on mount and when theme changes
  useSyncExternalStore(
    useCallback((callback: () => void) => {
      // Apply theme immediately
      applyTheme(theme)

      // Listen for system theme changes
      if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
          if (currentTheme === 'system') {
            applyTheme('system')
            callback()
          }
        }
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
      }
      return () => {}
    }, [theme]),
    () => resolvedTheme,
    () => 'light' as const
  )

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
