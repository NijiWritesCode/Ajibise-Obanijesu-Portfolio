const puppeteer = require('puppeteer-core');
const path = require('path');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  console.log('Starting preview on 127.0.0.1:4195...');
  const s = spawn('npx.cmd', ['vite', 'preview', '--host', '127.0.0.1', '--port', '4195'], {
    shell: true,
  });

  const http = require('http');
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get('http://127.0.0.1:4195', (res) => resolve());
        req.on('error', reject);
      });
      console.log('Server is responsive!');
      break;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4195', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1500));

  await page.screenshot({ path: path.resolve('scripts/screenshots/new_hero_desktop.png') });
  console.log('Saved new_hero_desktop.png');

  await page.setViewport({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.resolve('scripts/screenshots/new_hero_mobile.png') });
  console.log('Saved new_hero_mobile.png');

  await browser.close();
  s.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
