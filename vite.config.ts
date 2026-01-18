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
    target: 'es5', // Maximum compatibility
    rollupOptions: {
      output: {
        format: 'iife', // Use IIFE format instead of ES modules
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: undefined, // Disable code splitting for simplicity
      },
    },
    assetsInlineLimit: 0, // Don't inline any assets
    minify: 'terser', // Use terser for better compatibility
    sourcemap: false, // Disable sourcemaps for production
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

