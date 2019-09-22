import React, { Component } from "react";
import { List, Avatar , Typography ,Button} from "antd";
import { withRouter} from "react-router-dom";

@withRouter
class CommonList extends Component {
    utils = {
        //转换日期
        transformDate: date => {
            const dateTime = new Date(date).toJSON();
            return new Date(+new Date(dateTime) + 8 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
        },
        //按照时间倒序排列
        backSortDataByDate: data => {
            //重写了sort 排序方式
            data.sort((a, b) => {
                return (
                    Date.parse(b.date.replace(/-/g, "/")) -
                    Date.parse(a.date.replace(/-/g, "/"))
                );
            });
            return data;
        }
    };
    //跳转至文章展示页面
    toReadArticle=(articleInfo)=>{
        this.props.history.push({
            pathname: "/readArticle",
            query: { articleInfo }
        });
    }
    //按照时间倒序排序
    sortList = ( infoList,isSort = true)=>{
        infoList.map((item)=>{
            item.date = this.utils.transformDate(item.date)
        });
        if(isSort===true){
            infoList = this.utils.backSortDataByDate(infoList);
        }
        return infoList;
    }
    
    render() {
        const { Title } = Typography;
        const articleData = this.sortList(this.props.articleData,this.props.isSort);
        return (
            <>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 3
                    }}
                    dataSource={articleData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569495819&di=30837d3160db5bb623b606b9935cdf3f&imgtype=jpg&er=1&src=http%3A%2F%2Fp2.so.qhmsg.com%2Ft01e471cf1e1c052442.jpg"
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2551412831,323673312&fm=26&gp=0.jpg' />}
                                title={<Title level={4}>{item.title}</Title>}
                                description={`分类：${item.classifyName}`}
                            />
                            {`${item.content.substring(0,100)}......`}
                                <Button type='link' onClick = {()=>this.toReadArticle(item)}>查看详情</Button>
                                <br></br>
                                <br></br>
                                <div style={{color:'rgba(0, 0, 0, 0.45)',float:'right'}}>最后修改时间：{item.date}</div>
                        </List.Item>
                    )}
                />
            </>
        );
    }
      
}

export default CommonList;
