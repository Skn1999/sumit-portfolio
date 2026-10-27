import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Shell from "../components/Shell";
import HeroMoi from "../components/HeroMoi";
// Lab is off the homepage for now (it may get its own page).
// import BentGallery from "../components/BentGallery";
import ScannerField from "../components/ScannerField";
import { APPROACH, CHAPTERS, DWELL, DWELL_NEXT, HERO_INTRO, TOC, WORK_LIST, WORK_ORDER, type Tile } from "../data/home";
import { asset, EMAIL, useReaderMode } from "../lib";

const TITLE = "Sumit Nayyar — Product designer who writes the code";
const DESC = HERO_INTRO;
const DraftNote = ({ children }: { children: string }) => (import.meta.env.DEV ? <span className="v2-draftnote">{children}</span> : null);
const scrollTo = (id: string) => (e: React.MouseEvent) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
};

/* ---------------------------------------------------------------- index mode */

function Hero() {
  return (
    <header className="v2-wrap">
      <div className="v2-hero">
        <div className="v2-hero-text">
          <h1 className="v2-name">Sumit Nayyar</h1>
          <p className="v2-intro">{HERO_INTRO}</p>
          <ol className="v2-toc" aria-label="Chapters">
            {TOC.map((t) => (
              <li key={t.href}>
                <a href={t.href} onClick={scrollTo(t.href.slice(1))}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>{t.pulse && <span className="v2-pulse" aria-hidden="true" />}{t.label}</span>
                  <span style={{ color: "var(--muted)" }}>{t.meta}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <figure className="v2-hero-fig"><HeroMoi /></figure>
      </div>
    </header>
  );
}

function FieldNote() {
  return (
    <section id="scanner" className="v2-wrap" aria-label="Who is a scanner">
      <div className="v2-section">
        <div className="v2-label-col">
          <span className="v2-mono">Field note 01</span>
          <h2 className="v2-mono" style={{ color: "var(--ink)", fontWeight: 400 }}>On being a scanner</h2>
        </div>
        <div className="v2-main-col v2-fieldnote" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <p className="big">
            Barbara Sher has a name for people like me:{" "}
            <a className="v2-scanner-link" href="https://penguinrandomhouse.com/books/593218/refuse-to-choose-by-barbara-sher/9781594866265" target="_blank" rel="noopener noreferrer" title="Read more: Refuse to Choose! by Barbara Sher">scanners</a>.
            We’re wired to be curious about many things instead of one. For years that looked like a CV with too many tabs. Now I think it’s the job — I connect what a single specialist would miss.
          </p>
          <ScannerField />
        </div>
      </div>
    </section>
  );
}

function TileMeta({ title, sub, aside }: { title: string; sub: string; aside?: ReactNode }) {
  return (
    <div className="v2-tile-meta-row">
      <div className="v2-tile-meta">
        <h3>{title}</h3><span className="v2-tile-sub">{sub}</span>
      </div>
      {aside}
    </div>
  );
}

/** A work tile. `aside` sits next to the title; `children` go under it (dwell-time lines). */
function TileView({ t, aside, children }: { t: Tile; aside?: ReactNode; children?: ReactNode }) {
  if (t.kind === "img") {
    return (
      <article className="v2-tile">
        <Link className={`v2-tile-media${t.crop ? " crop" : ""}`} to={t.href} aria-label={`${t.title} case study`}><img src={t.img} alt={t.alt} loading="lazy" /></Link>
        <TileMeta title={t.title} sub={t.sub} aside={aside} />
        {children}
      </article>
    );
  }
  if (t.kind === "stat") {
    return (
      <article className="v2-tile">
        <div className="v2-tile-card paper">
          <span className="v2-mono">{t.label}</span>
          <span style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1 }}>
            {t.stat}<span style={{ display: "block", fontSize: 15, fontWeight: 400, letterSpacing: 0, color: "var(--muted)", marginTop: 8 }}>{t.statSub}</span>
          </span>
        </div>
        <TileMeta title={t.title} sub={t.sub} aside={aside} />
        {children}
      </article>
    );
  }
  return (
    <article className="v2-tile">
      <Link className={`v2-tile-card ${t.tone}`} to={t.href}>
        <span className="v2-mono" style={t.tone === "dark" ? { color: "#8B949E" } : undefined}>{t.label}</span>
        <span className="t">{t.text}</span>
      </Link>
      <TileMeta title={t.title} sub={t.sub} aside={aside} />
      {children}
    </article>
  );
}

const ALL_TILES = CHAPTERS.flatMap((ch) => ch.tiles);
const WORK_TILES = WORK_ORDER.map((code) => ALL_TILES.find((t) => t.code === code)).filter((t): t is Tile => !!t);
const DWELL_T1 = 1; // seconds of attention before a tile opens one line
const DWELL_T2 = 3; // …and before it adds the result and a way in

/**
 * Selected work, with dwell time: whatever you linger on gets a little more room. Attention is hover or
 * keyboard focus where there's a pointer, and "crossing the middle of the screen" on touch devices.
 * The two tiles opened most recently stay open (the one you're on always opens at 1 s), so the grid
 * never fills up.
 */
function SelectedWork() {
  const [dw, setDw] = useState<number[]>(() => WORK_TILES.map(() => 0));
  const [cur, setCur] = useState(-1);
  const [recent, setRecent] = useState<number[]>([]); // opened tiles, most recent first
  const grid = useRef<HTMLDivElement>(null);

  // Count tenths of a second while a tile has attention.
  useEffect(() => {
    if (cur < 0) return;
    const t = window.setInterval(() => setDw((d) => d.map((v, i) => (i === cur ? Math.round((v + 0.1) * 10) / 10 : v))), 100);
    return () => clearInterval(t);
  }, [cur]);

  // A tile that crosses the first threshold moves to the front of the open list.
  useEffect(() => {
    if (cur < 0 || dw[cur] < DWELL_T1 || recent[0] === cur) return;
    setRecent((r) => [cur, ...r.filter((x) => x !== cur)].slice(0, 2));
  }, [cur, dw, recent]);

  // Touch: the tile crossing the middle band of the screen has attention.
  useEffect(() => {
    const el = grid.current;
    if (!el || !("IntersectionObserver" in window) || !window.matchMedia?.("(hover: none)").matches) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const i = Number((e.target as HTMLElement).dataset.i);
        if (e.isIntersecting) setCur(i);
        else setCur((c) => (c === i ? -1 : c));
      });
    }, { rootMargin: "-40% 0px -40% 0px" });
    el.querySelectorAll("[data-i]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const ranked = dw.map((d, i) => [d, i] as const).sort((a, b) => b[0] - a[0]);
  const open = recent;
  const top = ranked[0][0] >= DWELL_T2 ? WORK_TILES[ranked[0][1]] : null;
  const next = top ? ALL_TILES.find((t) => t.code === DWELL_NEXT[top.code]) : null;
  const leave = (i: number) => setCur((c) => (c === i ? -1 : c));

  return (
    <section id="work" className="v2-wrap" aria-label="Selected work">
      <div className="v2-section">
        <div className="v2-label-col">
          <span className="v2-mono">Work · 2020–Present</span>
          <h2 className="v2-h2">Selected work</h2>
          <p style={{ fontSize: 15, lineHeight: 1.6 }}>Projects across engineering, research and strategy. Linger on one and it tells you a little more.</p>
        </div>
        <div className="v2-main-col" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div className="v2-tiles v2-dwell" ref={grid} data-any={open.length > 0}>
            {WORK_TILES.map((t, i) => {
              const d = dw[i];
              const lvl = open.includes(i) ? (d >= DWELL_T2 ? 2 : 1) : 0;
              const lines = DWELL[t.code];
              const href = t.kind === "stat" ? null : t.href;
              const ring = { "--p": Math.min(100, Math.round((d / DWELL_T2) * 100)), opacity: cur === i && d > 0.2 && d < DWELL_T2 ? 1 : 0 } as React.CSSProperties;
              return (
                <div
                  key={t.code} data-i={i} data-lvl={lvl} className="v2-dwt"
                  onMouseEnter={() => setCur(i)} onMouseLeave={() => leave(i)}
                  onFocus={() => setCur(i)} onBlur={() => leave(i)}
                >
                  <TileView t={t} aside={<span className="v2-dwring" aria-hidden="true" style={ring} />}>
                    {lines && (
                      // Always rendered; the grid rows ease from 0fr to 1fr so the tile grows instead of jumping.
                      <div className="v2-dwx" data-open={lvl >= 1} aria-hidden={lvl < 1}>
                        <div>
                          <div className="v2-dwpad">
                            <p className="v2-dwmore">{lines[0]}</p>
                            <div className="v2-dwx" data-open={lvl >= 2} aria-hidden={lvl < 2}>
                              <div>
                                <p className="v2-dwmore v2-dwpad2">
                                  <span style={{ color: "var(--ink)", fontWeight: 500 }}>{lines[1]}</span>
                                  {href && <> <Link className="v2-dwlink" to={href} tabIndex={lvl >= 2 ? undefined : -1}>Read the case →</Link></>}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TileView>
                </div>
              );
            })}
          </div>
          <p className="v2-dwsug" aria-live="polite" data-on={!!(top && next)}>
            {top && next ? `You spent a while on ${top.title}. If that’s your kind of problem, ${next.title} is its closest relative.` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="v2-wrap" aria-label="How I work">
      <div className="v2-section">
        <div className="v2-label-col">
          <span className="v2-mono">Approach</span>
          <h2 className="v2-h2">How I work</h2>
          <DraftNote>Draft copy — edit to your voice</DraftNote>
        </div>
        <div className="v2-main-col">
          <ApproachList />
        </div>
      </div>
    </section>
  );
}

function ApproachList() {
  return (
    <ol className="v2-approach">
      {APPROACH.map((a, i) => (
        <li key={a.t} style={{ borderBottom: i < APPROACH.length - 1 ? "1px solid var(--rule)" : undefined }}>
          <span className="n">{String(i + 1).padStart(2, "0")}</span><span className="t">{a.t}</span><span className="d">{a.d}</span>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- reader mode */

function Letter() {
  return (
    <div className="v2-letter-col v2-fade-in">
      <section className="v2-lsec v2-letter" aria-label="About me">
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <img src={asset("avatar.jpg")} alt="Sumit Nayyar" width={56} height={56} style={{ borderRadius: "50%", objectFit: "cover" }} />
          <DraftNote>Letter-style homepage · draft copy — edit to your voice</DraftNote>
        </div>
        <div>
          <p>Hi, I’m Sumit.</p>
          <p>I’m a product designer who writes the code too. I help teams figure out what’s actually worth building, then take fuzzy concepts all the way to fast, accessible, beautifully crafted software.</p>
          <p>
            I did a double M.Sc. in Human–Computer Interaction and Cognitive Science at <a href="https://www.aalto.fi/en" target="_blank" rel="noopener noreferrer">Aalto University</a> and
            the <a href="https://www.unitn.it/en" target="_blank" rel="noopener noreferrer">University of Trento</a>, and co-built <Link to="/projects/groundwork">Groundwork</Link> <i>(currently not taking any projects)</i>, an accessibility venture that placed 2nd of 900+ teams at EIT Jumpstarter.
          </p>
          <p>The work I’m most proud of:</p>
          <ul className="v2-wl">
            {WORK_LIST.map((w) => (
              <li key={w.title}><Link to={w.href}>{w.title}</Link> <span className="r">{w.r}</span> <span className="y">({w.y})</span></li>
            ))}
          </ul>
          <p>Before grad school I spent four years at <Link to="/projects/optmyzr-dashboard-migration">Optmyzr</Link>, growing from front-end intern to Design Engineer. That’s where I learned what slow software costs people — and how to fix it in the code.</p>
          <p>I’ve lived in three countries and I’m now in Helsinki, Finland. I run, hike, fill sketchbooks with ink, and I’m learning Finnish and Italian, slowly.</p>
          <p>I care about teams where designers ship code and curiosity is a feature — in Helsinki or remote (anywhere in the world). The easiest way to reach me is email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </div>
      </section>
      <section className="v2-lsec" aria-label="Approach">
        <span className="lab">Approach</span>
        <ApproachList />
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------- page */

/** Dock highlight follows the reader down the page: Work over the chapters, Contact at the band. */
function useActiveSection(reader: boolean) {
  const [active, setActive] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (reader) { setActive(undefined); return; }
    const targets = [["work", document.getElementById("work")], ["contact", document.getElementById("contact")]] as const;
    if (!("IntersectionObserver" in window)) return;
    const vis = new Map<string, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => vis.set(e.target.id, e.isIntersecting));
      setActive(vis.get("contact") ? "contact" : vis.get("work") ? "work" : undefined);
    }, { rootMargin: "-45% 0px -45% 0px" });
    targets.forEach(([, el]) => el && io.observe(el));
    return () => io.disconnect();
  }, [reader]);
  return active;
}

export default function HomeV2() {
  const [reader, setReader] = useReaderMode();
  // The dock morphs as soon as the toggle is pressed; the page content swaps a beat later.
  const [view, setView] = useState(reader);
  useEffect(() => {
    if (view === reader) return;
    // Entering: the light letter swaps in early. Leaving: the full layout mounts only after the
    // dock has finished re-opening and its labels are back (~480 ms), so the work never lands mid-morph.
    const t = window.setTimeout(() => { setView(reader); window.scrollTo({ top: 0 }); }, reader ? 140 : 480);
    return () => clearTimeout(t);
  }, [reader, view]);
  const active = useActiveSection(view);
  const set = (v: boolean) => setReader(v);
  return (
    <Shell active={reader ? undefined : active} reader={{ on: reader, set }} footerLabel={view ? undefined : "Chapter 05"}>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
      </Helmet>
      {view ? (
        <Letter />
      ) : (
        // Fades in while the dock finishes morphing back.
        <div className="v2-fade-in">
          <Hero />
          <FieldNote />
          <SelectedWork />
          <Approach />
          {/* Lab is off the homepage for now (it may get its own page).
          <section id="ch4" aria-label="Chapter 04, lab" style={{ paddingBottom: 112 }}><BentGallery /></section> */}
        </div>
      )}
    </Shell>
  );
}
