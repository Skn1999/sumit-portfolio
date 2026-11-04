import { WORK } from "./home";
import { LAB_ITEMS } from "./labs";

/* Quick actions (⌘K / Ctrl K): the skills a recruiter can look up, and the projects behind each one.
   Projects point at their case-study page; ActAI and Intent to Palette live in the Lab, so they open the live link. */

export const CALENDAR_URL = "https://calendar.app.google/t9WDswECJQoRzoKQ9";

export type SkillProject = { title: string; sub: string; href: string; external?: boolean };
export type Skill = { label: string; keys: string; projects: SkillProject[] };

const work = (code: string, sub: string): SkillProject => {
  const t = WORK.find((w) => w.code === code);
  if (!t) throw new Error(`cmdk: no work tile ${code}`);
  // The component library has no page of its own; it sits in the Selected work grid.
  return { title: t.title, sub, href: "href" in t ? t.href : "/#work" };
};
const lab = (title: string, sub: string): SkillProject => {
  const l = LAB_ITEMS.find((x) => x.title === title);
  return { title, sub, href: l?.href ?? "/", external: true };
};

export const SKILLS: Skill[] = [
  { label: "Accessibility", keys: "accessibility a11y wcag eaa inclusive", projects: [
    work("SN-07", "WCAG / EAA delivery framework"),
    work("SN-10", "Tests with users with disabilities"),
    work("SN-04", "30-issue heuristic + WCAG audit"),
  ] },
  { label: "Research", keys: "research ux user interviews study testing usability", projects: [
    work("SN-04", "200-person 2×2 study"),
    work("SN-10", "Expert review vs. user tests"),
    work("SN-02", "Hotjar recordings, user research"),
    work("SN-05", "Behavioural research, personas"),
    work("SN-06", "Participatory research, Chile"),
  ] },
  { label: "React", keys: "react frontend front-end typescript code engineering", projects: [
    work("SN-01", "10 s → under 1 s load"),
    work("SN-02", "React + Redux Toolkit"),
    work("SN-03", "30+ shared components"),
    lab("ActAI", "Lab · React 18 + TypeScript"),
  ] },
  { label: "AI", keys: "ai llm agents ml machine", projects: [
    lab("ActAI", "Lab · human oversight for AI agents"),
    lab("Intent to Palette", "Lab · palettes from intent"),
  ] },
  { label: "Design systems", keys: "design systems tokens components library", projects: [
    work("SN-03", "30+ React components"),
    lab("ActAI", "Lab · tokens, type scale, primitives"),
  ] },
  { label: "Facilitation", keys: "facilitation workshop co-design codesign participatory", projects: [
    work("SN-06", "Co-design game for shared housing"),
    work("SN-07", "Co-design workshops"),
    work("SN-10", "Prioritisation workshop"),
  ] },
  { label: "Strategy", keys: "strategy go-to-market gtm product founder business", projects: [
    work("SN-09", "Go-to-market, three markets"),
    work("SN-07", "2nd of 900+, EIT Jumpstarter"),
  ] },
];
