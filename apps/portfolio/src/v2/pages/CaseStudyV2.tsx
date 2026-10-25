import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Shell from "../components/Shell";
import { SIGNATURES } from "../components/signatures";
import { CASE_BY_SLUG, type CaseStudy } from "../data/cases";
import { asset, EMAIL } from "../lib";
import "../case.css";

const IDS = ["cs-problem", "cs-built", "cs-trade", "cs-result"];
const DEPTHS = [
  { label: "30 sec", note: "Headlines and the key line from each part." },
  { label: "2 min", note: "Adds the detail behind each part." },
  { label: "5 min", note: "Everything, with images and notes." },
];
const DEPTH_KEY = "v2-case-depth";

/** Case-study content is trusted HTML authored for this site; %ASSET% points at public/v2. */
const html = (s: string) => ({ __html: s.split("%ASSET%").join(asset("")) });

function useDepth(): [number, (d: number) => void] {
  const [d, setD] = useState(() => {
    try { const v = Number(localStorage.getItem(DEPTH_KEY)); return v >= 0 && v <= 2 && localStorage.getItem(DEPTH_KEY) !== null ? v : 1; } catch { return 1; }
  });
  const set = (v: number) => { setD(v); try { localStorage.setItem(DEPTH_KEY, String(v)); } catch { /* storage unavailable */ } };
  return [d, set];
}

function Header({ c }: { c: CaseStudy }) {
  return (
    <header className="wrap" style={{ paddingTop: 40, paddingBottom: 40, display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/#work">← All work</Link><span aria-hidden="true">/</span><span>{c.chapter}</span><span aria-hidden="true">/</span>
          <span style={{ color: "var(--ink)" }}>{c.code}</span>
        </nav>
        {import.meta.env.DEV && <span className="legend">{c.note}</span>}
      </div>
      <h1 className="h1">{c.title}</h1>
      <p className="dek" dangerouslySetInnerHTML={html(c.dek)} />
      <dl className="meta">
        {c.meta.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd dangerouslySetInnerHTML={html(v)} /></div>
        ))}
      </dl>
      {(c.skills.length > 0 || c.links.length > 0) && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
          {c.skills.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="mono">Tools &amp; skills</span>
              <ul className="skills" aria-label="Tools and skills">{c.skills.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          )}
          {c.links.length > 0 && (
            <span style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {c.links.map((l) => <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>)}
            </span>
          )}
        </div>
      )}
    </header>
  );
}

function Glance({ c }: { c: CaseStudy }) {
  const [p, b, t, stat, statSub] = c.glance;
  const cells = [
    { id: IDS[0], q: "Problem", a: <span className="a" dangerouslySetInnerHTML={html(p)} /> },
    { id: IDS[1], q: c.label2, a: <span className="a" dangerouslySetInnerHTML={html(b)} /> },
    { id: IDS[2], q: "Key trade-off", a: <span className="a" dangerouslySetInnerHTML={html(t)} /> },
    {
      id: IDS[3], q: "Result",
      a: (
        <span className="a">
          <span className="stat" style={{ fontSize: 40, display: "block" }} dangerouslySetInnerHTML={html(stat)} />
          <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }} dangerouslySetInnerHTML={html(statSub)} />
        </span>
      ),
    },
  ];
  return (
    <section className="wrap" aria-label="At a glance" style={{ paddingBottom: 64, display: "flex", flexDirection: "column", gap: 14 }}>
      <span className="mono">At a glance · 30-second read</span>
      <div className="glance">
        {cells.map((x, i) => (
          <a key={x.id} href={`#${x.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(x.id)?.scrollIntoView({ behavior: "smooth" }); }}>
            <span className="q"><span>{i + 1}</span>{x.q}</span>{x.a}<span className="more">Read more ↓</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function LongRead({ c }: { c: CaseStudy }) {
  const [depth, setDepth] = useDepth();
  const [active, setActive] = useState(0);
  const body = useRef<HTMLDivElement>(null);
  const toc = ["Problem", c.label2, "Trade-offs", "Result"];

  useEffect(() => {
    const el = body.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const secs = el.querySelectorAll<HTMLElement>("section[data-i]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.getAttribute("data-i"))); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [c.slug]);

  return (
    <div className="wrap c1">
      <aside className="side" aria-label="Reading controls">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="mono">Reading depth</span>
          <div className="v2-seg" role="group" aria-label="Reading depth">
            {DEPTHS.map((d, i) => (
              <button key={d.label} type="button" aria-pressed={i === depth} onClick={() => setDepth(i)}>{d.label}</button>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)" }} aria-live="polite">{DEPTHS[depth].note}</span>
        </div>
        <nav className="toc" aria-label="On this page">
          <span className="mono tochead" style={{ padding: "10px 0 4px" }}>On this page</span>
          {toc.map((label, i) => (
            <a key={IDS[i]} href={`#${IDS[i]}`} aria-current={i === active ? "true" : undefined}
              onClick={(e) => { e.preventDefault(); document.getElementById(IDS[i])?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className="mono" style={{ width: 14 }}>{i + 1}</span>{label}
            </a>
          ))}
          <div className="bar" aria-hidden="true"><i style={{ width: `${Math.round(((active + 1) / toc.length) * 100)}%` }} /></div>
        </nav>
      </aside>
      <div className="body" ref={body}>
        {c.secs.map((s, i) => (
          <section key={IDS[i]} id={IDS[i]} data-i={i} aria-labelledby={`${IDS[i]}-h`}>
            <span className="mono">{s.kicker}</span>
            <h2 className="sec-h" id={`${IDS[i]}-h`}>{s.title}</h2>
            <div className="lvl" dangerouslySetInnerHTML={html(s.lead)} />
            {depth >= 1 && <div className="lvl reveal" dangerouslySetInnerHTML={html(s.read)} />}
            {depth >= 2 && <div className="lvl reveal" dangerouslySetInnerHTML={html(s.full)} />}
          </section>
        ))}
        {depth < 2 && (
          <button type="button" className="btn" style={{ marginBottom: 64 }} onClick={() => setDepth(2)}>Read the full story · 5 min</button>
        )}
      </div>
    </div>
  );
}

function Footer({ c }: { c: CaseStudy }) {
  return (
    <footer className="wrap" style={{ paddingTop: 24, paddingBottom: 72 }}>
      <div className="next">
        <Link to={`/projects/${c.next.slug}`}>
          <span className="mono">Next case study →</span>
          <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>{c.next.title}</span>
          <span style={{ color: "var(--muted)" }}>{c.next.sub}</span>
        </Link>
        <div>
          <span className="mono">Hiring for a role like this?</span>
          <span style={{ fontSize: 18 }}>I’m open to product design and design-engineering roles in Helsinki or EU remote.</span>
          <span style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn solid" href={`mailto:${EMAIL}`}>Email me</a>
            <Link className="btn" to="/resume">Résumé ↗</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function CaseStudyV2({ slug }: { slug: string }) {
  const c = CASE_BY_SLUG[slug];
  const Sig = SIGNATURES[c.signature];
  const plain = c.dek.replace(/<[^>]+>/g, "").replace(/\[[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
  return (
    <Shell active="work">
      <Helmet>
        <title>{`${c.code} · ${c.title} — Sumit Nayyar`}</title>
        <meta name="description" content={plain} />
      </Helmet>
      <div className="v2-cs" key={slug}>
        <Header c={c} />
        <Glance c={c} />
        <Sig />
        <LongRead c={c} />
        <Footer c={c} />
      </div>
    </Shell>
  );
}

