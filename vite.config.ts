import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/AP-Helper/',  // 👈 add this line exactly like this
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

