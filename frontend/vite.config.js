import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   
    port: 4002,  
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4001', // Backend server
        changeOrigin: true,
      },
    },
  },
})
