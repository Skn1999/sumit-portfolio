
## Revised plan — Phase 2 (scoped to what's actually possible right now)

### Scope decisions (locked from your answers)

- **EDIAQI**: Build hi-fi gallery + Validation section. You'll write the Validation copy; I'll wire layout.
- **SuperEgo**: Wait on hi-fi gallery — more screens coming. **I will not start SuperEgo's visual section this round.** I'll do the non-visual edits (framing rewrite, design-system sidebar, "What I'd Test"). Visuals follow in a second pass.
- **Mesa Te**: No new photos / no Miro access / no fresh outcome data. Honest reframe only — no fabricated metrics, no fake gallery. Quietly stronger than the current version without overclaiming.

### Critique of original brief (carried forward, condensed)

- The example metrics in your brief were illustrative — I'm not inventing any.
- Live Figma embed is heavy and login-gated; using a linked card with a hi-fi thumbnail instead.
- SuperEgo intro is reordered so the honest framing follows the concept, not precedes it (avoids leading with self-deprecation).
- `npm run build` runs automatically via the harness — I won't run it manually; I will mobile-check the new sections.

---

### 1. EDIAQI — `src/content/projects/ediaqi-decision-support-system/index.mdx`

**Assets to add** (5 uploaded tablet displays — these are the wall-mounted classroom/office display states already referenced in your frontmatter comments):

Upload via `lovable-assets` from `/mnt/user-uploads/` so the binaries don't bloat the repo:
- `Main_Screen.jpg` → "Ambient: Aria buona" (good state, 680 ppm)
- `Indoor_Air_Quality_Display.jpg` → "Alert: Aria scadente" (1450 ppm, ventilation suggested)
- `CO2_Levels_rising.jpg` → "Action: Serve cambiare aria" (1250 ppm, action protocol surfaced)
- `Action_taken.jpg` → "Recovery: Stiamo monitorando il recupero" (post-action monitoring)
- `Indoor_Air_Quality_Display-1.jpg` → "Critical: Aria pessima" (2200 ppm, evacuation)

**Insertions:**

1. **New section after "My Role": `## The Wall-Mounted Display — Five States`**
   - Single-column gallery (matches site's "centered linear reading" aesthetic), one screen per state.
   - Each screen captioned with: state name, threshold trigger, design intent (1 sentence on typography/color/illustration choice — e.g., "Color escalation from cool blue through warm amber to red signals urgency without alarming children; expressive face character keeps tone non-clinical for classroom context").
   - This delivers the "Visuals" success criterion: readers see polished UI and can identify typography/color/spacing intent.

2. **New section: `## Validation & Iteration`** — placeholder block I'll create with a clear `<!-- TODO: paste validation copy -->` marker and section scaffolding (heading, intro line, space for participant quotes styled as the existing blockquote pattern). You paste your real testing findings into it.

3. **Figma link card** — *skip*. Your frontmatter `links.case` is empty for this project and you didn't supply a Figma URL. I'll leave a `// links.case:` placeholder comment in frontmatter so it's a one-line add when you get a shareable prototype URL.

4. **New section at end: `## Scope & Limitations`** — 2 sentences I'll draft for your approval:
   > This is a 14-week thesis project running in parallel with my Deda Next internship. The wall display has been validated through structured testing; live deployment in Ferrara schools and offices is scheduled post-thesis and outcomes here reflect controlled evaluation rather than production metrics.

5. **Frontmatter** — update `metric` to lead with the display system once Validation copy lands. For now, leave as-is.

### 2. SuperEgo — `src/content/projects/super-ego-app/index.mdx` (text-only pass)

**Not touching visuals this round** — waiting for the full hi-fi set so the gallery is built once, not twice.

1. **Reorder the Overview** so it reads: concept (1 line) → honest framing (1 line: "This is a speculative design exploration. The system logic was prototyped but not validated with users — what follows is the reasoning, the design decisions, and what I'd test next.") → existing narrative. Keeps intellectual honesty without leading with the disclaimer.

2. **Add a "Design System Decisions" sidebar** near where the existing onboarding/system-1/system-2 narrative lives. Reuses the existing card pattern already in the file (`<section className="grid ...">`). 3 decisions, sourced from what's visible in the uploaded screens:
   - **Friction as a design material** — the 30-second Instagram block + "Open The App / Go Back To Focus" choice is a deliberate System-2 interrupt; copy stays neutral, not punitive.
   - **Persona of "You"** — naming the assistant in first person ("Hi, I'm 'You'") collapses the user/tool distinction; tone is collaborative not corrective.
   - **Involvement spectrum (Observer / Gentle Helper / Active Coach)** — user controls intensity up front rather than the system escalating uninvited.

3. **New section: `## What I'd Test Next`** — 3 numbered research questions:
   1. Do users actually adjust the involvement setting after onboarding, or set-and-forget?
   2. Does the timed block (30s) reduce session entry, or just delay it?
   3. When a user picks more than one onboarding goal, does the "focus on one" nudge improve adherence?

4. **Second-pass SuperEgo visuals** — separate plan once you send the rest of the hi-fi screens.

### 3. Mesa Te Club — `src/content/projects/social-integration-pd/index.mdx`

No photos, no Miro, no fresh metrics. Doing only what's defensible:

1. **Expand "My Role"** from the one-line italic blockquote into a short prose section breaking contribution by phase: workshop design, co-design tool creation (Mesa Te card deck, "Never Have I Ever" round), research synthesis, deliverable handoff. Sourced from the existing `co-design-activities-overview.png`, `never-have-i-ever.png`, `playing-sims.png`, `common-area-canvas.png`, `design-reveal.png`, `stakeholder-ecosystem.png`, `how-it-fits-together.png` already in the folder.

2. **Reuse existing diagram PNGs more deliberately** — the folder has 7 unused/lightly-used PNGs. Place them inline at the moments they describe (stakeholder ecosystem in stakeholder section, co-design overview in methodology, design reveal in outcomes). This is the closest we can get to "workshop visual proof" without photos.

3. **Outcomes — honest reframe.** No fabricated numbers. Add a short "What we observed" subsection summarising what was visible at design-reveal (mixed-tenure participation in final session, residents publicly claiming specific design elements, etc. — I'll draft from what the current narrative implies and flag any sentence that needs your verification before publishing).

4. **Participation Ladder** — keep the existing diagram. Add a one-line caption per rung using language already in your case study. No participant photos / quotes (none available).

5. **Final-presentation link** — already in frontmatter as `links.case`. Surface it more prominently with a styled CTA at the end of the case study ("Read the full final presentation →") rather than only in the project header.

---

### Verification

- Visual mobile check at ~375px for EDIAQI hi-fi gallery (5 stacked screens — confirm reasonable scroll length, captions readable, no horizontal overflow on the wider 4:3 tablet renders).
- Read-through pass for tone consistency with project memory ("serene, quietly confident"; warm-neutral; no flashy claims).
- Build runs automatically; I'll watch the harness signal.

### Out of scope

- New projects.
- Spatial Design Restaurant.
- SuperEgo hi-fi gallery (waiting on remaining screens).
- Mesa Te new photography / quantitative metrics (not available).
- Dark-mode work (already shipped).

### Technical details

- 5 EDIAQI tablet images uploaded via `lovable-assets create --file /mnt/user-uploads/<name>` and imported through `.asset.json` pointers (keeps repo light; site has `ProjectImageAsset` component but it expects in-folder paths — I'll either extend that component to accept asset-pointer JSON OR drop the binaries into the project folder for consistency with the existing pattern. Will pick the lower-risk option after re-reading `ProjectImageAsset`).
- No new global components needed for EDIAQI gallery or SuperEgo sidebar — inline Tailwind cards reuse the existing `bg-muted rounded-2xl p-5 border border-border/10` pattern.
- All MDX edits localized to the three files; no changes to routing, project listing, or shared layout.

---

**Ready to execute on your go.** Things I'll need from you mid-flight or after:
- Validation copy for EDIAQI (Section 1.2).
- Approval / edits to the Scope & Limitations sentences I draft.
- A heads-up when the remaining SuperEgo hi-fi screens are ready for the second pass.
