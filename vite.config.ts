import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      // Use the existing push-sw.js for push notifications,
      // but generate a separate precache SW for the app shell.
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      manifest: false, // we manage manifest.webmanifest ourselves in /public
      workbox: {
        // Cache the app shell and all assets
        globPatterns: ['**/*.{js,css,html,ico,svg,png,webmanifest}'],
        // Navigate fallback ensures SPA routing works offline
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          // Don't intercept the OAuth redirect from the backend
          /^\/auth\//,
        ],
        runtimeCaching: [
          {
            // Cache API responses for a short time so the app
            // feels snappy on re-open without requiring network.
            urlPattern: ({ url }) => url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/priorities') || url.pathname.startsWith('/users'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxAgeSeconds: 60 * 5 }, // 5 minutes
            },
          },
        ],
      },
    }),
  ],
})
