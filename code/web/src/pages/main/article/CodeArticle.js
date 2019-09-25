import React, { Component } from "react";
import Main from "../Main";
import CommonList from "../../../components/CommonList";
import ArticleApi from "../../../apis/ArticleAPI";
import Tool from "../../../tools/Tool";

export default class CodeArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        };
    }
    componentDidMount() {
        //取到所有文章信息且包含分类信息
        new ArticleApi().getAllHasClassifyName().then(result => {
            //将各项文章日期转换
            let articleData = result;
            articleData.map(item => {
                item.date = new Tool().transformDate(item.date);
            });
            this.setState({
                articleData
            });
        });
    }

    render() {
        const { articleData } = this.state;
        return (
            <Main>
                <CommonList articleData={articleData}></CommonList>
            </Main>
        );
    }
}
