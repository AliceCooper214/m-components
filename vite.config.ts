import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [vue(), vueJsx()],
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ["lodash"],
        },
      },
    },
  },
});
