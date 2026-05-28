'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Is SnapURL free to use?',
    a: 'Yes — shortening links requires no account and costs nothing. You can paste a URL and get a short link instantly. Creating a free account unlocks link management, analytics, and QR codes.',
  },
  {
    q: 'Do I need to sign up to shorten a link?',
    a: 'No signup is required for basic shortening. However, creating an account lets you save your links, track click analytics, manage custom aliases, and generate QR codes from your dashboard.',
  },
  {
    q: 'How long do short links stay active?',
    a: 'Links created without an account are kept for 90 days. Links tied to a registered account are permanent for as long as the account is active.',
  },
  {
    q: 'Can I customize my short link?',
    a: 'Yes. When shortening a URL you can toggle the "Custom alias" option and type your own slug — for example snap.url/my-brand. Custom aliases must be unique and are available on a first-come, first-served basis.',
  },
  {
    q: 'What analytics does SnapURL provide?',
    a: 'Registered users get real-time click data including total clicks, device breakdown (mobile vs desktop), referrer sources, country, and time-of-day patterns — all visible from the dashboard.',
  },
  {
    q: 'Can I delete or edit a link after creating it?',
    a: 'Registered users can delete any of their links from the dashboard at any time. Editing the destination URL of an existing short link is not currently supported — delete and re-create if needed.',
  },
  {
    q: 'Is there a limit on how many links I can create?',
    a: 'Anonymous users can create links freely within fair-use limits. Registered users have no hard cap on the number of links they can save and manage.',
  },
  {
    q: 'Are my links private?',
    a: 'Short links are publicly accessible to anyone who has the URL — they are not password-protected. Analytics data is private and only visible to the account that created the link.',
  },
]

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion()

  return (
    <div className={`bg-white dark:bg-dark-700 rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-brand-300 dark:border-brand-700/60 shadow-[0_4px_20px_rgba(99,102,241,0.10)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'border-slate-300 dark:border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
      >
        <span className={`text-sm font-bold transition-colors duration-200 ${isOpen ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white'}`}>
          {q}
        </span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-brand-500 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height:  { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 },
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 border-t border-slate-200 dark:border-white/8 pt-3 sm:pt-4">
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="grid md:grid-cols-2 gap-4 items-start">
      {[faqs.slice(0, 4), faqs.slice(4)].map((col, ci) => (
        <div key={ci} className="space-y-3">
          {col.map((item, i) => {
            const idx = ci * 4 + i
            return (
              <FAQItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={open === idx}
                onToggle={() => setOpen(open === idx ? null : idx)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
