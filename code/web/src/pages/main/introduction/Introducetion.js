import React, { Component } from "react";
import { Avatar, Typography, Divider, Row, Col, Button } from "antd";
import "./introStyle.css";
import { Link } from "react-router-dom";

class Introduction extends Component {
    render() {
        const { Title, Paragraph } = Typography;
        return (
            <>
                <div className="introBackground"></div>
                <Row>
                    <Col span={8} offset={8} className="intro-avatar">
                        <Avatar
                            size={64}
                            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2551412831,323673312&fm=26&gp=0.jpg"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8} className="intro-content">
                        <Title className="title">I'm Drazy</Title>
                        <Paragraph className="text description">
                            一只可爱的程序员鼓励师✿✿ヽ(°▽°)ノ✿
                        </Paragraph>
                        <Paragraph className="text description">
                            一只希望有朝一日能够成长为大神的小菜鸡~
                        </Paragraph>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row
                    type="flex"
                    justify="center"
                    gutter={24}
                    className="intro-display"
                    style={{marginRight:0}}
                >
                    <Col span={4} value={120}>
                        <a href="https://github.com/TTDrazy">
                            <div className="display">
                                <Avatar
                                    size="large"
                                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569242998262&di=60d523c414ea830793d02334a4a8b479&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F40%2F45%2F5813233e03c81_610.jpg"
                                />
                                <div>GitHub</div>
                            </div>
                        </a>
                    </Col>
                    <Col span={4}>
                        <a href="https://weibo.com/3727705537/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1">
                            <div className="display">
                                <Avatar
                                    size="large"
                                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569243509717&di=6212429eb75d51795560c4a9c259e634&imgtype=0&src=http%3A%2F%2Fd.ifengimg.com%2Fw600%2Fp0.ifengimg.com%2Fpmop%2F2018%2F0712%2FFFFFA8D503593FECC7FBB2C827F7F6C6DC78B3B6_size16_w640_h640.jpeg"
                                />
                                <div>Weibo</div>
                            </div>
                        </a>
                    </Col>
                    <Col span={4}>
                        <a href="https://user.qzone.qq.com/2421209781">
                            <div className="display">
                                <Avatar
                                    size="large"
                                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569252753227&di=6b148158ea28fd4917f8863e8909a5dd&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fapp%2Ficon%2F20160802%2F1470126784979048.jpg"
                                />
                                <div>Qzone</div>
                            </div>
                        </a>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col className="intro-button">
                        <Link to="/main">
                            <Button size="large" type="primary">
                                进入 BLOG
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Introduction;
