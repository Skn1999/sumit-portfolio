# Portfolio Improvement Plan — Phased & Testable

**Goal:** Position as a credible **Product/UX Designer** with visual craft evidence, shipped work validation, and measurable outcomes. Target audience: UI Designer & Product Designer hiring managers at mid-market/enterprise orgs (e.g., Siemens Healthineers).

**Timeline:** 6–8 weeks with weekly validation checkpoints.

---

## Phase 1: Foundation & Identity Clarity (Week 1–2)

### Objective

Fix structural issues and clarify positioning to remove ambiguity for hiring managers.

### Tasks

| Task    | Description                           | Success Criteria                                                                                                                                            |
| ------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **1.1** | Update portfolio header/About section | Remove "× Software Engineer" from headline. Rewrite as: "Product Designer, UX Strategist, and Builder." Let code be a superpower footnote, not co-headline. |
| **1.2** | Update copyright year                 | Change 2025 → 2026                                                                                                                                          | Copyright reflects current year in site footer                  |
| **1.3** | Fix Portfolio PDF link                | Audit `/portfolio/file.pdf`. Either restore the file, remove the broken link, or replace with "Resume" link that works.                                     | Link works or is removed; no 404s                               |
| **1.4** | Align LinkedIn headline               | Update to match portfolio positioning: "Product Designer & UX Strategist \| Design Systems \| Figma"                                                        | LinkedIn headline matches portfolio                             |
| **1.5** | Audit About section tone              | Ensure it emphasizes design craft and problem-solving first; engineering second.                                                                            | About reads as "designer who builds" not "engineer who designs" |

### Validation Checkpoint

- [ ] Show revised About/header to 2–3 designers or design mentors. Ask: "What's their primary discipline?" Answer should be unanimous: "Designer."
- [ ] No broken links in portfolio footer or About section.
- [ ] Test on mobile: header/identity is clear at small viewport.

---

## Phase 2: Strengthen Existing Case Studies (Week 2–3)

### Objective

Add visual proof, measurable outcomes, and honest limitations to existing projects. No new projects yet — deepen what's there.

### Tasks

#### 2.1 EDIAQI Redesign

| Element         | Change                                                                                                                                                                                                                          | Success Criteria                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Visuals**     | Add 2–3 high-fidelity UI screenshots (focus on one key screen: the dashboard view or action protocol view). Show final state, not just wireframes.                                                                              | Readers see polished visual design, not just research. Can identify typography, color, spacing choices. |
| **Outcomes**    | Add a "Validation & Iteration" section: "After testing with 4 facility managers, the action protocol was independently identified as the primary feature they'd use daily. Iteration improved form completion from 23% to 67%." | Concrete metrics. Even qualitative data (user quotes) works.                                            |
| **Figma Link**  | Embed or link an interactive Figma prototype of the key flow.                                                                                                                                                                   | Reviewer can see the interactive design.                                                                |
| **Limitations** | Add 1–2 sentences: "This was a 14-week thesis project. The live deployment remains pending; outcomes are based on structured user testing, not production metrics."                                                             | Honest framing. No misrepresentation.                                                                   |

#### 2.2 SuperEgo Redesign

| Element                    | Change                                                                                                                                                                                                                         | Success Criteria                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| **Framing**                | Rewrite the intro to front-load honesty: "SuperEgo is a speculative design exploring dual-process theory in behavior change. It was not validated with users—here's why I think the framing is sound, and what I'd test next." | Readers aren't misled. Reviewers respect intellectual honesty. |
| **Visuals**                | Add 3–4 high-fidelity screens. Show the app UI, the notifications/reminder system, the dashboard.                                                                                                                              | Visual craft is evident.                                       |
| **Design System Thinking** | Add a sidebar: "Design System Decisions." Document 2–3 specific choices: e.g., "Color progression chosen to signal escalation without alarm" or "Typography: sans-serif for clarity, serif for moments of reflection."         | Shows systems thinking and visual intentionality.              |
| **Next Steps**             | Add a "What I'd Test" section: "1. Do users actually use notification frequency controls? 2. Does the reflection prompt reduce impulsive behavior? 3. What happens when streaks break?"                                        | Shows you can think like a researcher, not just a designer.    |

#### 2.3 Mesa Te Club Redesign

| Element                  | Change                                                                                                                                                                                                      | Success Criteria                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Visuals**              | Add 3–5 photos/artifacts from the workshops: participants at whiteboards, artifacts from the co-design sessions, photos of the final space (if exists).                                                     | Visual proof of real facilitation. Readers can see your work in situ. |
| **Participation Ladder** | Expand the diagram: add photos or quotes from participants at each rung.                                                                                                                                    | Vivid, memorable, human.                                              |
| **Outcomes**             | Quantify: "Post-deployment, courtyard usage increased from ~2 events/month to ~8 events/month over 6 months." Or qualitative: "Post-launch survey: 11/15 respondents said the space now 'feels like ours.'" | Measurable behavior change.                                           |
| **Your Role**            | Clarify what you actually designed (e.g., "I led the co-design sessions and designed the visual wayfinding system and seating map").                                                                        | Readers understand your exact contribution.                           |

### Validation Checkpoint

- [ ] Share updated case studies with 2–3 design peers (not mentors). Ask: "Do you believe these outcomes? Do you see the visual design?" Refine if skepticism emerges.
- [ ] Run `npm run build` to ensure no broken image paths or links.
- [ ] Mobile check: images render clearly on small viewport.

---

## Phase 3: Add Visual Design Credibility (Week 4–5)

### Objective

Create a _new_ project or section that demonstrates pure visual/UI design craft.

### Tasks

#### 3.1 Design System or Component Showcase

**Option A (Preferred):** Extract one design system from an existing project and showcase it.

- **What:** Create a dedicated page or case study: "Design System: Facility Operations Dashboard."
- **Content:**
  - Color palette (with rationale: "Primary brand + high-contrast secondary for safety-critical actions")
  - Typography scale (with usage rules)
  - Component library (buttons, cards, modals, tables—6–10 key components)
  - Spacing grid
  - Accessibility notes (contrast ratios, ARIA)
- **Figma Embed:** Link the design system Figma file or embed key screens.
- **Outcome:** "Applied across 12+ screens in the EDIAQI dashboard. Maintained consistency across facility and administrator views."

**Option B:** Visual Redesign of an Existing App

- **What:** Pick a public app (e.g., a sports app, weather app, or portfolio site) and redesign 3–5 key screens.
- **Content:**
  - Problem statement: "Current app has X usability issue. I redesigned it to Y."
  - 3–5 before/after comparisons (side-by-side)
  - Design rationale (2–3 lines per screen)
  - Interactive Figma prototype
- **Outcome:** Shows you can critique and improve existing work; visual craft is on full display.

#### 3.2 Interaction Design & Micro-Interactions

- **What:** Document 2–3 micro-interactions or transitions from one of your projects. Create short videos (5–10 sec) or GIFs.
- **Examples:**
  - Notification state changes (idle → alert → resolved)
  - Form validation feedback
  - Skeleton → loaded state transitions
- **Figma Smart Animate or Loom videos**

| Task                          | Deliverable                          | Success Criteria                                       |
| ----------------------------- | ------------------------------------ | ------------------------------------------------------ |
| Document 3 micro-interactions | Figma prototypes or short video/GIFs | Interaction design is visible; not just static screens |
| Rationale for each            | 1–2 sentences per interaction        | Reviewer understands _why_ motion matters here         |

#### 3.3 Brand/Visual Guidelines Page (Optional)

- **What:** Create a "Design Philosophy" or "Visual Language" page.
- **Content:** Your approach to typography, color, spacing, and how it reflects the portfolio's dual-mode nature.
- **Outcome:** Demonstrates intentionality; editors will notice you don't just pixel-push.

### Validation Checkpoint

- [ ] Share the new design system or redesign with 3–5 designers. Ask: "Do you see visual craft here?" Ratings should be 7+/10.
- [ ] Check Figma embeds render correctly in the built site (`npm run build && npm run preview`).
- [ ] Ask a non-designer friend: "What do you notice about the visual design?" They should articulate clear observations (color, spacing, typography, etc.).

---

## Phase 4: Figma Proficiency & Prototyping (Week 5–6)

### Objective

Demonstrate you can work in Figma at a professional level: design systems, components, variants, auto-layout, prototyping.

### Tasks

| Task    | Description                                            | Success Criteria                                                                                                                                        |
| ------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **4.1** | Embed interactive Figma prototypes in all case studies | Each case study has a clickable Figma prototype embedded (or linked with a clear "Prototype" CTA button).                                               | Reviewer can interact with the design, not just see screenshots.        |
| **4.2** | Create a "Figma Workspace Tour" video (optional)       | 2–3 min Loom walkthrough: showing your design system, components, auto-layout setup, variants.                                                          | Hiring manager sees how you _think_ in Figma, not just what you output. |
| **4.3** | Document design tokens/variables                       | If using Figma variables or CSS custom properties, show how they're structured and applied. Add a "Design Tokens" section to the design system project. | Demonstrates systems thinking and scalability.                          |
| **4.4** | Component breakdowns                                   | In the design system project, show 2–3 components with annotations: usage, states (hover, active, disabled), responsive behavior.                       | Proficiency with component design is clear.                             |

### Validation Checkpoint

- [ ] Click every Figma embed in the built site. All should load and be interactive.
- [ ] Share Figma tour video with 1–2 senior designers. Ask: "Does this show Figma competency?" Should be "Yes."
- [ ] Test prototypes on mobile: interactions should work (tap instead of hover).

---

## Phase 5: Shipped Work & Outcomes Validation (Week 6–7)

### Objective

Add evidence of real-world impact. If no shipped work exists, create a small shipped prototype or side project.

### Tasks

#### 5.1 Audit Existing Projects for Shipped Work

| Question                                         | If "Yes"                                                  | If "No"                                               |
| ------------------------------------------------ | --------------------------------------------------------- | ----------------------------------------------------- |
| Did EDIAQI ship to production after your thesis? | Document: Screenshots, user feedback, metrics.            | Skip; it's research-backed enough.                    |
| Is SuperEgo live anywhere?                       | Document: Link to the app, user testimonials.             | Keep as "speculative"; honesty is valuable.           |
| Is Mesa Te Club still running?                   | Document: Photos of the active space, community feedback. | Update with "Design outcomes validated in 2024–2025." |
| Do you have any freelance/side projects shipped? | Create a case study or add to portfolio.                  | Consider adding a small one.                          |

#### 5.2 Create a "Shipped" Section (If Gap)

**Option:** Build a small interactive side project (4–6 week effort) and document it as a case study.

- **Idea:** A design tool, web app, or interactive experience that demonstrates both design and code chops.
- **Requirement:** Ship it; users can interact with it live.
- **Case Study:** Document the design process, user feedback, and iteration based on real usage.

#### 5.3 Gather Testimonials

- **From:** Professors, collaborators, colleagues, users from your projects.
- **Ask:** "What was Sumit's superpower on this project?" or "What would you hire Sumit for?"
- **Add to:** Portfolio (testimonial carousel or sidebar quote) or LinkedIn.

| Task               | Deliverable                         | Success Criteria                                    |
| ------------------ | ----------------------------------- | --------------------------------------------------- |
| Audit projects     | List of "shipped" proof per project | All outcomes grounded in reality, not speculation   |
| Testimonials (3–5) | Quotes + attributions               | Adds credibility; diverse voices (not just mentors) |

### Validation Checkpoint

- [ ] Show the "Shipped Work" section to 2 product managers. Ask: "Would you trust this person to ship?" Should answer "Yes" or "Probably."
- [ ] Testimonials feel genuine (not corporate-speak); varied in voice and emphasis.

---

## Phase 6: End-to-End Testing & Launch (Week 7–8)

### Objective

Validate the full portfolio with real feedback before declaring "done."

### Tasks

| Task    | Description                | Success Criteria                                                                                                                                       |
| ------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| **6.1** | Full build & audit         | `npm run build && npm run preview`. Check for broken links, missing images, console errors.                                                            | Zero errors; site runs smoothly.                                           |
| **6.2** | Hiring manager review      | Share portfolio with 2–3 designers or design managers at target companies (or similar level). Ask for 1–2 hours feedback.                              | Feedback is constructive; no red flags (e.g., "your design looks junior"). |
| **6.3** | Mobile/accessibility audit | Test on iPhone, Android. Check WCAG 2.1 AA compliance (color contrast, keyboard nav, alt text).                                                        | Site is usable and accessible across devices.                              |
| **6.4** | 30-second skim test        | Show your portfolio to 5 people; give them 30 seconds. Ask: "What does this person do?" Answers should align with "Product Designer" or "UX Designer." | Positioning is immediately clear.                                          |
| **6.5** | Update LinkedIn            | Align headline, add links to updated portfolio, update job description with new positioning.                                                           | LinkedIn and portfolio tell the same story.                                |

### Validation Checkpoint

- [ ] Feedback score: all reviewers rate portfolio 7+/10 (credible, clear positioning, visual craft evident).
- [ ] No blockers for hiring manager navigation (broken links, missing content).
- [ ] Mobile score: usable and no major layout issues.

---

## Success Metrics (End State)

### For Credibility

- [ ] Visual design craft is immediately visible (not buried in wireframes).
- [ ] At least one "Design System" or "Components" showcase project.
- [ ] Interactive Figma prototypes embedded in all case studies.
- [ ] No ambiguity about primary discipline: "Product/UX Designer."

### For Hiring Managers

- [ ] Case studies show measurable outcomes (even qualitative: user feedback, behavior change).
- [ ] At least one project with evidence of shipped work or real-world validation.
- [ ] Figma proficiency demonstrated (variables, components, auto-layout, prototyping).
- [ ] Micro-interactions or motion design visible.

### For Portfolio Quality

- [ ] Mobile responsive and accessible (WCAG 2.1 AA).
- [ ] No broken links or 404s.
- [ ] 30-second positioning test: 5/5 people correctly identify you as a designer.
- [ ] External review: 3+ designers rate portfolio 7+/10 (credible, professional, clear).

---

## Risk Mitigation

| Risk                                                       | Mitigation                                                                                                                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Phase 2–3 updates feel incremental or incomplete.          | Weekly validation checkpoints prevent scope creep. Get feedback early; iterate fast.                                                                                     |
| Figma embeds don't load or are slow.                       | Test embeds in staging (`npm run build && npm run preview`) before going live. Consider performance: use screenshots + click-to-interact model if embeds are laggy.      |
| "Shipped work" section feels weak or nonexistent.          | Allocate Week 6–7 to build a small shipped project _if_ existing work doesn't demonstrate real-world impact. 4–6 week side project is worth it for a credible portfolio. |
| LinkedIn and portfolio tell different stories post-update. | Sync them in Phase 6 explicitly; test with a peer to catch misalignment.                                                                                                 |

---

## Implementation Notes

1. **Do Phases Sequentially:** Phase 1 (identity clarity) must complete before Phase 2–3. Phases 2–3 can run in parallel.
2. **Weekly Checkpoints:** Each phase ends with a validation checkpoint. Share with peers/mentors. Don't move forward if feedback is "uncertain."
3. **Commit to Each Phase:** Once a phase is validated, consider it "locked in." Avoid revisiting Phase 1 after Phase 4 begins.
4. **Documentation:** Track changes in a simple table (date, phase, task, status, feedback). This helps when you're iterating.

---

## Why This Plan Works

✓ **Prioritizes quick wins** (Phase 1) before heavy lifting (Phase 3–5).  
✓ **Focuses on credibility gaps** identified in the analysis (visual design, outcomes, Figma, shipping).  
✓ **Validates incrementally** with real peers/mentors at each checkpoint.  
✓ **Measurable** (success criteria per task; end-state metrics).  
✓ **Testable** (30-second skim test, hiring manager feedback, build/preview audits).  
✓ **Realistic timeline** (6–8 weeks, not 6 months).

---

**Next Step:** Start with Phase 1 this week. Pick 2–3 tasks (e.g., 1.1, 1.2, 1.3) and complete them by EOW. Share your updated header/About section with a designer mentor. Ask: "Does this read as a designer first, engineer second?"
