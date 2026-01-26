import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import Autoprefixer from 'autoprefixer'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
      svgLoader({
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'prefixIds',
              params: {
                delim: '__',
                prefixIds: true,
              },
            },
          ],
        },
      }),
    ],
    css: {
      transformer: 'lightningcss',
      postcss: {
        plugins: [Autoprefixer()],
      },
    },
    base: env.ASSETS_BASE,
    build: {
      outDir: env.OUT_DIR || './dist',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
