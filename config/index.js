'use strict'

const path = require('path')

module.exports = {
  dev: {
    host: '0.0.0.0',
    port: 8088,
    assetsPublicPath: '/',
    errorOverlay: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    assetsPublicPath: '/',
    cssSourceMap: false
  },
  build: {
    assetsPublicPath: './'
  }
}