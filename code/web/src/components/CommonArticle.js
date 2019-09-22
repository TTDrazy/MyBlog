import React, { Component } from "react";
import { Typography, Tag } from "antd";
import "./style/article.css";

class CommonArticle extends Component {
    render() {
        const { Title , Paragraph} = Typography;
        const { content, date, title, classifyName } = this.props.articleInfo;
        return (
            <>
                <Title className="title" level={3}>
                    {title}
                </Title>
                <div className="classify">
                    <span>
                        文章分类：<Tag color="volcano">{classifyName}</Tag>
                    </span>
                </div>
                <Paragraph className="articleContent">{content}</Paragraph>
                <div className="date" level={4}>
                    最后修改日期：{date}
                </div>
            </>
        );
    }
}
export default CommonArticle;
