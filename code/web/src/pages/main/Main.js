import React, { Component } from "react";
import "./mainStyle.css";
import { Layout, Menu, Breadcrumb, Typography, Icon, Card } from "antd";
import { withRouter, Link } from "react-router-dom";
import CommonList from "../../components/CommonList";
import ArticleApi from "../../apis/ArticleAPI";
import ClassifyApi from "../../apis/ClassifyAPI";
import Tool from "../../tools/Tool";

@withRouter
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: "技术文章",
            articleData: [],
            classifyData: []
        };
    }

    componentDidMount() {
        //取到所有文章信息且包含分类信息
        new ArticleApi()
            .getAllHasClassifyName()
            .then(result => {
                //将各项文章日期转换
                let articleData = result;
                articleData.map(item => {
                    item.date = new Tool().transformDate(item.date);
                });
                this.setState({
                    articleData
                });
            })
            .then(() => {
                //取到所有的分类信息
                new ClassifyApi().getAll().then(result => {
                    this.setState(
                        {
                            classifyData: result
                        },
                        () => {
                            let { articleData, classifyData } = this.state;
                            classifyData.map(classifyItem => {
                                classifyItem.articleId = [];
                                articleData.map(articleItem => {
                                    if (
                                        articleItem.classify_id ===
                                        classifyItem.id
                                    ) {
                                        //给 classifyData 里添加 articleId
                                        classifyItem.articleId.push(
                                            articleItem.id
                                        );
                                    }
                                });
                            });
                            this.setState({
                                articleData: articleData,
                                classifyData: classifyData
                            });
                        }
                    );
                });
            });
    }

    //跳转至该项页面，并且改变面包屑导航的文字
    toCodeArticle = () => {
        this.setState({
            selectedItem: "技术文章"
        });
        this.props.history.push({
            pathname: "/codeArticle"
        });
    };
    toManageMoneyArticle = () => {
        this.setState({
            selectedItem: "理财文章"
        });
    };
    toLifeArticle = () => {
        this.setState({
            selectedItem: "生活感悟"
        });
    };
    toClassifyArticle = articleIdList => {
        this.props.history.push({
            pathname: "/classifyArticles",
            query: { articleIdList }
        });
    };
    render() {
        const { Header, Footer, Sider, Content } = Layout;
        const { Title } = Typography;
        const { articleData, classifyData, selectedItem } = this.state;
        return (
            <Layout className="main">
                <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                        style={{ lineHeight: "64px" }}
                    >
                        <Menu.Item className="blog-title">
                            <Link to="/main">
                                <Title level={2}> Drazy 的 BLOG</Title>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="1" onClick={this.toCodeArticle}>
                            <Icon type="code" theme="filled" />
                            技术文章
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.toManageMoneyArticle}>
                            <Icon type="account-book" theme="filled" />
                            理财经验
                        </Menu.Item>
                        <Menu.Item key="3" onClick={this.toLifeArticle}>
                            <Icon type="bulb" theme="filled" />
                            生活感悟
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Content style={{ padding: "0 30px", marginTop: 64 }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Link to="/">
                                <Breadcrumb.Item>Drazy</Breadcrumb.Item>
                            </Link>
                            <Link to="/main">
                                <Breadcrumb.Item>
                                    {selectedItem}
                                </Breadcrumb.Item>
                            </Link>
                            {this.props.articleTitle ? (
                                <Breadcrumb.Item>
                                    {this.props.articleTitle}
                                </Breadcrumb.Item>
                            ) : (
                                <></>
                            )}
                        </Breadcrumb>
                        <div className="right-aside"></div>
                        <div
                            style={{
                                background: "#fff",
                                padding: 24,
                                minHeight: 380
                            }}
                        >
                            {this.props.children ? (
                                this.props.children
                            ) : (
                                <CommonList
                                    articleData={articleData}
                                ></CommonList>
                            )}
                        </div>
                    </Content>
                    <Sider theme="light" width="300px">
                        <Card
                            size="small"
                            title="关于作者"
                            headStyle={{
                                backgroundColor: "#1890ff",
                                marginTop: "20px",
                                color: "#606060"
                            }}
                            bodyStyle={{ backgroundColor: "#FFE1FF" }}
                            extra={
                                <Link to="/" style={{ color: "#606060" }}>
                                    More...
                                </Link>
                            }
                        >
                            <p>一只可爱的程序猿鼓励师(#^.^#)</p>
                            <p>
                                目前是一名普通的在校大三女学生，喜欢各种甜品，小零食，小动物......
                            </p>
                        </Card>
                        <Card
                            size="small"
                            title="文章分类"
                            headStyle={{
                                backgroundColor: "#4ACA6D",
                                marginTop: "20px",
                                color: "#606060"
                            }}
                            bodyStyle={{ backgroundColor: "#FFFFE0" }}
                        >
                            {classifyData.map((item, index) => (
                                <p
                                    key={index}
                                    onClick={() =>
                                        this.toClassifyArticle(item.articleId)
                                    }
                                >
                                    <a>
                                        {item.name}
                                        {`(${
                                            !!item.articleId
                                                ? item.articleId.length
                                                : 0
                                        })`}
                                    </a>
                                </p>
                            ))}
                        </Card>
                        <Card
                            size="small"
                            title="联系作者"
                            headStyle={{
                                backgroundColor: "#1890ff",
                                marginTop: "20px",
                                color: "#606060"
                            }}
                            bodyStyle={{ backgroundColor: "#FFE1FF" }}
                        >
                            <p>QQ: 2421209781</p>
                            <p>微信: QQ2421209781</p>
                            <p>Email: kexin19991018@126.com</p>
                            <p>
                                <a href="https://github.com/TTDrazy">GitHub</a>
                            </p>
                        </Card>
                        <Card
                            size="small"
                            title="登录"
                            headStyle={{
                                backgroundColor: "#4ACA6D",
                                marginTop: "20px",
                                color: "#606060"
                            }}
                            bodyStyle={{ backgroundColor: "#FFFFE0" }}
                        >
                            <Link to="/manage">
                                <a>进入后台管理界面</a>
                            </Link>
                        </Card>
                    </Sider>
                </Layout>
                <Footer style={{ textAlign: "center" }}>
                    Design By Drazy ©2019
                </Footer>
            </Layout>
        );
    }
}
export default Main;
