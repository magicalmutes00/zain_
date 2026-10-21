# ZAIN Technical & Integrated Services LLC — Website

Production-quality corporate website for **ZAIN Technical & Integrated Services LLC**
(est. 2021, Barka, South Al Batinah, Sultanate of Oman). All company content is grounded in
`ZAIN_Company_Profile.md`. No certifications, clients, statistics, testimonials or locations were invented.

## Stack

- React 19 + Vite 8 + TypeScript
- React Router 7 (code-split routes)
- Iconly via `react-iconly` 2.2.10 (verified package; primary icon family for UI chrome) — imported **per icon module**, not from the barrel, so the bundle ships only the 13 icons actually used
- Lucide React — fallback **only** for domain semantics Iconly lacks (siren, shield, zap, wrench, CCTV, fuel)
- No animation library — the hero entrance is a single CSS `@keyframes`, and scroll reveals use `IntersectionObserver`; both respect `prefers-reduced-motion`
- Plain modern CSS (variables, Grid, Flexbox, mobile-first)
- `scripts/prerender.mjs` — dependency-free build step that bakes per-route `<head>` tags into
  `dist/<route>/index.html` (run via `npm run build:static`); its metadata comes from
  `src/data/seo.ts`, the same module the runtime uses

## Pages

| Route | Content |
|---|---|
| `/` | Hero, intro, 6 services, process, capabilities, sectors + approvals, CTA |
| `/about` | Overview, ethos, quality & safety policy, workforce, ROP certificates |
| `/services` | All 6 divisions + delivery stages |
| `/services/:slug` | Detail per division (fire-detection, fire-protection, electrical, plumbing, cctv-elv, lpg-systems) |
| `/products` | Product groups + brand partners (ownership disclaimer) |
| `/projects` | Filterable project scopes by discipline + status (see caveat below) |
| `/contact` | Quote/inquiry form + direct channels |
| `*` | 404 |

Services, products and process content are grounded in the company profile. **No client names, project
references or statistics exist in the profile**, so the Projects page presents *representative project
scopes* instead — see “Projects page & imagery” below.

## Brand assets

Official logo supplied in `src/assets/` (originals preserved, never modified):

| Original (src/assets) | Size | Use |
|---|---|---|
| `zain_logo-removebg.png` | 1080×588, transparent | source for web logo |
| `zain z logo.png` | 339×365, transparent | source for favicon/icon |
| `zain logo.png` | 2816×1536, white bg | master reference (not used in UI) |

Generated derivatives in `public/` — via `python scripts/make_brand_assets.py`, except the navbar wordmark, which is a copy of the client-supplied artwork:

- `assets/zain-logo.webp` (66 KB) + `assets/zain-logo.png` (163 KB) — footer plaque, `404.html` and the `Organization` JSON-LD `logo`, 720px wide, `object-fit: contain` (never distorted)
- `assets/zain-logo-nav.webp` — **navbar wordmark**: a copy of the client-supplied `public/assets/ZAIN LOGO.webp` (2481×532, transparent, navy artwork). It is fitted into a height-capped box (48px, 40px ≤768px, 34px ≤430px) with `object-fit: contain`, so the bar's height depends on the *box*, never on the artwork's aspect ratio.
- `assets/zain-logo-loader.webp` (24 KB) — **loader wordmark**: the client's `Untitled - 21 October 2026 at 10.44.44.png` cropped to its artwork box with the flat white keyed to alpha, 128-colour lossless WebP (see “Company logo loader”)
- `assets/zain-z-mark.png` + `favicon.ico` — favicon derived from the official Z mark
- `og-cover.png` — navy 1200×630 social card built from the official logo asset

**Palette sampled from the logo files:** navy `#0C3159`, brand blue `#196D92`, teal `#1A8E99`, orange `#F89B27` — these refine the base design tokens in `src/index.css`.

**Dark-background handling:** the logo artwork is navy-on-transparent, so the footer presents it inside a white rounded plaque (`{footer-logo-plaque}`) to preserve legibility without recoloring, redrawing or cropping the mark.

Regenerate derivatives after replacing an original: `python scripts/make_brand_assets.py`.

## Floating navbar (glass pill + hero overlay)

The header is a sticky wrapper (`.site-header`, transparent) that holds two glass surfaces — the navy
utility strip and the floating pill. The knobs:

| What | Where | Current value |
|---|---|---|
| Pill shape / height | `.navbar` + `.brand img` in `src/index.css` | `border-radius: 999px` (semicircular caps), height driven by the logo box: 48 / 40 / 34px → 63px pill (59px ≤430px, where the 44px toggle drives it) |
- `glass` (the blur + rim + shadows) lives on `.navbar`, not the wrapper, so the bar can float as a capsule; `.topbar` is a separate dark-glass strip.
- **Transparency** is the pane gradient pair only: `rgba(255,255,255,.16→0)` sheen + `0.2→0.07` pane, and `0.2→0` + `0.4→0.18` once scrolled (`.site-header.is-scrolled .navbar`). Lower all four to make the bar more see-through; the size and shape are untouched by them.
- `@supports` blocks hold the `-webkit-` prefixed `backdrop-filter` (Safari <18) — keep them separate from the standard property: written together, the production minifier collapses the pair and drops the standard `backdrop-filter`, leaving Chromium and Firefox with no blur.
- **Hero overlay:** `--nav-overlay` (86px; 82px ≤430px) is exactly the navbar's block height. `.hero` and `.page-hero` use `box-sizing: content-box` + `padding-top: var(--nav-overlay)` + an equal negative `margin-top`, so a page's top band starts under the utility bar and its gradient runs up behind the floating pill **while the hero's content box — and every element inside it — stays put**. Change the pill's height or the `.navbar` margins and `--nav-overlay` must be updated to match (it is defined in `:root` and overridden in the `max-width: 430px` block).
- **Hover / current page:** the desktop links are chips inside the capsule (`.nav-links > li > a`), child-scoped so the dropdown's own links keep their softer variant. Hover = navy-tinted frosted chip + 1px lift + brand-blue label; the current page adds a stronger fill and a teal→blue bar (`::after`, grown with `scaleX` — the Services button carries the same class whenever the route is under `/services`). The tint is navy, not white, because the capsule is translucent over the hero and whiter once scrolled: a white chip would vanish there. No state changes padding or font, so hovering can never reflow the row.
- **Hero band height:** the band hugs its content — no `aspect-ratio` — so its height is the copy (plus the overlay) plus the `.hero-grid` padding. The narrower-width rules under “Hero content on smaller screens" trim content for compactness, not to fit a fixed height. Restore a `16:9` band by adding `aspect-ratio: 16 / 9` to `.hero` and `align-items: center` back to `.hero-grid`.

## Company logo loader

Every hard load opens with a branded loading overlay: the official ZAIN wordmark
(`/assets/zain-logo-loader.webp`) on the site's pale surface (`#eef3f9 → #fff`) with a brand-blue sweep bar
on a navy-tint track. It is entirely static — no React component, no library.

The loader mark is **derived from the client's own file** `public/assets/Untitled - 21 October 2026 at
10.44.44.png` — a 1920×1080 white-canvas render of the same lockup the navbar uses (verified identical:
tight aspect 4.469 = 4.469, ink-coverage grids matching cell-for-cell). It is cropped to the artwork box,
the flat white is keyed to alpha (round-trip error 0.17/255 — invisible on the pale gradient) and encoded
as a 128-colour lossless WebP: **24 KB** instead of the 206 KB PNG, mean colour error 0.76/255. The
client's PNG stays untouched in `public/assets/` as the master.

| What | Where | Value |
|---|---|---|
| Markup + styles + dismiss script | `index.html` | inline `<style>` in `<head>`, overlay before `<div id="root">`, script at the end of `<body>` |
| Wordmark size | `#zain-preloader img` in the inline `<style>` | `min(420px, 72vw)` — the 4.47:1 lockup renders 420 × 94 px on desktop, ~260 × 58 px at a 360 px viewport |
| Minimum on-screen time | `MIN` in the inline script | `1500` ms — a deliberate branded splash: the wordmark is readable, not a flicker |
| Hard cap | `MAX` | `5000` ms (a stalled page can never keep the overlay up) |
| Fade | `FADE` + `#zain-preloader[data-out]` | `400` ms, then the element is **removed from the DOM** |

Why it lives in `index.html`:

- The prerender (`scripts/prerender.mjs`) is string-based — it copies the built body verbatim into all
  12 `dist/<route>/index.html` files — so markup placed here ships on every hard load, and the inline
  `<style>` paints on the **first frame**, before the stylesheet or the app bundle has arrived. That is
  the whole point of a loader; a React component would only appear after JS parses.
- It sits **outside `#root`**, so React never mounts, re-renders or removes it, and SPA route changes
  do not re-show it.
- Dismissal is tied to reality, not a guess: `window.load` (every resource the document depends on has
  arrived) **or** the 5-second cap, whichever comes first — and never before the 1.5-second floor, so the
  wordmark gets a deliberate moment on screen. The element is then removed outright rather
  than hidden, so it can never intercept a click or linger in the accessibility tree.
- Accessibility: the overlay is `aria-hidden="true"` with a decorative `alt=""` logo (screen readers
  reach the page content underneath immediately), `prefers-reduced-motion` skips the fade and the sweep,
  and `@media print` hides it.

Deployment note: if a strict `Content-Security-Policy` is ever introduced, the loader's inline `<style>`
and `<script>` need `'unsafe-inline'` (or hashes/nonces). No CSP is configured today.

## Projects page & imagery

`/projects` is a filterable view (status tabs + discipline chips, with an empty state) driven by the
`PROJECTS` array in `src/data/content.ts`.

**These entries are illustrative placeholders, not a verified reference list.** Because the company
profile names no clients or projects:

- no client or organisation is ever named — each card shows a **facility type** (e.g. “Logistics
  warehouse”) with a discipline, broad governorate, year, status and scope;
- **no statistics** (“200+ projects”, “50+ clients”, etc.) appear anywhere on the site;
- the on-page copy states these are representative scopes.

Before launch, replace `location`, `year` and `status` in `PROJECTS` with confirmed details, or delete
entries the company cannot evidence. To drop the page entirely, remove `src/pages/Projects.tsx` and its
route, nav, footer and sitemap entries.

Card imagery lives in `public/images/` (9 photos, ~724 KB total, all `loading="lazy"`). Cards reserve a
fixed **4:3** media box so nothing shifts while a photo loads; the image is absolutely positioned inside
it and `object-fit: cover` crops to fill, so cards stay a uniform height regardless of whether the source
photo is landscape or portrait. Filenames were normalised to neutral slugs
(`fire-pump-installation-control-panel.webp`, `institutional-building.webp`, …).
**Confirm each photo is the company’s own or properly licensed, and that it matches the scope shown,
before publishing.**

## SEO & metadata

Route metadata lives in **one** place — `src/data/seo.ts` — and is consumed twice, so there is no
second copy of any title or description to drift out of sync:

1. **At runtime** by `src/layouts/SiteLayout.tsx`, which updates the tags on client-side navigation.
2. **At build time** by `scripts/prerender.mjs`, which bakes the same values into static per-route HTML.

The behaviour itself (no helmet dependency):

- Per-route `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:url` and `<link rel="canonical">`.
- Service detail pages derive their title/description from the service record — no pathname fallbacks.
- Unknown routes render the 404 page with `<meta name="robots" content="noindex, follow">` and **no** canonical, so soft-404s are not indexed.
- Indexable routes set `robots: index, follow`. Domain constant lives at the top of `src/data/seo.ts` (`SITE_URL`) and must match `index.html`, `public/sitemap.xml` and `public/robots.txt`.
- `index.html` carries truthful `Organization` JSON-LD built only from profile facts (name, founding year, phones, email, address, service area) — **no** ratings, reviews, awards or client counts.

### Prerendered HTML — social scrapers & non-JS crawlers

This is a client-rendered SPA, so the raw HTML that ships after `vite build` carries the homepage's
tags for every URL. Search engines that run JavaScript (Google) see the correct per-route tags, but
**social scrapers (LinkedIn, Slack, X, WhatsApp, Facebook) and crawlers that do not execute
JavaScript do not**. `scripts/prerender.mjs` closes that gap by writing one static
`dist/<route>/index.html` per route — 12 files: `/`, `/about`, `/services`, `/products`, `/projects`,
`/contact` and the six `/services/<slug>` pages — each with the correct `<title>`, description,
canonical, `og:*` and `robots` already in the served source.

- **Dependency-free and single-sourced**: it imports `src/data/seo.ts` directly (Node ≥ 22.18 strips
  the TypeScript types) and rewrites only the `<!-- seo:start --> … <!-- seo:end -->` block of the
  built `index.html`. Nothing is duplicated by hand.
- **Run via** `npm run build:static` (= `npm run build && npm run prerender`), which is what the
  committed Netlify and Vercel configs use. `npm run build` on its own still yields a working SPA —
  it simply keeps homepage-only metadata in the source HTML (React then sets the real values).
- **Requires a host that resolves directory indexes** (`/about` → `/about/index.html`), which
  Netlify, Cloudflare Pages, Vercel, nginx and Apache all do. The catch-all rewrite stays in place
  and only catches paths that have no file (a typo), which React Router renders as "Page not found".
- Only the `<head>` is baked in; the page body is still rendered by React. That is sufficient for
  social unfurlers and non-JS crawlers, which read tags rather than markup. No `<noscript>` body is
  injected, because React clears `#root` on mount.
- `npm run seo:template` regenerates the block in the source `index.html` from `src/data/seo.ts` —
  use it if you edit that head by hand, and keep both markers in place.

## Verified behaviour

`npm run build` → ~97 kB gzip main chunk (from ~212 kB before the icon/animation work); no chunk-size warnings.
Fonts are self-hosted via `@fontsource` (Inter + Sora) — no third-party font CDN, no render-blocking `@import`.

An automated headless-Chromium audit covers every route × viewport 360/390/768/1024/1440/1920 and reports
**0 problems** for: console errors/warnings, failed requests, horizontal overflow, heading hierarchy,
image `alt`, dead/anonymous links, duplicate ids, touch-target sizes, pixel-sampled text contrast (WCAG AA),
titles/descriptions/canonical/robots, plus keyboard flows (skip link, services dropdown, mobile menu,
form validation, Projects filters and the mailto fallback).

Additionally verified: **axe-core** (WCAG 2.0/2.1 A + AA + best-practice) reports **0 violations** across
every route at 390/768/1440 px; a **Firefox + WebKit** pass reports 0 problems (console/page errors, failed
requests, overflow, heading count, broken images); and the Projects page was checked for filter/empty-state
behaviour, lazy images, heading order and valid JSON-LD.

Prerendering was verified separately against a static host that resolves directory indexes:
all 12 `dist/<route>/index.html` files carry the right per-route `<title>`, canonical and `og:url`
in the **pre-JavaScript** source, the SPA boots from them, titles/canonicals stay correct after
hydration, and the pass reports **0 problems** (no console/page errors, one `<h1>` per page).

The company logo loader was verified separately: it is present in all 12 prerendered files (outside
`#root`, outside the `seo:start/end` block), appears on first parse, covers the viewport, decodes the
real artwork, and is removed from the DOM 2.0–2.3 s after navigation (1.5 s floor, 5 s cap) — with no
horizontal overflow, no console errors, no re-show on SPA navigation, instant removal under
`prefers-reduced-motion`, and no interference with any of the audits above (the pixel-contrast pass
waits for the overlay to leave the DOM: text it covers is occluded, not perceivable, and therefore not
a contrast failure).

## Develop

```powershell
cd D:\Projects\zain
npm install
npm run dev           # http://localhost:5173
npm run lint          # oxlint
npm run build         # tsc -b && vite build → dist/ (SPA shell only)
npm run prerender     # add per-route static HTML to dist/ (run after build; Node ≥ 22.18)
npm run build:static  # build + prerender in one go — what the deploy configs run
npm run seo:template  # regenerate index.html <head> from src/data/seo.ts (edit-then-commit)
npm run preview       # serve dist/ locally
```

`npm run preview` (sirv) always serves `dist/index.html` as the fallback, so it does **not**
demonstrate the prerendered per-route files — that is a local-preview quirk only. Verify
prerendering the way a real host behaves, or just trust the deploy configs above.

## Deploy

Static output in `dist/`, produced by **`npm run build:static`** (`tsc -b && vite build && node
scripts/prerender.mjs`). That yields a static HTML file for each of the 12 indexable routes plus the
hashed assets, and — because this is still a single-page app — the host should fall back to
`index.html` for anything else. The committed configs set this fallback up automatically; it now
only matters for paths that do not exist (a typo), since every real route has its own file.

Config is committed for the common hosts — no manual setup needed:

| Host | File | What it does |
|---|---|---|
| Netlify | `netlify.toml` | `npm run build:static`, `/* → /index.html 200`, cache + security headers |
| Cloudflare Pages | `public/_redirects` | `/* → /index.html 200` (build command: `npm run build:static`) |
| Vercel | `vercel.json` | `npm run build:static`, `rewrites` + cache + security headers |

Netlify, Cloudflare Pages and Vercel all serve a prerendered `dist/<route>/index.html` in preference
to a rewrite, so `/about` and `/services/fire-detection` return the correct title and OG tags in the
raw source. Other hosts:

- **nginx**: `try_files $uri $uri/ /index.html;` inside the `location /` block
  (the `$uri/` part is what lets nginx resolve `about/index.html` for `/about`)
- **Apache**: `DirectoryIndex index.html` plus a rule rewriting non-file requests to `index.html`
  (`.htaccess` `RewriteRule`)
- **GitHub Pages / S3 or buckets without routing**: a branded static `public/404.html`
  is included as a fallback, but it cannot boot the SPA — prefer a host that supports rewrites.

Headers set by the configs: hashed `/assets/*` and `/images/*` cached `immutable` for a year,
`index.html` revalidated (`no-cache`) so deploys go live immediately.

Set the production domain, then confirm `src/data/seo.ts` `SITE_URL`, `index.html` canonical and
`public/sitemap.xml` hosts match.

## Contact form integration boundary

The form validates client-side (name, email, phone, service, 20+ char scope) with accessible errors,
loading/success/failure states and no trackers.

- **No endpoint configured** → submit opens the visitor's mail client addressed to
  `info@zaintechoman.com` with the inquiry prefilled (truthful fallback — never a fake "sent" state).
- **Direct delivery** → set one env var (see `.env.example`) and implement the matching receiver in
  `src/utils/submitInquiry.ts`:
  - `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxx`, or
  - `VITE_INQUIRY_ENDPOINT=https://your-api.example.com/api/inquiries`
- Never put private keys in `VITE_*` vars — they ship to the browser. Proxy via your own server.

### Endpoint contract

When an endpoint is configured, submit sends:

```http
POST <endpoint>
Content-Type: application/json
```

```json
{ "name": "…", "company": "…", "email": "…", "phone": "…",
  "service": "Fire Detection & Fire Protection", "message": "…",
  "source": "zaintechoman.com contact form", "page": "https://…" }
```

- Any non-2xx response shows a **truthful error** ("Delivery failed…") with the phone number and email
  as fallback — the form never reports success unless the request actually succeeded.
- If the receiver is on a different origin, it must allow the site origin via CORS
  (`Access-Control-Allow-Origin`) and answer the `OPTIONS` preflight — the JSON content type triggers one.

Both paths were verified end-to-end (a real POST was received on success; a forced `500` produced the
error state, not a fake success).

## Still needed from the client

1. Confirmation of the two extra emails on profile record (`zainprojectsoman@`, `zaintechnicaloman@`) — currently listed as secondary only.
2. Production domain (canonical + sitemap hostnames — `SITE_URL` in `src/data/seo.ts`, `index.html`, `public/sitemap.xml`, `public/robots.txt`).
3. Formspree endpoint or API/CRM webhook for direct inquiry delivery.
4. **Project references to replace the `/projects` placeholders** — confirmed facility names/locations, dates, outcomes, and photographs the company owns or has licensed (the current entries are illustrative only).
5. Business hours + social profiles, if any (omitted — none in profile).
6. Whether the individual names on the ROP Civil Defence certificates (approving officer and named engineers) may be published on the public site. They are reproduced verbatim from the profile today; remove them from `CERTIFICATES` in `src/data/content.ts` if the client prefers not to publish personal names.
