import React, { Component } from "react";
import Manage from "../Manage";
import { Button, Divider, Input, message} from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";

class AddClassfiy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isAdd: true
        };
    }

    //控制输入框
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    //确认新增
    confirmAdd = () => {
        const { name } = this.state;
        Axios.post("http://localhost:4000/classify", {
            name
        })
            .then(() => {
                message.success("新增成功！");
                this.setState({
                    isAdd: false
                });
            })
            .catch(error => {
                message.warning("新增失败！" + error);
            });
    };

    render() {
        const { name } = this.state;
        const addContent = (
            <>
                <Input
                    size="large"
                    type="text"
                    name="name"
                    value={name}
                    style={{ margin: 10 }}
                    onChange={value => this.handleChange(value)}
                />

                <Button type="primary" onClick={this.confirmAdd}>
                    确认新增
                </Button>
                <Divider type="vertical" />
                <Link to="/classify/list">
                    <Button type="primary">返回列表</Button>
                </Link>
            </>
        );
        const showContent = (
            <>
                <div>
                    <span>分类名称：{name}</span>
                </div>

                <Button type="default" onClick={this.editArticle}>
                    修改分类
                </Button>
                <Divider type="vertical" />
                <Link to="/classify/list">
                    <Button type="primary">返回列表</Button>
                </Link>
            </>
        );
        return <Manage>{this.state.isAdd ? addContent : showContent}</Manage>;
    }
}

export default AddClassfiy;
