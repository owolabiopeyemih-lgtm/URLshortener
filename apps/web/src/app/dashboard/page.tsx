'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Link2, MousePointerClick, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/components/Providers'
import { getUserUrls, deleteUrl, type ShortUrl } from '@/lib/api'
import { LinkCard } from '@/components/LinkCard'
import { AnalyticsModal } from '@/components/AnalyticsModal'
import { QRCodeModal } from '@/components/QRCodeModal'

const statConfig = [
  { icon: Link2,             label: 'Total links',       key: 'links'   },
  { icon: MousePointerClick, label: 'Total clicks',      key: 'clicks'  },
  { icon: TrendingUp,        label: 'Avg. clicks / link', key: 'avg'    },
] as const

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()

  const [links, setLinks] = useState<ShortUrl[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [analyticsId, setAnalyticsId] = useState<string | null>(null)
  const [qrUrl, setQrUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    getUserUrls()
      .then(setLinks)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user, router])

  const handleDelete = async (id: string) => {
    try {
      await deleteUrl(id)
      setLinks((prev) => prev.filter((l) => l.id !== id))
    } catch {
      alert('Failed to delete link')
    }
  }

  const filtered = links.filter(
    (l) =>
      l.shortUrl.toLowerCase().includes(search.toLowerCase()) ||
      l.originalUrl.toLowerCase().includes(search.toLowerCase())
  )

  const totalClicks = links.reduce((s, l) => s + l.clicks, 0)
  const analyticsLink = links.find((l) => l.id === analyticsId)

  const statValues = {
    links:  links.length,
    clicks: totalClicks,
    avg:    links.length ? Math.round(totalClicks / links.length) : 0,
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-900">

      {/* ── Header ── */}
      <div className="relative bg-white dark:bg-dark-800 border-b border-slate-200 dark:border-white/8 overflow-hidden shadow-sm dark:shadow-[0_1px_16px_rgba(0,0,0,0.35)]">
        {/* Subtle glow accent */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 w-[500px] h-[300px] rounded-full bg-brand-500/8 dark:bg-brand-500/12 blur-[80px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-5 py-5 sm:py-7">
          {/* Title row */}
          <div className="flex items-center justify-between gap-3 mb-5 sm:mb-7">
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest mb-1">Dashboard</p>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">My Links</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-0.5 truncate">{user.email}</p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl text-sm font-bold shadow-glow-sm hover:shadow-glow transition-all duration-200 whitespace-nowrap flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New link</span>
              <span className="sm:hidden">New</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {statConfig.map(({ icon: Icon, label, key }) => (
              <div
                key={key}
                className="rounded-2xl bg-white dark:bg-dark-700 border border-slate-300 dark:border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] px-3 py-3 sm:px-5 sm:py-4 hover:border-brand-300 dark:hover:border-brand-700/60 hover:shadow-[0_4px_16px_rgba(99,102,241,0.10)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-200"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-500 dark:text-brand-400" />
                  </div>
                  <span className="hidden sm:block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide leading-tight">{label}</span>
                </div>
                <p className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">{statValues[key]}</p>
                <p className="sm:hidden text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-5 py-5 sm:py-7">

        {/* Search */}
        {links.length > 2 && (
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by URL or short code…"
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-dark-700 border border-slate-300 dark:border-white/15 rounded-2xl text-sm font-medium text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 dark:focus:border-brand-500 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
            />
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-3">
            <div className="w-9 h-9 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400 dark:text-slate-500">Loading your links…</p>
          </div>

        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-3xl bg-brand-50 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-800/40 flex items-center justify-center mb-5 shadow-glow-sm">
              <Link2 className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {search ? 'No matching links' : 'No links yet'}
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-7 max-w-xs leading-relaxed">
              {search
                ? 'Try a different search term.'
                : "Shorten your first URL and it'll appear here."}
            </p>
            {!search && (
              <Link
                href="/"
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl text-sm font-bold shadow-glow-sm hover:shadow-glow transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Create your first link
              </Link>
            )}
          </div>

        ) : (
          <>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-5 uppercase tracking-widest">
              {filtered.length} link{filtered.length !== 1 ? 's' : ''}
              {search && ` matching "${search}"`}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onDelete={handleDelete}
                  onAnalytics={setAnalyticsId}
                  onQR={setQrUrl}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {analyticsId && analyticsLink && (
        <AnalyticsModal
          urlId={analyticsId}
          shortUrl={analyticsLink.shortUrl}
          onClose={() => setAnalyticsId(null)}
        />
      )}
      {qrUrl && <QRCodeModal url={qrUrl} onClose={() => setQrUrl(null)} />}
    </div>
  )
}
