const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../../audit_pre');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, isMobile: false },
  tablet: { width: 1024, height: 768, isMobile: false },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
};

const ROUTES = [
  { name: 'home', url: 'http://localhost:3000/' },
  { name: 'shop', url: 'http://localhost:3000/#shop' },
  { name: 'product', url: 'http://localhost:3000/#shop/product/magic-toor-dal' },
  { name: 'bundles', url: 'http://localhost:3000/#bundles' },
  { name: 'recipes', url: 'http://localhost:3000/#recipes' },
  { name: 'impact', url: 'http://localhost:3000/#impact' },
];

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const auditReport = [];

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    console.log(`\n=== Testing Viewport: ${vpName} (${vp.width}x${vp.height}) ===`);
    const page = await browser.newPage();
    await page.setViewport(vp);

    for (const route of ROUTES) {
      console.log(`Testing ${route.name} at ${vpName}...`);
      await page.goto(route.url, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1200)); // wait for layout/fonts to settle

      // Measure horizontal overflow
      const metrics = await page.evaluate(() => {
        const scrollW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        const overflow = scrollW - clientW;

        // Check for elements jutting out
        const juttingElements = [];
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > window.innerWidth + 1.5 || r.left < -1.5) {
            juttingElements.push({
              tag: el.tagName,
              className: (el.className || '').toString().slice(0, 100),
              id: el.id,
              left: Math.round(r.left),
              right: Math.round(r.right),
              width: Math.round(r.width),
              text: el.innerText ? el.innerText.slice(0, 50).replace(/\n/g, ' ') : ''
            });
          }
        });

        // Check font families in use
        const bannedFontsDetected = [];
        const bannedList = ['fraunces', 'inter', 'plus jakarta sans', 'monospace', 'mono'];
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, span, label').forEach(el => {
          const ff = window.getComputedStyle(el).fontFamily.toLowerCase();
          for (const b of bannedList) {
            if (ff.includes(b)) {
              bannedFontsDetected.push({
                banned: b,
                fontFamily: ff,
                tag: el.tagName,
                text: el.innerText ? el.innerText.slice(0, 30) : ''
              });
              break;
            }
          }
        });

        // Check small touch targets (<44px) on interactive elements
        const smallTouchTargets = [];
        document.querySelectorAll('button, a, input, select').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) {
            const style = window.getComputedStyle(el);
            if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
              smallTouchTargets.push({
                tag: el.tagName,
                className: (el.className || '').toString().slice(0, 80),
                text: el.innerText ? el.innerText.slice(0, 30).trim() : el.getAttribute('aria-label') || '',
                width: Math.round(r.width),
                height: Math.round(r.height)
              });
            }
          }
        });

        return {
          scrollWidth: scrollW,
          clientWidth: clientW,
          overflow,
          juttingCount: juttingElements.length,
          juttingElements: juttingElements.slice(0, 10),
          bannedFontsCount: bannedFontsDetected.length,
          bannedFontsDetected: bannedFontsDetected.slice(0, 5),
          smallTouchCount: smallTouchTargets.length,
          smallTouchTargets: smallTouchTargets.slice(0, 10)
        };
      });

      console.log(`  Overflow: ${metrics.overflow}px (scrollWidth: ${metrics.scrollWidth}, clientWidth: ${metrics.clientWidth})`);
      if (metrics.overflow > 0) {
        console.log(`  WARNING: Jutting elements found:`, metrics.juttingElements);
      }
      if (metrics.bannedFontsCount > 0) {
        console.log(`  WARNING: Banned fonts detected:`, metrics.bannedFontsDetected);
      }

      auditReport.push({
        viewport: vpName,
        route: route.name,
        ...metrics
      });

      // Take screenshot
      const shotPath = path.join(OUTPUT_DIR, `${route.name}_${vpName}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
      console.log(`  Screenshot saved to ${shotPath}`);

      // Also for product page, check the single product add to cart button text
      if (route.name === 'product') {
        const atcText = await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const atc = btns.find(b => b.innerText && b.innerText.includes('ADD TO CART'));
          return atc ? atc.innerText : 'NOT FOUND';
        });
        console.log(`  Product ATC Button Text: "${atcText}"`);
      }
    }

    // Special test: Cart drawer test
    if (vpName === 'desktop' || vpName === 'mobile') {
      console.log(`Testing Cart Drawer at ${vpName}...`);
      await page.goto('http://localhost:3000/#shop', { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1000));
      // Click a product Add to Cart to open or add
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const addBtn = btns.find(b => b.innerText && (b.innerText.includes('Add') || b.innerText.includes('ADD')));
        if (addBtn) {
          addBtn.click();
        }
      });
      await new Promise(r => setTimeout(r, 1200));
      const cartShotPath = path.join(OUTPUT_DIR, `cart_drawer_${vpName}.png`);
      await page.screenshot({ path: cartShotPath, fullPage: false });
      console.log(`  Cart drawer screenshot saved to ${cartShotPath}`);
    }

    await page.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'audit_pre_report.json'),
    JSON.stringify(auditReport, null, 2)
  );
  console.log('\nAudit complete! Report written to audit_pre_report.json');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
