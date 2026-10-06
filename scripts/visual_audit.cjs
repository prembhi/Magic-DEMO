const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:3000';
const OUT = path.join(__dirname, 'audit_visual_pre');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const routes = [
  { name: 'home', url: '/' },
  { name: 'shop', url: '/shop' },
  { name: 'product', url: '/shop/toor-dal' },
  { name: 'bundles', url: '/bundles' },
  { name: 'recipes', url: '/recipes' },
  { name: 'impact', url: '/discover/impact' },
];

const viewports = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'mobile', w: 390, h: 844 },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.w, height: vp.h });
    for (const r of routes) {
      try {
        await page.goto(BASE + r.url, { waitUntil: 'networkidle0', timeout: 30000 });
        await page.waitForTimeout(2000);
        // Full page screenshot
        await page.screenshot({ path: path.join(OUT, `${r.name}_${vp.name}_full.png`), fullPage: true });
        // Viewport-only (above fold)
        await page.screenshot({ path: path.join(OUT, `${r.name}_${vp.name}_atf.png`), fullPage: false });
        console.log(`Captured: ${r.name} @ ${vp.name}`);
      } catch (e) {
        console.error(`Error: ${r.name} @ ${vp.name}:`, e.message);
      }
    }
    await page.close();
  }
  await browser.close();
  console.log('All screenshots captured!');
})();
