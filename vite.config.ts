import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

// Injeta o logo (com pathLength para a animação de traço) no preloader estático do index.html
const bootLogo = () => ({
  name: 'boot-logo',
  transformIndexHtml(html: string) {
    const svg = fs
      .readFileSync(path.resolve(__dirname, 'src/assets/brand/logo.svg'), 'utf8')
      .replace(/fill="#(232b4f|111b3d)"/gi, 'fill="currentColor"')
      .replace(/<path /g, '<path pathLength="1" ');
    return html.replace('<!--BOOT_LOGO-->', svg);
  },
});

export default defineConfig({
  plugins: [react(), bootLogo()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion', 'lenis'],
          vendor: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
        },
      },
    },
  },
});
