const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = 'http://localhost:8000';
  const screenshotDir = 'D:\\capstone-project\\server\\screenshots';
  const fs = require('fs');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Task 17: get_dealers.png - dealers on home page before logging in
  await page.goto(baseUrl);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${screenshotDir}\\get_dealers.png`, fullPage: true });
  console.log('Captured get_dealers.png');

  // Task 18: get_dealers_loggedin.png - after login
  await page.goto(baseUrl + '/login');
  await page.waitForTimeout(1000);
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="psw"]', 'testpass123');
  await page.click('input[type="submit"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${screenshotDir}\\get_dealers_loggedin.png`, fullPage: true });
  console.log('Captured get_dealers_loggedin.png');

  // Task 19: dealersbystate.png - filter by Kansas
  await page.goto(baseUrl + '/dealers');
  await page.waitForTimeout(2000);
  await page.selectOption('select[name="state"]', 'Kansas');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${screenshotDir}\\dealersbystate.png`, fullPage: true });
  console.log('Captured dealersbystate.png');

  // Task 20: dealer_id_reviews.png - dealer details with reviews
  await page.goto(baseUrl + '/dealer/15');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${screenshotDir}\\dealer_id_reviews.png`, fullPage: true });
  console.log('Captured dealer_id_reviews.png');

  // Task 21: dealership_review_submission.png - post review page before submission
  await page.goto(baseUrl + '/postreview/15');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${screenshotDir}\\dealership_review_submission.png`, fullPage: true });
  console.log('Captured dealership_review_submission.png');

  // Task 22: added_review.png - after submitting review
  await page.fill('textarea', 'Great service!');
  await page.fill('input[type="date"]', '2024-01-15');
  await page.selectOption('select[name="cars"]', 'Toyota Camry');
  await page.fill('input[type="int"]', '2023');
  await page.click('button.postreview');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${screenshotDir}\\added_review.png`, fullPage: true });
  console.log('Captured added_review.png');

  // Admin login screenshot
  await page.goto(baseUrl + '/admin');
  await page.waitForTimeout(1000);
  await page.fill('input[name="username"]', 'root');
  await page.fill('input[name="password"]', 'rootpass');
  await page.screenshot({ path: `${screenshotDir}\\admin_login.png`, fullPage: true });
  console.log('Captured admin_login.png');

  await page.click('input[type="submit"]');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${screenshotDir}\\admin_logout.png`, fullPage: true });
  console.log('Captured admin_logout.png');

  // Deployment screenshots (local)
  await page.goto(baseUrl);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${screenshotDir}\\deployed_landingpage.png`, fullPage: true });
  console.log('Captured deployed_landingpage.png');

  await page.goto(baseUrl + '/login');
  await page.waitForTimeout(1000);
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="psw"]', 'testpass123');
  await page.click('input[type="submit"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${screenshotDir}\\deployed_loggedin.png`, fullPage: true });
  console.log('Captured deployed_loggedin.png');

  await page.goto(baseUrl + '/dealer/15');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${screenshotDir}\\deployed_dealer_detail.png`, fullPage: true });
  console.log('Captured deployed_dealer_detail.png');

  await page.goto(baseUrl + '/postreview/15');
  await page.waitForTimeout(2000);
  await page.fill('textarea', 'Excellent dealership!');
  await page.fill('input[type="date"]', '2024-02-20');
  await page.selectOption('select[name="cars"]', 'Honda Civic');
  await page.fill('input[type="int"]', '2022');
  await page.click('button.postreview');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${screenshotDir}\\deployed_add_review.png`, fullPage: true });
  console.log('Captured deployed_add_review.png');

  await browser.close();
})();
