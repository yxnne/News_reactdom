import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

//antd MOdules
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

// 移动端 的Index组件
export default class MobileIndex extends React.Component{

  render(){
    return (
        <div>
          <MobileHeader/>
          {/*移动版的Tabs 作为导航来使用*/}
          <Tabs>
            <TabPane tab="Main" key="1"></TabPane>
            <TabPane tab="Social" key="2"></TabPane>
            <TabPane tab="National" key="3"></TabPane>
            <TabPane tab="International" key="4"></TabPane>
            <TabPane tab="Entertainment" key="5"></TabPane>
          </Tabs>
          <MobileFooter/>
        </div>
    )
  }
}
