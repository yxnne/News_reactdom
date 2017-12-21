const webpack = require('webpack');
const path = require('path');

const fs = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './theme.less'), 'utf8'));
module.exports = {
  context: __dirname + '/src',
  entry: "./js/root.js",
  module: {

    loaders: [{
        test: /.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'babel-preset-react'],
          plugins: [
            ['import', {
              libraryName: "antd",
              style: true
            }]
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },

      {
        //css模块化设置
        test: /\.less$/,
        //ant-design样式需要这样
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: themeVariables
            }
          }
        ]
      },
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "bundle.js"
  },
  devServer: {
    //我们在这里对webpack-dev-server进行配置
    port: 18080,
    historyApiFallback: true
  }
};
