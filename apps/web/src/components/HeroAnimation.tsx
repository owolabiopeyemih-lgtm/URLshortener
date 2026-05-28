'use client'

import { motion, useReducedMotion } from 'motion/react'

interface HeroAnimationProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function HeroAnimation({ children, delay = 0, className }: HeroAnimationProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
