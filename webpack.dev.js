const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common.js");

const path = require("path");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false
    })
  ]
});
