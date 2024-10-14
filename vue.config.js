module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.anthropic.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
