import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// nu se face un import cum trebuie
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})