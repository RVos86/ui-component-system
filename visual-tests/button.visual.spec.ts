import { test, expect } from '@playwright/test';

const stories = [
  'ui-button--primary',
  'ui-button--secondary',
  'ui-button--small',
  'ui-button--medium',
  'ui-button--large',
];

for (const story of stories) {
  test(`Button - ${story}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story}`);

    await expect(page).toHaveScreenshot(`${story}.png`);
  });
}
