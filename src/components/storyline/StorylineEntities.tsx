import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Award, RotateCw, MapPin, Sparkles, BookOpen } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface BaseEntityProps {
  children?: React.ReactNode;
}

/**
 * Optmyzr Entity Card
 */
export const OptmyzrEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none">
          <img
            src="/images/logos/optmyzr.png"
            alt="Optmyzr logo"
            className="w-4 h-4 rounded-[3px] object-contain inline-block -translate-y-0.5"
            loading="lazy"
          />
          <span>{children || "Optmyzr"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80 text-left">
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src="/images/logos/optmyzr.png"
            alt="Optmyzr"
            className="w-6 h-6 rounded-md object-contain border border-paper-border/60 bg-paper-bg p-0.5"
          />
          <div>
            <h4 className="font-display font-bold text-sm text-ink-primary leading-tight">
              Optmyzr
            </h4>
            <span className="font-mono text-[11px] text-ink-muted">
              Design Engineer • 4+ Years
            </span>
          </div>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed mb-3">
          Core frontend architecture and design systems for enterprise PPC analytics across 10,000+ global advertiser accounts.
        </p>
        <div className="flex flex-col gap-1.5 pt-2 border-t border-paper-border/60 font-mono text-xs">
          <Link
            to="/projects/optmyzr-onboarding-experience"
            className="inline-flex items-center justify-between text-ink-primary hover:text-emerald-500 transition-colors py-0.5 group"
          >
            <span>Fixing Onboarding Churn</span>
            <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
          <Link
            to="/projects/optmyzr-dashboard-migration"
            className="inline-flex items-center justify-between text-ink-primary hover:text-emerald-500 transition-colors py-0.5 group"
          >
            <span>Dashboard Latency Migration</span>
            <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * Dedanext Entity Card
 */
export const DedanextEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none">
          <img
            src="/images/logos/dedanext.png"
            alt="Dedanext logo"
            className="w-4 h-4 rounded-[3px] object-contain inline-block -translate-y-0.5"
            loading="lazy"
          />
          <span>{children || "Dedanext"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80 text-left">
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src="/images/logos/dedanext.png"
            alt="Dedanext"
            className="w-6 h-6 rounded-md object-contain border border-paper-border/60 bg-paper-bg p-0.5"
          />
          <div>
            <h4 className="font-display font-bold text-sm text-ink-primary leading-tight">
              Dedanext S.p.a
            </h4>
            <span className="font-mono text-[11px] text-ink-muted">
              Trento, Italy 🇮🇹 • Product Design &amp; Research
            </span>
          </div>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed mb-3">
          EU Horizon EDIAQI initiative: designed role-separated decision support systems and semi-ambient sensor interfaces tested with 200+ users.
        </p>
        <div className="pt-2 border-t border-paper-border/60">
          <Link
            to="/projects/ediaqi-decision-support-system"
            className="inline-flex items-center justify-between w-full font-mono text-xs text-emerald-600 dark:text-emerald-400 hover:underline group"
          >
            <span>Read EDIAQI Case Study</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * Groundwork Entity Card
 */
export const GroundworkEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none">
          <img
            src="/images/logos/groundwork.svg"
            alt="Groundwork logo"
            className="w-4 h-4 rounded-[3px] object-contain inline-block -translate-y-0.5"
            loading="lazy"
          />
          <span>{children || "Groundwork"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80 text-left">
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src="/images/logos/groundwork.svg"
            alt="Groundwork"
            className="w-6 h-6 rounded-md object-contain border border-paper-border/60 bg-paper-bg p-0.5"
          />
          <div>
            <h4 className="font-display font-bold text-sm text-ink-primary leading-tight">
              Groundwork
            </h4>
            <span className="font-mono text-[11px] text-ink-muted">
              Co-founder &amp; Product Lead
            </span>
          </div>
        </div>
        <div className="mb-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
          <Award className="w-3 h-3" />
          <span>2nd Place Grand Finalist • EIT Jumpstarter</span>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed mb-3">
          Selected out of 900+ European startups: turning EU digital accessibility mandates into actionable, automated design systems.
        </p>
        <div className="pt-2 border-t border-paper-border/60">
          <Link
            to="/projects/groundwork"
            className="inline-flex items-center justify-between w-full font-mono text-xs text-emerald-600 dark:text-emerald-400 hover:underline group"
          >
            <span>Read Groundwork Case Study</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * EIT Jumpstarter Grand Final Tooltip
 */
export const EITJumpstarterEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="underline decoration-dotted decoration-emerald-500/80 underline-offset-4 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors select-none">
          {children || "(awarded 2nd place at the EIT Jumpstarter Grand Final)"}
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-72 text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
            🏆
          </span>
          <h4 className="font-display font-bold text-sm text-ink-primary">
            EIT Jumpstarter Grand Final 2025
          </h4>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-ink-muted mb-2">
          <MapPin className="w-3 h-3 text-emerald-500" />
          <span>Budapest, Hungary 🇭🇺</span>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          Awarded 2nd Place in the New European Bauhaus category by the European Institute of Innovation &amp; Technology (EIT), competing against top EU deep-tech teams.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * Aalto University Entity Card
 */
export const AaltoEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none">
          <img
            src="/images/logos/aalto.png"
            alt="Aalto University logo"
            className="w-4 h-4 rounded-[3px] object-contain inline-block -translate-y-0.5"
            loading="lazy"
          />
          <span>{children || "Aalto University"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80 text-left">
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src="/images/logos/aalto.png"
            alt="Aalto University"
            className="w-6 h-6 rounded-md object-contain border border-paper-border/60 bg-paper-bg p-0.5"
          />
          <div>
            <h4 className="font-display font-bold text-sm text-ink-primary leading-tight">
              Aalto University
            </h4>
            <span className="font-mono text-[11px] text-ink-muted">
              Espoo / Helsinki, Finland 🇫🇮
            </span>
          </div>
        </div>
        <div className="space-y-1.5 text-xs text-ink-muted">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-primary block">
              Degree Track
            </span>
            <span>M.Sc. Human-Computer Interaction &amp; Design</span>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-primary block">
              Focus
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              User-centered Design and participatory design
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * University of Trento Entity Card
 */
export const TrentoEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none">
          <img
            src="/images/logos/unitn.png"
            alt="University of Trento logo"
            className="w-4 h-4 rounded-[3px] object-contain inline-block -translate-y-0.5"
            loading="lazy"
          />
          <span>{children || "University of Trento"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80 text-left">
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src="/images/logos/unitn.png"
            alt="University of Trento"
            className="w-6 h-6 rounded-md object-contain border border-paper-border/60 bg-paper-bg p-0.5"
          />
          <div>
            <h4 className="font-display font-bold text-sm text-ink-primary leading-tight">
              University of Trento
            </h4>
            <span className="font-mono text-[11px] text-ink-muted">
              Trento, Italy 🇮🇹
            </span>
          </div>
        </div>
        <div className="space-y-1.5 text-xs text-ink-muted">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-primary block">
              Degree Track
            </span>
            <span>M.Sc. Cognitive Science &amp; Interaction Technology</span>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-primary block">
              Focus
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Mental models, human perception &amp; cognitive architecture
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * Cross-Continental Flight / Journey Map
 */
export const JourneyEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="underline decoration-dotted decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors select-none">
          {children || "brought me to Europe"}
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="center" className="w-72 text-left">
        <h4 className="font-display font-bold text-sm text-ink-primary mb-2 flex items-center gap-1.5">
          <span>✈️ Cross-Continental Journey</span>
        </h4>
        <div className="space-y-2 font-mono text-xs text-ink-muted border-l-2 border-emerald-500/40 pl-3 ml-1 my-2">
          <div>
            <span className="font-bold text-ink-primary">🇮🇳 India</span>
            <p className="text-[11px] text-ink-muted">B.Tech Computer Science</p>
          </div>
          <div>
            <span className="font-bold text-ink-primary">🇮🇹 Italy (Trento)</span>
            <p className="text-[11px] text-ink-muted">Cognitive Science &amp; Perception</p>
          </div>
          <div>
            <span className="font-bold text-ink-primary">🇫🇮 Finland (Helsinki)</span>
            <p className="text-[11px] text-ink-muted">Nordic HCI &amp; Production Craft</p>
          </div>
        </div>
        <p className="text-[11px] text-ink-muted pt-1">
          6,400+ km transition anchoring frontend systems in human cognitive models.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * Sustainability Community of Finland
 */
export const SuscoEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none">
          <img
            src="/images/logos/susco.png"
            alt="Sustainability Community of Finland"
            className="w-4 h-4 rounded-[3px] object-contain inline-block -translate-y-0.5"
            loading="lazy"
          />
          <span>{children || "Sustainability Community of Finland"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80 text-left">
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src="/images/logos/susco.png"
            alt="Susco"
            className="w-7 h-7 rounded-md object-contain border border-paper-border/60 bg-paper-bg p-0.5"
          />
          <div>
            <h4 className="font-display font-bold text-sm text-ink-primary leading-tight">
              Sustainability Community Finland
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                Work in progress
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed mb-3">
          Designing the visual identity, brand tokens, and digital guidelines for Helsinki climate advocates.
        </p>
        <div className="pt-2 border-t border-paper-border/60">
          <a
            href="https://susco.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full font-mono text-xs text-emerald-600 dark:text-emerald-400 hover:underline group"
          >
            <span>Visit susco.org</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * YOU (Super Ego) Prototype
 */
export const SuperEgoEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 inline-block -translate-y-0.5" />
          <span>{children || "YOU (Super Ego)"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80 text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
            YOU
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-ink-primary leading-tight">
              YOU (Super Ego)
            </h4>
            <span className="font-mono text-[10px] text-ink-muted">
              Master's Thesis Project • Aalto HCI
            </span>
          </div>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed mb-3">
          Prototyping an operating-system-level assistant that adapts nudges to emotional awareness, countering mindless dopamine loops.
        </p>
        <div className="pt-2 border-t border-paper-border/60">
          <Link
            to="/projects/super-ego-app"
            className="inline-flex items-center justify-between w-full font-mono text-xs text-emerald-600 dark:text-emerald-400 hover:underline group"
          >
            <span>Explore Super Ego Case Study</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * Substack Publication Card
 */
export const SubstackEntity: React.FC<BaseEntityProps> = ({ children }) => {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-[#FF6719] underline decoration-paper-border hover:decoration-[#FF6719] underline-offset-4 cursor-pointer transition-colors select-none">
          <svg
            className="w-3.5 h-3.5 inline-block -translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
              fill="#FF6719"
            />
          </svg>
          <span>{children || "substack"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80 text-left">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-md bg-[#FF6719]/10 flex items-center justify-center p-1.5 border border-[#FF6719]/30">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
                fill="#FF6719"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-ink-primary leading-tight">
              Unsaid Moments
            </h4>
            <span className="font-mono text-[10px] text-ink-muted">
              Substack by Sumit Nayyar
            </span>
          </div>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed mb-3">
          Quiet observations and personal essays on human relations.
        </p>
        <div className="pt-2 border-t border-paper-border/60">
          <a
            href="https://sumit6131.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full font-mono text-xs text-[#FF6719] hover:underline group"
          >
            <span>Read on Substack</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * Interactive "Identity Crisis" Trilemma Calculator
 */
export const TrilemmaEntity: React.FC<BaseEntityProps> = ({ children }) => {
  const [ratios, setRatios] = useState({
    cogSci: 40,
    design: 35,
    code: 25,
  });

  const recalculate = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Generate 3 random numbers that sum to 100
    const r1 = Math.floor(Math.random() * 40) + 20; // 20 - 60
    const remaining = 100 - r1;
    const r2 = Math.floor(Math.random() * (remaining - 20)) + 10;
    const r3 = 100 - r1 - r2;
    setRatios({ cogSci: r1, design: r2, code: r3 });
  };

  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span
          onClick={recalculate}
          className="underline decoration-dotted decoration-emerald-500/80 hover:decoration-solid underline-offset-4 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors select-none group"
          title="Click to recalculate ratio"
        >
          {children || "identity crises"}
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="center" className="w-80 text-left">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display font-bold text-sm text-ink-primary flex items-center gap-1.5">
            <span>🎭 Identity Distribution</span>
          </h4>
          <button
            type="button"
            onClick={recalculate}
            className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 hover:opacity-80 active:scale-95 transition-all px-2 py-0.5 rounded-md bg-emerald-500/10"
          >
            <RotateCw className="w-3 h-3" />
            <span>Reroll</span>
          </button>
        </div>

        <div className="space-y-2 py-2 font-mono text-xs">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-ink-primary">🧠 Cognitive Science</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {ratios.cogSci}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-paper-border/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                style={{ width: `${ratios.cogSci}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-ink-primary">✏️ Design Craft</span>
              <span className="font-bold text-indigo-500">
                {ratios.design}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-paper-border/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-300 ease-out"
                style={{ width: `${ratios.design}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-ink-primary">💻 Production Code</span>
              <span className="font-bold text-amber-500">
                {ratios.code}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-paper-border/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300 ease-out"
                style={{ width: `${ratios.code}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-[10px] font-mono text-ink-muted pt-1 border-t border-paper-border/60">
          Fluctuates daily based on caffeine intake and git commits. Click to recalculate!
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};
