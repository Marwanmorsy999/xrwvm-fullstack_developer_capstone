const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = 'http://localhost:8000';
  const screenshotDir = 'D:\\capstone-project\\server\\screenshots';

  // Login first
  await page.goto(baseUrl + '/login');
  await page.waitForTimeout(1000);
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="psw"]', 'testpass123');
  await page.click('input[type="submit"]');
  await page.waitForTimeout(3000);

  // Go to post review page
  await page.goto(baseUrl + '/postreview/15');
  await page.waitForTimeout(5000);

  // Fill the form
  await page.fill('textarea', 'Excellent dealership!');
  await page.fill('input[type="date"]', '2024-02-20');
  
  // Wait for options to load - wait for at least 10 options
  await page.waitForFunction(() => {
    const select = document.querySelector('select[name="cars"]');
    return select && select.options.length > 5;
  }, { timeout: 60000 });

  await page.selectOption('select[name="cars"]', 'Toyota Camry');
  await page.fill('input[type="int"]', '2022');
  await page.click('button.postreview');
  await page.waitForTimeout(4000);

  await page.screenshot({ path: `${screenshotDir}\\deployed_add_review.png`, fullPage: true });
  console.log('Captured deployed_add_review.png');

  await browser.close();
})();
