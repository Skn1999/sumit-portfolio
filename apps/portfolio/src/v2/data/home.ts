import { asset } from "../lib";

/* Homepage copy and structure. Copy marked [like this] is a placeholder for Sumit to fill in. */

export const HERO_INTRO =
  "Curious about too many things — and that’s the point. I help teams figure out what’s actually worth building, then take fuzzy concepts all the way to fast, accessible, beautifully crafted software.";

export const TOC = [
  { href: "#contact", label: "Next", meta: "Open", pulse: true },
  // Lab is off the homepage for now (it may get its own page).
  // { href: "#ch4", label: "Lab", meta: "Always" },
  { href: "#work", label: "Selected work", meta: "2020–Present" },
  { href: "#scanner", label: "On being a scanner", meta: "Field note" },
];

/** The six fields the scanner fragments are coloured by (same columns as the old matrix). */
export const SCAN_FIELDS = [
  { label: "Research", color: "#2F6FEB" },
  { label: "Interaction", color: "#D96B27" },
  { label: "Front-end", color: "#1A7F54" },
  { label: "Strategy", color: "#8250DF" },
  { label: "Facilitation", color: "#BF3989" },
  { label: "Visual", color: "#9A6700" },
];

/** Selected work, in the order it appears on the homepage (codes from CHAPTERS below). */
export const WORK_ORDER = ["SN-01", "SN-02", "SN-03", "SN-04", "SN-05", "SN-10", "SN-06", "SN-07", "SN-08", "SN-09"];

/**
 * Dwell time: what a project says after you linger on it. [first line, second line].
 * Lines come from each case study's Problem and Result titles where there is one.
 */
export const DWELL: Record<string, [string, string]> = {
  "SN-01": ["Ten seconds before anyone could start work.", "Now it loads in under a second."],
  "SN-02": ["A loading screen people walked away from.", "The wait became onboarding: 25% fewer drop-offs."],
  "SN-03": ["30+ React components used across the product suite.", "Co-built and maintained."],
  "SN-04": ["Data everywhere, action nowhere.", "From readings to actions, tested with 200 participants."],
  "SN-05": ["The gap between intending and doing.", "A cohesive nudge system inside the OS."],
  "SN-10": ["Known problems, no evidence.", "Minor issues. Major impact."],
  "SN-06": ["A board game for planning shared housing spaces.", "Co-design tools, used in Chile."],
  "SN-07": ["Accessibility arrives too late.", "Accessibility as infrastructure: 2nd of 900+ at EIT Jumpstarter."],
  "SN-08": ["A review layer for AI agents doing real business tasks.", "From PRD to deployed in about 10 hours."],
  "SN-09": ["Taking an AI MedTech startup into Poland, Czechia and Romania.", "Presented to the CEO and board."],
};

/** "If you liked that…": the closest relative of each project, for the dwell-time suggestion. */
export const DWELL_NEXT: Record<string, string> = {
  "SN-01": "SN-02", "SN-02": "SN-01", "SN-03": "SN-01", "SN-04": "SN-10", "SN-05": "SN-02",
  "SN-10": "SN-07", "SN-06": "SN-07", "SN-07": "SN-10", "SN-08": "SN-01", "SN-09": "SN-07",
};

export const DEEP_ON = [
  "Front-end engineering", "Cognitive science", "Accessibility", "Co-design", "Data-dense UI",
  "Go-to-market strategy", "Visual identity", "Ink sketching", "Writing", "Finnish & Italian (learning)",
];

export const MX_COLS = ["Research", "Interaction", "Front-end", "Strategy", "Facilitation", "Visual"];
export const MX_ROWS: { no: string; name: string; sub: string; v: number[] }[] = [
  { no: "SN-01", name: "Dashboard rebuild", sub: "— Optmyzr", v: [0, 0, 1, 0, 0, 0] },
  { no: "SN-02", name: "Onboarding wizard", sub: "— Optmyzr", v: [1, 1, 1, 0, 0, 0] },
  { no: "SN-03", name: "Component library", sub: "— Optmyzr", v: [0, 1, 1, 0, 0, 0] },
  { no: "SN-04", name: "Air quality, made readable", sub: "— Deda Next", v: [1, 1, 0, 0, 0, 1] },
  { no: "SN-05", name: "YOU", sub: "— habit assistant", v: [1, 1, 0, 0, 0, 1] },
  { no: "SN-06", name: "Mesa Te Club", sub: "— co-design, Chile", v: [1, 0, 0, 0, 1, 1] },
  { no: "SN-07", name: "Groundwork", sub: "— co-founder", v: [1, 1, 0, 1, 1, 0] },
  { no: "SN-08", name: "ActAI", sub: "— AI oversight", v: [0, 1, 1, 1, 0, 0] },
  { no: "SN-09", name: "Gosta Labs", sub: "— go-to-market", v: [1, 0, 0, 1, 0, 0] },
  { no: "SQ", name: "Lab", sub: "— Trackz, Re-Con, sketching", v: [0, 1, 0, 0, 0, 1] },
];

export type Tile =
  | { kind: "img"; code: string; title: string; sub: string; img: string; alt: string; href: string; chips: string[]; crop?: boolean }
  | { kind: "stat"; code: string; title: string; sub: string; label: string; stat: string; statSub: string }
  | { kind: "card"; tone: "dark" | "paper"; code: string; title: string; sub: string; label: string; text: string; href: string };

export type Chapter = { id: string; label: string; title: string; lede: string; tiles: Tile[] };

export const CHAPTERS: Chapter[] = [
  {
    id: "ch1", label: "Chapter 01 · 2020–24", title: "The builder",
    lede: "Four years at Optmyzr, front-end intern to Design Engineer. I learned what slow software costs people — and how to fix it in the code.",
    tiles: [
      { kind: "img", code: "SN-01", title: "Dashboard rebuild", sub: "10s → <1s load", img: asset("work/optmyzr-dashboard.jpg"), alt: "Rebuilt Optmyzr account dashboard with metrics and charts", href: "/projects/optmyzr-dashboard-migration", chips: ["React", "Performance", "2023"] },
      { kind: "img", code: "SN-02", title: "Onboarding wizard", sub: "−25% sign-up drop-off", img: asset("work/optmyzr-onboarding.jpg"), alt: "Onboarding wizard illustration", href: "/projects/optmyzr-onboarding-experience", chips: ["Research", "Product design", "2023"] },
      { kind: "stat", code: "SN-03", title: "Component library", sub: "Co-built & maintained", label: "Shared library", stat: "30+", statSub: "React components used across the product suite" },
    ],
  },
  {
    id: "ch2", label: "Chapter 02 · 2024–Present", title: "The designer",
    lede: "I moved to Finland, then Italy, to study why software feels hard — a double M.Sc. in HCI & Cognitive Science at Aalto and Trento.",
    tiles: [
      { kind: "img", code: "SN-04", title: "Air quality, made readable", sub: "Deda Next · 200 participants", img: asset("work/ediaqi-corridor.jpg"), alt: "Air-quality display in a school corridor", href: "/projects/ediaqi-decision-support-system", chips: ["Trento", "EU Horizon", "2026"] },
      { kind: "img", code: "SN-05", title: "YOU", sub: "Habit-alignment assistant", img: asset("work/you.jpg"), alt: "YOU, the Super-ego app, with three character illustrations", href: "/projects/super-ego-app", chips: ["Behavioural design", "2026"] },
      { kind: "img", code: "SN-10", title: "A+ usability evaluation", sub: "Expert review vs. user tests", img: asset("cases/aplus/workshop.jpg"), alt: "Workshop participants around a table working through printed problem cards", href: "/projects/a-plus-usability-project", chips: ["Usability", "Accessibility", "2025"], crop: true },
      { kind: "img", code: "SN-06", title: "Mesa Te Club", sub: "Co-design tools, Chile", img: asset("work/mesa-sims.jpg"), alt: "Co-design game board for planning shared housing spaces", href: "/projects/social-integration-pd", chips: ["Participatory", "2024"] },
      { kind: "card", tone: "dark", code: "SN-08", title: "ActAI", sub: "PRD → deployed in ~10 h", label: "Live prototype ↗", text: "A review layer for AI agents doing real business tasks", href: "/projects/actai" },
      { kind: "card", tone: "paper", code: "SN-09", title: "Gosta Labs", sub: "Presented to the CEO & board", label: "Strategy", text: "Taking an AI MedTech startup into Poland, Czechia and Romania", href: "/projects/gosta-labs" },
    ],
  },
  {
    id: "ch3", label: "Chapter 03 · 2026–Present", title: "The founder",
    lede: "Research wasn’t enough; I wanted it shipped. So I co-founded an accessibility venture and started taking ideas from PRD to working prototype in a day.",
    tiles: [
      { kind: "img", code: "SN-07", title: "Groundwork", sub: "2nd of 900+, EIT Jumpstarter", img: asset("work/groundwork.jpg"), alt: "Groundwork cover reading: Built for everyone, from the ground up.", href: "/projects/groundwork", chips: ["Helsinki", "WCAG / EAA", "2025"] },
    ],
  },
];

export const APPROACH = [
  { t: "I start with the person who’s waiting.", d: "Before I design anything, I find out who is stuck and what it costs them — support tickets, session recordings, conversations. Writing down the problem before sketching/designing anything." },
  { t: "I design in the material.", d: "Now, I prototype in code early and use Figma where research matters and time allows. Real data, real latency and a real screen reader change a design faster than any review." },
  { t: "I build for everyone.", d: "Accessibility is not a final pass. I design to WCAG from the first wireframe — it’s why I co-founded an accessibility venture." },
  { t: "I borrow across fields.", d: "Cognitive science, co-design workshops, go-to-market work. Being a scanner means I bring in what a single specialist might miss." },
  { t: "I measure success based on outcomes.", d: "Metrics, KPIs, heat-maps, depending on what the project/feature calls for. Also documenting decisions, trade-offs and the options we turned down, so the team can keep moving without another meeting." },
];

export const STACK = ["Figma", "React", "Claude", "Antigravity", "Vercel", "GitHub", "Qualtrics"];

/** Reader mode: the work list inside the letter. */
export const WORK_LIST = [
  { title: "Dashboard rebuild", href: "/projects/optmyzr-dashboard-migration", r: "— Optmyzr · 10 s → under 1 s load", y: "2023" },
  { title: "Onboarding wizard", href: "/projects/optmyzr-onboarding-experience", r: "— Optmyzr · −25% sign-up drop-off", y: "2023" },
  { title: "Groundwork", href: "/projects/groundwork", r: "— co-founder · 2nd of 900+, EIT Jumpstarter", y: "2025" },
  { title: "ActAI", href: "/projects/actai", r: "— AI oversight · PRD → deployed in ~10 h", y: "[year]" },
  { title: "Air quality, made readable", href: "/projects/ediaqi-decision-support-system", r: "— Deda Next · 200 participants", y: "2026" },
  { title: "YOU", href: "/projects/super-ego-app", r: "— habit-alignment assistant", y: "2026" },
  { title: "A+ usability evaluation", href: "/projects/a-plus-usability-project", r: "— expert review vs. user tests", y: "2025" },
  { title: "Gosta Labs", href: "/projects/gosta-labs", r: "— go-to-market · presented to the CEO & board", y: "[year]" },
  { title: "Mesa Te Club", href: "/projects/social-integration-pd", r: "— co-design, Chile", y: "2024" },
];
