import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'es2019',
    sourcemap: false,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
  },
})
