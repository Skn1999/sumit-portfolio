import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Helmet } from "react-helmet-async";
import { SCAN_FIELDS } from "../data/home";
import { reduceMotion, useIsDark } from "../lib";

/**
 * "On being a scanner": a few thousand fragments, coloured by the six fields I work across, float at
 * different depths. From almost every angle they look like noise. From one angle they line up into the
 * word "scanner". The section lines them up on its own a moment after it scrolls into view; visitors can
 * drag to turn it, or use the two buttons.
 */

const R = 14;                       // camera orbit radius
const OFF = { yaw: 1.05, pitch: 0.42 }; // the scattered starting angle
const INK = { light: "#0D1117", dark: "#E6EDF3" };

/** Samples the word as a dot grid in the plane z = 0, centred on the origin. */
function sampleWord(word: string) {
  const W = 760, H = 220;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d")!;
  g.fillStyle = "#000"; g.font = "700 168px Caveat, cursive"; g.textAlign = "center"; g.textBaseline = "middle";
  g.fillText(word, W / 2, H / 2 + 6);
  const d = g.getImageData(0, 0, W, H).data, pts: [number, number][] = [];
  for (let y = 0; y < H; y += 4) for (let x = 0; x < W; x += 4) if (d[(y * W + x) * 4 + 3] > 128) pts.push([(x - W / 2) / 62, -(y - H / 2) / 62]);
  return pts;
}

type Cam = { yaw: number; pitch: number; ty: number; tp: number };

export default function ScannerField() {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const cam = useRef<Cam>({ yaw: OFF.yaw, pitch: OFF.pitch, ty: OFF.yaw, tp: OFF.pitch });
  const goal = useRef<{ yaw: number; pitch: number } | null>(null);
  const speed = useRef(0.06);
  const drag = useRef<{ x: number; y: number; ty: number; tp: number } | null>(null);
  const dark = useRef(false);
  const [near, setNear] = useState(false);
  const [noGL, setNoGL] = useState(false);
  const [lined, setLined] = useState(0); // 0–100
  const isDark = useIsDark();
  dark.current = isDark;

  // Build the scene only when the section is close to the viewport.
  useEffect(() => {
    const el = stage.current;
    if (near || !el) return;
    if (!("IntersectionObserver" in window)) { setNear(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  // Line up on arrival: once the stage is mostly on screen, wait 1.5 s (long enough to see the noise), then turn slowly into place.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let t = 0;
    const go = () => { t = window.setTimeout(() => { speed.current = 0.022; goal.current = { yaw: 0, pitch: 0 }; }, 1500); };
    if (!("IntersectionObserver" in window)) { go(); return () => clearTimeout(t); }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { go(); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  useEffect(() => {
    const el = canvas.current, host = stage.current;
    if (!near || !el || !host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true }); } catch { setNoGL(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const groups: { pts: THREE.Points; mat: THREE.PointsMaterial; base: THREE.Color }[] = [];
    let alive = true;

    const build = () => {
      if (!alive) return;
      const buckets: number[][] = SCAN_FIELDS.map(() => []);
      sampleWord("scanner").forEach(([x, y]) => {
        // Every fragment sits on the ray from the "right" camera position through its spot in the word,
        // so from that one angle the depth disappears and the word reads.
        const t = 0.3 + Math.random() * 1.5, g = Math.floor(Math.random() * SCAN_FIELDS.length);
        buckets[g].push(x * t, y * t, R - R * t);
      });
      buckets.forEach((arr, i) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
        const mat = new THREE.PointsMaterial({ size: 0.085, sizeAttenuation: true, color: SCAN_FIELDS[i].color });
        const pts = new THREE.Points(geo, mat);
        scene.add(pts);
        groups.push({ pts, mat, base: new THREE.Color(SCAN_FIELDS[i].color) });
      });
    };
    const fonts = document.fonts?.load ? document.fonts.load("700 168px Caveat") : Promise.resolve();
    fonts.catch(() => undefined).then(build);

    const resize = () => {
      const w = el.clientWidth || 800, h = el.clientHeight || 440;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // On narrow stages, widen the view so the whole word still fits across.
      camera.fov = camera.aspect < 1.7 ? (2 * Math.atan(Math.tan((25 * Math.PI) / 180) / camera.aspect) * 180) / Math.PI : 38;
      camera.updateProjectionMatrix();
    };
    const ro = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    ro?.observe(el);
    resize();

    // Only animate while the stage is on screen.
    let visible = true;
    const vis = "IntersectionObserver" in window ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }) : null;
    vis?.observe(host);

    const ink = new THREE.Color();
    let raf = 0, lastLined = -1, last = 0;
    const frame = (now: number) => {
      raf = 0;
      if (!alive || !visible) { last = 0; return; }
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
      last = now;
      const c = cam.current;
      if (goal.current && !drag.current) { c.ty = goal.current.yaw; c.tp = goal.current.pitch; }
      // Same easing at any frame rate: `speed` is the share of the distance covered per 60 fps frame.
      const sp = reduceMotion() ? 1 : 1 - Math.pow(1 - speed.current, dt * 60);
      c.yaw += (c.ty - c.yaw) * sp;
      c.pitch += (c.tp - c.pitch) * sp;
      camera.position.set(Math.sin(c.yaw) * Math.cos(c.pitch) * R, Math.sin(c.pitch) * R, Math.cos(c.yaw) * Math.cos(c.pitch) * R);
      camera.lookAt(0, 0, 0);
      const nearness = 1 - Math.min(1, Math.hypot(c.yaw, c.pitch) / 0.5);
      const k = Math.max(0, (nearness - 0.85) / 0.15); // colours settle into ink in the last stretch
      ink.set(dark.current ? INK.dark : INK.light);
      groups.forEach((g) => g.mat.color.copy(g.base).lerp(ink, k));
      const pct = Math.round(nearness * 100);
      if (Math.abs(pct - lastLined) > 2 || (pct >= 97) !== (lastLined >= 97)) { lastLined = pct; setLined(pct); }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf && alive) raf = requestAnimationFrame(frame); };
    start();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      vis?.disconnect();
      groups.forEach((g) => { g.pts.geometry.dispose(); g.mat.dispose(); });
      renderer.dispose(); // no loseContext: StrictMode re-mounts on the same canvas
    };
  }, [near]);

  const down = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, ty: cam.current.ty, tp: cam.current.tp };
    goal.current = null;
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* not supported */ }
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    let y = d.ty - (e.clientX - d.x) * 0.006;
    let p = Math.max(-1.1, Math.min(1.1, d.tp + (e.clientY - d.y) * 0.005));
    if (Math.hypot(y, p) < 0.06) { y = 0; p = 0; } // a little snap when you find it
    cam.current.ty = y; cam.current.tp = p;
  };
  const up = () => { drag.current = null; };
  const lineUp = () => { speed.current = 0.05; goal.current = { yaw: 0, pitch: 0 }; };
  const scatter = () => { speed.current = 0.05; goal.current = { yaw: OFF.yaw, pitch: OFF.pitch }; };
  const done = lined >= 97;

  return (
    <div
      ref={stage}
      className="v2-scan"
      role="group"
      aria-label="Coloured fragments from six fields float in 3D. From one angle they line up into the word scanner. Drag to turn it."
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
    >
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" />
      </Helmet>
      <canvas ref={canvas} aria-hidden="true" />
      <span className="v2-scan-status v2-mono" aria-live="polite">{done ? "Lined up" : `${lined}% lined up · drag to turn`}</span>
      <ul className="v2-scan-legend v2-mono" aria-hidden="true">
        {SCAN_FIELDS.map((f) => <li key={f.label}><i style={{ background: f.color }} />{f.label}</li>)}
      </ul>
      <span className="v2-scan-btns" onPointerDown={(e) => e.stopPropagation()}>
        <button type="button" className="v2-scan-btn" onClick={scatter}>Scatter</button>
        <button type="button" className="v2-scan-btn strong" onClick={lineUp}>Line them up</button>
      </span>
      {noGL && <p className="v2-scan-nogl">3D isn’t available in this browser. The fragments spell “scanner”.</p>}
    </div>
  );
}
