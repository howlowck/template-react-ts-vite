import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src',
  server: {
    proxy: {
      '/api': 'http://localhost:8585/api',
    },
  },
  build: {
    outDir: `${process.cwd()}/dist/static`,
  },
})
