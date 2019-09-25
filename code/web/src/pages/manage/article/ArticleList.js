import React, { Component } from "react";
import { Table, Divider, Button, Popconfirm, message, Icon } from "antd";
import Manage from "../Manage";
import { withRouter } from "react-router-dom";
import ArticleApi from "../../../apis/ArticleAPI";
import Tool from "../../../tools/Tool";

@withRouter
class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        };
    }
    componentDidMount() {
        //获取所有的文章信息
        new ArticleApi().getAllHasClassifyName().then(result => {
            result.map(item =>{
                item.date = new Tool().transformDate(item.date);
            })
            result = new Tool().backSortDataByDate(result);
            result = new Tool().deleteContent(result);
            this.setState({
                articleData: result
            });
        });
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
            new ArticleApi()
                .deleteById(articleId)
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
