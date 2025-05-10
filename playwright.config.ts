import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'html',

  timeout: 10000,

  expect: {
    timeout: 5000,
  },

  use: {
    baseURL: 'https://m.apuestas.codere.es',
    trace: 'on-first-retry',
    actionTimeout: 5000,
    navigationTimeout: 8000
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
