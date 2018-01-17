import React from 'react';
import {Card } from 'antd';
import {Router, Route, Link } from 'react-router-dom'


export default class PCNewsBlock extends React.Component{

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
        <li key={index}>
          <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            {newsItem.title}
          </Link>
        </li>
      )
    })
    :
    "no News be loaded";

    return (
        <div className="topNewsList">
            <ul>
              {newsList}
            </ul>
        </div>
    )
  }
}
