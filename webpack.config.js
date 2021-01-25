const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const entry = require('webpack-glob-entry');

module.exports = {
  mode: 'development',
  entry: {
    bootstrap: './src/js/bootstrap/index.esm.js',
    vue: './src/js/theme/app.js'
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['vue-style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    },
  },
  node: {
    fs: "empty"
  },
  watch: true
};
