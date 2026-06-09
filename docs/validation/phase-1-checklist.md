# Phase 1 Checklist: Foundation & Identity Clarity

**Phase Goal:** Fix structural issues and clarify positioning. Remove ambiguity about your primary discipline.

**Timeline:** Week 1–2  
**Validation Checkpoint:** Show revised header/About to 2–3 designers. They should unanimously answer "designer" when asked "What's their primary discipline?"

---

## Task 1.1: Update Portfolio Header/About Section

### What to Do

1. **Find your current header**
   - Locate: `src/components/Header.tsx` or similar
   - Find the main headline/tagline in your portfolio

2. **Rewrite the headline**
   - **OLD**: "Product Designer × Software Engineer" (or similar)
   - **NEW**: "Product Designer, UX Strategist, and Builder"
   - Or: "UX Designer & Product Strategist" (pick one primary identity)

3. **Update About section**
   - Lead with design: "I design products that solve real problems..."
   - Defer engineering: "I also code, which helps me bridge design and implementation."
   - Tone: "designer who builds" not "engineer who designs"

4. **Check mode-aware styling**
   - Ensure header is visible in both engineer and designer modes
   - Use `useMode()` if there are mode-specific header variants

### Success Criteria

- [ ] Headline uses primary discipline first (Designer/Product Designer)
- [ ] No ambiguity: "Product Designer × Engineer" format removed
- [ ] About section emphasizes problem-solving and design thinking first
- [ ] Header renders correctly on mobile and desktop

### Validation

**Manual Review:** Share your revised header/About with a design mentor or peer. Ask:

- "What's their primary discipline?" → Should answer: "Designer" or "Product Designer"
- "Is design the main focus?" → Should answer: "Yes"

---

## Task 1.2: Update Copyright Year

### What to Do

1. **Run the copyright checker**

   ```bash
   node docs/validation/check-copyright.js
   ```

2. **If issues are found:**
   - Find the copyright notice in your code (usually in footer)
   - Search for: `© 2025` (or old year)
   - Replace with: `© 2026`
   - Check files: `src/App.tsx`, `src/components/Layout.tsx`, `src/pages/Index.tsx`

3. **Rebuild and verify**
   ```bash
   npm run build
   npm run preview
   node docs/validation/check-copyright.js
   ```

### Success Criteria

- [ ] Script reports: "✅ Copyright year is correct!"
- [ ] No stale years (2025 → 2026)

---

## Task 1.3: Fix Portfolio PDF Link

### What to Do

**CHOICE A: Restore the PDF**

1. Check if `/public/portfolio/file.pdf` exists
2. If yes, verify it's being served correctly in the build
3. Test: Does `/portfolio/file.pdf` load in your browser preview?

**CHOICE B: Remove the broken link**

1. Find the link in your portfolio code (usually Footer or About section)
2. Remove it entirely, or
3. Replace with a "Resume" or "CV" link if you have a working file

**CHOICE C: Replace with a working file**

1. Create or locate a resume PDF
2. Place it in `/public/`
3. Update the link to point to it

### Success Criteria

- [ ] No 404 errors when clicking the link
- [ ] Either: PDF works, OR link is removed/replaced

### Validation

Run the link checker after your changes:

```bash
npm run build
npm run preview
node docs/validation/check-links.js
```

---

## Task 1.4: Align LinkedIn Headline

### What to Do

1. Open your LinkedIn profile
2. Edit your headline to match your portfolio positioning
   - **NEW**: "Product Designer & UX Strategist | Design Systems | Figma"
   - Or similar, emphasizing design first
3. Ensure LinkedIn and portfolio tell the **same story**

### Success Criteria

- [ ] LinkedIn headline matches portfolio positioning
- [ ] Primary discipline is **Design**, not Engineering
- [ ] No conflicting titles (e.g., "Designer" on portfolio, "Engineer" on LinkedIn)

---

## Task 1.5: Audit About Section Tone

### What to Do

1. **Read your About section out loud**
2. **Check:** Does it read as "designer who builds" or "engineer who designs"?
3. **Revise if needed:**
   - Emphasize: Research, problem-solving, user-centered thinking, design systems
   - Mention: Code/technical skills as an enabling superpower, not the main focus
4. **Get feedback:** Share revised About with 2 people. Ask: "What's my superpower?"
   - Answer should be: "Design thinking" or "Problem-solving" or "User understanding"
   - NOT: "Coding" or "Technical skills"

### Success Criteria

- [ ] About emphasizes design first
- [ ] Engineering is framed as a tool to ship better design
- [ ] No mixed messages (e.g., "I'm 50% designer, 50% engineer")

---

## Phase 1 Validation Checkpoint

### Automated Checks

Run all validation scripts to catch regressions:

```bash
npm run build
npm run preview

# Run all Phase 1 checks
node docs/validation/check-copyright.js
node docs/validation/check-links.js
node docs/validation/check-header-clarity.js
node docs/validation/check-mobile-responsive.js
```

### Manual Peer Review

**Share with 2–3 designers or design mentors:**

1. **Prompt:** "Look at my portfolio header and About section for 30 seconds. What's my primary discipline?"
   - ✅ Good: "You're a designer" or "Product designer"
   - ❌ Bad: "You're an engineer" or "I'm not sure"

2. **Prompt:** "Does my positioning sound like a designer first, engineer second?"
   - ✅ Good: "Yes, clear design focus"
   - ❌ Bad: "No, sounds 50/50" or "Sounds more like an engineer"

3. **Ask:** "Any quick wins to improve clarity?"

### Success Criteria (Checkpoint)

- [ ] All automated scripts pass (no errors)
- [ ] 2–3 peer reviewers agree: "Primary discipline is design"
- [ ] No broken links in footer or About section
- [ ] Header is clear on mobile viewports

---

## What's Next?

Once this checkpoint passes:

- ✅ Move to **Phase 2: Strengthen Existing Case Studies**
- Timing: Week 2–3
- Focus: Add visuals, outcomes, and Figma prototypes to EDIAQI, SuperEgo, and Mesa Te Club

If checkpoint doesn't pass:

- 🔄 Revise header/About based on feedback
- Re-run scripts and peer review
- Don't move to Phase 2 until positioning is crystal clear
