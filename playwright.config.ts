import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './visual-tests',

  // Ensure consistent snapshot structure across environments
  snapshotPathTemplate: '{testDir}/{testFileDir}/__snapshots__/{arg}{ext}',

  use: {
    baseURL: 'http://localhost:6006',

    // Stable rendering setup
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,

    // Ensure consistent color scheme
    colorScheme: 'light',

    // Reduce rendering differences across environments
    launchOptions: {
      args: ['--font-render-hinting=none'],
    },
  },

  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',

    // Reuse server locally, always fresh in CI
    reuseExistingServer: !process.env.CI,

    timeout: 120000,
  },
});
