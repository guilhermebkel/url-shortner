const withCSS = require('@zeit/next-css')
const withImages = require('next-images')

module.exports = (
  withCSS({
    cssModules: true,
    publicPath: '/static/'
  }),
  withImages()
)