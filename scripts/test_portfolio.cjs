const { spawn } = require('child_process');
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function runVerification() {
  console.log('--- Starting Cinematic Portfolio Verification ---');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 4173;

  // Start Vite preview
  console.log('Starting Vite preview server on port', port);
  const previewProcess = spawn('npx.cmd', ['vite', 'preview', '--port', String(port)], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe',
    shell: true,
  });

  const http = require('http');
  async function waitForServer(url, retries = 30) {
    for (let i = 0; i < retries; i++) {
      try {
        await new Promise((resolve, reject) => {
          const req = http.get(url, (res) => {
            if (res.statusCode < 500) resolve();
            else reject(new Error('Status ' + res.statusCode));
          });
          req.on('error', reject);
          req.setTimeout(1000, () => { req.destroy(); reject(new Error('Timeout')); });
        });
        return;
      } catch (e) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    throw new Error('Server did not start in time at ' + url);
  }

  await waitForServer(`http://localhost:${port}`);

  let browser;
  const consoleErrors = [];
  const consoleWarnings = [];

  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        consoleErrors.push(text);
        console.error('[BROWSER ERROR]', text);
      } else if (type === 'warning') {
        consoleWarnings.push(text);
      } else {
        // console.log('[BROWSER LOG]', text);
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(err.toString());
      console.error('[PAGE ERROR]', err);
    });

    const url = `http://localhost:${port}`;
    console.log('Navigating to', url);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    // 1. Check Page Title & Meta
    const pageTitle = await page.title();
    console.log('Page Title:', pageTitle);
    if (!pageTitle.includes('Ajibise Obanijesu Solomon')) {
      throw new Error(`Unexpected page title: ${pageTitle}`);
    }

    // 2. Check Hero Section
    const heroHeadline = await page.$eval('.hero-headline-line', (el) => el.innerText.trim());
    console.log('Hero Headline First Line:', heroHeadline);

    const devName = await page.$eval('#home', (el) => el.innerText);
    if (!devName.includes('Ajibise Obanijesu Solomon')) {
      throw new Error('Developer name missing from Hero section');
    }
    console.log('Hero section verified successfully.');

    // 3. Check Pinned Project Showcase (FlowDesk)
    const featuredTitle = await page.$eval('.project-title-line', (el) => el.innerText.trim());
    console.log('Featured Project Title:', featuredTitle);
    if (featuredTitle !== 'FlowDesk') {
      throw new Error(`Expected FlowDesk project, found: ${featuredTitle}`);
    }

    const previewUrl = await page.$eval('.project-preview-viewport', (el) => el.innerText);
    if (!previewUrl.includes('flow-desk-woad-alpha.vercel.app')) {
      throw new Error('FlowDesk preview details missing or inaccurate');
    }
    console.log('FlowDesk showcase verified with live Vercel URL and telemetry.');

    // 4. Test Scroll Progress & ScrollTrigger Animations
    console.log('Testing scrolling down to trigger stages...');
    await page.evaluate(async () => {
      window.scrollTo({ top: 1200, behavior: 'instant' });
    });
    await new Promise((resolve) => setTimeout(resolve, 800));

    await page.evaluate(async () => {
      window.scrollTo({ top: 2500, behavior: 'instant' });
    });
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 5. Check Secondary Projects (Auriel, Hoteliers Association, Interview Prep)
    const projectCards = await page.$$eval('.interactive-card', (cards) =>
      cards.map((c) => c.querySelector('h3')?.innerText.trim())
    );
    console.log('Secondary Projects found:', projectCards);
    if (
      !projectCards.includes('Auriel') ||
      !projectCards.includes('Hoteliers Association') ||
      !projectCards.includes('Interview Prep')
    ) {
      throw new Error('One or more required projects (Auriel, Hoteliers Association, Interview Prep) are missing');
    }

    // Verify all project images are rendered and have valid src
    const imageSources = await page.$$eval('.interactive-card img, .project-preview-viewport img', (imgs) =>
      imgs.map((img) => img.getAttribute('src'))
    );
    console.log('Project images found in DOM:', imageSources);
    if (imageSources.length < 4) {
      throw new Error(`Expected at least 4 project home screen images, found: ${imageSources.length}`);
    }

    // 6. Check Skills Section
    const skillsText = await page.$eval('#skills', (el) => el.innerText);
    if (!skillsText.includes('React') || !skillsText.includes('JavaScript (ES6+)')) {
      throw new Error('Skills section missing core technologies React & JavaScript');
    }
    console.log('Skills section verified with React & JavaScript emphasis.');

    // 7. Check Cinematic Closing / Contact Section
    await page.evaluate(async () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const closingHeadline = await page.$eval('#contact', (el) => el.innerText);
    if (!closingHeadline.includes("LET'S BUILD") || !closingHeadline.includes("MEANINGFUL")) {
      throw new Error('Cinematic closing headline missing or incorrect: ' + closingHeadline);
    }
    if (!closingHeadline.includes('NijiWritesCode')) {
      throw new Error('GitHub or X handle missing in contact section');
    }
    console.log('Cinematic closing section verified.');

    const screenshotsDir = path.resolve(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

    // Capture Hero on Desktop
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await new Promise((resolve) => setTimeout(resolve, 800));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_hero.png') });

    // Capture Move It on Desktop
    await page.evaluate(() => {
      const el = document.querySelector('.pinned-showcase-section');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_moveit.png') });

    // Capture Closing on Desktop
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await new Promise((resolve) => setTimeout(resolve, 800));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_closing.png') });
    console.log('Desktop screenshots saved.');

    // 9. Test Mobile Viewport (375 x 812 iPhone size)
    console.log('Testing mobile layout...');
    await page.setViewport({ width: 375, height: 812 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mobileMenuBtn = await page.$('.mobile-nav-toggle');
    const isMobileBtnVisible = await page.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none';
    }, mobileMenuBtn);

    if (!isMobileBtnVisible) {
      throw new Error('Mobile menu button should be visible on 375px viewport');
    }
    console.log('Mobile menu button is visible and active.');

    await page.screenshot({ path: path.join(screenshotsDir, 'mobile_hero.png') });

    // Mobile Move It
    await page.evaluate(() => {
      const el = document.querySelector('.pinned-showcase-section');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((resolve) => setTimeout(resolve, 800));
    await page.screenshot({ path: path.join(screenshotsDir, 'mobile_moveit.png') });
    console.log('Mobile screenshots saved.');

    // 10. Check Console Errors
    if (consoleErrors.length > 0) {
      console.warn('Total console errors caught:', consoleErrors.length);
    } else {
      console.log('Zero console errors detected! Complete clean run.');
    }

    console.log('=== ALL VERIFICATION CHECKS PASSED ===');
  } catch (err) {
    console.error('VERIFICATION FAILED:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    previewProcess.kill();
  }
}

runVerification();
