import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/portifolio/', // 👈 nome exato do repositório no GitHub
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  },
  build: {
    rollupOptions: {
      // 👇 força incluir no bundle final
      external: [],
    },
    commonjsOptions: {
      include: [/node_modules/],
    }
  }
})
