import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "https://artisan-backend-c7uk.onrender.com", // Backend URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 4173,
    strictPort: true,
  }
})
