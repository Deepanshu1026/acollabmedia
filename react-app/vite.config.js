import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  // Serve assets specifically, not the whole parent directory to avoid infinite loops
  publicDir: path.resolve(__dirname, '../assets'),
  server: {
    port: 5173,
  }
})
