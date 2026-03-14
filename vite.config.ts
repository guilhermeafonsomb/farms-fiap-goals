import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { withZephyr } from "vite-plugin-zephyr";
import { federation } from "@module-federation/vite";
import path from "path";

const mfConfig = {
  name: "goals-app",
  filename: "remoteEntry.js",
  exposes: {
    "./FarmsFiapGoals": "./src/App.tsx",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
    "react-router-dom": { singleton: true },
    "@tanstack/react-query": { singleton: true },
  },
  manifest: true,
  dts: false,
};

export default defineConfig({
  base: process.env.VITE_PUBLIC_PATH || "/",
  plugins: [
    react(),
    process.env.SKIP_ZEPHYR === "true"
      ? federation(mfConfig)
      : withZephyr({ mfConfig }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    needsInterop: ["react", "@tanstack/react-query"],
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    assetsDir: "goals-assets",
  },
  server: {
    port: 5004,
  },
  preview: {
    port: 5004,
  },
});
