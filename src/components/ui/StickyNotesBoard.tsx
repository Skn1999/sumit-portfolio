import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface StickyNoteItem {
  icon?: string;
  title: string;
  description: string;
  color?: "yellow" | "rose" | "teal" | "amber" | "blue";
}

interface StickyNotesBoardProps {
  title?: string;
  subtitle?: string;
  notes: StickyNoteItem[];
  className?: string;
}

const colorStyles = {
  yellow:
    "bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 border-amber-300/80 dark:border-amber-700/60 shadow-amber-900/10",
  rose:
    "bg-rose-100 dark:bg-rose-950/70 text-rose-950 dark:text-rose-100 border-rose-300/80 dark:border-rose-700/60 shadow-rose-900/10",
  teal:
    "bg-teal-100 dark:bg-teal-950/70 text-teal-950 dark:text-teal-100 border-teal-300/80 dark:border-teal-700/60 shadow-teal-900/10",
  amber:
    "bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 border-amber-400/80 dark:border-amber-600/60 shadow-amber-950/10",
  blue:
    "bg-sky-100 dark:bg-sky-950/70 text-sky-950 dark:text-sky-100 border-sky-300/80 dark:border-sky-700/60 shadow-sky-900/10",
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
            const styleKey = note.color || (index === 0 ? "yellow" : index === 1 ? "rose" : "teal");
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
                  "group relative w-full sm:w-[290px] md:w-[310px] h-[230px] sm:h-[240px] p-6 rounded-xl border shadow-md select-none cursor-pointer overflow-hidden transition-all duration-300 ease-out flex flex-col justify-between",
                  colorClass,
                  rotationClass,
                  "hover:rotate-0 hover:scale-[1.04] hover:shadow-xl",
                  isHovered && "rotate-0 scale-[1.04] shadow-xl"
                )}
              >
                {/* Tape Strip at top of Post-it */}
                <div className="w-10 h-3 bg-paper-border/30 dark:bg-white/10 rounded-xs mx-auto -mt-3 mb-2 opacity-80 shrink-0" />

                {/* Content Container with Internal Unroll Dynamics */}
                <div className="relative flex-1 flex flex-col justify-between overflow-hidden">
                  {/* Top Header: Icon & Title */}
                  <div
                    className={cn(
                      "transition-all duration-300 ease-out transform",
                      isHovered ? "-translate-y-1" : "translate-y-1"
                    )}
                  >
                    {note.icon && <div className="text-2xl mb-1.5">{note.icon}</div>}
                    <strong className="block font-display text-base sm:text-lg font-bold leading-tight">
                      {note.title}
                    </strong>
                  </div>

                  {/* Internal Unroll Slide-Up Narrative */}
                  <div
                    className={cn(
                      "transition-all duration-300 ease-out overflow-y-auto pr-1 text-xs leading-relaxed font-body-narrative",
                      isHovered
                        ? "opacity-100 translate-y-0 max-h-32 mt-2 pt-2 border-t border-current/20"
                        : "opacity-0 translate-y-4 max-h-0 pointer-events-none"
                    )}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed">
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
