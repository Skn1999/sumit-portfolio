import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  subtitle = "Hover on any sticky note to inspect full details",
  notes,
  className,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const activeNote = hoveredIndex !== null ? notes[hoveredIndex] : null;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "my-10 w-full p-6 sm:p-10 rounded-2xl bg-paper-card/40 border border-paper-border relative overflow-hidden not-prose backdrop-blur-xs",
        className
      )}
    >
      {/* Header Monospace Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-paper-border/60">
        <span className="font-mono text-xs font-semibold tracking-widest text-ink-muted uppercase">
          {title}
        </span>
        {subtitle && (
          <span className="font-mono text-[11px] text-ink-muted/80 tracking-wide hidden md:block">
            {subtitle}
          </span>
        )}
      </div>

      {/* Floating Ghost Sticky Note following cursor on desktop */}
      <AnimatePresence>
        {hoveredIndex !== null && activeNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              x: mousePos.x + 20,
              y: mousePos.y - 90,
            }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 26,
              mass: 0.5,
            }}
            className={cn(
              "pointer-events-none absolute z-50 w-[320px] sm:w-[360px] p-6 rounded-xl border shadow-2xl backdrop-blur-md hidden md:block",
              colorStyles[activeNote.color || "yellow"]
            )}
            style={{ left: 0, top: 0 }}
          >
            {/* Top Tape Strip */}
            <div className="w-10 h-3 bg-paper-border/40 dark:bg-white/20 rounded-xs mx-auto -mt-3 mb-3 shadow-xs" />

            <div className="flex items-center gap-2 mb-2">
              {activeNote.icon && <span className="text-2xl">{activeNote.icon}</span>}
              <strong className="font-display text-lg font-bold leading-tight">
                {activeNote.title}
              </strong>
            </div>

            <p className="font-body-narrative text-xs sm:text-sm leading-relaxed mt-3 pt-3 border-t border-current/20">
              {activeNote.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered Sticky Notes Grid */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-5xl mx-auto">
        {notes.map((note, index) => {
          const styleKey = note.color || (index === 0 ? "yellow" : index === 1 ? "rose" : "teal");
          const colorClass = colorStyles[styleKey];
          const rotationClass = rotations[index % rotations.length];
          const isHovered = hoveredIndex === index;
          const isMobileExpanded = mobileExpandedIndex === index;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setMobileExpandedIndex(isMobileExpanded ? null : index)}
              className={cn(
                "group relative w-full sm:w-[280px] md:w-[290px] h-auto md:h-[190px] p-6 rounded-xl border shadow-md select-none cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between",
                colorClass,
                rotationClass,
                "hover:rotate-0 hover:scale-[1.04] hover:shadow-xl",
                isHovered && "rotate-0 scale-[1.04] shadow-xl"
              )}
            >
              {/* Tape Strip at top of Post-it */}
              <div className="w-10 h-3 bg-paper-border/30 dark:bg-white/10 rounded-xs mx-auto -mt-3 mb-2 opacity-80" />

              <div>
                {note.icon && <div className="text-2xl mb-2">{note.icon}</div>}
                <strong className="block font-display text-lg font-bold leading-tight">
                  {note.title}
                </strong>
              </div>

              {/* Desktop Monospace Hint */}
              <div className="hidden md:flex items-center justify-between mt-4 text-[10px] font-mono tracking-wider opacity-60 uppercase pt-2 border-t border-current/15">
                <span>Hover for details</span>
                <span>→</span>
              </div>

              {/* Mobile Inline Expansion */}
              <div
                className={cn(
                  "md:hidden overflow-hidden transition-all duration-300 ease-out",
                  isMobileExpanded ? "max-h-96 opacity-100 mt-3 pt-3 border-t border-current/20" : "max-h-0 opacity-0"
                )}
              >
                <p className="font-body-narrative text-xs leading-relaxed">
                  {note.description}
                </p>
              </div>

              <div className="md:hidden mt-2 text-[10px] font-mono tracking-wider opacity-60 uppercase">
                {isMobileExpanded ? "Tap to collapse ▲" : "Tap for details ▼"}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StickyNotesBoard;
