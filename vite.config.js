import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/pwa-travel-app/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Travel Go 九州導覽',
        short_name: 'Travel Go',
        description: '2026 暑假日本九州福岡家庭旅遊極致 PWA 應用程式',
        theme_color: '#0d9488',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/pwa-travel-app/',
        start_url: '/pwa-travel-app/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})

