const webpack = require('webpack');
const path = require('path');

module.exports = {
  context : __dirname + '/src',
  entry   : "./js/index.js",
  module  : {
    loaders   :[{
      test : /.js?$/,
      exclude:/(node_modules)/,
      loader: 'babel-loader',
      query :{
        presets:['react' , 'babel-preset-react']
      }
    }]
  },
  output:{
    path:__dirname + "/src/",
    filename:"bundle.js"
  },
  devServer:{
    //我们在这里对webpack-dev-server进行配置
    port:18080
  }
};
