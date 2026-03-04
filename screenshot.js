const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const captureDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(captureDir)) fs.mkdirSync(captureDir);
  
  await page.setViewportSize({ width: 1280, height: 800 });
  console.log("Navigating to http://localhost:3000");
  await page.goto('http://localhost:3000');
  
  console.log("Waiting for welcome screen...");
  await page.waitForTimeout(5000); // Wait for typing animation
  await page.screenshot({ path: path.join(captureDir, '01_homepage.png') });
  
  console.log("Clicking Begin Reading...");
  await page.click('button:has-text("Begin")');
  await page.waitForTimeout(2500); // Wait for typing animation
  await page.screenshot({ path: path.join(captureDir, '02_spread_select.png') });
  
  console.log("Selecting Spread...");
  await page.click('.spread-card'); // Click first spread
  await page.waitForTimeout(2500); // Wait for typing animation
  await page.screenshot({ path: path.join(captureDir, '03_question.png') });
  
  console.log("Entering Question...");
  await page.fill('textarea', 'Will I achieve my goals?');
  await page.click('button:has-text("Reveal My Question")');
  await page.waitForTimeout(2500); // Wait for typing animation
  await page.screenshot({ path: path.join(captureDir, '04_user_info.png') });
  
  console.log("Skipping User Info...");
  await page.click('button:has-text("Skip")');
  await page.waitForTimeout(2500); // wait for typing "Shuffle the deck..."
  await page.screenshot({ path: path.join(captureDir, '05_card_pick.png') });
  
  console.log("Picking a card...");
  // Use the correct class from the component
  await page.click('.card-slot'); 
  await page.waitForTimeout(5000); // Wait for reveal animation AND transition to loading screen
  await page.screenshot({ path: path.join(captureDir, '06_loading.png') });
  
  console.log("Waiting for Reading Result...");
  // The reading can take a long time to generate.
  try {
    await page.waitForSelector('.reading-result', { timeout: 60000 });
    await page.waitForTimeout(3000); // Give it some time to start typing out text
    await page.screenshot({ path: path.join(captureDir, '07_reading_result.png') });
  } catch (e) {
    console.log("Timeout waiting for reading result or selector not found. Still saving a screenshot.");
    await page.screenshot({ path: path.join(captureDir, '07_reading_result_fallback.png') });
  }
  
  await browser.close();
  console.log("Screenshots captured successfully!");
})();
