# Phase 5 Checklist: Shipped Work & Outcomes Validation

**Phase Goal:** Add evidence of real-world impact. If no shipped work exists, create a small shipped prototype.

**Timeline:** Week 6–7  
**Validation Checkpoint:** Product managers review and confirm credibility. Feedback: "Would you trust this person to ship?"

---

## Task 5.1: Audit Existing Projects for Shipped Work

**What:** Check each of your case studies for evidence of real-world deployment or user impact.

### Audit Template

| Project            | Shipped?                                                                                       | Evidence               | Action                                     |
| ------------------ | ---------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------ |
| **EDIAQI**         | [ ] Thesis deployed live? [ ] User testing with real facility staff? [ ] Outcomes documented?  | [Record your findings] | [Add to portfolio or document limitations] |
| **SuperEgo**       | [ ] Prototype deployed? [ ] Any users tested it? [ ] Speculative (OK if honest)?               | [Record findings]      | [Frame honesty as strength]                |
| **Mesa Te Club**   | [ ] Real community project? [ ] Space still active? [ ] Usage metrics? [ ] Community feedback? | [Record findings]      | [Add photos, metrics, testimonials]        |
| **Other Projects** | [ ] Freelance/side projects? [ ] Apps in production? [ ] Client work?                          | [Record findings]      | [Create new case study if strong]          |

### Action for Each

**If Shipped:**

- Document: Link to live app, GitHub repo, production deployment
- Add: Screenshots, user feedback, usage metrics
- Include: Your role and technical/design decisions

**If Speculative:**

- Be honest upfront: "This is a concept design exploring..."
- Explain why you built it (learning, hypothesis testing, creative exploration)
- Add: "What I'd test" or "What I learned" sections
- Frame as strength: intellectual curiosity, design thinking

**If Partially Shipped:**

- Clarify: What's live vs. prototype vs. academic
- Be transparent: "The core feature is deployed; this part is still conceptual"

---

## Task 5.2: Create a "Shipped" Section (If Gap)

**If you have no shipped work, create a small one.**

### Option: Build a Side Project (4–6 weeks)

**Criteria:**

- Real product or tool (not just a demo)
- Designed + built by you (full ownership)
- Deployed and accessible (live URL or GitHub)
- Gets actual usage (even if small: you, friends, users)
- Case study documenting design process and learnings

**Ideas:**

- **Design tool mini-app:** E.g., a color palette generator, typography scale builder
- **Productivity app:** E.g., task manager, habit tracker, note organizer
- **Interactive experience:** E.g., a portfolio generator, design system showcase
- **Community tool:** E.g., feedback collector, event scheduler for a group

**Process:**

1. Scope small (4–6 weeks solo, not a year-long project)
2. Design it (Figma: lo-fi to hi-fi)
3. Build it (React + TypeScript, using your existing stack)
4. Deploy it (Vercel, Netlify, or similar)
5. Get feedback (from users or friends)
6. Document case study: problem → design → build → outcome

---

## Task 5.3: Gather Testimonials (3–5 people)

**What:** Get quotes from people who've worked with you or benefited from your work.

### Who to Ask

- Professors (from thesis/capstone projects)
- Collaborators (classmates, team members from projects)
- Colleagues (if you've worked professionally)
- Users (from your projects, if applicable)
- Friends (who saw your work, can comment on craft)

### What to Ask

- "What was Sumit's superpower on [Project Name]?"
- "What would you hire Sumit for?"
- "How would you describe Sumit as a designer/teammate?"
- "What was most impressive about this work?"

### Format in Portfolio

Option A: Carousel or sidebar

```markdown
## Testimonials

> "Sumit's greatest strength was synthesizing complex user feedback into clear design
> principles. She moved fast without sacrificing intentionality."
>
> — _Dr. Jane Smith, Thesis Advisor_

> "Working with Sumit on Mesa Te Club was amazing. She facilitated real collaboration
> and created a space where everyone felt heard."
>
> — _Carlos Mendez, Community Participant_
```

Option B: Add one strong quote to each case study

### Success Criteria

- [ ] 3–5 testimonials collected
- [ ] Mix of perspectives (professor, peer, user, colleague)
- [ ] Quotes feel genuine (not corporate-speak)
- [ ] Quotes highlight design thinking, collaboration, or craft

---

## Phase 5 Validation Checkpoint

### Review: Shipped Work

```bash
npm run build
npm run preview

# Check that all project links are valid
node docs/validation/check-links.js
```

### Expert Review: Product Managers

**Share with 2 product managers or senior designers (ideally from companies you're targeting):**

**Prompts:**

1. "Looking at this portfolio, would you trust this person to ship a real product?"
   - Target: "Yes, they have real project experience and understand outcomes"
   - Red flag: "No, everything feels theoretical"
2. "What's your impression of their design process?"
   - Target: "Thoughtful, user-centered, systems-thinking"
3. "Any concerns or gaps?"
   - Target: "No, this looks solid" or constructive feedback

### Success Criteria (Checkpoint)

- [ ] At least one shipped/real-world project clearly documented
- [ ] Outcomes are grounded in reality (not speculative)
- [ ] 3–5 testimonials collected and added to portfolio
- [ ] PM feedback: "Credible, would trust them to ship"
- [ ] All links work; no 404s

---

## What's Next?

Once checkpoint passes:

- ✅ Move to **Phase 6: End-to-End Testing & Launch**
- Timing: Week 7–8
- Focus: Full audit, hiring manager review, deployment preparation

If checkpoint doesn't pass:

- 🔄 Add more proof of shipped work or create a small side project
- Collect more genuine testimonials
- Re-test before moving to Phase 6
