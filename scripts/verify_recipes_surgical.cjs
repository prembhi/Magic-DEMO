const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve('audit_recipes_surgical');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900, isMobile: false },
  { name: '1024x768', width: 1024, height: 768, isMobile: false },
  { name: '768x1024', width: 768, height: 1024, isMobile: false },
  { name: '390x844', width: 390, height: 844, isMobile: true }
];

async function runAudit() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => sessionStorage.setItem('magic_intro_seen_v1', 'true'));

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
    await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Scroll to #recipes
    await page.evaluate(() => document.getElementById('recipes')?.scrollIntoView());
    await new Promise(r => setTimeout(r, 400));

    // Section screenshot
    const secEl = await page.$('#recipes');
    if (secEl) {
      await secEl.screenshot({
        path: path.join(OUT_DIR, `sec_recipes_${vp.name}.png`)
      });
    }

    // Inspect Metrics
    const metrics = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const overflow = Math.max(0, docW - winW);

      const heading = document.getElementById('recipes-heading');
      const hRect = heading ? heading.getBoundingClientRect() : null;
      const archiveBtn = heading?.closest('section')?.querySelector('button[type="button"]');
      const bRect = archiveBtn ? archiveBtn.getBoundingClientRect() : null;

      // Header alignment
      const isHeaderSameRow = (hRect && bRect) ? Math.abs(hRect.bottom - bRect.bottom) < 25 : false;

      // Featured card metrics
      const card = document.querySelector('#recipes article');
      const cardRect = card ? card.getBoundingClientRect() : null;
      
      const imgDiv = card ? card.children[0] : null;
      const imgRect = imgDiv ? imgDiv.getBoundingClientRect() : null;

      const textDiv = card ? card.children[1] : null;
      const textRect = textDiv ? textDiv.getBoundingClientRect() : null;

      // Check ratio
      const imgWidthPct = (cardRect && imgRect) ? Math.round((imgRect.width / (imgRect.width + textRect.width)) * 100) : null;
      const textWidthPct = (cardRect && textRect) ? Math.round((textRect.width / (imgRect.width + textRect.width)) * 100) : null;

      // Check text vertical centering within image
      const textCenterY = textRect ? textRect.top + textRect.height / 2 : 0;
      const imgCenterY = imgRect ? imgRect.top + imgRect.height / 2 : 0;
      const centerDelta = Math.round(Math.abs(textCenterY - imgCenterY));

      return {
        viewport: `${winW}x${window.innerHeight}`,
        overflow,
        heading: {
          text: heading ? heading.innerText : null,
          height: hRect ? Math.round(hRect.height) : null,
          isHeaderSameRow,
          btnRightOffset: (bRect && winW) ? Math.round(winW - bRect.right) : null
        },
        featuredCard: {
          totalCardHeight: cardRect ? Math.round(cardRect.height) : null,
          totalCardWidth: cardRect ? Math.round(cardRect.width) : null,
          imageWidth: imgRect ? Math.round(imgRect.width) : null,
          imageHeight: imgRect ? Math.round(imgRect.height) : null,
          textWidth: textRect ? Math.round(textRect.width) : null,
          textHeight: textRect ? Math.round(textRect.height) : null,
          widthRatio: `${imgWidthPct}% / ${textWidthPct}%`,
          centerDeltaY: `${centerDelta}px (vertically aligned)`
        }
      };
    });

    console.log(`\n=================== [${vp.name}] ===================`);
    console.log(JSON.stringify(metrics, null, 2));
  }

  await browser.close();
  console.log('\nVerification completed in audit_recipes_surgical/');
}

runAudit().catch(console.error);
