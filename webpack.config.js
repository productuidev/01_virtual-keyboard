const path = require("path"); // path 모듈
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"), // 절대경로
    clean: true, // 다시 생성 속성
  },
  devtool: "source-map", // 빌드-원본 연결
  mode: "development", // 난독화 압축
  devServer: {
    host: "localhost",
    port: 8080,
    open: true,
    watchFiles: "index.html",
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Virtual Keyboard",
      template: "./index.html",
      inject: "body", // tag 넣을 부분
      favicon: "./favicon.ico",
    }),
    new MiniCSSExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CSSMinimizerPlugin()],
  },
};
