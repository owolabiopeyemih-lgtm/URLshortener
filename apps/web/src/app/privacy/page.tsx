import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy — SnapURL',
  description: 'How SnapURL collects, uses, and protects your data.',
}

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'When you shorten a URL without an account, we store only the destination URL, the generated short code, and an optional custom alias. No personal data is required.',
      'When you create an account, we collect your email address and a hashed version of your password. We do not store your password in plain text.',
      'We automatically collect basic analytics data for each short link click: the referrer URL, approximate country (derived from IP address), device type, and browser. We do not store full IP addresses.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'We use collected data solely to operate the SnapURL service — generating short links, routing redirects, and providing click analytics to link owners.',
      'We do not sell, rent, or share your personal data with third parties for marketing purposes.',
      'Aggregate, anonymised analytics may be used internally to improve the service.',
    ],
  },
  {
    title: 'Cookies & Local Storage',
    body: [
      'SnapURL uses browser local storage to remember your theme preference (light or dark mode) and to keep you signed in via a JWT token. No third-party tracking cookies are set.',
      'We do not use advertising cookies or cross-site tracking.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'Anonymous short links are retained indefinitely unless deleted by the creator.',
      'Account data and associated links are retained for the lifetime of your account. You may request deletion at any time by contacting us.',
      'Click analytics are retained for 30 days on the free plan and up to 1 year on paid plans.',
    ],
  },
  {
    title: 'Security',
    body: [
      'All data is transmitted over HTTPS. Passwords are hashed with bcrypt before storage. Access tokens are short-lived JWTs stored in local storage.',
      'We take reasonable measures to protect your data, but no system is perfectly secure. Please use a strong, unique password.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You may request access to, correction of, or deletion of your personal data at any time by emailing us.',
      'You may delete your account and all associated data from the dashboard settings page.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Significant changes will be communicated via email to registered users. Continued use of the service after changes constitutes acceptance.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For privacy-related questions or data requests, please contact us at privacy@snapurl.app.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-dark-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium mb-6 transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/40 text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-4">
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-10">
          SnapURL (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how we handle it.
        </p>

        <div className="space-y-10">
          {sections.map(({ title, body }, i) => (
            <section key={title}>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-500/10 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-800/50 flex items-center justify-center text-xs font-black text-brand-600 dark:text-brand-400 shrink-0">
                  {i + 1}
                </span>
                {title}
              </h2>
              <div className="pl-10 space-y-3">
                {body.map((paragraph, j) => (
                  <p key={j} className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span>Questions? Email us at <a href="mailto:privacy@snapurl.app" className="text-brand-600 dark:text-brand-400 hover:underline">privacy@snapurl.app</a></span>
          <Link href="/terms" className="text-brand-600 dark:text-brand-400 hover:underline font-medium">
            Terms of Service →
          </Link>
        </div>
      </div>
    </main>
  )
}
