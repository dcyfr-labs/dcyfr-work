# AGENTS.md - dcyfr-work

## What this is

Portal for work-focused DCYFR experiences: CLI reference, editor extensions, profiles, community links and a family health page. Production URL is https://dcyfr.work (package name `dcyfr-work-portal`, dev port 3306). It is one of seven sibling sites built from the `dcyfr-site-scaffold` contract, so layout, tooling and CI match the other `dcyfr-*` site repos.

## Stack

- Next.js `16.4.6` (pinned) with React `^19.0.0`, TypeScript `^5`
- Tailwind CSS `^4.3.3` through `@tailwindcss/postcss`; there is no Tailwind config file
- shadcn (`new-york` style) with the `@dcyfr-labs` registry (`https://registry.dcyfr.ai/r/{name}.json`, see `components.json`); `sonner` toasts
- `@vercel/analytics`, `@vercel/speed-insights`, `next-themes`. This is the only site in the family without Sentry: there is no `@sentry/nextjs` dependency and no instrumentation or Sentry config files.
- Playwright `^1.58.2`; ESLint `^9` flat config (`eslint.config.mjs`)

## Directory map

- `app/` : routes `/`, `/cli`, `/extensions`, `/health`, `/profiles`, `/community`, `/privacy`, and `GET /api/health`; `robots.ts`, `sitemap.ts`, `indexnow.txt`, `.well-known/security.txt`, icons, OG image, theme CSS files
- `app/api/health` : HEAD-requests `sitemap.xml` on the io, app, tech, codes, bot and build sites with an 8 second timeout each. Each result is `pass`, `warn` (timeout) or `fail`. The `/health` page and external uptime probes use it.
- `components/` : `ContactDialog` (mailto-based, no backend)
- `components/chrome/` : shared nav, footer, theme provider and toggle (registry-owned)
- `components/ui/` : `button`, `sheet`, `dcyfr-badge`, `dcyfr-button`, `dcyfr-card`, `dcyfr-dialog`, `dcyfr-input`, `dcyfr-label`, `dcyfr-sonner`, `dcyfr-textarea`
- `data/` : `cli-commands.json` and `extensions.json`. `/profiles` and `/community` import no data file.
- `hooks/` : `use-dropdown`, `use-media-query`; `lib/` : `types.ts`, `utils.ts`
- `e2e/` : Playwright specs (`contrast`, `snapshots`) and their README
- `eslint-local-rules/` : the five local ESLint rules; `scripts/check-theme-wiring.mjs`
- `proxy.ts` : apex to `www` redirect (Next 16 middleware)

## Scripts

- `dev` and `start` run `next dev -p 3306` and `next start -p 3306`. `build` runs `next build`, `lint` runs `eslint .`, `typecheck` runs `tsc --noEmit`.
- `test:e2e` runs every Playwright spec in `e2e/`; `test:e2e:ui` opens Playwright UI mode.
- `test:contrast` and `test:snapshots` run one spec each (`e2e/contrast.spec.ts`, `e2e/snapshots.spec.ts`) on chromium. `test:snapshots:update` and `test:snapshots:rebaseline` add `--update-snapshots` and `--update-snapshots=all`.
- `check:theme-wiring` runs `node scripts/check-theme-wiring.mjs`.

## Environment variables

There is no `.env.example`. The app reads one optional variable at runtime, plus platform and test variables.

- `INDEXNOW_KEY` : served at `/indexnow.txt`; the route returns 404 when it is unset
- `CI` : set by CI; turns on Playwright retries (2) and the GitHub reporter
- `BASE_URL`, `VERCEL_AUTOMATION_BYPASS_SECRET` : Playwright only

## Testing

- Playwright has no `webServer` block. `playwright.config.ts` reads `BASE_URL` and falls back to the production site, so start the app yourself and set `BASE_URL=http://localhost:3306` to test local changes.
- There is no smoke spec. `contrast.spec.ts` covers `/`, `/cli`, `/extensions`, `/health`, `/profiles`, `/community` and `/privacy`. `snapshots.spec.ts` covers `/` and `/cli` with a 5% `maxDiffPixelRatio`.
- Mobile snapshot baselines must be generated on x86 CI. Use the `visual-regression.yml` dispatch with `update_baselines` instead of a local run.
- There is no unit-test runner.

## CI

- `ci.yml`: `typecheck`, `lint` and `build` matrix on Node 20.
- `design-tokens.yml`: palette and primitive-color guards, identity-clobber and theme-wiring checks.
- `visual-regression.yml`: runs on Vercel preview `deployment_status` or dispatch (`base_url`, `update_baselines`); contrast spec, then snapshots (Node 22).
- `codeql.yml`, `semgrep.yml`: weekly (Monday 09:00 UTC), PRs and pushes to `main`; Semgrep needs `SEMGREP_APP_TOKEN`. The Dependabot auto-merge workflows handle dependency PRs.

The `main protection` ruleset requires the `lint`, `typecheck` and `build` checks.

## Design system rules

- Colors, spacing, radii and type come from CSS variables and the vendored `app/dcyfr-theme-*.css` and `app/dcyfr-chrome.css` files. `app/layout.tsx` sets `data-identity="slate"` on `<html>`, and `npm run check:theme-wiring` verifies that wiring.
- ESLint errors: `no-hardcoded-colors`, `no-deprecated-design-tokens`, `no-legacy-dcyfr-palette`. `no-hardcoded-spacing` and `no-hardcoded-typography` are `off` in `eslint.config.mjs`.
- Add primitives with the shadcn CLI and the `@dcyfr-labs` registry instead of writing parallel copies.

## Conventions and gotchas

- `components/chrome/` is owned by the registry bundle. Update it by re-running the registry add command instead of editing the files.
- `proxy.ts` redirects `dcyfr.work` to `www.dcyfr.work` with a 308 and security headers. It stays inert while the Vercel project-level apex redirect exists. `metadataBase` is the apex URL.
- The sibling list in `app/api/health/route.ts` is hardcoded. Update it when a site joins or leaves the family.
- A legacy `.eslintrc.json` sits next to the flat config. ESLint 9 reads `eslint.config.mjs`.
- Keep the app lightweight and follow the existing portal layout before adding abstraction layers.
