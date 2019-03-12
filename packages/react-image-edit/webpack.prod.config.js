const { join, resolve } = require('path')
const { smart } = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.config')

const config = {
  entry: resolve(__dirname, 'src/index.ts'),
  devtool: false,

  output: {
    filename: 'index.min.js',
    path: resolve('lib'),
    library: 'react-image-edit',
    libraryTarget: 'umd'
  },

  // 依存ライブラリの設定(使用先で必要なライブラリ)
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components'
  },
  plugins: [
    new Dotenv({
      path: 'production.env',
      safe: false
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      })
    ]
  }
}

module.exports = smart(common, config)
