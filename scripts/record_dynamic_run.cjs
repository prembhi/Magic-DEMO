const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("audit_curtain_transition_verify");

async function recordLiveRun() {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.evaluateOnNewDocument(() => sessionStorage.clear());
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  let snapA = false, snapB = false, snapC = false, snapD = false, snapE = false;
  const start = Date.now();

  while (Date.now() - start < 5000) {
    const elapsed = Date.now() - start;
    const info = await page.evaluate(() => {
      const spiceScene = document.querySelector('[role="dialog"]');
      const curtain = document.querySelector('.magic-curtain');
      let curtainRect = null;
      if (curtain) {
        const r = curtain.getBoundingClientRect();
        curtainRect = { top: Math.round(r.top), bottom: Math.round(r.bottom) };
      }
      return {
        hasSpiceScene: !!spiceScene,
        hasCurtain: !!curtain,
        curtainRect,
        curtainClass: curtain ? curtain.className : ''
      };
    });

    // Stage A: Spices settled (around 2250ms)
    if (!snapA && elapsed >= 2250 && elapsed <= 2350) {
      snapA = true;
      await page.screenshot({ path: path.join(OUT_DIR, "stage_A_spices_settled.png") });
      console.log(`Snapped Stage A at ${elapsed}ms:`, JSON.stringify(info));
    }

    // Stage B: Solid MAGIC Red screen (curtain covers 100%, top <= 0, bottom >= 720, no spice scene)
    if (!snapB && info.hasCurtain && !info.hasSpiceScene && info.curtainRect.top === 0 && info.curtainRect.bottom === 720) {
      snapB = true;
      await page.screenshot({ path: path.join(OUT_DIR, "stage_B_solid_red_screen.png") });
      console.log(`Snapped Stage B at ${elapsed}ms:`, JSON.stringify(info));
    }

    // Stage C: Curtain approximately halfway through exit (curtainRect.bottom between 280 and 420)
    if (!snapC && snapB && info.hasCurtain && info.curtainRect && info.curtainRect.bottom >= 250 && info.curtainRect.bottom <= 450) {
      snapC = true;
      await page.screenshot({ path: path.join(OUT_DIR, "stage_C_curtain_halfway_exit.png") });
      console.log(`Snapped Stage C at ${elapsed}ms:`, JSON.stringify(info));
    }

    // Stage D: Curtain almost fully outside viewport (curtainRect.bottom between 5 and 260)
    if (!snapD && snapB && info.hasCurtain && info.curtainRect && info.curtainRect.bottom >= 5 && info.curtainRect.bottom <= 260) {
      snapD = true;
      await page.screenshot({ path: path.join(OUT_DIR, "stage_D_curtain_almost_exited.png") });
      console.log(`Snapped Stage D at ${elapsed}ms:`, JSON.stringify(info));
    }

    // Stage E: Homepage fully revealed (curtain removed, spice scene removed)
    if (!snapE && snapB && !info.hasCurtain && !info.hasSpiceScene) {
      snapE = true;
      await page.screenshot({ path: path.join(OUT_DIR, "stage_E_homepage_fully_revealed.png") });
      console.log(`Snapped Stage E at ${elapsed}ms:`, JSON.stringify(info));
      break;
    }

    await new Promise(r => setTimeout(r, 10));
  }

  await browser.close();
}

recordLiveRun().catch(console.error);
