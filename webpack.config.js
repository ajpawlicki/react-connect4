const path = require('path');

module.exports = {
  entry: './react-client/src/Index.jsx',
  output: {
    path: path.resolve('./react-client/dist/'),
    filename: 'bundle.js'
  },
  module : {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  }
}
