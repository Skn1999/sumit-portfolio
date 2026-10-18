import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Feather, Activity, ArrowUpRight, MapPin } from "lucide-react";

interface Stage4Props {
  isActive: boolean;
}

type TabType = "superego" | "trail" | "substack";

export const Stage4DossierFolder: React.FC<Stage4Props> = () => {
  const [activeTab, setActiveTab] = useState<TabType>("superego");

  return (
    <div
      className="relative w-full max-w-[540px] h-[520px] flex items-center justify-center select-none"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Isometric Folder Container */}
      <div
        className="relative w-[460px] h-[400px] transition-transform duration-300 ease-emil-out"
        style={{
          transform: "rotateX(12deg) rotateY(-8deg) rotateZ(1deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top Staggered Manila Index Tabs */}
        <div className="absolute -top-7 left-3 right-3 flex items-end gap-1.5 z-10">
          <button
            type="button"
            onClick={() => setActiveTab("superego")}
            className={`px-3.5 py-1.5 rounded-t-lg font-mono text-[10px] font-bold tracking-wider transition-all duration-200 ease-emil-out flex items-center gap-1.5 border-t border-x ${
              activeTab === "superego"
                ? "bg-paper-card text-emerald-600 dark:text-emerald-400 border-paper-border shadow-md -translate-y-1 z-20"
                : "bg-paper-bg text-ink-muted border-paper-border/70 hover:text-ink-primary z-10"
            }`}
          >
            <Activity className="w-3 h-3 text-emerald-500" />
            <span>YOU (Super Ego)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("trail")}
            className={`px-3.5 py-1.5 rounded-t-lg font-mono text-[10px] font-bold tracking-wider transition-all duration-200 ease-emil-out flex items-center gap-1.5 border-t border-x ${
              activeTab === "trail"
                ? "bg-paper-card text-emerald-600 dark:text-emerald-400 border-paper-border shadow-md -translate-y-1 z-20"
                : "bg-paper-bg text-ink-muted border-paper-border/70 hover:text-ink-primary z-10"
            }`}
          >
            <Compass className="w-3 h-3 text-amber-500" />
            <span>Nuuksio Trail</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("substack")}
            className={`px-3.5 py-1.5 rounded-t-lg font-mono text-[10px] font-bold tracking-wider transition-all duration-200 ease-emil-out flex items-center gap-1.5 border-t border-x ${
              activeTab === "substack"
                ? "bg-paper-card text-emerald-600 dark:text-emerald-400 border-paper-border shadow-md -translate-y-1 z-20"
                : "bg-paper-bg text-ink-muted border-paper-border/70 hover:text-ink-primary z-10"
            }`}
          >
            <Feather className="w-3 h-3 text-sky-500" />
            <span>Substack Draft</span>
          </button>
        </div>

        {/* Back Manila Folder Body */}
        <div className="absolute inset-0 rounded-2xl bg-paper-bg border border-paper-border shadow-xl z-0" />

        {/* Inner Tucked Sheets (Behind the Front Pocket) */}
        <div className="absolute inset-x-3 top-3 bottom-14 z-10">
          {/* Sheet 1: YOU (Super Ego) Breathing Orbit */}
          <div
            className={`absolute inset-0 rounded-xl bg-paper-card border border-paper-border/90 p-5 shadow-lg transition-all duration-250 ease-emil-out ${
              activeTab === "superego"
                ? "opacity-100 transform -translate-y-6 translate-z-10 z-20 pointer-events-auto"
                : "opacity-0 transform translate-y-4 pointer-events-none z-10"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                  Self-Regulation Prototype
                </span>
                <h4 className="font-display font-bold text-base text-ink-primary">
                  YOU // Super Ego
                </h4>
              </div>
              <Link
                to="/projects/super-ego-app"
                className="p-1 rounded-md bg-paper-bg hover:bg-emerald-500/10 text-ink-muted hover:text-emerald-500 transition-colors"
                title="View Super Ego Case Study"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Inhale / Exhale Breathing Orbit Ring */}
            <div className="relative w-full h-36 rounded-lg bg-paper-bg/80 border border-paper-border/60 flex flex-col items-center justify-center overflow-hidden">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Breathing circle pulsing */}
                <div className="absolute inset-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 animate-breathe-pulse" />
                {/* Outer Orbit Track */}
                <div className="absolute inset-0 rounded-full border border-dashed border-paper-border" />
                {/* Orbiting Satellite Dot */}
                <div className="absolute inset-0 animate-orbit-spin">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm -top-1 left-1/2 -translate-x-1/2 absolute" />
                </div>
                {/* Center text */}
                <span className="font-mono text-[10px] text-ink-primary font-bold">
                  Inhale
                </span>
              </div>
              <span className="font-mono text-[9px] text-ink-muted mt-2">
                Breath cycle • 4.0s coherence cadence
              </span>
            </div>
          </div>

          {/* Sheet 2: Nuuksio Trail Notes & Hiking */}
          <div
            className={`absolute inset-0 rounded-xl bg-paper-card border border-paper-border/90 p-4 shadow-lg transition-all duration-250 ease-emil-out flex flex-col ${
              activeTab === "trail"
                ? "opacity-100 transform -translate-y-6 translate-z-10 z-20 pointer-events-auto"
                : "opacity-0 transform translate-y-4 pointer-events-none z-10"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
                <MapPin className="w-3 h-3 text-amber-500" />
                <span>Nuuksio National Park, Espoo</span>
              </div>
              <span className="font-mono text-[9px] text-amber-600 dark:text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10">
                OCTOBER TRAIL
              </span>
            </div>

            <div className="relative flex-1 rounded-lg overflow-hidden border border-paper-border/60 mb-2">
              <img
                src="/images/about/hiking.jpg"
                alt="Sumit hiking in Finland"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/75 backdrop-blur-xs text-white font-mono text-[9px]">
                Off-grid headspace // 18.4 km
              </div>
            </div>
          </div>

          {/* Sheet 3: Substack Notes */}
          <div
            className={`absolute inset-0 rounded-xl bg-paper-card border border-paper-border/90 p-5 shadow-lg transition-all duration-250 ease-emil-out flex flex-col justify-between ${
              activeTab === "substack"
                ? "opacity-100 transform -translate-y-6 translate-z-10 z-20 pointer-events-auto"
                : "opacity-0 transform translate-y-4 pointer-events-none z-10"
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[9px] text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                  Draft Essay // Notes
                </span>
                <span className="font-mono text-[9px] text-ink-muted">1,240 words</span>
              </div>
              <h4 className="font-display font-bold text-sm text-ink-primary mb-2">
                On Human Attention &amp; Machine-Generated Interfaces
              </h4>
              <p className="font-mono text-[11px] text-ink-muted leading-relaxed line-clamp-3 bg-paper-bg/70 p-2.5 rounded border border-paper-border/60">
                &ldquo;When software creates limitless noise for cheap, genuine friction and deliberate restraint become the most generous things a designer can craft...&rdquo;
              </p>
            </div>

            <div className="pt-2 border-t border-paper-border/60 flex items-center justify-between font-mono text-[9px] text-ink-muted">
              <span>Status: In progress</span>
              <span className="text-sky-500">Substack publication pending</span>
            </div>
          </div>
        </div>

        {/* Front Folder Occlusion Pocket with Thumb Cutout (Tucks cards inside!) */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 rounded-b-2xl bg-paper-bg/95 border-t border-paper-border/90 shadow-lg flex flex-col justify-between p-4 z-30"
          style={{
            transform: "translateZ(30px)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Thumb Notch Cutout at Top Edge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 rounded-b-full bg-paper-bg border-b border-x border-paper-border/80" />

          {/* Folder Label */}
          <div className="pt-1">
            <span className="font-mono text-[9px] text-ink-muted uppercase tracking-wider block">
              Dossier // Personal Archive
            </span>
            <span className="font-display font-bold text-sm text-ink-primary">
              Vol. 04: Headspace &amp; Exploration
            </span>
          </div>

          {/* Pocket Base Details */}
          <div className="flex items-center justify-between font-mono text-[9px] text-ink-muted pt-2 border-t border-paper-border/60">
            <span>Physical Sleeve Occlusion</span>
            <span className="font-semibold text-emerald-500">TUCKED &bull; SECURE</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breathePulse {
          0%, 100% { transform: scale(0.85); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-breathe-pulse {
          animation: breathePulse 4s ease-in-out infinite;
        }
        .animate-orbit-spin {
          animation: orbitSpin 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-breathe-pulse, .animate-orbit-spin {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
