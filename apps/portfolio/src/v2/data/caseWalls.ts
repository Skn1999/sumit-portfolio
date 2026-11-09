/* Process-wall case pages (the "30 sec read" layout) for the four homepage cases.
   Generated from the design canvas ("Case studies · process wall" page). Body fields are trusted HTML
   authored for this site; %ASSET% is replaced with the public/v2 base path, <!--race--> marks the load race. */

export type WallItem = {
  /** index of the beat (step) this artefact belongs to */
  b: number;
  t: "img" | "quote" | "stat" | "tradeoff" | "grid" | "race";
  src?: string; ar?: number; lab?: string; row?: string;
  pins?: [number, number, string][]; hand?: string;
  k?: string; v?: string; n?: string; c?: string; o?: string; bc?: string;
};
export type Beat = { label: string; toc: string; headline: string; sub: string; full: string };
export type CaseWall = {
  slug: string; title: string; dek: string; facts: [string, string][];
  cover: { video: string; poster: string; tint: string; label: string };
  links: { label: string; href: string }[];
  beats: Beat[]; wall: WallItem[];
};

export const CASE_WALLS: CaseWall[] = [
 {
  "slug": "ediaqi-decision-support-system",
  "title": "Indoor air quality, made readable for 200 people",
  "dek": "An in-room tablet and a facility dashboard that turn 12+ sensor readings into one clear action.",
  "facts": [
   [
    "Role",
    "UX/UI lead"
   ],
   [
    "With",
    "Deda Next · EU Horizon"
   ],
   [
    "When",
    "2026 · Ferrara"
   ]
  ],
  "cover": {
   "video": "covers/ediaqi.mp4",
   "poster": "covers/ediaqi-poster.jpg",
   "tint": "#D6F0E0",
   "label": "Animated cover: the in-room display turning a CO₂ reading into one action"
  },
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
  "beats": [
   {
    "label": "Context",
    "toc": "32 sensors, 12+ readings",
    "headline": "Ferrara’s schools had 32 sensors streaming 12+ readings…",
    "sub": "Rich data, but nobody in the room could watch a dashboard all day.",
    "full": "<p>Deda Next streams 12+ parameters — CO₂, PM2.5, PM10, TVOC, formaldehyde, NO₂, O₃ and more — from 32 sensors in public schools and municipal offices. Rich data didn’t make the rooms any safer.</p><p>The data reaches a central FROST server through the OGC SensorThings API, alongside Radiello passive samplers. My job was the bridge between that backend and non-technical people making decisions.</p>"
   },
   {
    "label": "Hypotheses",
    "toc": "Alerts, but no action",
    "headline": "…but when the air turned bad, nobody knew what to do.",
    "sub": "I wrote five hypotheses before designing anything. The first one framed the project.",
    "full": "<ul><li><b>Nobody can monitor all day.</b> Teachers and office workers can’t stay logged into a dashboard while doing their actual jobs.</li><li><b>Alerts didn’t say what to do.</b> The legacy prototype showed raw spikes with no action protocol, so alerts went untreated: open the windows, but for how long?</li><li><b>The wrong density.</b> Basic views used vague one-word labels; advanced views used dense time-series charts. Neither helps a non-expert decide under pressure.</li></ul><blockquote class=\"quote\">“I don’t think it’s enough to have a blinking light, a red light that says there is a problem.”<cite>Research participant</cite></blockquote><blockquote class=\"quote\">“I opened the window. After a while, I’m freezing. I’m not able to understand that it is cold and it’s time to close… It’s too late for me.”<cite>Research participant</cite></blockquote><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/hypotheses.jpg\" alt=\"Five problem hypotheses written as We believe, because, this leads to, we will know this is true if\" loading=\"lazy\"><figcaption>Fig 01 · Problem hypotheses and stakeholder mapping.</figcaption></figure>"
   },
   {
    "label": "Audit",
    "toc": "30 issues in the old display",
    "headline": "The existing display broke 30 usability rules.",
    "sub": "A heuristic evaluation of the legacy prototype, every issue rated by severity.",
    "full": "<p>I audited the existing prototype, tested the core design question with 200 people, then designed an in-room tablet and a facility dashboard.</p><div class=\"auditw\"><span class=\"mono\">30 issues in the original prototype</span><div class=\"audit\" role=\"img\" aria-label=\"30 issues: 12 WCAG accessibility, 10 visibility of system status, 5 match with the real world, 3 consistency and standards\"><span style=\"width: 40%; background: #0D1117\">12 WCAG</span><span style=\"width: 33.3%; background: #57606A\">10 Status visibility</span><span style=\"width: 16.7%; background: #8B949E\">5 Real world</span><span style=\"width: 10%; background: #C9CED6; color: #0D1117\">3</span></div><span class=\"small\">12 accessibility (contrast, focus indicators, text that didn’t scale) · 10 visibility of system status · 5 match between system and real world · 3 consistency and standards</span></div><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/heuristics.jpg\" alt=\"Charts of the heuristic evaluation: top heuristic violations and distribution of issue severity\" loading=\"lazy\"><figcaption>Fig 02 · Nielsen heuristic evaluation, 30 documented issues.</figcaption></figure>"
   },
   {
    "label": "Study",
    "toc": "My hypothesis, disproved",
    "headline": "I bet on progressive disclosure. 200 people proved me wrong.",
    "sub": "Upfront, in text with icons, beat hiding detail in all six breach scenarios.",
    "full": "<p>I expected progressive disclosure to reduce clutter. A 2×2 mixed factorial study with 200 participants across 6 breach scenarios showed the opposite: people understood and acted faster when everything was up front.</p><div class=\"m22\" role=\"table\" aria-label=\"2 by 2 study design: disclosure by modality\"><div role=\"columnheader\"><span class=\"mono\">Disclosure ↓ · Modality →</span></div><div role=\"columnheader\"><b>Text only</b></div><div role=\"columnheader\"><b>Text + graphics</b></div><div role=\"rowheader\"><b>Upfront</b></div><div><span class=\"mono\">Cell A</span>High comprehension, moderate cognitive load.</div><div class=\"best\"><span class=\"mono\">Cell B · best</span>Highest comprehension, lowest cognitive load.</div><div role=\"rowheader\"><b>Progressive</b></div><div><span class=\"mono\">Cell C</span>Lower actionability, more cognitive friction.</div><div><span class=\"mono\">Cell D</span>Moderate comprehension, slower to act.</div></div><p class=\"small\">Measured: problem comprehension speed, action accuracy, and subjective cognitive load.</p><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span><b>Upfront disclosure</b></span></div><div><span class=\"mono\">Over</span><span>Progressive disclosure</span></div><div><span class=\"mono\">Because</span><span>Higher comprehension in time-critical scenarios, from the 200-person study</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span><b>Text plus graphics</b></span></div><div><span class=\"mono\">Over</span><span>Text-only labels or dense charts</span></div><div><span class=\"mono\">Because</span><span>Icons with text cut cognitive load for people busy with their main task</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span><b>Two touchpoints</b></span></div><div><span class=\"mono\">Over</span><span>One central dashboard</span></div><div><span class=\"mono\">Because</span><span>Occupants can’t monitor a dashboard; facility staff need the detail</span></div></div><p><b>Scope compromises.</b> Fully automated compliance logging under Italian occupational-health rules (D.Lgs. 81/2008) needed legal input and was out of scope. A shared production token system with engineering wasn’t finished in time.</p>"
   },
   {
    "label": "Flows",
    "toc": "Every alert has one owner",
    "headline": "So every alert got an owner and a next step.",
    "sub": "Occupant, facility staff or the system: who acts, how, and what gets logged.",
    "full": "<p>Occupant-owned, staff-owned or system-owned: three scenarios decide who acts, through which channel, and what gets logged.</p><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/scenarios.jpg\" alt=\"Flowcharts for three scenarios: occupant-owned CO2 alert, staff-owned sustained PM2.5, and a system-owned CO emergency\" loading=\"lazy\"><figcaption>Fig 03 · Scenario flows for the tablet’s display states.</figcaption></figure>"
   },
   {
    "label": "Wireframes",
    "toc": "Nudge, act, remind",
    "headline": "Then I sketched what the display says, minute by minute.",
    "sub": "A nudge, a clear action, a reminder set in one tap, and a quiet return to normal.",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/wireframes.jpg\" srcset=\"%ASSET%cases/ediaqi/wireframes.jpg 1x, %ASSET%cases/ediaqi/wireframes@2x.jpg 2x\" alt=\"Four wireframes of the in-room display for Scenario A with sticky notes\" loading=\"lazy\"><figcaption>Fig 04 · Wireframes for Scenario A, with my notes from wireframing.</figcaption></figure>"
   },
   {
    "label": "Prototype",
    "toc": "Five states, one action each",
    "headline": "A tablet that tells people what to do, in five states.",
    "sub": "One status in plain Italian, a face anyone can read, one thing to do. Plus Dashboard V2.",
    "full": "<p>The wireframes settled what the display says and when. The prototype gives each state its tone: one status in plain Italian, a face anyone can read at a glance, and one thing to do.</p><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/tablet-display.jpg\" alt=\"The in-room tablet display prototype on two tablets\" loading=\"lazy\"><figcaption>The in-room tablet prototype: one status, plain words, a face anyone can read.</figcaption></figure><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/mockup-aria-buona.webp\" alt=\"A hand holding the tablet on the green Aria buona screen\" loading=\"lazy\"><figcaption>“Aria buona”: the ambient state, the air is fine.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/mockup-aria-scadente.webp\" alt=\"A hand holding the tablet on the amber Aria scadente screen\" loading=\"lazy\"><figcaption>“Aria scadente”: the air is getting worse, ventilate the room.</figcaption></figure></div><h3 class=\"sub-h\">Before and after</h3><div class=\"ww\"><span class=\"h\">Area</span><span class=\"h\">Before: legacy prototype</span><span class=\"h\">After: my redesign</span><span class=\"c\">Touchpoints</span><span class=\"bad\">One desktop dashboard that needed an active login and constant manual checks.</span><span>Two touchpoints: an in-room tablet for glanceable awareness, and Dashboard V2 for facility management.</span><span class=\"c\">Information architecture</span><span class=\"bad\">Progressive disclosure that hid the action steps behind nested dropdowns and tabs.</span><span>Upfront disclosure: severity, cause and a concrete next step on the main screen.</span><span class=\"c\">Modality</span><span class=\"bad\">Dense time-series charts and vague one-word labels like “Moderate” or “High”.</span><span>Text plus graphics: colour-coded states paired with clear illustrations.</span><span class=\"c\">Roles</span><span class=\"bad\">The same view for teachers and facility engineers.</span><span>Role-separated views: simple prompts for occupants, severity-ranked alert logs for facility staff.</span></div><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/dash-home.jpg\" alt=\"Dashboard V2 homepage: all locations with their air-quality status\" loading=\"lazy\"><figcaption>Dashboard V2 · all buildings at a glance.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/ediaqi/dash-location.jpg\" alt=\"Dashboard V2 location page: alerts sorted by severity\" loading=\"lazy\"><figcaption>Dashboard V2 · one location, alerts ranked by severity.</figcaption></figure></div><div class=\"stats\"><div><b>30</b><span class=\"mono\">Issues found &amp; resolved</span></div><div><b>200</b><span class=\"mono\">Study participants</span></div><div><b>5</b><span class=\"mono\">Display states</span></div><div><b>3</b><span class=\"mono\">Stakeholder groups</span></div></div><p>I delivered a high-fidelity interactive prototype of the five-state tablet display and low-fidelity prototypes of Dashboard V2, plus a documented audit of 30 usability and accessibility issues.</p>"
   },
   {
    "label": "Learned",
    "toc": "Instructions beat numbers",
    "headline": "Raw numbers don’t change behaviour. Instructions do.",
    "sub": "What the study and the prototype taught me, and what I’d test next.",
    "full": "<ul><li><b>Upfront beats progressive</b> when a breach needs action now.</li><li><b>Glanceability matters more than completeness.</b> Text with icons lowered cognitive load.</li><li><b>Raw numbers don’t change behaviour.</b> “PM2.5 = 45 µg/m³” without context and an action does nothing.</li><li><b>Habits win unless you interrupt them.</b> “The room feels fine to me” needs persistent visual feedback to overcome.</li></ul><p><b>With three more months</b>, I’d build a design system covering both visual tokens and micro-copy rules for every display state, and run in-situ tests with Deda Next’s engineers in Ferrara classrooms, measuring task completion, action accuracy, time to intervention and long-term behaviour change.</p><div class=\"ctas\"></div>"
   }
  ],
  "wall": [
   {
    "b": 0,
    "t": "stat",
    "k": "Sensor network",
    "n": "32",
    "v": "sensors in Ferrara’s schools and offices, streaming 12+ readings"
   },
   {
    "b": 1,
    "t": "img",
    "src": "cases/ediaqi/hypotheses.jpg",
    "ar": 3.794,
    "lab": "Hypotheses H1–H5"
   },
   {
    "b": 1,
    "t": "quote",
    "k": "Research participant",
    "v": "“I don’t think it’s enough to have a blinking light, a red light that says there is a problem.”"
   },
   {
    "b": 2,
    "t": "img",
    "src": "cases/ediaqi/heuristics.jpg",
    "ar": 3.453,
    "lab": "Heuristic evaluation"
   },
   {
    "b": 2,
    "t": "stat",
    "k": "Audit",
    "n": "30",
    "v": "issues in the original prototype, 12 of them accessibility"
   },
   {
    "b": 3,
    "t": "grid",
    "lab": "2×2 study, 200 people"
   },
   {
    "b": 3,
    "t": "tradeoff",
    "c": "Upfront disclosure",
    "o": "Progressive disclosure",
    "bc": "Higher comprehension in time-critical scenarios"
   },
   {
    "b": 4,
    "t": "img",
    "src": "cases/ediaqi/scenarios.jpg",
    "ar": 0.734,
    "lab": "Scenario flows A–C"
   },
   {
    "b": 5,
    "t": "img",
    "src": "cases/ediaqi/wireframes.jpg",
    "ar": 1.05,
    "lab": "Wireframes · Scenario A"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/tablet-display.jpg",
    "ar": 2.043,
    "lab": "Prototype"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/mockup-aria-buona.webp",
    "ar": 0.8,
    "lab": "Aria buona",
    "row": "mk"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/mockup-aria-scadente.webp",
    "ar": 0.8,
    "lab": "Aria scadente",
    "row": "mk"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/ambient.jpg",
    "ar": 0.561,
    "lab": "Five states",
    "row": "st"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/alert.jpg",
    "ar": 0.659,
    "lab": "",
    "row": "st"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/action-taken.jpg",
    "ar": 0.659,
    "lab": "",
    "row": "st"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/reported-to-staff.jpg",
    "ar": 0.782,
    "lab": "",
    "row": "st"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/summary-screen.jpg",
    "ar": 0.702,
    "lab": "",
    "row": "st"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/dash-home.jpg",
    "ar": 1.333,
    "lab": "Dashboard V2",
    "row": "dv"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/ediaqi/dash-location.jpg",
    "ar": 1.333,
    "lab": "",
    "row": "dv"
   },
   {
    "b": 7,
    "t": "quote",
    "k": "What I learned",
    "v": "“PM2.5 = 45 µg/m³” without context and an action does nothing."
   }
  ]
 },
 {
  "slug": "optmyzr-dashboard-migration",
  "title": "Cut dashboard load from 10 s to under 1 s",
  "dek": "I rebuilt Optmyzr’s account dashboard in React and cut its load time from about 10 seconds to under one.",
  "facts": [
   [
    "Role",
    "Design Engineer · solo"
   ],
   [
    "With",
    "Optmyzr · CORE Team"
   ],
   [
    "When",
    "2023"
   ]
  ],
  "cover": {
   "video": "covers/dashboard.mp4",
   "poster": "covers/dashboard-poster.jpg",
   "tint": "#DCE5F2",
   "label": "Animated cover: the dashboard loading widget by widget"
  },
  "links": [],
  "beats": [
   {
    "label": "Problem",
    "toc": "Ten seconds to load",
    "headline": "Optmyzr’s account dashboard took up to 10 seconds to load…",
    "sub": "It’s the first screen marketers and agencies open, to pull a report or decide where to spend next.",
    "full": "<p class=\"lead\">The account dashboard is the first screen people see in Optmyzr, and it took up to 10 seconds to load.</p><p>The people waiting were digital marketers and agencies running ad campaigns across several platforms. They open this dashboard first, often to pull a report or decide where to spend next, so it has to load fast and feel close to real time.</p><p>We heard it from customers, and my own profiling backed it up. We also kept test accounts with very large amounts of data; on those, the dashboard took 8–10 seconds before anyone could use it.</p>"
   },
   {
    "label": "Cause",
    "toc": "One update, every widget",
    "headline": "…because one changed value re-rendered every widget on the page.",
    "sub": "The old view layer, built on Backbone.js and jQuery, had no scoped state.",
    "full": "<p>The old view layer, built on Backbone.js and jQuery, had no scoped state. One changed value re-rendered every widget on the page, and adding a new ad platform meant copying layout boilerplate.</p><figure class=\"fig\"><img src=\"%ASSET%cases/dashboard/cascade.png\" alt=\"Diagram: on the left, one update fans out and re-renders every widget; on the right, a Redux selector filter sends each widget only its own data\" loading=\"lazy\"><figcaption>Before, one update re-rendered every widget. After, each widget only hears about its own data.</figcaption></figure>"
   },
   {
    "label": "Rebuild",
    "toc": "Each widget on its own",
    "headline": "So I rebuilt it in React, with each widget listening only to its own data.",
    "sub": "The page shell appears straight away; heavy charts and tables load as they scroll into view.",
    "full": "<p class=\"lead\">A React dashboard where every widget loads and updates on its own. It was one part of a full dashboard redesign I took on by myself.</p><p>It brings the main account signals onto one screen: performance metrics, a metric comparison chart, the PPC audit score, top elements and the account quality score.</p><ul><li><b>Scoped data.</b> Each widget subscribes only to the data it needs, through Redux Toolkit slices, so one update no longer re-renders the whole page.</li><li><b>Load on scroll.</b> The page shell appears straight away. Heavy charts and tables load as they scroll into view.</li></ul><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Loading heavy charts and tables as they scroll into view</span></div><div><span class=\"mono\">Over</span><span>Loading everything when the page opens</span></div><div><span class=\"mono\">Because</span><span>People need the top of the dashboard in under a second; the rest can follow</span></div></div>"
   },
   {
    "label": "Config",
    "toc": "Layouts from JSON",
    "headline": "Layouts come from a JSON config, so a new ad platform is a config, not new code.",
    "sub": "A registry engine turns one config into charts, lists and metric cards.",
    "full": "<ul><li><b>Layouts from JSON.</b> A rendering engine builds each layout from a JSON config, so a new ad platform is mostly a new config, not new code.</li></ul><figure class=\"fig\"><img src=\"%ASSET%cases/dashboard/dynamic-widget-hydration.png\" alt=\"Diagram: a JSON pipeline feeds a core registry engine, which renders charts, data lists and metric cards\" loading=\"lazy\"><figcaption>A JSON config goes in; the registry engine turns it into charts, lists and metric cards.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%work/optmyzr-widget-config.jpg\" alt=\"Code: a WidgetConfig interface with layout, panels and spacing, mapped to dashboard panels\" loading=\"lazy\"><figcaption>One config object describes layout, panels and spacing for a widget.</figcaption></figure><p class=\"lead\">A plug-and-play system over managing each ad platform separately.</p><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">A plug-and-play layout built from a JSON config</span></div><div><span class=\"mono\">Over</span><span>Hand-building a layout for each ad platform</span></div><div><span class=\"mono\">Because</span><span>New platforms then needed no changes to the core</span></div></div>"
   },
   {
    "label": "Result",
    "toc": "Under a second",
    "headline": "Load time fell from 10 seconds to under one.",
    "sub": "It went to a beta group first, then launched for everyone, with a way back to the old dashboard.",
    "full": "<div style=\"display: flex; gap: 48px; flex-wrap: wrap; align-items: flex-end\"><div><div class=\"stat\">10 s</div><span class=\"mono\">Before</span></div><div><div class=\"stat\">&lt;1 s</div><span class=\"mono\" style=\"color: var(--ok)\">After</span></div></div><!--race--><p>It went to a beta group first. After good feedback it launched for everyone, with the option to switch back to the old dashboard.</p><ul><li><b>Under a second.</b> Load time fell from up to 10 seconds to under one.</li><li><b>Fewer support tickets</b> about the account dashboard.</li></ul>"
   },
   {
    "label": "Learned",
    "toc": "Three platforms, mostly config",
    "headline": "Adding three more ad platforms later was routine.",
    "sub": "Microsoft Ads, Amazon Ads and Meta Ads were mostly JSON configs, and component reuse went up 3×.",
    "full": "<ul><li><b>New platforms without core changes.</b> Adding Microsoft Ads, Amazon Ads and Meta Ads was mostly a matter of JSON configs.</li><li><b>3× more component reuse.</b> Other developers stopped rewriting components and worked in configs. Only components specific to one account type were new.</li></ul><p>The architecture held up well. With more time I would have explored what it opened up: letting people save dashboard views for each ad account, and share those views with their teammates.</p><p>What I learned: investing some time in architecture goes a long way. Adding three ad platforms later was routine because of it.</p>"
   }
  ],
  "wall": [
   {
    "b": 0,
    "t": "img",
    "src": "cases/dashboard/old-dashboard.jpg",
    "ar": 1.318,
    "lab": "The old dashboard"
   },
   {
    "b": 0,
    "t": "stat",
    "k": "Large accounts",
    "n": "8–10 s",
    "v": "before anyone could use the dashboard"
   },
   {
    "b": 1,
    "t": "img",
    "src": "cases/dashboard/cascade.png",
    "ar": 1.834,
    "lab": "One update, every widget"
   },
   {
    "b": 2,
    "t": "tradeoff",
    "c": "Loading heavy charts and tables as they scroll into view",
    "o": "Loading everything when the page opens",
    "bc": "People need the top of the dashboard in under a second"
   },
   {
    "b": 3,
    "t": "img",
    "src": "cases/dashboard/dynamic-widget-hydration.png",
    "ar": 1.834,
    "lab": "Widget hydration"
   },
   {
    "b": 3,
    "t": "img",
    "src": "work/optmyzr-widget-config.jpg",
    "ar": 1.79,
    "lab": "WidgetConfig"
   },
   {
    "b": 4,
    "t": "race",
    "lab": "Live · the load race"
   },
   {
    "b": 4,
    "t": "stat",
    "k": "Result",
    "n": "10 s → <1 s",
    "v": "Dashboard load time"
   },
   {
    "b": 5,
    "t": "stat",
    "k": "Reuse",
    "n": "3×",
    "v": "more component reuse across the team"
   },
   {
    "b": 5,
    "t": "tradeoff",
    "c": "A plug-and-play layout built from a JSON config",
    "o": "Hand-building a layout for each ad platform",
    "bc": "New platforms then needed no changes to the core"
   }
  ]
 },
 {
  "slug": "a-plus-usability-project",
  "title": "Five minor issues, one major barrier",
  "dek": "An expert inspection and sessions with users with disabilities, compared to rank what A+’s developers should fix first.",
  "facts": [
   [
    "Role",
    "UX researcher · facilitator"
   ],
   [
    "With",
    "Aalto University · group of 4"
   ],
   [
    "When",
    "Feb – Jun 2025"
   ]
  ],
  "cover": {
   "video": "covers/aplus.mp4",
   "poster": "covers/aplus-poster.jpg",
   "tint": "#F6F7F9",
   "label": "Animated cover: five minor issues adding up to one major barrier in A+"
  },
  "links": [],
  "beats": [
   {
    "label": "Problem",
    "toc": "Known problems, no evidence",
    "headline": "A+ had known usability problems, but no evidence of how they affected real users.",
    "sub": "Least of all users with accessibility needs, on the platform behind many of Aalto’s computer-science courses.",
    "full": "<p class=\"lead\">A+ is an open-source learning platform developed and used at Aalto University for course delivery, assignments and student interaction, mostly in computer science.</p><p>Its usability limits were known, but nobody had a structured, evidence-based picture of how they affected real users — least of all users with accessibility needs.</p><p>We set out to evaluate A+’s usability and accessibility with a mix of collaborative inspection and user-based methods, give its development team prioritised recommendations, and explore how AI could help in the research.</p>"
   },
   {
    "label": "Lenses",
    "toc": "Experts, then users",
    "headline": "So we looked at it twice: as experts, then through users with disabilities.",
    "sub": "An inspection against usability and accessibility standards, then observed sessions and interviews.",
    "full": "<p class=\"lead\">We looked at A+ as experts first, then through the eyes of users with disabilities, and brought both sets of findings into a workshop.</p><div class=\"methods\"><div><span class=\"mono\">Lens 1</span><h3>Inspection-based evaluation</h3><p>We identified usability issues, checked the platform against established usability and design principles, and tested its compliance with accessibility standards. Findings from the heuristic evaluation were rated by severity and grouped by theme.</p></div><div><span class=\"mono\">Lens 2</span><h3>User-based evaluation</h3><p>We observed and interviewed users with disabilities to find their pain points and check our earlier findings. Their sessions were analysed through qualitative coding and affinity diagramming.</p></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Two methods, inspection and user tests</span></div><div><span class=\"mono\">Over</span><span>A single evaluation method</span></div><div><span class=\"mono\">Because</span><span>Inspection surfaced a broad set of possible issues; user tests showed which ones actually mattered</span></div></div>"
   },
   {
    "label": "Analysis",
    "toc": "Five themes",
    "headline": "Five themes emerged. We did the first pass; AI did a second to catch what we missed.",
    "sub": "AI-assisted affinity mapping, cross-checked and refined by hand.",
    "full": "<div class=\"methods one\"><div><span class=\"mono\">Analysis</span><h3>Affinity diagram + severity comparison</h3><p>We compared how severity ratings were distributed across the two evaluations. AI supported the analysis, but every output was cross-checked and refined by hand.</p></div></div><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/affinity.jpg\" alt=\"Affinity diagram grouping findings into five themes: navigation efficiency, accessibility and readability, interface design, user experience, and submission feedback\" loading=\"lazy\"><figcaption>The affinity diagram: five themes emerged from the user sessions.</figcaption></figure><p class=\"lead\">AI helped us sort the data. People made every call.</p><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">AI-assisted affinity mapping, refined by hand</span></div><div><span class=\"mono\">Over</span><span>Fully manual or fully automated analysis</span></div><div><span class=\"mono\">Because</span><span>The AI’s first pass gave a reasonable structure but missed the nuance and context in the data</span></div></div><p>Exploring AI for affinity mapping was useful and instructive. The initial output needed significant manual refinement to capture what the data actually contained — a practical reminder to use AI collaboratively, but critically.</p>"
   },
   {
    "label": "Compare",
    "toc": "Inspection vs. users",
    "headline": "Where expert and user findings converged, the team could trust them.",
    "sub": "We compared how severity was distributed across the two evaluations.",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/aplus/severity.jpg\" alt=\"Two stacked bar charts of severity ratings by category, one for the inspection-based and one for the user-based evaluation\" loading=\"lazy\"><figcaption>Distribution of severity ratings by category, inspection vs. user tests.</figcaption></figure><p>Combining the two methods proved more valuable than either alone. Seeing findings from both converge gave the team much stronger confidence in the final recommendations.</p>"
   },
   {
    "label": "Workshop",
    "toc": "Prioritise, then ideate",
    "headline": "A workshop turned the findings into priorities.",
    "sub": "Prioritisation and ideation in small groups, balancing interface fixes against how courses teach.",
    "full": "<div class=\"methods one\"><div><span class=\"mono\">Workshop</span><h3>Prioritise, then ideate</h3><p>A workshop with prioritisation and ideation activities to agree on the issues that mattered most and explore how to fix them.</p></div></div><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/workshop.jpg\" alt=\"Workshop participants around a table working through printed problem cards\" loading=\"lazy\"><figcaption>The workshop: prioritising problems in small groups.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/whiteboard.jpg\" alt=\"Whiteboard with printed problem cards grouped under Accessibility and Plugin-related problems\" loading=\"lazy\"><figcaption>Problem cards sorted by theme.</figcaption></figure></div>"
   },
   {
    "label": "Insight",
    "toc": "Minor issues, major impact",
    "headline": "Many minor issues added up to one major barrier.",
    "sub": "Together they made A+ harder to use for everyone, not only users with accessibility needs.",
    "full": "<p class=\"lead\">The most revealing finding wasn’t any single issue but how they added up. Many problems were minor on their own, yet together they made A+ harder to use for everyone, not only users with accessibility needs.</p>"
   },
   {
    "label": "Fixes",
    "toc": "Prioritised fixes",
    "headline": "We handed the A+ team a prioritised list of fixes.",
    "sub": "Clearer focus states, a sticky sidebar, a back-to-top button and a semantic colour palette.",
    "full": "<p>We delivered prioritised improvement suggestions to the A+ team. Examples included clearer focus states for screen-reader users, a sticky sidebar and a back-to-top button for faster navigation, and a semantic colour palette for accessibility and visual consistency.</p><div class=\"two\"><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/palette.jpg\" alt=\"Proposed semantic colour palette: primary, secondary, info, warning, danger, success and two neutrals, each with a hex value\" loading=\"lazy\"><figcaption>A proposed semantic colour palette.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/aplus/sidebar.jpg\" alt=\"A+ course sidebar with clearer active and focus states on its navigation items\" loading=\"lazy\"><figcaption>Clearer active and focus states in the course sidebar.</figcaption></figure></div>"
   },
   {
    "label": "Learned",
    "toc": "Not just a design problem",
    "headline": "Good accessibility work is rarely just a design problem.",
    "sub": "It means understanding the constraints and intentions behind the system you’re evaluating.",
    "full": "<p>The workshop was where the project came together. Facilitating discussion between groups, and balancing interface design against the platform’s pedagogical decisions, was the hardest part. It made clear that good accessibility work is rarely just a design problem: it means understanding the constraints and intentions behind the system you’re evaluating.</p><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Interface-level recommendations</span></div><div><span class=\"mono\">Over</span><span>Changing how courses on A+ teach</span></div><div><span class=\"mono\">Because</span><span>Accessibility fixes had to respect the platform’s underlying pedagogical decisions</span></div></div>"
   }
  ],
  "wall": [
   {
    "b": 0,
    "t": "quote",
    "k": "Starting point",
    "v": "Usability limits were known, but nobody had a structured, evidence-based picture of how they affected real users."
   },
   {
    "b": 1,
    "t": "tradeoff",
    "c": "Two methods, inspection and user tests",
    "o": "A single evaluation method",
    "bc": "User tests showed which issues actually mattered"
   },
   {
    "b": 2,
    "t": "img",
    "src": "cases/aplus/affinity.jpg",
    "ar": 2.009,
    "lab": "Affinity diagram"
   },
   {
    "b": 2,
    "t": "tradeoff",
    "c": "AI-assisted affinity mapping, refined by hand",
    "o": "Fully manual or fully automated analysis",
    "bc": "The AI’s first pass missed nuance and context"
   },
   {
    "b": 3,
    "t": "img",
    "src": "cases/aplus/severity.jpg",
    "ar": 2.63,
    "lab": "Severity: inspection vs. users"
   },
   {
    "b": 4,
    "t": "img",
    "src": "cases/aplus/workshop.jpg",
    "ar": 0.753,
    "lab": "Workshop"
   },
   {
    "b": 4,
    "t": "img",
    "src": "cases/aplus/whiteboard.jpg",
    "ar": 0.752,
    "lab": "Problem cards"
   },
   {
    "b": 5,
    "t": "quote",
    "k": "Key finding",
    "v": "Many problems were minor on their own, yet together they made A+ harder to use for everyone."
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/aplus/palette.jpg",
    "ar": 1.794,
    "lab": "Semantic colour palette"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/aplus/sidebar.jpg",
    "ar": 0.956,
    "lab": "Sidebar focus states"
   },
   {
    "b": 7,
    "t": "tradeoff",
    "c": "Interface-level recommendations",
    "o": "Changing how courses on A+ teach",
    "bc": "Fixes had to respect the platform’s pedagogical decisions"
   }
  ]
 },
 {
  "slug": "super-ego-app",
  "title": "Nudges that catch the moment of drift",
  "dek": "A concept for an assistant inside the phone’s operating system that notices the moment of drift and adapts its nudges to each person.",
  "facts": [
   [
    "Role",
    "Research synthesis · interaction logic · prototyping"
   ],
   [
    "With",
    "University of Trento · group of 4"
   ],
   [
    "When",
    "2026"
   ]
  ],
  "cover": {
   "video": "covers/you.mp4",
   "poster": "covers/you-poster.jpg",
   "tint": "#0B1418",
   "label": "Animated cover: YOU nudging at the moment of drift"
  },
  "links": [
   {
    "label": "Final presentation ↗",
    "href": "https://www.figma.com/deck/AqArCYTjQP7qPRJZlKJHxN/Social-interaction---Final-presentation?node-id=6-2733"
   }
  ],
  "beats": [
   {
    "label": "Problem",
    "toc": "The autopilot loop",
    "headline": "You open your phone for the weather and surface twenty minutes later in social media.",
    "sub": "Most productivity tools assume rational planners. The real friction is the autopilot habit loop.",
    "full": "<p class=\"lead\">You open your phone to check the weather and, twenty minutes later, you’re deep in social media with no memory of the detour. Most productivity tools assume we’re rational planners who just need a better to-do list. The real friction is the autopilot habit loop.</p><figure class=\"fig\"><img src=\"%ASSET%cases/you/assumptions-research.jpg\" alt=\"Research synthesis board with sticky notes grouped into behavioural assumptions\" loading=\"lazy\"><figcaption>Fig 01 · Research synthesis and behavioural assumptions.</figcaption></figure><div class=\"bnotes\"><div><span class=\"nk\">Fit perfectly</span><span>Read behaviour from how the phone is used, and let people choose and reshape their own goals.</span></div><div><span class=\"nk\">To challenge</span><span>Gamification and detailed analytics. Intrinsic rewards should lead; staying on track matters more than pattern-spotting.</span></div><div><span class=\"nk\">Needs refinement</span><span>Collect only the minimum data: app category, time and session length, never detailed content.</span></div><div><span class=\"nk\">Missing</span><span>Spot when behaviour keeps clashing with a goal, and be open about why a nudge appeared.</span></div></div>"
   },
   {
    "label": "Drift",
    "toc": "Invisible drift",
    "headline": "By the time you notice the drift, the moment has passed.",
    "sub": "Invisible drift, autopilot habits, ignored emotions, and a gap between intention and action.",
    "full": "<div class=\"drift\"><div><b>Invisible drift</b><span>People slide off task without noticing the moment it happens.</span></div><div><b>Autopilot habits</b><span>By the time you notice you’re distracted, the moment has passed.</span></div><div><b>Emotions ignored</b><span>Stress and mood drive the impulse, but most tools pretend they don’t exist.</span></div><div><b>Intention ≠ action</b><span>A lasting gap between the goals we set and what our hands actually do.</span></div></div>"
   },
   {
    "label": "Concept",
    "toc": "Inside the OS",
    "headline": "So YOU lives inside the operating system, not in another app.",
    "sub": "It watches rhythms like app-switching and late-night scrolling, never private content.",
    "full": "<p class=\"lead\">YOU runs in the background of the phone, watching rhythms like app-switching frequency and late-night scrolling — never private content — and steps in at the moment of drift.</p><figure class=\"fig\"><img src=\"%ASSET%cases/you/integration.jpg\" alt=\"Phone settings showing YOU integrated into the operating system, next to a Help me understand you exercise\" loading=\"lazy\"><figcaption>Integrated with the OS settings.</figcaption></figure><p class=\"lead\">Meet people where the drift happens, without reading what they do.</p><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">An OS-level assistant</span></div><div><span class=\"mono\">Over</span><span>Another standalone app</span></div><div><span class=\"mono\">Because</span><span>Drift happens between apps; a separate app would never see the moment</span></div></div><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Passive rhythms: app switching, late-night scrolling</span></div><div><span class=\"mono\">Over</span><span>Monitoring private content</span></div><div><span class=\"mono\">Because</span><span>Meaningful nudges without reading anyone’s messages or feeds</span></div></div>"
   },
   {
    "label": "Loop",
    "toc": "A continuous loop",
    "headline": "It reads your state, gauges your awareness, nudges, then mirrors back what it learned.",
    "sub": "From choosing a goal and how involved YOU should be, to progress and adaptation.",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/you/how-this-works.jpg\" alt=\"How this works: choose your goal, choose your commitment, learn your patterns, evaluate emotional awareness, context-dependent nudges, progress and adapt\" loading=\"lazy\"><figcaption>Fig 02 · The adaptive loop, from choosing a goal to progress and adaptation.</figcaption></figure><ul><li><b>A continuous loop.</b> Evaluate the person’s state, assess their emotional awareness, apply a calibrated intervention, and mirror back what it learned.</li></ul><figure class=\"fig\"><img src=\"%ASSET%cases/you/onboarding.jpg\" alt=\"Onboarding screens: Hi, I’m You; how you spend your time; how involved YOU should be (observer, gentle helper, active coach); YOU is ready\" loading=\"lazy\"><figcaption>Onboarding: pick a goal and how involved YOU should be.</figcaption></figure>"
   },
   {
    "label": "Calibration",
    "toc": "Tuned to awareness",
    "headline": "A short exercise tunes every nudge to how emotionally self-aware you are.",
    "sub": "Based on the LEAS framework: simple, warm prompts for some, reflective dialogue for others.",
    "full": "<ul><li><b>Calibrated by emotional awareness.</b> Short “Help me understand you” exercises, based on the LEAS framework, gauge emotional vocabulary and tune nudges from simple, warm prompts to more nuanced, reflective dialogue.</li></ul><figure class=\"fig\"><img src=\"%ASSET%cases/you/emotional-awareness-LEAS.jpg\" alt=\"Help me understand you: an emotional-awareness exercise asking how you would feel in a described situation\" loading=\"lazy\"><figcaption>Fig 05 · LEAS emotional-awareness calibration.</figcaption></figure>"
   },
   {
    "label": "Personas",
    "toc": "Grace and Philip",
    "headline": "I designed against two people who need opposite nudges.",
    "sub": "Grace is driven by mastery and meaning; Philip by relationships and external rewards.",
    "full": "<ul><li><b>Two personas to test against.</b> Grace, motivated by mastery, progress and meaning; Philip, motivated by relationships and external rewards.</li></ul><figure class=\"fig\"><img src=\"%ASSET%cases/you/personas.jpg\" alt=\"Personas: Grace, motivated by mastery, progress, purpose and meaning; Philip, motivated by relationships and external rewards\" loading=\"lazy\"><figcaption>Grace and Philip.</figcaption></figure>"
   },
   {
    "label": "System 1",
    "toc": "Subtle cues",
    "headline": "In the moment, a nudge so small it barely interrupts.",
    "sub": "A short delay before a distracting app opens, or a slow vibration to breathe along with.",
    "full": "<ul><li><b>A dual-process nudge system</b> that combines subtle System 1 cues (haptic breathing pulses, app-delay timers) with reflective System 2 prompts (adjusting goals, a letter to your future self).</li></ul><figure class=\"fig\"><img src=\"%ASSET%cases/you/system1-grace.jpg\" alt=\"System 1 interventions for Grace: lock screen, home screen and an app-delay screen before Instagram opens.\" loading=\"lazy\"><figcaption><b>Grace · A small delay, not a lockout.</b> During a deep-work block, opening a distracting app starts a short delay timer. The pause is often enough to break the autopilot.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/you/system1-phil.jpg\" alt=\"System 1 interventions for Phil: a calming vibration and a slow pulsing element on the home screen.\" loading=\"lazy\"><figcaption><b>Phil · A breath he can feel.</b> When stress-like patterns appear, a short, slow vibration mimics a calm breathing cadence (inhale, hold, exhale), with a slow pulsing element he can follow or ignore.</figcaption></figure>"
   },
   {
    "label": "System 2",
    "toc": "Reflective prompts",
    "headline": "Then, a prompt that asks you to step back and decide.",
    "sub": "Is this still the goal? Or a note from your past self, arriving when it matters.",
    "full": "<figure class=\"fig\"><img src=\"%ASSET%cases/you/system2-grace.jpg\" alt=\"System 2 interventions for Grace: an active prompt asking her to reflect.\" loading=\"lazy\"><figcaption><b>Grace · A prompt to reflect.</b> An active prompt asks Grace to step back and decide: is this still the goal, or does it need adjusting?</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/you/system2-phil.jpg\" alt=\"System 2 interventions for Phil: a note from Past Phil and a conversational check-in.\" loading=\"lazy\"><figcaption><b>Phil · A note from Past Phil.</b> A letter to his future self arrives at the moment it matters, followed by a gentle conversational check-in.</figcaption></figure><div class=\"tradeoff\"><div><span class=\"mono\">Chose</span><span style=\"font-weight: 500\">Nudges tuned to emotional awareness and persona</span></div><div><span class=\"mono\">Over</span><span>One kind of nudge for everyone</span></div><div><span class=\"mono\">Because</span><span>A breathing pulse helps one person; another needs a moment to reflect</span></div></div>"
   },
   {
    "label": "Result",
    "toc": "No private content read",
    "headline": "A cohesive nudge system that never reads private content.",
    "sub": "Two personas, two kinds of nudge, and a way through setbacks.",
    "full": "<div class=\"stats\" style=\"grid-template-columns: repeat(3, minmax(0, 1fr))\"><div><div class=\"stat\" style=\"font-size: 44px\">2</div><span class=\"mono\">Personas</span></div><div><div class=\"stat\" style=\"font-size: 44px\">2</div><span class=\"mono\">Kinds of nudge</span></div><div><div class=\"stat\" style=\"font-size: 44px\">0</div><span class=\"mono\">Private content read</span></div></div><ul><li><b>An OS-level behavioural framework,</b> prototyped as an assistant that adapts its interventions to real-time emotional self-awareness.</li><li><b>Privacy by design.</b> Meaningful nudges from rhythm tracking alone, without monitoring content.</li></ul><figure class=\"fig\"><img src=\"%ASSET%cases/you/goal-adaptation.jpg\" alt=\"Screens helping the user deal with setbacks: stress check-ins and goal adjustments for Grace and Phil\" loading=\"lazy\"><figcaption>Helping people deal with setbacks.</figcaption></figure><figure class=\"fig\"><img src=\"%ASSET%cases/you/cover.jpg\" alt=\"YOU, Super-ego app cover with three characters labelled super-ego, ego and id\" loading=\"lazy\"><figcaption>YOU, the Super-ego app.</figcaption></figure>"
   }
  ],
  "wall": [
   {
    "b": 0,
    "t": "img",
    "src": "cases/you/assumptions-research.jpg",
    "ar": 1.69,
    "lab": "Research synthesis",
    "pins": [
     [
      0.02,
      0.035,
      "Fit perfectly"
     ],
     [
      0.612,
      0.035,
      "To challenge"
     ],
     [
      0.02,
      0.585,
      "Needs refinement"
     ],
     [
      0.612,
      0.585,
      "Missing"
     ]
    ]
   },
   {
    "b": 1,
    "t": "quote",
    "k": "How might we",
    "v": "How might we close the gap between the goals people set and what their hands actually do, at the moment the drift happens?"
   },
   {
    "b": 2,
    "t": "img",
    "src": "cases/you/integration.jpg",
    "ar": 1.778,
    "lab": "Inside the OS settings",
    "hand": "An OS-level assistant app."
   },
   {
    "b": 3,
    "t": "img",
    "src": "cases/you/how-this-works.jpg",
    "ar": 1.778,
    "lab": "The adaptive loop"
   },
   {
    "b": 3,
    "t": "img",
    "src": "cases/you/onboarding.jpg",
    "ar": 1.778,
    "lab": "Onboarding"
   },
   {
    "b": 4,
    "t": "img",
    "src": "cases/you/emotional-awareness-LEAS.jpg",
    "ar": 1.778,
    "lab": "LEAS calibration"
   },
   {
    "b": 5,
    "t": "img",
    "src": "cases/you/personas.jpg",
    "ar": 1.778,
    "lab": "Grace and Philip"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/you/system1-grace.jpg",
    "ar": 1.778,
    "lab": "Grace · a small delay, not a lockout"
   },
   {
    "b": 6,
    "t": "img",
    "src": "cases/you/system1-phil.jpg",
    "ar": 1.778,
    "lab": "Phil · a breath he can feel"
   },
   {
    "b": 7,
    "t": "img",
    "src": "cases/you/system2-grace.jpg",
    "ar": 1.778,
    "lab": "Grace · a prompt to reflect"
   },
   {
    "b": 7,
    "t": "img",
    "src": "cases/you/system2-phil.jpg",
    "ar": 1.778,
    "lab": "Phil · a note from Past Phil"
   },
   {
    "b": 8,
    "t": "img",
    "src": "cases/you/goal-adaptation.jpg",
    "ar": 1.778,
    "lab": "Setbacks"
   },
   {
    "b": 8,
    "t": "stat",
    "k": "Privacy",
    "n": "0",
    "v": "private content read"
   }
  ]
 }
];

export const WALL_BY_SLUG: Record<string, CaseWall> = Object.fromEntries(CASE_WALLS.map((c) => [c.slug, c]));
