import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  base: process.env.VITE_BASE_PATH || "/"
  // Use "/" for Vercel deployment, or set VITE_BASE_PATH env variable for other platforms
})