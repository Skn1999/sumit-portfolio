/* Case-study content for the six v2 case pages. Generated from the design canvas copy.
   Body fields are trusted HTML strings written for this site; %ASSET% is replaced with the public/v2 base path.
   Text in <span class="ph">[…]</span> is a placeholder for Sumit to fill in. */

export type CaseSection = { kicker: string; title: string; lead: string; read: string; full: string };
export type CaseStudy = {
  slug: string; code: string; chapter: string; title: string; dek: string; meta: [string, string][]; note: string;
  skills: string[]; links: { label: string; href: string }[];
  signature: "LoadRace" | "OnboardingWizard" | "TabletSimulator" | "PersonaNudge" | "SeverityCompare" | "DotField";
  label2: string; glance: [string, string, string, string, string]; secs: CaseSection[];
  next: { slug: string; title: string; sub: string };
};

export const CASES: CaseStudy[] = [
 {
  "slug": "optmyzr-dashboard-migration",
  "code": "SN-01",
  "chapter": "Chapter 01 · The builder",
  "title": "Dashboard rebuild",
  "dek": "I rebuilt Optmyzr’s account dashboard in React and cut its load time from about 10 seconds to under one. <span class=\"ph\">[One line on who this helped: e.g. the PPC managers who open it first thing every day]</span>",
  "meta": [
   [
    "Company",
    "Optmyzr"
   ],
   [
    "Year",
    "2023"
   ],
   [
    "My role",
    "<span class=\"ph\">[e.g. Front-end engineer]</span>"
   ],
   [
    "Team",
    "<span class=\"ph\">[Who you worked with]</span>"
   ],
   [
    "Stack",
    "React, <span class=\"ph\">[more]</span>"
   ]
  ],
  "note": "Bracketed text is yours to fill",
  "skills": [],
  "links": [],
  "signature": "LoadRace",
  "label2": "What I built",
  "glance": [
   "The account dashboard took about 10 seconds to load.",
   "A rebuilt account dashboard in React.",
   "<span class=\"ph\">[The one trade-off you’d defend in an interview]</span>",
   "10 s → &lt;1 s",
   "Dashboard load time"
  ],
  "secs": [
   {
    "kicker": "1 · Problem",
    "title": "Ten seconds before anyone could start work",
    "lead": "<p class=\"lead\">The account dashboard is the first screen people see in Optmyzr, and it took about 10 seconds to load.</p>",
    "read": "<p><span class=\"ph\">[Who was waiting — e.g. agency PPC managers checking many accounts a day — and what that cost them or the business]</span>.</p>",
    "full": "<p><span class=\"ph\">[How you knew: support tickets, session recordings, a metric, a conversation]</span>.</p><p><span class=\"ph\">[A quote or data point that made the problem undeniable]</span>.</p>"
   },
   {
    "kicker": "2 · What I built",
    "title": "One screen with the signals that matter",
    "lead": "<p class=\"lead\">A rebuilt account dashboard in React. It brings the main account signals onto one screen.</p>",
    "read": "<p>Performance metrics, a metric comparison chart, the PPC audit score, top elements and the account quality score.</p><ul><li><span class=\"ph\">[What you personally built — e.g. the widget layer, data fetching, the charts]</span></li><li><span class=\"ph\">[How it shipped — e.g. behind a flag, account by account]</span></li></ul>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%work/optmyzr-widget-config.jpg\" alt=\"Diagram: a widget configuration object mapping layout, panels and spacing to dashboard panels\"><figcaption><span class=\"ph\">[Caption for the architecture diagram]</span></figcaption></figure><p><span class=\"ph\">[Technical notes for engineers: data loading, caching, rendering]</span>.</p>"
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "What I gave up, and why",
    "lead": "<p class=\"lead\"><span class=\"ph\">[The one trade-off you’d defend in an interview]</span></p>",
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\"><span class=\"ph\">[What you picked]</span></span></div><div><span class=\"mono\">Over</span><span><span class=\"ph\">[The option you rejected]</span></span></div><div><span class=\"mono\">Because</span><span><span class=\"ph\">[The constraint that decided it]</span></span></div></div>\n<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\"><span class=\"ph\">[What you picked]</span></span></div><div><span class=\"mono\">Over</span><span><span class=\"ph\">[The option you rejected]</span></span></div><div><span class=\"mono\">Because</span><span><span class=\"ph\">[The constraint that decided it]</span></span></div></div>\n",
    "full": "<p><span class=\"ph\">[What you would do differently next time, and why]</span>.</p>"
   },
   {
    "kicker": "4 · Result",
    "title": "Under a second",
    "lead": "<div style=\"display: flex; gap: 48px; flex-wrap: wrap; align-items: flex-end\"><div><div class=\"stat\">10 s</div><span class=\"mono\">Before</span></div><div><div class=\"stat\">&lt;1 s</div><span class=\"mono\" style=\"color: var(--ok)\">After</span></div></div>",
    "read": "<p>Load time fell from about 10 seconds to under one. <span class=\"ph\">[A second result: usage, retention, support tickets, or what users or the team said]</span>.</p>",
    "full": "<p><span class=\"ph\">[What came next, and what you learned]</span>.</p>"
   }
  ],
  "next": {
   "slug": "optmyzr-onboarding-experience",
   "title": "Onboarding wizard",
   "sub": "−25% sign-up drop-off"
  }
 },
 {
  "slug": "optmyzr-onboarding-experience",
  "code": "SN-02",
  "chapter": "Chapter 01 · The builder",
  "title": "Don’t make them wait",
  "dek": "At Optmyzr, new users stared at an empty loading screen while the backend set up their ad accounts, and many left. I found the drop-off in Hotjar, then designed and built a multi-step onboarding wizard in React and Redux that turned the wait into setup. Drop-off fell by about 25%.",
  "meta": [
   [
    "Company",
    "Optmyzr"
   ],
   [
    "Year",
    "2023"
   ],
   [
    "My role",
    "Design engineer"
   ],
   [
    "Stack",
    "React, Redux Toolkit"
   ],
   [
    "Research",
    "Hotjar heatmaps &amp; session recordings, user research"
   ]
  ],
  "note": "From your write-up · bracketed text is yours to fill",
  "skills": [
   "UX research",
   "Hotjar analytics",
   "Systems thinking",
   "Interaction design",
   "React",
   "Redux Toolkit"
  ],
  "links": [],
  "signature": "OnboardingWizard",
  "label2": "What I built",
  "glance": [
   "New users waited on an empty loading screen while their accounts were set up, and many walked away.",
   "A multi-step wizard that runs while the backend works: goals, budget, team.",
   "Plain-language goals instead of ad jargon, mapped to exact metrics behind the scenes.",
   "~25%",
   "Less drop-off during account setup"
  ],
  "secs": [
   {
    "kicker": "1 · Problem",
    "title": "A loading screen people walked away from",
    "lead": "<p class=\"lead\">Connecting a Google Ads or Microsoft Advertising account kicks off heavy backend processing. New users got a loading state with nothing to do.</p>",
    "read": "<p>Hotjar session recordings and heatmaps showed a significant share of new users abandoning onboarding during that wait — closing the tab or switching to other work. That silent churn cost us twice:</p><ul><li><b>Lost conversion.</b> People left before their first win in the product.</li><li><b>Missing context.</b> We knew nothing about their goals, team or budget, so recommendations started generic.</li></ul><blockquote class=\"quote\">How might we engage users during backend setup to reduce drop-offs and capture the data we need for immediate recommendations?</blockquote>",
    "full": "<p><span class=\"ph\">[How long setup took, and what share of users dropped off before the wizard]</span>.</p>"
   },
   {
    "kicker": "2 · What I built",
    "title": "Turn the wait into setup",
    "lead": "<p class=\"lead\">A modular multi-step wizard in React and Redux that runs while account initialisation continues in the background.</p>",
    "read": "<figure class=\"fig\"><img src=\"%ASSET%cases/onboarding/double-diamond.jpg\" alt=\"Double diamond: discover (heatmaps, analytics, user research), define (root cause: waiting causes uncertainty), develop (plain-language goals, budget planning, team collaboration), deliver (onboarding wizard, user reach dashboard faster)\" loading=\"lazy\"><figcaption>The process, from heatmaps to a shipped wizard.</figcaption></figure><ul><li><b>Find the exact drop point.</b> Heatmaps and click tracking showed the gap between sign-up and the first dashboard load was driving abandonment.</li><li><b>Ask only what matters.</b> Research narrowed the inputs to three: plain-language goals, budget constraints and teammates.</li><li><b>Save as you go.</b> Redux stored each answer step by step and synced it to the user’s profile, so the recommendation engine had context by the time setup finished.</li></ul>",
    "full": "<div class=\"cards3\"><div><span class=\"mono\">Metric 1</span><h3>Drop-off rate</h3><p>Did fewer people abandon account setup after the wizard launched?</p></div><div><span class=\"mono\">Metric 2</span><h3>Flow completion</h3><p>How well did users get through every onboarding step?</p></div><div><span class=\"mono\">Metric 3</span><h3>Personalisation</h3><p>Did upfront goals and constraints make recommendations more accurate and more used?</p></div></div><figure class=\"fig\"><img src=\"%ASSET%cases/onboarding/onb-cover.jpg\" alt=\"Illustration: on the left a confused user waits for backend setup; on the right a happy user works through the onboarding wizard\" loading=\"lazy\"><figcaption>Before and after, from waiting to doing.</figcaption></figure>"
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "What I chose, and why",
    "lead": "<p class=\"lead\">Users think in goals, not ad jargon — so the wizard speaks their language and translates.</p>",
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Plain-language goals, mapped to Target CPA, ROAS and conversion value</span></div><div><span class=\"mono\">Over</span><span>Asking users for technical metrics directly</span></div><div><span class=\"mono\">Because</span><span>Goals are how people think; the system can do the translation</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Saving each step as it’s completed</span></div><div><span class=\"mono\">Over</span><span>Submitting everything at the end</span></div><div><span class=\"mono\">Because</span><span>The recommendation engine gets context by the time setup finishes <span class=\"ph\">[and answers survive a drop-off — confirm]</span></span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">A beta group first, then everyone</span></div><div><span class=\"mono\">Over</span><span>Launching to all users at once</span></div><div><span class=\"mono\">Because</span><span>Validate with real users before rolling out to 100%</span></div></div>",
    "full": "<p><span class=\"ph\">[What you would do differently next time]</span>.</p>"
   },
   {
    "kicker": "4 · Result",
    "title": "Waiting became onboarding",
    "lead": "<div class=\"stats\"><div><div class=\"stat\" style=\"font-size: 44px\">~25%</div><span class=\"mono\">Less setup drop-off</span></div><div><div class=\"stat\" style=\"font-size: 44px\"><span class=\"ph\">[x%]</span></div><span class=\"mono\">Higher completion</span></div><div><div class=\"stat\" style=\"font-size: 44px\">100%</div><span class=\"mono\">Rolled out after beta</span></div></div>",
    "read": "<ul><li><b>About 25% less drop-off</b> during account creation, by turning waiting time into an active, useful step.</li><li><b>Higher onboarding completion</b> across new users.</li><li><b>Richer personalisation data</b> up front, so recommendations were relevant from day one.</li></ul>",
    "full": "<p><span class=\"ph\">[What came next, and what you learned]</span>.</p>"
   }
  ],
  "next": {
   "slug": "ediaqi-decision-support-system",
   "title": "Air quality, made readable",
   "sub": "Deda Next · 200 participants"
  }
 },
 {
  "slug": "ediaqi-decision-support-system",
  "code": "SN-04",
  "chapter": "Chapter 02 · The designer",
  "title": "Air quality, made readable",
  "dek": "For my master’s internship with Deda Next on the EU Horizon Europe EDIAQI project, I designed a decision-support layer on top of a sensor network in Ferrara’s public schools and offices. It turns 12+ air-quality readings into clear, role-specific actions for teachers, office workers and facility staff.",
  "meta": [
   [
    "Partner",
    "Deda Next · EU Horizon Europe EDIAQI"
   ],
   [
    "Year",
    "2026"
   ],
   [
    "Where",
    "Ferrara, Italy"
   ],
   [
    "My role",
    "Product designer &amp; UX researcher (UX/UI lead)"
   ],
   [
    "Scale",
    "32 sensors · 12+ parameters"
   ]
  ],
  "note": "Content from your project write-up",
  "skills": [
   "UX research",
   "Heuristic evaluation",
   "Accessibility audit",
   "Experiment design",
   "Information architecture",
   "Interaction design",
   "Figma"
  ],
  "links": [
   {
    "label": "Tablet prototype ↗",
    "href": "https://www.figma.com/make/NMaJtePg9r2moSJt4pxSZr/Indoor-Air-Quality-Display?fullscreen=1&t=8ZFJ14PVlixDqryN-1&code-node-id=0-9"
   },
   {
    "label": "Dashboard V2 prototype ↗",
    "href": "https://www.figma.com/make/rGy3EC5u9Kv5cjRtsqL3Nx/Low-Fidelity-Wireframes-for-Dashboard?fullscreen=1&t=TnOHy22IdTdxUu9z-1&code-node-id=0-9"
   },
   {
    "label": "Full study ↗",
    "href": "https://fourth-yew-1cd.notion.site/EDIAQI-Designing-a-Decision-Support-System-for-Indoor-Air-Quality-39cfd7140ca780139055cfcda74c2841?source=copy_link"
   }
  ],
  "signature": "TabletSimulator",
  "label2": "What I designed",
  "glance": [
   "Plenty of sensor data, but alerts went untreated. Teachers and office workers can’t watch a dashboard all day.",
   "A two-touchpoint system: an in-room tablet that says what to do, and a dashboard for facility managers.",
   "Show everything up front. A 200-person study proved my progressive-disclosure hypothesis wrong.",
   "N = 200",
   "2×2 study across 6 real-world scenarios"
  ],
  "secs": [
   {
    "kicker": "1 · Problem",
    "title": "Data everywhere, action nowhere",
    "lead": "<p class=\"lead\">Deda Next streams 12+ parameters — CO₂, PM2.5, PM10, TVOC, formaldehyde, NO₂, O₃ and more — from 32 sensors in public schools and municipal offices. Rich data didn’t make the rooms any safer.</p>",
    "read": "<ul><li><b>Nobody can monitor all day.</b> Teachers and office workers can’t stay logged into a dashboard while doing their actual jobs.</li><li><b>Alerts didn’t say what to do.</b> The legacy prototype showed raw spikes with no action protocol, so alerts went untreated: open the windows, but for how long?</li><li><b>The wrong density.</b> Basic views used vague one-word labels; advanced views used dense time-series charts. Neither helps a non-expert decide under pressure.</li></ul><blockquote class=\"quote\">“I don’t think it’s enough to have a blinking light, a red light that says there is a problem.”<cite>Research participant</cite></blockquote>\n<blockquote class=\"quote\">“I opened the window. After a while, I’m freezing. I’m not able to understand that it is cold and it’s time to close… It’s too late for me.”<cite>Research participant</cite></blockquote>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/hypotheses.jpg\" alt=\"Five problem hypotheses written as “We believe… because… this leads to… we will know this is true if…”\" loading=\"lazy\"><figcaption>Fig 01 · Problem hypotheses and stakeholder mapping.</figcaption></figure><p>The data reaches a central FROST server through the OGC SensorThings API, alongside Radiello passive samplers. My job was the bridge between that backend and non-technical people making decisions.</p>"
   },
   {
    "kicker": "2 · What I designed",
    "title": "Audit, test, then two touchpoints",
    "lead": "<p class=\"lead\">I audited the existing prototype, tested the core design question with 200 people, then designed an in-room tablet and a facility dashboard.</p>",
    "read": "<figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/tablet-display.jpg\" alt=\"The in-room tablet display prototype on two tablets, showing “Aria buona” and “Aria accettabile” states with CO₂, humidity, temperature and TVOC\" loading=\"lazy\"><figcaption>The in-room tablet prototype: one status, plain words, a face anyone can read.</figcaption></figure><div style=\"display: flex; flex-direction: column; gap: 8px\"><span class=\"mono\">30 issues in the original prototype</span>\n<div class=\"audit\" role=\"img\" aria-label=\"30 issues: 12 WCAG accessibility, 10 visibility of system status, 5 match with the real world, 3 consistency and standards\">\n<span style=\"width: 40%; background: #0D1117\">12 WCAG</span><span style=\"width: 33.3%; background: #57606A\">10 Status visibility</span><span style=\"width: 16.7%; background: #D96B27\">5 Real world</span><span style=\"width: 10%; background: #C9CED6; color: #0D1117\">3</span></div>\n<span style=\"font-size: 13px; color: var(--muted)\">12 accessibility (contrast, focus indicators, text that didn’t scale) · 10 visibility of system status · 5 match between system and real world · 3 consistency and standards</span></div><div class=\"ww\"><span class=\"h\">Area</span><span class=\"h\">Before: legacy prototype</span><span class=\"h\">After: my redesign</span><span class=\"c\">Touchpoints</span><span class=\"bad\">One desktop dashboard that needed an active login and constant manual checks.</span><span>Two touchpoints: an in-room tablet for glanceable awareness, and Dashboard V2 for facility management.</span><span class=\"c\">Information architecture</span><span class=\"bad\">Progressive disclosure that hid the action steps behind nested dropdowns and tabs.</span><span>Upfront disclosure: severity, cause and a concrete next step on the main screen.</span><span class=\"c\">Modality</span><span class=\"bad\">Dense time-series charts and vague one-word labels like “Moderate” or “High”.</span><span>Text plus graphics: colour-coded states paired with clear illustrations.</span><span class=\"c\">Roles</span><span class=\"bad\">The same view for teachers and facility engineers.</span><span>Role-separated views: simple prompts for occupants, severity-ranked alert logs for facility staff.</span></div><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/dash-home.jpg\" alt=\"Dashboard V2 homepage on a laptop: all locations with their air-quality status\" loading=\"lazy\"><figcaption>Dashboard V2 · all buildings at a glance.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/dash-location.jpg\" alt=\"Dashboard V2 location page: one school’s readings and alerts sorted by severity\" loading=\"lazy\"><figcaption>Dashboard V2 · one location, alerts ranked by severity.</figcaption></figure></div>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/heuristics.jpg\" alt=\"Charts of the heuristic evaluation: top heuristic violations and distribution of issue severity\" loading=\"lazy\"><figcaption>Fig 02 · Nielsen heuristic evaluation, 30 documented issues.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/scenarios.jpg\" alt=\"Flowcharts for three scenarios: occupant-owned CO₂ alert, staff-owned sustained PM2.5, and a system-owned CO emergency\" loading=\"lazy\"><figcaption>Fig 03 · Scenario flows for the tablet’s display states.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%work/ediaqi-corridor.jpg\" alt=\"The in-room display mounted on a school corridor wall, showing CO₂ 650 ppm and PM2.5 12 µg/m³\" loading=\"lazy\"><figcaption>The ambient display in context.</figcaption></figure>"
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "I was wrong about disclosure, and that was useful",
    "lead": "<p class=\"lead\">I expected progressive disclosure to reduce clutter. A 2×2 mixed factorial study with 200 participants across 6 breach scenarios showed the opposite: people understood and acted faster when everything was up front.</p>",
    "read": "<div class=\"m22\" role=\"table\" aria-label=\"2 by 2 study design: disclosure by modality\">\n<div role=\"columnheader\"><span class=\"mono\">Disclosure ↓ · Modality →</span></div><div role=\"columnheader\"><b>Text only</b></div><div role=\"columnheader\"><b>Text + graphics</b></div>\n<div role=\"rowheader\"><b>Upfront</b></div><div><span class=\"mono\">Cell A</span>High comprehension, moderate cognitive load.</div><div class=\"best\"><span class=\"mono\" style=\"color: var(--ok)\">Cell B · best</span>Highest comprehension, lowest cognitive load.</div>\n<div role=\"rowheader\"><b>Progressive</b></div><div><span class=\"mono\">Cell C</span>Lower actionability, more cognitive friction.</div><div><span class=\"mono\">Cell D</span>Moderate comprehension, slower to act.</div>\n</div><p style=\"font-size: 14px; color: var(--muted); margin: 0\">Measured: problem comprehension speed, action accuracy, and subjective cognitive load.</p><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Upfront disclosure</span></div><div><span class=\"mono\">Over</span><span>Progressive disclosure</span></div><div><span class=\"mono\">Because</span><span>Higher comprehension in time-critical scenarios, from the 200-person study</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Text plus graphics</span></div><div><span class=\"mono\">Over</span><span>Text-only labels or dense charts</span></div><div><span class=\"mono\">Because</span><span>Icons with text cut cognitive load for people busy with their main task</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Two touchpoints</span></div><div><span class=\"mono\">Over</span><span>One central dashboard</span></div><div><span class=\"mono\">Because</span><span>Occupants can’t monitor a dashboard; facility staff need the detail</span></div></div>",
    "full": "<p><b>Scope compromises.</b> Fully automated compliance logging under Italian occupational-health rules (D.Lgs. 81/2008) needed legal input and was out of scope. A shared production token system with engineering wasn’t finished in time.</p>"
   },
   {
    "kicker": "4 · Result",
    "title": "From readings to actions",
    "lead": "<div class=\"stats\"><div><div class=\"stat\" style=\"font-size: 44px\">30</div><span class=\"mono\">Issues found &amp; resolved</span></div><div><div class=\"stat\" style=\"font-size: 44px\">200</div><span class=\"mono\">Study participants</span></div><div><div class=\"stat\" style=\"font-size: 44px\">5</div><span class=\"mono\">Display states</span></div><div><div class=\"stat\" style=\"font-size: 44px\">3</div><span class=\"mono\">Stakeholder groups</span></div></div>",
    "read": "<p>I delivered a high-fidelity interactive prototype of the five-state tablet display and low-fidelity prototypes of Dashboard V2, plus a documented audit of 30 usability and accessibility issues.</p><ul><li><b>Upfront beats progressive</b> when a breach needs action now.</li><li><b>Glanceability matters more than completeness.</b> Text with icons lowered cognitive load.</li><li><b>Raw numbers don’t change behaviour.</b> “PM2.5 = 45 µg/m³” without context and an action does nothing.</li><li><b>Habits win unless you interrupt them.</b> “The room feels fine to me” needs persistent visual feedback to overcome.</li></ul>",
    "full": "<p><b>With three more months</b>, I’d build a design system covering both visual tokens and micro-copy rules for every display state, and run in-situ tests with Deda Next’s engineers in Ferrara classrooms, measuring task completion, action accuracy, time to intervention and long-term behaviour change.</p>"
   }
  ],
  "next": {
   "slug": "super-ego-app",
   "title": "YOU",
   "sub": "Habit-alignment assistant"
  }
 },
 {
  "slug": "super-ego-app",
  "code": "SN-05",
  "chapter": "Chapter 02 · The designer",
  "title": "YOU: not your usual habit app",
  "dek": "YOU is a concept for an assistant that lives inside the phone’s operating system rather than in another app. It notices the preconscious habits that quietly pull us off course, and adapts its nudges to how emotionally self-aware each person is.",
  "meta": [
   [
    "Year",
    "2026"
   ],
   [
    "Context",
    "<span class=\"ph\">[Course or brief, e.g. Social Interaction]</span>"
   ],
   [
    "My role",
    "Research synthesis, behavioural framing, interaction logic, hi-fi prototyping"
   ],
   [
    "Team",
    "<span class=\"ph\">[Team size]</span>"
   ],
   [
    "Platform",
    "Mobile OS concept"
   ]
  ],
  "note": "From your write-up · bracketed text is yours to fill",
  "skills": [
   "Behavioural design",
   "Social psychology",
   "Habit formation",
   "Persona creation",
   "Interaction design",
   "Prototyping"
  ],
  "links": [
   {
    "label": "Final presentation ↗",
    "href": "https://www.figma.com/deck/AqArCYTjQP7qPRJZlKJHxN/Social-interaction---Final-presentation?node-id=6-2733"
   }
  ],
  "signature": "PersonaNudge",
  "label2": "What I designed",
  "glance": [
   "People open their phone for the weather and surface twenty minutes later in social media. Productivity tools don’t touch that autopilot.",
   "An OS-level assistant that reads rhythms, not content, and nudges at the moment of drift.",
   "Match the nudge to the person: subtle cues for some, reflective prompts for others.",
   "<span style=\"display: block; font-size: 26px; line-height: 1.15\">Nudges that fit the person.</span>",
   "Two personas, two kinds of intervention."
  ],
  "secs": [
   {
    "kicker": "1 · Problem",
    "title": "The gap between intending and doing",
    "lead": "<p class=\"lead\">You open your phone to check the weather and, twenty minutes later, you’re deep in social media with no memory of the detour. Most productivity tools assume we’re rational planners who just need a better to-do list. The real friction is the autopilot habit loop.</p>",
    "read": "<div class=\"drift\"><div><b>Invisible drift</b><span>People slide off task without noticing the moment it happens.</span></div><div><b>Autopilot habits</b><span>By the time you notice you’re distracted, the moment has passed.</span></div><div><b>Emotions ignored</b><span>Stress and mood drive the impulse, but most tools pretend they don’t exist.</span></div><div><b>Intention ≠ action</b><span>A lasting gap between the goals we set and what our hands actually do.</span></div></div>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/you/assumptions-research.jpg\" alt=\"Research synthesis board with sticky notes grouped into behavioural assumptions\" loading=\"lazy\"><figcaption>Fig 01 · Research synthesis and behavioural assumptions.</figcaption></figure><p><span class=\"ph\">[Research you ran: interviews, diary study, survey — and how many people]</span>.</p>"
   },
   {
    "kicker": "2 · What I designed",
    "title": "An assistant inside the operating system",
    "lead": "<p class=\"lead\">YOU runs in the background of the phone, watching rhythms like app-switching frequency and late-night scrolling — never private content — and steps in at the moment of drift.</p>",
    "read": "<figure class=\"fig\"><img src=\"%ASSET%cases/you/how-this-works.jpg\" alt=\"How this works: choose your goal, choose your commitment, learn your patterns, evaluate emotional awareness, context-dependent nudges, progress and adapt\" loading=\"lazy\"><figcaption>Fig 02 · The adaptive loop, from choosing a goal to progress and adaptation.</figcaption></figure><ul><li><b>A continuous loop.</b> Evaluate the person’s state, assess their emotional awareness, apply a calibrated intervention, and mirror back what it learned.</li><li><b>Calibrated by emotional awareness.</b> Short “Help me understand you” exercises, based on the LEAS framework, gauge emotional vocabulary and tune nudges from simple, warm prompts to more nuanced, reflective dialogue.</li><li><b>Two personas to test against.</b> Grace, motivated by mastery, progress and meaning; Philip, motivated by relationships and external rewards.</li></ul><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/you/integration.jpg\" alt=\"Phone settings showing YOU integrated into the operating system, next to a Help me understand you exercise\" loading=\"lazy\"><figcaption>Integrated with the OS settings.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/you/personas.jpg\" alt=\"Personas: Grace, motivated by mastery, progress, purpose and meaning; Philip, motivated by relationships and external rewards\" loading=\"lazy\"><figcaption>Grace and Philip.</figcaption></figure></div>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/you/onboarding.jpg\" alt=\"Onboarding screens: Hi, I’m You; how you spend your time; how involved YOU should be (observer, gentle helper, active coach); YOU is ready\" loading=\"lazy\"><figcaption>Onboarding: pick a goal and how involved YOU should be.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/you/emotional-awareness-LEAS.jpg\" alt=\"Help me understand you: an emotional-awareness exercise asking how you would feel in a described situation\" loading=\"lazy\"><figcaption>Fig 05 · LEAS emotional-awareness calibration.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/you/goal-adaptation.jpg\" alt=\"Screens helping the user deal with setbacks: stress check-ins and goal adjustments for Grace and Phil\" loading=\"lazy\"><figcaption>Helping people deal with setbacks.</figcaption></figure>"
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "What I chose, and why",
    "lead": "<p class=\"lead\">Meet people where the drift happens, without reading what they do.</p>",
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">An OS-level assistant</span></div><div><span class=\"mono\">Over</span><span>Another standalone app</span></div><div><span class=\"mono\">Because</span><span>Drift happens between apps; a separate app would never see the moment</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Passive rhythms: app switching, late-night scrolling</span></div><div><span class=\"mono\">Over</span><span>Monitoring private content</span></div><div><span class=\"mono\">Because</span><span>Meaningful nudges without reading anyone’s messages or feeds</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Nudges tuned to emotional awareness and persona</span></div><div><span class=\"mono\">Over</span><span>One kind of nudge for everyone</span></div><div><span class=\"mono\">Because</span><span>A breathing pulse helps one person; another needs a moment to reflect</span></div></div>",
    "full": "<p><span class=\"ph\">[What you would do differently, or what you’d test next]</span>.</p>"
   },
   {
    "kicker": "4 · Result",
    "title": "A cohesive nudge system",
    "lead": "<div class=\"stats\"><div><div class=\"stat\" style=\"font-size: 44px\">2</div><span class=\"mono\">Personas</span></div><div><div class=\"stat\" style=\"font-size: 44px\">2</div><span class=\"mono\">Kinds of nudge</span></div><div><div class=\"stat\" style=\"font-size: 44px\">0</div><span class=\"mono\">Private content read</span></div></div>",
    "read": "<ul><li><b>An OS-level behavioural framework,</b> prototyped as an assistant that adapts its interventions to real-time emotional self-awareness.</li><li><b>A dual-process nudge system</b> that combines subtle System 1 cues (haptic breathing pulses, app-delay timers) with reflective System 2 prompts (adjusting goals, a letter to your future self).</li><li><b>Privacy by design.</b> Meaningful nudges from rhythm tracking alone, without monitoring content.</li></ul>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/you/cover.jpg\" alt=\"YOU, Super-ego app cover with three characters labelled super-ego, ego and id\" loading=\"lazy\"><figcaption>YOU, the Super-ego app.</figcaption></figure><p><span class=\"ph\">[What feedback you got, and what you learned]</span>.</p>"
   }
  ],
  "next": {
   "slug": "a-plus-usability-project",
   "title": "A+ usability evaluation",
   "sub": "Expert review vs. user tests"
  }
 },
 {
  "slug": "a-plus-usability-project",
  "code": "SN-10",
  "chapter": "Chapter 02 · The designer",
  "title": "A+ usability & accessibility evaluation",
  "dek": "A+ is the learning platform behind many of Aalto’s computer-science courses. Our team evaluated how usable and accessible it really is, through expert inspection and sessions with users with disabilities, and turned the findings into prioritised fixes for its developers.",
  "meta": [
   [
    "Context",
    "Aalto University · Collaborative Evaluation of Interactive Systems"
   ],
   [
    "Timeline",
    "Feb – Jun 2025"
   ],
   [
    "For",
    "A+ development team"
   ],
   [
    "My role",
    "<span class=\"ph\">[Your role on the team]</span>"
   ],
   [
    "Team",
    "<span class=\"ph\">[Team size]</span>"
   ]
  ],
  "note": "Bracketed text is yours to fill",
  "skills": [
   "Usability testing",
   "Heuristic evaluation",
   "Cognitive walkthrough",
   "Workshop facilitation",
   "Co-design",
   "Affinity diagrams",
   "Digital accessibility",
   "WCAG 2.1"
  ],
  "links": [],
  "signature": "SeverityCompare",
  "label2": "What we did",
  "glance": [
   "A+ had known usability problems, but no evidence of how they affected real users — especially users with accessibility needs.",
   "An expert inspection, sessions with users with disabilities, and a workshop to prioritise.",
   "AI helped us sort the data. People made every call.",
   "<span style=\"display: block; font-size: 26px; line-height: 1.15\">Minor issues. Major impact.</span>",
   "Small problems added up for every user."
  ],
  "secs": [
   {
    "kicker": "1 · Problem",
    "title": "Known problems, no evidence",
    "lead": "<p class=\"lead\">A+ is an open-source learning platform developed and used at Aalto University for course delivery, assignments and student interaction, mostly in computer science.</p>",
    "read": "<p>Its usability limits were known, but nobody had a structured, evidence-based picture of how they affected real users — least of all users with accessibility needs.</p><p>We set out to evaluate A+’s usability and accessibility with a mix of collaborative inspection and user-based methods, give its development team prioritised recommendations, and explore how AI could help in the research.</p>",
    "full": "<p><span class=\"ph\">[Your part in framing the brief with the A+ team]</span>.</p>"
   },
   {
    "kicker": "2 · What we did",
    "title": "Two lenses, one workshop",
    "lead": "<p class=\"lead\">We looked at A+ as experts first, then through the eyes of users with disabilities, and brought both sets of findings into a workshop.</p>",
    "read": "<div class=\"methods\">\n<div><span class=\"mono\">Lens 1</span><h3>Inspection-based evaluation</h3><p>We identified usability issues, checked the platform against established usability and design principles, and tested its compliance with accessibility standards. Findings from the heuristic evaluation were rated by severity and grouped by theme.</p></div>\n<div><span class=\"mono\">Lens 2</span><h3>User-based evaluation</h3><p>We observed and interviewed users with disabilities to find their pain points and check our earlier findings. Their sessions were analysed through qualitative coding and affinity diagramming.</p></div>\n<div><span class=\"mono\">Analysis</span><h3>Affinity diagram + severity comparison</h3><p>We compared how severity ratings were distributed across the two evaluations. AI supported the analysis, but every output was cross-checked and refined by hand.</p></div>\n<div><span class=\"mono\">Workshop</span><h3>Prioritise, then ideate</h3><p>A workshop with prioritisation and ideation activities to agree on the issues that mattered most and explore how to fix them.</p></div>\n</div><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/affinity.jpg\" alt=\"Affinity diagram grouping findings into five themes: navigation efficiency, accessibility and readability, interface design, user experience, and submission feedback\"><figcaption>The affinity diagram: five themes emerged from the user sessions.</figcaption></figure><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/workshop.jpg\" alt=\"Workshop participants around a table working through printed problem cards\" loading=\"lazy\"><figcaption>The workshop: prioritising problems in small groups.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/whiteboard.jpg\" alt=\"Whiteboard with printed problem cards grouped under Accessibility and Plugin-related problems\" loading=\"lazy\"><figcaption>Problem cards sorted by theme.</figcaption></figure></div>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/aplus/severity.jpg\" alt=\"Two stacked bar charts of severity ratings by category, one for the inspection-based and one for the user-based evaluation\"><figcaption>Distribution of severity ratings by category, inspection vs. user tests.</figcaption></figure><p><span class=\"ph\">[What you personally ran: which heuristics, how many sessions, which workshop activities]</span>.</p>"
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "What we balanced",
    "lead": "<p class=\"lead\">AI helped us sort the data. People made every call.</p>",
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Two methods, inspection and user tests</span></div><div><span class=\"mono\">Over</span><span>A single evaluation method</span></div><div><span class=\"mono\">Because</span><span>Inspection surfaced a broad set of possible issues; user tests showed which ones actually mattered</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">AI-assisted affinity mapping, refined by hand</span></div><div><span class=\"mono\">Over</span><span>Fully manual or fully automated analysis</span></div><div><span class=\"mono\">Because</span><span>The AI’s first pass gave a reasonable structure but missed the nuance and context in the data</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Interface-level recommendations</span></div><div><span class=\"mono\">Over</span><span>Changing how courses on A+ teach</span></div><div><span class=\"mono\">Because</span><span>Accessibility fixes had to respect the platform’s underlying pedagogical decisions</span></div></div>",
    "full": "<p>Exploring AI for affinity mapping was useful and instructive. The initial output needed significant manual refinement to capture what the data actually contained — a practical reminder to use AI collaboratively, but critically.</p>"
   },
   {
    "kicker": "4 · Result",
    "title": "Minor issues. Major impact.",
    "lead": "<p class=\"lead\">The most revealing finding wasn’t any single issue but how they added up. Many problems were minor on their own, yet together they made A+ harder to use for everyone, not only users with accessibility needs.</p>",
    "read": "<p>We delivered prioritised improvement suggestions to the A+ team. Examples included clearer focus states for screen-reader users, a sticky sidebar and a back-to-top button for faster navigation, and a semantic colour palette for accessibility and visual consistency.</p><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/palette.jpg\" alt=\"Proposed semantic colour palette: primary, secondary, info, warning, danger, success and two neutrals, each with a hex value\"><figcaption>A proposed semantic colour palette.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/sidebar.jpg\" alt=\"A+ course sidebar with clearer active and focus states on its navigation items\"><figcaption>Clearer active and focus states in the course sidebar.</figcaption></figure></div>",
    "full": "<p>Combining the two methods proved more valuable than either alone. Seeing findings from both converge gave the team much stronger confidence in the final recommendations.</p><p>The workshop was where the project came together. Facilitating discussion between groups, and balancing interface design against the platform’s pedagogical decisions, was the hardest part. It made clear that good accessibility work is rarely just a design problem: it means understanding the constraints and intentions behind the system you’re evaluating.</p><p><span class=\"ph\">[What the A+ team did with the recommendations]</span>.</p>"
   }
  ],
  "next": {
   "slug": "groundwork",
   "title": "Groundwork",
   "sub": "2nd of 900+, EIT Jumpstarter"
  }
 },
 {
  "slug": "groundwork",
  "code": "SN-07",
  "chapter": "Chapter 03 · The founder",
  "title": "Groundwork: building with them",
  "dek": "I co-founded Groundwork, an open-source delivery framework and co-design workshop model that helps product teams turn WCAG and European Accessibility Act requirements into sprint tasks from day one. We reached the Grand Final of EIT Jumpstarter 2025 and placed 2nd of 900+ European applicants.",
  "meta": [
   [
    "Role",
    "Co-founder · design facilitation · design engineer"
   ],
   [
    "Year",
    "2025"
   ],
   [
    "Programme",
    "EIT Jumpstarter · New European Bauhaus"
   ],
   [
    "Focus",
    "WCAG · EAA"
   ],
   [
    "Base",
    "Helsinki <span class=\"ph\">[confirm]</span>"
   ]
  ],
  "note": "From your write-up · bracketed text is yours to fill",
  "skills": [
   "Inclusive design",
   "Digital accessibility",
   "WCAG / EAA",
   "Co-design",
   "Workshop facilitation",
   "Brand strategy",
   "Market research"
  ],
  "links": [
   {
    "label": "wearegroundwork.org ↗",
    "href": "https://wearegroundwork.org/"
   }
  ],
  "signature": "DotField",
  "label2": "What we built",
  "glance": [
   "Teams treat accessibility as a late compliance checklist, and pay for it in rework.",
   "An open-source delivery framework and a co-design workshop model.",
   "A delivery process, not another set of guidelines.",
   "2nd / 900+",
   "EIT Jumpstarter 2025"
  ],
  "secs": [
   {
    "kicker": "1 · Problem",
    "title": "Accessibility arrives too late",
    "lead": "<p class=\"lead\">With the European Accessibility Act coming into force, regulated organisations must make their digital products accessible without slowing releases down. Most teams still treat accessibility as a compliance checklist at the end.</p>",
    "read": "<ul><li><b>Expensive rework.</b> Fixing accessibility after the software is built means refactoring.</li><li><b>Worse experiences</b> for users with disabilities in the meantime.</li><li><b>Constant friction</b> between compliance leads and developers.</li></ul><figure class=\"fig\"><img src=\"%ASSET%cases/groundwork/metrics.jpg\" alt=\"1.3 billion people experience significant disability: 16% of the world population, 1 in 6 people globally\" loading=\"lazy\"><figcaption>Fig 01 · Who the current system fails.</figcaption></figure><blockquote class=\"quote\">What would a delivery process look like if accessibility were treated as infrastructure?</blockquote>",
    "full": "<p>As co-founder I worked across research, framework design, brand strategy and team operations: market research, refining the value proposition, creating our brand voice, and being the main point of contact with mentors throughout EIT Jumpstarter.</p>"
   },
   {
    "kicker": "2 · What we built",
    "title": "Accessibility as infrastructure",
    "lead": "<p class=\"lead\">Instead of another set of guidelines or audit reports, we built a way of working that puts accessibility into the first commit.</p>",
    "read": "<div class=\"cards3\"><div><span class=\"mono\">Framework</span><h3>Open-source delivery primitives</h3><p>Accessibility design primitives and structural code guidelines, so teams build accessible components from the first commit.</p></div><div><span class=\"mono\">Workshops</span><h3>Co-design facilitation</h3><p>A facilitation model that brings users with disabilities into early ideation, so decisions come from lived experience, not abstract rules.</p></div><div><span class=\"mono\">Validation</span><h3>Pan-European practitioner review</h3><p>Stress-tested through practitioner feedback and mentor reviews across Europe during EIT Jumpstarter.</p></div></div><figure class=\"fig\"><img src=\"%ASSET%cases/groundwork/methodology.jpg\" alt=\"Groundwork methodology: Design (frameworks shaped by lived experience), Develop (accessible components and patterns), Deploy (internal capability through testing, rollout and governance)\" loading=\"lazy\"><figcaption>Fig 02 · The co-design methodology and delivery framework.</figcaption></figure>",
    "full": "<p><span class=\"ph\">[What you built yourself as design engineer: components, docs, the workshop kit — and a link to the open-source repo]</span>.</p>"
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "What we said no to",
    "lead": "<p class=\"lead\">A delivery process, not another set of guidelines.</p>",
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">A delivery framework with code-level primitives</span></div><div><span class=\"mono\">Over</span><span>More guidelines or audit reports</span></div><div><span class=\"mono\">Because</span><span>Teams need accessibility in the first commit, not in a report after release</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Co-designing with users with disabilities</span></div><div><span class=\"mono\">Over</span><span>Designing from compliance rules alone</span></div><div><span class=\"mono\">Because</span><span>Lived experience grounds decisions in what actually helps</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Open source</span></div><div><span class=\"mono\">Over</span><span><span class=\"ph\">[The alternative you considered]</span></span></div><div><span class=\"mono\">Because</span><span><span class=\"ph\">[Why open source was the right call]</span></span></div></div>",
    "full": "<p><span class=\"ph\">[What you would do differently as a founder]</span>.</p>"
   },
   {
    "kicker": "4 · Result",
    "title": "2nd of 900+",
    "lead": "<div class=\"stats\"><div><div class=\"stat\" style=\"font-size: 44px\">2nd</div><span class=\"mono\">Grand Final</span></div><div><div class=\"stat\" style=\"font-size: 44px\">900+</div><span class=\"mono\">European applicants</span></div><div><div class=\"stat\" style=\"font-size: 44px\">Day 1</div><span class=\"mono\">Accessibility in delivery</span></div></div>",
    "read": "<ul><li><b>2nd place Grand Finalist</b> out of 900+ European applicants in EIT Jumpstarter 2025, New European Bauhaus category.</li><li><b>Accessibility from day one.</b> We showed it can be built into product delivery without slowing launches.</li></ul><p><a href=\"https://wearegroundwork.org/\" target=\"_blank\" rel=\"noopener\">wearegroundwork.org ↗</a></p>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%work/groundwork.jpg\" alt=\"Groundwork cover reading: Built for everyone, from the ground up.\" loading=\"lazy\"><figcaption>Groundwork.</figcaption></figure><p><span class=\"ph\">[Where Groundwork is now, and what being a founder taught you]</span>.</p>"
   }
  ],
  "next": {
   "slug": "optmyzr-dashboard-migration",
   "title": "Dashboard rebuild",
   "sub": "10 s → under 1 s load"
  }
 }
];

export const CASE_BY_SLUG: Record<string, CaseStudy> = Object.fromEntries(CASES.map((c) => [c.slug, c]));
