import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  build: { chunkSizeWarningLimit: 1100 },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'icons/apple-touch-icon.png',
        'assets/ui/aang-arrow.png',
        'assets/ui/avatar-elements-theme.webp',
      ],
      manifest: {
        id: './',
        name: 'Avatar MTG Guide',
        short_name: 'Avatar MTG',
        description: 'Mobilny przewodnik do grania w MTG Avatar po polsku.',
        start_url: './#/',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#2a1f17',
        theme_color: '#2a1f17',
        lang: 'pl',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,json,png,jpg,jpeg,webp,svg,ico,webmanifest}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        navigateFallback: 'index.html',
      },
    }),
  ],
})
