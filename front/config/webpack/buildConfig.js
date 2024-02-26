const baseConfig = require('./baseConfig')
const output = require('./output')
const entries = require('./entries')
const loaders = require('./loaders')
const plugins = require('./plugins')
const devtool = require('./devtool')
const devServer = require('./devServer')
const optimization = require('./optimization')

module.exports = [
  output,
  baseConfig,
  entries,
  loaders,
  plugins,
  devtool,
  optimization,
  devServer,
]
