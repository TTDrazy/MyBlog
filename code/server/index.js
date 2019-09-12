import express from "express";
import bodyParser from "body-parser";
import ArticleRouter from "./routes/article";
import classifyRouter from "./routes/classify";
import cors from 'express-cors';

let app = express();

//设置允许跨域访问该服务.
 
app.use(cors({
    allowedOrigins: [
        'http://localhost:3000'
    ]
}))

//支持payload型数据
app.use(bodyParser.json());

app.use("/article", ArticleRouter);
app.use("/classify", classifyRouter);



app.listen(4000, () => console.log("Example app listening on port 4000!"));
