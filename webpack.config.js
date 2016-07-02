'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    page: './src/page.js'
  },
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loaders: ['babel']}
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/index.html', to: '.' },
      { from: './src/popup.html', to: '.' },
      { from: './src/manifest.json', to: '.' },
      { from: './src/assets', to: './assets' }
    ])
  ]
};
