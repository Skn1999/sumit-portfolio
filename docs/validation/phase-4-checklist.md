# Phase 4 Checklist: Figma Proficiency & Prototyping

**Phase Goal:** Demonstrate you can work in Figma at a professional level (design systems, components, variants, prototyping).

**Timeline:** Week 5–6  
**Validation Checkpoint:** 1–2 senior designers confirm your Figma prototypes and systems thinking are credible.

---

## Task 4.1: Embed Interactive Figma Prototypes

**What:** Every case study (EDIAQI, SuperEgo, Mesa Te Club, Design System) should have an embedded or linked Figma prototype.

**How to add:**

1. Get your Figma file prototype URL (e.g., `https://figma.com/proto/FILE_KEY/...`)
2. In the MDX file, add an "Interactive Prototype" section:

```markdown
## Try the Prototype

[Open Interactive Prototype in Figma](https://figma.com/proto/...)

Or embed inline:

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="600" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F..." allow="fullscreen"></iframe>
```

**Success Criteria:**

- [ ] All case studies have Figma prototype links or embeds
- [ ] Prototypes load and are interactive (click-through flows work)
- [ ] Works on both desktop and mobile (test in preview)

---

## Task 4.2: Create a Figma Workspace Tour Video (Optional)

**What:** A 2–3 min Loom or screen recording showing your design systems, components, auto-layout setup, variants.

**How:**

1. Open your Figma file
2. Record with Loom or similar (Cmd+Shift+5 on Mac for quick clips)
3. Show:
   - Design system organization (pages, libraries, components)
   - Component variants (different states, sizes, interactions)
   - Auto-layout principles
   - Variables or design tokens setup
4. Narrate: Explain your thinking (why this structure, what it enables, etc.)
5. Embed in portfolio or link from a dedicated page

**Success Criteria:**

- [ ] Video is 2–3 minutes max (concise)
- [ ] Shows professional Figma setup
- [ ] Narration explains design systems thinking
- [ ] Viewer understands your approach (optional, but credibility boost)

---

## Task 4.3: Document Design Tokens/Variables

**What:** Explicit documentation of your design tokens or Figma variables (colors, typography, spacing, etc.).

**Where:** Add to your Design System case study or create a new "Design Tokens" page.

**Example:**

```markdown
## Design Tokens

### Colors

**Primary:** #007AFF (Figma variable: color/primary)

- Used for: Call-to-action buttons, key actions
- Contrast ratio: 7.2:1 on white (WCAG AAA)

**Semantic Red:** #DC3545 (Figma variable: color/error)

- Used for: Destructive actions, error states
- Rationale: High contrast, urgency signal

[... continue for all tokens ...]

### Typography

**Display / H1:** Space Mono, 32px, 700 weight

- Used for: Page titles, section headers
- Line height: 1.2

**Body / Paragraph:** Inter, 16px, 400 weight

- Used for: Main content, descriptions
- Line height: 1.5

[... continue for all type sizes ...]

### Spacing

Grid: 8px base unit

- Padding: 8px, 16px, 24px, 32px
- Gaps: 8px (tight), 16px (default), 24px (generous)
```

**Success Criteria:**

- [ ] Design tokens are clearly organized
- [ ] Each token has a use case and rationale
- [ ] WCAG contrast ratios documented (for colors)
- [ ] Figma variable names match (if applicable)

---

## Task 4.4: Component Breakdowns

**What:** In your Design System project, annotate 2–3 key components showing states and usage.

**Example:**

```markdown
## Button Component

### States

[IMAGE: button-states.png]

- **Default:** bg-primary, text-white
- **Hover:** bg-primary-dark (darker shade)
- **Active:** bg-primary-dark + 2px inset shadow
- **Disabled:** bg-gray-300, cursor-not-allowed

### Sizes

- **Small (S):** 8px padding, 12px font
- **Medium (M):** 12px padding, 14px font [default]
- **Large (L):** 16px padding, 16px font

### Responsive

- Mobile: All buttons are Large by default (easier tap targets)
- Desktop: Buttons adapt to context (S/M/L)

### Accessibility

- Minimum tap target: 44x44px
- Keyboard: Tab focus visible, Enter/Space activate
- Color: Not the only differentiator (icon + color + text)
```

**Success Criteria:**

- [ ] 2–3 components documented with states
- [ ] Usage guidelines clear (when to use each size/variant)
- [ ] Responsive behavior documented
- [ ] Accessibility considerations noted

---

## Phase 4 Validation Checkpoint

### Automated Checks

```bash
npm run build
npm run preview

# Test all embeds and links
node docs/validation/check-links.js

# Accessibility check
node docs/validation/check-accessibility.js

# Mobile: test Figma embeds on mobile viewport
```

### Expert Review

**Share with 1–2 senior designers (ideally design systems specialists):**

**Prompts:**

1. "Can you interact with the Figma prototypes? Do they work smoothly?"
   - Target: "Yes, prototypes are responsive and interactive"
2. "Does the design system documentation look professional and complete?"
   - Target: "Yes, tokens are clear, components are well-documented"
3. "What's your impression of this person's Figma skills?"
   - Target: "Professional, organized, systems-thinking evident"

### Success Criteria (Checkpoint)

- [ ] All Figma embeds/links work and are interactive
- [ ] Design tokens clearly documented
- [ ] Component breakdowns show professional thinking
- [ ] Senior designer feedback: "Figma proficiency is evident"
- [ ] Mobile: embeds render without breaking layout

---

## What's Next?

Once checkpoint passes:

- ✅ Move to **Phase 5: Shipped Work & Outcomes Validation**
- Timing: Week 6–7
- Focus: Gather real-world proof (testimonials, shipped work, quantified outcomes)

If checkpoint doesn't pass:

- 🔄 Fix broken embeds or add missing documentation
- Clarify component design thinking
- Re-share with reviewers before moving forward
