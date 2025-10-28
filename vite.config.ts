// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // optional
    host: true, // allows access on network
  },
  // ✅ Important: ensures React Router works on refresh
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
