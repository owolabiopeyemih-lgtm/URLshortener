import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SnapURL — Shorten. Share. Track.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Single top glow — no blur, just a large soft circle */}
        <div style={{ position: 'absolute', top: -200, left: 200, width: 800, height: 600, borderRadius: '50%', background: 'rgba(99,102,241,0.20)' }} />
        <div style={{ position: 'absolute', bottom: -150, right: 100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(139,92,246,0.12)' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #6366f1, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(99,102,241,0.60)' }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            <span style={{ fontSize: 52, fontWeight: 800, color: 'white', letterSpacing: '-1px' }}>Snap</span>
            <span style={{ fontSize: 52, fontWeight: 800, color: '#818cf8', letterSpacing: '-1px' }}>URL</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 900, color: 'white', letterSpacing: '-3px', lineHeight: 1.05, marginBottom: 20, textAlign: 'center' }}>
          Shorten. Share. Track.
        </div>

        {/* Subtext */}
        <div style={{ display: 'flex', fontSize: 24, color: 'rgba(165,180,252,0.75)', textAlign: 'center', maxWidth: 660, lineHeight: 1.5, marginBottom: 52 }}>
          Free short links with real-time analytics, QR codes, and custom aliases.
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 0 }}>
          {[
            { value: '< 300ms', label: 'Redirect latency' },
            { value: '99.9%',   label: 'Uptime' },
            { value: '10k+',    label: 'Daily redirects' },
          ].map(({ value, label }, i) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: 48, paddingRight: 48, borderLeft: i > 0 ? '1px solid rgba(99,102,241,0.25)' : 'none' }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: 'white' }}>{value}</span>
              <span style={{ fontSize: 13, color: 'rgba(165,180,252,0.55)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: 4 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    },
  )
}
