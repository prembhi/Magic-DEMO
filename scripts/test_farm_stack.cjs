const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => sessionStorage.setItem('magic_intro_seen_v1', 'true'));
  await page.setViewport({ width: 393, height: 852, isMobile: true });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.getElementById('farm-to-kitchen')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));

  const res = await page.evaluate(() => {
    const sec = document.getElementById('farm-to-kitchen');
    const cols = sec.querySelectorAll('.grid > div');
    const col1 = cols[0];
    const col2 = cols[1];
    const r1 = col1.getBoundingClientRect();
    const r2 = col2.getBoundingClientRect();
    return {
      col1Bottom: Math.round(r1.bottom),
      col2Top: Math.round(r2.top),
      col1Width: Math.round(r1.width),
      col2Width: Math.round(r2.width),
      isStackedVertically: r2.top >= r1.bottom - 5,
      gap: Math.round(r2.top - r1.bottom)
    };
  });
  console.log('Farm Section Mobile Stacking at 393px:', res);
  await browser.close();
})();
