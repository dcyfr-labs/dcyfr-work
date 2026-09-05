import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/chrome/theme-provider';
import { SiteHeader, type HeaderNavItem } from '@/components/chrome/site-header';
import { SiteFooter, type FooterLink } from '@/components/chrome/site-footer';
import type { ChromeNavSection } from '@/components/chrome/nav-utils';
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

// The v1 nav list unchanged: five internal routes, no hash links, no external
// links, and no `/` entry to drop (home is reached through the logo, which
// SiteHeader wraps in its own link).
//
// No item carries `icon`. This file is a Server Component and SiteHeader is
// 'use client', so ChromeNavItem.icon — an ElementType — cannot cross the
// boundary.
const NAV: HeaderNavItem[] = [
  { href: '/cli', label: 'CLI Ref' },
  { href: '/extensions', label: 'Extensions' },
  { href: '/profiles', label: 'Profiles' },
  { href: '/community', label: 'Community' },
  { href: '/health', label: 'Health' },
];

// The drawer is the only place every link is reachable below `md`: the header
// link row and the footer link row are both `hidden md:flex`. Products and
// Ecosystem are the v1 footer's two columns; Legal is its legal row.
//
// `/health` is in Products here but was never in the v1 footer. It is a header
// nav link, and the header link row disappears below `md`, so the drawer is
// the only surface that can carry it.
const SECTIONS: ChromeNavSection[] = [
  {
    id: 'products',
    label: 'Products',
    items: [
      { href: '/cli', label: 'CLI Reference' },
      { href: '/extensions', label: 'Extensions' },
      { href: '/profiles', label: 'Profiles' },
      { href: '/community', label: 'Community' },
      { href: '/health', label: 'Health' },
    ],
  },
  {
    id: 'ecosystem',
    label: 'Ecosystem',
    items: [
      { href: 'https://dcyfr.io', label: 'dcyfr.io' },
      { href: 'https://dcyfr.bot', label: 'dcyfr.bot' },
    ],
  },
  {
    id: 'legal',
    label: 'Legal',
    items: [
      { href: '/privacy', label: 'Privacy' },
      { href: 'https://dcyfr.ai/terms', label: 'Terms' },
      { href: 'https://dcyfr.ai/security', label: 'Security' },
    ],
  },
];

// Flat: the v2 footer is one row beside the copyright, so the v1 footer's two
// link columns and its legal row collapse into a single list of nine. The two
// off-site entries keep their labels and lose `external`, which v2 has no
// concept of; every link now opens in the same tab.
const FOOTER: FooterLink[] = [
  { href: '/cli', label: 'CLI Reference' },
  { href: '/extensions', label: 'Extensions' },
  { href: '/profiles', label: 'Profiles' },
  { href: '/community', label: 'Community' },
  { href: 'https://dcyfr.io', label: 'dcyfr.io' },
  { href: 'https://dcyfr.bot', label: 'dcyfr.bot' },
  { href: '/privacy', label: 'Privacy' },
  { href: 'https://dcyfr.ai/terms', label: 'Terms' },
  { href: 'https://dcyfr.ai/security', label: 'Security' },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-identity selects the theme package; the .dark class (added by
    // ThemeProvider) selects the scheme. The engine's dark rules are scoped to
    // the compound [data-identity="slate"].dark, so both have to land on the
    // SAME element — moving the stamp to <body> would keep light rendering
    // correct and silently drop the whole dark scheme.
    //
    // .theme-dcyfr-work is the (now empty) site hook, kept so the scaffold
    // contract's identity-class check still has a subject and so re-branding is
    // a one-attribute change.
    <html
      lang="en"
      suppressHydrationWarning
      data-identity="slate"
      className={`theme-dcyfr-work ${inter.variable}`}
    >
      {/* Ground colors ride here now: globals.css sets none, and the PageShell
          wrapper that used to paint them is gone. `font-sans` stays off <body>
          on purpose — the engine binds body's family through --font-body, and a
          utility on the same element would win and pin the face. */}
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* focus:z-50 clears the fixed header, which is z-40. */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
          >
            Skip to content
          </a>
          <SiteHeader
            logo={DcyfrWorkLogo}
            logoAriaLabel="dcyfr.work home"
            links={NAV}
            mobileNavSections={SECTIONS}
          />
          {/* pt-18 clears the fixed h-18 header. */}
          <main id="main-content" className="flex-1 pt-18">
            {children}
          </main>
          {/* v2's SiteFooter computes `© {year} {brand}` and takes no copyright
              prop, so the v1 string "© 2027 DCYFR Labs. All rights reserved. —
              launching Q1 2027" cannot survive intact. The year becomes
              computed, and the launch quarter is DROPPED rather than relocated:
              it already appears in page copy at app/page.tsx (the hero badge
              and two card badges), app/profiles/page.tsx and
              app/community/page.tsx, so no information leaves the site. */}
          <SiteFooter brand="DCYFR" links={FOOTER} />
          {/* Stays inside the provider. DcyfrToaster reads next-themes'
              resolved theme to pick its palette; hoisting it out beside
              <Analytics /> would strand it on the "system" default and paint
              dark toasts on this site's light default. */}
          <DcyfrToaster />
          {/* BottomNav ships in the v2 block and is deliberately NOT rendered.
              dcyfr-satellite-chrome-v2 Decision 6 defers it to the satellites
              that have five primary destinations worth a fixed mobile bar; this
              site's drawer already reaches every route. */}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
