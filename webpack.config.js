var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'element-pagination-poc.js',
    libraryTarget: 'var',
    library: 'ElementPagination'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    contentBase: './client/src',
    historyApiFallback: true,
    hot: true
  }
};
