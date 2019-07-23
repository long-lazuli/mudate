const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './_sources/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './_dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.ts' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '_dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.µDate': path.resolve(path.join(__dirname, '_sources/index.ts'))
    })
  ]
};