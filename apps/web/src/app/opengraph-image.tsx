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
          background: '#0a0a0f',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background colour blobs — no filter:blur (unsupported in Satori) */}
        <div style={{ position: 'absolute', top: -180, left: 100, width: 880, height: 580, borderRadius: '50%', background: 'rgba(99,102,241,0.22)' }} />
        <div style={{ position: 'absolute', bottom: -120, right: -80, width: 520, height: 520, borderRadius: '50%', background: 'rgba(139,92,246,0.16)' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -80, width: 460, height: 460, borderRadius: '50%', background: 'rgba(99,102,241,0.14)' }} />

        {/* Subtle linear-gradient vignette overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 60%, rgba(139,92,246,0.06) 100%)' }} />

        {/* ── Left content ── */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 0 60px 80px', flex: 1 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: 'linear-gradient(135deg, #6366f1, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 28px rgba(99,102,241,0.55)' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span style={{ fontSize: 38, fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>Snap</span>
              <span style={{ fontSize: 38, fontWeight: 800, color: '#818cf8', letterSpacing: '-0.5px' }}>URL</span>
            </div>
          </div>

          {/* Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.40)', borderRadius: 999, padding: '7px 18px', marginBottom: 26 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Free — no account needed</span>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
            <span style={{ fontSize: 60, fontWeight: 900, color: 'white', lineHeight: 1.06, letterSpacing: '-2px' }}>Links that work</span>
            <span style={{ fontSize: 60, fontWeight: 900, color: '#818cf8', lineHeight: 1.06, letterSpacing: '-2px' }}>as hard as you do.</span>
          </div>

          {/* Subtext */}
          <div style={{ display: 'flex', fontSize: 19, color: 'rgba(199,210,254,0.82)', marginBottom: 40, lineHeight: 1.55, maxWidth: 450 }}>
            Powerful short links with real-time analytics, QR codes, and custom aliases.
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 36 }}>
            {[
              { value: '< 300ms', label: 'Redirect latency' },
              { value: '99.9%',   label: 'Uptime' },
              { value: '10k+',    label: 'Daily redirects' },
            ].map(({ value, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: 'white' }}>{value}</span>
                <span style={{ fontSize: 12, color: 'rgba(165,180,252,0.60)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — UI mockup ── */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 80px 60px 40px', gap: 14, width: 440 }}>

          {/* Shortener card */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.55)' }}>
            {/* Input row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 20px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', flex: 1 }}>https://example.com/very-long-article-url...</span>
            </div>
            {/* Footer bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.22)' }}>
              <div style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderRadius: 12, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 0 18px rgba(99,102,241,0.45)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Shorten URL</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(99,102,241,0.70)', fontSize: 22 }}>↓</div>

          {/* Result card */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(99,102,241,0.45)', borderRadius: 20, padding: '20px', boxShadow: '0 8px 40px rgba(99,102,241,0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '1px' }}>Your link is ready</span>
            </div>
            <div style={{ display: 'flex', fontSize: 22, fontWeight: 800, color: '#818cf8', marginBottom: 4 }}>snap.url/grow2025</div>
            <div style={{ display: 'flex', fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace' }}>https://example.com/very-long-artic...</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
