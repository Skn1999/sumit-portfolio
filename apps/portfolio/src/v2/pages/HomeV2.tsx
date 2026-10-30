import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Shell from "../components/Shell";
import HeroMoi from "../components/HeroMoi";
// Lab is off the homepage for now (it may get its own page).
// import BentGallery from "../components/BentGallery";
import ScannerField from "../components/ScannerField";
import { APPROACH, COVERS, HERO_INTRO, MORE_WORK, TOC, WORK_LIST, type Cover } from "../data/home";
import { asset, EMAIL, reduceMotion, SITE_URL, SUBSTACK_URL, useReaderMode } from "../lib";

const TITLE = "Sumit Nayyar — Product Designer & Builder";
const DESC = HERO_INTRO;
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
      <span id="about" style={{ display: "block", scrollMarginTop: 100 }} aria-hidden="true" />
      <div className="v2-section">
        <div className="v2-label-col">
          <h2 className="v2-h2">On being a scanner</h2>
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

/** A cover loop: muted, plays only while on screen, poster only under reduced motion. */
function CoverVideo({ c }: { c: Cover }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (reduceMotion() || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <span className="v2-cv-frame" style={{ "--tint": c.tint } as React.CSSProperties}>
      <video ref={ref} src={c.video} poster={c.poster} muted loop playsInline preload="metadata" aria-hidden="true" />
      <span className="v2-cv-veil" />
    </span>
  );
}

const NOT_ALL = "not all of it.";

/**
 * "That’s it." strikes itself out, types "not all of it." and the rest of the work unfolds below.
 * Runs once, when the section scrolls into view. Reduced motion shows the end state.
 */
function NotAll() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); // 0 "That’s it." · 1 struck · 2 typing · 3 rows in
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion() || !("IntersectionObserver" in window)) { setStep(3); setN(NOT_ALL.length); return; }
    const timers: number[] = [];
    let iv = 0;
    const run = () => {
      timers.push(window.setTimeout(() => setStep(1), 700));
      timers.push(window.setTimeout(() => {
        setStep(2);
        let k = 0;
        iv = window.setInterval(() => {
          k += 1; setN(k);
          if (k >= NOT_ALL.length) { clearInterval(iv); timers.push(window.setTimeout(() => setStep(3), 250)); }
        }, 55);
      }, 1200));
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); clearInterval(iv); };
  }, []);
  return (
    <div className="v2-na" ref={ref}>
      <h3 className="v2-na-h" aria-label="That’s not all of it.">
        <span aria-hidden="true">
          That’s <span className="v2-na-st" data-on={step >= 1}>it.</span> <span>{NOT_ALL.slice(0, n)}</span>
          {step === 2 && <span className="v2-na-caret" />}
        </span>
      </h3>
      <p className="v2-na-sub" data-on={step >= 3}>I’ve done plenty of other things.</p>
      <div className="v2-na-rows">
        {MORE_WORK.map((m, i) => (
          <Link key={m.code} className="v2-na-row" to={m.href} data-on={step >= 3} style={{ transitionDelay: step >= 3 ? `${i * 120}ms` : "0ms" }}>
            <span className="v2-na-th"><img src={m.img} alt="" loading="lazy" /></span>
            <span><b>{m.title}</b> <span className="v2-na-out">— {m.out}</span></span>
            <span className="v2-qtags"><span>{m.cat}</span><span>{m.role}</span></span>
            <span className="v2-na-ctx">{m.ctx}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Selected work, right after the hero: a two-column masonry of animated covers (16:9, uncropped).
 * Caption row 1: what the project achieved + context. Row 2: quiet tags. Hover/focus unfolds the impact.
 */
function SelectedWork() {
  return (
    <section id="work" className="v2-wrap" aria-label="Selected work">
      <div className="v2-section">
        <div className="v2-label-col">
          <h2 className="v2-h2">Selected work</h2>
          <p style={{ fontSize: 15, lineHeight: 1.6 }}>Four projects, each shown as a short loop of the moment that mattered. Hover a cover for the outcome.</p>
        </div>
        <div className="v2-main-col" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div className="v2-cv-grid">
            {COVERS.map((col, ci) => (
              <div className="v2-cv-col" key={ci}>
                {col.map((c) => (
                  <Link key={c.code} className="v2-cv" to={c.href}>
                    <CoverVideo c={c} />
                    <span className="v2-cv-cap">
                      <span className="v2-cv-t1"><span className="v2-cv-title">{c.title}</span><span className="v2-cv-ctx">{c.ctx}</span></span>
                      <span className="v2-qtags"><span>{c.cat}</span><span>{c.role}</span></span>
                    </span>
                    <span className="v2-cv-hov">{c.impact}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <NotAll />
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
          <h2 className="v2-h2">How I work</h2>
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
          <p>I’ve lived in three countries and I’m now in Helsinki, Finland. I run, hike, fill sketchbooks with ink, write on my <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">Substack</a>, and I’m learning Finnish and Italian, slowly.</p>
          <p>I care about teams where designers ship code and curiosity is a feature. Looking for next career opportunity in Helsinki or remote (anywhere in the world). The easiest way to reach me is email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
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
    <Shell active={reader ? undefined : active} reader={{ on: reader, set }}>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Sumit Nayyar — Product Designer &amp; Builder" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
      </Helmet>
      {view ? (
        <Letter />
      ) : (
        // Fades in while the dock finishes morphing back.
        <div className="v2-fade-in">
          <Hero />
          <SelectedWork />
          <FieldNote />
          <Approach />
        </div>
      )}
    </Shell>
  );
}
