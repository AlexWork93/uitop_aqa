import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['civicflow', 'localhost', '127.0.0.1'],
  },
});
