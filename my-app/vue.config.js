const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,           //关闭eslint

   //开启代理服务器 
   devServer: {
    proxy: {
      'api' : {            //   '/api'叫做请求前缀, 有前缀就走代理(可以改名)
        target: 'http://localhost:5001',
        pathRewrite: {'^/api':''},
        ws: true,           //用于支持websocket
        changeOrigin: true  //用于控制请求头的host值
      }
    }
  }
})
