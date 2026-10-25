import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Shell from "../components/Shell";
import HeroMoi from "../components/HeroMoi";
import BentGallery from "../components/BentGallery";
import { APPROACH, CHAPTERS, DEEP_ON, HERO_INTRO, MX_COLS, MX_ROWS, TOC, WORK_LIST, type Tile } from "../data/home";
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
  const [open, setOpen] = useState(false);
  const totals = MX_COLS.map((_, j) => MX_ROWS.reduce((a, r) => a + r.v[j], 0));
  return (
    <section id="scanner" className="v2-wrap" aria-label="Who is a scanner">
      <div className="v2-section">
        <div className="v2-label-col">
          <span className="v2-mono">Field note 01</span>
          <h2 className="v2-mono" style={{ color: "var(--ink)", fontWeight: 400 }}>On being a scanner</h2>
        </div>
        <div className="v2-main-col v2-fieldnote" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <p className="big">
            Barbara Sher has a name for people like me: <span style={{ borderBottom: "2px solid var(--ink)" }}>scanners</span>. We’re wired to be curious about many things instead of one. For years that looked like a CV with too many tabs. Now I think it’s the job — I connect what a single specialist would miss.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="v2-mono">Things I’ve gone deep on</span>
            <ul className="v2-chips">{DEEP_ON.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <button type="button" className="v2-cta" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="scanner-matrix">
              <span aria-hidden="true">{open ? "−" : "+"}</span>{open ? "Hide the evidence" : "See how it shows up in my work"}
            </button>
            <a href="https://penguinrandomhouse.com/books/593218/refuse-to-choose-by-barbara-sher/9781594866265" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14 }}>
              Read more — <i>Refuse to Choose!</i> ↗
            </a>
          </div>
          {open && (
            <div id="scanner-matrix" className="v2-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <span className="v2-mono">Fig. 01 — One person, six interests, ten projects</span>
                <span className="v2-mono" style={{ display: "flex", gap: 16 }} aria-hidden="true">
                  <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span className="v2-y" />Used</span>
                  <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span className="v2-n" />Not used</span>
                </span>
              </div>
              <div className="v2-mx-wrap">
                <table className="v2-mx">
                  <thead>
                    <tr><th scope="col">Project</th>{MX_COLS.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {MX_ROWS.map((r) => (
                      <tr key={r.no}>
                        <th scope="row" style={{ fontWeight: 500 }}>{r.name} <span style={{ color: "var(--muted)", fontWeight: 400 }}>{r.sub}</span></th>
                        {r.v.map((v, j) => (
                          <td key={j}><span className={v ? "v2-y" : "v2-n"} aria-hidden="true" /><span className="v2-sr">{v ? "yes" : "no"}</span></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ fontFamily: "var(--f-mono)", fontSize: 12 }}>
                      <th scope="row" style={{ textAlign: "left", fontWeight: 400 }}>Total</th>{totals.map((t, j) => <td key={j}>{t}</td>)}
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted)", maxWidth: 640 }}>
                No column is empty, and no row uses everything — each project borrows a different mix. The chapters below are where those mixes came from.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TileMeta({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="v2-tile-meta">
      <h3>{title}</h3><span className="v2-tile-sub">{sub}</span>
    </div>
  );
}

function TileView({ t }: { t: Tile }) {
  if (t.kind === "img") {
    return (
      <article className="v2-tile">
        <Link className={`v2-tile-media${t.crop ? " crop" : ""}`} to={t.href} aria-label={`${t.title} case study`}><img src={t.img} alt={t.alt} loading="lazy" /></Link>
        <TileMeta title={t.title} sub={t.sub} />
        <ul className="v2-chips" style={{ fontSize: 12 }}>{t.chips.map((c) => <li key={c} style={{ padding: "4px 8px" }}>{c}</li>)}</ul>
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
        <TileMeta title={t.title} sub={t.sub} />
      </article>
    );
  }
  return (
    <article className="v2-tile">
      <Link className={`v2-tile-card ${t.tone}`} to={t.href}>
        <span className="v2-mono" style={t.tone === "dark" ? { color: "#8B949E" } : undefined}>{t.label}</span>
        <span className="t">{t.text}</span>
      </Link>
      <TileMeta title={t.title} sub={t.sub} />
    </article>
  );
}

function Chapters() {
  return (
    <div id="work">
      {CHAPTERS.map((ch) => (
        <section key={ch.id} id={ch.id} className="v2-wrap" aria-label={`${ch.label}, ${ch.title}`}>
          <div className="v2-section">
            <div className="v2-label-col">
              <span className="v2-mono">{ch.label}</span>
              <h2 className="v2-h2">{ch.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6 }}>{ch.lede}</p>
            </div>
            <div className="v2-main-col v2-tiles">{ch.tiles.map((t) => <TileView key={t.code} t={t} />)}</div>
          </div>
        </section>
      ))}
    </div>
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
            Right now I’m doing a double M.Sc. in Human–Computer Interaction and Cognitive Science at <a href="https://www.aalto.fi/en" target="_blank" rel="noopener noreferrer">Aalto University</a> and
            the <a href="https://www.unitn.it/en" target="_blank" rel="noopener noreferrer">University of Trento</a>, and co-building <Link to="/projects/groundwork">Groundwork</Link>, an accessibility venture that placed 2nd of 900+ teams at EIT Jumpstarter.
          </p>
          <p>The work I’m most proud of:</p>
          <ul className="v2-wl">
            {WORK_LIST.map((w) => (
              <li key={w.title}><Link to={w.href}>{w.title}</Link> <span className="r">{w.r}</span> <span className="y">({w.y})</span></li>
            ))}
          </ul>
          <p>Before grad school I spent four years at <Link to="/projects/optmyzr-dashboard-migration">Optmyzr</Link>, growing from intern to SDE-II. That’s where I learned what slow software costs people — and how to fix it in the code.</p>
          <p>I’ve lived in three countries and I’m now in Trento, Italy, which means mountains at the weekend. I run, hike, fill sketchbooks with ink, and I’m learning Finnish and Italian, slowly.</p>
          <p>I’m looking for a product team where designers ship code and curiosity is a feature — in Helsinki or EU remote. The easiest way to reach me is email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
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
          <Chapters />
          <Approach />
          <section id="ch4" aria-label="Chapter 04, lab" style={{ paddingBottom: 112 }}><BentGallery /></section>
        </div>
      )}
    </Shell>
  );
}
