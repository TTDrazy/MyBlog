import React, { Component } from "react";
import Axios from "axios";
import { Table, Divider, Button } from "antd";
import Manage from "../Manage";
import { withRouter } from "react-router-dom";

@withRouter
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        };
    }
    utils = {
        transformDate: date => {
            let dateArray = date.split("T");
            let day = dateArray[0];
            let dateDay = day.split("-");

            let time = dateArray[1];
            let timeArray = time.split(".000");
            let dateTime = timeArray[0].split(":");

            let dateDayTime =
                parseInt(dateDay[0]) +
                "/" +
                parseInt(dateDay[1]) +
                "/" +
                parseInt(dateDay[2]) +
                " " +
                parseInt(dateTime[0]) +
                ":" +
                parseInt(dateTime[1]) +
                ":" +
                parseInt(dateTime[2]);
            return dateDayTime;
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
   
    render() {
        const { Column } = Table;
        let articleData = this.state.articleData;
        const tableContent = (
            <Table dataSource={articleData}>
                <Column
                    title="文章编号"
                    align="center"
                    dataIndex="id"
                    key="id"
                />
                <Column
                    title="文章标题"
                    align="center"
                    dataIndex="title"
                    key="title"
                />
                <Column
                    title="日期"
                    align="center"
                    dataIndex="date"
                    key="date"
                />
                <Column
                    title="所属分类"
                    align="center"
                    dataIndex="classifyName"
                    key="classifyName"
                ></Column>
                <Column
                    title="操作"
                    align="center"
                    key="action"
                    render={(text, record) => (
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
                            <Button type="danger">删除</Button>
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
export default List;
