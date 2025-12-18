import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Autoprefixer from 'autoprefixer'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  css: {
    postcss: {
      plugins: [Autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
