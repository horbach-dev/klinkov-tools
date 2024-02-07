const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { breakpoints } = require('./breakpoints.json')

module.exports = ({ isDev }) => {
  const breakpointVars = Object.entries(breakpoints)
    .reduce((acc, [k, v]) => [...acc, `$${k}: ${v}px;`], [])
    .join('\n')

  const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader

  return ({
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          include: [/src/, /lib/],
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
            },
          },
        },
        {
          test: /\.s?css$/,
          use: [
            styleLoader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('autoprefixer')],
                },
                sourceMap: true,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: `
                  ${breakpointVars};
                `,
                implementation: require('sass'),
                sassOptions: {
                  includePaths: [path.resolve(__dirname, '../../src/components')],
                },
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg|mp3|wav)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource',
        },
        {
          test: /\.yml$/,
          use: 'yml-loader',
        },
      ],
    },
  })
}
