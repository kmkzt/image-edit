'use strict'

const { resolve } = require('path')
const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  mode: devMode ? 'development' : 'production',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: devMode ? 'tsconfig.json' : 'tsconfig.prod.json',
            transpileOnly: devMode
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
    }
  }
}
