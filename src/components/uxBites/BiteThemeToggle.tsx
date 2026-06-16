import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

/**
 * Zine-styled two-segment Day / Night toggle.
 * Syncs with the global ThemeContext — flipping here updates the whole site.
 */
export const BiteThemeToggle: React.FC<Props> = ({ className }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const segBase =
    "inline-flex items-center gap-1.5 px-2.5 py-1 font-bite-display text-[10px] uppercase tracking-[0.24em] transition-colors duration-300";

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center rounded-sm border bite-rule overflow-hidden",
        "bg-[hsl(var(--bite-paper-raised,var(--bite-paper))/0.6)] backdrop-blur-sm",
        className
      )}
    >
      <button
        type="button"
        aria-pressed={!isDark}
        aria-label="Day mode"
        onClick={() => setTheme("light")}
        className={cn(
          segBase,
          !isDark
            ? "bg-[hsl(var(--bite-accent))] text-[hsl(var(--bite-paper))]"
            : "bite-ink-soft hover:text-[hsl(var(--bite-accent))]"
        )}
      >
        <Sun className="w-3 h-3" aria-hidden />
        <span>Day</span>
      </button>
      <span aria-hidden className="w-px h-4 bg-[hsl(var(--bite-rule))]" />
      <button
        type="button"
        aria-pressed={isDark}
        aria-label="Night mode"
        onClick={() => setTheme("dark")}
        className={cn(
          segBase,
          isDark
            ? "bg-[hsl(var(--bite-accent))] text-[hsl(var(--bite-paper))]"
            : "bite-ink-soft hover:text-[hsl(var(--bite-accent))]"
        )}
      >
        <Moon className="w-3 h-3" aria-hidden />
        <span>Night</span>
      </button>
    </div>
  );
};

export default BiteThemeToggle;
