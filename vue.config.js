module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
  devServer: {
    proxy: {
      "/api": {
        // target: "https://www.moles.top/",
        target: "http://localhost:8080/",
        changeOrigin: true,
        pathRewrite: {
          "^/api/ark": "/",
        },
      },
    },
  },
};
