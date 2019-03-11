const { join, resolve } = require('path')
const { smart } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config')

const config = {
  entry: resolve(__dirname, 'src/example/index.tsx'),
  devtool: 'source-map',

  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, '../../docs')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('template.html')
    })
  ]
}

module.exports = smart(common, config)
