import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index.js';
import { Button } from 'antd';
//Router
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
//antd样式引入
import 'antd/dist/antd.css';

const AntdTestComponent =()=>(
  <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
  </div>
);

class Root extends React.Component{

  render(){
    //这里是程序入口
    return (
        <div>
          <Router>
            <Switch>

              <Route exact path="/" component={Index}></Route>


              <Route path="/antd" component={AntdTestComponent}/>


            </Switch>
          </Router>
        </div>
    )
  }
}


ReactDOM.render(
   <Root />,
   document.getElementById('test')
 );
