const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve('audit_v5_4_verification');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: '360x800', width: 360, height: 800, isMobile: true },
  { name: '393x852', width: 393, height: 852, isMobile: true },
  { name: '768x1024', width: 768, height: 1024, isMobile: false },
  { name: '1440x900', width: 1440, height: 900, isMobile: false }
];

async function runAudit() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => sessionStorage.setItem('magic_intro_seen_v1', 'true'));

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
    await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Full page capture
    await page.screenshot({
      path: path.join(OUT_DIR, `full_page_${vp.name}.png`),
      fullPage: true
    });

    // Capture sections individually
    const sections = ['#farm', '#favourites', '#recipes', '#farm-to-kitchen', '#why-magic', '#faq', '#community'];
    for (const sec of sections) {
      const el = await page.$(sec);
      if (el) {
        await page.evaluate(s => document.querySelector(s)?.scrollIntoView(), sec);
        await new Promise(r => setTimeout(r, 200));
        await el.screenshot({
          path: path.join(OUT_DIR, `sec_${sec.replace('#', '')}_${vp.name}.png`)
        });
      }
    }

    // Inspect Metrics
    const metrics = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const docH = document.documentElement.scrollHeight;
      const overflow = Math.max(0, docW - winW);

      // Section Headings inspection
      const headings = [
        { id: '#farm h1', name: 'Hero Main' },
        { id: '#favourites-heading', name: 'Kitchen Favourites' },
        { id: '#recipes-heading', name: 'Cook Something Magic' },
        { id: '#farm-provenance-heading', name: 'Farm Sourcing' },
        { id: '#why-magic-heading', name: 'Why Magic Different' },
        { id: '#faq-heading', name: 'FAQ Good to Know' },
        { id: '#community h2', name: 'Community Delivered' }
      ].map(item => {
        const el = document.querySelector(item.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const lh = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.1;
        const linesApprox = Math.round(rect.height / lh);
        return {
          name: item.name,
          text: el.innerText.replace(/\n+/g, ' | '),
          fontSize: style.fontSize,
          height: Math.round(rect.height),
          lineHeight: style.lineHeight,
          computedLines: linesApprox,
          width: Math.round(rect.width)
        };
      }).filter(Boolean);

      return {
        viewport: `${winW}x${window.innerHeight}`,
        docHeight: docH,
        overflow,
        headings
      };
    });

    console.log(`\n=================== [${vp.name}] METRICS ===================`);
    console.log(`Document Height: ${metrics.docHeight}px | Overflow: ${metrics.overflow}px`);
    console.log(`Headings:`, JSON.stringify(metrics.headings, null, 2));
  }

  await browser.close();
  console.log('\nVerification captures finished in audit_v5_4_verification/');
}

runAudit().catch(console.error);
