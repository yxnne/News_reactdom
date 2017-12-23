import React from 'react';
//react-router-dom
import {Link } from 'react-router-dom';
//导入antd 中组件
import {Row , Col} from 'antd';
import { Menu, Icon ,Tabs , message, Form , Input ,Button,CheckBox,Modal} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
// 移动端适配头部
class MobileHeader extends React.Component{

  constructor(){
    super();
    this.state={
      //菜单默认选中
      current : "top",
      modalVisiable : false,
      action : 'login',
      hasLogined : false,
      userNickName : '',
      userid : 0
    };
  }


  setModalVisible(value){
    this.setState({modalVisiable:value});
  }

  handleClick(e){
    if(e.key == "register"){
      this.setState({current:'register'});
      this.setModalVisible(true);
    }else{
      this.setState({current:e.key});
    }
  }

  handleSubmit(e){
    //阻止事件冒泡,这句一定加上
    e.preventDefault();

    let fetchOptions = {
      method:'GET'
    };

    this.props.form.validateFields((err, formData) => {
      if (!err) {
        // value 就是获取的值对象
        console.log('Received formData of form: ', formData);

        //使用fetch 获取数据
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register"
		    +"&r_userName=" + formData.r_userName + "&r_password="
		    + formData.r_password + "&r_confirmPassword="
		    + formData.r_confirmPassword, fetchOptions)
        .then(response=>response.json())
        .then(json=>{
          this.setState({userNickName: json.NickUserName, userid: json.UserId});
        });
        {/*弹窗并关闭模态框*/}
        message.success("success !");
        this.setModalVisible(false);

      }
    });
  }

  login(){
    this.setModalVisible(true);
  }

  render(){

    //Form中会使用的对象
    let {getFieldDecorator,getFieldError, isFieldTouched} = this.props.form;

    const userShow = this.state.hasLogined?
    <Link>
      <Icon type="inbox" />
    </Link>
    :
    <Icon type="setting" onClick={this.login.bind(this)} />
    return (
      <div id="mobileheader">
        <header>
          <img src="images/logo.png" alt="logo"/>
          <span>News</span>
          {userShow}
        </header>

        {/*模态框*/}
        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisiable}
        onCancel={()=>this.setModalVisible(false)}
        onOk={()=>this.setModalVisible(false)}
        okText="关闭">
          {/*Tab页中分别是注册和登录*/}
          <Tabs type="card">
            <TabPane tab="Register" key="2">
              <Form onSubmit={this.handleSubmit.bind(this)}>

                <FormItem label="User Name">
                  {getFieldDecorator('r_userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </FormItem>

                <FormItem label="Password">
                  {getFieldDecorator('r_password', {
                    rules: [{ required: true, message: 'Please input your password!' }],
                  })(
                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
                  )}
                </FormItem>

                <FormItem label="Password Comfirme">
                  {getFieldDecorator('r_confirmPassword', {
                    rules: [{ required: true, message: 'Please input your password again!' }],
                  })(
                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Reinput Password" />
                  )}
                </FormItem>

                <Button type="primary" htmlType="submit">Register</Button>

              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default MobileHeader =  Form.create({})(MobileHeader);
