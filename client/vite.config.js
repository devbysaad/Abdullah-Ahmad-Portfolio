import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL?.trim() || '';
  const useProxy = !apiUrl || apiUrl.startsWith('/');

  return {
    plugins: [react(), tailwindcss()],
    envDir: '.',
    envPrefix: 'VITE_',
    server: {
      port: 3000,
      ...(useProxy
        ? {
            proxy: {
              '/api': {
                target: env.VITE_API_PROXY_TARGET || 'http://localhost:3001',
                changeOrigin: true,
              },
            },
          }
        : {}),
    },
  };
});
