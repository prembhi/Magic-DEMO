const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../../audit_post');

async function testCartOpen() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/#shop', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Add an item to cart first so drawer has contents
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const addBtn = btns.find(b => b.innerText && b.innerText.includes('ADD TO CART'));
    if (addBtn) addBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Now click the cart button in the header
  const clicked = await page.evaluate(() => {
    const btn = document.querySelector('button[data-testid="cart-button"]');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  console.log(`Cart button clicked: ${clicked}`);
  await new Promise(r => setTimeout(r, 1000)); // wait for drawer slide-in animation

  const drawerVisible = await page.evaluate(() => {
    const drawer = document.querySelector('[role="dialog"]');
    return !!drawer;
  });
  console.log(`Drawer dialog in DOM: ${drawerVisible}`);

  const shotPath = path.join(OUTPUT_DIR, 'cart_drawer_open_verified.png');
  await page.screenshot({ path: shotPath });
  console.log(`Saved open cart drawer to ${shotPath}`);

  await browser.close();
}

testCartOpen().catch(err => {
  console.error(err);
  process.exit(1);
});
