import React, { Component } from "react";
import Manage from "../Manage";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import { Button, Divider, Input, message } from "antd";
import "./classifyStyle.css";

@withRouter
class EditClassify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classifyInfo: {},
            isEdit: true
        };
    }
    componentDidMount() {
        //取到传递过来的 classifyInfo 信息
        const classifyInfo = this.props.location.query;
        this.setState({
            classifyInfo: classifyInfo
        });
    }
    //控制输入框
    handleChange = e => {
        this.setState({
            classifyInfo: {
                ...this.state.classifyInfo,
                [e.target.name]: e.target.value
            }
        });
    };

    //确认修改
    confirmEdit = () => {
        const { id, name } = this.state.classifyInfo;
        Axios.put("http://localhost:4000/classify", {
            id,
            name
        })
            .then(() => {
                message.success("更新成功！");
            })
            .catch(error => {
                message.warning("更新失败！" + error);
            });
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
    editClassify = () => {
        this.setState({
            isEdit: true
        });
    };
    render() {
        const { name } = this.state.classifyInfo;
        const editContent = (
            <>
                <Input
                    size="large"
                    type="text"
                    name="name"
                    value={name}
                    style={{ margin: 10 }}
                    onChange={e => this.handleChange(e)}
                />

                <div className="buttons">
                    <Button type="primary" onClick={this.confirmEdit}>
                        确认修改
                    </Button>
                    <Divider type="vertical" />
                    <Button type="danger" onClick={this.cancelEdit}>
                        取消修改
                    </Button>
                    <Divider type="vertical" />
                    <Link to="/classify/list">
                        <Button type="primary">返回列表</Button>
                    </Link>
                </div>
            </>
        );
        const showContent = (
            <>
                <div>
                    <span>分类名称：{name}</span>
                </div>

                <div className="buttons">
                    <Button type="primary" onClick={this.editClassify}>
                        修改分类
                    </Button>
                    <Divider type="vertical" />
                    <Link to="/classify/list">
                        <Button type="primary">返回列表</Button>
                    </Link>
                </div>
            </>
        );
        return <Manage>{this.state.isEdit ? editContent : showContent}</Manage>;
    }
}
export default EditClassify;
