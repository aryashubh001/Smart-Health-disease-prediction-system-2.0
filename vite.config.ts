import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Smart-Health-disease-prediction-system-2.0/',
  // Fix for "Blocked request" error on Render
  preview: {
    allowedHosts: [
      'smart-health-disease-prediction-system.onrender.com', 
    ],
  },
})
