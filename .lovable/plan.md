# Plan: UX Bites section

A new content track parallel to Projects. Same MDX-driven architecture, lighter detail layout, joyful scroll-based animations. Seeded with the Joy_ buying-flow case study from the uploaded PDF.

## 1. Navigation

Add `UX Bites → /ux-bites` to `NAV_ITEMS` in `src/components/Header.tsx` (desktop + mobile blinds menu). Order: Projects, UX Bites, About, Contact.

## 2. Content model

New folder `src/content/ux-bites/<slug>/index.mdx`, mirroring the projects convention so MDX + frontmatter + co-located images work out of the box.

Frontmatter shape (lean, optimized for "hook the reader"):

```yaml
slug: "joy-buying-flow"
title: "Two Moments Worth Redesigning"
hook: "Joy_'s buying flow is polished and modern. But it misses the feeling that makes gifting feel like gifting."
product: "Joy_ · givingjoy.de"
surface: "Buying flow"
date: "2026-06-01"
readingTime: "3 min"
cover: { filename: "cover.jpg", alt: "..." }
tags: ["E-commerce", "Emotional design", "Checkout"]
findings: 2              # small numeric badge on the list card
draft: false
```

New `src/lib/uxBites.ts` mirroring `src/lib/projects.ts`: `import.meta.glob` over `../content/ux-bites/*/index.mdx`, sort by date desc, expose `visibleBites` and `getBiteBySlug`.

## 3. List page — `/ux-bites`

New `src/pages/UxBitesList.tsx`. Substack/Medium feel:

- Page header: "UX Bites" + one-line subtitle ("Small audits. Sharp observations. Joyful fixes.").
- Vertical stack of cards on top of each other, kind of like tinder cards. With arrows below to click and navigate. Also navigable using keyboard arrows keys. The card animate when next or previous is pressed.
- Each card: small product label + date, large title, the `hook` line as dek, tag chips, `↪ X findings · Y min read`, hover lifts subtly. Optional small cover thumbnail on the right at md+.
- Entire card is a `<Link to={/ux-bites/:slug}>`.

## 4. Detail page — `/ux-bites/:slug`

New `src/pages/UxBitePage.tsx`. Reuses `Layout`, `ReadingProgress`, `SEO`, `TableOfContents` from the projects page, but with a slimmer shell:

- Compact hero (no big `ProjectHero`): eyebrow (`product · surface`), large title, hook as lead, date + reading time.
- No metadata strip (overkill for bite-sized).
- Same `prose` MDX article container as `ProjectPage`, narrower (`max-w-3xl`) to feel essay-like.
- Footer: small "More UX Bites" strip linking to 2 sibling bites.

### Joyful scroll animations (the differentiator)

New `src/components/uxBites/` primitives, built on Framer Motion (already in deps) and `useInView`. All respect `useReducedMotion`:

- `<BiteSection>` — fades + slides up on enter, with a soft scale (0.98→1).
- `<Reveal>` — word- or line-level staggered reveal for hero title and section openers.
- `<BeforeAfter>` — two stacked screenshots; second one slides in with a confetti-style burst (lightweight CSS, no library) when scrolled to.
- `<PullQuote>` — large quote that gently parallaxes; subtle color wash on enter.
- `<ScrollArc>` — a small SVG arc/line at the top of the page that draws itself as the reader scrolls (mirrors the "emotional arc" diagram from the PDF).

Routes registered in `src/App.tsx`: `/ux-bites` and `/ux-bites/:slug`.

## 5. Seed content — Joy_ case study

`src/content/ux-bites/joy-buying-flow/index.mdx`. Structure follows the PDF:

1. Hook + emotional-arc diagram (rendered via `<ScrollArc>` showing current vs. proposed curve).
2. **Finding 01 — The gift vanishes after checkout**: before/after with `<BeforeAfter>`, callout "Empathy moment: step into the recipient's shoes", `<PullQuote>` with the "highest-intent moment" quote.
3. **Finding 02 — Personalization feels like paperwork**: before/after, callout on the word "optional", closing reflection on advocacy.
4. **Approach** outro — short, signature-style.

Images: copy the 5 parsed PDF pages into the bite folder as `arc.jpg`, `finding-1-before.jpg`, `finding-1-after.jpg`, `finding-2-before.jpg`, `finding-2-after.jpg`. Use page 1 as `cover.jpg`.

## 6. SEO & polish

- `<SEO>` on both pages with `type="article"` for detail.
- Single H1 per page, semantic `<article>`, alt text on every image.
- Mobile check at ~375px (single column already).
- No backend, no schema, no new deps.

## Files touched

Create:

- `src/lib/uxBites.ts`
- `src/pages/UxBitesList.tsx`
- `src/pages/UxBitePage.tsx`
- `src/components/uxBites/{BiteSection,Reveal,BeforeAfter,PullQuote,ScrollArc}.tsx`
- `src/content/ux-bites/joy-buying-flow/index.mdx` + 5 images + cover

Edit:

- `src/components/Header.tsx` — add nav item
- `src/App.tsx` — add routes
- `src/lib/projects.ts` glob is untouched; UX Bites are a separate glob

## Open question

Should UX Bites also appear as a teaser section on the homepage (e.g. below Projects: "Latest UX Bites — 3 cards"), or live only behind the nav link for now? Default in this plan: nav-only. Let me know if you want the homepage teaser too.