import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, BookOpen, CalendarDays, Copy, Download, FileText, Linkedin, Mail, Moon, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { CALENDAR_URL, SKILLS, type SkillProject } from "../data/cmdk";
import { EMAIL, LINKEDIN, QUICK_ACTIONS_EVENT as OPEN_EVENT, READER_KEY, RESUME_FILE, RESUME_URL, reduceMotion } from "../lib";

/**
 * Quick actions (⌘K / Ctrl K): everything a recruiter came to do, one keystroke away.
 * Opens with the shortcut anywhere on a v2 page, or with the key in the dock (openQuickActions in lib.ts).
 * A dialog with a combobox and a listbox: ↑↓ move, ↵ runs, Esc closes and gives focus back.
 * Desktop: the panel rises out of the page. Phones: a bottom sheet. Reduced motion: a short fade.
 */

type Item = {
  id: string; group: string; label: string; sub: string; keys: string;
  icon: ReactNode; hint?: string; ok?: boolean; toggle?: boolean; on?: boolean;
  run: () => void;
};
type Row =
  | { kind: "head"; label: string; meta?: string }
  | { kind: "chips" }
  | { kind: "empty"; label: string }
  | { kind: "item"; item: Item };

const OPEN_MS = { panel: 260, sheet: 380 };
const CLOSE_MS = { panel: 140, sheet: 240 };
const has = (hay: string, q: string) => hay.toLowerCase().includes(q);
const isPhone = () => typeof window !== "undefined" && window.matchMedia?.("(max-width: 640px)").matches;

type Props = { reader?: { on: boolean; set: (v: boolean) => void } };

export default function QuickActions({ reader }: Props) {
  const navigate = useNavigate();
  const { resolvedTheme, toggleTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const timer = useRef(0);

  const open = useCallback(() => {
    clearTimeout(timer.current);
    returnTo.current = document.activeElement as HTMLElement | null;
    setQuery(""); setSel(0); setCopied(false); setToast("");
    setMounted(true);
    // Mount hidden, then flip to "in" on the next frames so the transition runs.
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  }, []);

  const close = useCallback(() => {
    clearTimeout(timer.current);
    setShown(false);
    const ms = reduceMotion() ? 120 : isPhone() ? CLOSE_MS.sheet : CLOSE_MS.panel;
    timer.current = window.setTimeout(() => {
      setMounted(false);
      returnTo.current?.focus?.({ preventScroll: true });
    }, ms + 20);
  }, []);

  // ⌘K / Ctrl K anywhere toggles it; the dock's key fires OPEN_EVENT.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (mounted && shown) close(); else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, open);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener(OPEN_EVENT, open); };
  }, [mounted, shown, open, close]);

  // While open: the page behind doesn't scroll, and focus starts in the input.
  useEffect(() => {
    if (!mounted) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    input.current?.focus({ preventScroll: true });
    return () => { document.documentElement.style.overflow = prev; };
  }, [mounted]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const ext = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
  const go = (p: SkillProject) => {
    if (p.external) { ext(p.href); setToast(`${p.title} opened in a new tab`); return; }
    close();
    navigate(p.href);
  };

  const commands: Item[] = useMemo(() => [
    { id: "copy", group: "Get in touch", label: "Copy email", sub: copied ? "Copied to your clipboard" : EMAIL, ok: copied, hint: copied ? "✓" : "↵",
      icon: <Copy size={16} />, keys: "copy email mail contact address",
      run: () => {
        const done = () => { setCopied(true); setToast(`Copied ${EMAIL}`); };
        navigator.clipboard?.writeText(EMAIL).then(done).catch(() => setToast(`Couldn’t copy. The address is ${EMAIL}`));
      } },
    { id: "mail", group: "Get in touch", label: "Email Sumit", sub: "Opens your mail app", hint: "↗", icon: <Mail size={16} />, keys: "email write message mail contact",
      run: () => { window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Hi Sumit — ")}`; setToast("Opening your mail app…"); } },
    { id: "cal", group: "Get in touch", label: "Book a call", sub: "Pick a time in Google Calendar", hint: "↗", icon: <CalendarDays size={16} />, keys: "book call meet meeting schedule chat calendar",
      run: () => { ext(CALENDAR_URL); setToast("Booking page opened in a new tab"); } },
    { id: "li", group: "Get in touch", label: "Open LinkedIn", sub: LINKEDIN.replace(/^https?:\/\//, ""), hint: "↗", icon: <Linkedin size={16} />, keys: "linkedin profile social",
      run: () => { ext(LINKEDIN); setToast("LinkedIn opened in a new tab"); } },
    { id: "cv", group: "Résumé", label: "View résumé", sub: "PDF, opens in a new tab", hint: "↗", icon: <FileText size={16} />, keys: "view resume résumé cv pdf",
      run: () => { ext(RESUME_URL); setToast("Résumé opened in a new tab"); } },
    { id: "dl", group: "Résumé", label: "Download résumé", sub: RESUME_FILE, hint: "↓", icon: <Download size={16} />, keys: "download resume résumé cv pdf save",
      run: () => {
        const a = document.createElement("a");
        a.href = RESUME_URL; a.download = RESUME_FILE; document.body.appendChild(a); a.click(); a.remove();
        setToast(`Downloading ${RESUME_FILE}`);
      } },
    { id: "reader", group: "Preferences", label: "Reader mode", toggle: true, on: !!reader?.on, icon: <BookOpen size={16} />,
      sub: reader?.on ? "On · just the letter" : reader ? "Off · full homepage" : "Opens the homepage as a letter", keys: "reader mode letter read simple",
      run: () => {
        if (reader) { reader.set(!reader.on); setToast(reader.on ? "Reader mode off" : "Reader mode on"); return; }
        try { localStorage.setItem(READER_KEY, "1"); } catch { /* storage unavailable */ }
        close(); navigate("/");
      } },
    { id: "dark", group: "Preferences", label: "Dark mode", toggle: true, on: dark, sub: dark ? "On" : "Off", icon: <Moon size={16} />, keys: "dark mode theme light night",
      run: () => { toggleTheme(); setToast(dark ? "Dark mode off" : "Dark mode on"); } },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [copied, dark, reader?.on]);

  /* Flat rows (headers, chips, items) plus the runnable items in order, for the keyboard. */
  const { rows, items } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows: Row[] = [], items: Item[] = [];
    const cmds = commands.filter((c) => !q || has(`${c.label} ${c.keys}`, q));
    const push = (it: Item) => { items.push(it); rows.push({ kind: "item", item: it }); };
    for (const g of ["Get in touch", "Résumé"]) {
      const inG = cmds.filter((c) => c.group === g);
      if (inG.length) { rows.push({ kind: "head", label: g }); inG.forEach(push); }
    }
    if (!q) {
      rows.push({ kind: "head", label: "Find by skill", meta: "pick one or type" });
      rows.push({ kind: "chips" });
    } else {
      SKILLS.filter((k) => has(`${k.label} ${k.keys}`, q)).forEach((k) => {
        rows.push({ kind: "head", label: `Skill · ${k.label}`, meta: `${k.projects.length} ${k.projects.length > 1 ? "projects" : "project"}` });
        k.projects.forEach((p, j) => push({
          id: `p-${k.label}-${j}`.replace(/\s+/g, "-"), group: "skill", label: p.title, sub: p.sub, keys: "",
          hint: p.external ? "↗" : "Open", icon: <ArrowUpRight size={16} />, run: () => go(p),
        }));
      });
    }
    const prefs = cmds.filter((c) => c.group === "Preferences");
    if (prefs.length) { rows.push({ kind: "head", label: "Preferences" }); prefs.forEach(push); }
    if (!items.length) rows.push({ kind: "empty", label: `Nothing for “${query}”. Try a skill like research or accessibility, or email Sumit.` });
    return { rows, items };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, commands]);

  const active = Math.min(sel, Math.max(0, items.length - 1));
  const activeId = items[active] ? `qa-${items[active].id}` : undefined;

  // Keep the highlighted row in view while moving with the keyboard.
  useLayoutEffect(() => {
    if (!activeId) return;
    document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  const onKey = (e: React.KeyboardEvent) => {
    const n = items.length;
    if (e.key === "ArrowDown") { e.preventDefault(); setSel(n ? (active + 1) % n : 0); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel(n ? (active - 1 + n) % n : 0); }
    else if (e.key === "Enter") { e.preventDefault(); items[active]?.run(); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
  };
  // Keep Tab inside the dialog.
  const trap = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panel.current) return;
    const f = panel.current.querySelectorAll<HTMLElement>("input, button:not([tabindex='-1'])");
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  if (!mounted) return null;
  return (
    <div className={`v2-qa${shown ? " in" : ""}`}>
      <div className="v2-qa-scrim" onClick={close} aria-hidden="true" />
      <div className="v2-qa-panel" role="dialog" aria-modal="true" aria-label="Quick actions" ref={panel} onKeyDown={trap}>
        <div className="v2-qa-grab" aria-hidden="true" />
        <div className="v2-qa-q">
          <Search size={18} aria-hidden="true" />
          <input
            ref={input} type="text" value={query} placeholder="Type a command or a skill…"
            onChange={(e) => { setQuery(e.target.value); setSel(0); setCopied(false); setToast(""); }} onKeyDown={onKey}
            aria-label="Search quick actions" role="combobox" aria-expanded="true" aria-controls="v2-qa-list" aria-activedescendant={activeId}
            autoComplete="off" spellCheck={false}
          />
          <button type="button" className="v2-qa-kbd" onClick={close} aria-label="Close quick actions">esc</button>
        </div>
        <div className="v2-qa-list" id="v2-qa-list" role="listbox" aria-label="Actions" ref={list}>
          {rows.map((r, i) => {
            if (r.kind === "head") return <div key={`h${i}`} className="v2-qa-head" role="presentation"><span>{r.label}</span>{r.meta && <span>{r.meta}</span>}</div>;
            if (r.kind === "empty") return <div key="empty" className="v2-qa-empty">{r.label}</div>;
            if (r.kind === "chips") return (
              <div key="chips" className="v2-qa-chips" role="presentation">
                {SKILLS.map((k) => (
                  <button key={k.label} type="button" className="v2-qa-chip"
                    onClick={() => { setQuery(k.label.toLowerCase()); setSel(0); input.current?.focus(); }}>{k.label}</button>
                ))}
              </div>
            );
            const it = r.item, k = items.indexOf(it), on = k === active;
            return (
              <button key={it.id} id={`qa-${it.id}`} type="button" role="option" aria-selected={on} tabIndex={-1}
                className={`v2-qa-row${on ? " sel" : ""}`} onClick={() => { setSel(k); it.run(); }} onMouseMove={() => { if (!on) setSel(k); }}>
                <span className="v2-qa-ic" aria-hidden="true">{it.icon}</span>
                <span className="v2-qa-lbl"><b>{it.label}</b><span className={it.ok ? "ok" : undefined}>{it.sub}</span></span>
                {it.toggle
                  ? <span className={`v2-qa-sw${it.on ? " on" : ""}`} aria-hidden="true" />
                  : <span className="v2-qa-hint" aria-hidden="true">{it.hint}</span>}
              </button>
            );
          })}
        </div>
        <div className="v2-qa-foot">
          <span className="keys">↑↓ move · ↵ run · esc close</span>
          <span className="toast" role="status" aria-live="polite">{toast}</span>
        </div>
      </div>
    </div>
  );
}
