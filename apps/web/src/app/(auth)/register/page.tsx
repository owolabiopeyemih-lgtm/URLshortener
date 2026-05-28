'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ArrowRight, Zap, Check, LogIn } from 'lucide-react'
import { useAuth } from '@/components/Providers'
import { register as registerApi } from '@/lib/api'

const perks = [
  'Save and manage all your links',
  'Real-time click analytics',
  'QR codes for every link',
  'Custom branded aliases',
]

export default function Register() {
  const { signIn } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await registerApi(email, password)
      signIn(data.user, data.token)
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Registration failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 overflow-hidden bg-slate-50 dark:bg-dark-900">

      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-500/15 dark:bg-brand-500/25 blur-[100px]" />
        <div className="absolute bottom-0 left-[-80px] w-[400px] h-[400px] rounded-full bg-violet-500/10 dark:bg-violet-500/15 blur-[90px]" />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Brand mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center shadow-glow mb-4">
            <Zap className="w-7 h-7 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Create an account</h1>
          <p className="text-sm text-slate-500 dark:text-slate-300 mt-1.5">Free forever — no credit card needed</p>
        </div>

        {/* Perks */}
        <div className="bg-white dark:bg-dark-700 rounded-2xl border border-slate-300 dark:border-white/15 shadow-[0_2px_12px_rgba(99,102,241,0.08)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.3)] px-5 py-4 mb-4">
          <div className="space-y-2.5">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 font-medium">
                <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                  <Check className="w-3 h-3 text-white" />
                </div>
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white dark:bg-dark-700 rounded-3xl border border-slate-300 dark:border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_28px_rgba(0,0,0,0.4)] p-7">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-slate-300 dark:border-white/15 rounded-xl text-sm font-medium bg-slate-50 dark:bg-dark-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 dark:focus:border-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 border border-slate-300 dark:border-white/15 rounded-xl text-sm font-medium bg-slate-50 dark:bg-dark-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 dark:focus:border-brand-500 transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 rounded-xl px-4 py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-sm tracking-wide shadow-glow-sm hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              Create account
            </button>
          </form>
        </div>

        {/* Sign in link */}
        <div className="mt-4">
          <p className="text-center text-xs text-slate-500 dark:text-slate-500 mb-3">Already have an account?</p>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-dark-700 text-slate-700 dark:text-slate-200 font-semibold text-sm shadow-sm hover:border-brand-300 dark:hover:border-brand-700/60 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200"
          >
            <LogIn className="w-4 h-4" />
            Sign in to your account
          </Link>
        </div>
      </div>
    </div>
  )
}
