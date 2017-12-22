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
// pc端适配头部
class PCHeader extends React.Component{

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
    let formData = this.props.form.validateFields();
    console.log(formData);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render(){

    //Form中会使用的对象
    let {getFieldDecorator,getFieldError, isFieldTouched} = this.props.form;

    //三元表达式，根据用户的登录状态进行显示不同内容
    const userShow = this.state.hasLogined
    ?
    <Menu.Item key="logout" className="register">
      <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
      &nbsp;&nbsp;
      <Link target="_blank">
        <Button type="dashed" htmlType="button">Profile</Button>
      </Link>
      &nbsp;&nbsp;
      <Button type="ghost" htmlType="button">Logout</Button>
    </Menu.Item>
    :
    <Menu.Item key="register" className="register">
      <Icon type="appstore" />注册 / 登录
    </Menu.Item>;

    const userNameError = isFieldTouched('userName') && getFieldError('userName');

    return (
        <header>
          <Row>
            <Col span={2}></Col>
            <Col span={3}>
              <a href="/" className="logo">
                {/*js打包了之后的bundle.js是在src下面 所以注意这个资源路径*/}
                <img src="images/logo.png" alt="logo" />
                <span>News</span>
              </a>
            </Col>
            <Col span={17}>
              <Menu mode="horizontal" selectedKeys={[this.state.current]}
              onClick={this.handleClick.bind(this)}>
                <Menu.Item key="top">
                  Main
                </Menu.Item>
                <Menu.Item key="shehui">
                  Society
                </Menu.Item>
                <Menu.Item key="guonei">
                  National
                </Menu.Item>
                <Menu.Item key="guoji">
                  International
                </Menu.Item>
                <Menu.Item key="yule">
                  Entertainment
                </Menu.Item>
                <Menu.Item key="tiyu">
                  Sport
                </Menu.Item>
                <Menu.Item key="keji">
                  Technology
                </Menu.Item>
                <Menu.Item key="shishang">
                  Vogue
                </Menu.Item>
                {/*根据用户的状态 显示不同组件 但都是menuitem 定义在上面*/}
                {userShow}
              </Menu>

              {/*模态框*/}
              <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisiable}
              onCancel={()=>this.setModalVisible(false)}
              onOk={()=>this.setModalVisible(false)}
              okText="关闭">
                {/*Tab页中分别是注册和登录*/}
                <Tabs type="card">
                  <TabPane tab="Register" key="2">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <FormItem label="账户">
                        <Input placeholder="Please input your name" {...getFieldDecorator('r_userName')}/>
                      </FormItem >
                      <FormItem label="密码">
                        <Input type="password" placeholder="Please input your Password" {...getFieldDecorator('r_password')}/>
                      </FormItem >
                      <FormItem label="确认密码">
                        <Input type="password" placeholder="Please input your Password again" {...getFieldDecorator('r_confirmPassword')}/>
                      </FormItem >

                      <FormItem validateStatus={userNameError ? 'error' : ''}
                      help={userNameError || ''}>
                        {getFieldDecorator('userName', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                      </FormItem>

                      <FormItem validateStatus={userNameError ? 'error' : ''}
                      help={userNameError || ''}
                      label="Test input">
                        {getFieldDecorator('test', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                      </FormItem>

                      <FormItem validateStatus={userNameError ? 'error' : ''}
                      help={userNameError || ''}
                      label="Test input2">
                        {getFieldDecorator('test2', )(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                      </FormItem>

                      <Button type="primary" htmlType="submit">Register</Button>

                    </Form>
                  </TabPane>
                </Tabs>
              </Modal>

            </Col>
            <Col span={2}></Col>
          </Row>
        </header>
    )
  }
}

//使用了antd 的 Form必须二次封装下 用Form.create()
export default PCHeader = Form.create({})(PCHeader);
