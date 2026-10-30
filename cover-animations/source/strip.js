// node strip.js name n  -> name-strip.png with n frames across the loop (2 rows)
const { chromium } = require('playwright'); const path = require('path'); const { execSync } = require('child_process');
(async () => {
  const name = process.argv[2], n = +(process.argv[3] || 8);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(name + '.html') + '?render'); await p.evaluate(() => document.fonts.ready); await p.evaluate(() => document.documentElement.classList.add('render'));
  const dur = await p.evaluate(() => COVER.dur); const files = [];
  for (let i = 0; i < n; i++) { const t = dur * i / n; await p.evaluate(t => renderAt(t), t); const f = `/tmp/strip_${i}.png`; await p.screenshot({ path: f }); files.push(f); }
  await b.close();
  const half = Math.ceil(n / 2);
  execSync(`ffmpeg -y -loglevel error ${files.map(f => '-i ' + f).join(' ')} -filter_complex "${files.map((f, i) => `[${i}]scale=480:270,drawtext=text='${(dur * i / n).toFixed(1)}s':x=8:y=8:fontcolor=black:box=1:boxcolor=white@0.7:fontsize=16[v${i}]`).join(';')};${files.map((f, i) => `[v${i}]`).join('')}xstack=inputs=${n}:layout=${files.map((f, i) => `${(i % half) ? Array.from({ length: i % half }, () => 'w0').join('+') : '0'}_${i >= half ? 'h0' : '0'}`).join('|')}" ${name}-strip.png`);
  console.log(name, 'dur', dur, errs.length ? 'ERR ' + errs : 'ok');
})();
