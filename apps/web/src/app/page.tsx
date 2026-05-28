import { ArrowRight } from 'lucide-react'
import { Footer } from '@/components/Footer'
import { URLShortener } from '@/components/URLShortener'
import { AnimatedFeatureGrid } from '@/components/AnimatedFeatureGrid'
import { HeroAnimation } from '@/components/HeroAnimation'
import { HowItWorks } from '@/components/HowItWorks'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { URLShortenerInfo } from '@/components/URLShortenerInfo'
import { FAQSection } from '@/components/FAQSection'

const stats = [
  { value: '< 300ms', label: 'redirect latency' },
  { value: '99.9%',   label: 'uptime target' },
  { value: '10k+',    label: 'redirects / day' },
]

export default function Home() {
  return (
    <main className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section id="home" className="mesh-gradient grid-pattern relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-5 py-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[750px] rounded-full bg-brand-500/25 dark:bg-brand-500/30 blur-[120px]" />
          <div className="absolute top-1/4 right-[-80px] w-[550px] h-[550px] rounded-full bg-violet-500/18 dark:bg-violet-600/18 blur-[90px]" />
          <div className="absolute bottom-0 left-[-60px] w-[400px] h-[400px] rounded-full bg-brand-400/15 dark:bg-brand-600/15 blur-[90px]" />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
          <HeroAnimation delay={0}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-brand-300 bg-white/80 dark:border-brand-700/50 dark:bg-brand-950/30 text-xs font-semibold text-brand-900 dark:text-brand-300 mb-4 sm:mb-5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Free to use — no account needed
            </div>
          </HeroAnimation>

          <HeroAnimation delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] sm:leading-[1.02] mb-3 sm:mb-4">
              <span className="text-gradient">Links that work</span>
              <br />
              <span className="text-slate-950 dark:text-white">as hard as you do.</span>
            </h1>
          </HeroAnimation>

          <HeroAnimation delay={0.2}>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-5 sm:mb-7 leading-relaxed px-1">
              Transform any URL into a powerful short link. Get real-time analytics, QR codes, and custom slugs — all in one place.
            </p>
          </HeroAnimation>

          <HeroAnimation delay={0.3}>
            <URLShortener />
          </HeroAnimation>

          <HeroAnimation delay={0.45}>
            <div className="mt-6 sm:mt-8 flex items-center justify-center divide-x divide-slate-300/50 dark:divide-brand-900/80">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center px-4 sm:px-8 lg:px-12">
                  <p className="text-base sm:text-xl font-bold text-slate-700 dark:text-white">{value}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          </HeroAnimation>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-slate-50 dark:bg-dark-900 border-y border-slate-200 dark:border-white/8 py-16 sm:py-24 px-4 sm:px-5 shadow-[inset_0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_2px_16px_rgba(0,0,0,0.3)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/40 text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-4 sm:mb-5">
              What&apos;s included
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
              Everything your links need
            </h2>
            <p className="mt-3 sm:mt-4 max-w-lg mx-auto text-slate-500 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              From the moment you paste a URL to the moment someone clicks it, SnapURL has you covered.
            </p>
          </div>
          <AnimatedFeatureGrid />
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="bg-white dark:bg-dark-800 border-y border-slate-200 dark:border-white/8 py-16 sm:py-24 px-4 sm:px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/40 text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-4 sm:mb-5">
              How it works
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
              Three steps, done in seconds
            </h2>
            <p className="mt-3 sm:mt-4 max-w-md mx-auto text-slate-500 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              No signup required. Just paste, shorten, and share.
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ── What is a URL shortener ── */}
      <section className="bg-white dark:bg-dark-800 border-y border-slate-200 dark:border-white/8 py-16 sm:py-24 px-4 sm:px-5">
        <div className="max-w-5xl mx-auto">
          <URLShortenerInfo />
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section id="why-snapurl" className="bg-slate-50 dark:bg-dark-900 border-y border-slate-200 dark:border-white/8 py-16 sm:py-24 px-4 sm:px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/40 text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-4 sm:mb-5">
              Why SnapURL
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
              Built for speed, trust, and simplicity
            </h2>
            <p className="mt-3 sm:mt-4 max-w-lg mx-auto text-slate-500 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              There are plenty of link shorteners out there. Here&apos;s why people choose SnapURL.
            </p>
          </div>
          <WhyChooseUs />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-slate-50 dark:bg-dark-900 border-y border-slate-300 dark:border-white/10 py-16 sm:py-24 px-4 sm:px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/40 text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-4 sm:mb-5">
              FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
              Frequently asked questions
            </h2>
            <p className="mt-3 sm:mt-4 max-w-md mx-auto text-slate-500 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Everything you need to know before you start shortening.
            </p>
          </div>
          <FAQSection />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-indigo-300 dark:bg-dark-900 border-y border-indigo-200 dark:border-brand-900/70 py-16 sm:py-28 px-4 sm:px-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.60)] dark:shadow-[inset_0_1px_0_rgba(99,102,241,0.25)]">

        {/* Background glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-indigo-200/40 dark:bg-brand-600/20 blur-[100px]" />
          <div className="absolute bottom-0 right-[-50px] w-[350px] h-[350px] rounded-full bg-indigo-400/20 dark:bg-brand-700/30 blur-[80px]" />
          <div className="absolute bottom-0 left-[-50px] w-[350px] h-[350px] rounded-full bg-indigo-500/15 dark:bg-violet-900/35 blur-[80px]" />
        </div>

        {/* Dot grid — light mode */}
        <div className="dark:hidden absolute inset-0 [background-image:radial-gradient(circle,rgba(99,102,241,0.18)_1px,transparent_1px)] [background-size:24px_24px]" />
        {/* Dot grid — dark mode */}
        <div className="hidden dark:block absolute inset-0 [background-image:radial-gradient(circle,rgba(99,102,241,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-indigo-100/70 dark:bg-brand-500/10 border border-indigo-300 dark:border-brand-500/30 text-xs font-semibold text-indigo-700 dark:text-brand-300 uppercase tracking-widest mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Free forever — no credit card
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-indigo-950 dark:text-white mb-4 sm:mb-5 leading-[1.05]">
            Start shortening for free
          </h2>
          <p className="text-indigo-800 dark:text-slate-400 mb-7 sm:mb-10 text-sm sm:text-base leading-relaxed max-w-lg mx-auto px-1">
            Create an account to save your links, track analytics, and manage everything from one dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-900 dark:bg-brand-500 dark:text-white font-bold text-base hover:bg-indigo-50 dark:hover:bg-brand-600 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.16)] dark:shadow-[0_0_40px_rgba(99,102,241,0.45)] dark:hover:shadow-[0_0_55px_rgba(99,102,241,0.60)] transition-all duration-200"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-indigo-400 dark:border-brand-500/40 text-indigo-800 dark:text-brand-300 font-semibold text-base hover:bg-indigo-200/60 dark:hover:bg-brand-500/10 hover:border-indigo-500 dark:hover:border-brand-500/65 transition-all duration-200"
            >
              Sign in
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
