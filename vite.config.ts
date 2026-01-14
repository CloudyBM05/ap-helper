import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin to handle GitHub Pages MIME type issues
const githubPagesPlugin = () => {
  return {
    name: 'github-pages-mime-fix',
    generateBundle(_options: any, bundle: any) {
      // Find the HTML file and modify it
      Object.keys(bundle).forEach(fileName => {
        if (fileName.endsWith('.html')) {
          const htmlBundle = bundle[fileName];
          if (htmlBundle.type === 'asset') {
            // Replace type="module" with regular script tags
            htmlBundle.source = htmlBundle.source.toString()
              .replace(/type="module"\s+crossorigin\s+/g, '')
              .replace(/type="module"\s+/g, '');
          }
        }
      });
    }
  };
};

export default defineConfig({
  base: '/', // Custom domain deployment
  plugins: [react(), githubPagesPlugin()],
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

