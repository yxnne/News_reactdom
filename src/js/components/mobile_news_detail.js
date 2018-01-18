import React from 'react';
import {Route} from 'react-router-dom';
import {Row, Col, BackTop} from 'antd';

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_comments';

export default class MobileNewsDetails extends React.Component{

  constructor(){
    super();
      this.state = {
        newsItem : '',
      };
  }

  componentDidMount(){
    console.log("this.props.params.match.uniquekey", this.props.match.params.uniquekey)
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
    + this.props.match.params.uniquekey, myFetchOptions)
    .then(response => response.json()).then(json => {
      this.setState({newsItem: json});
      //设置页面title的方法
      document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
    });
  }

  createMarkup(){
    return {__html:this.state.newsItem.pagecontent}
  }

  render(){

    return (
      <div id="mobileDetailsContainer">
				<MobileHeader />
				<div className="ucmobileList">
					<Row>
						<Col span={24} className="container">
              {/*直接加载 html */}
							<div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
              {/* 评论模块 */}
              <CommonComments uniquekey={this.props.match.params.uniquekey}/>

						</Col>
					</Row>
					<MobileFooter/>
					<BackTop/>
        </div>
			</div>
    );
  }
}
