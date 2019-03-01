'use strict'

const { resolve } = require('path')
const { smart } = require('webpack-merge')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const devMode = process.env.NODE_ENV === 'development'
const config = devMode
  ? require('./webpack.dev.config')
  : require('./webpack.prod.config')

const common = {
  mode: devMode ? 'development' : 'production',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      { test: /\.html$/, use: 'html-loader' }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': resolve(__dirname, 'src')
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(
          __dirname,
          devMode ? 'tsconfig.json' : 'tsconfig.prod.json'
        )
      })
    ]
  }
}

module.exports = smart(common, config)
