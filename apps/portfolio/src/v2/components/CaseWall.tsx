import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import ChromeSeg from "./ChromeSeg";
import { asset, reduceMotion } from "../lib";
import type { CaseStudy } from "../data/cases";
import type { CaseWall as Wall, WallItem } from "../data/caseWalls";
import "../case-wall.css";

/* --------------------------------------------------------------------------
   Process-wall case page.
   - "30 sec read": one headline per step beside a sticky wall of every artefact at its real
     proportions; the wall's camera frames the step being read. Phones get a swipeable strip per step.
   - "Full read" (default): the long read, grouped under the same headlines, with a sticky contents list.
   -------------------------------------------------------------------------- */

const MODES = ["30 sec read", "Full read"];
const MODE_KEY = "v2-case-mode";
const html = (s: string) => ({ __html: s.split("%ASSET%").join(asset("")) });

/* ---------- wall layout: one column per step, rows of columns, sizes from each image's ratio ---------- */
const CW = 520, GAP = 90, VGAP = 46, TOP = 64, LAB = 30, RGAP = 140, IG = 12;
const TILE_H: Record<string, number> = { quote: 230, stat: 210, tradeoff: 330, grid: 250, race: 330 };
type Cam = { sc: number; tx: number; ty: number };
const MAX_ZOOM = 4;
type Placed = WallItem & { x: number; y: number; w: number; h: number };
type Rect = { x: number; y: number; w: number; h: number };

function placeColumn(items: WallItem[]): [Placed[], number] {
  const out: Placed[] = [];
  let y = TOP, i = 0;
  while (i < items.length) {
    const it = items[i];
    let grp = [it];
    if (it.row) {
      let j = i + 1;
      while (j < items.length && items[j].row === it.row) { grp.push(items[j]); j++; }
    } else if (it.t === "img" && (it.ar ?? 1) < 1.2 && items[i + 1]?.t === "img" && (items[i + 1].ar ?? 1) < 1.2 && !items[i + 1].row) {
      grp = [it, items[i + 1]];
    }
    if (grp.length > 1) {
      const h = (CW - IG * (grp.length - 1)) / grp.reduce((s, g) => s + (g.ar ?? 1), 0);
      const lab = grp.some((g) => g.lab) ? LAB : 0;
      let x = 0;
      grp.forEach((g) => { const w = h * (g.ar ?? 1); out.push({ ...g, x, y: y + lab, w, h }); x += w + IG; });
      y += lab + h + VGAP; i += grp.length; continue;
    }
    const h = it.t === "img" ? CW / (it.ar ?? 1) : TILE_H[it.t];
    const lab = it.lab ? LAB : 0;
    out.push({ ...it, x: 0, y: y + lab, w: CW, h });
    y += lab + h + VGAP + (it.hand ? 56 : 0); i++;
  }
  return [out, y - VGAP];
}

function layoutWall(w: Wall, aspect: number) {
  const n = w.beats.length;
  const cols = w.beats.map((_, b) => placeColumn(w.wall.filter((it) => it.b === b)));
  let best: { score: number; rows: number[][]; hs: number[]; W: number; H: number } | null = null;
  for (let k = 2; k <= n; k++) {
    const rows: number[][] = [];
    for (let r = 0; r < n; r += k) rows.push(Array.from({ length: Math.min(k, n - r) }, (_, j) => r + j));
    const W = k * CW + (k - 1) * GAP;
    const hs = rows.map((row) => Math.max(...row.map((b) => cols[b][1])));
    const H = hs.reduce((a, b) => a + b, 0) + RGAP * (rows.length - 1);
    const score = Math.abs(Math.log(W / H / aspect));
    if (!best || score < best.score) best = { score, rows, hs, W, H };
  }
  const { rows, hs, W, H } = best!;
  const items: Placed[] = [], heads: { b: number; x: number; y: number }[] = [], rects: Rect[] = [];
  let y0 = 0;
  rows.forEach((row, ri) => {
    row.forEach((b, ci) => {
      const x0 = ci * (CW + GAP);
      heads.push({ b, x: x0, y: y0 });
      cols[b][0].forEach((it) => items.push({ ...it, x: it.x + x0, y: it.y + y0 }));
      rects[b] = { x: x0 - 40, y: y0 - 30, w: CW + 80, h: cols[b][1] + 70 };
    });
    y0 += hs[ri] + RGAP;
  });
  return { items, heads, rects, W, H };
}

/* ---------- small pieces ---------- */
function CoverVideo({ cover }: { cover: Wall["cover"] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still] = useState(reduceMotion);
  useEffect(() => {
    const v = ref.current;
    if (!v || still || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [still]);
  return (
    <section className="wrap cw-cover" aria-label="Project cover">
      <div className="cvf" style={{ background: cover.tint }}>
        {still
          ? <img src={asset(cover.poster)} alt={cover.label} />
          : <video ref={ref} src={asset(cover.video)} poster={asset(cover.poster)} muted loop playsInline preload="metadata" aria-label={cover.label} />}
      </div>
    </section>
  );
}

function Race({ run, onRun, compact }: { run: boolean; onRun: () => void; compact?: boolean }) {
  if (compact) {
    return (
      <div className="wrace" data-run={run ? "1" : "0"}>
        <div><span className="k">Before</span><div className="ws"><img src={asset("cases/dashboard/old-dashboard.jpg")} alt="" style={{ objectPosition: "100% 100%" }} /><i className="slow" /></div><span className="tn sm">10 s</span></div>
        <div><span className="k">After</span><div className="ws"><img src={asset("work/optmyzr-dashboard.jpg")} alt="" /><i className="fast" /></div><span className="tn sm">&lt;1 s</span></div>
        <button type="button" className="btn solid" onClick={(e) => { e.stopPropagation(); onRun(); }}>▶ Run the race</button>
      </div>
    );
  }
  const skel = <><i className="w5" /><i className="w3" /><i className="w2" /><i className="w2" /><i className="w3" /></>;
  return (
    <>
      <div className="race" data-run={run ? "1" : "0"}>
        <div className="lane"><span className="mono">Before · Backbone.js + jQuery</span><div className="screen"><img src={asset("cases/dashboard/old-dashboard.jpg")} alt="The old Optmyzr dashboard" style={{ objectPosition: "100% 100%" }} /><div className="skel slow" aria-hidden="true">{skel}</div></div><div className="track"><i className="slow" /></div><span className="clock">10 s</span></div>
        <div className="lane"><span className="mono">After · React + Redux Toolkit</span><div className="screen"><img src={asset("work/optmyzr-dashboard.jpg")} alt="The rebuilt Optmyzr account dashboard" /><div className="skel fast" aria-hidden="true">{skel}</div></div><div className="track"><i className="fast" /></div><span className="clock">&lt;1 s</span></div>
      </div>
      <div><button type="button" className="btn solid" onClick={onRun}>▶ Run the race</button></div>
    </>
  );
}

function Tile({ it, run, onRun }: { it: WallItem; run: boolean; onRun: () => void }) {
  switch (it.t) {
    case "quote": return <><span className="k">{it.k}</span><p className="tq">{it.v}</p></>;
    case "stat": return <><span className="k">{it.k}</span><span className="tn">{it.n}</span><span className="tv">{it.v}</span></>;
    case "tradeoff": return (
      <><span className="k">Trade-off</span>
        <div className="cob"><span>Chose</span><span>{it.c}</span><span>Over</span><span>{it.o}</span><span>Because</span><span>{it.bc}</span></div></>
    );
    case "grid": return (
      <div className="g22"><span /><span className="k">Text</span><span className="k">Text + icons</span>
        <span className="k">Upfront</span><i>Good</i><i className="best">Best</i>
        <span className="k">Progressive</span><i>Slower</i><i>Slower</i></div>
    );
    case "race": return <Race run={run} onRun={onRun} compact />;
    default: return null;
  }
}

/** Phone strip: the step's own artefacts, swipeable. */
function Strip({ items, run, onRun }: { items: WallItem[]; run: boolean; onRun: () => void }) {
  if (!items.length) return null;
  return (
    <div className="strip" aria-label="Artefacts for this step">
      {items.map((it, k) => it.t === "img"
        ? <figure key={k} className="sti"><img src={asset(it.src!)} alt={it.lab || ""} loading="lazy" />{it.lab && <figcaption>{it.lab}</figcaption>}</figure>
        : <div key={k} className="stt"><Tile it={it} run={run} onRun={onRun} /></div>)}
    </div>
  );
}

/** Full-read body: trusted HTML, with the load race rendered live where <!--race--> sits. */
function FullBody({ s, run, onRun }: { s: string; run: boolean; onRun: () => void }) {
  const parts = s.split("<!--race-->");
  return (
    <div className="lvl">
      {parts.map((p, k) => (
        <span key={k} style={{ display: "contents" }}>
          {p && <div className="lvl" dangerouslySetInnerHTML={html(p)} />}
          {k < parts.length - 1 && <Race run={run} onRun={onRun} />}
        </span>
      ))}
    </div>
  );
}

/* ---------- the page ---------- */
export default function CaseWall({ c, w, footer }: { c: CaseStudy; w: Wall; footer: ReactNode }) {
  const [mode, setModeState] = useState(() => {
    try { const v = localStorage.getItem(MODE_KEY); return v === "0" ? 0 : 1; } catch { return 1; }
  });
  const full = mode === 1;
  const [active, setActive] = useState(-1);
  const [race, setRace] = useState(false);
  const [vp, setVp] = useState({ w: 640, h: 780 });
  const textRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const raceT = useRef<number>(0);
  const [manual, setManual] = useState<Cam | null>(null);
  const [dragging, setDragging] = useState(false);
  const camRef = useRef<Cam>({ sc: 1, tx: 0, ty: 0 });
  const zoomRef = useRef<(f: number, px?: number, py?: number) => void>(() => {});
  const drag = useRef<{ id: number; x: number; y: number; cam: Cam; moved: boolean } | null>(null);
  const pts = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ d: number; cam: Cam; cx: number; cy: number } | null>(null);
  const suppressClick = useRef(false);

  const L = useMemo(() => layoutWall(w, vp.w / Math.max(1, vp.h - 40)), [w, vp.w, vp.h]);
  const n = w.beats.length;

  const setMode = (m: number) => {
    const story = storyRef.current;
    const past = story ? story.getBoundingClientRect().top < 0 : false;
    setModeState(m); setActive(-1);
    try { localStorage.setItem(MODE_KEY, String(m)); } catch { /* storage unavailable */ }
    if (past) requestAnimationFrame(() => { const t = storyRef.current; if (t) window.scrollTo({ top: window.scrollY + t.getBoundingClientRect().top - 90 }); });
  };

  const runRace = useCallback(() => {
    setRace(false); clearTimeout(raceT.current);
    raceT.current = window.setTimeout(() => setRace(true), 60);
  }, []);
  useEffect(() => () => clearTimeout(raceT.current), []);

  // Which step is being read: the last section whose top has passed 45% of the viewport.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const root = full ? bodyRef.current : textRef.current;
      if (!root) return;
      const secs = root.querySelectorAll<HTMLElement>("[data-i]");
      const line = window.innerHeight * 0.45;
      let i = -1;
      secs.forEach((s) => { if (s.getBoundingClientRect().top <= line) i = Number(s.dataset.i); });
      setActive(i);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [full]);

  useEffect(() => {
    const el = wallRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { if (el.clientWidth) setVp({ w: el.clientWidth, h: el.clientHeight }); });
    ro.observe(el);
    return () => ro.disconnect();
  }, [full]);

  useEffect(() => { setManual(null); }, [active, full]);
  useEffect(() => {
    const el = wallRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const box = el.getBoundingClientRect();
      zoomRef.current(Math.exp(-e.deltaY * 0.0025), e.clientX - box.left, e.clientY - box.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [full]);

  const goTo = (i: number) => {
    const root = full ? bodyRef.current : textRef.current;
    const el = root?.querySelector<HTMLElement>(`[data-i="${i}"]`);
    if (!el) return;
    const off = full ? 150 : window.innerHeight * 0.2;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - off, behavior: reduceMotion() ? "auto" : "smooth" });
  };
  const showAll = () => {
    const s = storyRef.current;
    if (s) window.scrollTo({ top: window.scrollY + s.getBoundingClientRect().top - 90, behavior: reduceMotion() ? "auto" : "smooth" });
  };

  // Camera: fit the active step's column (or the whole wall) into the wall viewport,
  // unless the reader has panned or zoomed (manual), which holds until the step changes.
  const r: Rect = active < 0 ? { x: -60, y: -60, w: L.W + 120, h: L.H + 140 } : L.rects[active];
  const vh = vp.h - 40;
  const autoSc = Math.min(vp.w / r.w, vh / r.h);
  const auto: Cam = { sc: autoSc, tx: (vp.w - r.w * autoSc) / 2 - r.x * autoSc, ty: (vh - r.h * autoSc) / 2 - r.y * autoSc };
  const cam = manual ?? auto;
  camRef.current = cam;
  const minSc = Math.min(vp.w / (L.W + 120), vh / (L.H + 140)) * 0.8;
  const { sc, tx, ty } = cam;
  const zoomAt = (factor: number, px = vp.w / 2, py = vh / 2) => {
    const c0 = camRef.current;
    const s1 = Math.max(minSc, Math.min(MAX_ZOOM, c0.sc * factor));
    const k = s1 / c0.sc;
    setManual({ sc: s1, tx: px - (px - c0.tx) * k, ty: py - (py - c0.ty) * k });
  };
  zoomRef.current = zoomAt;
  const panBy = (dx: number, dy: number) => { const c0 = camRef.current; setManual({ ...c0, tx: c0.tx + dx, ty: c0.ty + dy }); };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    const box = e.currentTarget.getBoundingClientRect();
    pts.current.set(e.pointerId, { x: e.clientX - box.left, y: e.clientY - box.top });
    if (pts.current.size === 2) {
      const [a, b] = [...pts.current.values()];
      pinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, cam: camRef.current, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
      drag.current = null;
    } else if (pts.current.size === 1) {
      drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, cam: camRef.current, moved: false };
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pts.current.has(e.pointerId)) return;
    const box = e.currentTarget.getBoundingClientRect();
    pts.current.set(e.pointerId, { x: e.clientX - box.left, y: e.clientY - box.top });
    const p = pinch.current;
    if (p && pts.current.size >= 2) {
      const [a, b] = [...pts.current.values()];
      const s1 = Math.max(minSc, Math.min(MAX_ZOOM, p.cam.sc * (Math.hypot(a.x - b.x, a.y - b.y) / p.d)));
      const wx = (p.cx - p.cam.tx) / p.cam.sc, wy = (p.cy - p.cam.ty) / p.cam.sc;
      const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
      setDragging(true);
      setManual({ sc: s1, tx: cx - wx * s1, ty: cy - wy * s1 });
      return;
    }
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 4) return;
    if (!d.moved) { d.moved = true; setDragging(true); e.currentTarget.setPointerCapture(e.pointerId); }
    setManual({ ...d.cam, tx: d.cam.tx + dx, ty: d.cam.ty + dy });
  };
  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    pts.current.delete(e.pointerId);
    if (pts.current.size < 2) pinch.current = null;
    if (drag.current?.moved) { suppressClick.current = true; window.setTimeout(() => { suppressClick.current = false; }, 0); }
    if (drag.current?.id === e.pointerId || pts.current.size === 0) drag.current = null;
    if (pts.current.size === 0) setDragging(false);
  };
  const onWallKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 80;
    const k = e.key;
    if (k === "+" || k === "=") zoomAt(1.25);
    else if (k === "-" || k === "_") zoomAt(0.8);
    else if (k === "ArrowLeft") panBy(step, 0);
    else if (k === "ArrowRight") panBy(-step, 0);
    else if (k === "ArrowUp") panBy(0, step);
    else if (k === "ArrowDown") panBy(0, -step);
    else if (k === "0" || k === "Escape") setManual(null);
    else return;
    e.preventDefault();
  };
  const dim = (b: number) => (active >= 0 && b !== active ? "true" : "false");
  const crumb = c.chapter.replace(/^Chapter \d+ · /, "");
  const title = w.title.replace("10 s", "10 s").replace(" 1 s", " 1 s");

  return (
    <div className="v2-cs cw" data-full={full ? "true" : "false"}>
      <header className="wrap" style={{ paddingTop: 40, paddingBottom: 40, display: "flex", flexDirection: "column", gap: 22 }}>
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/#work">← All work</Link><span aria-hidden="true">/</span><span style={{ color: "var(--ink)" }}>{crumb}</span>
        </nav>
        <h1 className="h1">{title}</h1>
        <p className="dek" dangerouslySetInnerHTML={html(w.dek)} />
        <dl className="meta m3">
          {w.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        {c.skills.length > 0 && (
          <div className="hd-tools">
            <span className="mono">Tools &amp; skills</span>
            <span className="v2-qtags" aria-label="Tools and skills">{c.skills.map((s) => <span key={s}>{s}</span>)}</span>
          </div>
        )}
      </header>

      <CoverVideo cover={w.cover} />

      <div className="wrap mode-row">
        <ChromeSeg label="Reading mode" options={MODES} value={mode} onChange={setMode} />
      </div>

      <div ref={storyRef}>
        {!full && (
          <div className="wrap">
            <div className="story">
              <div className="st-text" ref={textRef} data-a={active}>
                {w.beats.map((b, i) => (
                  <section key={i} className="tb" data-i={i} data-on={active < 0 || active === i ? "true" : "false"} aria-labelledby={`tb-${i}`}>
                    <span className="mono">{b.label}</span>
                    <h2 className="sec-h" id={`tb-${i}`}>{b.headline}</h2>
                    <Strip items={w.wall.filter((it) => it.b === i)} run={race} onRun={runRace} />
                    <p>{b.sub}</p>
                  </section>
                ))}
              </div>
              <div className="wallv" ref={wallRef} data-a={active} data-drag={dragging ? "true" : "false"}
                tabIndex={0} role="group" aria-roledescription="process wall"
                aria-label="Process wall. Drag to pan, plus and minus to zoom, arrow keys to move, 0 to reset."
                onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onKeyDown={onWallKey}>
                <div className="world" style={{ width: L.W, height: L.H, transform: `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${sc.toFixed(4)})` }}>
                  {L.heads.map((h) => (
                    <span key={`h${h.b}`} className="wh" data-dim={dim(h.b)} style={{ left: h.x, top: h.y }} aria-hidden="true">{w.beats[h.b].toc}</span>
                  ))}
                  {L.items.map((it, k) => (
                    <div key={k} className={it.t === "img" ? "wi" : "wi wt"} data-dim={dim(it.b)}
                      style={{ left: it.x, top: it.y, width: it.w, height: it.h }}
                      role="button" tabIndex={-1} aria-label={`${it.lab || w.beats[it.b].toc}: go to this step`} onClick={() => { if (!suppressClick.current && !manual) goTo(it.b); }}>
                      {it.lab && <span className="wl">{it.lab}</span>}
                      {it.t === "img" ? (
                        <>
                          <img src={asset(it.src!)} alt="" loading="lazy" />
                          {it.pins?.map(([px, py, pl]) => <span key={pl} className="pin" style={{ left: `${px * 100}%`, top: `${py * 100}%` }}>{pl}</span>)}
                          {it.hand && <span className="hand">{it.hand}</span>}
                        </>
                      ) : (
                        it.t === "grid" || it.t === "race" ? <Tile it={it} run={race} onRun={runRace} /> : <div className="tile"><Tile it={it} run={race} onRun={runRace} /></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="wctl" aria-label="Zoom">
                  <button type="button" className="btn" aria-label="Zoom in" onClick={() => zoomAt(1.25)}>+</button>
                  <button type="button" className="btn" aria-label="Zoom out" onClick={() => zoomAt(0.8)}>−</button>
                </div>
                <div className="wcap">
                  <span className="mono" aria-live="polite"><b>{active < 0 ? `The whole process · ${n} steps` : `${active + 1} / ${n} · ${w.beats[active].label}`}</b>{manual && <> · {Math.round(sc / autoSc * 100)}%</>}</span>
                  {manual
                    ? <button type="button" className="btn" onClick={() => setManual(null)}>Reset view</button>
                    : active < 0
                      ? <span className="mono">Drag to explore · Ctrl/⌘ + scroll to zoom</span>
                      : <button type="button" className="btn" onClick={showAll}>Whole wall</button>}
                </div>
              </div>
            </div>
          </div>
        )}

        {full && (
          <div className="wrap c1">
            <aside className="side" aria-label="Contents">
              <nav className="toc" aria-label="On this page">
                <span className="mono tochead" style={{ padding: "10px 0 4px" }}>On this page</span>
                {w.beats.map((b, i) => (
                  <a key={i} href={`#cw-${i}`} aria-current={Math.max(0, active) === i ? "true" : undefined}
                    onClick={(e) => { e.preventDefault(); goTo(i); }}>{b.label}</a>
                ))}
                <div className="bar" aria-hidden="true"><i style={{ width: `${Math.round(((Math.max(0, active) + 1) / n) * 100)}%` }} /></div>
              </nav>
            </aside>
            <div className="body" ref={bodyRef}>
              {w.beats.map((b, i) => (
                <section key={i} id={`cw-${i}`} data-i={i} aria-labelledby={`cw-${i}-h`}>
                  <h2 className="sec-h" id={`cw-${i}-h`}>{b.headline}</h2>
                  <FullBody s={b.full} run={race} onRun={runRace} />
                </section>
              ))}
            </div>
          </div>
        )}
      </div>

      {w.links.length > 0 && (
        <section className="wrap seework" aria-label="See the work">
          <div className="sw">
            <span className="mono">See the work</span>
            <span className="sw-b">{w.links.map((l) => <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>)}</span>
          </div>
        </section>
      )}
      {footer}
    </div>
  );
}
