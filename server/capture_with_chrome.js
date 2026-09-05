const { chromium } = require('playwright');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const screenshotDir = 'D:\\capstone-project\\server\\screenshots';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

function captureScreen(filePath) {
  const psScript = `
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName System.Drawing
    $screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
    $bitmap = New-Object System.Drawing.Bitmap($screen.Width, $screen.Height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.CopyFromScreen($screen.Location, [System.Drawing.Point]::Empty, $screen.Size)
    $bitmap.Save("${filePath.replace(/\\/g, '\\\\')}")
    $graphics.Dispose()
    $bitmap.Dispose()
  `;
  execSync(`powershell -Command "${psScript.replace(/"/g, '\\"')}"`, { encoding: 'utf8' });
}

(async () => {
  const browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = 'http://localhost:8000';

  // Task 17: get_dealers.png - dealers on home page before logging in
  await page.goto(baseUrl);
  await page.waitForTimeout(2000);
  captureScreen(path.join(screenshotDir, 'get_dealers.png'));
  console.log('Captured get_dealers.png');

  // Task 18: get_dealers_loggedin.png - after login
  await page.goto(baseUrl + '/login');
  await page.waitForTimeout(1000);
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="psw"]', 'testpass123');
  await page.click('input[type="submit"]');
  await page.waitForTimeout(3000);
  captureScreen(path.join(screenshotDir, 'get_dealers_loggedin.png'));
  console.log('Captured get_dealers_loggedin.png');

  // Task 19: dealersbystate.png - filter by Kansas
  await page.goto(baseUrl + '/dealers');
  await page.waitForTimeout(2000);
  await page.selectOption('select[name="state"]', 'Kansas');
  await page.waitForTimeout(2000);
  captureScreen(path.join(screenshotDir, 'dealersbystate.png'));
  console.log('Captured dealersbystate.png');

  // Task 20: dealer_id_reviews.png - dealer details with reviews
  await page.goto(baseUrl + '/dealer/15');
  await page.waitForTimeout(3000);
  captureScreen(path.join(screenshotDir, 'dealer_id_reviews.png'));
  console.log('Captured dealer_id_reviews.png');

  // Task 21: dealership_review_submission.png - post review page before submission
  await page.goto(baseUrl + '/postreview/15');
  await page.waitForTimeout(2000);
  await page.fill('textarea', 'Excellent dealership!');
  await page.fill('input[type="date"]', '2024-02-20');
  await page.waitForFunction(() => {
    const select = document.querySelector('select[name="cars"]');
    return select && select.options.length > 5;
  }, { timeout: 60000 });
  await page.selectOption('select[name="cars"]', 'Toyota Camry');
  await page.fill('input[type="int"]', '2022');
  captureScreen(path.join(screenshotDir, 'dealership_review_submission.png'));
  console.log('Captured dealership_review_submission.png');

  // Task 22: added_review.png - after submitting review
  await page.click('button.postreview');
  await page.waitForTimeout(4000);
  captureScreen(path.join(screenshotDir, 'added_review.png'));
  console.log('Captured added_review.png');

  // Admin login screenshot
  await page.goto(baseUrl + '/admin');
  await page.waitForTimeout(1000);
  await page.fill('input[name="username"]', 'root');
  await page.fill('input[name="password"]', 'rootpass');
  captureScreen(path.join(screenshotDir, 'admin_login.png'));
  console.log('Captured admin_login.png');

  await page.click('input[type="submit"]');
  await page.waitForTimeout(2000);
  captureScreen(path.join(screenshotDir, 'admin_logout.png'));
  console.log('Captured admin_logout.png');

  // Deployment screenshots (local with address bar)
  await page.goto(baseUrl);
  await page.waitForTimeout(2000);
  captureScreen(path.join(screenshotDir, 'deployed_landingpage.png'));
  console.log('Captured deployed_landingpage.png');

  await page.goto(baseUrl + '/login');
  await page.waitForTimeout(1000);
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="psw"]', 'testpass123');
  await page.click('input[type="submit"]');
  await page.waitForTimeout(3000);
  captureScreen(path.join(screenshotDir, 'deployed_loggedin.png'));
  console.log('Captured deployed_loggedin.png');

  await page.goto(baseUrl + '/dealer/15');
  await page.waitForTimeout(3000);
  captureScreen(path.join(screenshotDir, 'deployed_dealer_detail.png'));
  console.log('Captured deployed_dealer_detail.png');

  await page.goto(baseUrl + '/postreview/15');
  await page.waitForTimeout(2000);
  await page.fill('textarea', 'Excellent dealership!');
  await page.fill('input[type="date"]', '2024-02-20');
  await page.waitForFunction(() => {
    const select = document.querySelector('select[name="cars"]');
    return select && select.options.length > 5;
  }, { timeout: 60000 });
  await page.selectOption('select[name="cars"]', 'Toyota Camry');
  await page.fill('input[type="int"]', '2022');
  await page.click('button.postreview');
  await page.waitForTimeout(4000);
  captureScreen(path.join(screenshotDir, 'deployed_add_review.png'));
  console.log('Captured deployed_add_review.png');

  await browser.close();
})();
