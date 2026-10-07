/**
 * Emotional-arc diagram. Two static curves: current (flat then drop) vs proposed (rising to peak).
 * Chart rendering is intentionally not animated.
 */
export const ScrollArc: React.FC = () => {
  const stages = ["Browse", "Choose", "Amount", "Personalize", "Payment", "Confirm"];

  return (
    <div className="not-prose my-12">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
        Emotional arc of the buying flow
      </p>
      <div className="relative rounded-2xl border border-border/40 bg-muted/20 p-6 md:p-8">
        <svg viewBox="0 0 600 200" className="w-full h-auto" aria-hidden>
          <line
            x1="0"
            y1="160"
            x2="600"
            y2="160"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeDasharray="4 4"
          />
          <path
            d="M 20 130 Q 120 110, 220 100 T 420 90 Q 480 100, 580 160"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 20 140 Q 140 120, 240 100 T 440 60 Q 510 40, 580 30"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="grid grid-cols-6 gap-1 mt-3 text-[10px] md:text-xs text-muted-foreground">
          {stages.map((s) => (
            <span key={s} className="text-center truncate">
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 mt-4 text-xs">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="inline-block w-4 h-[2px] bg-current opacity-50" />
            Current flow
          </span>
          <span className="flex items-center gap-2 text-primary">
            <span className="inline-block w-4 h-[3px] bg-primary" />
            With proposed changes
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollArc;
