module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  devServer: {
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'https://www.moles.top/',
        changeOrigin: true,
      }
    }
  }
}
