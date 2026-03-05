import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Proxy API calls to the DevTime server during development
      // This avoids CORS issues when calling https://devtime.prokit.app from localhost
      '/api': {
        target: 'https://devtime.prokit.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
