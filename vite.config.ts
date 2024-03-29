import { resolve } from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default {
  base: "/m-components/",
  publicDir: "public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [vue(), vueJsx(), splitVendorChunkPlugin()],
  server: {
    port: 8080,
  },
  build: {
    outDir: "dist/m-components",
    splitVendorChunkPlugin: true,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ["lodash"],
        },
      },
    },
  },
};
