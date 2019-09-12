import React, { Component } from "react";
import Axios from "axios";
import { Table, Divider, Button, Popconfirm, message, Icon } from "antd";
import Manage from "../Manage";
import { withRouter } from "react-router-dom";

@withRouter
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        };
    }
    utils = {
        transformDate: date => {
            const dateTime = new Date(date).toJSON();
            return new Date(+new Date(dateTime) + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
        },
        backSortDataByDate: data => {
            //重写了sort 排序方式
            data.sort((a, b) => {
                return (
                    Date.parse(b.date.replace(/-/g, "/")) -
                    Date.parse(a.date.replace(/-/g, "/"))
                );
            });
            return data;
        },
        deleteContent: data => {
            data.map(item => {
                delete item.content;
            });
            return data;
        }
    };
    //获取所有的文章信息
    getArticleData = () => {
        Axios.get("http://localhost:4000/article").then(res => {
            let articleData = res.data;
            articleData.map(item => {
                item.date = this.utils.transformDate(item.date);
                Axios.get(`http://localhost:4000/classify/${item.classify_id}`)
                    .then(res => {
                        item.classifyName = res.data[0].name;
                    })
                    .then(() => {
                        //按照时间降序排列
                        articleData = this.utils.backSortDataByDate(
                            articleData
                        );
                        //去除文章内容信息
                        articleData = this.utils.deleteContent(articleData);
                        this.setState({
                            articleData: articleData
                        });
                    });
            });
        });
    };
    componentDidMount() {
        this.getArticleData();
    }

    //显示文章
    showArticle = text => {
        const articleId = text.id;
        this.props.history.push({
            pathname: "/article/show",
            query: { articleId }
        });
    };
    //删除文章
    handleConfirm = text => {
        const articleId = text.id;
        if (!!articleId) {
            Axios.delete(`http://localhost:4000/article/${articleId}`)
                .then(() => {
                    message.success("删除成功！");
                    const articleData = this.state.articleData.filter(
                        item => item.id !== articleId
                    );
                    this.setState({
                        articleData: articleData
                    });
                })
                .catch(error => {
                    message.warning("删除失败！" + error);
                });
        }
    };

    handleCancel = () => {
        message.warning("删除失败！");
    };
    render() {
        const { Column } = Table;
        let articleData = this.state.articleData;
        const tableContent = (
            <Table dataSource={articleData} key={articleData.id}>
                <Column
                    title="文章编号"
                    align="center"
                    dataIndex="id"
                    key={articleData.id}
                />
                <Column title="文章标题" align="center" dataIndex="title" />
                <Column title="日期" align="center" dataIndex="date" />
                <Column
                    title="所属分类"
                    align="center"
                    dataIndex="classifyName"
                ></Column>
                <Column
                    title="操作"
                    align="center"
                    key="action"
                    render={text => (
                        <span>
                            <Button
                                type="primary"
                                onClick={() => {
                                    this.showArticle(text);
                                }}
                            >
                                查看
                            </Button>
                            <Divider type="vertical" />
                            <Popconfirm
                                icon={
                                    <Icon
                                        type="question-circle-o"
                                        style={{ color: "red" }}
                                    />
                                }
                                title="您确定要删除此篇文章吗？"
                                onConfirm={() => this.handleConfirm(text)}
                                onCancel={() => this.handleCancel()}
                                okText="删除"
                                cancelText="取消"
                            >
                                <Button type="danger">删除</Button>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>
        );

        return (
            <Manage>
                {!!articleData ? (
                    tableContent
                ) : (
                    <Button type="primary">Loading...</Button>
                )}
            </Manage>
        );
    }
}
export default ArticleList;
