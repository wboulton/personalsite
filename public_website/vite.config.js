import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/personalsite/',
  plugins: [react()],
  server: {
    allowedHosts: ['05c2-128-10-2-13.ngrok-free.app'],
    proxy: {
      '/api': "http://localhost:5000"
    }
  },
})
