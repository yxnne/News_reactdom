import React from 'react';
import {Row, Col, Tabs} from 'antd';

import PCHeader from './pc_header';
import PCFooter from './pc_footer';

const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component{

  render(){
    return (

      <div>
        <PCHeader />
        <Row>
          <Col span={2}/>
          <Col span={20}>
            <Tabs>
              <TabPane key={1} tab="My Restore">
              </TabPane>

              <TabPane key={2} tab="My Comments">
              </TabPane>

              <TabPane key={3} tab="My Portrait">
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}/>

        </Row>
        <PCFooter />
      </div>
    )
  }
}
