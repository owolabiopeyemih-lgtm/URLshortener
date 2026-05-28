'use client'

import Link from 'next/link'
import { Link2, Github, Twitter, Zap } from 'lucide-react'

const links = [
  {
    heading: 'Product',
    items: [
      { label: 'URL Shortener',  href: '/#home' },
      { label: 'QR Codes',       href: '/#features' },
      { label: 'Analytics',      href: '/#features' },
      { label: 'Custom Aliases', href: '/#features' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'FAQ',          href: '/#faq' },
      { label: 'Why SnapURL',  href: '/#why-snapurl' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { label: 'Privacy Policy',   href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
]

const socials = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Github,  href: 'https://github.com',  label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-slate-200 dark:border-white/10">
      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-8">

        {/* Brand column — full width on mobile, one column on desktop */}
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Snap<span className="text-brand-500">URL</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs lg:max-w-[200px]">
            Shorten, share, and track your links — free, no account needed.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2 mt-5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-brand-300 dark:hover:border-brand-700/60 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {links.map(({ heading, items }) => (
          <div key={heading} className="col-span-1">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
              {heading}
            </p>
            <ul className="space-y-3">
              {items.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-150 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 dark:border-white/8 px-4 sm:px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-brand-500 dark:text-brand-400 shrink-0" />
            <span>SnapURL &copy; {new Date().getFullYear()}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-150">Privacy</Link>
            <Link href="/terms"   className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-150">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
