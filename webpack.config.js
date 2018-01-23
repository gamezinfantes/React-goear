var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var nib = require('nib');

var extractStylus = new ExtractTextPlugin("boundle.css");

var webpackConfig = {
  entry: './client/js/main.js',
  output: {
    path: path.join(__dirname, 'build/public'),
    filename: 'boundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,  loaders: ['babel'], exclude: /node_modules/},
      { test: /\.styl$/, loader: extractStylus.extract("style-loader", "css-loader!stylus-loader") }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=8000&name=[hash].[ext]' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=[hash].[ext]'},

      // configuration for React-scrollbar
      // { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"), include: /react-scrollbar/ },
      // { test: /\.jsx?$/, loader: 'babel', include: /react-scrollbar/ },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    // alias: { 'scrollArea': './node_modules/react-scrollbar/src/js/scrollArea.jsx' }
    modulesDirectories: [ 'node_modules', path.join( __dirname) ],
  },
  plugins: [
    extractStylus
  ],
  stylus: {
    use: [nib()],
    import: ['~client/stylus/vars.styl'] // Auto import vars file
  }
};


// Develoment config
if (true) {
  webpackConfig.plugins.push( new webpack.HotModuleReplacementPlugin() );
  webpackConfig.entry = [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
  ].concat(webpackConfig.entry); // Your appʼs entry point

  // add styles like modules
  webpackConfig.module.loaders[1] = { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader" };

  // Add react hot loader before babel-loader
	webpackConfig.module.loaders[0].loaders = ['react-hot'].concat( webpackConfig.module.loaders[0].loaders );
}

module.exports = webpackConfig;

/* url-loader is a file-loader extension */
