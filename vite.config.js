import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      manifest: {
        id: "/",
        name: "Graham AI",
        short_name: "Graham AI",
        description: "AI Assistant",
        start_url: "/",
        display: "standalone",
        display_override: [
          "window-controls-overlay",
          "standalone"
        ],
        orientation: "portrait",
        background_color: "#000000",
        theme_color: "#000000",

        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
      }

    })
  ]
})