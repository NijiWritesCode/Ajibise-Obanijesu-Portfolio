const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const distDir = path.resolve(__dirname, '..', 'dist');

// Simple static server for dist
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA fallback
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(distDir, 'index.html')).pipe(res);
  }
});

server.listen(4200, '127.0.0.1', async () => {
  console.log('Static server running on http://127.0.0.1:4200');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Desktop Screenshot
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4200', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.resolve(__dirname, 'screenshots', 'new_hero_desktop.png') });
  console.log('Captured new_hero_desktop.png');

  // Tablet Screenshot (iPad 768x1024)
  await page.setViewport({ width: 768, height: 1024 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.resolve(__dirname, 'screenshots', 'hero_tablet.png') });
  console.log('Captured hero_tablet.png');

  // Mobile Screenshot (iPhone 375x812)
  await page.setViewport({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.resolve(__dirname, 'screenshots', 'new_hero_mobile.png') });
  console.log('Captured new_hero_mobile.png');

  // Mobile Scrolled
  await page.evaluate(() => window.scrollBy(0, 480));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.resolve(__dirname, 'screenshots', 'new_hero_mobile_scrolled.png') });
  console.log('Captured new_hero_mobile_scrolled.png');

  // Work section desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.resolve(__dirname, 'screenshots', 'work_section_desktop.png') });
  console.log('Captured work_section_desktop.png');

  await browser.close();
  server.close();
  console.log('All done!');
  process.exit(0);
});
