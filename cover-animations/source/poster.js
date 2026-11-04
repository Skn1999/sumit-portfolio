const { chromium } = require('playwright'); const path = require('path'); const { execSync } = require('child_process');
(async () => { const b = await chromium.launch();
  for (const name of process.argv.slice(2)) { const p = await b.newPage({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 2 });
    await p.goto('file://' + path.resolve(name + '.html') + '?render'); await p.evaluate(() => document.fonts.ready); await p.evaluate(() => document.documentElement.classList.add('render'));
    await p.evaluate(() => renderAt(COVER.poster)); await p.screenshot({ path: `/tmp/${name}-poster.png` });
    execSync(`ffmpeg -y -loglevel error -i /tmp/${name}-poster.png -vf scale=1280:720:flags=lanczos -q:v 3 out/${name}-poster.jpg`); await p.close(); }
  await b.close(); })();
