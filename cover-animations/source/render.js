const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs'); const { execSync } = require('child_process');
(async () => {
  const names = process.argv.slice(2); const FPS = 30;
  const b = await chromium.launch();
  for (const name of names) {
    const dir = `/tmp/frames_${name}`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
    const p = await b.newPage({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 2 });
    await p.goto('file://' + path.resolve(name + '.html') + '?render'); await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => document.documentElement.classList.add('render'));
    const { dur, poster } = await p.evaluate(() => ({ dur: COVER.dur, poster: COVER.poster }));
    const n = Math.round(dur * FPS);
    for (let i = 0; i < n; i++) { await p.evaluate(t => renderAt(t), i / FPS); await p.screenshot({ path: `${dir}/f${String(i).padStart(4, '0')}.png` }); }
    await p.evaluate(t => renderAt(t), poster); await p.screenshot({ path: `${dir}/poster.png` });
    await p.close();
    const out = 'out'; fs.mkdirSync(out, { recursive: true });
    const inp = `-framerate ${FPS} -i ${dir}/f%04d.png`;
    execSync(`ffmpeg -y -loglevel error ${inp} -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart ${out}/${name}-1080.mp4`);
    execSync(`ffmpeg -y -loglevel error ${inp} -vf scale=1280:720:flags=lanczos -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart ${out}/${name}.mp4`);
    execSync(`ffmpeg -y -loglevel error ${inp} -vf scale=1280:720:flags=lanczos -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -an ${out}/${name}.webm`);
    execSync(`ffmpeg -y -loglevel error -i ${dir}/poster.png -vf scale=1280:720:flags=lanczos -q:v 3 ${out}/${name}-poster.jpg`);
    execSync(`ffmpeg -y -loglevel error ${inp} -vf "fps=15,scale=720:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" ${out}/${name}.gif`);
    console.log(name, n, 'frames');
  }
  await b.close();
})();
