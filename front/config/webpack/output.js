module.exports = ({ isDev, assetsPath }) => ({
  output: {
    filename: isDev ? '[name].js' : '[name]-[contenthash].js',
    path: assetsPath,
    publicPath: '/',
  },
})
