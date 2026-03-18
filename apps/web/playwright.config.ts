import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:3000",
    headless: true,
  },
  webServer: {
    command: "pnpm preview:dev",
    url: "http://127.0.0.1:3000/signup",
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
