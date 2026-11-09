# Case study wall — spec for building it

This file explains the "process wall" case-study layout and how to build it in this repo so that case
studies are **edited as data, not designed by hand**. Read it before writing any code for case studies.
Also read `apps/portfolio/src/v2/DESIGN-LANGUAGE.md` first; every rule there still applies.

Owner: Sumit. Design source: the Claude Design canvas "Portfolio Revamp — Strategy & Design Language",
page "Case study layouts", boards **W1.4 Process wall** (the layout) and **W1.4 How the wall scales**
(the system). Those boards are prototypes; this file is the spec.

---

## 1. What we are building and why

Recruiters skim. The current case page (`src/v2/pages/CaseStudyV2.tsx`) shows ~160 words, 22 elements
and no product image before the first scroll. Process images (hypotheses, audit charts, flowcharts,
wireframes, mockups) all have different shapes, so forcing them into one column either crops them or
makes some huge.

The new layout fixes both:

- **The headlines are the story.** Each case is told as a short sequence of *beats*. Each beat has one
  full-sentence headline that makes a claim and sets up the next one. Reading only the headlines gives
  problem → evidence → decision → result in ~20 seconds.
- **The process lives on a wall.** All of a case's artefacts sit together on one wall beside the text, at
  their **real proportions** (nothing cropped, nothing forced into a column), grouped by beat. As the
  reader scrolls, the wall pans and zooms to the beat being read and dims the rest. Before reading, it
  shows the whole wall: all the work at once.
- **Two reading modes**, one toggle:
  - **Headlines only** (default): per beat, a label, the headline and one muted sub-line.
  - **Full read**: the complete case — every paragraph, quote, table, figure and interactive piece —
    grouped under the same beat headlines. **Nothing from today's case content is cut.**
- **Editing is data-only.** Adding an image = drop the file in `public/v2/cases/<slug>/` and add one line
  to the case's wall list. Ratios, positions and camera are computed. No hand-placed coordinates.

---

## 2. Page anatomy (desktop)

```
← All work                                   [ Headlines only | Full read ]   ← segmented control (.v2-seg)
Indoor air quality, made readable for 200 people      ← outcome-led title (same line as the homepage cover)
An in-room tablet and a facility dashboard that…       ← one-sentence dek (≤ 25 words)
ROLE ─────────── WITH ──────────────── WHEN            ← exactly three facts
UX/UI lead       Deda Next · EU Horizon  2026 · Ferrara
────────────────────────────────────────────────────────────────────────────
│ text column (≈ 45%)                 │ wall viewport (≈ 55%, sticky, 100vh-ish) │
│ CONTEXT                             │  ┌────┐ ┌────────┐ ┌───┐                  │
│ Ferrara's schools had 32 sensors…   │  │    │ │        │ │   │  ← world, panned │
│ Rich data, but nobody…              │  └────┘ └────────┘ │   │    and zoomed by │
│                                     │  ┌───┐┌───┐        └───┘    a CSS transform│
│ HYPOTHESES                          │  …                                         │
│ …but when the air turned bad, …     │  caption: "2 / 8 · Hypotheses"             │
```

- Header (title, dek, three facts) is shared by both modes. Keep the existing breadcrumb.
- Below the header: a two-column split. Left = the beat text (headlines-only or full). Right = the wall,
  `position: sticky`, filling the viewport height below the dock.
- The existing reading-depth control ("30 sec · 2 min · 5 min") is replaced by the two-mode toggle.
  Keep the "Next case study" footer as it is.
- Phones (≤ 760 px): no wall. Each beat shows its own wall items as a horizontally scrollable strip
  (scroll-snap) above its text, in wall order. Same data, no camera.

---

## 3. Content model (new types)

Put the types next to the existing ones in `src/v2/data/cases.ts`, or in a new `src/v2/data/caseWall.ts`.
Do not delete the old `CaseStudy` type until every case is migrated (see §8).

```ts
export type BeatId = string;                       // stable, kebab-case: "context", "audit", "study"…

export type Beat = {
  id: BeatId;
  label: string;          // small mono label: "Context", "Hypotheses", "Audit", "Study"…
  toc: string;            // ≤ 5 words, used in the sticky contents and the wall caption
  headline: string;       // one full sentence, a claim. "…" / "…but" pairs are allowed once per case
  sub: string;            // one muted sentence for Headlines only (≤ 20 words)
  full: string;           // trusted HTML for Full read (same conventions as today: %ASSET%, .quote, .ww, .m22, .tradeoff, .fig…)
};

export type WallItem =
  | { beat: BeatId; kind: "image"; src: string; alt: string; label?: string }     // src relative to public/v2/
  | { beat: BeatId; kind: "video"; src: string; poster: string; alt: string; label?: string }
  | { beat: BeatId; kind: "pdf"; cover: string; href: string; label: string }      // shows cover + "Open the deck ↗"
  | { beat: BeatId; kind: "live"; signature: keyof typeof SIGNATURES; label?: string } // existing signatures.tsx components
  | { beat: BeatId; kind: "quote"; text: string; cite: string }
  | { beat: BeatId; kind: "tradeoff"; chose: string; over: string; because: string }
  | { beat: BeatId; kind: "stat"; value: string; caption: string };

export type CaseWall = {
  slug: string;                 // must match an existing CaseStudy slug and route
  title: string;                // outcome-led, same as the homepage cover title
  dek: string;
  facts: [ [string, string], [string, string], [string, string] ];  // exactly three
  beats: Beat[];                // 4–9 beats, story order
  wall: WallItem[];             // order inside a beat = order on the wall
  links?: { label: string; href: string }[];   // rendered at the end of Full read
};
```

Notes

- **Ratios are never written by hand.** Read them from `apps/portfolio/src/lib/image-dimensions.json`
  (generated by `scripts/generate-image-dimensions.js`). That script does not scan `public/v2` yet:
  add `"apps/portfolio/public/v2"` to `SEARCH_DIRS` and key entries by their path relative to `public/v2`
  so lookups match `WallItem.src`. Fallback at runtime: read `naturalWidth/naturalHeight` on load and
  relayout once; never block render on it.
- Type tiles (`quote`, `tradeoff`, `stat`) exist so **every beat has at least one wall item** even when it
  has no image. Use text the case already contains; never invent copy.
- `live` reuses the components in `src/v2/components/signatures.tsx` (`LoadRace`, `TabletSimulator`,
  `PersonaNudge`, `OnboardingWizard`, `DotField`). They must work at the wall's scale and pause when the
  camera is elsewhere (`active` prop).
- One file per case is easier to edit: `src/v2/data/walls/<slug>.ts` exporting a `CaseWall`, plus an
  index that maps slug → wall. Prefer that over one giant file.

---

## 4. Wall layout (computed)

Implement as a pure function so it can be unit-tested: `layoutWall(wall, beats, dims) → { items, columns, world }`.

```
COL_W = 520, COL_GAP = 90, ROW_GAP = 46, LABEL_H = 28, TOP = 60    // world units, not px
x = 0
for each beat in story order:
  column header at (x, 0): "01 · <beat.toc>"
  y = TOP
  items = wall items for this beat, in order
  walk items:
    if item and next item are both images/videos with ratio < 1.2:      // portraits pair up
      w = (COL_W − 24) / 2; place both side by side; y += LABEL_H + max(heights) + ROW_GAP
    else if image/video/pdf:  w = COL_W, h = COL_W / ratio
    else (type tile / live):  w = COL_W, h = tile height (quote 250, stat 250, tradeoff 330, live 16:9)
    place at (x, y + LABEL_H); y += LABEL_H + h + ROW_GAP
  x += COL_W + COL_GAP
world = { w: x − COL_GAP, h: max column height }
```

- One column per beat keeps the wall in the same left-to-right order as the text.
- If a case has more than 6 beats, wrap into two rows of columns (row height = tallest column of the
  first row + 120). EDIAQI has 8 beats → two rows of 4.
- Very wide items (ratio ≥ 2.5) may span two columns *only if* the next beat has no items; otherwise
  full column width. Keep this rule simple; don't build a general packer.

### Camera

- `focusRect(beat)` = bounding box of that beat's column (header + items) plus 40 px padding.
  Whole-wall rect when no beat is active (top of the page, before the first beat).
- `scale = min(viewportW / rect.w, viewportH / rect.h)`, centre the rect, apply to the world as
  `transform: translate(tx, ty) scale(s)` with `transition: transform 900ms var(--ease)`.
- Items outside the active beat: `opacity: .28` (400 ms). Never hide them.
- Caption bar inside the wall, bottom: `"2 / 8 · Hypotheses"`, or `"The whole process · 8 steps"`.
- Active beat comes from an IntersectionObserver on the beat sections (root margin around 45% from the
  top, like `LongRead` today). Works the same in both reading modes.
- Clicking a wall item while it's dimmed scrolls the text to its beat. Clicking an active image opens it
  full size in a light-box (Esc closes, focus returns).
- `prefers-reduced-motion`: no transform transition (jump), no pan on scroll; videos show posters.

---

## 5. Components and files

```
src/v2/pages/CaseStudyV2.tsx      → render <CaseWallPage> when a CaseWall exists for the slug, else the old layout
src/v2/components/wall/
  CaseWallPage.tsx                 header, mode toggle, split layout, footer reuse
  BeatText.tsx                     one beat: label, headline, sub (Headlines only) or full HTML (Full read)
  ProcessWall.tsx                  viewport, world, camera, caption, light-box
  WallItem.tsx                     renders each WallItem kind
  MobileStrip.tsx                  ≤ 760 px fallback strip per beat
  layoutWall.ts                    pure layout + focusRect (+ tests)
  useActiveBeat.ts                 IntersectionObserver → active beat id
src/v2/data/walls/<slug>.ts        one CaseWall per case
src/v2/case.css                    styles (tokens only, see DESIGN-LANGUAGE.md)
```

Use the existing helpers: `asset()` and `reduceMotion()` from `src/v2/lib.ts`, the `html()` %ASSET%
replacement from `CaseStudyV2.tsx`, `ChromeSeg`/`.v2-seg` for the toggle, `SIGNATURES` for live tiles.

---

## 6. Visual rules (from DESIGN-LANGUAGE.md, applied to the wall)

- Tokens only. Wall ground: `--bg` with a 1 px dot grid at ~10% ink, 16–18 px pitch. Items: `--surface`,
  radius 0, the media-frame inset hairline; the only shadow is a soft lift on wall items (they float).
- Type: headline Inter 500 26–28 px; label and wall captions Space Mono 11 px uppercase `--muted`;
  sub-line Inter 15 px `--muted`. One size per section in Full read (no lead style).
- Amber only on hover. No category colours. Product colours only inside images.
- Type tiles follow the existing components: quote = `.quote`, trade-off = Chose / Over / Because row,
  stat = big number + mono caption.

---

## 7. Editing workflow (the reason this exists)

To add or change content in a case:

1. Drop images in `apps/portfolio/public/v2/cases/<slug>/`.
2. Run `node scripts/generate-image-dimensions.js` (or rely on the runtime fallback while iterating).
3. In `src/v2/data/walls/<slug>.ts`: add a `wall` line with `beat`, `src`, `alt`, optional `label`;
   edit `headline` / `sub` / `full` for text.
4. `npm run dev`, open the case, add `?wall=debug` to the URL.

Build these two helpers too:

- **Debug overlay** (`?wall=debug`): outlines every item with its beat id, ratio and computed size, shows
  the focus rect, and lists warnings.
- **Validator** (`src/v2/data/walls/validate.ts`, run in a vitest test and in dev): fails when a beat has no
  wall item, an `src` file is missing, `alt` is empty, a `beat` id doesn't exist, `facts` isn't exactly
  three, or a headline is over ~110 characters.

---

## 8. Migration plan

1. Build the system with **EDIAQI only** (`ediaqi-decision-support-system`), behind the slug check in
   `CaseStudyV2.tsx`. Other cases keep the current layout.
2. Get EDIAQI approved, then migrate one case at a time in this order: Dashboard rebuild, A+, YOU,
   Onboarding, Groundwork, Gosta Labs, Mesa Te Club. Each migration = one `walls/<slug>.ts` file.
3. A case with fewer than 3 wall items in total falls back to a single sticky figure instead of a wall.
4. Remove the old `secs`/depth code only after every case is migrated.

There is a stash on `feat/v2-quick-actions` ("case-study thread layout…") with earlier `ThreadBeat` /
`CaseThread` types. Look at it for reuse, but this spec wins where they differ.

---

## 9. EDIAQI content (first case)

Title: **Indoor air quality, made readable for 200 people**
Dek: An in-room tablet and a facility dashboard that turn 12+ sensor readings into one clear action.
Facts: Role · UX/UI lead — With · Deda Next · EU Horizon — When · 2026 · Ferrara

| # | id | label | toc | headline | sub |
|---|---|---|---|---|---|
| 1 | context | Context | 32 sensors, 12+ readings | Ferrara’s schools had 32 sensors streaming 12+ readings… | Rich data, but nobody in the room could watch a dashboard all day. |
| 2 | problem | Hypotheses | Alerts, but no action | …but when the air turned bad, nobody knew what to do. | I wrote five hypotheses before designing anything. The first one framed the project. |
| 3 | audit | Audit | 30 issues in the old display | The existing display broke 30 usability rules. | A heuristic evaluation of the legacy prototype, every issue rated by severity. |
| 4 | study | Study | My hypothesis, disproved | I bet on progressive disclosure. 200 people proved me wrong. | Upfront, in text with icons, beat hiding detail in all six breach scenarios. |
| 5 | flows | Flows | Every alert has one owner | So every alert got an owner and a next step. | Occupant, facility staff or the system: who acts, how, and what gets logged. |
| 6 | wire | Wireframes | Nudge, act, remind | Then I sketched what the display says, minute by minute. | A nudge, a clear action, a reminder set in one tap, and a quiet return to normal. |
| 7 | result | Prototype | Five states, one action each | A tablet that tells people what to do, in five states. | One status in plain Italian, a face anyone can read, one thing to do. Plus Dashboard V2. |
| 8 | learn | Learned | Instructions beat numbers | Raw numbers don’t change behaviour. Instructions do. | What the study and the prototype taught me, and what I’d test next. |

**Full read** = today's EDIAQI `secs` content (lead + read + full of all four sections), redistributed
— nothing dropped:

| beat | content taken from today’s `cases.ts` |
|---|---|
| context | Problem lead (Deda Next streams 12+ parameters…) + Problem full paragraph (FROST server / SensorThings) |
| problem | Problem read: the three bullets + both participant quotes |
| audit | Built lead (I audited…) + the 30-issue `.audit` bar + its breakdown line |
| study | Trade-offs lead (2×2, 200 participants) + `.m22` grid + "Measured:" line + the three `.tradeoff` rows + Scope compromises paragraph |
| flows | (new one-liner: "Occupant-owned, staff-owned or system-owned: three scenarios decide who acts, through which channel, and what gets logged.") |
| wire | — (the wall carries it; optional one-liner) |
| result | "From wireframes to the prototype" paragraph + live `TabletSimulator` + `.ww` before/after table + Result `.stats` + "I delivered…" paragraph |
| learn | Result read bullets (Upfront beats progressive…) + "With three more months…" paragraph + links (Tablet prototype, Dashboard V2 prototype, Full study) |

**Wall** (files in `public/v2/`):

| beat | items |
|---|---|
| context | image `work/ediaqi-corridor.jpg` "Corridor display" |
| problem | image `cases/ediaqi/hypotheses.jpg` "Hypotheses H1–H5"; quote "I don’t think it’s enough to have a blinking light…" — Research participant |
| audit | image `cases/ediaqi/heuristics.jpg` "Heuristic evaluation" |
| study | tradeoff Chose upfront disclosure / Over progressive disclosure / Because higher comprehension in time-critical scenarios (200-person study) |
| flows | image `cases/ediaqi/scenarios.jpg` "Scenario flows A–C" (tall: 0.73) |
| wire | image `cases/ediaqi/wireframes.jpg` "Wireframes · Scenario A" |
| result | image `cases/ediaqi/tablet-display.jpg` "Prototype"; images `mockup-aria-buona.webp` + `mockup-aria-scadente.webp` (portrait pair); live `TabletSimulator`; images `dash-home.jpg`, `dash-location.jpg` "Dashboard V2" |
| learn | stat "5" "display states, one action each"; image `cases/ediaqi/ambient.jpg` "Ambient state" |

---

## 10. Acceptance criteria

- EDIAQI renders in both modes; Full read contains every piece of content listed in §9 (diff against
  today's `secs` HTML: no missing paragraph, quote, table, figure or link).
- Scrolling moves the camera to the right beat in both modes; top of the page shows the whole wall.
- Adding a new `image` line to `walls/ediaqi.ts` with a new file places it correctly with no other change.
- Validator passes; a deliberately broken entry fails with a clear message.
- Keyboard: the toggle, wall items and light-box are reachable; focus is visible; Esc closes.
- `prefers-reduced-motion` respected. Phones show strips, no wall.
- Light and dark mode work with tokens only. `npm run lint` and the type check pass for touched files.

## 11. Working rules

- Only touch case-study code and the files listed in §5. Don't change the homepage or other pages.
- Don't commit or push unless Sumit asks. Work on a branch; stash or ask before switching branches.
- When something in this spec conflicts with `DESIGN-LANGUAGE.md`, the design language wins; flag it.
- Never invent case facts or quotes. If a beat needs copy that doesn't exist, leave a `TODO(sumit)` and say so.
