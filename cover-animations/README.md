# Animated case-study covers

Five seamless loops, coded in HTML/CSS/JS and rendered to video.

| Cover | Loop | Story |
|---|---|---|
| `ediaqi` | 12 s | the Italian in-room display: CO₂ climbs (“Aria buona” → “Serve cambiare aria”) → “Ho aperto le finestre” → “Stiamo monitorando il recupero” → back to good air |
| `dashboard` | 8 s | 10 s of skeletons → widgets load on their own in 0.8 s → one update touches one widget |
| `aplus` | 18 s | a keyboard pass through A+ logs five minor issues → they add up to one major barrier → the prioritised fixes play back, one by one |
| `you` | 8.5 s | open Instagram to reply to one message → 23 min of scrolling → YOU nudges at the moment of drift |
| `palette` | 9 s | Intent to Palette (Lab): type an intent → palette appears and paints a preview → Fix WCAG darkens the accent to pass AA |

## Files

- `public/v2/covers/*.mp4` — 1280×720 H.264 for the site (~220–330 KB each). Use `muted loop playsinline autoplay` + `poster`.
- `public/v2/covers/*-poster.jpg` — the still for reduced motion and while the video loads.
- `cover-animations/exports/*-1080.mp4` — 1920×1080 masters.
- `cover-animations/exports/*.gif` — 720 px GIFs for LinkedIn, Read.cv, email.
- `cover-animations/source/` — the animations. Open any `.html` in a browser to watch it loop.

## Editing and re-rendering

Every frame is drawn from a single time value `t`, in `COVER.frame(t)` at the bottom of each file, so timing
changes are made in one place. To re-render:

```bash
cd cover-animations/source
npm i playwright && npx playwright install chromium   # once
node render.js ediaqi dashboard aplus you             # needs ffmpeg; writes ./out
node strip.js ediaqi 8                                # quick 8-frame contact sheet
```

## On the site

```html
<video src="/v2/covers/ediaqi.mp4" poster="/v2/covers/ediaqi-poster.jpg"
       muted loop playsinline autoplay preload="metadata"></video>
```

Pause the video when it is off screen (IntersectionObserver) and show only the poster under `prefers-reduced-motion`.
