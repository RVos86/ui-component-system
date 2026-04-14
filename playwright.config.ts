import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './visual-tests',

  // Ensures consistent snapshot structure across environments (CI + local)
  snapshotPathTemplate: '{testDir}/{testFileDir}/__snapshots__/{arg}{ext}',

  use: {
    baseURL: 'http://localhost:6006',

    // Ensures consistent rendering across environments
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,

    // Reduces flakiness in visual regression tests
    screenshot: 'only-on-failure',

    // Improves consistency between CI and local environments
    locale: 'en-US',
    timezoneId: 'Europe/Amsterdam',
  },

  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',

    // Reuse existing server locally, always start fresh in CI
    reuseExistingServer: !process.env.CI,

    timeout: 120000,
  },
});
