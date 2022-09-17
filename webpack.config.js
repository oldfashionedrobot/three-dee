const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  optimization: {
    moduleIds: "deterministic",
    usedExports: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all"
      // cacheGroups: {
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: "vendors",
      //     chunks: "all"
      //   }
      // }
    }
  }
};
