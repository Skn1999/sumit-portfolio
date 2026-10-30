/* Tiny deterministic animation engine for the case-study covers.
   Each cover defines window.COVER = { dur, frame(t) } and draws everything from t (seconds).
   Live: loops with requestAnimationFrame (first frame only under reduced motion).
   Render: ?render → window.renderAt(t) is called by the frame exporter. */
(function () {
  var E = {
    clamp: function (v, a, b) { return Math.max(a, Math.min(b, v)); },
    lerp: function (a, b, p) { return a + (b - a) * p; },
    out: function (p) { return 1 - Math.pow(1 - p, 3); },
    inOut: function (p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; },
    back: function (p) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
    spring: function (p) { return p >= 1 ? 1 : 1 - Math.exp(-6 * p) * Math.cos(10 * p); },
    seg: function (t, a, b, ease) { var p = E.clamp((t - a) / (b - a), 0, 1); return (ease || E.out)(p); },
    hex: function (h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; },
    mix: function (c1, c2, p) { var a = E.hex(c1), b = E.hex(c2); return '#' + a.map(function (v, i) { var x = Math.max(0, Math.min(255, Math.round(v + (b[i] - v) * p))); return (x < 16 ? '0' : '') + x.toString(16); }).join(''); },
    $: function (s) { return document.querySelector(s); },
    css: function (el, o) { if (typeof el === 'string') el = document.querySelector(el); if (!el) return; for (var k in o) el.style[k] = o[k]; },
    set: function (s, txt) { var el = document.querySelector(s); if (el && el.textContent !== txt) el.textContent = txt; }
  };
  window.E = E;
  function fit() {
    var st = document.getElementById('stage'); if (!st || /render/.test(location.search)) return;
    var s = Math.min(innerWidth / 960, innerHeight / 540);
    st.style.transform = 'translate(-50%,-50%) scale(' + s + ')'; st.style.left = '50%'; st.style.top = '50%'; st.style.position = 'absolute';
  }
  window.addEventListener('resize', fit);
  window.addEventListener('DOMContentLoaded', function () {
    fit();
    var C = window.COVER; if (!C) return;
    window.renderAt = function (t) { C.frame(((t % C.dur) + C.dur) % C.dur); };
    if (/render/.test(location.search)) { C.frame(0); return; }
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { C.frame(C.poster || 0); return; }
    var t0 = performance.now();
    (function loop(now) { C.frame(((now - t0) / 1000) % C.dur); requestAnimationFrame(loop); })(t0);
  });
})();
