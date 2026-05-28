'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Zap, BarChart2, QrCode, Shield } from 'lucide-react'

const features = [
  {
    icon: Zap,
    label: 'Lightning fast',
    title: 'Instant shortening',
    description: 'Paste any URL and get a compact, shareable link in under a second — no signup required.',
  },
  {
    icon: BarChart2,
    label: 'Real-time data',
    title: 'Built-in analytics',
    description: 'Track every click with device breakdown, referrer sources, countries, and time-of-day data.',
  },
  {
    icon: QrCode,
    label: 'Offline sharing',
    title: 'QR code generation',
    description: 'Every shortened link automatically generates a downloadable QR code for print and offline use.',
  },
  {
    icon: Shield,
    label: 'Your brand',
    title: 'Custom aliases',
    description: 'Choose your own slug to create memorable, branded links that people trust and remember.',
  },
]

export function AnimatedFeatureGrid() {
  const reduce = useReducedMotion()

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {features.map(({ icon: Icon, label, title, description }, i) => (
        <motion.div
          key={title}
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          className="group relative rounded-2xl p-6 bg-white dark:bg-dark-700 border border-slate-300 dark:border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] overflow-hidden hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-700/60 hover:shadow-[0_6px_24px_rgba(99,102,241,0.12)] dark:hover:shadow-[0_6px_28px_rgba(0,0,0,0.45)] transition-all duration-300"
        >
          {/* Number watermark */}
          <span className="absolute -top-2 right-5 text-[4.5rem] font-black leading-none select-none pointer-events-none text-slate-100 dark:text-white/[0.04]">
            {String(i + 1).padStart(2, '0')}
          </span>

          {/* Icon */}
          <div className="relative inline-flex w-11 h-11 rounded-xl items-center justify-center mb-4 bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 group-hover:bg-brand-100 dark:group-hover:bg-brand-950/80 transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-brand-500 dark:text-brand-400">{label}</p>
          <h3 className="text-base font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{description}</p>
        </motion.div>
      ))}
    </div>
  )
}
