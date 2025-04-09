import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/voice-over_potential_discovery_react_app",
    optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
