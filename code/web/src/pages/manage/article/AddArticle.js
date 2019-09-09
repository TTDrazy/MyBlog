import React, { Component } from "react";
import Manage from "../Manage";
import { Button, Divider, Input, Select, message,Typography } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            date: "",
            classify_id: 0,
            classifyName:'',
            classifyData: [],
            isAdd: true
        };
    }
    componentDidMount() {
        Axios.get("http://localhost:4000/classify").then(res => {
            let classifyData = res.data;
            this.setState({
                classifyData: classifyData
            });
        });
    }

    //控制输入框
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    //控制选择输入框
    handleChangeSelect = (value, e) => {
        const classifyName = value;
        this.setState({
            classifyName,
            classify_id: parseInt(e.key)
        });
    };
    //确认新增
    confirmAdd = () => {
        let myDate = new Date();
        let newDate = myDate.toLocaleString("chinese", { hour12: false });
        this.setState(
            {
                date: newDate
            },
            //this.setState 执行完成后的异步函数
            () => {
                const { title, content, date, classify_id } = this.state;
                Axios.post("http://localhost:4000/article", {
                    title,
                    content,
                    date,
                    classify_id
                })
                    .then(() => {
                        message.success("新增成功！");
                        this.setState({
                            isAdd:false
                        })
                    })
                    .catch(error => {
                        message.warning("新增失败！" + error);
                    });
            }
        );
    };

    render() {
        const { Title } = Typography;
        const { Option } = Select;
        const { TextArea } = Input;
        const { content, title } = this.state;
        const classifyData = this.state.classifyData;
        const addContent = (
            <>
                <Input
                    size="large"
                    type="text"
                    name="title"
                    value={title}
                    style={{ margin: 10 }}
                    onChange={value => this.handleChange(value)}
                />
                <Select
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
                    style={{ margin: "10px 10px 20px 10px" }}
                />

                <Button type="primary" onClick={this.confirmAdd}>
                    确认新增
                </Button>
                <Divider type="vertical" />
                <Link to="/article/list">
                    <Button type="primary">返回列表</Button>
                </Link>
            </>
        );
        const showContent = (
            <>
                <Title level={2}>{title}</Title>
                <div>
                    <span>文章分类：{this.state.classifyName}</span>
                </div>
                <article>{content}</article>
                <Title level={4} style={{ right: 50, margin: 10 }}>
                    最后修改日期：{this.state.date}
                </Title>

                <Button type="default" onClick={this.editArticle}>
                    修改文章
                </Button>
                <Divider type="vertical" />
                <Link to="/article/list">
                    <Button type="primary">返回列表</Button>
                </Link>
            </>
        );
        return <Manage>
            {this.state.isAdd?addContent:showContent}
        </Manage>;
    }
}

export default AddArticle;
