import { test, expect } from '@playwright/test';
import { fetchStorybookEntries, filterStoriesByComponent } from './utils/storybook.helpers';

const entries = await fetchStorybookEntries();
const stories = filterStoriesByComponent(entries, 'UI/Button');

test.describe('Button visual regression', () => {
  for (const story of stories) {
    test(`renders ${story.name}`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story.id}`);

      await expect(page).toHaveScreenshot(`${story.id}.png`);
    });
  }
});
