module.exports = ({ isDev, assetsPath }) => {
  if (isDev) {
    return {
      devServer: {
        static: {
          directory: assetsPath,
        },
        historyApiFallback: true,
        hot: false,
        liveReload: false,
        open: true,
        host: '0.0.0.0',
        port: 3004,
      },
    }
  }
  return {}
}
