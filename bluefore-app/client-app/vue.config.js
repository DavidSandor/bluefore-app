module.exports = {
      outputDir: '../api/spa',
      devServer: {
        proxy: {
          '^/api': {
            target: 'http://localhost:3080',
            changeOrigin: true
          },
        }
      },
      css: {
        loaderOptions: {
          sass: {
            prependData: `
              @import "@/main.scss";
            `
          }
        }
      }
    }