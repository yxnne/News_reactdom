import React from 'react';

// 移动端适配头部
export default class MobileHeader extends React.Component{

  render(){
    return (
      <div id="mobileheader">
        <header>
          <img src="images/logo.png" alt="logo"/>
          <span>News</span>
        </header>
      </div>
    )
  }
}
