// import { test, expect } from '@playwright/test';
// import { fetchStorybookEntries, groupStoriesByComponent } from './utils/storybook.helpers';
// import { slugify } from './utils/slugify';

// const entries = await fetchStorybookEntries();
// const components = groupStoriesByComponent(entries);

// for (const [componentName, stories] of components) {
//   const cleanComponentName = slugify(componentName.replace('UI/', ''));

//   test.describe(`${componentName} visual regression`, () => {
//     for (const story of stories) {
//       const cleanStoryName = slugify(story.name);

//       test(`renders ${story.name}`, async ({ page }) => {
//         await page.goto(`/iframe.html?id=${story.id}`);

//         await expect(page).toHaveScreenshot(`${cleanComponentName}/${cleanStoryName}.png`, {
//           // Allow minor rendering differences between OS/CI environments
//           maxDiffPixelRatio: 0.02,
//         });
//       });
//     }
//   });
// }

import { test, expect } from '@playwright/test';
import { fetchStorybookEntries, groupStoriesByComponent } from './utils/storybook.helpers';
import { slugify } from './utils/slugify';

const entries = await fetchStorybookEntries();
const components = groupStoriesByComponent(entries);

// Normalize Storybook component name to filesystem-safe folder name
const getComponentFolder = (name: string) => slugify(name.replace('UI/', ''));

// Normalize story name to filesystem-safe file name
const getStoryFileName = (name: string) => slugify(name);

for (const [componentName, stories] of components) {
  const componentFolder = getComponentFolder(componentName);

  test.describe(`${componentName} visual regression`, () => {
    for (const story of stories) {
      const storyFileName = getStoryFileName(story.name);

      test(`renders ${story.name}`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story.id}`);

        await expect(page).toHaveScreenshot(`${componentFolder}/${storyFileName}.png`, {
          // Allow minor rendering differences between OS/CI environments
          maxDiffPixelRatio: 0.02,
        });
      });
    }
  });
}
