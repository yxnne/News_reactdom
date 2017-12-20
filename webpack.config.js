const webpack = require('webpack');
const path = require('path');

module.exports = {
  context : __dirname + '/src',
  entry   : "./js/root.js",
  module  : {
    loaders   :[{
      test : /.js?$/,
      exclude:/(node_modules)/,
      loader: 'babel-loader',
      query :{
        presets:['react' , 'babel-preset-react']
      }
    },
    {
      //css模块化设置
      test : /\.css$/,
      //下面是ant-design的样式
      loader : 'style-loader!css-loader'
    },
    ]
  },
  output:{
    path:__dirname + "/src/",
    filename:"bundle.js"
  },
  devServer:{
    //我们在这里对webpack-dev-server进行配置
    port:18080,
    historyApiFallback:true
  }
};
