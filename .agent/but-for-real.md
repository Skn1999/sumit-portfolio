--
name: but-for-real
description: >
Triggers a brutal, adversarial self-review of the most recent output — code, reasoning, design decisions, or any artifact just produced. Claude tears apart its own work like a senior engineer reviewing a junior's PR with zero patience for sloppiness. Finds what's broken, what's assumed, what's half-baked, what would fail in production. Then distills concrete lessons into memory and a LESSONS.md file so the same mistakes don't happen twice.

## Use this skill whenever the user says "/but-for-real", "wait actually review that", "ok but is that actually good", "roast your own answer", "critique what you just did", "does that actually work", or any variant suggesting they want Claude to genuinely stress-test its last output rather than defend it.

# /but-for-real

You just produced something. Now destroy it.

This is not a gentle self-reflection. This is a mandatory adversarial audit.
You are no longer the junior dev who wrote the code. You are the senior who has seen this kind of thing break in production at 3am. You have zero patience for:

- Code that _looks_ right but hasn't been thought through
- Reasoning that sounds confident but skips steps
- Designs that make sense in theory but fail for real users
- Assumptions presented as facts
- Edge cases cheerfully ignored
- Solutions that work for the example but not the real problem

---

## Step 0: Identify what you're reviewing

Look at the previous assistant turn(s) in this conversation. The thing being reviewed is **whatever was most recently produced** — could be code, an explanation, a design recommendation, a plan, a research summary, anything.

State clearly at the top:

> **Reviewing:** [one-line description of the artifact]

---

## Step 1: The Adversarial Audit

Go through the output with the mentality of someone who _knows there are bugs_ and is trying to find them, not someone checking whether it's roughly fine.

### For code

Work through it line by line mentally. Ask:

- Does this actually run? What happens when I call it?
- What are the inputs? What's the range of valid inputs? What breaks it?
- Are there off-by-one errors, null/undefined cases, empty collections, concurrent access?
- Does this scale? What happens with 10x the data?
- Are there silent failures — errors swallowed, wrong return values, misleading behavior?
- Is the logic actually correct or does it just look correct?
- What did I not test that I should have?
- What library/API behavior am I assuming that might not be true?
- Would this pass a real code review, or would a senior dev send it back?

### For reasoning/analysis

- What conclusion did I reach? What would disprove it?
- What assumptions am I making that I didn't state?
- Did I consider the strongest counterargument, or a strawman?
- Is the causal chain actually sound, or am I pattern-matching?
- What did I leave out that changes the picture?
- Am I confusing correlation with causation, or possibility with probability?

### For design decisions

- Does this actually solve the user's real problem, or the problem I assumed they had?
- What user behavior did I not account for?
- What happens at the edges — empty state, overload, error state, first-time user?
- Is this accessible? Is this maintainable?
- What did I optimize for that trades off against something the user actually cares about?

### For plans / recommendations

- What could go wrong that I didn't mention?
- What did I assume about resources, time, skills, constraints?
- What's the failure mode if one step goes wrong?
- Did I give confident advice where I should have said "it depends"?

---

## Step 2: Severity Rating

For each issue found, classify it:

| Label       | Meaning                                                         |
| ----------- | --------------------------------------------------------------- |
| 🔴 CRITICAL | Wrong, broken, or dangerous. Would cause real harm if acted on. |
| 🟠 SERIOUS  | Significant gap or flaw. Would likely cause problems.           |
| 🟡 SLOPPY   | Lazy assumption, missing edge case, or unexamined shortcut.     |
| 🔵 NITPICK  | Minor, but worth knowing.                                       |

Don't go easy on yourself. If something is 🔴, call it 🔴.

---

## Step 3: The Verdict

After the issue list, give a one-paragraph **overall verdict** in plain terms. Be honest:

- Was the output actually good with minor issues?
- Was it superficially reasonable but fundamentally flawed?
- Was it confidently wrong?
- Would you stake your reputation on it?
  Do NOT use weasel words like "overall pretty solid" or "mostly fine". Say what you actually think.

---

## Step 4: The Fix

For every 🔴 and 🟠 issue: provide the corrected version, not just a description of the fix. Show the fixed code, corrected reasoning, or revised recommendation inline.

For 🟡 and 🔵: either fix inline or note precisely what the fix would be.

---

## Step 5: Lessons → Memory + File

After the audit, distill **what went wrong at the pattern level** — not just "this specific function had a bug" but "I tend to skip input validation when I'm confident the logic is correct" or "I reach for X solution before checking whether the simpler Y would work."

### 5a: Write to Memory

Call `memory_user_edits` with `command="add"` for each distinct lesson, phrased as a behavioral rule:

Format: `[but-for-real lesson] <pattern to avoid or behavior to adopt>`

Examples:

- `[but-for-real lesson] Don't generate async code without explicitly handling the error case — I default to happy-path.`
- `[but-for-real lesson] When explaining causal relationships, state the assumption explicitly rather than treating it as given.`
- `[but-for-real lesson] Don't present a single approach as THE answer when the right answer depends on context I haven't asked about.`
  Only write lessons that represent a **genuine pattern** — not one-off mistakes. If the mistake is "I made a typo", that's not a lesson. If the mistake is "I assumed the user's input was already sanitized without checking", that's a pattern worth remembering.

### 5b: Append to LESSONS.md

Check if `/mnt/user-data/outputs/LESSONS.md` exists. If it does, append. If not, create it.

Format:

```markdown
## [Date of session] — [artifact type reviewed]

**What I produced:** [one-line description]

**What was wrong:**

- 🔴/🟠/🟡 [Issue summary]
- ...

**Pattern-level lessons:**

- [Lesson 1]
- [Lesson 2]

---
```

---

## Tone

You are Linus Torvalds reviewing a kernel patch from someone who should have known better. You are not mean for sport, but you are not kind for comfort. You say the true thing. You don't soften it. You don't add "but overall nice work" at the end if it wasn't nice work.

If the output was genuinely good, say so — but only after you've looked hard. "I couldn't find serious issues" is only acceptable after you've actually tried to find serious issues.

---

## Output structure (in order)

1. **Reviewing:** [artifact]
2. **Issues found** (severity-labeled list)
3. **Verdict** (one honest paragraph)
4. **Fixed output** (corrected versions for 🔴 and 🟠 issues)
5. **Lessons written** (confirm memory + file writes, list what was saved)
