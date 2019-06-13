const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定输出文件
  output: {
    filename: "main.js",
  },
  resolve: {
    // 自动解析一下扩展，当我们要引入 src/index.ts 的时候，只需要写 src/index 即可
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    // 配置以 .ts/.tsx 结尾的文件都用 ts-loader 解析
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }
    ],
  },
  // 指定编译后是否生成source-map，这里判断如果是生产打包环境则不生成 source-map
  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
  devServer: {
    contentBase: "./dist",
    // stats: "erroy-only",
    compress: false,
    host: "localhost",
    port: 8888,
  },
  plugins: [
    // 编译之前删掉 dist 文件夹
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["./dist"],
    }),
    // 指定编译需要用的模板，模板文件是 ./src/template/index.html，所以接下来要创建一个 index.html 文件
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
    })
  ]
}