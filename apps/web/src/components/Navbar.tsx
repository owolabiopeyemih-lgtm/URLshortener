'use client'

import Link from 'next/link'
import { Zap, Sun, Moon } from 'lucide-react'
import { useTheme } from './Providers'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-white/85 dark:bg-dark-800 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] dark:shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
      <div className="max-w-6xl mx-auto px-6 h-[4.25rem] flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
            <Zap className="w-[1.1rem] h-[1.1rem] text-white fill-white" />
          </div>
          <span className="font-bold text-[1.1rem] tracking-tight text-slate-900 dark:text-white">
            Snap<span className="text-brand-500">URL</span>
          </span>
        </Link>

        {/* Right — theme toggle only */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2.5 rounded-xl text-slate-400 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-700 transition-all duration-200"
        >
          {theme === 'dark'
            ? <Sun  className="w-[1.05rem] h-[1.05rem]" />
            : <Moon className="w-[1.05rem] h-[1.05rem]" />
          }
        </button>
      </div>
    </header>
  )
}
