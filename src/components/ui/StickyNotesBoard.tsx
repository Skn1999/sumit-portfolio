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
    "bg-amber-100/90 dark:bg-amber-950/50 text-amber-950 dark:text-amber-100 border-amber-300/60 dark:border-amber-700/50 shadow-amber-900/5",
  rose:
    "bg-rose-100/90 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100 border-rose-300/60 dark:border-rose-700/50 shadow-rose-900/5",
  teal:
    "bg-teal-100/90 dark:bg-teal-950/50 text-teal-950 dark:text-teal-100 border-teal-300/60 dark:border-teal-700/50 shadow-teal-900/5",
  amber:
    "bg-amber-200/80 dark:bg-amber-900/40 text-amber-950 dark:text-amber-100 border-amber-400/60 dark:border-amber-600/50 shadow-amber-950/5",
  blue:
    "bg-sky-100/90 dark:bg-sky-950/50 text-sky-950 dark:text-sky-100 border-sky-300/60 dark:border-sky-700/50 shadow-sky-900/5",
};

const rotations = ["-rotate-1 sm:-rotate-2", "rotate-1 sm:rotate-2", "-rotate-1 sm:-rotate-1.5"];

export const StickyNotesBoard: React.FC<StickyNotesBoardProps> = ({
  title = "// WHITEBOARD SYNTHESIS — PAIN POINTS",
  subtitle = "Hover on any sticky note to inspect full details",
  notes,
  className,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "my-10 p-6 sm:p-8 rounded-2xl bg-paper-card/40 border border-paper-border relative overflow-hidden not-prose backdrop-blur-xs",
        className
      )}
    >
      {/* Header Monospace Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-paper-border/60">
        <span className="font-mono text-xs font-semibold tracking-widest text-ink-muted uppercase">
          {title}
        </span>
        {subtitle && (
          <span className="font-mono text-[11px] text-ink-muted/80 tracking-wide">
            {subtitle}
          </span>
        )}
      </div>

      {/* Grid of Interactive Sticky Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {notes.map((note, index) => {
          const styleKey = note.color || (index === 0 ? "yellow" : index === 1 ? "rose" : "teal");
          const colorClass = colorStyles[styleKey];
          const rotationClass = rotations[index % rotations.length];
          const isFocused = focusedIndex === index;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setFocusedIndex(index)}
              onMouseLeave={() => setFocusedIndex(null)}
              onClick={() => setFocusedIndex(isFocused ? null : index)}
              className={cn(
                "group relative p-6 rounded-xl border shadow-md cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between min-h-[160px]",
                colorClass,
                rotationClass,
                "hover:rotate-0 hover:scale-[1.03] hover:z-30 hover:shadow-xl",
                isFocused && "rotate-0 scale-[1.03] z-30 shadow-xl"
              )}
            >
              {/* Tape Strip at top of Post-it */}
              <div className="w-10 h-3 bg-paper-border/30 dark:bg-white/10 rounded-xs mx-auto -mt-3 mb-3 shadow-xs" />

              <div>
                {note.icon && <div className="text-2xl mb-2">{note.icon}</div>}
                <strong className="block font-display text-lg font-bold leading-tight mb-2">
                  {note.title}
                </strong>
              </div>

              {/* Detail Paragraph: Revealed on Hover or Tap */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-out",
                  "opacity-100 max-h-96 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-96",
                  isFocused && "md:opacity-100 md:max-h-96"
                )}
              >
                <p className="font-body-narrative text-xs sm:text-sm leading-relaxed mt-2 pt-2 border-t border-current/15">
                  {note.description}
                </p>
              </div>

              {/* Hover Indicator Prompt on Desktop */}
              <div
                className={cn(
                  "mt-3 text-[10px] font-mono tracking-wider opacity-60 uppercase flex items-center justify-between",
                  "group-hover:hidden",
                  isFocused && "hidden"
                )}
              >
                <span>Hover to detail</span>
                <span>→</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StickyNotesBoard;
