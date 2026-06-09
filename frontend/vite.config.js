import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Note: if this gives an error, use '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})