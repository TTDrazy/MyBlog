import React, { Component } from 'react';
import {Typography } from "antd";
import Manage from './Manage';

export default class Index extends Component {
  render() {
        const { Title } = Typography;
    return (
      <Manage>
          <Title level={3} style={{textAlign:'center'}}>欢迎来到 Bolg 后台管理页面</Title>
      </Manage>
    )
  }
}
