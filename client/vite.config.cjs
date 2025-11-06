const path = require('path')
const react = require('@vitejs/plugin-react')
const sassDts = require('vite-plugin-sass-dts').default
const svgr = require('vite-plugin-svgr').default
const { defineConfig } = require('vite')

module.exports = defineConfig({
  plugins: [
    react(),
    sassDts(),
    svgr({
      include: '**/icons/*.svg',
      svgrOptions: {
        memo: true,
        replaceAttrValues: { '#000000': 'currentColor' },
        svgProps: {
          fill: 'currentColor',
          stroke: 'currentColor',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      images: path.resolve(__dirname, 'src/assets/images'),
      fonts: path.resolve(__dirname, 'src/assets/fonts'),
      components: path.resolve(__dirname, 'src/components'),
      ui: path.resolve(__dirname, 'src/components/ui'),
      blocks: path.resolve(__dirname, 'src/components/blocks'),
      pages: path.resolve(__dirname, 'src/components/pages'),
      types: path.resolve(__dirname, 'src/types'),
      utils: path.resolve(__dirname, 'src/utils'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      stores: path.resolve(__dirname, 'src/stores'),
      styles: path.resolve(__dirname, 'src/styles'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: 'localhost',
    },
    proxy: {
      '/api': {
        target: 'http://recipes-server:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
