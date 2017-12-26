import React from 'react';
import {Card } from 'antd';
import {Router, Route, Link } from 'react-router-dom'


export default class PCNewsImageBlock extends React.Component{

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
    //jsx内部样式
    const styleImage = {
      display: "block",
      width: this.props.imageWidth,
      height: "90px"
    };
    const styeH3 = {
      width: this.props.imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };

    const {news} = this.state;
    const newsList = news.length
    ?
    news.map((newsItem,index)=>{
      return (
        <div key={index} className="imageblock">
        {/* <Link to={'details/$(newsItem.uniquekey)'} target="_blank">*/}
          <div className="custom-image">
            <img alt="" style={styleImage} src={newsItem.thumbnail_pic_s} />
          </div>
          <div className="custom-card">
							<h3 style={styeH3}>{newsItem.title}</h3>
							<p>{newsItem.author_name}</p>
						</div>
        {/* <Link />*/}
        </div>

      )
    })
    :
    "no News be loaded";

    return (
        <div className="topNewsList">
            <Card title={this.props.cardTitle} bordered={true} style={{width:this.props.width}}>
            {newsList}
            </Card>
        </div>
    )
  }
}
