# Industrial Index — design language (portfolio v2)

The rulebook for anything new on the v2 site and its canvas boards.
**Read this before designing or coding any new component, section, board or cover.**
If something here conflicts with a one-off board, this file wins. If it conflicts with
`apps/portfolio/src/v2/v2.css`, the CSS is the source of truth: update this file to match.

Last updated: 30 Oct 2026

---

## 1. Principles

1. **Paper, ink, hairlines.** Grey-white ground, near-black ink, 1px rules. Structure comes from
   lines and whitespace, not boxes, fills or shadows.
2. **Colour is reserved.** There is one accent (amber) and one status colour (green), and each has
   exactly one job. Nothing else on the page is coloured. The work (screenshots, covers) brings
   the colour.
3. **Two voices.** Inter says things. Space Mono labels things (small, uppercase, tracked).
4. **Square content, round controls.** Content (images, tiles, cards, tags) has square or
   barely rounded corners. Only navigation chrome (dock, segmented controls) is pill-shaped.
5. **Motion confirms, it doesn't perform.** Short, eased, no bounce on content.
6. **No decoration without a job.** If a text, line, colour or icon doesn't help someone
   understand or act, it doesn't go on the page.

---

## 2. Tokens (from `.v2` in v2.css)

| Token | Light | Dark | Job |
|---|---|---|---|
| `--bg` | `#F6F7F9` | `#0D1117` | Page ground |
| `--surface` | `#FFFFFF` | `#161B22` | Paper cards, panels, inputs |
| `--chip` | `#EAECEF` | `#1F2630` | Quiet fills (secondary tag, image placeholder) |
| `--rule` | `#E1E4EA` | `#262C36` | Hairlines |
| `--rule-strong` | `#C9CED6` | `#3A414C` | Stronger hairline, outline of quiet controls |
| `--ink` | `#0D1117` | `#E6EDF3` | All text, primary lines, filled buttons and tags |
| `--on-ink` | `#F0F3F6` | `#0D1117` | Text on ink |
| `--muted` | `#57606A` | `#8B949E` | Secondary text, labels |
| `--accent` | `#D96B27` | `#F0883E` | **Hover only** (links, the "more" line) |
| `--ok` | `#1A7F54` | `#3FB97F` | **Status only**: the "open to work" pulse dot |
| `--tile-dark` / `--band` | `#0D1117` | `#1C2129` / `#05070A` | Dark tiles, contact band |

Fonts: `--f-name` Arvo 700 (**the name only**), `--f-body` Inter, `--f-mono` Space Mono.
Easing: `--ease: cubic-bezier(0.23, 1, 0.32, 1)`; `--spring: cubic-bezier(0.34, 1.36, 0.64, 1)` (dock only).

Always use the tokens. Never hard-code a colour outside the tables above, so dark mode keeps working.

---

## 3. Colour rules

- **Allowed on the page:** the tokens above, nothing else.
- **Accent (amber) = hover feedback only.** Link and line hover, the "That's not all" line on hover.
  Never a resting fill, border, marker or tag.
- **Green (`--ok`) = the status dot only.** It is the pulsing dot from the hero ("Next · Open")
  and the avatar. Any "current / active / available" marker uses this same dot, in this same style.
- **No category colours.** Tags, cards and list rows are never colour-coded by type or role.
  Differentiate with words and with ink fill vs. quiet fill.
- **No coloured borders or edges** on cards, deck cards, rows or tiles.
- **Exceptions, contained:**
  - Inside media: covers, screenshots and product mock-ups use the product's own colours
    (A+ blue, EDIAQI greens…). The frame around them stays neutral.
  - The scanner visual uses the six field colours (`SCAN_FIELDS` in `data/home.ts`), and only
    inside the scanner visual or its direct legend.

---

## 4. Typography

| Role | Spec |
|---|---|
| Name (hero) | Arvo 700 · 80px · line-height 0.98 · −0.015em |
| Case study title | Inter 600 · 56px · 1.02 · −0.03em |
| Section heading (`.v2-h2`) | Inter 500 · 26px · 1.2 · −0.02em |
| Statement paragraph (field note) | Inter 500 · 26px · 1.4 · −0.015em |
| Glance answer | Inter 500 · 18px · 1.4 |
| Body | Inter 400 · 16px · 1.55 |
| Tile title / sub | Inter 500 15px / Inter 400 15px `--muted` |
| Label / overline (`.v2-mono`) | Space Mono 400 · 11px · uppercase · +0.08em · `--muted` |
| Button text | Space Mono · 12px · uppercase · +0.08em |
| Tag text | Inter 500 · 13px (never mono, never uppercase) |

- One size per section for running text (no separate "lead" style).
- No numbered headings ("1 · Problem") and no decorative overlines that don't label anything.
- Mono is for labels, metadata, keys and buttons, never for sentences or tags.

---

## 5. Layout & spacing

- Container: `.v2-wrap`, max-width 1360px (1520px from 1600px screens, 1680px from 1920px), 24px side gutters (16px on phones).
- **Section pattern (`.v2-section`):** a label column (260–320px, `border-top: 1px solid var(--ink)`,
  `padding-top: 14px`) plus a content column (`border-top: 1px solid var(--rule)`). Gap 48px,
  112px below each section (72px on phones).
- Tile grid: `minmax(240px, 1fr)`, 28px column gap, 56px row gap.
- Spacing steps: 4 · 8 · 12 · 14 · 16 · 20 · 24 · 28 · 36 · 48 · 56 · 72 · 112.
- Page order on the home page: hero → selected work → everything else.

---

## 6. Shape (radius)

| Element | Radius |
|---|---|
| Images, covers, video frames, tiles, paper/dark cards, rows | **0** |
| Buttons (`.v2-btn`, `.btn`) | 8px |
| Tags (`.skills li`) | 8px. **Never pill-shaped**, so a tag never looks like a button or control. |
| Keyboard keys (`.v2-kbtn-key`, `kbd`) | 6px |
| Tooltips, small popovers | 6px |
| Floating panels (⌘K palette) | 16px (phone sheet 18px top corners) |
| Navigation chrome: dock, dock items, segmented controls (`.v2-seg`, `.v2-cseg`) | 999px (pill) |
| Dots, avatar, round icon buttons | 50% |
| Product mock-ups inside a case (tablet, phone, app window) | whatever the real device or app has |

If an element isn't in this table, it is content, so it gets 0.

---

## 7. Lines & elevation

- Hairlines: `1px solid var(--rule)`. Section starts: `1px solid var(--ink)`.
- Media frames get an inset hairline (`inset 0 0 0 1px rgba(50,64,79,.08)`), not a border or shadow.
- **Shadows only on things that float above the page:** the dock, the ⌘K panel, tooltips,
  hover previews, and stacked or dragged cards while they move. Never on resting cards, tiles or rows.
- Paper card = `--surface` + `1px solid var(--rule)` + radius 0.

---

## 8. Components

**Button.** Space Mono 12px uppercase, 1px ink border, 8px radius, min-height 44px (40px in dense
rows), padding 0 16px. Hover: fills ink, text `--on-ink`. One solid (`--solid`) button per view at most.

**Tag.** Inter 500 13px, padding 7px 12px, radius 8px.
- Primary tag (category, the "what"): ink fill, `--on-ink` text. This is the case-study `.skills` tag.
- Secondary tag (role, the "how"): `--chip` fill, ink text.
- At most two tags per item: category + role. Place and year go after them as plain
  `--muted` text ("EU Horizon · 2026"), not as a tag.
- No dots, icons or colours inside tags.
- **Quiet tag** (cover captions, more-work rows): same shape, `--chip` fill, `--muted` text, Inter 500 12px,
  padding 6px 10px, no ink fill for either tag. Use it wherever the title should lead and the tags only inform.

**Cover caption (two rows).** Row 1: an outcome-led title (Inter 500 15px, ink) with the context
right-aligned in muted text ("EU Horizon · 2026"). Row 2: the two quiet tags.

**Label / overline.** `.v2-mono`. Use only when it labels something real (a column, a control, metadata).

**Link.** Ink text. Hover: `--accent`. Inline links in prose: 2px ink underline (`border-bottom`).

**Status dot.** `.v2-pulse`: 7px `--ok` dot with a 1.8s outward pulse; static under reduced motion.
It is the only marker for "open / current / active".

**Work tile / cover.** Media with radius 0, then the title (15px/500) and a muted sub or the tags.
Hover: media scales to 0.98 (tiles) or gets a 12% white veil (covers), over 300ms. No card chrome.
Covers are 16:9, shown uncropped (`object-fit: contain` or a 16:9 frame), with the product's tint
as the loading placeholder.

**Segmented control.** `.v2-seg`: pill outline in ink, Space Mono 11px items, pressed item filled ink.

**Lists / index rows.** 1px `--rule` between rows; title Inter, metadata right-aligned in muted text.

**Focus.** `outline: 2px solid var(--ink); outline-offset: 3px` on everything focusable. Never remove it.

---

## 9. Motion

- Hover and press: 160–200ms, `--ease`.
- Reveals and expanding (grid-rows 0fr→1fr, fade + 6–12px rise): 300–420ms, `--ease`;
  stagger lists by 60–120ms.
- `--spring` only on the dock. No bounce on content.
- No scroll-jacking and no cursor followers, except a hover preview that is tied to an item.
- `prefers-reduced-motion`: no transforms or loops. Videos show their poster frame, sequences jump to their end state.
- Video covers: muted, looping, `playsinline`, lazy-loaded, paused off-screen.

---

## 10. Cover animations (`cover-animations/`)

- 960×540 stage, rendered at 1920×1080 for masters and 1280×720 MP4 for the site.
- The ground is the site `--bg` (or the product's own ground if the cover is a product screen).
  Light grain is allowed.
- Labels in Space Mono uppercase, sentences in Inter. The same palette rules apply outside the
  product UI.
- One idea per loop, 8–10 seconds, with a seamless join. Real UI rebuilt in vector, not screenshots.

---

## 11. Checklist before anything new ships (or goes on the canvas)

1. Only token colours? No category colours, no coloured edges, amber only on hover, green only for the status dot?
2. Radius from the table in §6 (content 0, buttons and tags 8, pills only for navigation chrome)?
3. Inter for sentences and tags, Space Mono only for labels and buttons, Arvo only for the name?
4. One text size per section; no decorative numbers or overlines?
5. Lines instead of boxes; shadows only on floating layers?
6. Works in dark mode with tokens alone?
7. Keyboard reachable, visible focus, reduced motion handled?
8. Every text, line and colour has a job?

---

## 12. Decision log

- 2026-10-24 · Direction B "Industrial Index" chosen as the keeper.
- 2026-10-27 · No numbered headings or decorative overlines. One text size per section.
- 2026-10-29 · Tags: two max (category + role), in Inter, not mono. Place and year as plain text.
- 2026-10-29 · No category colours or coloured card edges. Stay in the site palette.
- 2026-10-30 · Tags are never pill-shaped. They use the case-study `.skills` shape (8px radius).
- 2026-10-30 · Cover captions: two rows, title from what the project achieved + context, then quiet tags.
- 2026-10-30 · The A+ cover was rebuilt to these rules: real A+ UI in vector, site palette around it, one idea (five minors = one major barrier).
