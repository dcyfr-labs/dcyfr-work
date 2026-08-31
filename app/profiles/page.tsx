import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Profiles',
  description: 'Create your DCYFR developer profile, earn practitioner badges, and connect with employers. Launching Q1 2027.',
  openGraph: { url: 'https://dcyfr.work/profiles' },
};

// BADGES — each row is a practitioner award with a distinct color identity.
// 3 map cleanly to semantic tokens (Agent→primary, Infrastructure→success,
// Core Contributor→warning). The other 3 (RAG=violet, Code Gen=cyan,
// Early Adopter=rose) are deliberate carveouts — award palettes benefit
// from 6 unique hues that no subset of the identity semantic tokens can
// provide. See openspec/changes/archive/2026-04-19-dcyfr-build-work-hardcoded-colors §3.2.
// Lint exception recorded in the archived openspec change.
//
// The six hues are unchanged; only their lightness is. Every card previously
// paired a light text shade with a dark ground (`text-violet-300` on
// `bg-violet-950/40`), which reads in dark mode and composites to 1.3:1 over a
// white page — invisible. `--success` and `--warning` are mid-tone fills that
// are unreadable as text on any light ground at all, whatever the tint under
// them, so the three token-backed rows pair the *-foreground end of the hue for
// light with the fill token for dark. Each card pins its ground at /10 and
// picks the text shade per scheme. Worst measured row is 4.89 light (Code Gen)
// and 5.95 dark (Agent), so every row clears AA at text-xs.
//
// no-hardcoded-colors does not fire here: it only inspects className string
// literals, and these live in an object property. The violet/cyan/rose rows are
// the documented carveouts, but treat the silence as a rule blind spot rather
// than as approval — anything added here is unchecked.
const BADGES = [
  {
    name: 'Agent Practitioner',
    description: 'Completed 10+ agent delegation workflows using @dcyfr/ai.',
    icon: '⬡',
    color: 'border-primary/40 bg-primary/10 text-primary',
  },
  {
    name: 'RAG Expert',
    description: 'Built and deployed a production RAG pipeline with the rag-pipeline-basic pattern.',
    icon: '◈',
    color: 'border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300',
  },
  {
    name: 'Code Gen Pioneer',
    description: 'Used the code-gen-basic snippet in a published project.',
    icon: '>_',
    color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
  },
  {
    name: 'Infrastructure Specialist',
    description: 'Deployed an AI-native service using a dcyfr.build template.',
    icon: '▣',
    color: 'border-success/40 bg-success/10 text-success-foreground dark:text-success',
  },
  {
    name: 'Core Contributor',
    description: 'Merged 3+ pull requests into a DCYFR open-source repository.',
    icon: '✦',
    color: 'border-warning/40 bg-warning/10 text-warning-foreground dark:text-warning',
  },
  {
    name: 'Early Adopter',
    description: 'Created a developer profile during the Q1 2027 launch window.',
    icon: '◎',
    color: 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  },
];

export default function ProfilesPage() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Coming soon banner */}
        <div className="rounded-xl border border-primary/40 bg-primary/40 px-5 py-4 flex items-center gap-3 mb-10">
          <span className="text-primary/70 text-xl">◎</span>
          <div>
            <p className="font-semibold text-primary/50">Launching Q1 2027</p>
            <p className="text-sm text-primary/70">Developer profiles are in development. Full GitHub OAuth + badge system coming in Phase 4.</p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Developer Profiles</h1>
          <p className="text-lg text-muted-foreground/80">
            Your DCYFR identity layer. Sign in with GitHub to create a profile, showcase projects
            built with DCYFR tools, earn practitioner badges, and connect with employers hiring
            for AI-native engineering roles.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {[
            {
              icon: '⬡',
              title: 'GitHub OAuth Login',
              description: 'Sign in with your GitHub account. Profile auto-populates from your GitHub bio and avatar.',
            },
            {
              icon: '◈',
              title: 'Project Showcase',
              description: 'List public projects that use DCYFR tools. Link to GitHub repos, deployed sites, and npm packages.',
            },
            {
              icon: '✦',
              title: 'Practitioner Badges',
              description: 'Earn verifiable badges by demonstrating DCYFR tool mastery through published projects and contributions.',
            },
            {
              icon: '▣',
              title: 'Contributor Leaderboard',
              description: 'Rank among top DCYFR contributors by badge count, project impact, and community engagement.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border/40 bg-card/40 p-5"
            >
              <div className="text-2xl text-primary/70 font-mono mb-3">{f.icon}</div>
              <h2 className="font-semibold text-muted-foreground/60 mb-2">{f.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Badge showcase */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-6">Practitioner Badges</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BADGES.map((badge) => (
              <div
                key={badge.name}
                className={`rounded-xl border p-4 ${badge.color}`}
              >
                <div className="text-2xl font-mono mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-sm mb-1.5">{badge.name}</h3>
                {/* No opacity here: at text-xs a 0.7 multiplier drops the
                    lower-contrast hues (cyan, warning) under AA on the light
                    ground. Hierarchy comes from size and weight instead. */}
                <p className="text-xs leading-relaxed">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="rounded-xl border border-border/40 bg-card/40 p-5">
          <h2 className="font-semibold text-foreground mb-2">Privacy First</h2>
          <p className="text-sm text-muted-foreground">
            Profiles are public by default but can be set to private. We only store your GitHub
            username, display name, and bio — no email, no private repo data. Delete your profile
            at any time from your settings.
          </p>
        </div>
      </div>
    </div>
  );
}
