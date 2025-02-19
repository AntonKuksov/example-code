import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext"
    }
  },
  build: {
    target: "esnext"
  },
  plugins: [react()],
  preview: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: "http://koostis.ee:8080",
      }
    }
  },
  server: {
    host: "0.0.0.0", // Allow access from outside the container
    port: 5173, // The port you expose in the Docker container
    proxy: {
      "/api": {
        target: "http://koostis.ee:8080",
      }
    }
  }
});
