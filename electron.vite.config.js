import path from 'node:path';
import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

/**
 * @type {import('electron-vite').UserConfig}
 */
export default defineConfig({
  main: {
    root: 'src/electron',
    build: {
      lib: {
        entry: 'main.ts',
      },
      outDir: path.resolve(__dirname, './dist/electron'),
      emptyOutDir: true,
    },
    resolve: {
        alias: {
          '@electron': path.resolve(__dirname, './src/electron'),
          "@shared": path.resolve(__dirname, "./src/shared"),
        },
    },
  },
  preload: {
    root: 'src/electron',
    build: {
      lib: {
        entry: 'preload.ts',
      },
      outDir: path.resolve(__dirname, './dist/preload'),
      emptyOutDir: true,
    },
  },
  renderer: {
    // root: 'src/renderer/src',
    build: {
      // lib: {
      //   entry: 'main.tsx',
      // },
      // rollupOptions: {
      //   input: path.resolve(__dirname, './src/renderer/index.html'),
      // },
      outDir: path.resolve(__dirname, './dist/renderer'),
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/renderer/src'),
        "@shared": path.resolve(__dirname, "./src/shared"),
      }
    },
    plugins: [
      react(),
      tailwindcss(),
    ],
  }
})
