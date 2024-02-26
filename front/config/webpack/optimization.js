const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')

module.exports = ({ isDev, env }) => {
  return isDev
    ? {}
    : {
      optimization: {
        minimize: true,
        moduleIds: 'natural',
        minimizer: [
          new CssMinimizerPlugin(),
          new ESBuildMinifyPlugin({
            target: 'es2015',
            drop: env === 'production' ? ['console'] : [],
          }),
        ],
        splitChunks: {
          chunks: 'async',
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    }
}
