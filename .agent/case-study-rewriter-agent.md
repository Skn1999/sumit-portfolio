# Case Study Rewriter Agent

Use this agent when executing tasks specifically designed to restructure, rewrite, or upgrade portfolio case studies using the Recruiter Benchmark Framework and Portfolio UI Building Instructions.

---

## Invocation Pattern

The agent is invoked with a specific task file path (e.g., from `tasks/case-studies/`):

```text
Run .agent/case-study-rewriter-agent.md on tasks/case-studies/task_ediaqi_case_study_rewrite.md
```

---

## Mission

Rewrite and restructure a portfolio case study located in `src/content/projects/<project-slug>/` into an authoritative, data-backed narrative.

Each case study must strictly integrate:
1. **Storytelling Framework**: Follow the 6-part Recruiter Benchmark Framework (`.agent/benchmark-framework.md`).
2. **Portfolio UI Language**: Enforce visual presentation rules (`.agent/ui-building-instructions.md`).
3. **Memory Update**: Append completed progress to `.agent/progress.md` and lessons learned to `.agent/learnings.md`.

---

## Required Context Files

Before modifying any code, the agent MUST read:

1. **Target Task File**: The task file passed in `tasks/case-studies/*.md`.
2. **Storytelling Framework**: `.agent/benchmark-framework.md` (6-part sequence flow & section architecture).
3. **Portfolio UI Rules**: `.agent/ui-building-instructions.md` (State Flowcharts, Standout Quotes, Color-Coded Status Badges, Lego-Block Roadmaps, CTA Buttons).
4. **Project Memory**: `.agent/progress.md` and `.agent/learnings.md`.
5. **Target Project Content**: The target MDX file in `src/content/projects/<project-slug>/index.mdx` (and `restructure.md` if available).

---

## Execution Workflow

1. **Task Reading & Scope Analysis**:
   - Read the task file completely.
   - Identify target project path (e.g., `src/content/projects/ediaqi-decision-support-system/`).

2. **Git Branch & Staging Check**:
   - Check `git status`. Ensure working directory is clean.
   - **CRITICAL RULE**: NEVER make edits directly on `main`. ALWAYS switch to the `staging` branch first and pull latest changes (`git checkout staging && git pull origin staging`).
   - Create a feature branch off `staging`: `git checkout -b feature/case-study-<project-slug>`.

3. **Case Study Structuring Rules**:
   - Organize the case study into the 6 universal benchmark sections:
     - **01 // THE CHALLENGE** (Metric Hook & Structural Bottleneck).
     - **02 // MY ROLE** (Team Composition & Bridge Positioning).
     - **03 // WHAT WORKED vs. WHAT DIDN'T** (Scannable Grid & Audit Breakdown).
     - **04 // THE SOLUTION** (System Architecture, Quantitative/Qualitative Validation, & Prototypes).
     - **05 // KEY INSIGHTS** (3-4 prominent 💡 insight callout blocks).
     - **06 // IMPACT & LESSONS** (Final deliverables, color-coded status badges for successes/tradeoffs, Lego-block Roadmap).

4. **UI Presentation Enforcement (`.agent/ui-building-instructions.md`)**:
   - **State Flowcharts**: Render state machine transitions visually instead of plain ordered text lists.
   - **Quotes**: Format research quotes in visual `[!IMPORTANT]` alert cards with 💬 icons and insight subtitles.
   - **Retrospective Badges**: Use color-coded status tags (Green for Success, Amber for Compromise, Red for Failure/Bottleneck).
   - **Roadmaps**: Present +3 Months strategy as modular "Lego block" visual components.
   - **Prototype CTAs**: Use styled CTA button links for Figma/Notion prototypes.

5. **Validation**:
   - Verify MDX syntax integrity, frontmatter properties, and image path components (`ProjectImageAsset`).
   - Run build check (`npm run build`).

6. **Memory & Git Commit**:
   - Update `.agent/progress.md` with completed task details.
   - Update `.agent/learnings.md` with new insights or friction points.
   - Create a clean git commit with message: `feat(case-study): restructure <project-slug> case study`.

---

## Progress Update Requirements

Append a new dated entry to `.agent/progress.md`:
- Task file path
- Status: `Completed`
- Changed files
- Verification status (`npm run build` result)

---

## Learnings Update Requirements

Append a new dated entry to `.agent/learnings.md`:
- Task file path
- Key structural or UI learnings during conversion
- Instructions for future case study rewrites

---

## Final Output Summary

```text
Completed <task filename>.

Changed:
- src/content/projects/<project-slug>/index.mdx: Restructured using Recruiter Benchmark Framework and UI Instructions.

Verified:
- npm run build: Clean build (0 errors).

Progress & Memory:
- Updated .agent/progress.md
- Updated .agent/learnings.md
```
