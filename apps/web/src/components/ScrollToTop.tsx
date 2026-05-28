'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-5 z-50 w-9 h-9 rounded-xl flex items-center justify-center bg-white dark:bg-dark-700 border border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] hover:text-brand-500 dark:hover:text-brand-400 hover:border-brand-200 dark:hover:border-brand-800/60 hover:shadow-[0_4px_16px_rgba(99,102,241,0.15)] transition-all duration-200"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
