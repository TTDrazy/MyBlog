import React, { Component } from "react";
import Main from "../Main";
import CommonList from "../../../component/CommonList";

export default class ClassifyArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        };
    }
    componentDidMount() {
        const articleIdList = this.props.location.query.articleIdList;
        //已经取到了相关文章列表的数据
        console.log(articleIdList);
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
