import { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, BookOpen, LayoutGrid, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { asset, openQuickActions, RESUME_URL, shortcutLabel } from "../lib";
import { useChromeRim } from "../chrome";

/** `fold`: hidden in Reader mode (the letter has no chapters to jump to, and contact lives in the footer). */
export type DockItem = { label: string; to: string; key: string; external?: boolean; fold?: boolean };

const ITEMS: DockItem[] = [
  { key: "work", label: "Work", to: "/#work", fold: true },
  { key: "resume", label: "Résumé", to: RESUME_URL, external: true },
  { key: "contact", label: "Contact", to: "/#contact", fold: true },
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
  const folded = !!reader?.on;
  const [kbd] = useState(shortcutLabel);
  // Natural widths of the folding links, so their slots can animate to and from 0.
  const [nat, setNat] = useState<Record<string, number>>({});
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
    // The dock resizes every frame while it morphs; the observer keeps the pill and the rim in step.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [active, reader?.on, location.pathname]);

  useLayoutEffect(() => {
    const el = nav.current;
    if (!el) return;
    const measure = () => {
      const next: Record<string, number> = {};
      // The link inside a slot keeps its own width even when the slot is closed.
      el.querySelectorAll<HTMLElement>("[data-fold]").forEach((a) => { next[a.dataset.fold!] = a.offsetWidth; });
      setNat((prev) => (Object.keys(next).every((k) => prev[k] === next[k]) ? prev : next));
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="v2-dockwrap">
      <nav className={`v2-dock${folded ? " is-reader" : ""}`} aria-label="Primary" ref={nav}>
        <canvas className="v2-dock-fx" ref={fx} aria-hidden="true" />
        <span className="v2-dock-ind" aria-hidden="true" style={{ transform: `translateX(${ind?.x ?? 0}px)`, width: ind?.w ?? 0, opacity: ind ? 1 : 0 }} />
        {ITEMS.map((it) =>
          it.external ? (
            // Opens the PDF in a new tab rather than navigating away from the portfolio.
            <a key={it.key} href={it.to} target="_blank" rel="noopener noreferrer" className="v2-dock-item" data-dock={it.key}
              aria-label={`${it.label} (PDF, opens in a new tab)`}>
              {it.label}<ArrowUpRight className="v2-dock-ext" size={14} aria-hidden="true" />
            </a>
          ) : it.fold ? (
            // A slot that folds to zero width in Reader mode; the glass and chrome rim follow it.
            <span key={it.key} className="v2-fold" data-k={it.key} aria-hidden={folded || undefined}
              style={nat[it.key] ? { width: folded ? 0 : nat[it.key] } : undefined}>
              <Link to={it.to} className="v2-dock-item" data-dock={it.key} data-fold={it.key} tabIndex={folded ? -1 : undefined}
                aria-current={active === it.key ? "page" : undefined} onClick={it.key === "contact" ? toFooter : undefined}>
                {it.label}
              </Link>
            </span>
          ) : (
            <Link key={it.key} to={it.to} className="v2-dock-item" data-dock={it.key} aria-current={active === it.key ? "page" : undefined}>
              {it.label}
            </Link>
          )
        )}
        <span className="v2-dock-sep" aria-hidden="true" />
        {reader && (
          // Like the theme toggle, the icon shows where a click takes you; the pressed state shows Reader mode is on.
          <button type="button" className="v2-icon-btn" aria-pressed={reader.on} onClick={() => reader.set(!reader.on)}
            aria-label="Reader mode" title={reader.on ? "Back to the full layout" : "Reader mode: just the letter"}>
            <span className="v2-ic" data-show={!reader.on}><BookOpen size={17} /></span>
            <span className="v2-ic" data-show={reader.on}><LayoutGrid size={17} /></span>
          </button>
        )}
        <button type="button" className="v2-icon-btn" onClick={toggleTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          title={dark ? "Light theme" : "Dark theme"}>
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        {/* Quick actions, for people who don't know the shortcut. Shows the shortcut on desktop, a search icon on touch. */}
        <button type="button" className="v2-icon-btn v2-kbtn" onClick={openQuickActions} aria-label={`Quick actions (${kbd})`} title={`Quick actions · ${kbd}`}>
          <span className="v2-kbtn-key" aria-hidden="true">{kbd}</span>
          <span className="v2-kbtn-ic" aria-hidden="true"><Search size={17} /></span>
        </button>
        <Link className="v2-dock-me" to="/#contact" onClick={toFooter} aria-label="Sumit Nayyar — open to work" title="Sumit Nayyar · open to work">
          <img src={asset("avatar.jpg")} alt="" />
          <span className="v2-pulse" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
