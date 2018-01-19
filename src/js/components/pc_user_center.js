import React from 'react';
import {Row, Col, Tabs, Upload, Icon, Modal, Card} from 'antd';

import PCHeader from './pc_header';
import PCFooter from './pc_footer';

const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component{
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
    //上传的属性
    const props={
			action: 'http://newsapi.gugujiankong.com/handler.ashx',
      //头部跨域
			headers: {
				"Access-Control-Allow-Origin": "*"
			},
			listType: 'picture-card',
      // 指定的默认的东西
      defaultFileList: [
				{
					uid: -1,
					name: 'xxx.png',
					state: 'done',
					url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
					thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',  // 缩略图url
				}
			],
      // 预览的回调
			onPreview: (file) => {
				this.setState({previewImage: file.url, previewVisible: true});
			}
    };

    //收藏
    const {usercollection, usercomments} = this.state;
    const usercollectionList = usercollection.length ?
    usercollection.map((uc, index)=>(
      <Card key={index} title={uc.uniquekey} hoverable
      extra={<a target="_blank" href={`/details/${uc.uniquekey}`}>查看</a>}>
        {/*/details/${uc.uniquekey} 这是a 标签href的写法*/}
				<p>{uc.Title}</p>
			</Card>
    ))
    :
    "there are no news you collected"
    ;

    //评论
    const usercommentsList = usercomments.length ?
    usercomments.map((comment,index)=>(
        <Card key={index} title={`于 ${comment.datetime} 评论了文章`} hoverable
        extra={<a href={`/details/${comment.uniquekey}`}>查看</a>}>
          <p>{comment.Comments}</p>
        </Card>
    ))
    :
    'No Comments';

    return (

      <div>
        <PCHeader />
        <Row>
          <Col span={2}/>

          <Col span={20}>
            <Tabs>
              <TabPane key={1} tab="My Collection">
                <div className="comment">
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>

              <TabPane key={2} tab="My Comments">
                <div class="comment">
  								<Row>
  									<Col span={24}>
  										{usercommentsList}
  									</Col>
  								</Row>
  							</div>
              </TabPane>

              <TabPane key={3} tab="My Portrait">
                <div className="clearfix">
                  <Upload {...props}>
                    <Icon type="plus"/>
                      <div className="ant-upload-text">
                        Upload Portrait
                      </div>
                      <Modal visible={this.state.previewVisible} footer={null}
                      onCancel={this.handleCancel}>
                        <img  ale="View" src={this.state.previewImage}/>
                      </Modal>
                  </Upload>
                </div>
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
