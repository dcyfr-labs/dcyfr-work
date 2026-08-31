import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What dcyfr.work collects, who processes it, and how to exercise your privacy rights.',
  openGraph: { url: 'https://dcyfr.work/privacy' },
};

const LAST_UPDATED = 'August 31, 2026';

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy at dcyfr.work</h1>
        <p className="text-sm text-muted-foreground">Last updated {LAST_UPDATED}</p>
      </header>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">What this page covers</h2>
          <p>This notice describes what <span className="font-medium text-foreground">dcyfr.work</span> collects, and who processes it on our behalf. It sits alongside the DCYFR Labs privacy policy, which governs the wider estate.</p>
          <p><a href="https://dcyfr.ai/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">Read the full DCYFR Labs privacy policy ↗</a></p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">What we collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><span className="font-medium text-foreground">Request logs</span> — IP address, user agent, and requested path, recorded by our host for security and debugging.</li>
            <li><span className="font-medium text-foreground">Aggregate analytics</span> — page views and performance timings, with no cookies and no per-person identifier.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">What we do not do</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>No advertising, retargeting, or data sales.</li>
            <li>No cross-site tracking and no behavioural profiles.</li>
            <li>No accounts, and no marketing email from this site.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Session recording</h2>
          <p>dcyfr.work does not run session replay. We do not record your screen.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Processors</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-medium text-foreground">Vercel</span> — Hosting, content delivery, and request logs (IP address, user agent, requested path). Retained about 30 days.{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">Privacy policy ↗</a>
            </li>
            <li>
              <span className="font-medium text-foreground">Vercel Analytics &amp; Speed Insights</span> — Aggregated page-view counts and Core Web Vitals. Cookieless, with no cross-site or per-person tracking.{' '}
              <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">Privacy policy ↗</a>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
          <p>If you are in the EEA, the UK, or a US state with a comprehensive privacy law, you can ask us for a copy of your data, ask us to correct or delete it, or object to processing.</p>
          <p>Write to <a href="https://dcyfr.ai/contact" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">DCYFR Labs ↗</a> and say which site you are asking about. We aim to reply within 30 days.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Children</h2>
          <p>dcyfr.work is not directed to children under 13, and we do not knowingly collect their information.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Changes</h2>
          <p>We update this notice when the services behind dcyfr.work change. The date at the top is the last revision.</p>
        </section>
      </div>
    </div>
  );
}
