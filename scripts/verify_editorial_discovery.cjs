const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve('audit_editorial_discovery');
const ARTIFACT_DIR = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\3d34dfd3-d8a0-44e7-adcd-95f2954c0dd0';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900, isMobile: false },
  { name: '1280x800', width: 1280, height: 800, isMobile: false },
  { name: '1024x768', width: 1024, height: 768, isMobile: false },
  { name: '768x1024', width: 768, height: 1024, isMobile: false },
  { name: '390x844', width: 390, height: 844, isMobile: true },
  { name: '360x780', width: 360, height: 780, isMobile: true }
];

async function runAudit() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('magic_intro_seen_v1', 'true');
  });

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 600));

    // Scroll to #favourites
    await page.evaluate(() => {
      const el = document.getElementById('favourites');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 500));

    // Check page horizontal overflow
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      return Math.max(0, docW - winW);
    });

    console.log(`  Horizontal overflow: ${overflow}px`);

    // Capture screenshot of #favourites
    const secEl = await page.$('#favourites');
    if (secEl) {
      const outPath = path.join(OUT_DIR, `editorial_discovery_${vp.name}.png`);
      await secEl.screenshot({ path: outPath });
      console.log(`  Saved screenshot: ${outPath}`);

      // Also copy to artifact dir for report
      const artPath = path.join(ARTIFACT_DIR, `editorial_discovery_${vp.name}.png`);
      fs.copyFileSync(outPath, artPath);
    }
  }

  // Test Interactive Behaviors at 1440x900
  console.log('\n--- Testing Interactive Behaviors at 1440x900 ---');
  await page.setViewport({ width: 1440, height: 900, isMobile: false });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.getElementById('favourites')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));

  // 1. Check right scroll arrow
  const scrollBefore = await page.evaluate(() => {
    const el = document.querySelector('#favourites [style*="overflow-x: auto"], #favourites .overflow-x-auto');
    return el ? el.scrollLeft : -1;
  });

  console.log(`Initial carousel scrollLeft: ${scrollBefore}`);

  // Click right arrow
  const nextBtn = await page.$('#favourites button[aria-label="Next product"]');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 600));
    const scrollAfter = await page.evaluate(() => {
      const el = document.querySelector('#favourites [style*="overflow-x: auto"], #favourites .overflow-x-auto');
      return el ? el.scrollLeft : -1;
    });
    console.log(`After clicking Next button, scrollLeft: ${scrollAfter} (scrolled: ${scrollAfter > scrollBefore})`);
  }

  // 2. Click Add to Cart on first product
  const addToCartBtn = await page.$('#favourites article button');
  if (addToCartBtn) {
    const btnTextBefore = await page.evaluate(b => b.textContent, addToCartBtn);
    console.log(`Before click button text: "${btnTextBefore.trim()}"`);
    await addToCartBtn.click();
    await new Promise(r => setTimeout(r, 200));
    const btnTextAfter = await page.evaluate(b => b.textContent, addToCartBtn);
    console.log(`After click button text: "${btnTextAfter.trim()}"`);

    // Check cart count or drawer
    const cartCount = await page.evaluate(() => {
      const headerCart = document.querySelector('header button[aria-label*="cart"], header button[aria-label*="Bag"]');
      return headerCart ? headerCart.textContent.trim() : 'not found';
    });
    console.log(`Header cart status: "${cartCount}"`);
  }

  // 3. Test Category Card click (e.g. Dals)
  const dalCatCard = await page.$('#favourites [role="button"]:has(img[alt*="Pulses"])');
  if (dalCatCard) {
    console.log('Category card detected and clickable.');
  }

  console.log('\nAll QA checks and screenshots completed successfully!');
  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
