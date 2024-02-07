module.exports = ({ isDev }) => ({
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
})
