const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(__dirname, '..', 'public', 'projects');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function captureAll() {
  console.log('--- Capturing Project Home Screens ---');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Capture FlowDesk
  try {
    console.log('Capturing FlowDesk: https://flow-desk-woad-alpha.vercel.app/');
    await page.goto('https://flow-desk-woad-alpha.vercel.app/', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 2000));
    const flowDeskPath = path.join(outDir, 'flowdesk.png');
    await page.screenshot({ path: flowDeskPath });
    console.log('Saved FlowDesk to:', flowDeskPath);
  } catch (err) {
    console.error('Failed to capture FlowDesk from URL:', err.message);
  }

  // 2. Capture Hoteliers Association (home screen, not dashboard)
  try {
    console.log('Capturing Hoteliers Association: https://www.adoodootahoteliersassociation.name.ng/');
    await page.goto('https://www.adoodootahoteliersassociation.name.ng/', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 2000));
    const hoteliersPath = path.join(outDir, 'hoteliers.png');
    await page.screenshot({ path: hoteliersPath });
    console.log('Saved Hoteliers Association to:', hoteliersPath);
  } catch (err) {
    console.error('Failed to capture Hoteliers Association:', err.message);
  }

  // 3. Capture Auriel
  // Check if Auriel can be previewed from ../Auriel
  let aurielProcess;
  try {
    const aurielDir = path.resolve(__dirname, '..', '..', 'Auriel');
    console.log('Checking Auriel at', aurielDir);
    if (fs.existsSync(aurielDir)) {
      aurielProcess = spawn('npx.cmd', ['vite', 'preview', '--port', '5199'], {
        cwd: aurielDir,
        stdio: 'pipe',
        shell: true,
      });
      await new Promise((r) => setTimeout(r, 3000));
      console.log('Navigating to Auriel preview at http://localhost:5199');
      await page.goto('http://localhost:5199', {
        waitUntil: 'networkidle2',
        timeout: 15000,
      });
      await new Promise((r) => setTimeout(r, 2000));
      const aurielPath = path.join(outDir, 'auriel.png');
      await page.screenshot({ path: aurielPath });
      console.log('Saved Auriel to:', aurielPath);
    }
  } catch (err) {
    console.error('Failed to capture Auriel:', err.message);
  } finally {
    if (aurielProcess) aurielProcess.kill();
  }

  // 4. Capture Interview Prep
  // Let's check if Interview Prep can be run or if it has assets
  const interviewDir = path.resolve(__dirname, '..', '..', 'Interview Prep App', 'interview-prep');
  console.log('Checking Interview Prep at', interviewDir);
  let interviewProcess;
  try {
    if (fs.existsSync(interviewDir)) {
      interviewProcess = spawn('npm.cmd', ['run', 'dev', '--', '-p', '3099'], {
        cwd: interviewDir,
        stdio: 'pipe',
        shell: true,
      });
      await new Promise((r) => setTimeout(r, 8000));
      console.log('Navigating to Interview Prep at http://localhost:3099');
      await page.goto('http://localhost:3099', {
        waitUntil: 'networkidle2',
        timeout: 20000,
      });
      await new Promise((r) => setTimeout(r, 2000));
      const interviewPath = path.join(outDir, 'interview-prep.png');
      await page.screenshot({ path: interviewPath });
      console.log('Saved Interview Prep to:', interviewPath);
    }
  } catch (err) {
    console.error('Failed to capture Interview Prep:', err.message);
  } finally {
    if (interviewProcess) interviewProcess.kill();
  }

  await browser.close();
  console.log('--- Capture Finished ---');
}

captureAll();
