'use strict'
const path = require('path')
const config = require('../config')

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(ts|tsx)$/,
  use: [{
    loader: 'ts-loader',
    options: {
      transpileOnly: true
    }
  }, {
    loader: 'eslint-loader',
    options: {
      formatter: require('eslint-friendly-formatter'),
      emitWarning: !config.dev.showEslintErrorsInOverlay
    }
  }],
  include: [resolve('src'), resolve('examples')],
  exclude: /node_modules/
})

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
    }
  },
  module: {
    rules: [
      ...config.dev.useEslint ? [createLintingRule()] : [],
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      }
    ]
  },
  plugins: []
}