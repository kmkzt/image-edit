const { join, resolve } = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const config = {
  entry: resolve('src', 'library.tsx'),
  devtool: false,

  output: {
    filename: 'index.min.js',
    path: resolve('lib'),
    library: 'samplelibrary-reactts',
    libraryTarget: 'umd'
  },

  // 依存ライブラリの設定(使用先で必要なライブラリ)
  externals: {
    react: 'react',
    'styled-components': 'styled-components',
    'react-redux': 'react-redux',
    'react-router-dom': 'react-router-dom',
    'react-css-modules': 'react-css-modules'
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

module.exports = config
