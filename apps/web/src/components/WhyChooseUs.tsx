'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Zap, ShieldCheck, BarChart2, Globe, Infinity, Fingerprint } from 'lucide-react'

const reasons = [
  {
    icon: Zap,
    title: 'Blazing fast redirects',
    description: 'Every click resolves in under 300ms — no lag, no lost visitors.',
  },
  {
    icon: ShieldCheck,
    title: 'No data harvesting',
    description: 'Anonymous links collect zero personal data. Your audience\'s privacy stays intact.',
  },
  {
    icon: BarChart2,
    title: 'Real analytics, not estimates',
    description: 'Every click is counted in real time — device, referrer, country, and time of day.',
  },
  {
    icon: Globe,
    title: 'Works everywhere',
    description: 'Short links load reliably on any device, browser, or network — globally.',
  },
  {
    icon: Infinity,
    title: 'Free core, forever',
    description: 'Shorten links with no account needed. Upgrade only when you need more power.',
  },
  {
    icon: Fingerprint,
    title: 'Your brand, your slug',
    description: 'Pick a custom alias that reflects your identity and builds audience trust.',
  },
]

export function WhyChooseUs() {
  const reduce = useReducedMotion()

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {reasons.map(({ icon: Icon, title, description }, i) => (
        <motion.div
          key={title}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="group flex items-start gap-4 bg-white dark:bg-dark-700 rounded-2xl border border-slate-300 dark:border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] px-5 py-5 hover:border-brand-300 dark:hover:border-brand-700/60 hover:shadow-[0_6px_24px_rgba(99,102,241,0.12)] dark:hover:shadow-[0_6px_28px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-800/50 flex items-center justify-center flex-shrink-0 text-brand-500 dark:text-brand-400 group-hover:bg-brand-100 dark:group-hover:bg-brand-950/80 transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
