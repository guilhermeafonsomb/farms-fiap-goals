import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    env: {
      VITE_APPWRITE_ENDPOINT: "https://nyc.cloud.appwrite.io/v1",
      VITE_APPWRITE_PROJECT_ID: "68d01da500316c3af9cd",
    },
    exclude: ["**/node_modules/**", "**/dist/**", "**/lib/**", "**/e2e/**"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/test/**",
        "src/**/*.d.ts",
        "node_modules/",
        "src/lib/**",
        "src/App.tsx",
        "src/main.tsx",
        "src/model/**",
        "src/hooks/**",
      ],
    },
  },
});
