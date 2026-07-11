# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page marketing site for **Arzu Duman**, an Uzman Klinik Psikolog (clinical psychologist) in Samsun, Turkey. Static Astro 7 site, no backend. The entire UI, comments, and commit history are in **Turkish** — keep that convention (comments and commit messages in Turkish).

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build → dist/ (also generates sitemap)
npm run preview    # serve the built dist/ locally
npm run check      # astro check (type/diagnostics)

node scripts/generate-portrait.mjs   # regenerate cropped portrait/hero from public/images/arzu.jpg
node scripts/generate-og.mjs         # regenerate public/images/og.png (OG card)
```

There is no test suite and no linter beyond `astro check`.

## Architecture

**Content is fully data-driven from one file.** `src/data/content.json` is the single source of truth for all copy, contact info, nav, FAQ, booking labels, SEO fields, and the KVKK/privacy text. `src/pages/index.astro` imports it and passes slices as props to each section component — components hold layout/markup, `content.json` holds words. To change any text, edit `content.json`, not the components.

**Page structure:**
- `src/pages/index.astro` — the whole one-page site; composes section components in order (Nav → Hero → Manifesto → About → Specialties → BreathInterlude → Process → Booking → Faq → Footer → Reveal).
- `src/pages/gizlilik.astro` — KVKK/privacy page (rendered from `content.privacy`).
- `src/pages/404.astro`.
- `src/components/Testimonials.astro` exists but is **not** wired into `index.astro`; the `testimonials` block in `content.json` is placeholder/example data. Don't surface it as real without real client feedback.

**`src/layouts/BaseLayout.astro` owns all SEO.** It builds the `<head>` meta/OG/Twitter tags and a single JSON-LD `@graph` (WebSite + `[Psychologist, LocalBusiness]` + Person + FAQPage) entirely from `content.json`. Notable logic:
- Placeholder phone numbers (six-plus repeated zeros) are stripped from structured data; only real numbers become `telephone`.
- `sameAs` is assembled from the Instagram handle plus `seo.sameAs`.
- Geo/region meta emitted only when `seo.geo` is present.
- `noindex` prop switches robots to `noindex, follow` (used by privacy/404).

**Location rule (baked into the schema and copy):** face-to-face therapy = **Samsun** (modeled as City/AdministrativeArea + `inPersonArea`), online therapy = **all of Türkiye** (modeled as Country). `areaServed` entries matching `/türkiye|turkey/i` render as `Country`, everything else as `AdministrativeArea`. Preserve this distinction whenever editing services, `areaServed`, or copy.

**Interactions live in one global script: `src/components/Reveal.astro`.** It is included once at the bottom of `index.astro` and drives everything via `data-*` hooks so components stay markup-only:
- `[data-reveal]` (+ `data-reveal-delay`) — fade/slide-in on scroll
- `[data-grow]` — scaleY grow-in
- `[data-glow]` — toggles `is-glowing` while in view
- `[data-progress]` — top scroll progress bar; `[data-nav]` — shrinks nav after 40px
- `[data-hero]`/`[data-spotlight]` — pointer spotlight; `[data-breath]` — cycling breath words
- `[data-side-index]` / `[data-index-section]` — active section highlighting

All effects respect `prefers-reduced-motion` and use an IntersectionObserver **plus a scroll-sweep fallback** (belt-and-suspenders so reveals don't get stuck hidden). Add new scroll behaviors here rather than per-component scripts.

**Styling:** one global stylesheet `src/styles/global.css` with a CSS-custom-property design system (paper/ink/sage/amber palette, `--serif` Cormorant Garamond, `--sans` Manrope). Fonts are **self-hosted** via `@fontsource-variable/*` (imported and preloaded in BaseLayout) — no external Google Fonts request (FOUT-free and privacy-friendly).

## Gotchas

- **`astro.config.mjs` pins `vite.build.cssTarget` to old browsers on purpose.** This stops esbuild from minifying media queries into modern range syntax (`@media (width <= 880px)`), which only Safari 16.4+ understands. Without it, in-app WebViews (WhatsApp/Instagram browsers) and older iOS Safari ignore all mobile media queries and the page renders desktop-broken on mobile. Do not remove or "modernize" this.
- **The canonical domain lives in two places that must stay in sync:** `astro.config.mjs` → `site` and `content.json` → `site.url`. Sitemap, canonical, and absolute OG URLs derive from these.
- **Regenerating images requires updating crop coordinates.** When the source photo `public/images/arzu.jpg` changes, the hard-coded crop regions in `scripts/generate-portrait.mjs` (and the circle geometry in `scripts/generate-og.mjs`, which must match `public/images/og.svg`) generally need to be re-tuned to the new face position before rerunning the scripts.
- **`SEO-YAPILACAKLAR.md`** is the post-launch SEO/marketing checklist (Google Business Profile, Search Console, directories, ads). Still-pending in-code data: real `seo.streetAddress`/`postalCode` and exact `seo.geo` coordinates in `content.json` (currently blank/approximate).
