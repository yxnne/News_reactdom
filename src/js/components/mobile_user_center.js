import React from 'react';
import {Row, Col, Tabs, Upload, Icon, Modal, Card} from 'antd';

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

const TabPane = Tabs.TabPane;

export default class MobileUserCenter extends React.Component{
  constructor() {
    super();
    this.state = {
      usercollection: '',
      usercomments: '',
      previewImage: '',
      previewVisible: false
    };
  }

  componentDidMount(){
    var myFetchOptions = {
      method: 'GET'
    };

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" +
    localStorage.userid, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercollection:json});
    });

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" +
    localStorage.userid, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercomments:json});
    });
  }

  render(){

    //收藏
    const {usercollection, usercomments} = this.state;
    const usercollectionList = usercollection.length ?
    usercollection.map((uc, index)=>(
      <Card key={index} title={uc.uniquekey}  hoverable
      extra={<a href={`/details/${uc.uniquekey}`}>查看</a>}>
        {/*/#/details/${uc.uniquekey} 这是a 标签href的写法*/}
        <p>{uc.Title}</p>
      </Card>
    ))
    :
    "there are no news you collected"
    ;

    //评论
    const usercommentsList = usercomments.length ?
    usercomments.map((comment,index)=>(
        <Card key={index} title={`于 ${comment.datetime} 评论了文章`}
        hoverable extra={<a href={`/details/${comment.uniquekey}`}>查看</a>}>
          <p>{comment.Comments}</p>
        </Card>
    ))
    :
    'No Comments'
    ;

    return (

      <div>
        <MobileHeader />
        <Row>
          <Col span={2}/>
          <Col span={20}>
            <Tabs>

              <TabPane key={1} tab="My Colection">
                <Row>
                  <Col span={24}>
                    {usercollectionList}
                  </Col>
                </Row>
              </TabPane>

              <TabPane key={2} tab="My Comments">
                <Row>
                  <Col span={24}>
                    {usercommentsList}
                  </Col>
                </Row>
              </TabPane>

              <TabPane key={3} tab="My Portrait">
              </TabPane>

            </Tabs>
          </Col>
          <Col span={2}/>

        </Row>
        <MobileFooter />
      </div>
    )
  }
}
