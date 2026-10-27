import { useLayoutEffect, useRef, useState } from "react";
import { useChromeRim } from "../chrome";
import { useIsDark } from "../lib";

type Props = { label: string; options: string[]; value: number; onChange: (i: number) => void };

/** Segmented control in the dock's visual language: frosted glass, chrome rim shader, sliding pill. */
export default function ChromeSeg({ label, options, value, onChange }: Props) {
  const dark = useIsDark();
  const fx = useRef<HTMLCanvasElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  useChromeRim(fx, dark, 2.6);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const measure = () => {
      const b = el.querySelectorAll<HTMLElement>("button")[value];
      if (!b) return;
      setInd({ x: b.offsetLeft, w: b.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [value, options.length]);

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = Math.max(0, Math.min(options.length - 1, value + d));
    onChange(n);
    root.current?.querySelectorAll<HTMLElement>("button")[n]?.focus();
  };

  return (
    <div className="v2-cseg" role="group" aria-label={label} ref={root} onKeyDown={onKey}>
      <canvas className="fx" ref={fx} aria-hidden="true" />
      <span className="ind" aria-hidden="true" style={{ transform: `translateX(${ind?.x ?? 0}px)`, width: ind?.w ?? 0, opacity: ind ? 1 : 0 }} />
      {options.map((o, i) => (
        <button key={o} type="button" aria-pressed={i === value} onClick={() => onChange(i)}>{o}</button>
      ))}
    </div>
  );
}
