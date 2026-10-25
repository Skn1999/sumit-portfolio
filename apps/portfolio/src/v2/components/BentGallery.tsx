import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { LAB_ITEMS, type LabItem } from "../data/labs";
import { reduceMotion, useIsDark } from "../lib";

type Pal = { bg: string; surface: string; chip: string; rule: string; rule2: string; ink: string; muted: string; dark: string; onDark: string; clear: number; dim: [number, number, number] };
const PAL_LIGHT: Pal = { bg: "#F6F7F9", surface: "#FFFFFF", chip: "#EAECEF", rule: "#E1E4EA", rule2: "#C9CED6", ink: "#0D1117", muted: "#57606A", dark: "#0D1117", onDark: "#F0F3F6", clear: 0xf6f7f9, dim: [0.965, 0.969, 0.976] };
const PAL_DARK: Pal = { bg: "#0D1117", surface: "#161B22", chip: "#1F2630", rule: "#262C36", rule2: "#3A414C", ink: "#E6EDF3", muted: "#8B949E", dark: "#05070A", onDark: "#E6EDF3", clear: 0x0d1117, dim: [0.051, 0.067, 0.09] };

const G_COLS = 11, G_ROWS = 4, G_CW = 3.2, G_CH = 4.5, G_CAMZ = 10;
const gWrap = (v: number, p: number) => (((v % p) + p) % p) - p / 2;

function wrapLines(g: CanvasRenderingContext2D, text: string, maxW: number) {
  const words = String(text).split(" "), lines: string[] = [];
  let line = "";
  for (const w of words) {
    const t = line ? line + " " + w : w;
    if (g.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

/** Draws one side-quest card (image / browser mock / quote) into a canvas texture. */
function makeCardTexture(it: LabItem, palRef: { current: Pal }) {
  const W = 512, H = 704, MH = 592;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d")!;
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  let loaded: HTMLImageElement | null = null;
  const draw = () => {
    const P = palRef.current;
    let bg = P.chip, fg = P.ink;
    if (it.kind === "text" && it.tone === "dark") { bg = P.dark; fg = P.onDark; }
    if (it.kind === "text" && it.tone === "paper") bg = P.surface;
    if (it.contain) bg = P === PAL_DARK ? "#E6E9EE" : P.surface;
    g.fillStyle = P.bg; g.fillRect(0, 0, W, H);
    g.fillStyle = bg; g.fillRect(0, 0, W, MH);
    if (loaded) {
      const s = it.contain ? Math.min(W / loaded.width, MH / loaded.height) : Math.max(W / loaded.width, MH / loaded.height);
      const dw = loaded.width * s, dh = loaded.height * s;
      g.save(); g.beginPath(); g.rect(0, 0, W, MH); g.clip(); g.drawImage(loaded, (W - dw) / 2, (MH - dh) / 2, dw, dh); g.restore();
    }
    if (it.kind === "browser") {
      g.fillStyle = P.surface; g.fillRect(36, 36, W - 72, MH - 72);
      g.strokeStyle = P.rule; g.lineWidth = 2; g.strokeRect(36, 36, W - 72, MH - 72);
      g.beginPath(); g.moveTo(36, 84); g.lineTo(W - 36, 84); g.stroke();
      g.fillStyle = P.rule2;
      [60, 80, 100].forEach((x) => { g.beginPath(); g.arc(x, 60, 6, 0, Math.PI * 2); g.fill(); });
      g.fillStyle = P.muted; g.font = '15px "Space Mono", monospace'; g.fillText(String(it.url).slice(0, 30), 122, 65);
      g.fillStyle = P.ink; g.font = "500 36px Inter, sans-serif";
      wrapLines(g, it.blurb, W - 128).slice(0, 6).forEach((l, i) => g.fillText(l, 64, 150 + i * 46));
      g.font = '16px "Space Mono", monospace'; g.fillText("OPEN LIVE ↗", 64, MH - 70);
    }
    if (it.kind === "text") {
      g.fillStyle = fg; g.globalAlpha = 0.7; g.font = '16px "Space Mono", monospace'; g.fillText(String(it.tag).toUpperCase(), 40, 64); g.globalAlpha = 1;
      g.font = "500 38px Inter, sans-serif";
      const ls = wrapLines(g, it.quote || "", W - 80).slice(0, 7);
      ls.forEach((l, i) => g.fillText(l, 40, MH - 48 - (ls.length - 1 - i) * 48));
    }
    g.fillStyle = P.ink; g.font = "600 26px Inter, sans-serif"; g.fillText(it.title, 4, MH + 47);
    g.fillStyle = P.muted; g.font = "20px Inter, sans-serif"; g.fillText(it.tag, 4, MH + 80);
    tex.needsUpdate = true;
  };
  draw();
  if (it.img) { const im = new Image(); im.onload = () => { loaded = im; draw(); }; im.src = it.img; }
  document.fonts?.load("600 26px Inter").then(draw, () => {});
  return { tex, draw };
}

const VERT = `uniform float uCurve; uniform vec2 uVel; uniform float uTime;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  float r2 = wp.x * wp.x + wp.y * wp.y * 0.8;
  wp.z -= r2 * uCurve;
  float sp = clamp(length(uVel), 0.0, 60.0);
  wp.z += sin(wp.x * 0.5 + wp.y * 0.3 + uTime * 2.0) * sp * 0.006;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const FRAG = `uniform sampler2D map; uniform vec2 uVel; uniform float uHover; uniform float uDim; uniform float uChroma; uniform vec3 uDimCol;
varying vec2 vUv;
void main(){
  vec2 uv = (vUv - 0.5) * (1.0 - 0.035 * uHover) + 0.5;
  vec2 off = vec2(uVel.x, -uVel.y) * 0.0006 * uChroma;
  vec4 base = texture2D(map, uv);
  float r = texture2D(map, uv + off).r;
  float b = texture2D(map, uv - off).b;
  vec3 col = vec3(r, base.g, b);
  col = mix(col, uDimCol, uDim * 0.82);
  gl_FragColor = vec4(col, 1.0);
}`;

/** Side quests: an infinite grid of cards on a curved surface. Drag to move (with chromatic smear),
    click a card for details, arrow keys move too, Esc closes, or switch to a plain list. */
export default function BentGallery() {
  const dark = useIsDark();
  const [list, setList] = useState(false);
  const [noGL, setNoGL] = useState(false);
  const [focus, setFocus] = useState<{ key: string; item: number } | null>(null);
  const [hover, setHover] = useState<{ key: string; item: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [spd, setSpd] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const palRef = useRef<Pal>(dark ? PAL_DARK : PAL_LIGHT);
  const st = useRef({ ox: 0, oy: 0.4, vx: 0, vy: 0, sx: 0, sy: 0, drag: null as null | { x: number; y: number; lx: number; ly: number }, moved: 0 });
  const focusRef = useRef(focus); focusRef.current = focus;
  const hoverRef = useRef(hover); hoverRef.current = hover;
  const g = useRef<any>(null);

  useEffect(() => {
    if (list) return;
    const el = canvasRef.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true }); } catch { setNoGL(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(palRef.current.clear, 1);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, G_CAMZ);
    const d = palRef.current.dim;
    const shared = { uCurve: { value: 0.018 }, uVel: { value: new THREE.Vector2() }, uTime: { value: 0 }, uChroma: { value: 1 }, uDimCol: { value: new THREE.Vector3(d[0], d[1], d[2]) } };
    const cards = LAB_ITEMS.map((it) => makeCardTexture(it, palRef));
    const geo = new THREE.PlaneGeometry(2.76, 3.8, 24, 32);
    const meshes: THREE.Mesh[] = [];
    for (let j = 0; j < G_ROWS; j++) {
      for (let i = 0; i < G_COLS; i++) {
        const idx = (i + j * 5) % LAB_ITEMS.length;
        const u = { map: { value: cards[idx].tex }, uHover: { value: 0 }, uDim: { value: 0 }, uCurve: shared.uCurve, uVel: shared.uVel, uTime: shared.uTime, uChroma: shared.uChroma, uDimCol: shared.uDimCol };
        const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({ uniforms: u, vertexShader: VERT, fragmentShader: FRAG }));
        m.userData = { i, j, item: idx, key: i + ":" + j };
        scene.add(m); meshes.push(m);
      }
    }
    const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
    const resize = () => { const w = el.clientWidth || 1440, h = el.clientHeight || 640; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();
    g.current = { renderer, scene, camera, meshes, ray, ndc, el, shared, cards };
    const t0 = performance.now(), reduce = reduceMotion();
    let lastSpd = 0, raf = 0;
    const loop = () => {
      const s = st.current;
      if (!s.drag) { s.ox += s.vx; s.oy += s.vy; s.vx *= 0.93; s.vy *= 0.93; }
      const ppu = el.clientHeight / (2 * G_CAMZ * Math.tan((20 * Math.PI) / 180));
      s.sx += (s.vx * ppu - s.sx) * 0.15; s.sy += (s.vy * ppu - s.sy) * 0.15;
      shared.uVel.value.set(reduce ? 0 : s.sx, reduce ? 0 : s.sy);
      shared.uTime.value = (performance.now() - t0) / 1000;
      const f = focusRef.current?.key ?? null, h = hoverRef.current?.key ?? null;
      meshes.forEach((m) => {
        const u = m.userData, mu = (m.material as THREE.ShaderMaterial).uniforms;
        m.position.set(gWrap(u.i * G_CW + s.ox, G_COLS * G_CW), gWrap(-u.j * G_CH + s.oy, G_ROWS * G_CH), 0);
        const th = u.key === f || (f === null && u.key === h) ? 1 : 0;
        mu.uHover.value += (th - mu.uHover.value) * 0.15;
        const td = f !== null && u.key !== f ? 1 : 0;
        mu.uDim.value += (td - mu.uDim.value) * 0.12;
      });
      renderer.render(scene, camera);
      const sp = Math.round(Math.hypot(s.sx, s.sy));
      if (Math.abs(sp - lastSpd) > 2) { lastSpd = sp; setSpd(sp); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); cards.forEach((c) => c.tex.dispose()); geo.dispose(); g.current = null; };
  }, [list]);

  // Re-theme the canvas without rebuilding it.
  useEffect(() => {
    palRef.current = dark ? PAL_DARK : PAL_LIGHT;
    const t = g.current; if (!t) return;
    t.renderer.setClearColor(palRef.current.clear, 1);
    const d = palRef.current.dim; t.shared.uDimCol.value.set(d[0], d[1], d[2]);
    t.cards.forEach((c: any) => c.draw());
  }, [dark]);

  const unitsPerPx = () => (2 * G_CAMZ * Math.tan((20 * Math.PI) / 180)) / (g.current?.el.clientHeight || 640);
  const pick = (e: React.PointerEvent) => {
    const t = g.current; if (!t) return null;
    const r = t.el.getBoundingClientRect();
    t.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    t.ray.setFromCamera(t.ndc, t.camera);
    const hits = t.ray.intersectObjects(t.meshes, false);
    return hits.length ? { key: hits[0].object.userData.key as string, item: hits[0].object.userData.item as number } : null;
  };
  const onDown = (e: React.PointerEvent) => {
    if (focus) return;
    const s = st.current;
    s.drag = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY }; s.moved = 0; s.vx = 0; s.vy = 0;
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* ignore */ }
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent) => {
    const s = st.current, d = s.drag;
    if (d) {
      const k = unitsPerPx(), dx = (e.clientX - d.lx) * k, dy = -(e.clientY - d.ly) * k;
      s.ox += dx; s.oy += dy; s.vx = dx; s.vy = dy; d.lx = e.clientX; d.ly = e.clientY;
      s.moved = Math.max(s.moved, Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y));
      return;
    }
    if (focus) return;
    const h = pick(e);
    if ((h?.key ?? null) !== (hover?.key ?? null)) setHover(h);
  };
  const onUp = (e: React.PointerEvent) => {
    const s = st.current;
    if (focus) { const h = pick(e); if (!h || h.key !== focus.key) setFocus(null); return; }
    if (!s.drag) return;
    s.drag = null; setDragging(false);
    if (s.moved < 6) { const h = pick(e); if (h) { s.vx = 0; s.vy = 0; setFocus(h); } }
  };
  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); setFocus(null); return; }
    const m = ({ ArrowLeft: [0.25, 0], ArrowRight: [-0.25, 0], ArrowUp: [0, -0.3], ArrowDown: [0, 0.3] } as Record<string, number[]>)[e.key];
    if (!m || focus) return;
    e.preventDefault(); st.current.vx += m[0]; st.current.vy += m[1];
  }, [focus]);
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  const cur = focus ? LAB_ITEMS[focus.item] : null;
  const hint = list ? "All 12, in order" : focus ? "Esc or click anywhere to close" : "Drag to explore · click a card";

  return (
    <>
      <div className="v2-wrap" style={{ paddingBottom: 28 }}>
        <div className="v2-section" style={{ paddingBottom: 0 }}>
          <div className="v2-label-col">
            <span className="v2-mono">Chapter 04 · Always</span>
            <h2 className="v2-h2">Side quests</h2>
          </div>
          <div className="v2-main-col" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20 }}>
            <p style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 560 }}>
              What a scanner does between jobs: live prototypes, unsolicited redesigns, ink sketches, identities and essays. Twelve of them, on a surface that bends and never ends.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span className="v2-mono">{hint}</span>
              <button type="button" className="v2-btn" style={{ minHeight: 36, padding: "0 12px", fontSize: 11 }} aria-pressed={list} onClick={() => { setList(!list); setFocus(null); setHover(null); }}>
                {list ? "3D view" : "List view"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {!list ? (
        <div
          className="v2-stage3d" tabIndex={0} role="region"
          aria-label="Side quests, a curved 3D gallery. Drag to move, click a card for details, arrow keys move too, or switch to list view."
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          onPointerLeave={() => { if (!st.current.drag) setHover(null); }} onKeyDown={onKey}
          style={{ cursor: dragging ? "grabbing" : hover ? "pointer" : "grab" }}
        >
          <canvas ref={canvasRef} aria-hidden="true" />
          <span className="hud" aria-hidden="true" style={{ left: 24, bottom: 20 }}>
            {hover && !focus ? `→ ${LAB_ITEMS[hover.item].title}` : ""}
          </span>
          <span className="hud" aria-hidden="true" style={{ right: 24, top: 18 }}>Speed {String(spd).padStart(3, "0")}</span>
          {cur && (
            <aside className="v2-gfocus v2-fade-in" aria-live="polite" onPointerDown={stop} onPointerUp={stop}>
              <span className="v2-mono" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                {cur.tag}
              </span>
              <h3>{cur.title}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.55 }}>{cur.blurb}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 6 }}>
                <a className="v2-btn v2-btn--solid" href={cur.href} target={cur.href.startsWith("http") ? "_blank" : undefined} rel="noopener">Open ↗</a>
                <button type="button" className="v2-btn" onClick={() => setFocus(null)}>Close · Esc</button>
              </div>
            </aside>
          )}
          {noGL && (
            <p style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }} className="v2-mono">
              3D isn’t available in this browser — switch to the list view above.
            </p>
          )}
        </div>
      ) : (
        <div className="v2-wrap">
          <ol style={{ listStyle: "none", borderTop: "1px solid var(--ink)" }}>
            {LAB_ITEMS.map((it) => (
              <li key={it.code} style={{ borderBottom: "1px solid var(--rule)" }}>
                <a className="v2-lrow" href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener">
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{it.title}</span>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{it.tag}</span>
                  <span style={{ fontSize: 14 }}>{it.blurb}</span>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, textAlign: "right" }}>Open ↗</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
