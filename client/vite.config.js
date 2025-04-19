import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/auth': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
    },
    host: '0.0.0.0', // Ensures external access
    strictPort: true,
    allowedHosts: [
      'localhost',
      'h7xc38-5173.csb.app',
      'h7xc38-5175.csb.app',
    ],
    cors: {
      origin: [
        'http://localhost:5173',
        'https://h7xc38-5173.csb.app',
        'https://h7xc38-5175.csb.app',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },
});