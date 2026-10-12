const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve('audit_v5_evidence');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function measureTouchTargets(page) {
  return await page.evaluate(() => {
    const selectors = [
      { name: 'Language EN', sel: 'button[title="English"]' },
      { name: 'Language AR', sel: 'button[title="العربية"]' },
      { name: 'Search Header Btn', sel: 'button[aria-label="Search"]' },
      { name: 'Cart Header Btn', sel: 'button[data-testid="cart-button"]' },
      { name: 'Mobile Menu Toggle', sel: 'button[aria-label*="menu"]' },
      { name: 'Footer Social IG', sel: 'a[aria-label="Instagram"]' },
      { name: 'Footer Social WA', sel: 'a[aria-label="WhatsApp Support"]' },
      { name: 'Footer Social YT', sel: 'a[aria-label="YouTube"]' },
      { name: 'Footer Social Mail', sel: 'a[aria-label="Email Us"]' },
      { name: 'Carousel Prev', sel: 'button[aria-label="Scroll products left"]' },
      { name: 'Carousel Next', sel: 'button[aria-label="Scroll products right"]' },
      { name: 'Hero Primary CTA', sel: '.magic-btn-primary' },
      { name: 'Hero Secondary CTA', sel: '.magic-btn-secondary' },
      { name: 'Product Add To Cart', sel: 'button[aria-label*="Add"]' },
      { name: 'FAQ Accordion 0', sel: '#faq button[aria-expanded]' },
      { name: 'Newsletter Submit', sel: '#community button[type="submit"]' }
    ];
    return selectors.map(item => {
      const el = document.querySelector(item.sel);
      if (!el) return { name: item.name, found: false };
      const rect = el.getBoundingClientRect();
      return {
        name: item.name,
        found: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    });
  });
}

async function run() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => sessionStorage.setItem('magic_intro_seen_v1', 'true'));
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });

  const targets = await measureTouchTargets(page);
  console.log('TOUCH_TARGETS_360:', JSON.stringify(targets, null, 2));

  await browser.close();
}

run().catch(console.error);
