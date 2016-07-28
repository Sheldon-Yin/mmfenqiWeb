import path from 'path';

export default {
  devtool: 'eval',
  entry: './example/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname },
      { test: /\.css$/, include: __dirname, loaders: ['style', 'raw'] },
    ],
  },
};
