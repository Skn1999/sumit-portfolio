import React, { useState } from "react";

/**
 * Interactive Em-Dash with Emil Kowalski pop-style tooltip ("Not written by AI")
 */
export const EmDash: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help align-baseline group/emdash select-none"
      data-open={isOpen ? "true" : undefined}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setIsOpen(false);
      }}
      tabIndex={0}
      role="button"
      aria-label="Em-dash note: Not written by AI"
    >
      <span className="inline-block transition-all duration-150 group-hover/emdash:text-emerald-500 dark:group-hover/emdash:text-emerald-400 group-hover/emdash:scale-110 group-active/emdash:scale-95 px-0.5">
        —
      </span>

      {/* Emil Kowalski pop tooltip */}
      <span
        role="tooltip"
        className="emdash-tooltip absolute bottom-full left-1/2 mb-2.5 px-3 py-1 rounded-full whitespace-nowrap z-50 bg-neutral-900 text-neutral-100 dark:bg-white dark:text-neutral-900 text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase shadow-xl shadow-black/30 border border-white/10 dark:border-black/10 select-none pointer-events-none"
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Not written by AI</span>
        </span>
        {/* Origin-anchored bottom caret */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900 dark:bg-white border-r border-b border-white/10 dark:border-black/10" />
      </span>
    </span>
  );
};

export default EmDash;
