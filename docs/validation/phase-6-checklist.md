# Phase 6 Checklist: End-to-End Testing & Launch

**Phase Goal:** Comprehensive portfolio audit and validation with real hiring manager feedback before launch.

**Timeline:** Week 7–8  
**Validation Checkpoint:** Portfolio passes all automated checks; 2–3 hiring managers review and rate 7+/10.

---

## Task 6.1: Full Build & Audit

### Automated Checks

Run all validation scripts:

```bash
# Build and preview
npm run build
npm run preview

# Link validation
node docs/validation/check-links.js

# Copyright year
node docs/validation/check-copyright.js

# Accessibility
node docs/validation/check-accessibility.js

# Header clarity
node docs/validation/check-header-clarity.js

# Mobile responsiveness
node docs/validation/check-mobile-responsive.js
```

### Manual Inspection

1. **Browser checks:**
   - Open `http://localhost:5173` (or your preview port)
   - Scan all pages: Home, About, Projects, individual project pages
   - Look for: rendering issues, layout breaks, visual polish

2. **Content checks:**
   - All project case studies present and complete
   - All images load (no missing alt text or broken paths)
   - Figma embeds render correctly
   - Links navigate without errors

3. **Performance:**
   - Page load speed (should be <3 seconds)
   - No console errors (open DevTools: Cmd+Option+J / Ctrl+Shift+J)

### Success Criteria

- [ ] All automated scripts pass (no errors)
- [ ] No broken links or 404s
- [ ] No console errors
- [ ] All images render correctly
- [ ] Figma embeds load without lag

---

## Task 6.2: Hiring Manager Review

### Setup

1. **Create a private share link** (or share your portfolio URL)
2. **Recruit 2–3 reviewers** (ideally UI/Product Designers at target companies, or equivalent level)
3. **Send them this brief:**

---

**Review Request:**

Hi [Reviewer Name],

I'm getting feedback on my portfolio before I start applying for Product/UX Designer roles.

Would you have 1–2 hours to review and share feedback? I'm looking for:

- **First impressions:** Does my positioning come through clearly?
- **Case study credibility:** Do outcomes feel real? Is design craft evident?
- **Gaps:** What's missing or unclear?
- **Vibes:** Would you consider me for a PM/Design role?

Portfolio link: [URL]

No pressure—even rough feedback is helpful!

Thanks,
[Your Name]

---

### Review Prompts (to include or verbally ask)

1. **Clarity (30 seconds):** What does this person do?
   - Target answer: "Designer" or "Product Designer"
2. **Case Study Review:** Pick one project. Is it credible?
   - Target: "Yes, outcomes are believable and design is thoughtful"
3. **Strengths:** What stands out?
   - Target: "User research depth, design systems thinking, honest framing"
4. **Gaps:** What's missing or needs improvement?
   - Target: "Nothing major" or constructive feedback
5. **Hiring:** Would you consider them?
   - Target: "Yes, I'd interview them" or "Strong candidate for [specific role]"

### Success Criteria

- [ ] 2–3 reviewers provide feedback
- [ ] Average rating: 7+/10 (credible, professional, clear)
- [ ] No red flags (e.g., "Design looks junior" or "Positioning is confusing")
- [ ] Feedback is constructive and actionable

---

## Task 6.3: Accessibility Audit (Full)

### WCAG 2.1 AA Compliance Checklist

**Color Contrast:**

- [ ] All text has ≥4.5:1 contrast ratio (normal) or ≥3:1 (large text)
- [ ] Test with: https://webaim.org/resources/contrastchecker/

**Keyboard Navigation:**

- [ ] Tab through entire site; all interactive elements are reachable
- [ ] Focus indicators are visible (outline, highlight, etc.)
- [ ] Links and buttons have clear focus states

**Alt Text & Labels:**

- [ ] All images have meaningful alt text (not "image123")
- [ ] Form inputs have associated labels
- [ ] Buttons have text or aria-label

**Heading Hierarchy:**

- [ ] Headings follow logical order (h1 → h2 → h3, no jumps)
- [ ] At least one h1 per page

**Media:**

- [ ] Videos have captions (if applicable)
- [ ] No auto-play audio or video that can't be stopped

### Tools

- **Automated:** Run script `node docs/validation/check-accessibility.js`
- **Manual:** Chrome DevTools > Lighthouse > Accessibility
- **Professional:** axe DevTools browser extension

### Success Criteria

- [ ] All images have alt text
- [ ] Color contrast meets AA (4.5:1 minimum)
- [ ] Keyboard navigation works throughout
- [ ] Lighthouse accessibility score: 90+

---

## Task 6.4: 30-Second Skim Test

### Process

1. **Find 5 people** (ideally not designers—friends, family, colleagues outside design)
2. **Show them your portfolio** for 30 seconds
3. **Ask:** "What does this person do?"
4. **Record answers**

### Success Criteria

- [ ] 4–5 out of 5 answer: "Designer" or "Product Designer" or similar
- [ ] Answers should NOT be: "Engineer" or "I'm not sure"

### If Most Say "Engineer" or "I'm not sure":

- Go back to Phase 1 and strengthen header/positioning
- Don't launch until this test passes

---

## Task 6.5: Update LinkedIn

### Changes

1. **Headline:** Align with portfolio
   - New: "Product Designer & UX Strategist | Design Systems | Figma"
   - (Should match your portfolio header)

2. **About section:** Ensure it's in sync with portfolio About
   - Lead with design
   - Defer engineering
   - Tone consistent

3. **Featured section:** Pin your best case studies
   - Add links to key projects
   - Figma prototypes or Loom videos
   - Testimonials or press

4. **Experience:** Highlight design work first
   - Add portfolio project details to work descriptions
   - Mention: "Designed [X]" before "Built [X]"

5. **Skills:** Reorder
   - Top: "User Experience Design", "Product Design", "Figma"
   - Then: "Design Systems", "UX Research"
   - Later: "React", "TypeScript" (technical is secondary now)

### Success Criteria

- [ ] LinkedIn headline matches portfolio
- [ ] About section is consistent tone/positioning
- [ ] Featured projects showcase your strongest work
- [ ] Skills reflect designer-first positioning

---

## Phase 6 Validation Checkpoint

### Final Automated Checks

```bash
npm run build
npm run preview

# Run all scripts once more
node docs/validation/check-links.js
node docs/validation/check-copyright.js
node docs/validation/check-accessibility.js
node docs/validation/check-header-clarity.js
node docs/validation/check-mobile-responsive.js

# If all pass, you're clear to launch
```

### Final Manual Review Checklist

- [ ] No broken links or 404s
- [ ] All images load and have alt text
- [ ] Figma embeds work and are interactive
- [ ] Mobile responsive (tested on iPhone and Android)
- [ ] Accessibility: ≥90 on Lighthouse
- [ ] 30-second skim test: 4–5 out of 5 say "Designer"
- [ ] 2–3 hiring managers reviewed: average 7+/10
- [ ] LinkedIn is in sync with portfolio

### Success Criteria (Final Checkpoint)

- [ ] All automated checks pass
- [ ] Accessibility audit complete and WCAG AA compliant
- [ ] 30-second skim test: ≥80% say "Designer"
- [ ] Hiring manager feedback: 7+/10 average, no red flags
- [ ] LinkedIn updated and aligned with portfolio

---

## Launch

Once all checkboxes pass:

1. **Deploy to production:**

   ```bash
   npm run build
   # Push to hosting (Vercel, Netlify, GitHub Pages, etc.)
   ```

2. **Share:**
   - Post on LinkedIn: New portfolio announcement
   - Email design mentors: "Portfolio is live, open to feedback"
   - Update job application links

3. **Track:**
   - Monitor analytics (if applicable)
   - Collect feedback from inbound (hiring managers, recruiters)
   - Iterate based on real-world responses

---

## Post-Launch: Continuous Improvement

**This is not the end.** Continue to:

- Add new projects as you ship them
- Update case studies with new outcomes
- Refresh testimonials
- Iterate design based on user feedback
- Maintain: 2–3 month portfolio refresh cycle

---

## Success Metrics (End State)

### Credibility

- [ ] Visual design craft is immediately visible
- [ ] Design systems thinking is demonstrated
- [ ] Outcomes are measurable and honest
- [ ] Figma proficiency is evident

### Hiring Managers

- [ ] Primary discipline is clear: "Designer"
- [ ] Case studies inspire confidence: "I'd interview them"
- [ ] No red flags or concerns
- [ ] Portfolio differentiates you from other candidates

### Technical

- [ ] Mobile responsive and accessible (WCAG AA)
- [ ] No broken links or 404s
- [ ] Fast load times (<3 seconds)
- [ ] Professional polish throughout

### Positioning

- [ ] Portfolio and LinkedIn tell the same story
- [ ] 30-second test: ≥80% say "Designer"
- [ ] Testimonials reinforce your superpowers
- [ ] Next step is clear: "I'd hire this person"

---

**Congratulations!** You now have a credible, testable, hiring-manager-ready portfolio.

Next: Start applying to roles, sharing with your network, and collecting real-world feedback.
