# Phase 2 Checklist: Strengthen Existing Case Studies

**Phase Goal:** Add visual proof, measurable outcomes, and honest framing to your existing 3 case studies.

**Timeline:** Week 2–3  
**Validation Checkpoint:** Share updated case studies with 2–3 design peers. Ask: "Do you believe these outcomes? Do you see polished visual design?"

---

## Overview

You have 3 projects to enhance:

1. **EDIAQI** — Add hi-fi UI, validation data, honest limitations
2. **SuperEgo** — Reframe as speculative, add design system choices, research questions
3. **Mesa Te Club** — Add workshop photos, quantified outcomes, role clarity

Each project lives in `src/content/projects/{slug}/index.mdx`. Edit the MDX file to add new sections.

---

## Task 2.1: EDIAQI Redesign

### File Location

`src/content/projects/ediaqi/index.mdx` (or similar based on your slug)

### Changes to Make

#### 1. Add Hi-Fi UI Screenshots

**Where:** Under "Visual Design" or "Dashboard Overview" section  
**What to add:** 2–3 screenshots showing the final polished UI

- Focus on: Dashboard view, action protocol view, or key screen
- Show: Typography, color palette, spacing, interactive elements
- Not: Wireframes alone (those are fine but need final visuals too)

**Example section:**

```markdown
## Dashboard Design

The final interface uses a clean, high-contrast design system:

- Color system: [describe your primary + secondary colors]
- Typography: [your font choices and rationale]

[IMAGE: dashboard-final-01.png]
[IMAGE: dashboard-final-02.png]
```

#### 2. Add Validation & Iteration Section

**Where:** Before or after "Outcomes" section  
**What to add:** Quantified outcomes from user testing

**Example:**

```markdown
## Validation & Iteration

After testing with 4 facility managers, the action protocol emerged as the most
valuable feature—3 out of 4 independently identified it as something they'd use daily.

Key iteration: Initial form completion was 23%; after simplifying the entry flow,
it improved to 67%.

Testing methodology: Structured interviews (1 hour each) with facility staff.
```

#### 3. Add Figma Prototype Link/Embed

**Where:** Add a "Try the Prototype" section  
**What to add:** Link or embed a clickable Figma prototype

**Example:**

```markdown
## Try the Prototype

[View interactive prototype in Figma](https://figma.com/proto/...)
```

#### 4. Add Honest Limitations

**Where:** New "Project Scope" or "Limitations" section at the end  
**What to add:** Clear, brief framing about the project stage

**Example:**

```markdown
## Project Scope

This was a 14-week thesis project completed in 2024. The live deployment remains
pending. All outcomes are based on structured user testing with facility staff;
they do not represent production metrics or long-term usage data.
```

### Success Criteria

- [ ] 2–3 polished UI screenshots added
- [ ] Measurable outcome (at least one metric or strong qualitative quote)
- [ ] Figma prototype link/embed works
- [ ] Limitations section is honest and clear
- [ ] Images load without path errors (`npm run build && npm run preview`)

---

## Task 2.2: SuperEgo Redesign

### File Location

`src/content/projects/superego/index.mdx` (or similar)

### Changes to Make

#### 1. Reframe the Intro

**Current:** Likely frames SuperEgo as a working app or validated design  
**New:** Front-load honesty

**Example:**

```markdown
# SuperEgo: Behavior Change Through Dual-Process Design

SuperEgo is a _speculative design_ exploring how app design can leverage dual-process
theory to support sustainable behavior change. It was not validated with users, but
here's the design thinking behind it and what I'd test next if given the opportunity.
```

#### 2. Add 3–4 High-Fidelity Screens

**What to add:** Polished UI showing:

- Main app interface
- Notifications/reminder system
- Dashboard or reflection view
- One other key screen (streak view, settings, etc.)

**Example section:**

```markdown
## Visual Design

The interface uses [describe color system, typography, spacing]:

[IMAGE: superego-01-home.png]
[IMAGE: superego-02-notification.png]
[IMAGE: superego-03-dashboard.png]
```

#### 3. Add Design System Sidebar

**Where:** New "Design System Decisions" section  
**What to add:** 2–3 specific design choices with rationale

**Example:**

```markdown
## Design System Decisions

**Color Progression:** The notification colors escalate from calm (blue → yellow → red)
to signal urgency without creating alarm. Research: dual-process theory suggests
gradual escalation reduces desensitization.

**Typography:** Sans-serif (Inter) for clarity and speed of processing; serif accents
for moments of reflection, signaling a shift from fast to slow thinking.

**Spacing:** Generous whitespace around action buttons to prevent accidental taps and
encourage intentional interaction.
```

#### 4. Add "What I'd Test" Section

**Where:** New section at the end  
**What to add:** Research questions you'd investigate

**Example:**

```markdown
## What I'd Test Next

If this design were to be validated, here are the key hypotheses:

1. **Notification Fatigue:** Do users actually use the frequency controls, or do they
   just mute notifications entirely?
2. **Reflection Effectiveness:** Does the reflection prompt reduce impulsive behavior,
   or does it feel intrusive?
3. **Streak Psychology:** What happens when a streak breaks? Do users quit or
   re-engage?
4. **Behavior Outcomes:** After 4 weeks, what's the actual behavior change, if any?
```

### Success Criteria

- [ ] Honest framing: "Speculative" is clear upfront
- [ ] 3–4 high-fidelity UI screenshots
- [ ] Design system decisions documented (2–3 specific choices)
- [ ] Research questions show forward thinking
- [ ] No misrepresentation of validation status

---

## Task 2.3: Mesa Te Club Redesign

### File Location

`src/content/projects/mesa-te-club/index.mdx` (or similar)

### Changes to Make

#### 1. Add Workshop Photos/Artifacts

**Where:** New "Process" or "Co-Design Sessions" section  
**What to add:** 3–5 photos showing:

- Workshop in progress (participants at whiteboards)
- Artifacts created during sessions (sticky notes, sketches, prototypes)
- Photos of the final space (if it exists in the real world)

**Example section:**

```markdown
## Co-Design Process

Over 6 weeks, we ran 4 facilitated workshops with 15 Mesa community members:

[IMAGE: workshop-01-sketching.jpg]
[IMAGE: workshop-02-group-activity.jpg]
[IMAGE: workspace-artifacts.jpg]
[IMAGE: final-space-01.jpg]
```

#### 2. Expand Participation Ladder with Quotes/Photos

**Current:** Likely a diagram showing the 6 rungs  
**New:** Add participant quotes or photos at each level

**Example:**

```markdown
## Participation Ladder

### Level 1: Attendance

"I came because my friend invited me" — _Maria_

[PHOTO: people gathered]

### Level 2: Contribution

"I helped move the chairs and add the plants" — _Juan_

[PHOTO: contribution activity]

[...continue for remaining levels...]
```

#### 3. Add Quantified Outcomes

**Where:** New "Impact" or "Outcomes" section  
**What to add:** Measurable behavior change

**Example options (choose what applies):**

```markdown
## Impact

**Usage increase:** Post-deployment, the courtyard hosted ~2 events/month before the
redesign to ~8 events/month after (6-month window). Estimated 300% increase in usage.

**Community sentiment:** Post-launch survey (15 respondents): 11 said the space now
"feels like ours"; 13 reported increased sense of belonging.

**Engagement:** Average event attendance grew from 5 people to 18 people.
```

Or qualitative:

```markdown
## Impact

Feedback from participants:

- "Before, this felt like a corporate lobby. Now it feels like a living room." — _Ana_
- "I finally feel comfortable inviting friends here." — _Carlos_
- "The space brings us together." — _Group consensus_
```

#### 4. Clarify Your Role

**Where:** New "My Contribution" section early in the project  
**What to add:** Specific, credible description of your work

**Example:**

```markdown
## My Role

I led the co-design process, including:

- Facilitated 4 community workshops (design thinking, ideation, prototyping)
- Synthesized community feedback into design principles
- Designed the visual wayfinding system and seating layout
- Coordinated implementation with facilities

Collaboration: [other team members' roles]
```

### Success Criteria

- [ ] 3–5 workshop/space photos added
- [ ] Participation ladder has quotes/photos at each level
- [ ] Quantified outcomes (usage increase, engagement, or strong qualitative feedback)
- [ ] Your specific role is crystal clear
- [ ] Images load correctly (test with `npm run build && npm run preview`)

---

## Phase 2 Validation Checkpoint

### Automated Checks

```bash
npm run build
npm run preview

# Check for broken image paths and links
node docs/validation/check-links.js

# Check accessibility (alt text on images)
node docs/validation/check-accessibility.js

# Check mobile rendering
node docs/validation/check-mobile-responsive.js
```

### Manual Peer Review

**Share updated case studies with 2–3 design peers (not mentors—real peers):**

1. **EDIAQI:** "Do you believe these outcomes? Can you see the visual design polish?"
   - ✅ Good: "Yes, the metrics are credible and the UI looks professional"
   - ❌ Bad: "Outcomes feel vague" or "Still looks too wireframe-y"

2. **SuperEgo:** "Is it clear this is speculative? Do you understand the design thinking?"
   - ✅ Good: "Yes, you were honest about validation, and the design system choices make sense"
   - ❌ Bad: "It feels like you're claiming it works" or "No design rationale visible"

3. **Mesa Te Club:** "Can you see the real co-design work? Do the outcomes seem credible?"
   - ✅ Good: "Yes, this feels like a real community project with real impact"
   - ❌ Bad: "Still feels abstract" or "Hard to see what you actually designed"

### Success Criteria (Checkpoint)

- [ ] All automated scripts pass (no broken links or accessibility issues)
- [ ] 2–3 design peers agree: "Outcomes are credible"
- [ ] 2–3 design peers agree: "I can see the visual/design craft"
- [ ] All images load and render correctly on mobile
- [ ] Honest framing on limitations and validation status is clear

---

## What's Next?

Once this checkpoint passes:

- ✅ Move to **Phase 3: Add Visual Design Credibility**
- Timing: Week 4–5
- Focus: Create a new Design System or Component Showcase project

If checkpoint doesn't pass:

- 🔄 Iterate based on peer feedback
- Add more screenshots, clearer outcomes, stronger role clarity
- Re-test with peers
- Don't move to Phase 3 until case studies feel credible and visually polished
