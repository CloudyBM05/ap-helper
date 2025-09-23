import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // For GitHub Pages repository "AP-Helper" under a user/org OR for custom domain.
  // If a CNAME is present (custom domain), root base '/' is correct.
  // Otherwise use '/AP-Helper/' so assets resolve.
  const usingCustomDomain = true; // CNAME file exists
  const base = usingCustomDomain ? '/' : '/AP-Helper/';

  return {
    base,
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
      // Stable filenames to avoid 404s from cached index.html pointing to old hashed assets
      rollupOptions: {
        output: {
          entryFileNames: 'assets/app.js',
            chunkFileNames: 'assets/[name].js',
            assetFileNames: (assetInfo) => {
              if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                return 'assets/app.css';
              }
              return 'assets/[name][extname]';
            },
        },
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});

