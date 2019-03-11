const { join, resolve } = require('path')
const { smart } = require('webpack-merge')
const demo = require('./webpack.demo.config')

const config = {
  devServer: {
    contentBase: join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
}

module.exports = smart(demo, config)
