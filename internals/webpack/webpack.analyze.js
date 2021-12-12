const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const cacheGroups = require('./cacheGroups');
const time = (new Date).getTime();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'app/app.js'),
  ],
  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: `[name].[chunkhash]-time${time}.js`,
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

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
    new BundleAnalyzerPlugin(),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',
      ServiceWorker: {
        events: true,
      },
      updateStrategy: 'changed',
      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],
        additional: ['*.chunk.js'],
      },
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
      name: 'React Boilerplate',
      short_name: 'React BP',
      description: 'My React Boilerplate-based project!',
      background_color: '#fafafa',
      theme_color: '#b1624d',
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve('app/images/ms-icon-310x310.png'),
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
        {
          src: path.resolve('app/images/ms-icon-310x310.png'),
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
