# Task: EDIAQI Case Study Restructure & Integration

**Task Name:** EDIAQI Case Study Restructure & Integration  
**Target Project:** `src/content/projects/ediaqi-decision-support-system/`  
**Target MDX File:** `src/content/projects/ediaqi-decision-support-system/index.mdx`  
**Reference Source:** `src/content/projects/ediaqi-decision-support-system/restructure.md`  

---

## 1. Context & Objective

Integrate the restructured content from `restructure.md` into `src/content/projects/ediaqi-decision-support-system/index.mdx`. 

Ensure the case study strictly follows:
1. **The 6-Part Benchmark Framework** (`.agent/benchmark-framework.md`)
2. **The Portfolio UI Building Instructions** (`.agent/ui-building-instructions.md`)

---

## 2. Specific Requirements

1. **6-Part Structure**:
   - `01 // THE CHALLENGE` (32 NetPID sensors, 12+ parameters, passive telemetry vs. active behavior bottleneck).
   - `02 // MY ROLE` (Horizon Europe EDIAQI Consortium, Deda Next engineering, Product Designer/Researcher bridge role).
   - `03 // WHAT WORKED vs. WHAT DIDN'T` (30 Heuristic Usability issues audit, Scannable grid of ❌ What Didn't Work vs. ✅ What Worked).
   - `04 // THE SOLUTION` ($2 \times 2$ Mixed Factorial Study table with $N=200$ participants, 5-State Ambient Tablet Display visual flowchart, Dashboard V2 architecture, research quote cards).
   - `05 // KEY INSIGHTS` (4 prominent 💡 insight callout blocks including disproved progressive disclosure hypothesis).
   - `06 // IMPACT & LESSONS` (Deliverables summary, color-coded status badges for successes/compromises, +3 Months Lego-block Roadmap).

2. **UI Rules Enforcement**:
   - Format qualitative quotes as standout `[!IMPORTANT]` callout cards with 💬 icons.
   - Use color-coded status badges for retrospective tradeoffs (Green = Major Success, Amber = Scope Compromise).
   - Render 5-state transitions visually as flowcharts rather than text lists.

3. **Memory & Build Verification**:
   - Run `npm run build` to confirm 0 compilation errors.
   - Update `.agent/progress.md` and `.agent/learnings.md`.

---

## 3. Acceptance Criteria

- `src/content/projects/ediaqi-decision-support-system/index.mdx` updated cleanly.
- `npm run build` succeeds cleanly.
- `.agent/progress.md` and `.agent/learnings.md` updated with completed entries.
