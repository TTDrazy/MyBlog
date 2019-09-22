import React, { Component } from "react";
import { Avatar, Typography } from "antd";
import "./introStyle.css";

class Introduction extends Component {
    render() {
        const { Title, Paragraph } = Typography;
        return (
            <>
                <div className="introBackground">
                    <div className="intro-content">
                        <Avatar
                            size={64}
                            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2551412831,323673312&fm=26&gp=0.jpg"
                        />
                        <Title className="title" level={2}>
                            Drazy 的 BLOG
                        </Title>
                        <Paragraph className='text'>
                            一只可爱的程序员鼓励师✿✿ヽ(°▽°)ノ✿
                        </Paragraph>
                        <Paragraph className='text'>一只希望成长为大神的小菜鸡~</Paragraph>
                    </div>
                </div>
            </>
        );
    }
}

export default Introduction;
