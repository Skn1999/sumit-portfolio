# Task 035: Visual Language Upgrade for Individual Project Pages (Groundwork, EDIAQI, SuperEgo)

**Task Name:** Visual Language Upgrade for Individual Project Pages (Groundwork, EDIAQI, SuperEgo)

**Context for the Task:**
The objective of this task is to upgrade the visual language and reading experience of individual case study pages—focusing initially on **Groundwork**, **EDIAQI**, and **SuperEgo App**—to align with the portfolio's Japanese Minimalist Slate Paper aesthetic (_Ma_, quiet Wabi-Sabi publication layout, hairline dividers, monospace tags).

---

## Targeted Case Studies

1. **Groundwork** (`src/content/projects/groundwork/index.mdx`)
2. **EDIAQI Decision Support System** (`src/content/projects/ediaqi-decision-support-system/index.mdx`)
3. **SuperEgo App** (`src/content/projects/super-ego-app/index.mdx`)

---

## Design Specifications & Acceptance Criteria

### 1. Aesthetic Identity & Design System Integration

- **Slate Paper Canvas**: Utilize `--paper-bg`, `--paper-card`, `--ink-primary`, `--ink-muted`, and `--paper-border` tokens across all three case study layouts.
- **Publication Typography**: Clean display headers (`font-display font-bold tracking-tighter text-ink-primary`), narrative body text (`font-body-narrative text-ink-muted leading-[1.8]`), and monospace metadata tags (`font-mono text-xs text-ink-muted uppercase`).

---

### 2. Above-the-Fold Header & Scroll Sequence

- Make sure that the nav header height is considered and the content starts under the navbar
- **Text-First Header**: Above the fold, display a quiet, spacious header with:
  - Monospace metadata tags (Role, Timeline, Focus / Client, Impact).
  - Primary display title in bold typography.
  - Brief project narrative summary.
- **Scroll-Revealed Cover Image**: As the user scrolls down, the project cover image smoothly enters the viewport framed in a subtle paper border (`border border-paper-border`), leading into the body content.

---

### 3. Standardized Body Section Structure

Standardize the body content across all three case studies into 4 clean, numbered section blocks:

1. `01 // CONTEXT`
2. `02 // PROBLEM`
3. `03 // APPROACH`
4. `04 // IMPACT`

---

### 4. Quiet Editorial Media Spreads

- Images, wireframe diagrams, and research artifacts sit naturally within the body flow.
- All media items framed in hairline paper borders (`border border-paper-border`).
- Numbered monospace captions below media assets (e.g., `FIG 01 // IA WORKFLOW`, `FIG 02 // DECISION SUPPORT SYSTEM PROTOSTORE`).
- Just Enough vertical padding (_Ma_) between sections for clean readability but avoid large white spaces that can break reading flow.
- Make sure the headings are not too big and the body text has enough sizing contrast compared to heading text

---

### 5. Simple Next Project Navigation

- At the end of each case study, render a simple, elegant text link to the next project in sequence:
  - Groundwork → `NEXT PROJECT: EDIAQI →`
  - EDIAQI → `NEXT PROJECT: SUPEREGO →`
  - SuperEgo → `NEXT PROJECT: GROUNDWORK →`

---

### 6. Build & Quality Verification

- Verify `npm run build` compiles cleanly with zero TypeScript or lint errors.
- Ensure static page generation succeeds for all three case study routes:
  - `/projects/groundwork`
  - `/projects/ediaqi-decision-support-system`
  - `/projects/super-ego-app`

---

## What to Avoid

- **DO NOT use flashy, high-contrast modal popups or distracting animations:** Keep visual elements quiet, tactile, and aligned with Japanese Wabi-Sabi publication design.
- **DO NOT create divergent visual themes per project:** All three case studies must share the unified slate paper design language.
- Do not use any soft shadows or white padded boxes around the content. Content should feel like it is written directly on a paper.
