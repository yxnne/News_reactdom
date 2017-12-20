import React from 'react';
import ReactDOM from 'react-dom';
//Router
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
//antd
import { Button } from 'antd';
//antd样式引入
import 'antd/dist/antd.css';
//react-responsive MeadiaQuery
import  MediaQuery  from 'react-responsive';

import PCIndex from './components/pc_index.js';
import MobileIndex from './components/mobile_index.js';

class Root extends React.Component{

  render(){
    //这里是程序入口
    return (
        <div>
          {/* PC */}
          <MediaQuery query='(min-width: 1224px)'>
            <PCIndex/>
          </MediaQuery>

          {/* Moblie */}
          <MediaQuery query='(max-Width: 1224px)'>
            <MobileIndex/>
          </MediaQuery>
        </div>
    )
  }
}


ReactDOM.render(
   <Root />,
   document.getElementById('test')
 );
