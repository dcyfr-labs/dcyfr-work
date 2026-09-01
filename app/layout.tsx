import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import { PageShell, SiteNav, SiteFooter } from '@/components/chrome';
import { DcyfrToaster } from '@/components/ui/dcyfr-sonner';
import './globals.css';

// Named for the face, not the role. The theme engine binds <body> and headings
// to --font-body / --font-display, and the theme resolves each through a
// --font-<role>-loaded hook; globals.css points those hooks and the `font-sans`
// utility at this one variable. Naming it for the face means three roles can
// share it without any Tailwind theme key pointing at another, and swapping
// Inter out later is a one-line change here.
//
// The role name was also unavailable: v4 emits its theme keys as real custom
// properties, so a next/font variable called `--font-sans` collides with the
// theme's own --font-sans, and `--font-sans: var(--font-sans)` self-references.
//
// `display: 'swap'` was missing. Without it the browser blocks on the webfont
// for up to three seconds and renders nothing; with it the fallback paints
// immediately and Inter swaps in. That was survivable while the face reached no
// element, which was the state of this site until the v4 commit before this
// one. It is not survivable now.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DCYFR Work — Developer Tools & Identity',
    template: '%s | dcyfr.work',
  },
  description:
    'CLI reference, VS Code extensions, developer profiles, and workspace health tooling for the DCYFR ecosystem.',
  metadataBase: new URL('https://dcyfr.work'),
  openGraph: {
    siteName: 'dcyfr.work',
    type: 'website',
    url: 'https://dcyfr.work',
  },
};

// The two glyphs were `text-accent`, which under the identity block resolved to
// the gold 43 96% 56%. Under the contract `accent` is a surface tint — near
// white in light, near background in dark — so leaving them would have painted
// the wordmark invisible on its own nav. Brand color lives on the
// accent-400..700 ramp now, and 600 is what dcyfr.build's wordmark uses.
const DcyfrWorkLogo = (
  <span className="inline-flex items-center gap-2 text-lg font-bold tracking-tight">
    <span className="text-accent-600">⬡</span>
    <span>
      dcyfr<span className="text-accent-600">.work</span>
    </span>
  </span>
);

const NAV_LINKS = [
  { href: '/cli', label: 'CLI Ref' },
  { href: '/extensions', label: 'Extensions' },
  { href: '/profiles', label: 'Profiles' },
  { href: '/community', label: 'Community' },
  { href: '/health', label: 'Health' },
];

const FOOTER_COLUMNS = [
  {
    title: 'Products',
    links: [
      { href: '/cli', label: 'CLI Reference' },
      { href: '/extensions', label: 'Extensions' },
      { href: '/profiles', label: 'Profiles' },
      { href: '/community', label: 'Community' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { href: 'https://dcyfr.io', label: 'dcyfr.io', external: true },
      { href: 'https://dcyfr.bot', label: 'dcyfr.bot', external: true },
    ],
  },
];

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy' },
  { href: 'https://dcyfr.ai/terms', label: 'Terms', external: true },
  { href: 'https://dcyfr.ai/security', label: 'Security', external: true },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-identity selects the theme package; the .theme-dcyfr-work class is
    // the (now empty) site hook, kept so the scaffold contract's identity-class
    // check still has a subject and so re-branding is a one-attribute change.
    // `font-sans` comes off <body>: the engine binds body's family through
    // --font-body, and a utility on the same element would win and pin the face
    // to whatever the Tailwind key happens to say, breaking the theme's ability
    // to supply one.
    <html
      lang="en"
      suppressHydrationWarning
      data-identity="slate"
      className={`${inter.variable} theme-dcyfr-work`}
    >
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PageShell
            nav={<SiteNav logo={DcyfrWorkLogo} links={NAV_LINKS} />}
            footer={
              <SiteFooter
                brand={{
                  name: 'dcyfr.work',
                  tagline: 'Developer Tools & Identity Layer',
                }}
                columns={FOOTER_COLUMNS}
                legal={LEGAL_LINKS}
                copyright="© 2027 DCYFR Labs. All rights reserved. — launching Q1 2027"
              />
            }
            padding="none"
            maxWidth="full"
          >
            {children}
          </PageShell>
          <DcyfrToaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
