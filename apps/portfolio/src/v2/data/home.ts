import { asset } from "../lib";

/* Homepage copy and structure. */

export const HERO_INTRO =
  "Curious about too many things — and that’s the point. I help teams figure out what’s actually worth building, then take fuzzy concepts all the way to fast, accessible, beautifully crafted software.";

export const TOC = [
  { href: "#contact", label: "Next", meta: "Open", pulse: true },
  { href: "#approach", label: "How I work", meta: "Approach" },
  { href: "#work", label: "Selected work", meta: "Cases" },
  { href: "#scanner", label: "On being a scanner", meta: "Intro" },
];

/** The six fields the scanner fragments are coloured by. */
export const SCAN_FIELDS = [
  { label: "Research", color: "#2F6FEB" },
  { label: "Interaction", color: "#D96B27" },
  { label: "Front-end", color: "#1A7F54" },
  { label: "Strategy", color: "#8250DF" },
  { label: "Facilitation", color: "#BF3989" },
  { label: "Visual", color: "#9A6700" },
];

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
  "SN-09": ["Taking an AI MedTech startup into Poland, Czechia and Romania.", "Presented to the CEO and board."],
};

/** "If you liked that…": the closest relative of each project, for the dwell-time suggestion. */
export const DWELL_NEXT: Record<string, string> = {
  "SN-01": "SN-02", "SN-02": "SN-01", "SN-03": "SN-01", "SN-04": "SN-10", "SN-05": "SN-02",
  "SN-10": "SN-07", "SN-06": "SN-07", "SN-07": "SN-10", "SN-09": "SN-07",
};

export type Tile =
  | { kind: "img"; code: string; title: string; sub: string; img: string; alt: string; href: string; crop?: boolean }
  | { kind: "stat"; code: string; title: string; sub: string; label: string; stat: string; statSub: string }
  | { kind: "card"; tone: "dark" | "paper"; code: string; title: string; sub: string; label: string; text: string; href: string };

/** Selected work, in the order it appears on the homepage. ActAI lives in the Lab for now (labs.ts). */
export const WORK: Tile[] = [
  { kind: "img", code: "SN-01", title: "Dashboard rebuild", sub: "10s → <1s load", img: asset("work/optmyzr-dashboard.jpg"), alt: "Rebuilt Optmyzr account dashboard with metrics and charts", href: "/projects/optmyzr-dashboard-migration" },
  { kind: "img", code: "SN-02", title: "Onboarding wizard", sub: "−25% sign-up drop-off", img: asset("work/optmyzr-onboarding.jpg"), alt: "Onboarding wizard illustration", href: "/projects/optmyzr-onboarding-experience" },
  { kind: "stat", code: "SN-03", title: "Component library", sub: "Co-built & maintained", label: "Shared library", stat: "30+", statSub: "React components used across the product suite" },
  { kind: "img", code: "SN-04", title: "Air quality, made readable", sub: "Deda Next · 200 participants", img: asset("work/ediaqi-corridor.jpg"), alt: "Air-quality display in a school corridor", href: "/projects/ediaqi-decision-support-system" },
  { kind: "img", code: "SN-05", title: "YOU", sub: "Habit-alignment assistant", img: asset("work/you.jpg"), alt: "YOU, the Super-ego app, with three character illustrations", href: "/projects/super-ego-app" },
  { kind: "img", code: "SN-10", title: "A+ usability evaluation", sub: "Expert review vs. user tests", img: asset("cases/aplus/workshop.jpg"), alt: "Workshop participants around a table working through printed problem cards", href: "/projects/a-plus-usability-project", crop: true },
  { kind: "img", code: "SN-06", title: "Mesa Te Club", sub: "Co-design tools, Chile", img: asset("work/mesa-sims.jpg"), alt: "Co-design game board for planning shared housing spaces", href: "/projects/social-integration-pd" },
  { kind: "img", code: "SN-07", title: "Groundwork", sub: "2nd of 900+, EIT Jumpstarter", img: asset("work/groundwork.jpg"), alt: "Groundwork cover reading: Built for everyone, from the ground up.", href: "/projects/groundwork" },
  { kind: "card", tone: "paper", code: "SN-09", title: "Gosta Labs", sub: "Presented to the CEO & board", label: "Strategy", text: "Taking an AI MedTech startup into Poland, Czechia and Romania", href: "/projects/gosta-labs" },
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
  { title: "Air quality, made readable", href: "/projects/ediaqi-decision-support-system", r: "— Deda Next · 200 participants", y: "2026" },
  { title: "YOU", href: "/projects/super-ego-app", r: "— habit-alignment assistant", y: "2026" },
  { title: "A+ usability evaluation", href: "/projects/a-plus-usability-project", r: "— expert review vs. user tests", y: "2025" },
  { title: "Gosta Labs", href: "/projects/gosta-labs", r: "— go-to-market · presented to the CEO & board", y: "2025" },
  { title: "Mesa Te Club", href: "/projects/social-integration-pd", r: "— co-design, Chile", y: "2024" },
];
