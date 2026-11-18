// Renders every post in posts.html to ../posts/<n>-<id>.png (1080x1350).
// Usage: node render.js   (needs Playwright + Chromium)
const { chromium } = require('playwright');
const path = require('path');
const POSTS = ['manifesto', 'website', 'what', 'clean', 'tokenomics', 'roadmap', 'safety'];
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [i, id] of POSTS.entries()) {
    await page.goto(`file://${path.join(__dirname, 'posts.html')}?post=${id}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(__dirname, '..', 'posts', `${i + 1}-${id}.png`);
    await page.screenshot({ path: out });
    console.log('wrote', path.relative(process.cwd(), out));
  }
  await browser.close();
})();
