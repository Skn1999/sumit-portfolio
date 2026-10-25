import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { asset, reduceMotion } from "../lib";

/* Chrome rim: a rounded-rect SDF with a bevelled normal that reflects a fake studio environment
   (bright sky / dark horizon / grey floor), slight RGB split, and a slow light sweep across the glass.
   Light follows the pointer. Premultiplied alpha, so the centre stays see-through. */
const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uT;uniform vec2 uM;uniform float uDpr;uniform float uHot;uniform float uDark;
float sdRR(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float sd(vec2 p){vec2 h=0.5*uRes-0.75*uDpr;return sdRR(p,h,h.y);}
vec3 env(vec3 r,float sh,float lx){
  float y=r.y+sh;
  vec3 sky=mix(vec3(1.0),vec3(0.80,0.82,0.86),smoothstep(0.05,0.95,y));
  vec3 gnd=mix(vec3(0.16,0.17,0.20),vec3(0.62,0.64,0.68),smoothstep(-0.95,-0.05,y));
  vec3 c=y>0.0?sky:gnd;
  c=mix(c,vec3(0.06,0.07,0.09),exp(-pow(y*12.0,2.0))*0.85);
  c+=vec3(1.0)*exp(-pow((r.x-lx)*5.0,2.0))*0.45;
  return c;}
void main(){
  vec2 p=gl_FragCoord.xy-0.5*uRes;
  float d=sd(p);
  vec2 e=vec2(1.0,0.0);
  vec2 g=vec2(sd(p+e.xy)-sd(p-e.xy),sd(p+e.yx)-sd(p-e.yx));
  g=g/max(length(g),1e-4);
  float rim=3.4*uDpr;
  float t=clamp(-d/rim,0.0,1.0);
  float tilt=pow(1.0-t,1.5);
  vec3 n=normalize(vec3(g*tilt*1.6,1.0));
  vec3 r=reflect(vec3(0.0,0.0,-1.0),n);
  float sh=0.08*sin(uT*0.5)+uM.y*0.25;
  float lx=uM.x*0.9;
  vec3 col=vec3(env(r,sh+0.035,lx).r,env(r,sh,lx).g,env(r,sh-0.035,lx).b);
  float edge=smoothstep(0.6*uDpr,-0.6*uDpr,d);
  float ring=edge*(1.0-smoothstep(0.55,1.0,t));
  float u=gl_FragCoord.x/uRes.x, v=gl_FragCoord.y/uRes.y;
  float sweepX=fract(uT*0.045)*2.6-0.8;
  float sweep=exp(-pow((u-sweepX-(v-0.5)*0.35)*7.0,2.0))*0.16;
  float hot=exp(-pow((u-(uM.x*0.5+0.5))*3.2,2.0))*0.10*uHot;
  float top=smoothstep(0.62,1.0,v)*0.10;
  float a=max(ring*0.95,edge*(sweep+hot+top)*(1.0-0.55*uDark));
  vec3 c=mix(vec3(1.0),col,ring);
  gl_FragColor=vec4(c*a,a);
}`;

function useChromeRim(canvas: React.RefObject<HTMLCanvasElement>, dark: boolean) {
  const darkRef = useRef(dark);
  darkRef.current = dark;
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: true });
    if (!gl) return;
    const sh = (type: number, src: string) => { const o = gl.createShader(type)!; gl.shaderSource(o, src); gl.compileShader(o); return o; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U: Record<string, WebGLUniformLocation | null> = {};
    ["uRes", "uT", "uM", "uDpr", "uHot", "uDark"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));
    const reduce = reduceMotion();
    const t0 = performance.now();
    const m = { x: 0, y: 0, tx: 0, ty: 0, hot: 0, hotT: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width) return;
      m.tx = Math.max(-1.6, Math.min(1.6, ((e.clientX - r.left) / r.width) * 2 - 1));
      m.ty = Math.max(-1, Math.min(1, -((e.clientY - (r.top + r.height / 2)) / 400)));
      m.hotT = e.clientY > r.top && e.clientY < r.bottom && e.clientX > r.left && e.clientX < r.right ? 1 : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let raf = 0;
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(el.clientWidth * dpr), h = Math.round(el.clientHeight * dpr);
      if (w && h && (el.width !== w || el.height !== h)) { el.width = w; el.height = h; }
      m.x += (m.tx - m.x) * 0.08; m.y += (m.ty - m.y) * 0.08; m.hot += (m.hotT - m.hot) * 0.1;
      gl.viewport(0, 0, el.width, el.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.uRes, el.width, el.height);
      gl.uniform1f(U.uDpr, dpr);
      gl.uniform1f(U.uT, reduce ? 6 : (performance.now() - t0) / 1000);
      gl.uniform2f(U.uM, m.x, m.y);
      gl.uniform1f(U.uHot, m.hot);
      gl.uniform1f(U.uDark, darkRef.current ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [canvas]);
}

export type DockItem = { label: string; to: string; key: string; hideOnPhone?: boolean };

const ITEMS: DockItem[] = [
  { key: "work", label: "Work", to: "/#work" },
  { key: "resume", label: "Résumé", to: "/resume" },
  { key: "contact", label: "Contact", to: "/#contact" },
];

type Props = {
  active?: string;
  reader?: { on: boolean; set: (v: boolean) => void };
};

/** Frosted-glass dock with a chrome rim, a sliding active pill, Reader mode switch and theme toggle. */
export default function Dock({ active, reader }: Props) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const fx = useRef<HTMLCanvasElement>(null);
  const nav = useRef<HTMLElement>(null);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const location = useLocation();
  useChromeRim(fx, dark);

  useLayoutEffect(() => {
    const el = nav.current;
    if (!el) return;
    const measure = () => {
      const a = el.querySelector<HTMLElement>(`[data-dock="${active}"]`);
      if (!a) { setInd(null); return; }
      const base = el.getBoundingClientRect(), r = a.getBoundingClientRect();
      setInd({ x: r.left - base.left, w: r.width });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [active, reader?.on, location.pathname]);

  return (
    <div className="v2-dockwrap">
      <nav className="v2-dock" aria-label="Primary" ref={nav}>
        <canvas className="v2-dock-fx" ref={fx} aria-hidden="true" />
        <span className="v2-dock-ind" aria-hidden="true" style={{ transform: `translateX(${ind?.x ?? 0}px)`, width: ind?.w ?? 0, opacity: ind ? 1 : 0 }} />
        {ITEMS.map((it) => (
          <Link key={it.key} to={it.to} className="v2-dock-item" data-dock={it.key} aria-current={active === it.key ? "page" : undefined}>
            {it.label}
          </Link>
        ))}
        <span className="v2-dock-sep" aria-hidden="true" />
        {reader && (
          <button type="button" role="switch" aria-checked={reader.on} className="v2-reader" onClick={() => reader.set(!reader.on)}>
            <span className="track" aria-hidden="true" />
            <span>Reader<span className="lbl-long"> mode</span></span>
          </button>
        )}
        <button type="button" className="v2-icon-btn" onClick={toggleTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <Link className="v2-dock-me" to="/#contact" aria-label="Sumit Nayyar — open to work" title="Sumit Nayyar · open to work">
          <img src={asset("avatar.jpg")} alt="" />
          <span className="v2-pulse" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
