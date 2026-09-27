import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight, ShieldCheck, Layers, Sparkles } from "lucide-react";

export const ActAiShowcase: React.FC = () => {
  return (
    <div className="w-full rounded-2xl border border-paper-border bg-paper-card p-6 md:p-10 shadow-sm transition-all hover:border-ink-primary/30">
      {/* Top Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Flagship AI &amp; Design Prototype
          </span>
          <span className="font-mono text-xs text-ink-muted">• 2026</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-ink-muted">
          <span className="px-2.5 py-0.5 rounded bg-paper-bg border border-paper-border">React 18</span>
          <span className="px-2.5 py-0.5 rounded bg-paper-bg border border-paper-border">TypeScript</span>
          <span className="px-2.5 py-0.5 rounded bg-paper-bg border border-paper-border">HCI Oversight</span>
          <span className="px-2.5 py-0.5 rounded bg-paper-bg border border-paper-border">State Machines</span>
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-4xl font-bold font-display text-ink-primary tracking-tight mb-3">
          ActAI: Intelligent Email Delegation &amp; Oversight Review
        </h3>
        <p className="font-body-narrative text-base md:text-lg text-ink-muted max-w-3xl leading-relaxed">
          Bridging autonomous email agents with human-in-the-loop oversight through progressive disclosure,
          source-grounded evidence inspection, and bounded consequence modeling.
        </p>
      </div>

      {/* Simon Sinek's Golden Circle Breakdown (Why + How + What) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-4 border-t border-paper-border">
        {/* 1. WHY */}
        <div className="flex flex-col space-y-2 p-5 rounded-xl bg-paper-bg/60 border border-paper-border/70">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono text-xs font-bold">
              01
            </span>
            <span className="font-mono text-xs font-bold tracking-widest text-ink-primary uppercase">
              WHY // The Purpose
            </span>
          </div>
          <h4 className="font-display font-semibold text-ink-primary text-base pt-1">
            The Automation Trust Paradox
          </h4>
          <p className="font-body-narrative text-xs md:text-sm text-ink-muted leading-relaxed">
            Autonomous email bots promise massive time savings, but executives fear black-box errors.
            True agency does not come from blind automation—it requires bounded delegation where humans
            retain ultimate calm and authority.
          </p>
        </div>

        {/* 2. HOW */}
        <div className="flex flex-col space-y-2 p-5 rounded-xl bg-paper-bg/60 border border-paper-border/70">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono text-xs font-bold">
              02
            </span>
            <span className="font-mono text-xs font-bold tracking-widest text-ink-primary uppercase">
              HOW // Design Principles
            </span>
          </div>
          <h4 className="font-display font-semibold text-ink-primary text-base pt-1">
            Progressive Oversight &amp; Grounding
          </h4>
          <p className="font-body-narrative text-xs md:text-sm text-ink-muted leading-relaxed">
            A 3-tier mental model (Today Overview → Review Timeline → Decision Sheet) paired with a 1-click
            Evidence Drawer to verify raw emails, finite state machine transitions, and explicit consequence previews.
          </p>
        </div>

        {/* 3. WHAT */}
        <div className="flex flex-col space-y-2 p-5 rounded-xl bg-paper-bg/60 border border-paper-border/70">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
              03
            </span>
            <span className="font-mono text-xs font-bold tracking-widest text-ink-primary uppercase">
              WHAT // The Artifact
            </span>
          </div>
          <h4 className="font-display font-semibold text-ink-primary text-base pt-1">
            Responsive Web Application
          </h4>
          <p className="font-body-narrative text-xs md:text-sm text-ink-muted leading-relaxed">
            A production-ready Vite + React 18 + Tailwind CSS application featuring Archivo typography,
            zero-FOUC theme switching, evaluator scenario controls, and full WCAG AA contrast compliance.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-paper-border">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://temporary-brisk-agate-zgvse9l.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink-primary text-paper-bg font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Prototype
          </a>
          <a
            href="https://github.com/Skn1999/ACTAI-SMART-EMAIL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-paper-border bg-paper-bg text-ink-primary font-mono text-xs uppercase tracking-wider font-semibold hover:border-ink-primary transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub Repo
          </a>
        </div>

        <Link
          to="/projects/actai"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-ink-primary hover:underline group"
        >
          Read Full Case Study
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ActAiShowcase;
