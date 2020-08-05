const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/bootstrap/index.esm.js',
  output: {
    filename: "js/bootstrap.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  watch: true
};