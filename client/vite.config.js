import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** Split heavy vendor libs so the home route ships a smaller initial chunk. */
function manualChunks(id) {
  if (!id.includes('node_modules')) return undefined;

  if (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router')) {
    return 'vendor-react';
  }
  if (id.includes('framer-motion')) return 'vendor-motion';
  if (id.includes('gsap')) return 'vendor-gsap';
  if (id.includes('lenis')) return 'vendor-lenis';
  if (id.includes('@emailjs')) return 'vendor-emailjs';
  if (id.includes('axios')) return 'vendor-axios';
  if (id.includes('lucide-react')) return 'vendor-icons';
  if (id.includes('react-hot-toast')) return 'vendor-toast';

  return 'vendor-misc';
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL?.trim() || '';
  const useProxy = !apiUrl || apiUrl.startsWith('/');

  return {
    plugins: [react(), tailwindcss()],
    envDir: '.',
    envPrefix: 'VITE_',
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks,
        },
      },
    },
    server: {
      port: 5173,
      ...(useProxy
        ? {
            proxy: {
              '/api': {
                target: env.VITE_API_PROXY_TARGET || 'http://localhost:3000',
                changeOrigin: true,
              },
            },
          }
        : {}),
    },
  };
});
