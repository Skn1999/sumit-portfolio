import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EMAIL, reduceMotion } from "../lib";

type Key = { id: string; label: string; w: number };
const KEY_LAYOUT: Key[] = [
  { id: "H", label: "H", w: 1 }, { id: "E", label: "E", w: 1 }, { id: "L", label: "L", w: 1 },
  { id: "L", label: "L", w: 1 }, { id: "O", label: "O", w: 1 }, { id: "ENTER", label: "↵", w: 2.1 },
];

function legendTexture(text: string, size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#0D1117"; g.textAlign = "center"; g.textBaseline = "middle";
  g.font = `700 ${size}px "Space Mono", monospace`;
  g.fillText(text, 128, 136);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function keyGeo(w: number, d: number) {
  const r = 0.28, s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -d / 2); s.lineTo(w / 2 - r, -d / 2); s.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r);
  s.lineTo(w / 2, d / 2 - r); s.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2); s.lineTo(-w / 2 + r, d / 2);
  s.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r); s.lineTo(-w / 2, -d / 2 + r); s.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.55, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.12, bevelSegments: 5, curveSegments: 10 });
  g.rotateX(-Math.PI / 2);
  return g;
}

/** "HELLO ↵" keycaps. Click them or type; Enter copies the email address. Synthesised Web Audio thock, mutable. */
export default function KeycapContact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typed, setTyped] = useState("");
  const [sent, setSent] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [mute, setMute] = useState(false);
  const hoverRef = useRef(hover); hoverRef.current = hover;
  const typedRef = useRef(typed); typedRef.current = typed;
  const muteRef = useRef(mute); muteRef.current = mute;
  const t = useRef<any>(null);
  const actx = useRef<AudioContext | null>(null);
  const kbRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  /* Typing works without a click: when the keyboard scrolls into view it takes focus, and gives it
     back when it leaves. It never steals focus from a text field, or from another control inside the footer. */
  useEffect(() => {
    const el = kbRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      const a = document.activeElement;
      if (e.isIntersecting && e.intersectionRatio >= 0.6) {
        const busy = !!a && a !== el && (a.matches("input, textarea, select, [contenteditable]") || !!a.closest("#contact"));
        if (!busy && a !== el) el.focus({ preventScroll: true });
      } else if (a === el) {
        el.blur();
      }
    }, { threshold: [0, 0.6] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x3a3f4b, 2.6));
    const sun = new THREE.DirectionalLight(0xffffff, 2.6); sun.position.set(-4, 10, 6); scene.add(sun);
    const U = 1.75;
    const totalW = KEY_LAYOUT.reduce((a, k) => a + k.w * U, 0) + (KEY_LAYOUT.length - 1) * 0.18;
    let x = -totalW / 2;
    const disposables: { dispose: () => void }[] = [];
    const keys = KEY_LAYOUT.map((k, i) => {
      const w = k.w * U, accent = k.id === "ENTER";
      const geo = keyGeo(w - 0.24, U - 0.24);
      const mat = new THREE.MeshStandardMaterial({ color: accent ? 0xd96b27 : 0xf0f3f6, roughness: 0.55, metalness: 0.05 });
      const body = new THREE.Mesh(geo, mat);
      const cap = new THREE.Group(); cap.add(body);
      const tex = legendTexture(k.label, k.label.length > 1 ? 70 : 130);
      const lgeo = new THREE.PlaneGeometry(Math.min(w, U) * 0.8, U * 0.8);
      const lmat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
      const leg = new THREE.Mesh(lgeo, lmat);
      leg.rotation.x = -Math.PI / 2; leg.position.y = 0.7; cap.add(leg);
      cap.position.set(x + w / 2, 0, 0);
      body.userData.key = i;
      scene.add(cap);
      disposables.push(geo, mat, tex, lgeo, lmat);
      x += w + 0.18;
      return { i, id: k.id, cap, body, y: 0, v: 0, pressT: 0 };
    });
    const pgeo = new THREE.BoxGeometry(totalW + 0.9, 0.3, U + 0.9), pmat = new THREE.MeshStandardMaterial({ color: 0x1c1f26, roughness: 0.8 });
    const plate = new THREE.Mesh(pgeo, pmat); plate.position.y = -0.2; scene.add(plate);
    disposables.push(pgeo, pmat);
    const resize = () => {
      const w = el.clientWidth || 800, h = el.clientHeight || 300;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      // pull back on narrow screens so the whole row stays in frame
      const base = Math.hypot(11, 9.5), need = (totalW / 2 + 0.9) / (Math.tan((14 * Math.PI) / 180) * camera.aspect), k = Math.max(1, need / base);
      camera.position.set(0, 11 * k, 9.5 * k); camera.lookAt(0, 0, 0.3);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();
    t.current = { renderer, camera, keys, el, ray: new THREE.Raycaster(), ndc: new THREE.Vector2() };
    const reduce = reduceMotion();
    let raf = 0;
    const loop = () => {
      const now = performance.now(), hv = hoverRef.current;
      keys.forEach((k) => {
        const target = now < k.pressT ? -0.38 : hv === k.i ? 0.1 : 0;
        if (reduce) k.y = target; else { k.v += (target - k.y) * 0.3; k.v *= 0.62; k.y += k.v; }
        k.cap.position.y = k.y;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); disposables.forEach((d) => d.dispose()); renderer.dispose(); t.current = null;
      try { actx.current?.close(); } catch { /* ignore */ }
      actx.current = null;
    };
  }, []);

  const audio = () => {
    if (muteRef.current) return null;
    try {
      if (!actx.current) { const AC = window.AudioContext || (window as any).webkitAudioContext; if (!AC) return null; actx.current = new AC(); }
      if (actx.current.state === "suspended") actx.current.resume();
      return actx.current;
    } catch { return null; }
  };
  /* A filtered noise click + a short pitch-dropping "thock", a softer tick on release, a two-note chime on Enter. */
  const clack = (id: string) => {
    const ctx = audio(); if (!ctx) return;
    const now = ctx.currentTime, enter = id === "ENTER", jit = 0.92 + Math.random() * 0.16;
    const out = ctx.createGain(); out.gain.value = 0.45; out.connect(ctx.destination);
    const len = Math.floor(ctx.sampleRate * 0.03), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4);
    const click = (at: number, freq: number, gain: number) => {
      const n = ctx.createBufferSource(); n.buffer = buf;
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = freq; bp.Q.value = 1.1;
      const g = ctx.createGain(); g.gain.value = gain;
      n.connect(bp); bp.connect(g); g.connect(out); n.start(at);
    };
    click(now, (enter ? 1700 : 3000) * jit, 0.9);
    click(now + 0.095, 4200 * jit, 0.28);
    const o = ctx.createOscillator(), og = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime((enter ? 190 : 290) * jit, now);
    o.frequency.exponentialRampToValueAtTime(enter ? 70 : 110, now + 0.06);
    og.gain.setValueAtTime(0.0001, now);
    og.gain.exponentialRampToValueAtTime(enter ? 0.6 : 0.32, now + 0.004);
    og.gain.exponentialRampToValueAtTime(0.0001, now + (enter ? 0.16 : 0.08));
    o.connect(og); og.connect(out); o.start(now); o.stop(now + 0.2);
    if (enter) {
      [880, 1318.5].forEach((f, j) => {
        const c = ctx.createOscillator(), g = ctx.createGain(), s = now + 0.1 + j * 0.08;
        c.type = "triangle"; c.frequency.value = f;
        g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(0.16, s + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.35);
        c.connect(g); g.connect(out); c.start(s); c.stop(s + 0.4);
      });
    }
  };

  const press = (id: string, idx?: number) => {
    if (idx == null) {
      // Typed on a real keyboard: repeated letters (the two Ls) take turns, so "hel" sinks the first L and "hell" the second.
      const c: number[] = [];
      KEY_LAYOUT.forEach((k, j) => { if (k.id === id) c.push(j); });
      if (c.length) {
        const t0 = typedRef.current, ch = id.toLowerCase();
        let run = 0;
        while (run < t0.length && t0[t0.length - 1 - run] === ch) run++;
        idx = c[run % c.length];
      }
    }
    const k = idx != null ? t.current?.keys[idx] : null;
    if (k) k.pressT = performance.now() + 120;
    clack(id);
    if (id === "ENTER") {
      navigator.clipboard?.writeText(EMAIL).catch(() => { /* clipboard blocked: the address is shown below anyway */ });
      setSent(true); setTyped((s) => s || "hello");
      return;
    }
    if (id === "BACK") { setTyped((s) => s.slice(0, -1)); setSent(false); return; }
    setTyped((s) => (s + id.toLowerCase()).slice(-24)); setSent(false);
  };

  const pick = (e: React.PointerEvent): number | null => {
    const c = t.current; if (!c) return null;
    const r = c.el.getBoundingClientRect();
    c.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    c.ray.setFromCamera(c.ndc, c.camera);
    const hits = c.ray.intersectObjects(c.keys.map((k: any) => k.body), false);
    return hits.length ? (hits[0].object.userData.key as number) : null;
  };
  const onKey = (e: React.KeyboardEvent) => {
    const k = e.key;
    if (k === "Enter") { e.preventDefault(); press("ENTER"); return; }
    if (k === "Backspace") { e.preventDefault(); press("BACK"); return; }
    if (k.length === 1 && /[a-z]/i.test(k)) {
      const up = k.toUpperCase();
      if (KEY_LAYOUT.some((x) => x.id === up)) press(up);
      else { clack(up); setTyped((s) => (s + k.toLowerCase()).slice(-24)); setSent(false); }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        ref={kbRef} className="v2-kb" tabIndex={0} role="group"
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        aria-label="A 3D keyboard that says hello. Click the keys or type; press Enter to copy my email address."
        onPointerDown={(e) => { const i = pick(e); if (i !== null) press(KEY_LAYOUT[i].id, i); }}
        onPointerMove={(e) => { const i = pick(e); if (i !== hover) setHover(i); }}
        onPointerLeave={() => setHover(null)}
        onKeyDown={onKey}
        style={{ cursor: hover != null ? "pointer" : "default" }}
      >
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
      <div aria-live="polite" style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--f-mono)", fontSize: 20, minHeight: 28 }}>
        <span style={{ color: "#8B949E" }}>&gt;</span>
        {/* The caret sits flush against the last typed character, like a text field. */}
        <span style={{ whiteSpace: "pre" }}>{typed}<span className={`v2-caret${focused ? " on" : ""}`} aria-hidden="true" /></span>
      </div>
      {sent && (
        <a className="v2-fade-in" href={`mailto:${EMAIL}`} style={{ alignSelf: "flex-start", fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 500, letterSpacing: "-0.03em", textDecoration: "underline", textUnderlineOffset: 8, textDecorationThickness: 1, wordBreak: "break-all" }}>
          {EMAIL}
        </a>
      )}
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <span className="v2-mono">{sent ? "Copied to your clipboard — talk soon." : focused ? "Listening · type hello, ↵ sends" : "Click the keys or just type · ↵ sends"}</span>
        <button type="button" className="v2-sound" aria-pressed={!mute} onClick={() => { setMute(!mute); kbRef.current?.focus({ preventScroll: true }); }}>{mute ? "Sound off" : "♪ Sound on"}</button>
      </div>
      {!sent && (
        <a href={`mailto:${EMAIL}`} style={{ alignSelf: "flex-start", fontSize: 14, textDecoration: "underline", textUnderlineOffset: 4 }}>
          or email {EMAIL} directly
        </a>
      )}
    </div>
  );
}
