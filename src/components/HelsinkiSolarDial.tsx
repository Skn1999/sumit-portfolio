import React, { useState, useEffect, useRef, useMemo } from "react";
import { Sun, Moon, Sparkles, Clock, Globe, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SolarPhase {
  name: string;
  badge: string;
  orbClass: string;
  isNight: boolean;
  statusText: string;
  solarInsight: string;
}

interface HelsinkiSolarDialProps {
  className?: string;
  direction?: "top" | "bottom";
}

export const HelsinkiSolarDial: React.FC<HelsinkiSolarDialProps> = ({
  className,
  direction = "bottom",
}) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [now, setNow] = useState<Date>(new Date());
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute live Helsinki time & components
  const { timeString, hour, minute, second, tzName } = useMemo(() => {
    if (!mounted) {
      return { timeString: "--:--:--", hour: 12, minute: "00", second: "00", tzName: "EEST" };
    }
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Helsinki",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
    const parts = formatter.formatToParts(now);
    const h = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
    const m = parts.find((p) => p.type === "minute")?.value || "00";
    const s = parts.find((p) => p.type === "second")?.value || "00";
    const tz = parts.find((p) => p.type === "timeZoneName")?.value || "EEST";
    return {
      timeString: `${h.toString().padStart(2, "0")}:${m}:${s} ${tz}`,
      hour: h,
      minute: m,
      second: s,
      tzName: tz,
    };
  }, [now, mounted]);

  // Determine Helsinki Solar Phase & presence status
  const phase: SolarPhase = useMemo(() => {
    // Helsinki (60.17° N)
    if (hour >= 23 || hour < 6) {
      return {
        name: "Nordic Night",
        badge: "Night // Asleep",
        orbClass: "from-indigo-600 via-indigo-800 to-purple-950 shadow-indigo-500/25",
        isNight: true,
        statusText: "Sumit is resting in Helsinki. Email inbox is open—responses typically arrive within 12h.",
        solarInsight: "Sun below horizon • Polar dusk / dark skies across Uusimaa.",
      };
    }
    if (hour >= 6 && hour < 8) {
      return {
        name: "Nordic Dawn",
        badge: "Dawn // Morning Filter Coffee",
        orbClass: "from-rose-500 via-amber-500 to-amber-700 shadow-rose-500/30",
        isNight: false,
        statusText: "Sumit is easing into the Nordic morning. Online and responsive soon.",
        solarInsight: "First light rising over Helsinki archipelago • Golden morning hue.",
      };
    }
    if (hour >= 8 && hour < 17) {
      return {
        name: "Nordic Daylight",
        badge: "Active // Studio Hours",
        orbClass: "from-amber-300 via-amber-500 to-orange-600 shadow-amber-400/40",
        isNight: false,
        statusText: "Sumit is active in Helsinki—prototyping, designing systems, or in code review.",
        solarInsight: "Full daylight • Studio design engineering session active.",
      };
    }
    // 17 - 23
    return {
      name: "Nordic Dusk",
      badge: "Evening // Reading & Focus",
      orbClass: "from-orange-500 via-rose-600 to-purple-900 shadow-orange-500/30",
      isNight: false,
      statusText: "Evening in Helsinki. Reading HCI papers, tinkering on side projects, or open for quick notes.",
      solarInsight: "Long Nordic twilight • Blue hour settling over the Baltic coast.",
    };
  }, [hour]);

  // Visitor timezone comparison
  const timezoneDiff = useMemo(() => {
    if (!mounted) return null;
    try {
      const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";
      const helsinkiDate = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Helsinki" }));
      const visitorDate = new Date(now.toLocaleString("en-US", { timeZone: visitorTz }));
      const diffHours = Math.round((helsinkiDate.getTime() - visitorDate.getTime()) / (1000 * 60 * 60));

      const cleanTz = visitorTz.replace(/_/g, " ").split("/").pop() || visitorTz;

      if (diffHours === 0) {
        return {
          diffText: `Same timezone as you (${cleanTz})`,
          highlight: "Synchronized",
        };
      }
      if (diffHours > 0) {
        return {
          diffText: `Helsinki is ${diffHours}h ahead of your local time (${cleanTz})`,
          highlight: `+${diffHours}h offset`,
        };
      }
      return {
        diffText: `Helsinki is ${Math.abs(diffHours)}h behind your local time (${cleanTz})`,
        highlight: `${diffHours}h offset`,
      };
    } catch {
      return null;
    }
  }, [now, mounted]);

  // Dismiss on outside click or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative inline-flex items-center text-xs font-mono", className)}>
      {/* Interactive Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Helsinki local time is ${timeString}. Click to inspect timezone comparison.`}
        className={cn(
          "group/dial relative inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md",
          "border border-paper-border bg-paper-card/70 hover:bg-paper-card",
          "hover:border-ink-primary/30 transition-all duration-200 ease-out",
          "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          isOpen && "border-ink-primary/40 bg-paper-card shadow-sm"
        )}
      >
        {/* Breathing Celestial Solar / Lunar Orb */}
        <span
          className={cn(
            "relative flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-br shadow-sm overflow-hidden shrink-0",
            phase.orbClass,
            "transition-transform duration-300 group-hover/dial:scale-110 motion-reduce:transition-none"
          )}
        >
          {phase.isNight ? (
            <Moon className="w-2.5 h-2.5 text-indigo-100/90" />
          ) : (
            <Sun className="w-2.5 h-2.5 text-amber-100" />
          )}
          {/* Ambient Breathing Pulse Ring */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-full animate-ping opacity-25 motion-reduce:animate-none",
              phase.isNight ? "bg-indigo-400" : "bg-amber-400"
            )}
            style={{ animationDuration: "3.5s" }}
          />
        </span>

        {/* Tabular Numerals (zero jitter) */}
        <span className="flex items-center gap-1.5 text-ink-primary font-semibold tracking-tight">
          <span className="tabular-nums font-mono">{timeString}</span>
        </span>

        <span className="text-paper-border select-none" aria-hidden="true">
          /
        </span>

        {/* Location & Status Summary */}
        <span className="text-ink-muted group-hover/dial:text-ink-primary transition-colors flex items-center gap-1.5 uppercase tracking-wider">
          <span>Helsinki, Finland</span>
          <span className="hidden sm:inline-block opacity-75">({phase.badge.split("//")[0].trim()})</span>
          <span className="text-[10px] text-accent font-semibold ml-0.5 group-hover/dial:translate-y-[-1px] transition-transform">
            ▾
          </span>
        </span>
      </button>

      {/* Origin-Aware Popover Card */}
      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Helsinki Solar & Timezone Intelligence"
          className={cn(
            "absolute left-0 z-50 w-[300px] sm:w-[320px]",
            direction === "top"
              ? "bottom-full mb-2.5 origin-bottom-left"
              : "top-full mt-2.5 origin-top-left",
            "bg-paper-card border border-paper-border rounded-xl p-4 shadow-xl shadow-black/10 dark:shadow-black/50",
            "transition-all duration-200 ease-out",
            "animate-in fade-in zoom-in-95 motion-reduce:animate-none"
          )}
          style={{
            animationDuration: "180ms",
            animationTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {/* Header */}
          {/* <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-paper-border">
            <div className="flex items-center gap-1.5 text-ink-primary font-bold text-xs uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-accent" />
              <span>Helsinki Presence</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-ink-muted hover:text-ink-primary hover:bg-paper-bg transition-colors active:scale-95"
              aria-label="Close popover"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div> */}

          {/* Time & Solar Phase Details */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start justify-between bg-paper-bg/70 p-2.5 rounded-lg border border-paper-border">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
                  Local Solar Cycle
                </div>
                <div className="text-ink-primary font-bold text-sm tabular-nums mt-0.5">
                  {timeString}
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20">
                <Sparkles className="w-2.5 h-2.5" />
                {phase.name}
              </span>
            </div>

            {/* Timezone Comparison */}
            {timezoneDiff && (
              <div className="text-[11px] text-ink-muted flex items-center gap-1.5 px-1">
                <Clock className="w-3 h-3 text-accent shrink-0" />
                <span>{timezoneDiff.diffText}</span>
              </div>
            )}

            {/* Human Presence State */}
            {/* <p className="text-[11.5px] leading-relaxed text-ink-primary/90 bg-paper-bg/40 p-2 rounded border border-paper-border/60">
              {phase.statusText}
            </p> */}

            {/* Solar Insight */}
            {/* <div className="text-[10px] text-ink-muted border-t border-paper-border/60 pt-2 flex items-center justify-between">
              <span>{phase.solarInsight}</span>
              <span className="text-emerald-500 font-semibold">Available for roles</span>
            </div> */}
          </div>

          {/* Origin-Anchored Caret */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-6 w-3 h-3 rotate-45 bg-paper-card",
              direction === "top"
                ? "-bottom-1.5 border-r border-b border-paper-border"
                : "-top-1.5 border-l border-t border-paper-border"
            )}
          />
        </div>
      )}
    </div>
  );
};

export default HelsinkiSolarDial;
