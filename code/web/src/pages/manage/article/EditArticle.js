import React, { Component } from "react";
import Manage from "../Manage";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import { Typography, Button, Divider,Input } from "antd";

@withRouter
class EditArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleInfo: {},
            isEdit:true
        };
    }

    componentDidMount() {
        //取到传递过来的articleId
        const articleInfo = this.props.location.query.articleInfo;
        this.setState({
            articleInfo:articleInfo
        })
    }
    //控制输入框
    handleChange=(e)=>{
        //2019/09/05 未完成
        let name = e.target.name;
         console.log();
        // let articleInfo = {...this.state.articleInfo,[name]:value}
        // this.setState({
        //     articleinfo:articleInfo
        // })
    }
    render() {
        const { Title } = Typography;
        const { content, date, title, classifyName } = this.state.articleInfo;
        return (
            <Manage>
                <Input size="large" name='title' value={title} onChange={(e)=>this.handleChange(e)}/>
                <div>
                    <Input size="small" style={{width:'20%',float:'right'}} name='classifyName' value={classifyName} onChange={(e)=>this.handleChange(e)}/>
                </div>
                <Input name='content' value={content} onChange={(e)=>this.handleChange(e)}></Input>
                <Title level={4}>最后修改日期：{date}</Title>

                <Button type='primary'>确认修改</Button>
                <Divider type="vertical" />
                <Button type='danger'>取消修改</Button>
                <Divider type="vertical" />
                <Link to="/article/list">
                    <Button type="default">返回列表</Button>
                </Link>
            </Manage>
        );
    }
}
export default EditArticle;
