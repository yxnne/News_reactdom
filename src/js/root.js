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
import PCNewsDetails from './components/pc_news_detail.js';
import MobileNewsDetails from './components/mobile_news_detail.js';
import PCUserCenter from './components/pc_user_center.js';
import MobileUserCenter from './components/mobile_user_center.js';


class Root extends React.Component{

  render(){
    //这里是程序入口
    return (
        <div>
          {/* PC */}
          <MediaQuery query='(min-width: 1224px)'>
            <Router>
              <Switch>
                <Route exact path="/" component={PCIndex}/>
                <Route path="/details/:uniquekey" component={PCNewsDetails}/>
                <Route path="/usercenter" component={PCUserCenter}/>
              </Switch>
            </Router>
          </MediaQuery>

          {/* Moblie */}
          <MediaQuery query='(max-Width: 1224px)'>
            <Router>
              <Switch>
                <Route exact path="/" component={MobileIndex}/>
                <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
                <Route path="/usercenter" component={MobileUserCenter}/>
              </Switch>
            </Router>
          </MediaQuery>
        </div>
    )
  }
}


ReactDOM.render(
   <Root />,
   document.getElementById('root')
 );
