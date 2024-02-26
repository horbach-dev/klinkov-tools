module.exports = ({ isDev, assetsPath }) => {
  if (isDev) {
    return {
      devServer: {
        static: {
          directory: assetsPath,
        },
        historyApiFallback: true,
        hot: true,
        liveReload: true,
        open: true,
        host: '0.0.0.0',
      },
    }
  }
  return {}
}
