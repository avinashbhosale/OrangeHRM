import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',            // Directory where test files are located
  timeout: 60000,      
  reporter: 'html',          
  expect: {
    timeout: 3000,               // Maximum time to wait for assertions
  },
  //retries: 2,                    // Number of retries for failing tests
  use: {
    headless: true,              // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Browser viewport size
    actionTimeout: 10000,        // Maximum time for one action
    ignoreHTTPSErrors: true,     // Ignore HTTPS errors during tests
  },
  projects: [
    {
      name: 'Chromium',          // Project name (e.g., browser name)
      use: { ...devices['Desktop Chrome'] },  // Specific settings for this project
    },
    /*{
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});

