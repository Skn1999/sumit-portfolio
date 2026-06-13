# UX Bites — polish pass + second case study

## 1. Fix whitespace on individual bite page (`UxBitePage.tsx`)
Current issues:
- The hero header uses `max-w-3xl` but lives in a `container` with no `max-w-` cap, so on wide screens it floats left of a wide empty band.
- Section gaps (`my-16 md:my-24` in `BiteSection`) compound with `prose` paragraph spacing, producing big vertical gulps.
- The MDX H2s use raw `<h2 className="...">` instead of prose-styled headings, breaking the rhythm.

Fixes:
- Wrap hero + body in a shared `max-w-3xl mx-auto` shell (single column, properly centered).
- Tighten `BiteSection` vertical spacing from `my-16 md:my-24` → `my-10 md:my-16`.
- Reduce hero top/bottom padding (`pt-12 md:pt-20 pb-8 md:pb-12` → `pt-10 md:pt-16 pb-6 md:pb-8`).
- Constrain the `BeforeAfter`, `ScrollArc`, and `PullQuote` blocks so they breathe inside the column instead of relying on prose padding.

## 2. Animations complete by mid-viewport
Today the scroll-linked animations (`ScrollArc`, `PullQuote`) and `whileInView` reveals (`BiteSection`, `Reveal`, `BeforeAfter`) fire only when the element is well into view, so users scroll past before they finish.

Changes:
- `ScrollArc`: change `useScroll` offset from `["start 80%", "end 30%"]` → `["start 90%", "start 40%"]` so the SVG `pathLength` reaches 1 once the chart's top hits ~40% of viewport (above the midline). Bump spring stiffness for snappier completion.
- `PullQuote`: scroll offset `["start end", "end start"]` → `["start 90%", "start 40%"]` for the parallax `y`, plus fade-in `viewport` margin `-15%` → `-40% 0px -40% 0px` so it lands before mid-screen.
- `BiteSection`, `Reveal`, `BeforeAfter`: change `viewport={{ once: true, margin: "-10% 0px" }}` → `viewport={{ once: true, margin: "0px 0px -50% 0px" }}`. This triggers as soon as the element's top crosses the 50% viewport line. Keep durations the same (0.6–0.7s) so they finish quickly after triggering.

## 3. "Back to UX Bites" CTA at the bottom of the detail page
Add a centered pill button just above the `More UX Bites` strip (or as standalone when there's no prev/next):

```tsx
<div className="container mx-auto px-4 md:px-6 pb-10 max-w-3xl text-center">
  <MagneticButton asChild>
    <Link to="/ux-bites">← All UX Bites</Link>
  </MagneticButton>
</div>
```

Uses the existing `MagneticButton` to keep the magnetic-interaction memory rule consistent.

## 4. Second UX Bite — Urakkamaailma renovation pricing gap
New folder: `src/content/ux-bites/urakkamaailma-pricing-gap/`

Frontmatter:
- slug: `urakkamaailma-pricing-gap`
- title: "Where 132,000 Price Records Get Lost"
- product: "Urakkamaailma · urakkamaailma.fi"
- surface: "Pricing pages"
- hook: "Finland's largest renovation marketplace publishes every project price — then makes you scroll 318 pages to find yours."
- date: "2026-06-11"
- readingTime: "4 min"
- tags: `["Marketplace", "Data UX", "Prototype"]`
- findings: 3
- cover: extracted hero-style image generated for the bite

Body structure (using existing components):
1. **Hook + stat strip** — four-stat row (132,704 records / 0 summary stats / 8,847 pages / ~3 hrs prototype) rendered as a small inline grid (no new component needed; plain Tailwind inside the MDX).
2. **Finding 01 — Rich data, flat presentation** with `BeforeAfter` (current paginated list vs. proposed summary view).
3. **`PullQuote`** — "The fix isn't more data. It's a presentation layer on top of what already exists."
4. **Finding 02 — Scale of the gap** with a `BeforeAfter` of the kitchen/bathroom volume chart vs. the explorer view.
5. **Finding 03 — The homeowner's three questions** answered by an interactive cost explorer (median, range, distribution).
6. **Approach** section noting the ~3 hr Lovable build and linking out to `urakka-hinturi-fi.lovable.app`.

Assets (generated/sourced):
- `cover.jpg` — calm editorial cover (data + Finnish home cues)
- `finding-1-before.jpg`, `finding-1-after.jpg`
- `finding-2-before.jpg`, `finding-2-after.jpg`
- `finding-3-prototype.jpg`

All generated with `imagegen` at standard quality, then uploaded via `lovable-assets`-style flow — actually we'll keep them as local jpgs in the bite folder to mirror the joy-buying-flow setup. Source material: PDF page screenshots already extracted to `parsed-documents://` will be copied as the "before" frames where they directly represent the live site.

## Files

**Edit**
- `src/components/uxBites/BiteSection.tsx` — viewport margin + spacing
- `src/components/uxBites/Reveal.tsx` — viewport margin
- `src/components/uxBites/BeforeAfter.tsx` — viewport margin
- `src/components/uxBites/PullQuote.tsx` — scroll offset + viewport margin
- `src/components/uxBites/ScrollArc.tsx` — scroll offset + spring
- `src/pages/UxBitePage.tsx` — single-column shell, tighter padding, "All UX Bites" CTA

**Create**
- `src/content/ux-bites/urakkamaailma-pricing-gap/index.mdx`
- `src/content/ux-bites/urakkamaailma-pricing-gap/cover.jpg`
- `src/content/ux-bites/urakkamaailma-pricing-gap/finding-1-before.jpg`
- `src/content/ux-bites/urakkamaailma-pricing-gap/finding-1-after.jpg`
- `src/content/ux-bites/urakkamaailma-pricing-gap/finding-2-before.jpg`
- `src/content/ux-bites/urakkamaailma-pricing-gap/finding-2-after.jpg`
- `src/content/ux-bites/urakkamaailma-pricing-gap/finding-3-prototype.jpg`

No new dependencies. No route or nav changes — second bite picks up automatically via `import.meta.glob`.
