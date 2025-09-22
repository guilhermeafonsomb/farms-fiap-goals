import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "goals-app",
      filename: "remoteEntry.js",
      exposes: {
        "./FarmsFiapGoals": "./src/App.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "tailwindcss",
        "postcss",
        "autoprefixer",
        "react-router-dom",
      ],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5004,
  },
});
