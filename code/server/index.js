import express from "express";
import bodyParser from "body-parser";
import ArticleRouter from "./routes/article";
import classifyRouter from "./routes/classify";

let app = express();

//设置允许跨域访问该服务.
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

//支持payload型数据
app.use(bodyParser.json());

app.use("/article", ArticleRouter);
app.use("/classify", classifyRouter);



app.listen(4000, () => console.log("Example app listening on port 4000!"));
