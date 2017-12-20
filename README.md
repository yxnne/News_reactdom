# News_reactdom
This is a React News Web App, just for learnning

### Dev_Log_2017/12/20 : Config and init
npm or cnpm init 之后安装

1. react-dom

cnpm install --save react react-dom

2.webpack

cnpm install --save webpack

cnpm install --save webpack-dev-server

3.js语法支持

cnpm install --save babel-cli babel-preset-react

cnpm install babel-preset-env --save

cnpm install babel-loader

4.css 模块化

cnpm i --save css-loader

cnpm i --save style-loader

5.Router

cnpm i --save react-router-dom

6.antd

cnpm i --save antd

7.MeadiaQuery是响应式的支持

cnpm i --save react-responsive
```
<MediaQuery query='(min-width: 1400px)'>
  <PCIndex/>
</MediaQuery>

{/* Moblie */}
<MediaQuery query='(max-Width: 1400px)'>
  <MobileIndex/>
</MediaQuery>

```

使用 max-Width/ min-width暂时比使用 min-device-width / max-device-width更符合要求
