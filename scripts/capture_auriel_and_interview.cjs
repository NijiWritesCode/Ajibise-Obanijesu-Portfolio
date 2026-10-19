const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(__dirname, '..', 'public', 'projects');

async function run() {
  console.log('--- Capturing Auriel & Interview Prep Home Screens ---');

  // Start Auriel dev server on port 5188
  console.log('Starting Auriel dev server...');
  const aurielProcess = spawn('npx.cmd', ['vite', '--port', '5188'], {
    cwd: path.resolve(__dirname, '..', '..', 'Auriel'),
    shell: true,
  });

  await new Promise((r) => setTimeout(r, 3000));

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Capture Auriel
  try {
    console.log('Navigating to Auriel at http://localhost:5188');
    await page.goto('http://localhost:5188', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise((r) => setTimeout(r, 2000));
    const aurielPath = path.join(outDir, 'auriel.png');
    await page.screenshot({ path: aurielPath });
    console.log('Successfully captured Auriel to:', aurielPath);
  } catch (e) {
    console.error('Auriel capture error:', e.message);
  }

  // 2. Capture Interview Prep (running on 3099)
  try {
    console.log('Navigating to Interview Prep at http://localhost:3099');
    await page.goto('http://localhost:3099', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise((r) => setTimeout(r, 2000));
    const interviewPath = path.join(outDir, 'interview-prep.png');
    await page.screenshot({ path: interviewPath });
    console.log('Successfully captured Interview Prep to:', interviewPath);
  } catch (e) {
    console.error('Interview Prep capture error:', e.message);
  }

  await browser.close();
  aurielProcess.kill();
  console.log('--- Done ---');
  process.exit(0);
}

run();
