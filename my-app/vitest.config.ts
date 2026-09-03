import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Simulates browser
    globals: true, // No need to import describe, it, expect
    setupFiles: ["./vitest.setup.tsx"],
    coverage: {
      provider: "v8", // Code coverage
      reporter: ["text", "json", "html"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/build/**",
        "**/.next/**",
        "**/*.config.{js,ts}",
        "**/vitest.setup.{ts,tsx}",
        "**/*.d.ts",
        "**/*.types.ts",
        "**/__mocks__/**",
        "**/*.mock.{ts,tsx}",
        "**/*.stories.{ts,tsx}",
        "**/index.{ts,tsx}",
        "**/generated/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Match Next.js alias
      "@app": path.resolve(__dirname, "./app"),
    },
  },
});
