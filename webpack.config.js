const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/public/javaScript",
    filename: "index.js"
  },
  module: {
    loaders: [
      { test: /\.hbs$/, loader: "handlebars-loader?helperDirs[]="+__dirname+"/helpers"},
      { test: /\.scss$/, loader:ExtractTextPlugin.extract('css-loader!sass-loader') },
      { test: /\.(jpg|png)$/, loader: "url-loader" },
      { test: /\.js$/, loader: "babel-loader"}
    ]
  },
  plugins:[
    new ExtractTextPlugin('../stylesheets/index.css')
  ]
};