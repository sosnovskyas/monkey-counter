'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    popup: './src/popup.js',
    page: './src/page.js',
    options: './src/options.js'
  },
  watch: true,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.jade/, exclude: /node_modules/, loader: 'jade-loader'}
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/index.html', to: '.' },
      { from: './src/popup.html', to: '.' },
      { from: './src/options.html', to: '.' },
      { from: './src/manifest.json', to: '.' },
      { from: './src/assets', to: './assets' }
    ])
  ]
};
