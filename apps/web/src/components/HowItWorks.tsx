'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ClipboardPaste, Wand2, Share2 } from 'lucide-react'

const steps = [
  {
    icon: ClipboardPaste,
    step: '01',
    title: 'Paste your URL',
    description: 'Copy any long link — a product page, article, or social profile — and paste it into the shortener box.',
  },
  {
    icon: Wand2,
    step: '02',
    title: 'Customize (optional)',
    description: 'Add a custom alias to make your link memorable and on-brand, or leave it blank for an auto-generated code.',
  },
  {
    icon: Share2,
    step: '03',
    title: 'Share & track',
    description: 'Copy your short link, download a QR code, and watch real-time click analytics roll in from your dashboard.',
  },
]

export function HowItWorks() {
  const reduce = useReducedMotion()

  return (
    <div className="relative">
      {/* Connecting line — desktop only */}
      <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300 dark:from-brand-600 dark:via-brand-400 dark:to-brand-600 rounded-full" />

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map(({ icon: Icon, step, title, description }, i) => (
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Step circle */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center shadow-glow">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-brand-500 border-2 border-white dark:border-dark-800 flex items-center justify-center text-xs font-black text-white shadow-glow-sm">
                {i + 1}
              </span>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-dark-700 rounded-3xl border border-slate-300 dark:border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] px-5 sm:px-6 py-5 sm:py-6 w-full hover:border-brand-300 dark:hover:border-brand-700/60 hover:shadow-[0_6px_24px_rgba(99,102,241,0.12)] dark:hover:shadow-[0_6px_28px_rgba(0,0,0,0.5)] transition-all duration-300">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-500 dark:text-brand-400 mb-2">Step {step}</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
