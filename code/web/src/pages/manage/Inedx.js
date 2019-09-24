import React, { Component } from 'react';
import {Typography ,Button} from "antd";
import Manage from './Manage';
import {Link} from 'react-router-dom';

export default class Index extends Component {
  render() {
        const { Title } = Typography;
    return (
      <Manage>
          <Title level={3} style={{textAlign:'center'}}>欢迎来到 Bolg 后台管理页面</Title>
          <Link to='/'><Button type='primary'style={{float:'right'}}>返回 BLOG</Button></Link> 
      </Manage>
    )
  }
}
