import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './visual-tests',
  use: {
    baseURL: 'http://localhost:6006',
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
  },
});
