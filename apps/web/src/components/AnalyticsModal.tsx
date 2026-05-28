'use client'

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import { X, TrendingUp, Globe, Monitor, ExternalLink, MousePointerClick, Loader2 } from 'lucide-react'
import { getAnalytics, type AnalyticsData } from '@/lib/api'

const PALETTE = ['#7c3aed', '#06b6d4', '#f59e0b', '#10b981', '#f43f5e', '#a78bfa', '#34d399']

interface AnalyticsModalProps {
  urlId: string
  shortUrl: string
  onClose: () => void
}

function StatCard({ icon: Icon, label, value, sub }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string
}) {
  return (
    <div className="bg-white dark:bg-dark-600 rounded-2xl border border-gray-100 dark:border-white/5 p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-slate-100 leading-none">{value}</p>
        <p className="text-xs text-gray-500 dark:text-slate-300 mt-0.5">{label}</p>
        {sub && <p className="text-[10px] text-gray-400 dark:text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean; payload?: Array<{ value: number }>; label?: string
}) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-dark-900 text-white text-xs px-3 py-2 rounded-xl shadow-xl border border-white/10">
      <p className="text-white/50 mb-0.5">{label}</p>
      <p className="font-bold">{payload[0].value} click{payload[0].value !== 1 ? 's' : ''}</p>
    </div>
  )
}

export function AnalyticsModal({ urlId, shortUrl, onClose }: AnalyticsModalProps) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAnalytics(urlId)
      .then(setData)
      .catch(() => setError('Failed to load analytics'))
      .finally(() => setLoading(false))
  }, [urlId])

  const dateChartData = data
    ? Object.entries(data.byDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-14)
        .map(([date, count]) => ({ date: date.slice(5), count }))
    : []

  const deviceData = data
    ? Object.entries(data.byDevice).map(([name, value]) => ({ name, value }))
    : []

  const countryData = data
    ? Object.entries(data.byCountry).sort(([, a], [, b]) => b - a).slice(0, 6).map(([name, value]) => ({ name, value }))
    : []

  const topReferrer = data
    ? Object.entries(data.byReferrer).sort(([, a], [, b]) => b - a)[0]
    : null

  return (
    <div
      className="fixed inset-0 bg-dark-900/75 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-gray-50 dark:bg-dark-800 rounded-4xl shadow-2xl w-full max-w-2xl mt-6 mb-8 overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white dark:bg-dark-700 border-b border-gray-100 dark:border-white/5 px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-slate-100">Link Analytics</h3>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1 mt-0.5 font-medium"
            >
              {shortUrl.replace(/^https?:\/\//, '')}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 dark:bg-dark-600 hover:bg-gray-200 dark:hover:bg-dark-500 text-gray-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-400 dark:text-slate-300">
              <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
              <p className="text-sm">Loading analytics…</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-500 text-sm">{error}</div>
          )}

          {data && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard icon={MousePointerClick} label="Total clicks" value={data.totalClicks} />
                <StatCard
                  icon={Monitor}
                  label="Top device"
                  value={Object.entries(data.byDevice).sort(([,a],[,b])=>b-a)[0]?.[0] ?? '—'}
                />
                <StatCard
                  icon={Globe}
                  label="Top country"
                  value={Object.entries(data.byCountry).sort(([,a],[,b])=>b-a)[0]?.[0] ?? '—'}
                />
              </div>

              {/* Clicks over time */}
              {dateChartData.length > 0 && (
                <div className="bg-white dark:bg-dark-600 rounded-2xl border border-gray-100 dark:border-white/5 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-300 mb-4 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Clicks — last 14 days
                  </p>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={dateChartData} barCategoryGap="30%">
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,58,237,0.06)', radius: 8 }} />
                      <Bar dataKey="count" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Device */}
                {deviceData.length > 0 && (
                  <div className="bg-white dark:bg-dark-600 rounded-2xl border border-gray-100 dark:border-white/5 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-300 mb-4 flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5" />
                      Devices
                    </p>
                    <ResponsiveContainer width="100%" height={140}>
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={38}
                          outerRadius={60}
                          dataKey="value"
                          paddingAngle={3}
                        >
                          {deviceData.map((_, i) => (
                            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v: number, n: string) => [v, n]}
                          contentStyle={{ background: '#09090F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11, color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                      {deviceData.map(({ name, value }, i) => (
                        <div key={name} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
                          <span className="w-2 h-2 rounded-full inline-block" style={{ background: PALETTE[i % PALETTE.length] }} />
                          {name} · {value}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Countries */}
                {countryData.length > 0 && (
                  <div className="bg-white dark:bg-dark-600 rounded-2xl border border-gray-100 dark:border-white/5 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-300 mb-4 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      Countries
                    </p>
                    <div className="space-y-2">
                      {countryData.map(({ name, value }, i) => {
                        const max = countryData[0].value
                        return (
                          <div key={name} className="flex items-center gap-3">
                            <span className="text-xs font-mono text-gray-500 dark:text-slate-400 w-6">{name}</span>
                            <div className="flex-1 h-2 bg-gray-100 dark:bg-dark-500 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${(value / max) * 100}%`, background: PALETTE[i % PALETTE.length] }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-gray-700 dark:text-slate-300 w-5 text-right">{value}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Top referrer */}
              {topReferrer && (
                <div className="bg-white dark:bg-dark-600 rounded-2xl border border-gray-100 dark:border-white/5 px-5 py-4 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-300">Top referrer</p>
                  <span className="text-sm font-semibold text-gray-900 dark:text-slate-100 truncate ml-4">{topReferrer[0] || 'Direct'}</span>
                  <span className="ml-3 px-2.5 py-1 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-xs font-bold rounded-full">{topReferrer[1]}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
