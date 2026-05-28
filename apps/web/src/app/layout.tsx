import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/Navbar'
import { ScrollToTop } from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'SnapURL — Shorten. Share. Track.',
  description: 'Turn any long URL into a powerful short link with built-in analytics, QR codes, and custom aliases — free, no account needed.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'SnapURL — Shorten. Share. Track.',
    description: 'Turn any long URL into a powerful short link with built-in analytics, QR codes, and custom aliases — free, no account needed.',
    siteName: 'SnapURL',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapURL — Shorten. Share. Track.',
    description: 'Turn any long URL into a powerful short link with built-in analytics, QR codes, and custom aliases — free, no account needed.',
  },
}

/* Injected before React hydrates to prevent flash of wrong theme */
const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('snapurl_theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>
          <Navbar />
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
