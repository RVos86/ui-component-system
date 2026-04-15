import { test, expect } from '@playwright/test';
import { fetchStorybookEntries, groupStoriesByComponent } from './utils/storybook.helpers';

const entries = await fetchStorybookEntries();
const components = groupStoriesByComponent(entries);

for (const [componentName, stories] of components) {
  test.describe(`${componentName} visual regression`, () => {
    for (const story of stories) {
      test(`renders ${story.name}`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story.id}`);

        await expect(page).toHaveScreenshot(`${componentName}-${story.name}.png`, {
          // Allow a small pixel difference to account for rendering inconsistencies
          // across environments (e.g. macOS vs Linux in CI).
          // This prevents false positives caused by font anti-aliasing and subpixel rendering.
          maxDiffPixelRatio: 0.02,
        });
      });
    }
  });
}
