const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve('audit_v5_2_verification');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900, isMobile: false },
  { name: '1024x768', width: 1024, height: 768, isMobile: false },
  { name: '768x1024', width: 768, height: 1024, isMobile: false },
  { name: '390x844', width: 390, height: 844, isMobile: true },
  { name: '360x800', width: 360, height: 800, isMobile: true }
];

async function verifySections() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => sessionStorage.setItem('magic_intro_seen_v1', 'true'));

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
    await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // 1. Capture Hero + Benefits Strip
    const heroEl = await page.$('#farm');
    const stripEl = await page.$('section[aria-label="MAGIC Standards Strip"]');

    // Screenshot fold (Hero + top of Benefits)
    await page.screenshot({ path: path.join(OUT_DIR, `01_hero_benefits_${vp.name}.png`) });

    // Check DOM dimensions of hero and CTAs
    const heroInfo = await page.evaluate(() => {
      const hero = document.getElementById('farm');
      const ctas = document.querySelector('.magic-btn-primary')?.parentElement;
      const strip = document.querySelector('section[aria-label="MAGIC Standards Strip"]');
      const heroB = hero.getBoundingClientRect().bottom;
      const ctaB = ctas.getBoundingClientRect().bottom;
      const stripT = strip.getBoundingClientRect().top;
      return {
        heroBottom: Math.round(heroB),
        ctaBottom: Math.round(ctaB),
        stripTop: Math.round(stripT),
        ctaClearance: Math.round(stripT - ctaB)
      };
    });
    console.log(`[${vp.name}] Hero CTA Clearance: ${heroInfo.ctaClearance}px`);

    // 2. Scroll to and capture Cook Something Magic (#recipes)
    await page.evaluate(() => {
      document.getElementById('recipes').scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 800));

    const recipeEl = await page.$('#recipes');
    if (recipeEl) {
      await recipeEl.screenshot({ path: path.join(OUT_DIR, `02_cook_with_magic_${vp.name}.png`) });
    }

    const recipeInfo = await page.evaluate(() => {
      const article = document.querySelector('#recipes article');
      const col1 = article.children[0];
      const col2 = article.children[1];
      const r1 = col1.getBoundingClientRect();
      const r2 = col2.getBoundingClientRect();
      const overlap = (r1.right > r2.left && r1.bottom > r2.top && window.innerWidth >= 1024)
        ? Math.round(r1.right - r2.left)
        : 0;
      return {
        col1Width: Math.round(r1.width),
        col2Width: Math.round(r2.width),
        overlap,
        isStacked: r2.top >= r1.bottom - 5
      };
    });
    console.log(`[${vp.name}] Recipe Info:`, recipeInfo);
  }

  await browser.close();
  console.log('Verification finished! All screenshots saved in audit_v5_2_verification/');
}

verifySections().catch(console.error);
