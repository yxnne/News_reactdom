import React from 'react';
import {Route} from 'react-router-dom';
import {Row, Col, BackTop} from 'antd';

import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';

export default class PCNewsDetails extends React.Component{

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

  createMakeUp(){
    return {__html:this.state.newsItem.pagecontent}
  }

  render(){

    return (
      <div>
        <PCHeader/>
        <Row>
          <Col span={2} />
          <Col span={14} className="container">
            {/*直接加载 HTML */}
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMakeUp()}></div>
            {/* 评论模块 */}
            <CommonComments uniquekey={this.props.match.params.uniquekey}/>
          </Col>
          <Col span={6}>
						<PCNewsImageBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px"/>
					</Col>
          <Col span={2} />
        </Row>
        <PCFooter/>
        <BackTop/>
      </div>
    );
  }
}
