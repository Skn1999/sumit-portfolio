# Task 037: Gosta Labs Case Study Integration

**Task Name:** Gosta Labs Case Study Integration

**Context for the Task:**
Integrate a new case study for **Gosta Labs** under `src/content/projects/gosta-labs/index.mdx`. The production-ready markdown copy is available at `research/gosta-labs.md`. Project assets (cover illustration `cover.svg` and the final strategy presentation `final-presentation.pdf`) are stored in `src/content/projects/gosta-labs/`.

---

## 1. File Structure & Assets

- **Target MDX File:** `src/content/projects/gosta-labs/index.mdx`
- **Asset Directory:** `src/content/projects/gosta-labs/`
- **Cover Image:** `cover.svg`
- **Presentation PDF:** `final-presentation.pdf`

---

## 2. Frontmatter Specification

```yaml
---
slug: "gosta-labs"
title: "Gosta Labs: Go-to-Market & Internal Development Strategy"
tagline: "Formulating a CEE market entry strategy and a 3-year internal development roadmap for an AI clinical documentation startup."
date: "2025-06-30"
type: "engineering"
subCategory: "ai-data"
featured: true
cover:
  filename: "cover.svg"
  alt: "Gosta Labs Go-to-Market and Internal Development Strategy cover illustration"
tech:
  - "Internal Development"
  - "Organisational Strategy"
  - "Market Research"
  - "Stakeholder Interviews"
  - "AI Clinical Workflows"
metric: "Dual-track strategy & 3-year internal development roadmap presented to Gosta Labs' CEO and Executive Board"
summary: "A strategic consulting initiative for Gosta Labs, an AI-powered clinical documentation assistant startup. Designed a CEE market entry plan across Poland, Czechia, and Romania alongside a 3-year internal development and resourcing roadmap to scale beyond Finland."
roles:
  - "Student Consultant"
  - "Internal Development Lead"
  - "Organizational Strategy"
  - "Leadership Research"
order: 4
draft: false
---
```

---

## 3. MDX Section Structure & Blueprint

Follow the 4-zone numbered section structure (`01 CONTEXT`, `02 PROBLEM`, `03 APPROACH`, `04 IMPACT`):

### 1. Section 1: `## 01 // CONTEXT`
- **Background:** Gosta Labs develops an AI-powered clinical documentation assistant that transcribes and summarizes doctor-patient conversations in real time to reduce physician paperwork burden.
- **Context:** Executed as part of the *Global Business in the Digital Age* program (Aalto University & Gosta Labs). After securing 11 healthcare customers and growing revenue in Finland, the startup needed an international expansion strategy and internal operational upgrade.
- **My Role:** As Student Consultant, led the **Internal Development & Operational Readiness** track: organizational readiness assessment, conducting qualitative CEO interviews, authoring the 3-year roadmap, and co-presenting final recommendations to the executive board.

### 2. Section 2: `## 02 // PROBLEM & CHALLENGE`
- **External Market Barriers:** Navigating different national healthcare regulations, local language models, hospital procurement systems, and varying levels of Electronic Health Record (EHR) maturity across target CEE countries (Poland, Czechia, and Romania).
- **Internal Operational Gaps:** Lack of formalized role definitions, competence mappings, standardized sales-to-product feedback loops, and structured resource allocation models needed to scale beyond Finland.

### 3. Section 3: `## 03 // APPROACH & KEY WORK`
- **`### CEE Go-to-Market Strategy`**: Analyzed market entry opportunities across Poland, Czechia, and Romania. Evaluated local hospital procurement workflows, competitor landscapes, EHR integration paths, and flexible pricing models.
- **`### Competency & Hiring Plan`**: Built a 12–24 month competency mapping and hiring plan addressing talent gaps, role clarity, and internal mobility paths for upcoming regional teams.
- **`### Operational Process Formalization`**: Documented core internal workflows and established structured feedback loops between sales and product development teams.
- **`### Scalable Resource Allocation`**: Designed a quarterly resource planning model aligning workload distribution, team hiring, and budget allocation with GTM rollout milestones.

### 4. Section 4: `## 04 // IMPACT & OUTCOME`
- **Strategy Handover:** Delivered a dual-track strategy combining a CEE market entry plan with a 3-year internal development roadmap to Gosta Labs' CEO and executive board.
- **Operational Blueprint:** Provided a structured hiring, process, and resourcing roadmap to support international expansion without disrupting existing Finnish operations.
- **PDF Presentation Artefact Link:** Include a prominent action button linking directly to the imported PDF:
  ```tsx
  import finalPresentationPdf from "./final-presentation.pdf";

  <div className="my-8 flex justify-center">
    <a
      href={finalPresentationPdf}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-mono text-xs text-ink-primary hover:text-ink-primary/70 uppercase tracking-widest font-semibold px-5 py-3 rounded-xl border border-paper-border bg-paper-card shadow-sm hover:border-ink-primary/40 transition-all"
    >
      📄 View Final Strategy Presentation (PDF) →
    </a>
  </div>
  ```

---

## 4. Integration with Data Engineering Page (`src/pages/DataEngineeringPage.tsx`)

- Ensure `DataEngineeringPage.tsx` under the `#ai-data` section dynamically lists or queries Gosta Labs via `getProjectsBySubCategory("ai-data")`.

---

## 5. Acceptance Criteria

1. **MDX Creation:** `src/content/projects/gosta-labs/index.mdx` is created with valid frontmatter, section structure, and narrative prose.
2. **PDF Asset Link:** Clicking the PDF presentation link in `/projects/gosta-labs` opens `final-presentation.pdf` cleanly in a new tab.
3. **Route & Category Listing:** Gosta Labs appears under `/data-engineering#ai-data` and resolves correctly at `/projects/gosta-labs`.
4. **Build Verification:** `npm run build` completes with zero TypeScript or asset bundle errors.

---

## 6. What to Avoid

- **DO NOT** remove or break `subCategory: "ai-data"` or `type: "engineering"`.
- **DO NOT** move or alter `final-presentation.pdf` or `cover.svg` outside `src/content/projects/gosta-labs/`.
