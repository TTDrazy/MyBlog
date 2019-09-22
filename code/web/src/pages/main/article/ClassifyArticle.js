import React, { Component } from "react";
import Main from "../Main";
import CommonList from "../../../components/CommonList";
import Axios from "axios";

export default class ClassifyArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        };
    }
    componentDidMount() {
        //取到相关文章列表的各项id
       const {articleIdList,classifyName} = this.props.location.query.article;
        //根据各项id取出文章信息
        articleIdList.map(item => {
            if (!!item) {
                Axios.get(`http://localhost:4000/article/${item}`).then(res => {
                    let articleInfo = res.data[0];
                    articleInfo.classifyName = classifyName;
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
