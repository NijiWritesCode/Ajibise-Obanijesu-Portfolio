const puppeteer = require('puppeteer-core');
const path = require('path');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const s = spawn('npx.cmd', ['vite', 'preview', '--port', '4190'], { shell: true });
  await new Promise((r) => setTimeout(r, 2500));

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4190', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('scripts/screenshots/new_hero_desktop.png') });
  console.log('Saved new_hero_desktop.png');

  // Mobile
  await page.setViewport({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.resolve('scripts/screenshots/new_hero_mobile.png') });
  console.log('Saved new_hero_mobile.png');

  await browser.close();
  s.kill();
  process.exit(0);
}

run();
