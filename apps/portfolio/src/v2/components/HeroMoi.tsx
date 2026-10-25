import { useEffect, useRef, useState } from "react";
import { asset, reduceMotion } from "../lib";

/* The hero clip ("hello" → "Moi") is an H.264 MP4 with colour on top and its alpha mask below,
   so it plays with transparency in every browser, Safari included. A tiny WebGL pass recombines
   the two halves. It loops at 0.9× speed (playbackRate — the file itself is untouched) and pauses while off screen. Reduced motion or no WebGL → still image. */
const RATE = 0.9;
const VS = "attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*0.5+0.5,0.5-p.y*0.5);gl_Position=vec4(p,0.,1.);}";
const FS =
  "precision mediump float;uniform sampler2D t;uniform float h;varying vec2 v;void main(){float y=clamp(v.y,0.0,1.0)*(0.5-h);vec3 c=texture2D(t,vec2(v.x,y)).rgb;float a=texture2D(t,vec2(v.x,0.5+h+y)).r;a=smoothstep(0.02,0.98,a);gl_FragColor=vec4(c*a,a);}";

export default function HeroMoi() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = canvasRef.current, v = videoRef.current;
    if (!el || !v) return;
    if (reduceMotion()) { setStill(true); return; }
    const gl = el.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl || gl.isContextLost()) { setStill(true); return; }
    const sh = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { setStill(true); return; }
    gl.useProgram(pr);
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const l = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(l);
    gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const uh = gl.getUniformLocation(pr, "h");
    let failed = false, raf = 0;
    const draw = () => {
      if (failed || v.readyState < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(el.clientWidth * dpr), hh = Math.round(el.clientHeight * dpr);
      if (w && hh && (el.width !== w || el.height !== hh)) { el.width = w; el.height = hh; }
      gl.viewport(0, 0, el.width, el.height);
      try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, v); } catch { failed = true; setStill(true); return; }
      gl.uniform1f(uh, 1 / (v.videoHeight || 608));
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    let alive = true;
    let visible = true;
    const loop = () => { if (!alive) return; draw(); if (!failed && visible) raf = requestAnimationFrame(loop); };
    const go = () => {
      if (!alive) return;
      setStill(false);
      v.defaultPlaybackRate = RATE; v.playbackRate = RATE;
      v.play().catch(() => { if (alive) setStill(true); });
      cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
    };
    v.muted = true;
    if (v.readyState >= 2) go(); else v.addEventListener("loadeddata", go);
    // Some browsers reset the rate when the source (re)loads; keep it pinned.
    const keepRate = () => { if (v.playbackRate !== RATE) v.playbackRate = RATE; };
    v.addEventListener("ratechange", keepRate);
    v.addEventListener("loadedmetadata", keepRate);
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    // Save battery: pause the loop while the hero is scrolled away.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) { if (v.readyState >= 2) go(); }
      else { v.pause(); cancelAnimationFrame(raf); }
    });
    io.observe(el);
    // No forced context loss on cleanup: React StrictMode remounts reuse this same canvas.
    return () => {
      alive = false;
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      v.removeEventListener("loadeddata", go); v.removeEventListener("ratechange", keepRate); v.removeEventListener("loadedmetadata", keepRate);
      gl.deleteTexture(tex); gl.deleteBuffer(b); gl.deleteProgram(pr);
    };
  }, []);

  return (
    <div className="v2-moi" aria-hidden="true">
      <img src={asset("hero-moi-still.webp")} alt="" style={{ opacity: still ? 1 : 0 }} />
      <canvas ref={canvasRef} />
      <video ref={videoRef} src={asset("hero-moi.mp4")} muted loop playsInline preload="auto" />
    </div>
  );
}
