module.exports = {
  transpileDependencies: [
    /\bvue-awesome\b/,
  ],
  devServer: {
    proxy: 'http://localhost:7001',
    open: true,
  },
};
