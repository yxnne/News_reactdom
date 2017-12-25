import React from 'react';
import {Row , Col} from 'antd';

import {Tabs,Carousel} from 'antd';
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{

  render(){
    //轮播Carousel的设置
    const settings = {
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      effect:"fade",
      autoplay:true
    };
    const list = [1,2,3];

    console.log(...list);
    console.log("???");

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

              </div>
            </Col>

            <Col span={2}></Col>
          </Row>
        </div>
    )
  }
}
