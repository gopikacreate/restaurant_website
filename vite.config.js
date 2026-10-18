import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // NEW: imports the Tailwind plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // NEW: switches Tailwind on inside Vite
  ],
})