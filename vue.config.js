module.exports = {
  devServer: {
    port: 8080,
    open: true
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
} 