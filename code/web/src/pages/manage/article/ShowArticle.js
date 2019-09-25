import React, { Component } from "react";
import Manage from "../Manage";
import { withRouter, Link } from "react-router-dom";
import {Divider , Button } from "antd";
import "./articleStyle.css";
import CommonArticle from "../../../components/CommonArticle";
import ArticleApi from "../../../apis/ArticleAPI";
import Tool from "../../../tools/Tool";

@withRouter
class ShowArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleInfo: {}
        };
    }
    componentDidMount() {
        //取到传递过来的articleId
        const articleId = this.props.location.query.articleId;
        if(!!articleId){
            new ArticleApi().getByIdHasClassifyName(articleId).then((result)=>{
                result.date = new Tool().transformDate(result.date)
                this.setState({
                    articleInfo: result
                });
            })
        }
    }

    toEditArticle = () => {
        const {id} = this.state.articleInfo ;
        //路由传参的时候记住要将各项拆开传递
        this.props.history.push({
            pathname: "/article/edit",
            query: { id }
        });
    };
    render() {
        const {articleInfo} = this.state;
        return (
            <Manage>
                <CommonArticle articleInfo = {articleInfo}></CommonArticle>
                <div className="buttons">
                    <Button type="primary" onClick={this.toEditArticle}>
                        修改文章
                    </Button>
                    <Divider type="vertical" />
                    <Link to="/article/list">
                        <Button type="primary">返回列表</Button>
                    </Link>
                </div>
            </Manage>
        );
    }
}
export default ShowArticle;
