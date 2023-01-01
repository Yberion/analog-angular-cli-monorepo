/// <reference types="vitest" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      vite: {
        tsconfig:
          mode === 'test'
            ? 'projects/demo-app/tsconfig.spec.json'
            : 'projects/demo-app/tsconfig.app.json',
      }
    }),
    splitVendorChunkPlugin(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    cache: {
      dir: '../../node_modules/.vitest',
    },
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
