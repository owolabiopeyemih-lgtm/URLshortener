'use client'

import { useState } from 'react'
import { Copy, Check, Trash2, BarChart2, QrCode, ExternalLink } from 'lucide-react'
import type { ShortUrl } from '@/lib/api'

interface LinkCardProps {
  link: ShortUrl
  onDelete: (id: string) => void
  onAnalytics: (id: string) => void
  onQR: (url: string) => void
}

export function LinkCard({ link, onDelete, onAnalytics, onQR }: LinkCardProps) {
  const [copied, setCopied] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const hostname = (() => {
    try { return new URL(link.originalUrl).hostname }
    catch { return link.originalUrl }
  })()

  const copy = async () => {
    await navigator.clipboard.writeText(link.shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleDelete = async () => {
    if (!confirm('Delete this link? This cannot be undone.')) return
    setDeleting(true)
    onDelete(link.id)
  }

  const formattedDate = new Date(link.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="group bg-white dark:bg-dark-700 rounded-3xl border border-slate-300 dark:border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] p-5 hover:border-brand-300 dark:hover:border-brand-700/60 hover:shadow-[0_6px_24px_rgba(99,102,241,0.12)] dark:hover:shadow-[0_6px_28px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Favicon */}
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-dark-600 border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mb-0.5">{hostname}</p>
            <a
              href={link.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors truncate"
            >
              {link.shortUrl.replace(/^https?:\/\//, '')}
              <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Click count badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-800/50">
          <BarChart2 className="w-3.5 h-3.5 text-brand-500 dark:text-brand-400" />
          <span className="text-sm font-bold text-brand-700 dark:text-brand-300">{link.clicks}</span>
        </div>
      </div>

      {/* Original URL preview */}
      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate -mt-1 px-0.5">
        {link.originalUrl}
      </p>

      {/* Divider */}
      <div className="h-px bg-slate-200 dark:bg-white/10" />

      {/* Actions */}
      <div className="flex items-center flex-wrap gap-2">
        <button
          onClick={copy}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all duration-200 ${
            copied
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
              : 'bg-slate-50 dark:bg-dark-600 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 dark:hover:border-brand-700/50'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <button
          onClick={() => onQR(link.shortUrl)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border bg-slate-50 dark:bg-dark-600 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 dark:hover:border-brand-700/50 transition-all duration-200"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">QR Code</span>
          <span className="xs:hidden">QR</span>
        </button>

        <button
          onClick={() => onAnalytics(link.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border bg-slate-50 dark:bg-dark-600 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 dark:hover:border-brand-700/50 transition-all duration-200"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          Analytics
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-transparent text-slate-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800/40 disabled:opacity-40 transition-all duration-200"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium -mt-1">{formattedDate}</p>
    </div>
  )
}
