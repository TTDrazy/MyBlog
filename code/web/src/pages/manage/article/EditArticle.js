import React, { Component } from "react";
import Manage from "../Manage";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import { Typography, Button, Divider, Input, Select, message } from "antd";
import CommonArticle from "../../../components/CommonArticle";

@withRouter
class EditArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleInfo: {},
            classifyData: [],
            isEdit: true
        };
    }
    getAllClassify = () => {
        Axios.get("http://localhost:4000/classify").then(res => {
            let classifyData = res.data;
            this.setState({
                classifyData: classifyData
            });
        });
    };

    componentDidMount() {
        //取到传递过来的articleId
        const articleInfo = this.props.location.query.articleInfo;
        this.setState({
            articleInfo: articleInfo
        });
        this.getAllClassify();
    }
    //控制输入框
    handleChange = e => {
        this.setState({
            articleInfo: {
                ...this.state.articleInfo,
                [e.target.name]: e.target.value
            }
        });
    };
    //控制选择输入框
    handleChangeSelect = (value, e) => {
        const classifyName = value;
        this.setState({
            articleInfo: {
                ...this.state.articleInfo,
                classifyName,
                classify_id: e.key
            }
        });
    };
    //确认修改
    confirmEdit = () => {
        let myDate = new Date();
        let newDate = myDate.toLocaleString("chinese", { hour12: false });
        this.setState(
            {
                articleInfo: {
                    ...this.state.articleInfo,
                    date: newDate
                }
            },
            //this.setState 执行完成后的异步函数
            () => {
                const {
                    id,
                    title,
                    content,
                    date,
                    classify_id
                } = this.state.articleInfo;
                console.log(id, title, content, date, classify_id);
                Axios.put("http://localhost:4000/article", {
                    id,
                    title,
                    content,
                    date,
                    classify_id
                })
                    .then(() => {
                        message.success("更新成功！");
                    })
                    .catch(error => {
                        message.warning("更新失败！" + error);
                    });
            }
        );
        this.setState({
            isEdit: false
        });
    };
    //取消修改
    cancelEdit = () => {
        this.setState({
            isEdit: false
        });
    };
    editArticle = () => {
        this.setState({
            isEdit: true
        });
    };
    render() {
        const { Title } = Typography;
        const { Option } = Select;
        const { TextArea } = Input;
        const { articleInfo } = this.state;
        const { content, date, title, classifyName } = articleInfo;
        const classifyData = this.state.classifyData;
        const editContent = (
            <>
                <Input
                    size="large"
                    type="text"
                    name="title"
                    value={title}
                    onChange={value => this.handleChange(value)}
                />
                <Select
                    //这里不能使用defaultValue,否则无法赋值
                    value={classifyName}
                    style={{ width: 200, float: "right" }}
                    onChange={(value, e) => this.handleChangeSelect(value, e)}
                >
                    {classifyData.map(item => (
                        <Option key={item.id} value={item.name}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
                <TextArea
                    name="content"
                    value={content}
                    autosize={{ minRows: 10, maxRows: 60 }}
                    onChange={e => this.handleChange(e)}
                />
                <Title level={4} style={{ right: 50, margin: 10 }}>
                    最后修改日期：{date}
                </Title>

                <div className="buttons">
                    <Button type="primary" onClick={this.confirmEdit}>
                        确认修改
                    </Button>
                    <Divider type="vertical" />
                    <Button type="danger" onClick={this.cancelEdit}>
                        取消修改
                    </Button>
                    <Divider type="vertical" />
                    <Link to="/article/list">
                        <Button type="primary">返回列表</Button>
                    </Link>
                </div>
            </>
        );
        const showContent = (
            <>
                <CommonArticle articleInfo={articleInfo}></CommonArticle>

                <div className="buttons">
                    <Button type="primary" onClick={this.editArticle}>
                        修改文章
                    </Button>
                    <Divider type="vertical" />
                    <Link to="/article/list">
                        <Button type="primary">返回列表</Button>
                    </Link>
                </div>
            </>
        );
        return <Manage>{this.state.isEdit ? editContent : showContent}</Manage>;
    }
}
export default EditArticle;
