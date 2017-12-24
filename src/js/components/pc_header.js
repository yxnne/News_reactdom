import React from 'react';
//react-router-dom
import {Link ,Router} from 'react-router-dom';
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

  //声明周期方法：刷新之后将会执行
  componentWillMount(){
    //实际项目中校验复杂了
    if (localStorage.userid!='') {
      this.setState({hasLogined:true});
      this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
    }
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
      //if (!err) {
      // value 就是获取的值对象
      console.log('Received formData of form: ', formData);

      //使用fetch 获取数据
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
      +"&userName=" + formData.userName + "&password=" + formData.password
	    +"&r_userName=" + formData.r_userName + "&r_password="
	    + formData.r_password + "&r_confirmPassword="
	    + formData.r_confirmPassword, fetchOptions)
      .then(response=>response.json())
      .then(json=>{
        this.setState({userNickName: json.NickUserName, userid: json.UserId});
        //将信息存储到浏览器本地
        localStorage.userid= json.UserId;
        localStorage.userNickName = json.NickUserName;
      });
      if (this.state.action=="login"){
        this.setState({hasLogined:true})
      }
      {/*弹窗并关闭模态框*/}
      message.success("success !");
      this.setModalVisible(false);

      //}
    });
  }
  //切换Tab
  tabCallback(key){
    if (key == 1){
      this.setState({action:'login'});

    }else if (key == 2){
      this.setState({action:'register'});
    }
  }

  //登出
  logout(){
    localStorage.userid= '';
    localStorage.userNickName = '';
    this.setState({hasLogined:false});
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
      {/*<Link>*/}
        <Button type="dashed" htmlType="button">Profile</Button>
      {/*</Link>*/}
      &nbsp;&nbsp;
      <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>Logout</Button>
    </Menu.Item>
    :
    <Menu.Item key="register" className="register">
      <Icon type="appstore" />Login / Register
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
                <Tabs type="card" onChange={this.tabCallback.bind(this)}>
                  {/*登录*/}
                  <TabPane tab="Login" key="1">
                    <Form onSubmit={this.handleSubmit.bind(this)}>

                      <FormItem label="User Name">
                        {getFieldDecorator('userName', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                      </FormItem>

                      <FormItem label="Password">
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                          <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
                        )}
                      </FormItem>
                      <Button type="primary" htmlType="submit">Login</Button>

                    </Form>
                  </TabPane>
                  {/*注册*/}
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

            </Col>
            <Col span={2}></Col>
          </Row>
        </header>
    )
  }
}

//使用了antd 的 Form必须二次封装下 用Form.create()
export default PCHeader = Form.create({})(PCHeader);
