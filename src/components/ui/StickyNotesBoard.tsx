import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface StickyNoteItem {
  title: string;
  description: string;
  color?: "moss" | "clay" | "sand" | "stone" | "indigo";
}

interface StickyNotesBoardProps {
  title?: string;
  subtitle?: string;
  notes: StickyNoteItem[];
  className?: string;
}

// Japanese Wabi-Sabi stone-washed paper palettes
const colorStyles = {
  moss:
    "bg-[#e3e9e1] dark:bg-[#1d271e]/90 text-[#273528] dark:text-[#d3dfd0] border-[#c0cebe] dark:border-[#344635] shadow-stone-900/5",
  clay:
    "bg-[#efe6e2] dark:bg-[#2b211f]/90 text-[#3d2b27] dark:text-[#ebdcd6] border-[#dac9c3] dark:border-[#4d3733] shadow-stone-900/5",
  sand:
    "bg-[#f0ebe1] dark:bg-[#28241e]/90 text-[#3a3326] dark:text-[#ebdec9] border-[#dcd2c1] dark:border-[#473e30] shadow-stone-900/5",
  stone:
    "bg-[#e6e6e4] dark:bg-[#222324]/90 text-[#2b2c2e] dark:text-[#dedee0] border-[#cecfd1] dark:border-[#3e4042] shadow-stone-900/5",
  indigo:
    "bg-[#e2e7ed] dark:bg-[#1b222c]/90 text-[#253040] dark:text-[#d1dce9] border-[#c4d0e0] dark:border-[#323f52] shadow-stone-900/5",
};

const rotations = ["-rotate-2 sm:-rotate-3", "rotate-1 sm:rotate-2", "-rotate-1 sm:-rotate-2"];

export const StickyNotesBoard: React.FC<StickyNotesBoardProps> = ({
  title = "// WHITEBOARD SYNTHESIS — PAIN POINTS",
  subtitle = "Hover or tap on any sticky note to unroll research details",
  notes,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "my-14 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-12 px-4 sm:px-8 md:px-16 bg-paper-card/30 border-y border-paper-border not-prose backdrop-blur-xs overflow-hidden",
        className
      )}
    >
      {/* Max-Width Inner Container */}
      <div className="max-w-6xl mx-auto relative">
        {/* Header Monospace Label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-10 pb-4 border-b border-paper-border/60">
          <span className="font-mono text-xs font-semibold tracking-widest text-ink-muted uppercase">
            {title}
          </span>
          {subtitle && (
            <span className="font-mono text-[11px] text-ink-muted/80 tracking-wide">
              {subtitle}
            </span>
          )}
        </div>

        {/* Centered Sticky Notes Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 max-w-5xl mx-auto">
          {notes.map((note, index) => {
            const styleKey = note.color || (index === 0 ? "sand" : index === 1 ? "clay" : "moss");
            const colorClass = colorStyles[styleKey];
            const rotationClass = rotations[index % rotations.length];
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isHovered ? null : index)}
                className={cn(
                  "group relative w-full sm:w-[280px] md:w-[300px] aspect-square p-6 sm:p-7 rounded-xl border shadow-sm select-none cursor-pointer overflow-hidden transition-all duration-300 ease-out flex flex-col justify-between",
                  colorClass,
                  rotationClass,
                  "hover:rotate-0 hover:scale-[1.04] hover:shadow-xl",
                  isHovered && "rotate-0 scale-[1.04] shadow-xl"
                )}
              >
                {/* Wabi-Sabi Tape Strip at top of Post-it */}
                <div className="w-10 h-3 bg-paper-border/40 dark:bg-white/10 rounded-xs mx-auto -mt-3 mb-2 opacity-70 shrink-0" />

                {/* Content Container with Internal Unroll Dynamics */}
                <div className="relative flex-1 flex flex-col justify-between overflow-hidden">
                  {/* Top Header: Title */}
                  <div
                    className={cn(
                      "transition-all duration-300 ease-out transform",
                      isHovered ? "-translate-y-1" : "translate-y-1"
                    )}
                  >
                    <strong className="block font-display text-base sm:text-lg font-bold leading-tight">
                      {note.title}
                    </strong>
                  </div>

                  {/* Internal Unroll Slide-Up Narrative (8-9px text size) */}
                  <div
                    className={cn(
                      "transition-all duration-300 ease-out overflow-y-auto pr-1 font-body-narrative",
                      isHovered
                        ? "opacity-100 translate-y-0 max-h-44 mt-3 pt-3 border-t border-current/20"
                        : "opacity-0 translate-y-4 max-h-0 pointer-events-none"
                    )}
                  >
                    <p className="text-[9px] leading-relaxed tracking-wide">
                      {note.description}
                    </p>
                  </div>

                  {/* Bottom Hint Prompt */}
                  <div
                    className={cn(
                      "flex items-center justify-between text-[10px] font-mono tracking-wider uppercase pt-2 border-t border-current/15 transition-opacity duration-300 shrink-0",
                      isHovered ? "opacity-0" : "opacity-60"
                    )}
                  >
                    <span>Hover to unroll</span>
                    <span>↓</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StickyNotesBoard;
