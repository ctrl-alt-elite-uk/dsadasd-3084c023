# CLAUDE.md - free-site-template

You (Claude Code) are iterating on a static marketing site for one client. This repo was cloned from `ctrl-alt-elite-uk/free-site-template` by the automation framework and is linked to a project in the ctrl-alt-elite portal.

## Repo purpose

A single-client static marketing site produced under the ctrl-alt-elite **free-site** package. Deployed on Vercel's free tier. No database, no auth, no CMS. Built with Next.js 15 App Router + Tailwind, fully statically generated.

## Where to find client context

1. `site.config.ts` - structured facts about this client (name, tagline, goal, pages, accent colour, contact details).
2. `content/*.md` - prose content (hero copy, about story, services list, contact blurb). Frontmatter holds structured bits, body holds prose.
3. `.notes/inspiration.md` - any reference URLs the client shared during the brief. Present only if the seed handler wrote one. Read-only for design cues; do not link from the site.
4. `site.config.ts` `_meta.portal_url` - link back to the client's project in the ctrl-alt-elite portal for messaging / questionnaire data.

Do **not** reach out to the ctrl-alt-elite database. This repo is standalone. Everything you need is checked in.

## What you're allowed to change

- `site.config.ts` - merge-style updates. Never wholesale overwrite `_meta`; preserve the `project_id`, `package_slug`, `seeded_at`, and `portal_url` fields verbatim.
- `content/*.md` - both frontmatter and prose. Keep frontmatter keys consistent with the types consumed in `app/**/page.tsx`.
- `app/globals.css` - custom-property values only. Do not touch the `@tailwind` layers or add global element rules beyond what's there.
- `public/` - add the client's logo as `public/logo.svg` (the header picks it up automatically), and swap placeholder imagery under `public/placeholder/`.

## What you must not change without explicit instruction

- `site.config.types.ts` - the Zod schema is the contract with the automation framework. Changing it breaks seeding.
- `components/*` structure - passing new props is fine, restructuring layout is not.
- `package.json` dependencies - no new libraries. The free tier is lean on purpose. If you think you need one, escalate.
- `CLAUDE.md` itself.
- `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` - stable infra.
- The "Powered by ctrl.alt.elite" attribution block in `components/Footer.tsx`. This link back to https://www.ctrl-alt-elite.uk/ is how the free-site package pays for itself - it drives discovery so future clients can find the service that built this site. Removing it silently breaks the terms of the free tier. You may restyle it to fit the client's palette (keep it legible, keyboard-focusable, and visually subordinate to the client's own branding) but you must not delete it, hide it with `display:none`/`aria-hidden`, move it off the footer, or change the destination URL. If a client asks for it to go, escalate via the portal (`site.config._meta.portal_url`) and wait for sign-off rather than guessing.

## Design constraints

- **Palette**: stay within `theme.accent` + slate neutrals. No rainbow, no gradients that weren't already there.
- **Fonts**: Inter for body, Space Grotesk for display headings. Both loaded via `next/font` in `app/layout.tsx`. Do not add fonts.
- **Lighthouse thresholds** (run before pushing):
  - Performance >= 90
  - Accessibility >= 95
  - SEO >= 95
  - Best practices >= 95
- **Client-side JS**: keep it minimal. No state managers, no animation libraries beyond `framer-motion` (already in deps). No analytics beyond Vercel Analytics.
- **Accessibility**: real headings, labelled form fields, visible focus rings (already set up in `globals.css`), meaningful alt text on any image you add.

## Commands

```bash
pnpm install
pnpm dev         # local dev server
pnpm build       # production build - run before pushing
pnpm lint        # next lint
pnpm typecheck   # tsc --noEmit
```

## Deploy

- Push to `main` auto-deploys to production via Vercel.
- Any other branch gets a preview deploy. Use branches for design revisions so the client can review without risking production.
- Do **not** run the `vercel` CLI. The project is managed by the automation framework.
- Environment variables (`NEXT_PUBLIC_CONTACT_ENDPOINT`, `NEXT_PUBLIC_CONTACT_ACCESS_KEY`, `NEXT_PUBLIC_SITE_URL`) are set on the Vercel project, not in this repo. `.env.example` documents them for local dev.

## Escalation

If the brief is ambiguous, or the client's request would break a constraint above, do not guess. Post a question back to the client via the portal (URL in `site.config._meta.portal_url`) and wait for an answer before committing.

## Anti-patterns (don't do these)

- Don't add a blog, a CMS, or MDX beyond what `lib/content.ts` already supports.
- Don't add auth, a database, or server actions.
- Don't add cookies that would require a consent banner.
- Don't add tracking beyond Vercel Analytics.
- Don't restructure the repo layout.
- Don't commit secrets - the shared Web3Forms key lives in Vercel env vars, not in `site.config.ts`.

## How the contact form works

`components/ContactForm.tsx` is a client component that POSTs FormData directly to Web3Forms. The access key comes from (in order):

1. `site.config.contact.web3formsAccessKey` - per-client override (rare).
2. `NEXT_PUBLIC_CONTACT_ACCESS_KEY` - shared ctrl-alt-elite key set on the Vercel project.

If neither is set, the form renders but the submit button is disabled with an inline warning. That's the correct behaviour for a fresh clone.

## Hidden pages

`site.config.pages` controls which pages appear in the nav and sitemap. All four page files (`home`, `about`, `services`, `contact`) always exist in the repo even if only a subset are linked, so promoting a hidden page later is just a one-line config change, not a rebuild. If a client starts on 1-page and upgrades to 3, you update `site.config.pages` and fill in the relevant `content/*.md` - nothing else.
