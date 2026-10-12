const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_v3_pass");

async function snapRedFull() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 2900));
  await page.screenshot({ path: path.join(OUT_DIR, "desktop_1280x720_5_red_wipe.png") });
  await page.close();
  await browser.close();
  console.log("Captured 100% full red wipe at 2900ms");
}

snapRedFull();
