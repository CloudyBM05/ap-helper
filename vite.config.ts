import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Custom domain deployment
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2015', // Better compatibility
    rollupOptions: {
      output: {
        format: 'iife', // Use IIFE format
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    assetsInlineLimit: 0, // Don't inline any assets
    minify: 'terser', // Use terser for better compatibility
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

