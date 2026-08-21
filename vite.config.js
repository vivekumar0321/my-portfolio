import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-512x512.png',
      ],

      manifest: {
        id: '/',
        name: 'Your Application Name',
        short_name: 'Your App',
        description: 'Your application description',

        start_url: '/',
        scope: '/',

        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d6efd',

        categories: [
          'business',
          'productivity',
        ],

        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff,woff2}',
        ],

        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        navigateFallback: 'index.html',
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
});