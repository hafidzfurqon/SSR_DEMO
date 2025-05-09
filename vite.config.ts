import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vercel  from 'vite-plugin-vercel';

export default defineConfig({
  plugins: [
    react(),
    vercel({
      prerender: {
        enabled: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    // Memastikan Vite tidak melakukan mangling nama properti di production
    minify: 'terser',
    terserOptions: {
      mangle: false
    }
  },
  ssr: {
    noExternal: ['react-helmet-async']
  }
});
