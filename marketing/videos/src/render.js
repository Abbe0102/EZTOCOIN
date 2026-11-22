// Renders EZTO vertical videos to ../out/<id>.mp4 (1080x1920, 30 fps, H.264, no audio).
// Usage:  node render.js [id ...]          render all (or the given) videos
//         node render.js --preview <dir>   save a few still frames per video for review
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const FPS = 30;
const PAGE = 'file://' + path.join(__dirname, 'video.html');

async function open(browser, id) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto(`${PAGE}?v=${id}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

async function renderVideo(browser, id) {
  const page = await open(browser, id);
  const total = await page.evaluate(() => window.VIDEO_TOTAL);
  const out = path.join(__dirname, '..', 'out', `${id}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'medium', '-crf', '18', '-movflags', '+faststart', out]);
  const frames = Math.round(total * FPS);
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.seek(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg ' + c)))));
  await page.close();
  console.log(`wrote ${path.relative(process.cwd(), out)} (${total}s, ${frames} frames)`);
}

async function preview(browser, id, dir) {
  const page = await open(browser, id);
  const total = await page.evaluate(() => window.VIDEO_TOTAL);
  const times = [];
  for (let t = 1.5; t < total; t += 2) times.push(t);
  times.push(total - 0.6);
  for (const t of times) {
    await page.evaluate((x) => window.seek(x), t);
    await page.screenshot({ path: path.join(dir, `${id}-${t.toFixed(1)}.png`) });
  }
  await page.close();
}

(async () => {
  const args = process.argv.slice(2);
  const browser = await chromium.launch();
  const probe = await open(browser, 'red-flags');
  const all = await probe.evaluate(() => window.VIDEO_IDS);
  await probe.close();
  if (args[0] === '--preview') {
    const dir = args[1]; fs.mkdirSync(dir, { recursive: true });
    for (const id of all) await preview(browser, id, dir);
  } else {
    for (const id of args.length ? args : all) await renderVideo(browser, id);
  }
  await browser.close();
})();
