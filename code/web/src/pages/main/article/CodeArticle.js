import React, { Component } from "react";
import Main from "../Main";
import CommonList from "../../../component/CommonList";

export default class CodeArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        };
    }
    componentDidMount() {
        const articleData = this.props.location.query.articleData;
        this.setState({
            articleData: articleData
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
