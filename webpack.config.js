const SRC = __dirname + '/react-client/src';
const DIST = __dirname + '/react-client/dist';

module.exports = {
  entry: SRC + '/Index.jsx',
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        include: SRC,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  }
}
