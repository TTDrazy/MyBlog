import React, { Component } from "react";
import Main from "../Main";
import CommonList from "../../../components/CommonList";
import ArticleApi from "../../../apis/ArticleAPI";

export default class ClassifyArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        };
    }
    componentDidMount() {
        //取到相关文章列表的各项id
        const { articleIdList } = this.props.location.query;
        console.log()
        //根据各项id取出文章信息
        articleIdList.map(item => {
            if (!!item) {
                new ArticleApi().getByIdHasClassifyName(item).then(result => {
                    let articleInfo = result;
                    this.setState({
                        articleData: [...this.state.articleData, articleInfo]
                    });
                });
            }
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
