import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    allowedHosts: true,
    port: 8080,
    host: true
  }
});
