import React, { Component } from "react";
import Main from "../pages/main/Main";

export default class ReadArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleInfo: {}
        };
    }
    componentDidMount() {
        //获取具体文章信息
        const articleInfo = this.props.location.query.articleInfo;
        this.setState({
            articleInfo: articleInfo
        });
    }

    render() {
        const {articleInfo} = this.state;
        return <Main>
            <div>{articleInfo.title}</div>
        </Main>;
    }
}
