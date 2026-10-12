const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve('audit_v5_3_verification');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: '360x800', width: 360, height: 800, isMobile: true },
  { name: '393x852', width: 393, height: 852, isMobile: true },
  { name: '768x1024', width: 768, height: 1024, isMobile: false },
  { name: '1024x768', width: 1024, height: 768, isMobile: false },
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
    const sections = ['#favourites', '#recipes', '#farm-to-kitchen', '#why-magic', '#faq', '#community'];
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
      const overflow = Math.max(0, docW - winW);

      // Section Headings
      const headings = [
        { id: 'favourites-heading', name: 'Kitchen Favourites' },
        { id: 'recipes-heading', name: 'Cook Something Magic' },
        { id: 'farm-provenance-heading', name: 'Farm Provenance' },
        { id: 'why-magic-heading', name: 'Why Magic' },
        { id: 'faq-heading', name: 'FAQ' }
      ].map(item => {
        const el = document.getElementById(item.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const parentRect = el.parentElement.getBoundingClientRect();
        return {
          name: item.name,
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          width: Math.round(rect.width),
          parentWidth: Math.round(parentRect.width),
          containerRatio: Math.round((rect.width / winW) * 100) + '%'
        };
      }).filter(Boolean);

      // Farm Provenance stacking
      const farmPhoto = document.querySelector('#farm-to-kitchen img[alt*="Chilli"]')?.closest('.relative');
      const farmMap = document.querySelector('#farm-to-kitchen svg')?.closest('.bg-white');
      let farmStack = null;
      if (farmPhoto && farmMap) {
        const rPhoto = farmPhoto.getBoundingClientRect();
        const rMap = farmMap.getBoundingClientRect();
        farmStack = {
          photoTop: Math.round(rPhoto.top),
          photoBottom: Math.round(rPhoto.bottom),
          mapTop: Math.round(rMap.top),
          mapBottom: Math.round(rMap.bottom),
          isStackedVertically: rMap.top >= rPhoto.bottom - 10
        };
      }

      // FAQ layout
      const faqHeader = document.getElementById('faq-heading')?.closest('div');
      const faqAccordion = document.querySelector('#faq .divide-y');
      let faqLayout = null;
      if (faqHeader && faqAccordion) {
        const rH = faqHeader.getBoundingClientRect();
        const rA = faqAccordion.getBoundingClientRect();
        faqLayout = {
          headerWidth: Math.round(rH.width),
          accordionWidth: Math.round(rA.width),
          isStacked: rA.top >= rH.bottom - 10
        };
      }

      // Carousel card info in Favourites
      const firstCard = document.querySelector('#favourites .shrink-0');
      let cardInfo = null;
      if (firstCard) {
        const rCard = firstCard.getBoundingClientRect();
        cardInfo = {
          cardWidth: Math.round(rCard.width),
          peekWidth: Math.round(winW - rCard.width)
        };
      }

      return {
        viewportWidth: winW,
        overflow,
        headings,
        farmStack,
        faqLayout,
        cardInfo
      };
    });

    console.log(`\n=================== [${vp.name}] METRICS ===================`);
    console.log(`Horizontal Overflow: ${metrics.overflow}px`);
    console.log(`Headings:`, JSON.stringify(metrics.headings, null, 2));
    console.log(`Farm Stack:`, JSON.stringify(metrics.farmStack, null, 2));
    console.log(`FAQ Layout:`, JSON.stringify(metrics.faqLayout, null, 2));
    console.log(`Favourites Card:`, JSON.stringify(metrics.cardInfo, null, 2));
  }

  await browser.close();
  console.log('\nVerification captures finished in audit_v5_3_verification/');
}

runAudit().catch(console.error);
