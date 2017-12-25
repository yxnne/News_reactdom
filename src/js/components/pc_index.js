import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newscontainer';
// PC端 的Index组件
export default class PCIndex extends React.Component{

  render(){
    return (
        <div>
          <PCHeader/>
          <PCNewsContainer></PCNewsContainer>
          <PCFooter/>
        </div>
    )
  }
}
