const puppeteer = require("puppeteer-core");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function testCart() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 4200));

  const hasLoader = await page.evaluate(() => {
    return document.querySelector("[aria-label=\"MAGIC Loading Experience\"]") !== null;
  });
  console.log("Loader unmounted from DOM:", !hasLoader);

  const overflowVal = await page.evaluate(() => document.body.style.overflow);
  console.log("Body overflow value after unmount:", JSON.stringify(overflowVal));

  const cartButton = await page.$("button[data-testid=\"cart-button\"]");
  if (cartButton) {
    await cartButton.click();
    await new Promise(r => setTimeout(r, 600));
    const cartOpen = await page.evaluate(() => {
      const drawer = document.querySelector("aside, [role=\"dialog\"]");
      return drawer !== null;
    });
    console.log("Cart interacts normally:", cartOpen);
  }

  await browser.close();
}

testCart().catch(err => {
  console.error(err);
  process.exit(1);
});
