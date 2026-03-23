import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // Serve assets from the parent directory (where images/vendor are located)
  publicDir: path.resolve(__dirname, '../'),
  server: {
    port: 5173,
  }
})
