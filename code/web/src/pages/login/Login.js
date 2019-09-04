import React, { Component } from "react";
import { Form, Typography, Input, Button, message } from "antd";
import "./style.css";
import Logo from "../../imgs/logo.js";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

@withRouter
@inject("adminStore")
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminName: "",
            adminPassword: "",
            isAdmin: false
        };
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleClick = () => {
        let { adminStore } = this.props;
        const { adminName, adminPassword, isAdmin } = this.state;
        adminStore.JudgeIsAdmin(adminName, adminPassword);
        const getIsAdmin = adminStore.GetIsAdmin();
        this.setState({
            isAdmin: getIsAdmin
        });
        if (!!isAdmin) {
            message.success("登陆成功！将为您 1s 后跳转至后台管理页面");
            //将管理员信息存储至localStorage中
            window.localStorage.setItem('adminInfo',JSON.stringify(this.state));
            setTimeout(() => {
                this.props.history.push({pathname:'/manage'});
            }, 1000);
            
        } else {
            message.warning("您的用户名和密码不正确！请重新登录");
            this.setState({
                adminName: "",
                adminPassword: ""
            });
        }
    };
    render() {
        const { Title } = Typography;
        const { adminName, adminPassword} = this.state;
        return (
            <div className="box">
                <div className="loginBackground">
                    <Form className="login-form">
                        <Title className="formTitle" level={3}>
                            博客后台管理系统
                        </Title>
                        <Form.Item>
                            <Input
                                placeholder="用户名"
                                name="adminName"
                                prefix={<Logo.user />}
                                onChange={e => this.handleChange(e)}
                                value={adminName}
                            />
                        </Form.Item>
                        <Input
                            placeholder="密码"
                            name="adminPassword"
                            type="password"
                            prefix={<Logo.password />}
                            onChange={e => this.handleChange(e)}
                            value={adminPassword}
                        />
                        <Form.Item>
                            <Button
                                type="primary"
                                className="formButton"
                                onClick={this.handleClick}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
export default Login;
