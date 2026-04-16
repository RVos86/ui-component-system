/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/components/**'],
      exclude: ['src/components/**/*.stories.tsx'],
      thresholds: {
        lines: 80,
        functions: 90,
        branches: 75,
      },
    },
  },
});
