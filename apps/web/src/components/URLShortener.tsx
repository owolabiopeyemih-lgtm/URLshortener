'use client'

import { useState } from 'react'
import { ChevronDown, Copy, Check, Link2, Loader2, QrCode, Sparkles } from 'lucide-react'
import { shortenUrl, type ShortUrl } from '@/lib/api'
import { QRCodeModal } from './QRCodeModal'

export function URLShortener() {
  const [url, setUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [showAlias, setShowAlias] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ShortUrl | null>(null)
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const data = await shortenUrl(url.trim(), alias.trim() || undefined)
      setResult(data)
      setUrl('')
      setAlias('')
      setShowAlias(false)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Something went wrong. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const copy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result.shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="w-full text-left">

      {/* Input card */}
      <div className="glass rounded-3xl shadow-glow overflow-hidden border border-brand-300/60 dark:border-white/20">
        <form onSubmit={handleSubmit}>

          {/* URL input */}
          <div className="relative">
            <Link2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-white/50" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here…"
              required
              className="w-full pl-14 pr-4 sm:pr-6 py-5 sm:py-6 bg-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-white/50 text-base sm:text-lg font-semibold focus:outline-none"
            />
          </div>

          {/* Footer bar */}
          <div className="border-t border-slate-300/70 dark:border-white/15 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3">

            {/* Custom alias */}
            <div className="flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setShowAlias(!showAlias)}
                className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/75 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-500 dark:text-brand-400" />
                Custom alias
                <ChevronDown className={`w-3.5 h-3.5 text-slate-600 dark:text-white/65 transition-transform duration-200 ${showAlias ? 'rotate-180' : ''}`} />
              </button>

              {showAlias && (
                <div className="mt-3 flex items-center gap-2 animate-slide-up">
                  <span className="text-xs text-slate-500 dark:text-white/50 whitespace-nowrap font-mono">snap.url /</span>
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="my-brand"
                    maxLength={20}
                    className="flex-1 px-3 py-2 bg-slate-100 dark:bg-white/8 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-white/50 focus:outline-none focus:border-brand-400/50 transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-9 py-3.5 sm:py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-extrabold text-base tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-glow-sm hover:shadow-glow whitespace-nowrap flex-shrink-0"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? 'Shortening…' : 'Shorten URL'}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="px-6 pb-5">
              <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl px-4 py-3">
                {error}
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-4 glass rounded-3xl overflow-hidden animate-slide-up border border-brand-300/60 dark:border-white/20">

          {/* Result header */}
          <div className="px-7 py-6 border-b border-slate-300/70 dark:border-white/15">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Your link is ready
              </span>
            </div>
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-2xl font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-300 transition-colors truncate mb-1"
            >
              {result.shortUrl}
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate font-mono">
              {result.originalUrl}
            </p>
          </div>

          {/* Result actions */}
          <div className="px-6 py-4 flex gap-2">
            <button
              onClick={copy}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                copied
                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-white/8 text-slate-700 dark:text-white/70 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/12 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button
              onClick={() => setShowQR(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-white/8 text-slate-700 dark:text-white/70 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/12 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </button>
          </div>
        </div>
      )}

      {showQR && result && (
        <QRCodeModal url={result.shortUrl} onClose={() => setShowQR(false)} />
      )}
    </div>
  )
}
