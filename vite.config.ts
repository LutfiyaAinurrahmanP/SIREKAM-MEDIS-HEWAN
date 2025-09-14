import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

const API_TARGET = process.env.VITE_API_TARGET || "http://localhost:3000";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  root: "./",
  publicDir: "src/frontend/public",
  envDir: process.cwd(),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/frontend/src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: API_TARGET,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist/frontend",
    emptyOutDir: true,
  },
});
