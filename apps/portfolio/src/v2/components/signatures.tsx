import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { asset, reduceMotion, useIsDark } from "../lib";

/* The signature interaction for each case study — one per project, each built to make the result felt. */

function SigHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="sig-head">
      <h2 className="sec-h">{title}</h2>
      {children}
    </div>
  );
}

function Seg<T extends string>({ label, options, value, onChange }: { label: string; options: T[]; value: number; onChange: (i: number) => void }) {
  return (
    <div className="v2-seg" role="group" aria-label={label}>
      {options.map((o, i) => (
        <button key={o} type="button" aria-pressed={i === value} onClick={() => onChange(i)}>{o}</button>
      ))}
    </div>
  );
}

const Ph = ({ children }: { children: ReactNode }) => <span className="ph">[{children}]</span>;

/* ------------------------------------------------------------------ SN-01 */
const BEFORE_MS = 10000, AFTER_MS = 900;
const Skel = () => (
  <div className="skel" aria-hidden="true"><i className="w5" /><i className="w3" /><i className="w2" /><i className="w2" /><i className="w3" /></div>
);

/** Same dashboard, replayed at the measured load times. Starts at rest (both loaded) so the page reads complete. */
export function LoadRace() {
  const [t, setT] = useState(-1);
  const raf = useRef(0);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const replay = () => {
    cancelAnimationFrame(raf.current);
    if (reduceMotion()) { setT(-1); return; }
    const t0 = performance.now();
    let last = 0;
    const tick = () => {
      const e = performance.now() - t0;
      if (e - last > 50 || e >= BEFORE_MS) { last = e; setT(Math.min(e, BEFORE_MS)); }
      if (e < BEFORE_MS) raf.current = requestAnimationFrame(tick); else setT(-1);
    };
    raf.current = requestAnimationFrame(tick);
  };
  const done = t < 0, tt = done ? BEFORE_MS : t;
  const bDone = done || tt >= BEFORE_MS, aDone = done || tt >= AFTER_MS;
  const clock = (ms: number, cap: number) => (Math.min(ms, cap) / 1000).toFixed(1) + " s";
  return (
    <section className="wrap sig" aria-label="Load time, before and after">
      <SigHead title="Same dashboard. 10 seconds vs. under 1.">
        <button type="button" className="btn solid" onClick={replay}>{done ? "▶ Replay the load" : "Loading…"}</button>
      </SigHead>
      <div className="race">
        <div className="lane">
          <div className="screen">
            <img src={asset("cases/dashboard/old-dashboard.jpg")} alt="The old Optmyzr dashboard" style={{ opacity: bDone ? 1 : 0, objectPosition: "100% 100%" }} />
            {!bDone && <Skel />}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="mono">Before · old dashboard</span><span className="clock">{bDone ? "10.0 s" : clock(tt, BEFORE_MS)}</span>
          </div>
          <div className="track" aria-hidden="true"><i style={{ width: `${Math.round((Math.min(tt, BEFORE_MS) / BEFORE_MS) * 100)}%` }} /></div>
        </div>
        <div className="lane">
          <div className="screen">
            <img src={asset("work/optmyzr-dashboard.jpg")} alt="The rebuilt Optmyzr account dashboard" style={{ opacity: aDone ? 1 : 0 }} />
            {!aDone && <Skel />}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="mono" style={{ color: "var(--ok)" }}>After · my rebuild</span><span className="clock">{aDone ? "<1 s" : clock(tt, AFTER_MS)}</span>
          </div>
          <div className="track" aria-hidden="true"><i style={{ width: `${Math.round((Math.min(tt, AFTER_MS) / AFTER_MS) * 100)}%`, background: "var(--ok)" }} /></div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)" }} aria-live="polite">A replay at the measured load times (about 10 s before, under 1 s after).</p>
    </section>
  );
}

/* ------------------------------------------------------------------ SN-02 */
const GOALS = [
  { label: "Get more sales", maps: "→ ROAS" },
  { label: "Get more leads", maps: "→ Target CPA" },
  { label: "Grow the value of each conversion", maps: "→ Conversion value" },
];
const MATES = ["maria@agency.com", "tom@agency.com", "li@agency.com"];
const STEP_LABELS = ["Step 1 of 3", "Step 2 of 3", "Step 3 of 3", "Done"];
const PILLARS = [
  { t: "Plain-language goals", d: "Conversational choices instead of ad jargon, mapped behind the scenes to exact metrics like Target CPA and ROAS." },
  { t: "Budget constraints", d: "Users set financial limits and allocation thresholds up front." },
  { t: "Team & collaborators", d: "Invite teammates early, so accountability is shared from day one." },
];

/** A working mini version of the wizard. The bar at the bottom stands in for the backend setup running meanwhile. */
export function OnboardingWizard() {
  const [w, setW] = useState(0);
  const [goal, setGoal] = useState(-1);
  const [budget, setBudget] = useState(5000);
  const [nm, setNm] = useState(0);
  const [bg, setBg] = useState(0);
  const timer = useRef<number>(0);
  useEffect(() => () => clearInterval(timer.current), []);
  const startBg = () => {
    if (timer.current) return;
    if (reduceMotion()) { setBg(100); return; }
    timer.current = window.setInterval(() => {
      setBg((b) => {
        const n = Math.min(100, b + 2);
        if (n >= 100) { clearInterval(timer.current); }
        return n;
      });
    }, 300);
  };
  const go = (n: number) => { startBg(); setW(Math.max(0, Math.min(3, n))); };
  const restart = () => { clearInterval(timer.current); timer.current = 0; setW(0); setGoal(-1); setBudget(5000); setNm(0); setBg(0); };
  const money = (n: number) => "$" + n.toLocaleString("en-US");
  const bgLabel = bg >= 100 ? "Account setup complete · dashboard ready" : bg > 0 ? `Importing your campaigns in the background… ${bg}%` : "Your account setup starts in the background as soon as you begin";
  const doneNote = (goal >= 0 ? "Optimising for " + GOALS[goal].maps.replace("→ ", "") : "Goal not set") + " within " + money(budget) + " a month" +
    (nm ? `, shared with ${nm} ${nm > 1 ? "teammates" : "teammate"}` : "") + ". Your first recommendations are tailored from these answers.";
  return (
    <section className="wrap sig" aria-label="Try the onboarding wizard">
      <SigHead title="Setup that used to be dead time.">
        <button type="button" className="btn" onClick={restart}>↺ Start over</button>
      </SigHead>
      <div className="wz">
        <div className="wcard">
          <div className="wtop"><b>Welcome to Optmyzr</b><span className="mono">{STEP_LABELS[w]}</span></div>
          <div className="wbody">
            {w === 0 && (
              <div className="v2-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p className="wq">What’s your main advertising goal?</p>
                <div className="opts" role="group" aria-label="Advertising goal">
                  {GOALS.map((g, i) => (
                    <button key={g.label} type="button" className="opt" aria-pressed={i === goal} onClick={() => { startBg(); setGoal(i); }}>
                      <span>{g.label}</span><span className="maps">{i === goal ? g.maps : ""}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {w === 1 && (
              <div className="v2-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p className="wq">What’s your monthly ad budget?</p>
                <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>{money(budget)}</div>
                <input className="budget" type="range" min={500} max={50000} step={500} value={budget} onChange={(e) => { startBg(); setBudget(+e.target.value); }} aria-label="Monthly ad budget" />
                <span style={{ fontSize: 13, color: "var(--muted)" }}>Recommendations stay inside this limit.</span>
              </div>
            )}
            {w === 2 && (
              <div className="v2-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p className="wq">Who else works on these accounts?</p>
                <div className="mates">{nm ? MATES.slice(0, nm).map((m) => <span key={m}>{m}</span>) : "No one yet."}</div>
                <button type="button" className="btn" onClick={() => { startBg(); setNm(Math.min(MATES.length, nm + 1)); }} style={{ alignSelf: "flex-start" }} disabled={nm >= MATES.length}>+ Add a teammate</button>
              </div>
            )}
            {w === 3 && (
              <div className="v2-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p className="wq">You’re all set.</p>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--muted)" }}>{doneNote}</p>
              </div>
            )}
            <div className="wnav">
              <button type="button" className="btn" onClick={() => go(w - 1)} disabled={w === 0}>← Back</button>
              <button type="button" className="btn solid" onClick={() => go(w + 1)} disabled={(w === 0 && goal < 0) || w === 3}>{w === 2 ? "Finish" : "Continue"}</button>
            </div>
          </div>
          <div className="bgbar" aria-live="polite"><span className="mono">{bgLabel}</span><span className="t"><i style={{ width: `${bg}%` }} /></span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ol className="pillars" aria-label="What research said mattered">
            {PILLARS.map((p, i) => (
              <li key={p.t} className={w === i ? "on" : ""}><span className="mono">{i + 1}</span><b>{p.t}</b><span className="d">{p.d}</span></li>
            ))}
          </ol>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            A simplified recreation of the wizard. The bar at the bottom stands in for the backend setup that runs while people answer.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ SN-04 */
const STATES = [
  { name: "Ambient", desc: "“Aria buona.” A calm face says the air is fine, with CO₂, temperature, humidity and TVOC, and a six-level air-quality legend. Reporting a problem is always one tap away.", src: "cases/ediaqi/ambient.jpg", bg: "#EEFCF3", alt: "Ambient state: green smiling face, “Aria buona”, CO₂ 680 ppm, temperature 21 °C, humidity 46%, TVOC low, and an air-quality legend." },
  { name: "Alert", desc: "“Serve cambiare aria” — the air needs changing. CO₂ is at 1,250 ppm, probably too many people, with two recommended actions: open the windows for a few minutes, take a short break if possible.", src: "cases/ediaqi/alert.jpg", bg: "#FEF6DA", alt: "Alert state: orange worried face, “Serve cambiare aria”, CO₂ 1250 ppm, recommended actions and a button “Ho aperto le finestre”." },
  { name: "Action taken", desc: "“Stiamo monitorando il recupero.” After one tap, the display tracks the recovery as CO₂ falls, and promises to remind people to close the windows in 10 minutes.", src: "cases/ediaqi/action-taken.jpg", bg: "#E7F4FD", alt: "Action-taken state: blue face, “Stiamo monitorando il recupero”, CO₂ falling with a progress bar, and a reminder to close the windows in 10 minutes." },
  { name: "Reported to staff", desc: "“Segnalazione inviata.” If the air doesn’t improve, a report goes to facility staff with an ID and a status the occupant can see.", src: "cases/ediaqi/reported-to-staff.jpg", bg: "#F4F7FA", alt: "Report sent: green check, “Segnalazione inviata”, report ID AQ-203 with status received." },
  { name: "Daily summary", desc: "“Riepilogo di oggi.” A recap of the day: two alerts, when the last one was, recovery complete, no open reports, and a tip that ventilating early helped.", src: "cases/ediaqi/summary-screen.jpg", bg: "#F4F7FA", alt: "Daily summary: two air-quality alerts, last alert at 12:05, recovery complete, no open reports." },
];

/** The in-room tablet's five states, with the real prototype screens. Click a state or play the sequence. */
export function TabletSimulator() {
  const [st, setSt] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number>(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const play = () => {
    clearTimeout(timer.current);
    if (playing) { setPlaying(false); return; }
    if (reduceMotion()) { setSt(1); return; }
    setSt(0); setPlaying(true);
    const step = (i: number) => {
      timer.current = window.setTimeout(() => {
        if (i >= STATES.length) { setPlaying(false); return; }
        setSt(i); step(i + 1);
      }, 2400);
    };
    step(1);
  };
  const s = STATES[st];
  return (
    <section className="wrap sig" aria-label="The in-room display, five states">
      <SigHead title="From a reading to an action, in five states.">
        <button type="button" className="btn solid" onClick={play}>{playing ? "❚❚ Stop" : "▶ Simulate a CO₂ spike"}</button>
      </SigHead>
      <div className="sim">
        <div className="tab">
          <div className="scr" style={{ background: s.bg }}>
            {STATES.map((x, k) => (
              <img key={x.src} src={asset(x.src)} alt={k === st ? x.alt : ""} aria-hidden={k !== st} style={{ opacity: k === st ? 1 : 0 }} loading={k ? "lazy" : undefined} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ol className="states" aria-label="Display states">
            {STATES.map((x, k) => (
              <li key={x.name}>
                <button type="button" aria-pressed={k === st} onClick={() => { clearTimeout(timer.current); setPlaying(false); setSt(k); }}>
                  <span className="n">{k + 1}</span><span className="t">{x.name}</span><span className="d">{x.desc}</span>
                </button>
              </li>
            ))}
          </ol>
          <p aria-live="polite" className="sr">{`State ${st + 1} of 5: ${s.name}.`}</p>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>Screens from the tablet prototype (Italian UI). Click a state or play the sequence.</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ SN-05 */
const PEOPLE = [
  { label: "Grace", motive: "Motivated by mastery, progress, purpose and meaning." },
  { label: "Phil", motive: "Motivated by relationships and external rewards." },
];
const KINDS = ["System 1 · subtle", "System 2 · reflective"];
const SHOTS = [
  [
    { src: "cases/you/system1-grace.jpg", kicker: "System 1 · Grace", title: "A small delay, not a lockout", body: "During a deep-work block, opening a distracting app starts a short delay timer. The pause is often enough to break the autopilot.", alt: "System 1 interventions for Grace: lock screen, home screen and an app-delay screen before Instagram opens." },
    { src: "cases/you/system2-grace.jpg", kicker: "System 2 · Grace", title: "A prompt to reflect", body: "An active prompt asks Grace to step back and decide: is this still the goal, or does it need adjusting?", alt: "System 2 interventions for Grace: an active prompt asking her to reflect." },
  ],
  [
    { src: "cases/you/system1-phil.jpg", kicker: "System 1 · Phil", title: "A breath he can feel", body: "When stress-like patterns appear, a short, slow vibration mimics a calm breathing cadence (inhale, hold, exhale), with a slow pulsing element he can follow or ignore.", alt: "System 1 interventions for Phil: a calming vibration and a slow pulsing element on the home screen." },
    { src: "cases/you/system2-phil.jpg", kicker: "System 2 · Phil", title: "A note from Past Phil", body: "A letter to his future self arrives at the moment it matters, followed by a gentle conversational check-in.", alt: "System 2 interventions for Phil: a note from Past Phil and a conversational check-in." },
  ],
];

/** Same moment, different person: persona × kind of nudge. */
export function PersonaNudge() {
  const [who, setWho] = useState(0);
  const [kind, setKind] = useState(0);
  const cur = SHOTS[who][kind];
  return (
    <section className="wrap sig" aria-label="Same moment, different person">
      <SigHead title="Who you are changes how YOU nudges." />
      <div className="nx">
        <div className="nxshot">
          {SHOTS.flatMap((row, i) => row.map((s, j) => {
            const on = i === who && j === kind;
            return <img key={s.src} src={asset(s.src)} alt={on ? s.alt : ""} aria-hidden={!on} style={{ opacity: on ? 1 : 0 }} />;
          }))}
        </div>
        <div className="nxctl">
          <div className="row">
            <span className="mono">Person</span>
            <Seg label="Choose a persona" options={PEOPLE.map((p) => p.label)} value={who} onChange={setWho} />
            <span style={{ fontSize: 14, color: "var(--muted)" }}>{PEOPLE[who].motive}</span>
          </div>
          <div className="row">
            <span className="mono">Kind of nudge</span>
            <Seg label="Choose a kind of nudge" options={KINDS} value={kind} onChange={setKind} />
          </div>
          <div className="nxnote" aria-live="polite">
            <span className="mono">{cur.kicker}</span><h3>{cur.title}</h3><p>{cur.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ A+ */
const CATS = ["Accessibility & readability", "Navigation efficiency", "Interface design", "User experience", "Submission feedback"];
const INSP = [{ t: 42, s: 19 }, { t: 11, s: 4 }, { t: 33, s: 2 }, { t: 18, s: 3 }, { t: 10, s: 1 }];
const USER = [{ t: 12, s: 6 }, { t: 10, s: 4 }, { t: 18, s: 3 }, { t: 15, s: 4 }, { t: 19, s: 10 }];
const MAXN = 42;
const MODES = [
  { label: "Inspection", callout: "The expert review flagged accessibility and readability most: 42 issues, 19 of them severe." },
  { label: "User tests", callout: "Users struggled most with submission feedback: 19 issues, 10 of them severe. The inspection had rated most of those issues as minor." },
  { label: "Compare", callout: "Inspection found breadth; users showed what actually hurt. Where both agreed, we were confident." },
];

/** Where the two methods disagreed: issue counts by category, inspection vs. user tests. */
export function SeverityCompare() {
  const [m, setM] = useState(2);
  const showI = m !== 1, showU = m !== 0;
  const pct = (n: number) => Math.round((n / MAXN) * 1000) / 10;
  return (
    <section className="wrap sig" aria-label="Where the two methods disagreed">
      <SigHead title="Experts and users found different problems.">
        <Seg label="Choose an evaluation" options={MODES.map((x) => x.label)} value={m} onChange={setM} />
      </SigHead>
      <div className="sev">
        <p className="callout" aria-live="polite">{MODES[m].callout}</p>
        <div className="sevkey" aria-hidden="true">
          <span style={{ opacity: showI ? 1 : 0.3 }}><i style={{ background: "var(--rule-strong)" }} />Inspection · all issues</span>
          <span style={{ opacity: showI ? 1 : 0.3 }}><i style={{ background: "var(--accent)" }} />Inspection · severe</span>
          <span style={{ opacity: showU ? 1 : 0.3 }}><i className="ku1" style={{ background: "#9FB6C9" }} />User tests · all issues</span>
          <span style={{ opacity: showU ? 1 : 0.3 }}><i className="ku2" style={{ background: "#2F5D80" }} />User tests · severe</span>
        </div>
        {CATS.map((c, i) => {
          const a = INSP[i], b = USER[i];
          return (
            <div key={c} className="sevrow" role="group" aria-label={`${c}: inspection ${a.t} issues, ${a.s} severe; user tests ${b.t} issues, ${b.s} severe`}>
              <span className="sevcat">{c}</span>
              <div className="sevbars">
                <div className="sb" style={{ opacity: showI ? 1 : 0.25 }}>
                  <span className="sbt"><i className="tot" style={{ width: `${showI ? pct(a.t) : 0}%` }} /><i className="svr" style={{ width: `${showI ? pct(a.s) : 0}%` }} /></span>
                  <span className="sbn">{a.t} · {a.s} sev</span>
                </div>
                <div className="sb" style={{ opacity: showU ? 1 : 0.25 }}>
                  <span className="sbt u"><i className="tot" style={{ width: `${showU ? pct(b.t) : 0}%` }} /><i className="svr" style={{ width: `${showU ? pct(b.s) : 0}%` }} /></span>
                  <span className="sbn">{b.t} · {b.s} sev</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)" }}>
        Issue counts by category from our severity analysis (0–5 scale; severe = 4–5). <Ph>Numbers read off the team’s charts — check them against the source data</Ph>
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ SN-07 */
/** 900 dots, one per applicant; ours is #2. "Find us" fills the field in. */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const lit = useRef(900);
  const dark = useIsDark();
  const draw = useCallback((n: number) => {
    lit.current = n;
    const el = ref.current; if (!el) return;
    const g = el.getContext("2d"); if (!g) return;
    const W = el.width, H = el.height, top = 44, cols = 60, rows = 15, cw = W / cols, ch = (H - top) / rows, r = Math.min(cw, ch) * 0.28;
    const cs = getComputedStyle(el);
    const v = (k: string, d: string) => cs.getPropertyValue(k).trim() || d;
    const ink = v("--ink", "#0D1117"), mut = v("--muted", "#57606A"), rule = v("--rule-strong", "#C9CED6"), acc = v("--accent", "#D96B27");
    g.clearRect(0, 0, W, H);
    for (let i = 0; i < cols * rows; i++) {
      const x = ((i % cols) + 0.5) * cw, y = top + (Math.floor(i / cols) + 0.5) * ch;
      g.beginPath(); g.arc(x, y, i === 1 ? r * 2.2 : r, 0, Math.PI * 2);
      g.fillStyle = i === 1 ? acc : i >= n ? rule : mut; g.fill();
    }
    const x1 = 1.5 * cw;
    g.strokeStyle = acc; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x1, 26); g.lineTo(x1, top + ch * 0.5 - r * 2.6); g.stroke();
    g.fillStyle = ink; g.font = "600 15px Inter, sans-serif"; g.fillText("Groundwork · #2", x1 - 6, 18);
  }, []);
  useEffect(() => { draw(lit.current); }, [dark, draw]);
  useEffect(() => { document.fonts?.ready.then(() => draw(lit.current)); return () => cancelAnimationFrame(raf.current); }, [draw]);
  const replay = () => {
    cancelAnimationFrame(raf.current);
    if (reduceMotion()) { draw(900); return; }
    const t0 = performance.now();
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / 1400);
      draw(Math.round(900 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    draw(0); raf.current = requestAnimationFrame(step);
  };
  return (
    <section className="wrap sig" aria-label="EIT Jumpstarter ranking">
      <SigHead title="Groundwork came second.">
        <button type="button" className="btn solid" onClick={replay}>▶ Find us</button>
      </SigHead>
      <div className="field" role="img" aria-label="A field of 900 dots, one per team. The second dot is highlighted: Groundwork.">
        <canvas ref={ref} width={1140} height={344} />
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)" }}>EIT Jumpstarter 2025, New European Bauhaus category. Each dot is one applicant; 900 shown.</p>
    </section>
  );
}

export const SIGNATURES = { LoadRace, OnboardingWizard, TabletSimulator, PersonaNudge, SeverityCompare, DotField };
