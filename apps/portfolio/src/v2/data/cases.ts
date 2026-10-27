/* Case-study content for the v2 case pages. Generated from the design canvas copy.
   Body fields are trusted HTML strings written for this site; %ASSET% is replaced with the public/v2 base path. */

export type CaseSection = { kicker: string; title: string; lead: string; read: string; full: string };
export type CaseStudy = {
  slug: string; code: string; chapter: string; title: string; dek: string; meta: [string, string][];
  skills: string[]; links: { label: string; href: string }[];
  /** The case’s interactive piece; null when the case has none.
      A+ (SeverityCompare) is switched off for now: its counts were read off the team’s charts and need checking. */
  signature: "LoadRace" | "OnboardingWizard" | "TabletSimulator" | "PersonaNudge" | "SeverityCompare" | "DotField" | null;
  label2: string; glance: [string, string, string, string, string]; secs: CaseSection[];
  next: { slug: string; title: string; sub: string };
};

export const CASES: CaseStudy[] = [
 {
  "slug": "optmyzr-dashboard-migration",
  "code": "SN-01",
  "chapter": "Chapter 01 · The builder",
  "title": "Dashboard rebuild",
  "dek": "I rebuilt Optmyzr’s account dashboard in React and cut its load time from about 10 seconds to under one. Each widget now updates on its own, which keeps the whole dashboard fast for the people using it.",
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
    "Design Engineer · solo on this project"
   ],
   [
    "Team",
    "CORE Team"
   ],
   [
    "Stack",
    "React, TypeScript, Redux Toolkit, MUI, CSS-in-JS"
   ]
  ],
  "skills": [],
  "links": [],
  "signature": "LoadRace",
  "label2": "What I built",
  "glance": [
   "The first screen people open took up to 10 seconds to load on large accounts.",
   "A React dashboard where every widget loads and updates on its own.",
   "A plug-and-play system over managing each ad platform separately.",
   "10 s → &lt;1 s",
   "Dashboard load time"
  ],
  "secs": [
   {
    "kicker": "1 · Problem",
    "title": "Ten seconds before anyone could start work",
    "lead": "<p class=\"lead\">The account dashboard is the first screen people see in Optmyzr, and it took up to 10 seconds to load.</p>",
    "read": "<p>The people waiting were digital marketers and agencies running ad campaigns across several platforms. They open this dashboard first, often to pull a report or decide where to spend next, so it has to load fast and feel close to real time.</p><p>The old view layer, built on Backbone.js and jQuery, had no scoped state. One changed value re-rendered every widget on the page, and adding a new ad platform meant copying layout boilerplate.</p>",
    "full": "<p>We heard it from customers, and my own profiling backed it up. We also kept test accounts with very large amounts of data; on those, the dashboard took 8–10 seconds before anyone could use it.</p><figure class=\"fig\"><img src=\"%ASSET%cases/dashboard/cascade.png\" alt=\"Diagram: on the left, one update fans out and re-renders every widget; on the right, a Redux selector filter sends each widget only its own data\" loading=\"lazy\"><figcaption>Before, one update re-rendered every widget. After, each widget only hears about its own data.</figcaption></figure>"
   },
   {
    "kicker": "2 · What I built",
    "title": "One screen with the signals that matter",
    "lead": "<p class=\"lead\">A React dashboard where every widget loads and updates on its own. It was one part of a full dashboard redesign I took on by myself.</p>",
    "read": "<p>It brings the main account signals onto one screen: performance metrics, a metric comparison chart, the PPC audit score, top elements and the account quality score.</p><ul><li><b>Scoped data.</b> Each widget subscribes only to the data it needs, through Redux Toolkit slices, so one update no longer re-renders the whole page.</li><li><b>Load on scroll.</b> The page shell appears straight away. Heavy charts and tables load as they scroll into view.</li><li><b>Layouts from JSON.</b> A rendering engine builds each layout from a JSON config, so a new ad platform is mostly a new config, not new code.</li></ul><p>It went to a beta group first. After good feedback it launched for everyone, with the option to switch back to the old dashboard.</p>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/dashboard/dynamic-widget-hydration.png\" alt=\"Diagram: a JSON pipeline feeds a core registry engine, which renders charts, data lists and metric cards\" loading=\"lazy\"><figcaption>A JSON config goes in; the registry engine turns it into charts, lists and metric cards.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%work/optmyzr-widget-config.jpg\" alt=\"Code: a WidgetConfig interface with layout, panels and spacing, mapped to dashboard panels\" loading=\"lazy\"><figcaption>One config object describes layout, panels and spacing for a widget.</figcaption></figure>"
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "What I chose, and why",
    "lead": "<p class=\"lead\">A plug-and-play system over managing each ad platform separately.</p>",
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">A plug-and-play layout built from a JSON config</span></div><div><span class=\"mono\">Over</span><span>Hand-building a layout for each ad platform</span></div><div><span class=\"mono\">Because</span><span>New platforms then needed no changes to the core</span></div></div>\n<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Loading heavy charts and tables as they scroll into view</span></div><div><span class=\"mono\">Over</span><span>Loading everything when the page opens</span></div><div><span class=\"mono\">Because</span><span>People need the top of the dashboard in under a second; the rest can follow</span></div></div>",
    "full": "<p>The architecture held up well. With more time I would have explored what it opened up: letting people save dashboard views for each ad account, and share those views with their teammates.</p>"
   },
   {
    "kicker": "4 · Result",
    "title": "Under a second",
    "lead": "<div style=\"display: flex; gap: 48px; flex-wrap: wrap; align-items: flex-end\"><div><div class=\"stat\">10 s</div><span class=\"mono\">Before</span></div><div><div class=\"stat\">&lt;1 s</div><span class=\"mono\" style=\"color: var(--ok)\">After</span></div></div>",
    "read": "<ul><li><b>Under a second.</b> Load time fell from up to 10 seconds to under one.</li><li><b>New platforms without core changes.</b> Adding Microsoft Ads, Amazon Ads and Meta Ads was mostly a matter of JSON configs.</li><li><b>3× more component reuse.</b> Other developers stopped rewriting components and worked in configs. Only components specific to one account type were new.</li><li><b>Fewer support tickets</b> about the account dashboard.</li></ul>",
    "full": "<p>What I learned: investing some time in architecture goes a long way. Adding three ad platforms later was routine because of it.</p>"
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
    "full": "<p>Setup took minutes, and the session recordings showed many people leaving during the wait.</p>"
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
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Plain-language goals, mapped to Target CPA, ROAS and conversion value</span></div><div><span class=\"mono\">Over</span><span>Asking users for technical metrics directly</span></div><div><span class=\"mono\">Because</span><span>Goals are how people think; the system can do the translation</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Saving each step as it’s completed</span></div><div><span class=\"mono\">Over</span><span>Submitting everything at the end</span></div><div><span class=\"mono\">Because</span><span>The recommendation engine gets context by the time setup finishes, and answers are saved step by step, so they survive a drop-off</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">A beta group first, then everyone</span></div><div><span class=\"mono\">Over</span><span>Launching to all users at once</span></div><div><span class=\"mono\">Because</span><span>Validate with real users before rolling out to 100%</span></div></div>",
    "full": ""
   },
   {
    "kicker": "4 · Result",
    "title": "Waiting became onboarding",
    "lead": "<div class=\"stats\"><div><div class=\"stat\" style=\"font-size: 44px\">~25%</div><span class=\"mono\">Less setup drop-off</span></div><div><div class=\"stat\" style=\"font-size: 44px\">+11%</div><span class=\"mono\">Higher completion</span></div><div><div class=\"stat\" style=\"font-size: 44px\">100%</div><span class=\"mono\">Rolled out after beta</span></div></div>",
    "read": "<ul><li><b>About 25% less drop-off</b> during account creation, by turning waiting time into an active, useful step.</li><li><b>Higher onboarding completion</b> across new users.</li><li><b>Richer personalisation data</b> up front, so recommendations were relevant from day one.</li></ul>",
    "full": "<p>A wait is not dead time. If people have to wait anyway, it’s the best moment to ask them what they need.</p>"
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
    "Social Interaction · University of Trento"
   ],
   [
    "My role",
    "Research synthesis, behavioural framing, interaction logic, hi-fi prototyping"
   ],
   [
    "Team",
    "Group of 4"
   ],
   [
    "Platform",
    "Mobile OS concept"
   ]
  ],
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
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/you/assumptions-research.jpg\" alt=\"Research synthesis board with sticky notes grouped into behavioural assumptions\" loading=\"lazy\"><figcaption>Fig 01 · Research synthesis and behavioural assumptions.</figcaption></figure>"
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
    "full": ""
   },
   {
    "kicker": "4 · Result",
    "title": "A cohesive nudge system",
    "lead": "<div class=\"stats\"><div><div class=\"stat\" style=\"font-size: 44px\">2</div><span class=\"mono\">Personas</span></div><div><div class=\"stat\" style=\"font-size: 44px\">2</div><span class=\"mono\">Kinds of nudge</span></div><div><div class=\"stat\" style=\"font-size: 44px\">0</div><span class=\"mono\">Private content read</span></div></div>",
    "read": "<ul><li><b>An OS-level behavioural framework,</b> prototyped as an assistant that adapts its interventions to real-time emotional self-awareness.</li><li><b>A dual-process nudge system</b> that combines subtle System 1 cues (haptic breathing pulses, app-delay timers) with reflective System 2 prompts (adjusting goals, a letter to your future self).</li><li><b>Privacy by design.</b> Meaningful nudges from rhythm tracking alone, without monitoring content.</li></ul>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/you/cover.jpg\" alt=\"YOU, Super-ego app cover with three characters labelled super-ego, ego and id\" loading=\"lazy\"><figcaption>YOU, the Super-ego app.</figcaption></figure>"
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
    "UX researcher · facilitator"
   ],
   [
    "Team",
    "Group of 4"
   ]
  ],
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
  "signature": null,
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
    "full": ""
   },
   {
    "kicker": "2 · What we did",
    "title": "Two lenses, one workshop",
    "lead": "<p class=\"lead\">We looked at A+ as experts first, then through the eyes of users with disabilities, and brought both sets of findings into a workshop.</p>",
    "read": "<div class=\"methods\">\n<div><span class=\"mono\">Lens 1</span><h3>Inspection-based evaluation</h3><p>We identified usability issues, checked the platform against established usability and design principles, and tested its compliance with accessibility standards. Findings from the heuristic evaluation were rated by severity and grouped by theme.</p></div>\n<div><span class=\"mono\">Lens 2</span><h3>User-based evaluation</h3><p>We observed and interviewed users with disabilities to find their pain points and check our earlier findings. Their sessions were analysed through qualitative coding and affinity diagramming.</p></div>\n<div><span class=\"mono\">Analysis</span><h3>Affinity diagram + severity comparison</h3><p>We compared how severity ratings were distributed across the two evaluations. AI supported the analysis, but every output was cross-checked and refined by hand.</p></div>\n<div><span class=\"mono\">Workshop</span><h3>Prioritise, then ideate</h3><p>A workshop with prioritisation and ideation activities to agree on the issues that mattered most and explore how to fix them.</p></div>\n</div><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/affinity.jpg\" alt=\"Affinity diagram grouping findings into five themes: navigation efficiency, accessibility and readability, interface design, user experience, and submission feedback\"><figcaption>The affinity diagram: five themes emerged from the user sessions.</figcaption></figure><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/workshop.jpg\" alt=\"Workshop participants around a table working through printed problem cards\" loading=\"lazy\"><figcaption>The workshop: prioritising problems in small groups.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/whiteboard.jpg\" alt=\"Whiteboard with printed problem cards grouped under Accessibility and Plugin-related problems\" loading=\"lazy\"><figcaption>Problem cards sorted by theme.</figcaption></figure></div>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/aplus/severity.jpg\" alt=\"Two stacked bar charts of severity ratings by category, one for the inspection-based and one for the user-based evaluation\"><figcaption>Distribution of severity ratings by category, inspection vs. user tests.</figcaption></figure>"
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
    "full": "<p>Combining the two methods proved more valuable than either alone. Seeing findings from both converge gave the team much stronger confidence in the final recommendations.</p><p>The workshop was where the project came together. Facilitating discussion between groups, and balancing interface design against the platform’s pedagogical decisions, was the hardest part. It made clear that good accessibility work is rarely just a design problem: it means understanding the constraints and intentions behind the system you’re evaluating.</p>"
   }
  ],
  "next": {
   "slug": "social-integration-pd",
   "title": "Mesa Te Club",
   "sub": "Co-design tools, Chile"
  }
 },
 {
  "slug": "social-integration-pd",
  "code": "SN-06",
  "chapter": "Chapter 02 · The designer",
  "title": "Mesa Te Club: designing shared spaces over a cup of tea",
  "dek": "In Chile’s DS19 housing programme, families on subsidies and families who bought at market price share a building, but rarely its courtyard. Mesa Te Club is a participatory design framework that brings future residents, developers, municipalities and the housing ministry to the same table, with tea and a set of playful tools, to design the common areas together.",
  "meta": [
   [
    "Year",
    "2024"
   ],
   [
    "Type",
    "Participatory design proposal · Aalto University"
   ],
   [
    "My role",
    "Workshop design, research synthesis and co-design tools"
   ],
   [
    "Team",
    "Group of 4"
   ],
   [
    "Context",
    "DS19 social housing, Chile"
   ]
  ],
  "skills": [
   "Participatory design",
   "Co-design workshops",
   "Stakeholder mapping",
   "Facilitation",
   "Game design",
   "Miro"
  ],
  "links": [
   {
    "label": "Full case study (PDF) ↗",
    "href": "https://drive.google.com/file/d/1CY0eJk9NE1xTOhLDLWOJgP_xtaGxVlD_/view?usp=sharing"
   }
  ],
  "signature": null,
  "label2": "What I designed",
  "glance": [
   "Mixed-income buildings with common areas nobody uses, designed before anyone moves in.",
   "Six co-design activities built on a tea ritual residents already had.",
   "An existing ritual over a new meeting; real prices over wish lists.",
   "6 steps",
   "From first ideas to life in the finished space"
  ],
  "secs": [
   {
    "kicker": "1 · Problem",
    "title": "Integration on paper, segregation in the courtyard",
    "lead": "<p class=\"lead\">You move into a new apartment. There’s a courtyard downstairs, a couple of benches, a patch of grass. On paper it’s a common area. In practice, nobody uses it. The kids from the subsidised units play on one side, the families who bought at market price stay on the other.</p>",
    "read": "<p>DS19 asks private developers to reserve some units for vulnerable families, mixed in with market-rate buyers, to reduce segregation inside the same building. In practice, three things get in the way:</p><ul><li><b>Spaces are designed top-down.</b> Common areas are optimised for cost and maintenance, not social life. Residents arrive after it’s built.</li><li><b>Integration only on paper.</b> The Social Integration Plan mandates activities, but never touches the design of shared spaces.</li><li><b>A missed opportunity.</b> DS19 already runs “Mesa Te Club” tea gatherings, but uses them to talk at people, not with them.</li></ul><p>That last one changed everything for me. There was already a table, already tea, already a name. What if we turned that table into a design studio?</p><blockquote class=\"quote\">What if the common areas of social housing were co-designed by the people who will actually live there, through something as simple as sharing tea?</blockquote>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/mesa/cover.jpg\" alt=\"A long outdoor table of people sharing tea, annotated with the actors who would sit at it: residents, developers, municipality, ministry of housing and experts\" loading=\"lazy\"><figcaption>Everyone at one table: the idea in a picture. Photo: Te Club.</figcaption></figure><p>Before designing anything, I mapped who has a stake in a DS19 common area, what drives each of them, and what blocks them.</p><ul><li><b>Housing ministry.</b> Sets the guidelines and balances budget with integration goals, but is far from residents’ everyday life.</li><li><b>Municipalities.</b> Closest to the urban challenges and want better tools, but lack resources and design methods.</li><li><b>Developers.</b> Experts in construction and cost, reluctant to take on social responsibilities or hand residents any design power.</li><li><b>Residents.</b> Want affordable housing, safe spaces for children and a place for community. They have the most at stake and the least say.</li></ul><figure class=\"fig\"><img src=\"%ASSET%cases/mesa/stakeholder-ecosystem.jpg\" alt=\"Main actors and agendas: a four-part circle of housing ministry, municipalities, developers and residents, each with their goals\" loading=\"lazy\"><figcaption>Four actors, four agendas. Everyone wanted better common areas; nobody had a way to design them together.</figcaption></figure>"
   },
   {
    "kicker": "2 · What I designed",
    "title": "Six activities, one table",
    "lead": "<p class=\"lead\">The framework turns the existing tea gatherings into a ladder of co-design activities, each fitted to a moment in the DS19 timeline and asking for a different kind of input.</p>",
    "read": "<ul><li><b>Tree of Dreams.</b> Future residents leave ideas for their homes online and in the sales room, from day one.</li><li><b>Mesa Te Club.</b> Tea and snacks with future neighbours: updates on the project, and more ideas for the ideal common space.</li><li><b>Build-A-Space Lab.</b> Architects, planners, municipal social workers and developers work through a Common Area Canvas to set the requirements.</li><li><b>Playing Sims.</b> Future residents arrange pre-priced modules on a plan of their building, then vote on the best layout.</li><li><b>Design Reveal.</b> The chosen design goes out by email, on the website and in the WhatsApp group, so expectations are right.</li><li><b>“Never have I ever”.</b> Months after move-in, residents and developers play a custom card game in the finished space to learn what works.</li></ul><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/mesa/common-area-canvas.jpg\" alt=\"Common Area Canvas with boxes for key components, value, neighbour relationship, resident segments, required elements, concerns, geography and cost structure\" loading=\"lazy\"><figcaption>The Common Area Canvas for the experts’ lab.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/mesa/playing-sims.jpg\" alt=\"Playing Sims: pre-priced module cards such as a pool, a slide and a bench, placed on a plan of the building’s common area\" loading=\"lazy\"><figcaption>Playing Sims: pre-priced modules on the building plan.</figcaption></figure></div>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/mesa/co-design-activities-overview.jpg\" alt=\"Co-design activities table: aim, channels, target group, recording method, outcome, timespan and level of participation for each of the six activities\" loading=\"lazy\"><figcaption>The full framework: aim, channels, who takes part, outcome and timing for each activity.</figcaption></figure><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/mesa/design-reveal.jpg\" alt=\"Design Reveal: an email announcing that the common space project is coming to life, sent to future residents by email, website and WhatsApp\" loading=\"lazy\"><figcaption>Design Reveal: closing the loop with every future resident.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/mesa/never-have-i-ever.jpg\" alt=\"“Never have I ever” cards with prompts about using the common space, and open discussion questions underneath\" loading=\"lazy\"><figcaption>The post-occupancy card game.</figcaption></figure></div><figure class=\"fig\"><img src=\"%ASSET%cases/mesa/how-it-fits-together.jpg\" alt=\"Timeline of the Social Integration Plan over about three years, showing where the common area activities sit from Tree of Dreams to Never Have I Ever\" loading=\"lazy\"><figcaption>How it fits the Social Integration Plan’s timeline.</figcaption></figure>"
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "What I chose, and why",
    "lead": "<p class=\"lead\">Each choice lowers the cost of taking part, for residents and for developers.</p>",
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Building on the tea gatherings DS19 already runs</span></div><div><span class=\"mono\">Over</span><span>New, formal consultation meetings</span></div><div><span class=\"mono\">Because</span><span>The table, the tea and the name already existed. Changing how they’re used is easier than asking people to come to something new.</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Pre-priced modules on a real plan</span></div><div><span class=\"mono\">Over</span><span>Open wish lists</span></div><div><span class=\"mono\">Because</span><span>Residents negotiate within the actual budget, so what they choose can be built.</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Activities timed to DS19’s legal milestones</span></div><div><span class=\"mono\">Over</span><span>A separate process running alongside</span></div><div><span class=\"mono\">Because</span><span>Developers can adopt it within their budget and schedule, without slowing delivery.</span></div></div>",
    "full": ""
   },
   {
    "kicker": "4 · Result",
    "title": "A framework developers could actually run",
    "lead": "<div class=\"stats\"><div><div class=\"stat\" style=\"font-size: 44px\">6</div><span class=\"mono\">Co-design activities</span></div><div><div class=\"stat\" style=\"font-size: 44px\">4</div><span class=\"mono\">Actors at one table</span></div><div><div class=\"stat\" style=\"font-size: 44px\">0–48</div><span class=\"mono\">Months covered</span></div></div>",
    "read": "<ul><li><b>A framework that fits the system.</b> Structured co-design that works within developer budgets and DS19’s legal milestones, while giving residents a real say over shared space.</li><li><b>Co-design as a ritual.</b> Top-down meetings turned into tea-time design sessions with tangible, playful tools.</li></ul>",
    "full": "<p>Read the whole thing: <a href=\"https://drive.google.com/file/d/1CY0eJk9NE1xTOhLDLWOJgP_xtaGxVlD_/view?usp=sharing\" target=\"_blank\" rel=\"noopener noreferrer\">the full case study (PDF) ↗</a>.</p>"
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
    "Helsinki"
   ]
  ],
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
    "full": ""
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "What we said no to",
    "lead": "<p class=\"lead\">A delivery process, not another set of guidelines.</p>",
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">A delivery framework with code-level primitives</span></div><div><span class=\"mono\">Over</span><span>More guidelines or audit reports</span></div><div><span class=\"mono\">Because</span><span>Teams need accessibility in the first commit, not in a report after release</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Co-designing with users with disabilities</span></div><div><span class=\"mono\">Over</span><span>Designing from compliance rules alone</span></div><div><span class=\"mono\">Because</span><span>Lived experience grounds decisions in what actually helps</span></div></div>",
    "full": ""
   },
   {
    "kicker": "4 · Result",
    "title": "2nd of 900+",
    "lead": "<div class=\"stats\"><div><div class=\"stat\" style=\"font-size: 44px\">2nd</div><span class=\"mono\">Grand Final</span></div><div><div class=\"stat\" style=\"font-size: 44px\">900+</div><span class=\"mono\">European applicants</span></div><div><div class=\"stat\" style=\"font-size: 44px\">Day 1</div><span class=\"mono\">Accessibility in delivery</span></div></div>",
    "read": "<ul><li><b>2nd place Grand Finalist</b> out of 900+ European applicants in EIT Jumpstarter 2025, New European Bauhaus category.</li><li><b>Accessibility from day one.</b> We showed it can be built into product delivery without slowing launches.</li></ul><p><a href=\"https://wearegroundwork.org/\" target=\"_blank\" rel=\"noopener\">wearegroundwork.org ↗</a></p>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%work/groundwork.jpg\" alt=\"Groundwork cover reading: Built for everyone, from the ground up.\" loading=\"lazy\"><figcaption>Groundwork.</figcaption></figure>"
   }
  ],
  "next": {
   "slug": "gosta-labs",
   "title": "Gosta Labs",
   "sub": "Presented to the CEO & board"
  }
 },
 {
  "slug": "gosta-labs",
  "code": "SN-09",
  "chapter": "Chapter 02 · The designer",
  "title": "Gosta Labs: getting an AI MedTech startup ready to grow beyond Finland",
  "dek": "Gosta Labs makes an AI assistant that writes clinical notes from doctor–patient conversations. In a course project with Aalto University, our team planned its move into Poland, Czechia and Romania. I led the internal side: what the company itself had to change to grow, written up as a three-year roadmap for the CEO and board.",
  "meta": [
   [
    "Year",
    "2025 · April–June"
   ],
   [
    "Type",
    "Strategy project · Global Business in the Digital Age, Aalto University"
   ],
   [
    "My role",
    "Student consultant · led the internal development track"
   ],
   [
    "Team",
    "Group of 5"
   ],
   [
    "Client",
    "Gosta Labs · AI clinical documentation"
   ]
  ],
  "skills": [
   "Organisational strategy",
   "Stakeholder interviews",
   "Market research",
   "Go-to-market",
   "Roadmapping"
  ],
  "links": [
   {
    "label": "Final presentation (PDF) ↗",
    "href": "%ASSET%cases/gosta/final-presentation.pdf"
   }
  ],
  "signature": null,
  "label2": "What I did",
  "glance": [
   "Eleven healthcare customers in Finland, and no structure yet to grow beyond it.",
   "Led the internal track: a readiness check, CEO interviews and a three-year roadmap.",
   "Two markets first, sold through local partners, before a third.",
   "3 years",
   "Internal roadmap, presented to the CEO and board"
  ],
  "secs": [
   {
    "kicker": "1 · Problem",
    "title": "Growing in Finland, not yet built to grow abroad",
    "lead": "<p class=\"lead\">Gosta Labs had 11 healthcare customers and growing revenue in Finland. The next step was Central and Eastern Europe, and two kinds of problems stood in the way.</p>",
    "read": "<ul><li><b>Outside the company.</b> Different national healthcare rules, local language models, slow hospital procurement, and very different levels of electronic health record (EHR) maturity from country to country.</li><li><b>Inside the company.</b> No formal role definitions or competence map, no regular loop from sales back to product, and no model for deciding where people and money go.</li></ul><p>The second list is often the one that breaks a startup while it expands.</p>",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/gosta/market-prioritisation.jpg\" alt=\"Market prioritization slide: a table of opportunity and challenge for Poland, Czechia and Romania next to a map of Central and Eastern Europe\" loading=\"lazy\"><figcaption>Where to start: the opportunity and the challenge in each target market.</figcaption></figure>"
   },
   {
    "kicker": "2 · What I did",
    "title": "Readiness first, then a roadmap",
    "lead": "<p class=\"lead\">Our group split into a <b>market track</b> and an <b>internal track</b>. I led the internal track, where I brainstormed on “Is the company ready to grow, and what has to change first?”</p>",
    "read": "<ul><li><b>Readiness assessment.</b> I looked at how the team plans, works, hires and spends, to find what would not survive a second and third market.</li><li><b>Interviews with the CEO.</b> I prepared and ran them to find the real bottlenecks in day-to-day work, so the analysis matched how the startup actually runs.</li><li><b>A three-year roadmap.</b> Competence, operations and resources, year by year: who to hire and when, which processes to write down, and how to allocate people and budget.</li><li><b>Handover.</b> I co-wrote the final report and presented the recommendations to the CEO and executive board.</li></ul>",
    "full": "<p>The roadmap rested on four pieces of work:</p><ul><li><b>Go-to-market fit.</b> Hospital procurement, competitors, EHR integration paths and flexible pricing in Poland, Czechia and Romania (with the market track).</li><li><b>Competency and hiring plan.</b> A 12–24 month map of skills and hires, with clear roles and paths to move between teams.</li><li><b>Written-down processes.</b> Core workflows documented, and a feedback loop so what sales hears reaches product.</li><li><b>Resource planning.</b> A quarterly model that ties hiring, workload and budget to the market rollout.</li></ul><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/gosta/internal-strategy.jpg\" alt=\"Internal Development Strategy slide listing three areas: competency gaps, formalising operations, and resource allocation and role clarity\" loading=\"lazy\"><figcaption>The three areas the internal analysis pointed to.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/gosta/roadmap.jpg\" alt=\"Roadmap slide: a table of competence, operations and resources for year 1, year 2 and year 3\" loading=\"lazy\"><figcaption>The three-year roadmap, as presented.</figcaption></figure></div>"
   },
   {
    "kicker": "3 · Trade-offs",
    "title": "What we chose, and why",
    "lead": "<p class=\"lead\">Each choice keeps the expansion small enough to learn from before it grows.</p>",
    "read": "<div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Poland and Czechia first, Romania later</span></div><div><span class=\"mono\">Over</span><span>Entering all three markets at once</span></div><div><span class=\"mono\">Because</span><span>Poland has mature health records and EU funding; Czechia has acute doctor burnout and R&amp;D strength. Romania is planned once the first pilots have made the case.</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Selling through local partners</span></div><div><span class=\"mono\">Over</span><span>Selling directly from Finland</span></div><div><span class=\"mono\">Because</span><span>Hospital tenders and EHR integration need people on the ground; procurement can’t be managed from afar.</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Hire and document before scaling</span></div><div><span class=\"mono\">Over</span><span>Growing the team as deals come in</span></div><div><span class=\"mono\">Because</span><span>Clear roles and written-down processes let new regional teams start without the Finnish team slowing down.</span></div></div>",
    "full": ""
   },
   {
    "kicker": "4 · Result",
    "title": "Handed to the CEO and the board",
    "lead": "<div class=\"stats\"><div><div class=\"stat\" style=\"font-size: 44px\">3 years</div><span class=\"mono\">Internal roadmap</span></div><div><div class=\"stat\" style=\"font-size: 44px\">24 mo</div><span class=\"mono\">Market entry plan</span></div><div><div class=\"stat\" style=\"font-size: 44px\">3</div><span class=\"mono\">Markets assessed</span></div></div>",
    "read": "<ul><li><b>A strategy on two tracks.</b> A plan for entering Central and Eastern Europe, and a three-year plan for the company itself, presented to the CEO and executive board.</li><li><b>A blueprint to grow without breaking what works.</b> Hiring, processes and resourcing laid out so the expansion doesn’t disrupt the Finnish business.</li></ul>",
    "full": "<p>Read the whole thing: <a href=\"%ASSET%cases/gosta/final-presentation.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">the final presentation (PDF) ↗</a>.</p><figure class=\"fig\"><img src=\"%ASSET%cases/gosta/gtm-partnerships.jpg\" alt=\"GTM partnerships slide: Gosta Labs in the middle of university hospitals, EHR vendors, policy stakeholders and health IT consultants, with short, mid and long-term steps\" loading=\"lazy\"><figcaption>Who Gosta Labs would sell with, and in what order.</figcaption></figure>"
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
