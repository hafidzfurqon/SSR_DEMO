import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vercel from 'vite-plugin-vercel'

export default defineConfig({
  plugins: [
    react(),
    vercel()
  ],
  // Ensure paths are resolved correctly
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // Configure SSR options
  ssr: {
    // Force react-helmet-async to be processed for SSR
    noExternal: ['react-helmet-async'],
    // Optimize CommonJS modules
    optimizeDeps: {
      include: ['react-helmet-async']
    }
  },
  // Improve module compatibility
  optimizeDeps: {
    include: ['react-helmet-async']
  }
})