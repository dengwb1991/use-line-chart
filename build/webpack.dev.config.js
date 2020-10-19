'use strict'
const path = require('path')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.config.js')
const merge = require('webpack-merge')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const configuration = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './examples/index.tsx'
  },
  devServer: {
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: true,
    host: config.dev.host,
    port: config.dev.port,
    compress: true,
    overlay: {
      errors: true,
      warnings: false
    },
    quiet: true,
    clientLogLevel: 'warning',
    progress: true,
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../examples/index.html'),
      inject: true
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      configuration.devServer.port = port

      // Add FriendlyErrorsPlugin
      configuration.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${configuration.devServer.host}:${port}`],
        },
        onErrors: undefined
      }))

      resolve(configuration)
    }
  })
})