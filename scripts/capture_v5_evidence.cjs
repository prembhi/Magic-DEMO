const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve('audit_v5_evidence');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: '360x800', width: 360, height: 800, isMobile: true },
  { name: '390x844', width: 390, height: 844, isMobile: true },
  { name: '768x1024', width: 768, height: 1024, isMobile: false },
  { name: '1024x768', width: 1024, height: 768, isMobile: false },
  { name: '1280x800', width: 1280, height: 800, isMobile: false },
  { name: '1440x900', width: 1440, height: 900, isMobile: false }
];

async function captureAll() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('magic_intro_seen_v1', 'true');
  });

  console.log('Capturing Homepage across all viewports...');
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
    await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Full page screenshot
    const fullPath = path.join(OUT_DIR, `homepage_full_${vp.name}.png`);
    await page.screenshot({ path: fullPath, fullPage: true });

    // Above the fold
    const foldPath = path.join(OUT_DIR, `homepage_fold_${vp.name}.png`);
    await page.screenshot({ path: foldPath });
    console.log(`Captured homepage: ${vp.name}`);
  }

  // Routes: Shop, Single Product, Recipes, Cart Drawer
  const ROUTES = [
    { name: 'shop', url: 'http://localhost:3000/#shop' },
    { name: 'product', url: 'http://localhost:3000/#shop/product/magic-toor-dal' },
    { name: 'recipes', url: 'http://localhost:3000/#recipes' },
    { name: 'impact', url: 'http://localhost:3000/#impact' },
    { name: 'bundles', url: 'http://localhost:3000/#bundles' }
  ];

  for (const route of ROUTES) {
    for (const vp of [VIEWPORTS[0], VIEWPORTS[5]]) { // 360 and 1440
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
      await page.goto(route.url, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 700));

      const outPath = path.join(OUT_DIR, `${route.name}_${vp.name}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Captured ${route.name} at ${vp.name}`);
    }
  }

  // Open Cart Drawer
  for (const vp of [VIEWPORTS[0], VIEWPORTS[5]]) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
    await page.goto('http://localhost:3000/#shop', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Add product to cart to populate drawer
    await page.evaluate(() => {
      const addBtn = document.querySelector('button[aria-label*="Add"]');
      if (addBtn) addBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Open Cart
    await page.evaluate(() => {
      const cartBtn = document.querySelector('button[data-testid="cart-button"]');
      if (cartBtn) cartBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const cartPath = path.join(OUT_DIR, `cart_drawer_${vp.name}.png`);
    await page.screenshot({ path: cartPath });
    console.log(`Captured cart drawer at ${vp.name}`);
  }

  // Open Mobile Menu Navigation Drawer at 360px
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    const menuBtn = document.querySelector('button[aria-label*="Open menu"]');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  const navPath = path.join(OUT_DIR, `mobile_menu_nav_360x800.png`);
  await page.screenshot({ path: navPath });
  console.log('Captured mobile menu navigation drawer');

  await browser.close();
  console.log('ALL AUDIT EVIDENCE SCREENSHOTS SUCCESSFULLY CAPTURED!');
}

captureAll().catch(console.error);
