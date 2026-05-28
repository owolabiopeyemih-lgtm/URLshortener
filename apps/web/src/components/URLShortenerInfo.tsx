'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Megaphone, Printer, MessageSquare, ShoppingBag, MousePointerClick } from 'lucide-react'

const useCases = [
  {
    icon: Megaphone,
    title: 'Marketing campaigns',
    description: 'Track which channels drive traffic by giving each campaign its own short link.',
  },
  {
    icon: MessageSquare,
    title: 'Social media',
    description: 'Long URLs look messy in posts and bios. A short link keeps things clean and clickable.',
  },
  {
    icon: Printer,
    title: 'Print & offline',
    description: 'Flyers, business cards, and packaging — short links are easy to type from memory.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    description: 'Share product pages without exposing long, ugly tracking strings to your customers.',
  },
  {
    icon: MousePointerClick,
    title: 'Click analytics',
    description: 'Understand exactly when, where, and how people interact with your links.',
  },
]

export function URLShortenerInfo() {
  const reduce = useReducedMotion()

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">

      {/* Left — explanation */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[11px] font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest mb-3">The basics</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 sm:mb-5 leading-[1.1]">
          What is a URL shortener?
        </h2>
        <div className="space-y-4 text-slate-700 dark:text-slate-200 text-base leading-relaxed">
          <p>
            A URL shortener converts a long, unwieldy web address into a compact link that redirects anyone who clicks it to the original destination — instantly.
          </p>
          <p>
            Instead of sharing something like<br />
            <span className="inline-block mt-1 font-mono text-xs bg-slate-100 dark:bg-dark-600 border border-slate-300 dark:border-white/15 rounded-lg px-3 py-2 text-slate-600 dark:text-slate-300 break-all">
              https://yoursite.com/blog/articles/how-to-grow-your-audience-in-2025?utm_source=newsletter
            </span>
          </p>
          <p className="font-medium">you share something like</p>
          <p>
            <span className="inline-block font-mono text-sm bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/50 rounded-lg px-3 py-2 text-brand-700 dark:text-brand-300 font-semibold">
              snap.url/grow2025
            </span>
          </p>
          <p>
            The short link is easier to read, share, and remember — and it tracks every click so you know exactly how your content is performing.
          </p>
        </div>
      </motion.div>

      {/* Right — use cases */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        <p className="text-[11px] font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest mb-4">Why you need one</p>
        {useCases.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-start gap-4 bg-white dark:bg-dark-700 rounded-2xl border border-slate-300 dark:border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] px-4 py-4 hover:border-brand-300 dark:hover:border-brand-700/60 hover:shadow-[0_4px_16px_rgba(99,102,241,0.10)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-800/50 flex items-center justify-center flex-shrink-0 text-brand-500 dark:text-brand-400 group-hover:bg-brand-100 dark:group-hover:bg-brand-950/80 transition-colors duration-300">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}
