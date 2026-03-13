import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"],
    clearMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@defrag/language-governor": path.resolve(__dirname, "../../packages/language-governor/src/index.ts"),
      "@defrag/narrative-composer": path.resolve(__dirname, "../../packages/narrative-composer/src/index.ts"),
    },
  },
})
