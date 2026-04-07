# free-site-template

Static marketing site template used by the **ctrl-alt-elite** free-site package. Each client project is produced by cloning this repo (via the automation framework), populating `site.config.ts` and `content/*.md` from the client's brief, and deploying to Vercel.

If you are Claude Code iterating on a cloned copy of this template for a specific client, read `CLAUDE.md` first.

## Stack

- Next.js 15 (App Router, SSG)
- React 18
- Tailwind CSS 3.4
- Zod for config validation
- gray-matter for markdown frontmatter
- Inter + Space Grotesk via `next/font`

No database, no auth, no CMS, no server-side code. Built as a fully static site so it runs on Vercel's free tier with generous headroom.

## Local development

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000. The default config builds cleanly with placeholder content so a fresh clone is immediately viewable.

```bash
pnpm build      # production build
pnpm start      # serve the production build
pnpm typecheck  # tsc --noEmit
pnpm lint       # next lint
```

## How it's customised per client

Everything a client-specific build needs lives in two places:

1. **`site.config.ts`** - structured facts (name, tagline, goal, pages, accent colour, contact details). Validated by Zod at build time.
2. **`content/*.md`** - prose content. Frontmatter holds structured bits (hero headline, service list items), the markdown body holds free-form copy.

The default `site.config.ts` is `"Your Business"` with a neutral blue accent and all four pages enabled.

### Accent colour

`site.config.theme.accent` is a hex string. At build time, `lib/config.ts` parses it into an `rgb(r g b)` triple and injects it into `--accent` on the root element via inline style on `<html>`. Tailwind classes like `bg-accent` and `text-accent-foreground` resolve from that custom property, so changing the accent does not require a Tailwind rebuild.

The foreground colour (used for text on top of the accent) is picked automatically based on the accent's luminance, so any client-chosen colour stays readable.

### Logo

Drop a file at `public/logo.svg` and the header uses it. If the file is missing, the header falls back to the business name rendered in Space Grotesk as a wordmark. No other changes needed.

### Pages

`site.config.pages` controls which pages appear in the nav and sitemap. All four page files (`home`, `about`, `services`, `contact`) always exist in the repo even when hidden, so promoting a page later is a one-line config change.

Example - a 1-page site:

```ts
pages: ["home"],
```

About and services are still built, but neither shows in the header nav nor in `sitemap.xml`.

## Contact form

`components/ContactForm.tsx` posts directly to Web3Forms. No server-side code in this repo. Configure the access key via `NEXT_PUBLIC_CONTACT_ACCESS_KEY` (shared across all ctrl-alt-elite free-site clients) or `site.config.contact.web3formsAccessKey` for a per-client override.

If neither is set, the form renders but the submit button is disabled with a warning. That's the intended behaviour for a fresh clone.

## Environment variables

See `.env.example`. All of these are optional for a local build - the template degrades gracefully without them.

- `NEXT_PUBLIC_CONTACT_ENDPOINT` - defaults to `https://api.web3forms.com/submit`.
- `NEXT_PUBLIC_CONTACT_ACCESS_KEY` - Web3Forms access key. Set on Vercel by the automation framework.
- `NEXT_PUBLIC_SITE_URL` - canonical URL used by `sitemap.xml`, `robots.txt`, and the JSON-LD `LocalBusiness` schema.

## Repo layout

```
app/                 Next.js App Router pages + route infra
components/          Shared UI
content/             Per-page markdown with frontmatter
lib/                 Config loader, markdown reader, JSON-LD helper
public/              Static assets (logo, favicons, placeholder imagery)
site.config.ts       The contract - structured per-client data
site.config.types.ts Zod schema for site.config
CLAUDE.md            Instructions for Claude Code iterating on this repo
```

## Automation framework tie-in

This repo is the source that `ctrl-alt-elite`'s automation framework clones when a free-site brief is submitted. Two handlers touch it:

1. `github.create-repo-from-template` - creates a new repo under the `ctrl-alt-elite` org from this template.
2. `github.seed-site-config` - commits a populated `site.config.ts`, `content/home.md`, and an appended `CLAUDE.md` client section derived from the client's brief data.

After seeding, `vercel.create-project` links the new repo to a Vercel project and the first deploy is the client's preview. Do not edit this template in ways that break those handlers - specifically, keep `site.config.types.ts` and the top-level file layout stable.

## License

UNLICENSED. Proprietary to ctrl-alt-elite; used for client work under the free-site package.
