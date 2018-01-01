import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list.js';
//antd MOdules
import {Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;

// 移动端 的Index组件
export default class MobileIndex extends React.Component{

  render(){

    const settings = {
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      effect:"slide",
      autoplay:true
    };
    return (
        <div>
          <MobileHeader/>          
          {/*移动版的Tabs 作为导航来使用*/}
          <Tabs>
            <TabPane tab="Main" key="1">
              {/*轮播图 carousel */}
              <div className="carousel">
                <Carousel   {...settings} >
                  <div><img src="./images/carousel_1.jpg"></img></div>
                  <div><img src="./images/carousel_2.jpg"></img></div>
                  <div><img src="./images/carousel_3.jpg"></img></div>
                  <div><img src="./images/carousel_4.jpg"></img></div>
                </Carousel>
              </div>
              {/*新闻列表*/}
              <MobileList count={20} type="top"/>
            </TabPane>
            <TabPane tab="Social" key="2">
              <MobileList count={20} type="shehui"/>
            </TabPane>
            <TabPane tab="National" key="3">
              <MobileList count={20} type="guonei"/>
            </TabPane>
            <TabPane tab="International" key="4">
              <MobileList count={20} type="guoji"/>
            </TabPane>
            <TabPane tab="Entertainment" key="5">
              <MobileList count={20} type="yule"/>
            </TabPane>
          </Tabs>
          <MobileFooter/>
        </div>
    )
  }
}
