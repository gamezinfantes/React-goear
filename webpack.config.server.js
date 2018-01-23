var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = {
  entry: './server/bin/www.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/,  },
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader" }, // use ! to chain loaders
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=8000&name=[hash].[ext]' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=[hash].[ext]'},

    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [ 'node_modules', path.join( __dirname) ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(css|styl)$/, 'node-noop')
  ],
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true
  },
}
