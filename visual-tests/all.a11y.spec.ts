import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { fetchStorybookEntries, groupStoriesByComponent } from './utils/storybook.helpers';

const entries = await fetchStorybookEntries();
const components = groupStoriesByComponent(entries);

for (const [componentName, stories] of components) {
  test.describe(`${componentName} a11y`, () => {
    for (const story of stories) {
      test(`${story.name} has no violations`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story.id}`);
        await page.waitForLoadState('networkidle');

        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  });
}
