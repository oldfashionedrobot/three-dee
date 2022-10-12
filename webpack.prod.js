const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })],
  optimization: {
    // minimize: false
  }
});
