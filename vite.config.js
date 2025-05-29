import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // не обязательно, но можно указать явно
  build: {
    outDir: 'dist',
  },
});