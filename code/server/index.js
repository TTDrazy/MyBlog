import express from "express";
import bodyParser from "body-parser";
import articleRouter from './routes/article';
import classifyRouter from './routes/classify';


let app = express();
//支持payload型数据
app.use(bodyParser.json());

app.use('/article',articleRouter);
app.use('/classify',classifyRouter);

/*允许跨域访问 */
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
