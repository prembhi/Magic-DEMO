const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => sessionStorage.setItem('magic_intro_seen_v1', 'true'));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });

  // Scroll down to recipes so lazy loading triggers
  await page.evaluate(() => {
    document.getElementById('recipes').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1200));

  const imgs = await page.evaluate(() => {
    const list = Array.from(document.querySelectorAll('#recipes img'));
    return list.map(img => ({
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      clientWidth: Math.round(img.clientWidth),
      clientHeight: Math.round(img.clientHeight),
      complete: img.complete
    }));
  });
  console.log('SCROLLED_RECIPE_IMGS:', imgs);

  const recipeEl = await page.$('#recipes');
  if (recipeEl) {
    await recipeEl.screenshot({ path: 'audit_v5_evidence/debug_recipes_scrolled_1440.png' });
    console.log('Saved debug_recipes_scrolled_1440.png');
  }

  await browser.close();
})();
