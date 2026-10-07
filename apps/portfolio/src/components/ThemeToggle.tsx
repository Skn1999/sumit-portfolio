import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

/**
 * Site-wide Day / Night toggle.
 * Two-segment pill — same visual language used across the portfolio and UX Bites.
 * Syncs with the global ThemeContext.
 */
const ThemeToggle: React.FC<Props> = ({ className }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const segBase =
    "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300";

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center rounded-sm border border-border overflow-hidden",
        "bg-background/60 backdrop-blur-sm",
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
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun className="w-3 h-3" aria-hidden />
        <span>Day</span>
      </button>
      <span aria-hidden className="w-px h-4 bg-border" />
      <button
        type="button"
        aria-pressed={isDark}
        aria-label="Night mode"
        onClick={() => setTheme("dark")}
        className={cn(
          segBase,
          isDark
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon className="w-3 h-3" aria-hidden />
        <span>Night</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
