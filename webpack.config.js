const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/public/javaScript",
    filename: "index.js"
  },
  module: {
    loaders: [
      { test: /\.hbs$/, loader: "handlebars-loader?helperDirs[]="+__dirname+"/helpers"},
      { test: /\.js$/, loader: "babel-loader"}
    ]
  }
};