import React from 'react';
import {Row , Col } from 'antd';

import {Tabs,Carousel,Card} from 'antd';
import PCNewsBlock from './pc_news_block'
import PCNewsImageBlock from './pc_news_image_block';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{

  render(){
    //轮播Carousel的设置
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
          <Row>
            <Col span={2}></Col>
            {/*两边留白之后就是中间部分*/}
            <Col span={20} className="container">

              <div className="leftContainer">
                {/*轮播图 carousel */}
                <div className="carousel">
                  <Carousel   {...settings} >
                      <div><img src="./images/carousel_1.jpg"></img></div>
                      <div><img src="./images/carousel_2.jpg"></img></div>
                      <div><img src="./images/carousel_3.jpg"></img></div>
                      <div><img src="./images/carousel_4.jpg"></img></div>
                  </Carousel>
                </div>

                <PCNewsImageBlock count={6} type="guoji" width="400px" cardTitle="国际头条" imageWidth="100px"/>
              </div>

              {/* Tabs右侧切换新闻 */}
              <Card className="tabs_news">
                <Tabs >
                  <TabPane tab="Top News" key="1">
                    <PCNewsBlock count={8} type="top" width="100%" bordered="false" />
                  </TabPane>
                  <TabPane tab="International" key="2">
                    <PCNewsBlock count={22} type="guoji" width="100%" bordered="false"/>
                  </TabPane>
                </Tabs>
              </Card>

              {/* 图片新闻模块 */}
              <div>
                <PCNewsImageBlock count={8} type="guonei" width="100%" cardTitle="国内新闻" imageWidth="128px"/>
                <PCNewsImageBlock count={16} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="128px"/>
              </div>

            </Col>

            <Col span={2}></Col>
          </Row>
        </div>
    )
  }
}
