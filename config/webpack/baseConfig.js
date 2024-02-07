const path = require('path')

module.exports = ({ isDev }) => ({
  mode: isDev ? 'development' : 'production',
  context: path.resolve('src'),
  plugins: [],
  resolve: {
    alias: {
      $actions: path.resolve(__dirname, '../../src/actions'),
      $api: path.resolve(__dirname, '../../src/api'),
      $components: path.resolve(__dirname, '../../src/components'),
      $config: path.resolve(__dirname, '../../src/config.js'),
      $constants: path.resolve(__dirname, '../../src/constants'),
      $stores: path.resolve(__dirname, '../../src/stores'),
      $types: path.resolve(__dirname, '../../src/types'),
      $utils: path.resolve(__dirname, '../../src/utils'),
      $localesFolder: path.resolve(__dirname, '../locales'),
      $translations: path.resolve(__dirname, '../../src/translations.ts'),
      $services: path.resolve(__dirname, '../../src/services'),
      $contexts: path.resolve(__dirname, '../../src/contexts'),
      $hooks: path.resolve(__dirname, '../../src/hooks'),
    },
    extensions: ['.js', '.ts', '.tsx', '.json'],
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": false,
    }
  },
})
