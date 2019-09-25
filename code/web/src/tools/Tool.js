export default class Tool {
    //转换日期
    transformDate = date => {
        const dateTime = new Date(date).toJSON();
        return new Date(+new Date(dateTime) + 8 * 3600 * 1000)
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
    };
    //按照时间倒序排列
    backSortDataByDate = data => {
        //重写了sort 排序方式
        data.sort((a, b) => {
            return (
                Date.parse(b.date.replace(/-/g, "/")) -
                Date.parse(a.date.replace(/-/g, "/"))
            );
        });
        return data;
    };
    //去除文章内容
    deleteContent = data => {
        data.map(item => {
            delete item.content;
        });
        return data;
    };
}
