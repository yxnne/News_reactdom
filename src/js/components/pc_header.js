import React from 'react';
//导入antd 中组件
import {Row , Col} from 'antd';
import { Menu, Icon } from 'antd';

// pc端适配头部
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class PCHeader extends React.Component{

  constructor(){
    super();
    this.state={
      //菜单默认选中
      current:"top"
    }
  }
  render(){
    return (
        <header>
          <Row>
            <Col span={2}></Col>
            <Col span={4}>
              <a href="/" className="logo">
                {/*js打包了之后的bundle.js是在src下面 所以注意这个资源路径*/}
                <img src="imges/logo.png" alt="logo" />
                <span>News</span>
              </a>
            </Col>
            <Col span={16}>
              <Menu mode="horizontal" selectedKeys={[this.state.current]}>
                <Menu.Item key="top">
                  <Icon type="appstore" />Main
                </Menu.Item>
                <Menu.Item key="shehui">
                  <Icon type="appstore" />Society
                </Menu.Item>
                <Menu.Item key="guonei">
                  <Icon type="appstore" />National
                </Menu.Item>
                <Menu.Item key="guoji">
                  <Icon type="appstore" />International
                </Menu.Item>
                <Menu.Item key="yule">
                  <Icon type="appstore" />Entertainment
                </Menu.Item>
                <Menu.Item key="tiyu">
                  <Icon type="appstore" />Sport
                </Menu.Item>
                <Menu.Item key="keji">
                  <Icon type="appstore" />Technology
                </Menu.Item>
                <Menu.Item key="shishang">
                  <Icon type="appstore" />vogue
                </Menu.Item>

              </Menu>
            </Col>
            <Col span={2}></Col>
          </Row>
        </header>
    )
  }
}
