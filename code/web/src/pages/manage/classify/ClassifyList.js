import React, { Component } from "react";
import { Table, Divider, Button, Popconfirm, message, Icon } from "antd";
import Manage from "../Manage";
import { withRouter } from "react-router-dom";
import ClassifyApi from "../../../apis/ClassifyAPI";

@withRouter
class ClassifyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classifyData: []
        };
    }

    componentDidMount() {
        //获取所有的分类信息
        new ClassifyApi().getAll().then(result => {
            this.setState({
                classifyData: result
            });
        });
    }

    //修改文章
    editClassify = text => {
        const classifyInfo = text;
        this.props.history.push({
            pathname: "/classify/edit",
            query: { classifyId : classifyInfo.id }
        });
    };
    //删除分类
    handleConfirm = text => {
        const classifyId = text.id;
        if (!!classifyId) {
            new ClassifyApi()
                .deleteById(classifyId)
                .then(() => {
                    message.success("删除成功！");
                    let classifyData = this.state.classifyData.filter(
                        item => item.id !== classifyId
                    );
                    this.setState({
                        classifyData: classifyData
                    });
                })
                .catch(error => {
                    message.warning("删除失败！" + error);
                });
        }
    };

    handleCancel = () => {
        message.warning("删除失败！");
    };
    render() {
        const { Column } = Table;
        let classifyData = this.state.classifyData;
        const tableContent = (
            <Table dataSource={classifyData} key={classifyData.id}>
                <Column
                    title="分类编号"
                    align="center"
                    dataIndex="id"
                    key={classifyData.id}
                />
                <Column title="分类名称" align="center" dataIndex="name" />
                <Column
                    title="操作"
                    align="center"
                    key="action"
                    render={text => (
                        <span>
                            <Button
                                type="primary"
                                onClick={() => {
                                    this.editClassify(text);
                                }}
                            >
                                修改
                            </Button>
                            <Divider type="vertical" />
                            <Popconfirm
                                icon={
                                    <Icon
                                        type="question-circle-o"
                                        style={{ color: "red" }}
                                    />
                                }
                                title="您确定要删除此项分类吗？"
                                onConfirm={() => this.handleConfirm(text)}
                                onCancel={() => this.handleCancel()}
                                okText="删除"
                                cancelText="取消"
                            >
                                <Button type="danger">删除</Button>
                            </Popconfirm>
                        </span>
                    )}
                />
            </Table>
        );

        return (
            <Manage>
                {!!classifyData ? (
                    tableContent
                ) : (
                    <Button type="primary">Loading...</Button>
                )}
            </Manage>
        );
    }
}
export default ClassifyList;
