'use strict'
const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const base = require('./webpack.base.config.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const configuration = merge(base, {
  mode: 'production',
  entry: {
    app: './examples/index.tsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.build.assetsPublicPath
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../examples/index.html'),
      inject: true
    })
  ],
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'all',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: 'vendor.[contenthash].js',
          priority: -10
        }
      }
    }
  }
})

module.exports = configuration