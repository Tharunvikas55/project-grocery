import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   resolve: {
    alias: {
      buffer: path.resolve( 'node_modules', 'buffer'),
      process: path.resolve( 'node_modules', 'process/browser'),
    }
  },
  define: {
    global: 'window',  // Fix for `global is not defined`
  },
})
