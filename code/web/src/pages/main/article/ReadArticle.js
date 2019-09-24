import React, { Component } from "react";
import { Button } from "antd";
import { withRouter, Link } from "react-router-dom";
import CommonArticle from "../../../components/CommonArticle";
import Main from "../Main";

@withRouter
class ReadArticle extends Component {
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
        return (
            <Main articleTitle={this.state.articleInfo.title}>
                <CommonArticle articleInfo = {articleInfo}></CommonArticle>
                <div className="buttons">
                    <Link to="/main">
                        <Button type="primary">返回列表</Button>
                    </Link>
                </div>
            </Main>
        );
    }
}
export default ReadArticle;
