import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'client/src'),
    },
  },
  build: {
    outDir: 'clent/dist', // Ensure the build output directory is set correctly
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy API requests to server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});