const path = require("path")
const fs = require('fs')
const fsExtra = require('fs-extra')
const { defineConfig, build } = require("vite")
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

const entryDir = path.join(__dirname, '../packages')
const srcDir = path.join(__dirname, '../src')
const outputDir = path.join(__dirname, '../m-ui')

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
})

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    global: {
      vue: 'Vue'
    }
  },
}

const buildAll = async () => {
  const componentsDir = path.resolve(srcDir, './components')
  const hooksDir = path.resolve(srcDir, './hooks')
  fsExtra.copySync(componentsDir, path.resolve(entryDir, './hooks'))
  fsExtra.copySync(hooksDir, entryDir)
  await build({
    ...baseConfig,
    build: {
      ...rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'm-element-components',
        fileName: 'm-element-components',
        formats: ['es', 'umd']
      },
      outDir: outputDir
    }
  })
}

const buildLib = async () => {
  await buildAll()
}

buildLib()