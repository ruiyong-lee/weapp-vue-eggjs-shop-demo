module.exports = {
  transpileDependencies: [
    /\bvue-awesome\b/,
  ],
  devServer: {
    proxy: 'http://localhost:7001', // 反向代理
    open: true, // 自动打开浏览器
    disableHostCheck: true, // 取消检查host
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variables.scss";', // 全局scss
      },
    },
  },
};
