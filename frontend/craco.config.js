module.exports = {
  webpack: {
    configure(webpackConfig) {
      webpackConfig.module.rules[1].oneOf.unshift({
        test: /\.ya?ml$/,
        use: "yaml-loader",
      });

      return webpackConfig;
    }
  }
};
