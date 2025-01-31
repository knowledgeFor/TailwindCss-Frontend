import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        icon: false,
        exportType: 'default', // Ensure named export for ReactComponent
        svgo: true,
        ref: true, // Support refs
        titleProp: true
      },
      include: '**/*.svg'
    })
  ],
  define: {
    'process.env': {},
    'process.env.ANCHOR_BROWSER': true,
    global: {}
  }
})
