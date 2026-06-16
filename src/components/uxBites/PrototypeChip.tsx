import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Props {
  url: string;
  label?: string;
  /** Variant: 'inline' renders in hero area, 'sticky' becomes fixed on scroll */
  variant?: "inline" | "sticky";
  className?: string;
}

/**
 * Pill chip that links out to a live prototype. Used in two ways:
 * - Inline: rendered in the bite hero
 * - Sticky: appears top-right after the user scrolls past the hero
 */
export const PrototypeChip: React.FC<Props> = ({
  url,
  label = "Live prototype",
  variant = "inline",
  className,
}) => {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(variant === "inline");

  useEffect(() => {
    if (variant !== "sticky") return;
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const Chip = (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} — opens in a new tab`}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-4 py-2",
        "font-bite-display text-[11px] uppercase tracking-[0.22em]",
        "border border-[hsl(var(--bite-accent)/0.5)] text-[hsl(var(--bite-accent))]",
        "bg-[hsl(var(--bite-paper-raised,var(--bite-paper))/0.85)] backdrop-blur-sm",
        "hover:bg-[hsl(var(--bite-accent))] hover:text-[hsl(var(--bite-paper))]",
        "transition-colors duration-300 shadow-sm",
        className
      )}
    >
      <span className="bite-dot !bg-current !opacity-90" aria-hidden />
      <span>{label}</span>
      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );

  if (variant === "inline") return Chip;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-20 right-4 md:right-6 z-40"
        >
          {Chip}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrototypeChip;
