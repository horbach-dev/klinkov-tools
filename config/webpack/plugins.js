const webpack = require('webpack')
const path = require('path')
const DotenvWebpackPlugin = require('dotenv-webpack')
const fs = require('fs')
const jsYaml = require('js-yaml')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { breakpoints } = require('./breakpoints.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ config, env, isDev, assetsPath }) => {
  const getTranslationsDefault = () => {
    return jsYaml.load(fs.readFileSync(
      path.join(
        __dirname,
        '../locales/en.yml'
      )))
  }

  const srcPath = path.resolve(__dirname, '../../src')

  const sharedPlugins = [
    new DotenvWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '../public',
          to: path.resolve('dist'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify({
        ...config,
        env,
        pp: srcPath,
      }),
      __DEV__: JSON.stringify(isDev),
      breakpoints: JSON.stringify(breakpoints),
      __TRANSLATIONS_DEFAULT__: JSON.stringify(getTranslationsDefault()),
    }),
    new HtmlWebpackPlugin({
      title: 'Banknotes',
      favicon: srcPath + '/images/favicon.png',
      template: srcPath + '/template.html',
      filename: 'index.html',
    }),
    new AssetsPlugin({
      path: assetsPath,
      removeFullPathAutoPrefix: true,
      prettyPrint: true,
      filename: 'project-assets.json',
      metadata: {
        preloadChunks: [],
      },
      processOutput (assets) {
        assets.metadata.preloadChunks = Object.keys(assets).filter(key => key.includes("[preload]"))

        return JSON.stringify(assets)
      },
    }),
  ]

  const prodactionPlugins = isDev ? [] : [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      ignoreOrder: true,
    }),
    new CssMinimizerPlugin(),
  ]

  if (process.env.BUNDLE_ANALYZER) {
    prodactionPlugins.push(
      new BundleAnalyzerPlugin()
    )
  }

  return { plugins: [...sharedPlugins, ...prodactionPlugins] }
}
