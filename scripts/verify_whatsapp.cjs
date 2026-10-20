const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const distDir = path.resolve('dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
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
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(distDir, 'index.html')).pipe(res);
  }
});

server.listen(4327, '127.0.0.1', async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4327', { waitUntil: 'networkidle2' });

  // 1. Check Header Let's Talk button
  const headerBtn = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const el = links.find(a => a.textContent.toLowerCase().includes("let's talk"));
    return el ? { text: el.textContent.trim(), href: el.href, target: el.target } : null;
  });
  console.log('Header Button:', headerBtn);

  // 2. Check Hero Contact Me button
  const heroBtn = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.hero-cta-group a'));
    const el = links.find(a => a.textContent.toLowerCase().includes('contact me'));
    return el ? { text: el.textContent.trim(), href: el.href, target: el.target } : null;
  });
  console.log('Hero Button:', heroBtn);

  // 3. Check Contact Section buttons
  const contactBtns = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#contact a[href*="wa.me"]')).map(a => ({
      text: a.textContent.trim(),
      href: a.href,
      target: a.target
    }));
  });
  console.log('Contact Section WhatsApp Links:', contactBtns);

  await browser.close();
  server.close();
  process.exit(0);
});
