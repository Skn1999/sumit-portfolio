import React, { useState, useEffect, useMemo } from "react";
import { Sun, Moon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute live Helsinki time & components
  const { timeString, hour } = useMemo(() => {
    if (!mounted) {
      return { timeString: "--:--:--", hour: 12, tzName: "EEST" };
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

  return (
    <div className={cn("relative inline-flex items-center text-xs font-mono", className)}>
      <HoverCard openDelay={90} closeDelay={150}>
        <HoverCardTrigger asChild>
          <button
            type="button"
            aria-label={`Helsinki local time is ${timeString}. Hover to inspect timezone comparison.`}
            className={cn(
              "group/dial relative inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md",
              "border border-paper-border bg-paper-card/70 hover:bg-paper-card",
              "hover:border-ink-primary/30 transition-all duration-150 ease-emil-out",
              "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer select-none"
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
              <span className="hidden sm:inline-block opacity-75">
                ({phase.badge.split("//")[0].trim()})
              </span>
              <span className="text-[10px] text-accent font-semibold ml-0.5 group-hover/dial:translate-y-[-1px] transition-transform">
                ▾
              </span>
            </span>
          </button>
        </HoverCardTrigger>

        <HoverCardContent
          align="start"
          side={direction}
          className="w-84 sm:w-96 text-left"
        >
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-3">
            <div
              className={cn(
                "w-11 h-11 rounded-xl border border-paper-border/70 p-1.5 shrink-0 shadow-xs flex items-center justify-center bg-gradient-to-br",
                phase.orbClass
              )}
            >
              {phase.isNight ? (
                <Moon className="w-6 h-6 text-indigo-100" />
              ) : (
                <Sun className="w-6 h-6 text-amber-100" />
              )}
            </div>
            <div>
              <h4 className="font-sans font-semibold text-lg text-ink-primary leading-tight">
                Helsinki, Finland
              </h4>
              <div className="flex items-center gap-2 mt-0.5 font-sans text-[15px] text-ink-muted">
                <span className="tabular-nums font-mono font-medium text-ink-primary">
                  {timeString}
                </span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {phase.name}
                </span>
              </div>
            </div>
          </div>

          {/* Presence Status Description */}
          <p className="font-sans text-base text-ink-muted leading-relaxed mb-4">
            {phase.statusText}
          </p>

          {/* Timezone Comparison & Insight */}
          <div className="space-y-2 pt-3 border-t border-paper-border/60 font-sans text-sm">
            {timezoneDiff && (
              <div className="flex items-center gap-2 text-ink-primary font-medium">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{timezoneDiff.diffText}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-ink-muted pt-1">
              <span>{phase.solarInsight}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider font-mono text-[11px]">
                Open for roles
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default HelsinkiSolarDial;
