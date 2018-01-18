import React from 'react';
import {Row, Col } from 'antd';
import {Router, Route, Link } from 'react-router-dom'


export default class MobileList extends React.Component{

  constructor(){
    super();
    this.state = {
      news:""
    };

  }

  componentWillMount(){
    var fetchOption = {
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
    + this.props.type
    + "&count=" + this.props.count,
    fetchOption)
    .then(response => response.json())
    .then((json) => {
      console.log("json is ");
      console.log(json);
      this.setState({news: json})
    });

  }

  render(){
    const {news} = this.state;
    const newsList = news.length
    ?
    news.map((newsItem,index)=>{
      return (
        <section key={index} className="m_article list-item special_section clearfix">
          <Link to={`details/${newsItem.uniquekey} `} target="_blank">
            <div className="m_article_img">
              <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
            </div>
            <div className="m_article_info">
              <div className="m_article_title">
                <span>{newsItem.title}</span>
              </div>
              <div className="m_article_desc clearfix">
                <div className="m_article_desc_l">
                  <span className="m_article_channel">{newsItem.realtype}</span>
                  <span className="m_article_time">{newsItem.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )
    })
    :
    "no News be loaded";

    return (
        <div >
            <Row>
              <Col span={24}>
                {newsList}
              </Col>
            </Row>
        </div>
    )
  }
}
