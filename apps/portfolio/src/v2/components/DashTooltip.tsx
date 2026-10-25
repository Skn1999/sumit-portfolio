import { useEffect, useRef, useState } from "react";

const DASH = "—";
const TIP = "Not written by AI";

type Hit = { x: number; y: number } | null;

/** Caret position under the pointer, across browsers (Chrome/Safari vs Firefox). */
function caretAt(x: number, y: number): { node: Node; offset: number } | null {
  const d = document as Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };
  if (d.caretPositionFromPoint) {
    const p = d.caretPositionFromPoint(x, y);
    return p ? { node: p.offsetNode, offset: p.offset } : null;
  }
  if (d.caretRangeFromPoint) {
    const r = d.caretRangeFromPoint(x, y);
    return r ? { node: r.startContainer, offset: r.startOffset } : null;
  }
  return null;
}

/** If the pointer is over an em dash in v2 copy, return the dash's on-screen box. */
function dashUnder(x: number, y: number): DOMRect | null {
  const c = caretAt(x, y);
  if (!c || c.node.nodeType !== Node.TEXT_NODE) return null;
  const text = c.node.textContent || "";
  const el = c.node.parentElement;
  if (!el || !el.closest(".v2") || el.closest("input, textarea, [contenteditable], .v2-dash-tip")) return null;
  // The caret lands between characters, so check both neighbours.
  for (const i of [c.offset, c.offset - 1]) {
    if (i < 0 || text[i] !== DASH) continue;
    const r = document.createRange();
    r.setStart(c.node, i);
    r.setEnd(c.node, i + 1);
    const box = r.getBoundingClientRect();
    if (x >= box.left - 2 && x <= box.right + 2 && y >= box.top - 2 && y <= box.bottom + 2) return box;
  }
  return null;
}

/** Easter egg: hover (or tap) any em dash in the copy and a tiny tooltip says it wasn't written by AI.
    Works on all text, including the HTML-string case-study bodies, without wrapping or touching the DOM. */
export default function DashTooltip() {
  const [hit, setHit] = useState<Hit>(null);
  const raf = useRef(0);
  const last = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".v2");
    const check = () => {
      raf.current = 0;
      const { x, y } = last.current;
      const box = dashUnder(x, y);
      if (root) root.style.cursor = box ? "help" : "";
      setHit((h) => {
        if (!box) return h ? null : h;
        const nx = box.left + box.width / 2, ny = box.top;
        return h && Math.abs(h.x - nx) < 0.5 && Math.abs(h.y - ny) < 0.5 ? h : { x: nx, y: ny };
      });
    };
    const onMove = (e: PointerEvent) => {
      last.current = { x: e.clientX, y: e.clientY };
      if (!raf.current) raf.current = requestAnimationFrame(check);
    };
    const hide = () => { setHit(null); if (root) root.style.cursor = ""; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("scroll", hide, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("scroll", hide);
      if (root) root.style.cursor = "";
    };
  }, []);

  if (!hit) return null;
  return (
    <span className="v2-dash-tip" role="tooltip" style={{ left: hit.x, top: hit.y }}>
      {TIP}
    </span>
  );
}
