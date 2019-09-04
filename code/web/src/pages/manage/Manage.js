import React, { Component } from "react";
import { message, Layout, Menu, Breadcrumb, Icon } from "antd";
import { observer, inject } from "mobx-react";
import { withRouter ,Link } from "react-router-dom";
import Logo from "../../imgs/logo.js";
import "./style.css";

@withRouter
@inject("adminStore")
@observer
class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    componentWillMount() {
        let adminInfo = JSON.parse(window.localStorage.getItem("adminInfo"));
        if (!!adminInfo) {
            let { adminName, adminPassword } = adminInfo;
            let { adminStore } = this.props;
            adminStore.JudgeIsAdmin(adminName, adminPassword);
            const getIsAdmin = adminStore.GetIsAdmin();
            if (!getIsAdmin) {
                message.error("未检测到您的登录状态，请重新登录！");
                this.props.history.push({ pathname: "/login" });
            }
        } else {
            message.error("未检测到您的登录状态，请重新登录！");
            this.props.history.push({ pathname: "/login" });
        }
    }

    render() {
        const { Header, Content, Footer, Sider } = Layout;
        const { SubMenu } = Menu;
        return (
            <Layout
                id={"components-layout-demo-side"}
                style={{ minHeight: "100vh" }}
            >
                <Sider
                    theme="dark"
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo">
                        <Logo.title className="logo-img" />
                        <span className="logo-text">Blog 后台管理</span>
                    </div>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={["article"]}
                        mode="inline"
                    >
                        <SubMenu
                            key="article"
                            title={
                                <Link to="/article/list">
                                    <span>
                                        <Icon type="read" />
                                        <span>文章</span>
                                    </span>
                                </Link>
                            }
                        >
                            <Menu.Item key="3">
                                <Link to="/article/list">文章列表</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/article/manage">文章管理</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="classify"
                            title={
                                <Link to="/classify/list">
                                    <span>
                                        <Icon type="apartment" />
                                        <span>分类</span>
                                    </span>
                                </Link>
                            }
                        >
                            <Menu.Item key="6">
                                <Link to="/classify/list">分类列表</Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Link to="/classify/manage">分类管理</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            position: "fixed",
                            zIndex: 1,
                            width: "100%",
                            backgroundColor: "##001529"
                        }}
                    >
                        <Menu
                            mode="horizontal"
                            style={{ lineHeight: "63.5px" }}
                        >
                            <Menu.Item key="1">
                                <Logo.search />
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Logo.document />
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Logo.message />
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Logo.account />
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Logo.theme />
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                background: "#fff",
                                minHeight: 360
                            }}
                        >
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>Drazy 2019</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Manage;
