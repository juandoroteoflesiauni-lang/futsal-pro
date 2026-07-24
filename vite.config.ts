import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages needs /futsal-pro/; local/dev must stay at /
const isPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [react()],
  base: isPages ? '/futsal-pro/' : '/',
})
