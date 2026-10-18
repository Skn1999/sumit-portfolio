import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle2, XCircle, FileText, Mail, ArrowRight } from "lucide-react";

interface Stage5Props {
  isActive: boolean;
}

export const Stage5CraftManifesto: React.FC<Stage5Props> = () => {
  const [tab, setTab] = useState<"craft" | "slop">("craft");
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="relative w-full max-w-[540px] h-[520px] flex items-center justify-center select-none">
      <div className="w-[480px] max-w-full rounded-2xl bg-paper-card border border-paper-border/90 shadow-2xl p-7 flex flex-col justify-between">
        {/* Top Header with Centered Tabs (Zero Filler Text) */}
        <div>
          <div className="flex items-center justify-center mb-5">
            <div className="inline-flex p-1 rounded-xl bg-paper-bg border border-paper-border/80">
              <button
                type="button"
                onClick={() => setTab("craft")}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wide transition-all duration-180 ease-emil-out ${
                  tab === "craft"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-ink-muted hover:text-ink-primary"
                }`}
              >
                The Craft Standard
              </button>
              <button
                type="button"
                onClick={() => setTab("slop")}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wide transition-all duration-180 ease-emil-out ${
                  tab === "slop"
                    ? "bg-red-500 text-white shadow-sm"
                    : "text-ink-muted hover:text-ink-primary"
                }`}
              >
                The Slop Default
              </button>
            </div>
          </div>

          {/* Interactive Differentiator Sandbox */}
          {tab === "craft" ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-paper-bg/70 border border-emerald-500/20 text-center">
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block mb-2">
                  Interactive Spring Test
                </span>

                {/* Tactile Craft Button with 160ms feedback and scale(0.97) */}
                <button
                  type="button"
                  onClick={() => setClickCount((c) => c + 1)}
                  className="px-6 py-2.5 rounded-full bg-ink-primary text-paper-bg font-mono text-xs font-bold tracking-wider uppercase transition-transform duration-160 ease-emil-out active:scale-[0.97] hover:opacity-95 shadow-md inline-flex items-center gap-2 select-none"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Test Tactile Spring ({clickCount})</span>
                </button>
                <span className="block font-mono text-[9px] text-ink-muted mt-2">
                  160ms responsive settling &bull; zero layout recalc
                </span>
              </div>

              {/* Verified Quality Badges */}
              <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                <div className="p-2.5 rounded-lg bg-paper-bg/60 border border-paper-border/60 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-ink-primary">Sub-300ms UI rule</span>
                </div>
                <div className="p-2.5 rounded-lg bg-paper-bg/60 border border-paper-border/60 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-ink-primary">GPU transform only</span>
                </div>
                <div className="p-2.5 rounded-lg bg-paper-bg/60 border border-paper-border/60 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-ink-primary">Reduced motion safe</span>
                </div>
                <div className="p-2.5 rounded-lg bg-paper-bg/60 border border-paper-border/60 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-ink-primary">Origin-aware scale</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-paper-bg/70 border border-red-500/20 text-center">
                <span className="font-mono text-[10px] text-red-500 font-bold uppercase tracking-wider block mb-2">
                  Simulated Slop Pattern
                </span>

                {/* Sluggish un-eased button */}
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full bg-paper-bg border border-paper-border text-ink-muted font-mono text-xs tracking-wider transition-all duration-700 ease-in opacity-70 select-none cursor-not-allowed"
                >
                  Sluggish Ease-In (Laggy)
                </button>
                <span className="block font-mono text-[9px] text-red-400 mt-2">
                  600ms ease-in delays feedback &bull; feels disconnected
                </span>
              </div>

              {/* Red Flags List */}
              <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/20 flex items-center gap-2">
                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="text-ink-muted">transition: all</span>
                </div>
                <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/20 flex items-center gap-2">
                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="text-ink-muted">Layout thrash</span>
                </div>
                <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/20 flex items-center gap-2">
                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="text-ink-muted">Ignored reduced motion</span>
                </div>
                <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/20 flex items-center gap-2">
                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="text-ink-muted">scale(0) jumps</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Conversion Action Strip */}
        <div className="pt-5 mt-5 border-t border-paper-border/80 flex items-center gap-3">
          <Link
            to="/resume"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-full bg-ink-primary text-paper-bg font-mono text-[11px] font-bold tracking-wider uppercase transition-transform duration-160 ease-emil-out active:scale-[0.97] hover:opacity-95 shadow-sm"
          >
            <FileText className="w-3 h-3" />
            <span>Resume</span>
          </Link>
          <a
            href="mailto:sknayyar.sk@gmail.com"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-full border border-paper-border bg-paper-bg text-ink-primary font-mono text-[11px] font-bold tracking-wider lowercase transition-transform duration-160 ease-emil-out active:scale-[0.97] hover:border-ink-primary"
          >
            <Mail className="w-3 h-3 text-emerald-500" />
            <span>sknayyar.sk@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};
