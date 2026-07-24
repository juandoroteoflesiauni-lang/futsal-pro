import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://<user>.github.io/futsal-pro/
export default defineConfig({
  plugins: [react()],
  base: '/futsal-pro/',
})
