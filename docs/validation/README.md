# Portfolio Validation & Improvement Framework

This directory contains testable scripts, checklists, and guidance for improving your portfolio across 6 phases.

---

## Quick Start

### 1. Choose Your Agent

When working on portfolio improvements, invoke the specialized agent:

```
/portfolio-improvement
```

(Available at user level: `~/.config/Code/User/prompts/portfolio-improvement.agent.md`)

### 2. Select Your Phase

You're in one of 6 phases (Week 1–8):

| Phase | Focus                                                      | Duration | Checklist                                    |
| ----- | ---------------------------------------------------------- | -------- | -------------------------------------------- |
| 1     | Identity clarity, positioning, copyright, broken links     | Week 1–2 | [phase-1-checklist.md](phase-1-checklist.md) |
| 2     | Strengthen case studies: add visuals, outcomes, prototypes | Week 2–3 | [phase-2-checklist.md](phase-2-checklist.md) |
| 3     | Add design system or component showcase                    | Week 4–5 | [phase-3-checklist.md](phase-3-checklist.md) |
| 4     | Figma proficiency: embed prototypes, document tokens       | Week 5–6 | [phase-4-checklist.md](phase-4-checklist.md) |
| 5     | Shipped work & outcomes validation, testimonials           | Week 6–7 | [phase-5-checklist.md](phase-5-checklist.md) |
| 6     | Full audit, hiring manager review, launch prep             | Week 7–8 | [phase-6-checklist.md](phase-6-checklist.md) |

### 3. Run Validation Scripts

After any code change, run relevant scripts to catch regressions:

```bash
# Link checking
node docs/validation/check-links.js

# Copyright year
node docs/validation/check-copyright.js

# Accessibility (WCAG 2.1 AA)
node docs/validation/check-accessibility.js

# Header clarity (30-second positioning test)
node docs/validation/check-header-clarity.js

# Mobile responsiveness
node docs/validation/check-mobile-responsive.js
```

### 4. Follow the Checklist

Open the checklist for your current phase:

- Clear, actionable tasks
- Success criteria for each task
- Validation checkpoint at the end
- Built-in script commands

---

## Validation Scripts

All scripts are Node.js; run after `npm run build && npm run preview`.

### check-links.js

**Audits broken links, 404s, and file paths**

```bash
node docs/validation/check-links.js
```

- Scans `dist/` for missing files
- Checks critical portfolio links (index.html, 404.html, robots.txt)
- Reports: "✅ All links are valid!" or lists broken links
- Exit code: 0 (pass) or 1 (fail)

### check-copyright.js

**Verifies copyright year matches current year**

```bash
node docs/validation/check-copyright.js
```

- Searches for `© YYYY` patterns in source and built files
- Reports: "✅ Copyright year is correct!" or lists mismatches
- Fix: Update copyright to current year in source code
- Exit code: 0 (pass) or 1 (fail)

### check-accessibility.js

**Basic WCAG 2.1 AA compliance checks**

```bash
node docs/validation/check-accessibility.js
```

- Checks: alt text on images, button/link labels, heading hierarchy
- Reports: critical issues (must fix) and warnings (should review)
- Example: Missing alt text, inaccessible buttons, skipped heading levels
- Exit code: 0 (no critical) or 1 (critical issues found)

### check-header-clarity.js

**Validates 30-second positioning test**

```bash
node docs/validation/check-header-clarity.js
```

- Extracts: page title, meta description
- Analyzes: designer vs. engineer keyword balance
- Reports: positioning analysis and manual review prompts
- Suggests: Have 5 people look at your header for 30 seconds and ask "What do you do?"
- Exit code: 0 (pass) or 1 (needs work)

### check-mobile-responsive.js

**Tests responsive breakpoints and mobile usability**

```bash
node docs/validation/check-mobile-responsive.js
```

- Checks: viewport meta tag, CSS media queries, Tailwind responsive classes
- Analyzes: button/link sizing (touch targets should be ≥44px)
- Reports: responsive configuration and sizing issues
- Exit code: 0 (pass) or 1 (issues)

---

## Phase Checklists

Each checklist is a **guided, step-by-step implementation guide** for its phase.

### Format

- **Phase Goal:** What you're trying to accomplish
- **Timeline:** How long this phase typically takes
- **Tasks:** Numbered, actionable tasks with file locations and code examples
- **Success Criteria:** Checkboxes to confirm each task is done
- **Validation Checkpoint:** Automated scripts + manual review prompts
- **What's Next:** Which phase to move to when checkpoint passes

### How to Use

1. **Read the checklist for your phase**
   - Understand the goal
   - Review all tasks
2. **Work through tasks sequentially**
   - Make code changes
   - Run validation scripts after each change
   - Test locally (`npm run build && npm run preview`)
3. **Complete the validation checkpoint**
   - Run all relevant automated scripts
   - Get peer/mentor feedback using the review prompts
   - Confirm all checkboxes before moving to next phase

### Example Workflow for Phase 1

```bash
# 1. Read the checklist
cat docs/validation/phase-1-checklist.md

# 2. Complete Task 1.1 (update header/About)
# - Edit src/components/Header.tsx
# - Edit src/pages/Index.tsx (About section)
# - Rebuild

npm run build
npm run preview

# 3. Run Task 1.2 (copyright check)
node docs/validation/check-copyright.js

# 4. Complete remaining tasks (1.3, 1.4, 1.5)
# - Fix PDF link
# - Update LinkedIn
# - Refine About tone

# 5. Run full validation checkpoint
node docs/validation/check-copyright.js
node docs/validation/check-links.js
node docs/validation/check-header-clarity.js
node docs/validation/check-mobile-responsive.js

# 6. Get peer feedback (from checklist prompts)
# - Share with 2–3 designers
# - Ask: "What's their primary discipline?"
# - Refine based on feedback

# 7. Once checkpoint passes, move to Phase 2
```

---

## Key Files

| File                                         | Purpose                                   |
| -------------------------------------------- | ----------------------------------------- |
| [phase-1-checklist.md](phase-1-checklist.md) | Identity, copyright, links, LinkedIn      |
| [phase-2-checklist.md](phase-2-checklist.md) | Strengthen EDIAQI, SuperEgo, Mesa Te Club |
| [phase-3-checklist.md](phase-3-checklist.md) | Add design system or component showcase   |
| [phase-4-checklist.md](phase-4-checklist.md) | Figma proficiency, prototypes, tokens     |
| [phase-5-checklist.md](phase-5-checklist.md) | Shipped work, outcomes, testimonials      |
| [phase-6-checklist.md](phase-6-checklist.md) | Full audit, hiring manager review, launch |
| [check-\*.js](.)                             | Automated validation scripts              |
| [README.md](README.md)                       | This file                                 |

---

## Rules of Thumb

1. **Do phases sequentially.** Phase 1 must complete before Phase 2. Phases 2–3 can run in parallel after Phase 1.
2. **Validate incrementally.** Don't wait until the end to check for regressions. Run scripts after every task.
3. **Lock in each phase.** Once a checkpoint passes, move forward. Avoid revisiting completed phases.
4. **Get external feedback.** Don't rely only on automated scripts. Peer/mentor review is essential.
5. **Be honest.** If outcomes are speculative, say so. If work is incomplete, be clear. Honesty builds credibility.

---

## Integration with the Agent

The **portfolio-improvement agent** (`portfolio-improvement.agent.md`) is pre-configured to work with this framework:

- Knows about all validation scripts (can invoke them for you)
- Understands project structure (modes, MDX, components, contexts)
- Familiar with phases and checkpoints
- Can help with code changes, validation, and peer feedback gathering

**Invoke it with:**

```
/portfolio-improvement
```

Or ask it directly in chat:

- "I'm starting Phase 2. Let's strengthen the EDIAQI case study."
- "Run Phase 1 validation and tell me what needs fixing."
- "Help me implement Task 3.1: Design System Showcase."

---

## FAQ

**Q: What if I fail a validation checkpoint?**
A: Iterate. Review feedback, make changes, re-run scripts, and get peer feedback again. Don't move forward until the checkpoint passes.

**Q: Can I skip a phase?**
A: No. Each phase builds on the previous one. Skipping will leave gaps that hiring managers notice.

**Q: How long is this really?**
A: 6–8 weeks if you follow the timeline and keep focus. Faster if you work in parallel (Phases 2–3) or have existing drafted content.

**Q: What if I don't have shipped work for Phase 5?**
A: Create a small shipped project (4–6 weeks) or document your academic/thesis work honestly (as research, not production). Honesty is credible.

**Q: Can I customize the scripts?**
A: Yes! The scripts are in Node.js and are meant to be adapted. If you need different checks or thresholds, modify them to match your portfolio's needs.

**Q: How do I know when I'm "done"?**
A: When Phase 6 checkpoint passes: all automated checks pass, 2–3 hiring managers rate 7+/10, and no red flags emerge.

---

## Contact & Feedback

This framework was created based on portfolio analysis in `docs/analysis-rundown.md`. If you have feedback on the framework, checklists, or scripts, document it and iterate.

---

**Version:** 1.0  
**Last Updated:** 2026-06-08  
**Status:** Ready for Phase 1 kickoff
