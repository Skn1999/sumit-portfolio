# Portfolio Improvement Framework — Quick Reference Card

**Print this. Pin it. Reference it daily.**

---

## The 6 Phases (Week 1–8)

| Phase | What                                     | How Long | Key Checkpoint                                          |
| ----- | ---------------------------------------- | -------- | ------------------------------------------------------- |
| **1** | Identity clarity, positioning, copyright | Week 1–2 | Peers say "Designer" when asked "What do they do?"      |
| **2** | Visuals, outcomes, case study depth      | Week 2–3 | Peers say "Outcomes look credible & design is polished" |
| **3** | Design system or component showcase      | Week 4–5 | 3+ designers rate 7+/10; visual craft evident           |
| **4** | Figma prototypes, design tokens          | Week 5–6 | Senior designer confirms Figma proficiency              |
| **5** | Shipped work, testimonials, outcomes     | Week 6–7 | PM feedback: "Would hire"                               |
| **6** | Full audit, hiring manager review        | Week 7–8 | All scripts pass; 2–3 HMs rate 7+/10; launch ready      |

---

## Quick Commands

### After any code change:

```bash
npm run build && npm run preview
```

### Run all validations:

```bash
node docs/validation/check-links.js
node docs/validation/check-copyright.js
node docs/validation/check-accessibility.js
node docs/validation/check-header-clarity.js
node docs/validation/check-mobile-responsive.js
```

### Invoke the agent:

```
/portfolio-improvement
```

---

## Phase 1 (Week 1–2) — Start Here

**5 Tasks:**

1. Update header/About (designer first)
2. Fix copyright year (2025 → 2026)
3. Fix/remove broken PDF link
4. Align LinkedIn headline
5. Audit About section tone

**Run validation:**

```bash
node docs/validation/check-links.js
node docs/validation/check-copyright.js
node docs/validation/check-header-clarity.js
```

**Get peer feedback:**

- Show 5 people for 30 seconds
- Ask: "What do they do?"
- Target: 4–5 say "Designer"

**Checkpoint:** ✓ Pass when all scripts pass + peers confirm

---

## Validation Scripts (One-Liner Summaries)

| Script                       | What It Does                     | Target                      |
| ---------------------------- | -------------------------------- | --------------------------- |
| `check-links.js`             | Finds broken links & 404s        | Exit 0 (no errors)          |
| `check-copyright.js`         | Verifies year = 2026             | Exit 0 (correct)            |
| `check-accessibility.js`     | WCAG 2.1 AA compliance           | Exit 0 (no critical issues) |
| `check-header-clarity.js`    | Designer vs. Engineer keywords   | Exit 0 (designer-first)     |
| `check-mobile-responsive.js` | Mobile viewport & responsiveness | Exit 0 (responsive)         |

---

## Key Files

| File                                                         | Purpose                     | When               |
| ------------------------------------------------------------ | --------------------------- | ------------------ |
| `/docs/validation/README.md`                                 | Framework overview          | Start here         |
| `/docs/validation/phase-N-checklist.md`                      | Detailed phase guide        | During each phase  |
| `/docs/validation/check-*.js`                                | Automated validation        | After every change |
| `/docs/FRAMEWORK-SUMMARY.md`                                 | This implementation summary | Reference          |
| `~/.config/Code/User/prompts/portfolio-improvement.agent.md` | Reusable agent              | Any workspace      |

---

## Decision Tree: What Should I Do?

```
Q: Where am I in the plan?
→ Read docs/validation/phase-N-checklist.md for your phase

Q: Did I just make a code change?
→ Run: npm run build && npm run preview
→ Then run: node docs/validation/check-*.js (relevant)

Q: Did a validation fail?
→ Fix the issue, rebuild, re-run the script

Q: Does a checkpoint need manual review?
→ Use the prompts in the checklist
→ Share with 2–3 peers/mentors
→ Collect feedback; iterate if needed

Q: Ready to move to the next phase?
→ Checkpoint must pass (all scripts + peer review)
→ Then read the next phase's checklist

Q: Need help implementing a phase?
→ Invoke: /portfolio-improvement
→ Ask agent for guidance
```

---

## Peer Review Template (Copy/Paste)

**For Phase 1:**

```
Hi [Name], I'm improving my portfolio and need feedback.
Can you spend 30 seconds looking at my header/About section?
Then tell me: What's my primary discipline?
(I'm aiming for the answer to be "Designer" or "Product Designer")

Portfolio: [URL]
```

**For Phase 2–3:**

```
Hi [Name], quick design review needed.
Looking at my [EDIAQI/SuperEgo/Mesa Te Club] case study,
do you believe the outcomes and see polished visual design?

Portfolio: [URL]
```

**For Phase 6 (Hiring Manager Review):**

```
Hi [Name], I'd love your thoughts on my portfolio before I start applying.
Would you have 1–2 hours to review?

I'm looking for:
- Does my positioning come through (Designer, not Engineer)?
- Are case studies credible?
- What's missing?
- Would you interview me?

Portfolio: [URL]
```

---

## Red Flags (Stop & Iterate)

- [ ] Script exits with code 1 (error) → Fix before moving on
- [ ] Peers say "I'm not sure what you do" → Clarify header/positioning (Phase 1)
- [ ] Peers say "Looks like wireframes" → Add polished visuals (Phase 2–3)
- [ ] Peers say "Outcomes are vague" → Add metrics or honest limitations (Phase 2)
- [ ] Peers rate <7/10 → Iterate before moving to next phase
- [ ] Hiring manager feedback: "Positioning unclear" → Go back to Phase 1

---

## Green Lights (You're Good to Continue)

- ✅ All scripts pass (exit 0)
- ✅ Checkpoint peer review: 3+ agree on success criteria
- ✅ No red flags in feedback
- ✅ Ready to move to next phase checklist

---

## Weekly Check-In Template

**Every Friday (or end of phase):**

```
Phase: [#]
Tasks completed: [List]
Validation status: [Pass/Fail]
Next phase readiness: [Yes/No]
Blockers: [None/List]
Peer feedback collected: [Yes/No]
Ready to move forward: [Yes/No]
```

---

## Success Looks Like

**End of Phase 1:**

- Peers unanimously say "Designer"
- Copyright is 2026
- No broken links
- LinkedIn matches portfolio

**End of Phase 2:**

- Peers say "Outcomes are credible"
- Peers say "Visual design is polished"
- All case studies have images, outcomes, Figma links
- All images have alt text

**End of Phase 3:**

- Design system or component showcase is live
- 3+ designers rate 7+/10
- Visual craft is immediately visible

**End of Phase 4:**

- All Figma prototypes embedded and interactive
- Design tokens documented
- Component states documented

**End of Phase 5:**

- At least one shipped project documented
- 3–5 genuine testimonials added
- Outcomes are grounded in reality

**End of Phase 6:**

- All scripts pass
- All accessibility checks pass
- 2–3 hiring managers rate 7+/10
- Portfolio ready to launch
- LinkedIn is in sync

---

## Don't Forget

- [ ] Do phases sequentially (don't skip)
- [ ] Validate after every change (not just at end)
- [ ] Get peer feedback (don't rely only on scripts)
- [ ] Be honest (speculative work → say so; pending deployment → be clear)
- [ ] Move fast (1–2 weeks per phase; iterate quickly)
- [ ] Document outcomes (metrics beat vague claims)
- [ ] Share your progress (LinkedIn, mentors, network)
- [ ] Iterate continuously (portfolio is never truly "done")

---

**Print this card. Pin it to your monitor. Reference it daily.**

**Last Updated:** 2026-06-08  
**Status:** Ready for Phase 1 🚀
