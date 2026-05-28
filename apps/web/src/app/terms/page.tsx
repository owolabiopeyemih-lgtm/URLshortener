import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service — SnapURL',
  description: 'The terms and conditions governing your use of SnapURL.',
}

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By accessing or using SnapURL ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.',
      'We reserve the right to update these terms at any time. Continued use of the Service after changes are posted constitutes your acceptance of the updated terms.',
    ],
  },
  {
    title: 'Use of the Service',
    body: [
      'SnapURL provides URL shortening, QR code generation, and link analytics. You may use the Service for lawful purposes only.',
      'You agree not to use the Service to shorten or share URLs that lead to: illegal content, malware, phishing sites, spam, hate speech, or any content that violates applicable laws.',
      'We reserve the right to disable any short link at any time without notice if we determine it violates these terms.',
    ],
  },
  {
    title: 'Accounts',
    body: [
      'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.',
      'You must provide accurate and complete information when creating an account.',
      'You may not share your account or allow others to access the Service through your credentials.',
      'We reserve the right to suspend or terminate accounts that violate these terms.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'The SnapURL name, logo, and all related content are the intellectual property of SnapURL. You may not use them without our prior written consent.',
      'You retain ownership of any content (URLs, custom aliases) you submit to the Service. By using the Service, you grant us a limited licence to store and process that content solely to operate the Service.',
    ],
  },
  {
    title: 'Prohibited Conduct',
    body: [
      'You may not attempt to reverse-engineer, scrape, or otherwise access the Service in ways not intended by these terms.',
      'You may not use automated tools to create large volumes of short links without prior written approval.',
      'You may not attempt to circumvent rate limits, access controls, or other security measures.',
    ],
  },
  {
    title: 'Disclaimers',
    body: [
      'The Service is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or free of harmful components.',
      'We are not responsible for the content of destination URLs. Users follow shortened links at their own risk.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, SnapURL shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.',
      'Our total liability to you for any claim arising from the Service shall not exceed the amount you paid us in the 12 months preceding the claim.',
    ],
  },
  {
    title: 'Termination',
    body: [
      'You may stop using the Service and delete your account at any time via the dashboard settings.',
      'We may suspend or terminate your access to the Service at any time for violations of these terms or for any other reason at our discretion.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These terms are governed by and construed in accordance with applicable law. Any disputes arising from these terms or the Service shall be resolved in the appropriate jurisdiction.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For questions about these Terms of Service, please contact us at legal@snapurl.app.',
    ],
  },
]

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-10">
          Please read these Terms of Service carefully before using SnapURL. These terms govern your access to and use of our URL shortening and analytics service.
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
          <span>Questions? Email us at <a href="mailto:legal@snapurl.app" className="text-brand-600 dark:text-brand-400 hover:underline">legal@snapurl.app</a></span>
          <Link href="/privacy" className="text-brand-600 dark:text-brand-400 hover:underline font-medium">
            ← Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  )
}
