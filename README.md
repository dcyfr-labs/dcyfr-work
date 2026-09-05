# dcyfr-work

Developer and community portal for the DCYFR ecosystem — CLI docs, editor extensions, community, and profiles — live at **[dcyfr.work](https://dcyfr.work)**.

`dcyfr-work-portal` is a Next.js 16 / React 19 portal for work-focused DCYFR experiences: where developers go for the DCYFR CLI, editor extensions, community links, and profiles. It also hosts the ecosystem-wide health check — `/health` and `GET /api/health` probe every sibling site's availability. It is part of the dcyfr-labs site family alongside [dcyfr-io](https://github.com/dcyfr-labs/dcyfr-io), [dcyfr-app](https://github.com/dcyfr-labs/dcyfr-app), [dcyfr-bot](https://github.com/dcyfr-labs/dcyfr-bot), [dcyfr-build](https://github.com/dcyfr-labs/dcyfr-build), [dcyfr-codes](https://github.com/dcyfr-labs/dcyfr-codes), and [dcyfr-tech](https://github.com/dcyfr-labs/dcyfr-tech).

## Stack

- Next.js 16 (App Router) / React 19 / Tailwind CSS
- shadcn primitives from the `@dcyfr-labs` registry (`registry.dcyfr.ai`); registry chrome v2 (site header, mobile drawer, bottom nav, footer, theme toggle/provider) in `components/chrome/`, plus sonner toasts
- Playwright for e2e and visual-regression snapshots ([`e2e/`](e2e/README.md))

## Development

```sh
npm install
npm run dev        # http://localhost:3306
```

| Command | What it does |
|---|---|
| `npm run dev` / `npm run start` | Dev / production server on port **3306** |
| `npm run build` | Production build |
| `npm run lint` / `npm run typecheck` | ESLint / `tsc --noEmit` |
| `npm run test:e2e` (`:ui`) | Playwright e2e suite |
| `npm run test:snapshots` (`:update`) | Visual-regression snapshots (chromium) |

## Routes

- `/` — portal landing page
- `/cli` — DCYFR CLI documentation
- `/extensions` — editor extensions
- `/community` — community links
- `/profiles` — developer profiles
- `/health` — ecosystem status page
- `GET /api/health` — JSON health check that HEAD-requests `sitemap.xml` on all six sibling sites (io/app/tech/codes/bot/build, 8s timeout each). **Usable as an uptime probe** for the whole family — point external monitoring at `https://dcyfr.work/api/health`.

## Environment variables

**None required.** No runtime secrets and no server-side integrations beyond the outbound health checks. Note that unlike some siblings (app/io/tech/codes) there is no Sentry instrumentation here — flagged in the 2026-07-11 audit as intentional-or-gap.

## Design-token & scaffold contract

This site follows the `dcyfr-site-scaffold` contract: colors, spacing, radii, and typography resolve via CSS variables — no hardcoded design tokens. This repo pioneered the identity font-parity and primitive-color backstop gates now shared across the family. Local ESLint rules in `eslint-local-rules/` enforce the contract and the `design-tokens.yml` workflow gates every PR. From the workspace root, `npm run audit:sites` checks scaffold compliance across the site family.

## CI

- `ci.yml` — lint, typecheck, build
- `codeql.yml` / `semgrep.yml` — static security analysis
- `design-tokens.yml` — design-token + scaffold gate
- `visual-regression.yml` — Playwright snapshots
- `dependabot-auto-merge.yml` — dependency hygiene

## Deployment

Deployed on Vercel from `main`, with hardened security headers via `vercel.json`.

## Further docs

- [`AGENTS.md`](AGENTS.md) — agent conventions and project structure
- [`e2e/README.md`](e2e/README.md) — test suite notes
