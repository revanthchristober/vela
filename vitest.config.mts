import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: { url: "http://localhost:3000" },
    },
    setupFiles: "./tests/unit/setup.ts",
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    css: false,
  },
  resolve: {
    alias: {
      "@": dirname,
    },
  },
});
