'use client'

import { createContext, useContext, useEffect, useState } from 'react'

/* ── Auth ─────────────────────────────────────── */
interface User { id: string; email: string }

interface AuthContextType {
  user: User | null
  token: string | null
  signIn: (user: User, token: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within Providers')
  return ctx
}

/* ── Theme ────────────────────────────────────── */
type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within Providers')
  return ctx
}

/* ── Combined Provider ────────────────────────── */
export function Providers({ children }: { children: React.ReactNode }) {
  /* Auth state */
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  /* Theme state — default 'light'; the inline script handles the actual class */
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    /* Restore auth */
    const storedToken = localStorage.getItem('snapurl_token')
    const storedUser  = localStorage.getItem('snapurl_user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    /* Sync theme state with what the inline script already applied */
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  const signIn = (user: User, token: string) => {
    setUser(user)
    setToken(token)
    localStorage.setItem('snapurl_token', token)
    localStorage.setItem('snapurl_user', JSON.stringify(user))
  }

  const signOut = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('snapurl_token')
    localStorage.removeItem('snapurl_user')
  }

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('snapurl_theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}
