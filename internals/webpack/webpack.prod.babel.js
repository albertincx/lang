const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const cacheGroups = require('./cacheGroups');
const time = (new Date).getTime();

const output = {
  filename: `[name].[chunkhash]-time${time}.js`,
  chunkFilename: '[name].[chunkhash].chunk.js',
};

module.exports = require('./webpack.base.babel')({
  mode: 'production',
  stats: {
    colors: true,
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
  devServer: {
    stats: {
      colors: true,
      chunks: false,
    },
  },
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'app/app.js'),
  ],
  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups,
    },
    runtimeChunk: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/build/',
      appShell: '/',
      ServiceWorker: {
        events: true,
        entry: path.resolve(__dirname, 'pushEvents.js'),
      },
      updateStrategy: 'changed',
      excludes: ['.htaccess'],
      caches: {
        main: [':rest:'],
        additional: ['*.chunk.js'],
      },
      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    new WebpackPwaManifest({
      gcm_sender_id: '742006330525',
      name: 'Learning',
      short_name: 'Learning',
      description: 'Learning languages by subtitles',
      background_color: '#fafafa',
      theme_color: '#e4e5e6',
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve('app/images/android-icon-192x192.png'),
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
        {
          src: path.resolve('app/images/android-icon-192x192.png'),
          sizes: [120, 152, 167, 180],
          ios: true,
        },
      ],
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],
  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
