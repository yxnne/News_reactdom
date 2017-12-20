import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

// 移动端 的Index组件
export default class MobileIndex extends React.Component{

  render(){
    return (
        <div>
          <MobileHeader/>
          <MobileFooter/>

        </div>
    )
  }
}
