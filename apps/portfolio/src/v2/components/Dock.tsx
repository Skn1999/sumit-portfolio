import { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, BookOpen, LayoutGrid, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { asset, RESUME_URL } from "../lib";
import { useChromeRim } from "../chrome";

export type DockItem = { label: string; to: string; key: string; external?: boolean };

const ITEMS: DockItem[] = [
  { key: "work", label: "Work", to: "/#work" },
  { key: "resume", label: "Résumé", to: RESUME_URL, external: true },
  { key: "contact", label: "Contact", to: "/#contact" },
];

type Props = {
  active?: string;
  reader?: { on: boolean; set: (v: boolean) => void };
};

/** Frosted-glass dock with a chrome rim, a sliding active pill, and two icon toggles: Reader mode and theme. */
export default function Dock({ active, reader }: Props) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const fx = useRef<HTMLCanvasElement>(null);
  const nav = useRef<HTMLElement>(null);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const location = useLocation();
  useChromeRim(fx, dark);
  // Every v2 page ends with the contact footer, so Contact scrolls on the current page.
  const toFooter = (e: React.MouseEvent) => {
    const el = document.getElementById("contact");
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const el = nav.current;
    if (!el) return;
    const measure = () => {
      const a = el.querySelector<HTMLElement>(`[data-dock="${active}"]`);
      if (!a) { setInd(null); return; }
      const base = el.getBoundingClientRect(), r = a.getBoundingClientRect();
      setInd({ x: r.left - base.left, w: r.width });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [active, reader?.on, location.pathname]);

  return (
    <div className="v2-dockwrap">
      <nav className="v2-dock" aria-label="Primary" ref={nav}>
        <canvas className="v2-dock-fx" ref={fx} aria-hidden="true" />
        <span className="v2-dock-ind" aria-hidden="true" style={{ transform: `translateX(${ind?.x ?? 0}px)`, width: ind?.w ?? 0, opacity: ind ? 1 : 0 }} />
        {ITEMS.map((it) =>
          it.external ? (
            // Opens the PDF in a new tab rather than navigating away from the portfolio.
            <a key={it.key} href={it.to} target="_blank" rel="noopener noreferrer" className="v2-dock-item" data-dock={it.key}
              aria-label={`${it.label} (PDF, opens in a new tab)`}>
              {it.label}<ArrowUpRight className="v2-dock-ext" size={14} aria-hidden="true" />
            </a>
          ) : (
            <Link key={it.key} to={it.to} className="v2-dock-item" data-dock={it.key} aria-current={active === it.key ? "page" : undefined}
              onClick={it.key === "contact" ? toFooter : undefined}>
              {it.label}
            </Link>
          )
        )}
        <span className="v2-dock-sep" aria-hidden="true" />
        {reader && (
          // Like the theme toggle, the icon shows where a click takes you; the pressed state shows Reader mode is on.
          <button type="button" className="v2-icon-btn" aria-pressed={reader.on} onClick={() => reader.set(!reader.on)}
            aria-label="Reader mode" title={reader.on ? "Back to the full layout" : "Reader mode: just the letter"}>
            {reader.on ? <LayoutGrid size={17} /> : <BookOpen size={17} />}
          </button>
        )}
        <button type="button" className="v2-icon-btn" onClick={toggleTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          title={dark ? "Light theme" : "Dark theme"}>
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <Link className="v2-dock-me" to="/#contact" onClick={toFooter} aria-label="Sumit Nayyar — open to work" title="Sumit Nayyar · open to work">
          <img src={asset("avatar.jpg")} alt="" />
          <span className="v2-pulse" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
