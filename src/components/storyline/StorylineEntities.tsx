import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Award, MapPin, Sparkles } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface BaseEntityProps {
  children?: React.ReactNode;
}

/**
 * Optmyzr Entity Card
 */
export const OptmyzrEntity: React.FC<BaseEntityProps> = ({ children }) => {
  const handleMouseEnter = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("storyline-spotlight", { detail: "optmyzr" })
      );
    }
  };
  const handleMouseLeave = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("storyline-spotlight", { detail: null })
      );
    }
  };

  return (
    <HoverCard openDelay={90} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none"
        >
          <img
            src="/images/logos/optmyzr.png"
            alt="Optmyzr logo"
            className="w-4 h-4 rounded-[3px] object-contain inline-block -translate-y-0.5"
            loading="lazy"
          />
          <span>{children || "Optmyzr"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-84 sm:w-96 text-left">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl border border-paper-border/70 bg-paper-bg p-1.5 shrink-0 shadow-xs flex items-center justify-center">
            <img
              src="/images/logos/optmyzr.png"
              alt="Optmyzr"
              className="w-full h-full rounded-md object-contain"
            />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
              Optmyzr
            </h4>
            <span className="font-sans text-[15px] text-ink-muted">
              Design Engineer • 4+ Years
            </span>
          </div>
        </div>
        <p className="font-sans text-base text-ink-muted leading-relaxed mb-4">
          Core frontend architecture and design systems for enterprise PPC analytics across 10,000+ global advertiser accounts.
        </p>
        <div className="flex flex-col gap-2 pt-3 border-t border-paper-border/60 font-sans text-base">
          <Link
            to="/projects/optmyzr-onboarding-experience"
            className="inline-flex items-center justify-between text-ink-primary hover:text-emerald-500 transition-colors py-0.5 group font-medium"
          >
            <span>Fixing Onboarding Churn</span>
            <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
          <Link
            to="/projects/optmyzr-dashboard-migration"
            className="inline-flex items-center justify-between text-ink-primary hover:text-emerald-500 transition-colors py-0.5 group font-medium"
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
  const handleMouseEnter = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("storyline-spotlight", { detail: "dedanext" })
      );
    }
  };
  const handleMouseLeave = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("storyline-spotlight", { detail: null })
      );
    }
  };

  return (
    <HoverCard openDelay={90} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none"
        >
          <img
            src="/images/logos/dedanext.png"
            alt="Dedanext logo"
            className="w-4 h-4 rounded-[3px] object-contain inline-block -translate-y-0.5"
            loading="lazy"
          />
          <span>{children || "Dedanext"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-84 sm:w-96 text-left">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl border border-paper-border/70 bg-paper-bg p-1.5 shrink-0 shadow-xs flex items-center justify-center">
            <img
              src="/images/logos/dedanext.png"
              alt="Dedanext"
              className="w-full h-full rounded-md object-contain"
            />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
              Dedanext S.p.a
            </h4>
            <span className="font-sans text-[15px] text-ink-muted">
              Trento, Italy • Product Design &amp; Research
            </span>
          </div>
        </div>
        <p className="font-sans text-base text-ink-muted leading-relaxed mb-4">
          EU Horizon EDIAQI initiative: designed role-separated decision support systems and semi-ambient sensor interfaces tested with 200+ users.
        </p>
        <div className="pt-3 border-t border-paper-border/60">
          <Link
            to="/projects/ediaqi-decision-support-system"
            className="inline-flex items-center justify-between w-full font-sans text-base font-medium text-emerald-600 dark:text-emerald-400 hover:underline group"
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
  const handleMouseEnter = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("storyline-spotlight", { detail: "groundwork" })
      );
    }
  };
  const handleMouseLeave = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("storyline-spotlight", { detail: null })
      );
    }
  };

  return (
    <HoverCard openDelay={90} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none"
        >
          <img
            src="/images/logos/groundwork.svg"
            alt="Groundwork logo"
            className="w-4 h-4 rounded-[3px] object-contain inline-block -translate-y-0.5"
            loading="lazy"
          />
          <span>{children || "Groundwork"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-84 sm:w-96 text-left">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl border border-paper-border/70 bg-paper-bg p-1.5 shrink-0 shadow-xs flex items-center justify-center">
            <img
              src="/images/logos/groundwork.svg"
              alt="Groundwork"
              className="w-full h-full rounded-md object-contain"
            />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
              Groundwork
            </h4>
            <span className="font-sans text-[15px] text-ink-muted">
              Co-founder &amp; Product Lead
            </span>
          </div>
        </div>
        <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-sans text-xs font-semibold">
          <Award className="w-3.5 h-3.5 shrink-0" />
          <span>2nd Place Grand Finalist • EIT Jumpstarter</span>
        </div>
        <p className="font-sans text-base text-ink-muted leading-relaxed mb-4">
          Selected out of 900+ European startups: turning EU digital accessibility mandates into actionable, automated design systems.
        </p>
        <div className="pt-3 border-t border-paper-border/60">
          <Link
            to="/projects/groundwork"
            className="inline-flex items-center justify-between w-full font-sans text-base font-medium text-emerald-600 dark:text-emerald-400 hover:underline group"
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
    <HoverCard openDelay={90} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="underline decoration-dotted decoration-emerald-500/80 underline-offset-4 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors select-none">
          {children || "(awarded 2nd place at the EIT Jumpstarter Grand Final)"}
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-84 sm:w-96 text-left">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
              EIT Jumpstarter Grand Final 2025
            </h4>
            <div className="flex items-center gap-1 text-[13px] font-sans text-ink-muted mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Budapest, Hungary</span>
            </div>
          </div>
        </div>
        <p className="font-sans text-base text-ink-muted leading-relaxed">
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
    <HoverCard openDelay={90} closeDelay={150}>
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
      <HoverCardContent align="start" className="w-84 sm:w-96 text-left">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl border border-paper-border/70 bg-paper-bg p-1.5 shrink-0 shadow-xs flex items-center justify-center">
            <img
              src="/images/logos/aalto.png"
              alt="Aalto University"
              className="w-full h-full rounded-md object-contain"
            />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
              Aalto University
            </h4>
            <span className="font-sans text-[15px] text-ink-muted">
              Espoo / Helsinki, Finland
            </span>
          </div>
        </div>
        <div className="space-y-2 text-base font-sans text-ink-muted">
          <div>
            <span className="text-xs uppercase tracking-wider text-ink-primary font-semibold block mb-0.5">
              Degree Track
            </span>
            <span>M.Sc. Human-Computer Interaction &amp; Design</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-ink-primary font-semibold block mb-0.5">
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
    <HoverCard openDelay={90} closeDelay={150}>
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
      <HoverCardContent align="start" className="w-84 sm:w-96 text-left">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl border border-paper-border/70 bg-paper-bg p-1.5 shrink-0 shadow-xs flex items-center justify-center">
            <img
              src="/images/logos/unitn.png"
              alt="University of Trento"
              className="w-full h-full rounded-md object-contain"
            />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
              University of Trento
            </h4>
            <span className="font-sans text-[15px] text-ink-muted">
              Trento, Italy
            </span>
          </div>
        </div>
        <div className="space-y-2 text-base font-sans text-ink-muted">
          <div>
            <span className="text-xs uppercase tracking-wider text-ink-primary font-semibold block mb-0.5">
              Degree Track
            </span>
            <span>M.Sc. Cognitive Science &amp; Interaction Technology</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-ink-primary font-semibold block mb-0.5">
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
    <HoverCard openDelay={90} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="underline decoration-dotted decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors select-none">
          {children || "brought me to Europe"}
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="center" className="w-84 sm:w-96 text-left">
        <h4 className="font-sans font-semibold text-lg text-ink-primary mb-3">
          Cross-Continental Journey
        </h4>
        <div className="space-y-2.5 font-sans text-base text-ink-muted border-l-2 border-emerald-500/40 pl-3.5 ml-1 my-3">
          <div>
            <span className="font-semibold text-ink-primary block">India</span>
            <p className="text-sm text-ink-muted">B.Tech Computer Science</p>
          </div>
          <div>
            <span className="font-semibold text-ink-primary block">Italy (Trento)</span>
            <p className="text-sm text-ink-muted">Cognitive Science &amp; Human Perception</p>
          </div>
          <div>
            <span className="font-semibold text-ink-primary block">Finland (Helsinki)</span>
            <p className="text-sm text-ink-muted">Nordic HCI &amp; Production Craft</p>
          </div>
        </div>
        <p className="font-sans text-sm text-ink-muted pt-2 border-t border-paper-border/60">
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
    <HoverCard openDelay={90} closeDelay={150}>
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
      <HoverCardContent align="start" className="w-84 sm:w-96 text-left">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl border border-paper-border/70 bg-paper-bg p-1.5 shrink-0 shadow-xs flex items-center justify-center">
            <img
              src="/images/logos/susco.png"
              alt="Susco"
              className="w-full h-full rounded-md object-contain"
            />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
              Sustainability Community Finland
            </h4>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-sans text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                Work in progress
              </span>
            </div>
          </div>
        </div>
        <p className="font-sans text-base text-ink-muted leading-relaxed mb-4">
          Designing the visual identity, brand tokens, and digital guidelines for Helsinki climate advocates.
        </p>
        <div className="pt-3 border-t border-paper-border/60">
          <a
            href="https://susco.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full font-sans text-base font-medium text-emerald-600 dark:text-emerald-400 hover:underline group"
          >
            <span>Visit susco.org</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
    <HoverCard openDelay={90} closeDelay={150}>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 font-semibold text-ink-primary hover:text-emerald-500 dark:hover:text-emerald-400 underline decoration-paper-border hover:decoration-emerald-500 underline-offset-4 cursor-pointer transition-colors select-none">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 inline-block -translate-y-0.5" />
          <span>{children || "YOU (Super Ego)"}</span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-84 sm:w-96 text-left">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold font-sans shrink-0">
            YOU
          </div>
          <div>
            <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
              YOU (Super Ego)
            </h4>
            <span className="font-sans text-[15px] text-ink-muted">
              Master's Thesis Project • Aalto HCI
            </span>
          </div>
        </div>
        <p className="font-sans text-base text-ink-muted leading-relaxed mb-4">
          Prototyping an operating-system-level assistant that adapts nudges to emotional awareness, countering mindless dopamine loops.
        </p>
        <div className="pt-3 border-t border-paper-border/60">
          <Link
            to="/projects/super-ego-app"
            className="inline-flex items-center justify-between w-full font-sans text-base font-medium text-emerald-600 dark:text-emerald-400 hover:underline group"
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
    <HoverCard openDelay={90} closeDelay={150}>
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
      <HoverCardContent align="start" className="w-84 sm:w-96 text-left">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl bg-[#FF6719]/10 flex items-center justify-center p-2.5 border border-[#FF6719]/30 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
                fill="#FF6719"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
              Unsaid Moments
            </h4>
            <span className="font-sans text-[15px] text-ink-muted">
              Substack by Sumit Nayyar
            </span>
          </div>
        </div>
        <p className="font-sans text-base text-ink-muted leading-relaxed mb-4">
          Quiet observations and personal essays on human relations.
        </p>
        <div className="pt-3 border-t border-paper-border/60">
          <a
            href="https://sumit6131.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full font-sans text-base font-medium text-[#FF6719] hover:underline group"
          >
            <span>Read on Substack</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * Interactive "Identity Crisis" Trilemma Calculator with Stacked Horizontal Bar
 */
export const TrilemmaEntity: React.FC<BaseEntityProps> = ({ children }) => {
  const BASELINE_RATIOS = {
    cogSci: 40,
    design: 35,
    code: 25,
  };

  const [ratios, setRatios] = useState(BASELINE_RATIOS);
  const [isOpen, setIsOpen] = useState(false);

  const recalculate = () => {
    // Generate 3 numbers that sum to 100
    const r1 = Math.floor(Math.random() * 35) + 25; // 25 - 60
    const remaining = 100 - r1;
    const r2 = Math.floor(Math.random() * (remaining - 20)) + 10;
    const r3 = 100 - r1 - r2;
    setRatios({ cogSci: r1, design: r2, code: r3 });
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset to baseline so the animation replays on next hover
      setRatios(BASELINE_RATIOS);
      return;
    }

    // Time-based animation: runs on a loop every 600ms while the card is open
    const interval = setInterval(() => {
      recalculate();
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <HoverCard openDelay={90} closeDelay={150} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <span
          onClick={recalculate}
          className="underline decoration-dotted decoration-emerald-500/80 hover:decoration-solid underline-offset-4 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors select-none group"
        >
          {children || "identity crises"}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        className="w-84 sm:w-96 text-left select-none group"
        onClick={() => recalculate()}
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-sans font-semibold text-lg text-ink-primary">
            Identity Distribution
          </h4>
        </div>

        {/* Stacked Horizontal Bar Chart */}
        <div className="h-3.5 w-full bg-paper-border/40 rounded-full overflow-hidden flex shadow-inner my-2.5">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${ratios.cogSci}%` }}
            title={`Cognitive Science: ${ratios.cogSci}%`}
          />
          <div
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${ratios.design}%` }}
            title={`Design Craft: ${ratios.design}%`}
          />
          <div
            className="h-full bg-amber-500 transition-all duration-500 ease-out"
            style={{ width: `${ratios.code}%` }}
            title={`Production Code: ${ratios.code}%`}
          />
        </div>

        {/* 3-Column Animating Values Breakdown */}
        <div className="grid grid-cols-3 gap-2 pt-2 font-sans">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">Cognitive</span>
            </div>
            <span className="font-semibold text-ink-primary text-base tabular-nums">
              {ratios.cogSci}%
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-0.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
              <span className="truncate">Design</span>
            </div>
            <span className="font-semibold text-ink-primary text-base tabular-nums">
              {ratios.design}%
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span className="truncate">Code</span>
            </div>
            <span className="font-semibold text-ink-primary text-base tabular-nums">
              {ratios.code}%
            </span>
          </div>
        </div>

        <p className="font-sans text-xs text-ink-muted pt-3 mt-3 border-t border-paper-border/60">
          Fluctuates daily based on coffee intake and git commits.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

/**
 * "Craft is the differentiator" - Interactive Metallic Shimmer
 * A gentle metallic platinum shimmer that glints and glides as the user's cursor sweeps across the sentence.
 */
export const CraftEntity: React.FC<BaseEntityProps> = ({ children }) => {
  const content = children || "craft is the differentiator";
  const [isHovered, setIsHovered] = useState(false);
  const [glideX, setGlideX] = useState<number>(50);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!spanRef.current) return;
    const rect = spanRef.current.getBoundingClientRect();
    if (rect.width > 0) {
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      setGlideX(x);
    }
  };

  return (
    <span
      ref={spanRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative inline-block font-semibold text-ink-primary cursor-default select-none group/craft align-baseline"
      style={
        {
          "--glide-x": `${glideX}%`,
        } as React.CSSProperties
      }
    >
      {/* Base readable text */}
      <span className="relative z-0 text-ink-primary">
        {content}
      </span>

      {/* Dynamic metallic specular sheen following pointer glide */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-10 pointer-events-none select-none transition-opacity duration-300 ease-out",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(ellipse 90px 40px at var(--glide-x, 50%) 50%, rgba(255, 255, 255, 0.95) 0%, rgba(226, 232, 240, 0.8) 28%, rgba(148, 163, 184, 0.3) 55%, transparent 75%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {content}
      </span>

      {/* Ambient metallic sheen sweep across the sentence */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-20 pointer-events-none select-none metallic-craft-sheen transition-opacity duration-300 ease-out",
          isHovered ? "opacity-75" : "opacity-0"
        )}
        style={{
          background: `linear-gradient(115deg, transparent 20%, rgba(203, 213, 225, 0.3) 38%, rgba(255, 255, 255, 0.95) 50%, rgba(203, 213, 225, 0.3) 62%, transparent 80%)`,
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {content}
      </span>

      {/* Hairline metallic highlight along base */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 right-0 -bottom-0.5 h-[1.5px] rounded-full pointer-events-none transition-all duration-300 ease-out",
          isHovered
            ? "opacity-80 scale-x-100 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-200 to-transparent"
            : "opacity-0 scale-x-50"
        )}
      />
    </span>
  );
};
