import React from 'react';
import {
  Row, Col,
	message,
	Form,
	Input,
	Button,
	Card,
	notification
} from 'antd';
const FormItem = Form.Item;
import {Link} from 'react-router-dom'

class CommonComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: ''
    };
  };

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="
      + this.props.uniquekey, myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({comments: json});
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };

    this.props.form.validateFields((err, formData)=>{
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="
      + localStorage.userid + "&uniquekey=" + this.props.uniquekey
      + "&commnet=" + formData.remark, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.componentDidMount();
      });
    });
  };

  addUserCollection() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="
    + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
    .then(response => response.json())
    .then(json => {
			//收藏成功以后进行一下全局的提醒
      console.log("json is ....",json);
			notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
		});
	};

  render(){
      const { getFieldDecorator } = this.props.form
      const {comments} = this.state;
      const commentLists = comments.length
      ?
      comments.map((comment, index) => (
        <Card key={index} title={`用户:${comment.UserName}`} extra={< a href = "#" > 发布于 {comment.datetime} < /a>}>
          <p>{comment.Comments}</p>
        </Card>

      ))
      :
      "还没有评论"
      ;

      return (
        <div className="comment">
          <Row>
            <Col span={24}>
              <Form onSubmit={this.handleSubmit.bind(this)}>

                <FormItem label="你的评论" >
                  {getFieldDecorator("remark")(
                    <Input type="textarea" placeholder="写点什么" />
                  )}
                </FormItem>

                <Button type="primary" htmlType="submit">提交评论</Button>
                &nbsp;&nbsp;
                <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>

              </Form>
              <hr />
              {commentLists}
            </Col>
          </Row>
        </div>

      );
  }
}

export default CommonComments = Form.create()(CommonComments);
