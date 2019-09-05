import React, { Component } from "react";
import { Button } from "antd";
import Axios from "axios";
import Manage from "../Manage";
import { withRouter, Link } from "react-router-dom";
import { Typography, Divider } from "antd";

@withRouter
class ShowArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleInfo: {}
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
        }
    };
    //获取文章信息
    getArticleInfoById = id => {
        if (!!id) {
            Axios.get(`http://localhost:4000/article/${id}`).then(res => {
                let articleInfo = res.data[0];
                const classify_id = articleInfo.classify_id;
                //根据分类id取分类名称
                Axios.get(`http://localhost:4000/classify/${classify_id}`)
                    .then(res => {
                        articleInfo.classifyName = res.data[0].name;
                    })
                    .then(() => {
                        articleInfo.date = this.utils.transformDate(
                            articleInfo.date
                        );
                        this.setState({
                            articleInfo: articleInfo
                        });
                    });
            });
        }
    };

    componentDidMount() {
        //取到传递过来的articleId
        const articleId = this.props.location.query.articleId;
        this.getArticleInfoById(articleId);
    }

    toEditArticle = () => {
        const articleInfo = this.state;
        this.props.history.push({
            pathname: "/article/edit",
            query: { articleInfo }
        });
    };
    render() {
        const { Title } = Typography;
        const { content, date, title, classifyName } = this.state.articleInfo;
        return (
            <Manage>
                <Title level={2}>{title}</Title>
                <div>
                    <span>文章分类：{classifyName}</span>
                </div>
                <article>{content}</article>
                <Title level={4}>最后修改日期：{date}</Title>
                <Button type="default" onClick={this.toEditArticle}>
                    修改文章
                </Button>
                <Divider type="vertical" />
                <Link to="/article/list">
                    <Button type="primary">返回列表</Button>
                </Link>
            </Manage>
        );
    }
}
export default ShowArticle;
