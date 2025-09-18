import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: false, // Allow Vite to find next available port if 8080 is taken
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: [
      '@playwright/test',
      'playwright-core',
      'chromium-bidi'
    ],
  },
  define: {
    // Exclude playwright from browser bundle
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
