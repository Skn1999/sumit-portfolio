# EDIAQI: Designing an Action-Oriented Decision Support System for Indoor Air Quality

> **Framework Sequence**: `[01 // THE CHALLENGE]` ➔ `[02 // MY ROLE]` ➔ `[03 // WHAT WORKED vs. WHAT DIDN'T]` ➔ `[04 // THE SOLUTION]` ➔ `[05 // KEY INSIGHTS]` ➔ `[06 // IMPACT & LESSONS]`

---

## Metric Hook & Project Highlights

- **System Scale**: Converting telemetry from **32 IoT sensors** and **Radiello passive samplers** streaming **12+ real-time environmental parameters** (CO₂, PM2.5, PM10, TVOC, AVOC, Formaldehyde, NO₂, O₃, Temp, Humidity, Pressure) via FROST Server / OGC SensorThings API across public schools and municipal offices in **Ferrara, Italy**.
- **Empirical Validation**: Conducted a **2x2 Mixed Factorial Study ($N=200$ participants across 6 real-world scenarios)** evaluating comprehension, actionability, and cognitive load.
- **Audit Impact**: Identified and resolved **30 Usability & Accessibility Issues** via a Nielsen Heuristic Evaluation of initial telemetry prototypes.
- **Architecture Solution**: Architected a **2-Touchpoint Decision Support System (DSS)** separating ambient awareness (in-room tablet display) from technical facility management (public-good dashboard V2).

---

## 01 // THE CHALLENGE

### The Metric Hook

As part of the **EU Horizon Europe EDIAQI project** (Evidence Driven Indoor Air Quality Improvement), the Deda Next technical team deployed an extensive IoT infrastructure across public schools and municipal offices in Ferrara, Italy. The system continuously streams 12+ environmental health parameters to a central FROST server via the OGC SensorThings API.

### The Structural Bottleneck: Passive Telemetry vs. Active Human Behavior

Having rich sensor data did not equate to safer indoor environments. The core gap lay between **data availability and human action**:

1. **Unrealistic Monitoring Burden**: Non-expert occupants (classroom teachers, municipal office workers) cannot be expected to remain continuously logged into a dashboard while managing primary daily tasks.
2. **No Actionability**: The legacy dashboard prototype provided raw parameter spikes without an action protocol layer. Alerts went completely untreated because non-expert users lacked contextual guidance (_"Open windows for how long? What action should be taken under current outdoor/indoor delta?"_).
3. **Data Density Mismatch**: Existing dashboard interface relied on single-word vague labels in basic views or dense time-series line charts in advanced views. Both are ineffective in non-expert decision-making under task overload.

![Fig 01 // Problem hypothesis & stakeholder mapping framework](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/content/projects/ediaqi-decision-support-system/problem-hypo.jpg)
_Fig 01 // Problem hypothesis & stakeholder mapping framework_

---

## 02 // MY ROLE

### Team Composition

- **Horizon Europe EDIAQI Consortium**: Interdisciplinary research steering group.
- **Deda Next Technical Team**: Sensor deployment, IoT telemetry infrastructure, and FROST server API integration.
- **Product Designer & UX Researcher (My Role)**: Lead UX/UI architecture, heuristic evaluation, quantitative study setup, and DSS interaction design.

### My Bridge Positioning

I bridged the gap between Deda Next's **backend sensor data and non-technical human decision-making**. My responsibility was creating an actionable Decision Support System (DSS) layer that transformed raw readings into clear, role-appropriate interventions.

---

## 03 // WHAT WORKED vs. WHAT DIDN'T

### Nielsen Heuristic & Accessibility Audit Breakdown

An audit of Deda Next's initial dashboard prototype uncovered **30 usability and accessibility friction points**, documented in the [EDIAQI Heuristic Evaluation Matrix](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/content/projects/ediaqi-decision-support-system/EDIAQI_Heuristic_Evaluation.xlsx).

![Fig 02 // Nielsen heuristic evaluation report](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/content/projects/ediaqi-decision-support-system/heuristics-evaluation.jpg)
_Fig 02 // Nielsen heuristic evaluation (30 documented usability issues)_

### What Worked vs. What Didn't

| Category                     | ❌ What Didn't Work (Legacy Prototype)                                                | ✅ What Worked (DSS Redesign)                                                                                                            |
| :--------------------------- | :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Touchpoint Strategy**      | Single central desktop dashboard requiring active login and continuous manual checks. | **2-Touchpoint Architecture**: In-room ambient tablet for glanceable occupant awareness + Web Dashboard V2 for facility management.      |
| **Information Architecture** | Progressive disclosure hiding critical action steps behind nested dropdowns/tabs.     | **Upfront Information Disclosure**: Surfacing severity, cause, and concrete micro-actions directly on primary screens.                   |
| **Modality & Visuals**       | Dense time-series line charts and single-word vague labels ("Moderate", "High").      | **Text + Graphics Modality**: Dual-coded ambient color states paired with explicit illustrations for ultra-glanceability.                |
| **Role Alignment**           | Uniform data presentation for both teachers and facility engineers.                   | **Role-Separated Views**: Simplified ambient action prompts for occupants vs. prioritized severity-ranked alert logs for facility staff. |

---

## 04 // THE SOLUTION

### 1. Empirical Quantitative Study ($N=200$ Participants, 6 Scenarios)

To validate the UX architecture of the action protocol layer, I conducted a **$2 \times 2$ Mixed Factorial Experiment** testing 6 real-world IAQ breach scenarios across 200 participants.

#### $2 \times 2$ Mixed Factorial Experimental Design

| Independent Variables       | **Modality: Text Only**                                                            | **Modality: Text + Graphics**                                                                     |
| :-------------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| **Disclosure: Upfront**     | _Cell A_: Upfront text-only prompts (High comprehension, moderate cognitive load)  | _Cell B_ (Optimal): Upfront text + visual graphics (Highest comprehension, lowest cognitive load) |
| **Disclosure: Progressive** | _Cell C_: Multi-step text prompts (Lower actionability, higher cognitive friction) | _Cell D_: Multi-step graphical prompts (Moderate comprehension, delayed task execution)           |

- **Evaluated Metrics**: Problem Comprehension Speed, Actionability Accuracy, and Subjective Cognitive Load.
- **Key Finding**: Upfront information disclosure combined with graphical modality significantly outperformed progressive disclosure in time-critical IAQ scenarios.

### 2. In-Room Ambient Display (5-State System Architecture)

The in-room tablet display operates across **5 discrete ambient states** simulating real-time telemetry transitions:

> UI Tip: Think of a flow-chart way to display these 5 states instead of just writing them in the text format. Truncate the details which are not necessary.

1. **Ambient State**: Subtle background color indicating optimal air quality ($CO_2 < 800\text{ ppm}$).
2. **Alert State**: High-visibility warning when thresholds are breached, detailing the specific hazard ($CO_2 > 1200\text{ ppm}$).
3. **Action Prompt State**: Immediate, glanceable guidance (e.g., _"Open windows for cross-ventilation"_).
4. **Reporting / Action Taken State**: One-tap confirmation logging the intervention to close the feedback loop.
5. **Educational State**: Contextual micro-tips explaining indoor environmental health factors to occupants.

![Fig 03 // In-room ambient tablet display mockup](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/content/projects/ediaqi-decision-support-system/mockup-with-tablet.jpg)
_Fig 03 // In-room ambient tablet display prototype_

![Fig 04 // Concept scenario validation for occupants & facility staff](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/content/projects/ediaqi-decision-support-system/scenarios.png)
_Fig 04 // Scenario validation flowchart for in-room tablet display states_

> UI Tip: Format the Quotes nicely that they stand out.

> [!IMPORTANT]
> **Qualitative User Research Evidence**:
>
> 💬 **On Passive Alerts vs. Direct Action Prompts**:
> _"I don't think it's enough to have a blinking light, a red light that says there is a problem."_ — Research Participant
> _(Validates why raw alerts fail and explicit action protocols are mandatory)._
>
> 💬 **On Action Recovery & Feedback Loops**:
> _"I opened the window. After a while, I'm freezing. I'm not able to understand that it is cold and it's time to close... It's too late for me."_ — Research Participant
> _(Validates the need for 5-state ambient tracking that closes the feedback loop when conditions recover)._

---

### 3. Dashboard V2: Public Good & Advanced Facility Views

For municipal facility managers monitoring dozens of public buildings simultaneously:

<div className="flex flex-col md:flex-row md:items-start md:gap-6">
  <div className="flex-1">
    <img src="file:///Users/SumitKumar/Desktop/consulting/portfolio/src/content/projects/ediaqi-decision-support-system/DashboardV2-Homepage.jpg" alt="EDIAQI Public-good dashboard homepage" />
    <p className="font-mono text-[10px] text-ink-muted text-center mt-2 mb-6">
      Fig 05 // Dashboard V2 Homepage — Public Good & High-level Building Status
    </p>
  </div>
  <div className="flex-1">
    <img src="file:///Users/SumitKumar/Desktop/consulting/portfolio/src/content/projects/ediaqi-decision-support-system/DashboardV2-LocationPage.jpg" alt="EDIAQI Public-good dashboard location page" />
    <p className="font-mono text-[10px] text-ink-muted text-center mt-2 mb-6">
      Fig 06 // Dashboard V2 Location Page — Location-specific Telemetry & Facility Logs
    </p>
  </div>
</div>

---

## 05 // KEY INSIGHTS

💡 **Key Learning 01: Hypothesis Disconfirmed (Upfront > Progressive Disclosure)**  
Opposite of my initial hypothesis that progressive disclosure would reduce visual clutter, empirical data from the 200-participant study showed that users prefer **upfront information**. Upfront disclosure directly correlated with higher problem comprehension during environmental threshold breaches.

💡 **Key Learning 02: Glanceability Reduce Cognitive Burden**  
Combining text with graphical icons significantly reduced cognitive load for non-expert users. Occupants in schools and offices operate under primary task overload, thus environmental touchpoints must prioritize glanceability over technical completeness.

💡 **Key Learning 03: Raw Data Does Not Drive Behavioral Change**  
Displaying numerical sensor readings ($\text{PM2.5}=45\,\mu\text{g/m}^3$) without context and plain-language actions fails to produce behavioral responses.

💡 **Key Learning 04: Overcoming Heuristic-Based Habits**  
Non-expert users rely heavily on heuristics ("the room feels fine to me"). Environmental DSS design must actively disrupt passive habits by using persistent visual feedback when threats accumulate.

---

## 06 // IMPACT & LESSONS

### Final Project Outcomes

1. **Interactive Figma Prototypes**: Delivered high-fidelity interactive prototypes for the 5-state in-room ambient tablet display and low-fidelity prototypes for Dashboard V2 using Figma. [Put the figma prototype link here for both Tablet display and the dashboard v2]
2. **Systematic Usability Audit**: Documented and resolved 30 usability and accessibility issues in the [EDIAQI Heuristic Evaluation Spreadsheet](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/content/projects/ediaqi-decision-support-system/EDIAQI_Heuristic_Evaluation.xlsx).

### Retrospective: Successes & Compromises

> UI Tip: Don't just put the information in a tabular format. Use colour-coded tags to highlight success, failure and compromise and then use the text to say the data point.

| Aspect                        | Status & Reflection                                                                                                                                                                                     |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **2-Touchpoint Architecture** | **Major Success**: Separating ambient occupant touchpoints from centralized administrative dashboards effectively solved the "constant monitoring" friction point.                                      |
| **Legal Compliance Workflow** | **Scope Compromise**: Full automated legal compliance logging under Italian occupational health standards (D.Lgs. 81/2008 / Classe II thresholds) was out of scope and required dedicated legal inputs. |
| **Design System Handoff**     | **Compromise**: Due to timeline constraints, a unified production token system was not fully established with the engineering team.                                                                     |

### Future Roadmap (+3 Months Strategy)

> UI Tip: for roadmap, create a simple visualisation where the points below represent block that are being added to a bigger block that is this project. Think of lego blocks. Use CSS and motion libraries installed to create minimal animation.

If granted an additional 3 months on the EDIAQI project, I would focus on:

1. **Linguistic & Visual Design System**: Standardizing a comprehensive design system covering both visual tokens and clear micro-copy rules to eliminate ambiguity across ambient states.
2. **In-Situ Usability & Field Engineering Testing**: Collaborating with Deda Next engineers to deploy working tablet prototypes in Ferrara classrooms to collect live field metrics:
   - **Task Completion Rate** under real classroom conditions.
   - **Action Accuracy & Time-to-Intervention** following threshold breaches.
   - **Long-term Behavior Retention** over 30-day monitoring periods.
