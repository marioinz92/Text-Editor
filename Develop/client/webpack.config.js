const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate an HTML
      new HtmlWebpackPlugin({
        template: './src/index.html', 
        chunks: ['main'],
      }),

      new WebpackPwaManifest({
        name: 'text editor',
        short_name: 'text editor',
        description: 'text editor',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/images/icon.png'), // Path to app's icon image
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
          },
        ],
      }),

      // Inject service worker into HTML files
      new InjectManifest({
        swSrc: './src-sw.js', // Path to service worker source file
        swDest: 'sw.js', // Output file name for the service worker
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
