const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => sessionStorage.setItem('magic_intro_seen_v1', 'true'));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const debugInfo = await page.evaluate(() => {
    const hero = document.getElementById('farm');
    const heroRect = hero ? hero.getBoundingClientRect() : null;
    const heroComputed = hero ? window.getComputedStyle(hero) : null;
    const ctas = document.querySelector('.magic-btn-primary')?.parentElement;
    const ctasRect = ctas ? ctas.getBoundingClientRect() : null;
    const strip = document.querySelector('section[aria-label="MAGIC Standards Strip"]');
    const stripRect = strip ? strip.getBoundingClientRect() : null;

    // Featured recipe
    const recipeArticle = document.querySelector('#recipes article');
    const recipeRect = recipeArticle ? recipeArticle.getBoundingClientRect() : null;
    const recipeCols = recipeArticle ? Array.from(recipeArticle.children).map(c => {
      const r = c.getBoundingClientRect();
      const s = window.getComputedStyle(c);
      return { tag: c.tagName, className: c.className, left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height), zIndex: s.zIndex, position: s.position };
    }) : [];

    return {
      hero: { top: Math.round(heroRect?.top || 0), bottom: Math.round(heroRect?.bottom || 0), height: Math.round(heroRect?.height || 0), computedHeight: heroComputed?.height },
      ctas: { top: Math.round(ctasRect?.top || 0), bottom: Math.round(ctasRect?.bottom || 0), height: Math.round(ctasRect?.height || 0) },
      strip: { top: Math.round(stripRect?.top || 0), bottom: Math.round(stripRect?.bottom || 0), height: Math.round(stripRect?.height || 0) },
      recipe: { width: Math.round(recipeRect?.width || 0), height: Math.round(recipeRect?.height || 0) },
      recipeCols
    };
  });

  console.log('DEBUG_INFO_1440:', JSON.stringify(debugInfo, null, 2));

  // Also check at 1024x768 and 360x800
  await page.setViewport({ width: 1024, height: 768 });
  await new Promise(r => setTimeout(r, 400));
  const debug1024 = await page.evaluate(() => {
    const hero = document.getElementById('farm');
    const heroRect = hero ? hero.getBoundingClientRect() : null;
    const ctas = document.querySelector('.magic-btn-primary')?.parentElement;
    const ctasRect = ctas ? ctas.getBoundingClientRect() : null;
    const strip = document.querySelector('section[aria-label="MAGIC Standards Strip"]');
    const stripRect = strip ? strip.getBoundingClientRect() : null;
    return {
      hero: { bottom: Math.round(heroRect?.bottom || 0), height: Math.round(heroRect?.height || 0) },
      ctas: { bottom: Math.round(ctasRect?.bottom || 0) },
      strip: { top: Math.round(stripRect?.top || 0) }
    };
  });
  console.log('DEBUG_INFO_1024:', JSON.stringify(debug1024, null, 2));

  await browser.close();
})();
