module.exports = {
  devServer: {
    proxy: 'http://localhost:7001', // 反向代理
    disableHostCheck: true, // 取消检查host
  },
};
